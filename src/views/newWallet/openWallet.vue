<template>
  <div>
    <Header v-if="this.$store.state.webtype" :underlineStyle="underlineStyle"/>
    <div class="wrap1200 bg-box">
      <div class="border-box">
        <h3 class="wallet-title">{{ $t('open_wallet') }}</h3>
        <el-radio-group class="wallet-group" v-model="radio" @change="radioChange">
          <div class="row">
            <el-radio class="radio-item" label="1">{{ $t('keystore_file') }}</el-radio>
          </div>
        </el-radio-group>

        <el-form @submit.native.prevent>
          <!--      keyfileStore-->
          <div v-if="radio ==='1' || radio === '3'">
            <div v-if="radio === '1'">
              <!--          read filekey-->
              <el-upload
                class="upload-demo"
                action="/"
                ref="upload"
                :multiple="false"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="importWalletFromKeystore"
                :disabled="disableBtn"
              >
                <el-button slot="trigger" size="small" type="primary">{{ $t('select_wallet_file') }}</el-button>
              </el-upload>
            </div>
            <!--      EncryptedKey input-->
            <div v-else-if="radio === '3'" class="input-wrap">
              <ps-input v-model="encryptedKey">{{ $t('paste_key') }}</ps-input>
            </div>
            <!--         password input-->
            <div v-if="canInputPassword" class="input-wrap mt20">
              <ps-input v-model.trim="formData.password" :isPassword="true" :placeholder="$t('enter_key')"></ps-input>
            </div>
            <div v-if="radio === '3' && !canInputPassword" class="btn-wrap">
              <el-button
                class="w200"
                type="primary"
                @click="continueEncryptedKey"
              >{{ $t('continue') }}
              </el-button>
            </div>
            <div
              v-if="canInputPassword"
              class="btn-wrap">
              <el-button
                class="w200"
                type="primary"
                native-type="submit"
                @keyup.enter.native="unlock"
                @click.native="unlock"
                :loading="isLoading"
              >{{ $t('unlock') }}
              </el-button>
            </div>
          </div>

          <!--      seed 种子-->
          <div v-else-if="radio === '2'">
            <div class="input-wrap">
              <ps-input v-model="formData.seed" :placeholder="$t('paste_key')"></ps-input>
            </div>
            <div style="padding-top: 20px" v-if="canInputPassword">
              <ps-input v-model="formData.password" placeholder="请设置密码"></ps-input>
            </div>
            <div class="btn-wrap">
              <el-button
                class="w200"
                type="primary"
                :loading="isLoading"
                :disabled="canUnlock"
                @click="importWalletFromSeed">
                {{ $t('unlock') }}
              </el-button>
            </div>
          </div>

          <el-alert
            v-if="errText.length > 0"
            class="mt20"
            type="error"
            :description="errText"
            show-icon
            :closable="false"
            @close="closeAlert"
          ></el-alert>
        </el-form>
      </div>
    </div>
    <Footer v-if="this.$store.state.webtype"/>
  </div>
</template>
<script>
import PsInput from "@/components/wallet/inputPassword"
import {mapActions, mapMutations, mapState} from "vuex"
import {wallet} from "@cityofzion/neon-js"
import {
  initNetwork,
  createAccount,
  addAccount,
  getPairs,
  importAccountFromKeystore,
  importAccountFromSeed,
  isHexSeed,
  mnemonicValidate,
  onGetBalance,
  onTransferBalance,
  getPair,
  savePair
} from "@/utlis/dot/index.ts"
import Header from "@/congTuCloud/components/header/SubHeader.vue"
import Footer from "@/congTuCloud/components/footer/Footer.vue"
export default {
  name: "OpenWallet_new",
  components: {
    PsInput,
    Header,
    Footer,
  },
  computed: {
    ...mapState(["account",'passward']),
    canUnlock() {
      return !(this.canInputPassword && this.formData.password.length >= 8)
    }
  },
  data() {
    return {
      radio: "1",
      encryptedKey: "",
      privateKey: "",
      keyFile: undefined,
      disableBtn: false,
      errText: "",
      canInputPassword: "",
      isLoading: false,
      underlineStyle: {
        width: "65px",
        left: "343px",
      },
      formData: {
        seed: '', // 私钥,
        password: ''// 密码
      },
      pair: null
    }
  },
  watch: {
    'formData.seed'(val) {
      if (isHexSeed(val)) {
        this.canInputPassword = true
      } else {
        this.canInputPassword = false
      }
    }
  },
  methods: {
    ...mapMutations(["setPassWard"]),
    importWalletFromKeystore(file) { // 通过keystore来恢复账户
      importAccountFromKeystore(file.raw).then(pair => {
        this.pair = pair
        this.canInputPassword = pair.isLocked
      })
    },
    unlock() { // 解锁账户 到 我的钱包解锁状态
      this.isLoading = true
      setTimeout(() => {
        try {
          this.pair.unlock(this.formData.password)
          if (!this.pair.isLocked) { // 已解锁
            this.setPassWard(this.formData.password)
            savePair(this.pair, this.formData.password) // 保存到localstorage
            this.$router.push('/newWallet/myWalletUnlock')
          }
        } catch (e) {
          // console.log('err message:', e)
          this.errText = this.$t('errorPassword')
        }
        this.isLoading = false
      }, 10)
    },
    importWalletFromSeed() { // 通过seed恢复账户 to 我的钱包打开
      this.isLoading = true
      setTimeout(() => {
        if (isHexSeed(this.formData.seed) && this.formData.password) {
          this.pair = importAccountFromSeed(this.formData.seed)
          savePair(this.pair, this.formData.password)
          this.$router.push(`/newWallet/myWalletUnlock`)
        } else {
          this.$message.error('私钥格式错误~!')
        }
        this.isLoading = false
      }, 10)
    },
    continueEncryptedKey() {
      if (wallet.isNEP2(this.encryptedKey)) {
        this.canInputPassword = true
        this.errText = ""
      } else {
        this.errText =
          "Invalid Encrypted Key. A valid NEP-2 Encrypted Key looks like 6PYTp4fNNhn2oV6HZhjzfg6YoeC8r1wWsCPikEJXxcTmsitDm92mWpdqd6"
      }
    },
    radioChange(radio) {
      this.canInputPassword = false
      this.privateKey = ""
      this.errText = ""
      if (radio === "1") {
        if (this.$isSupportFileApi() === false) {
          this.$message({
            message: this.$t("open_wallet_cannot_read"),
            type: "warning",
          })
          this.disableBtn = true
        }
      }
    },
    closeAlert() {
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";

.bg-box {
  padding: 20px;
  margin-bottom: 42px;
  background-color: $boxBgColor;
}

.wallet-title {
  text-align: left;
  font-size: 20px;
  color: #47495a;
}

.wallet-subText {
  text-align: left;
  font-size: 18px;
  color: #47495a;
  line-height: 36px;
  margin-bottom: 0;
}

.wallet-group {
  display: block;
  text-align: left;

  .row {
    margin: 38px 0;
  }
}

.input-wrap {
  text-align: left;
}

.btn-wrap {
  margin-top: 70px;
  text-align: left;
}
</style>
