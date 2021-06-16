<template>
  <div>
    <Header
      v-if="this.$store.state.webtype"
      :underline-style="underlineStyle"
    />
    <div class="wrap1200 bg-box">
      <div class="border-box">
        <h3 class="wallet-title">
          {{ $t('newWallet') }}
        </h3>
        <!-- 创建密码 -->
        <template v-if="step === 0">
          <p class="wallet-subText">
            {{ $t('msg.wallet_6') }}
          </p>
          <div class="input-wrap">
            <ps-input
              v-model.trim="password"
              :is-password="true"
              :placeholder="$t('enterPassword')"
            />
          </div>
        </template>
        <!-- 下载私钥文件 -->
        <template v-if="step === 1">
          <p class="wallet-subText">
            {{ $t('msg.wallet_0') }}
          </p>
          <div>
            <el-button
              class="btn lg"
              plain
              @click="saveKeyFile"
            >
              {{ $t('dlEncryptedKey') }}
            </el-button>
          </div>
          <p
            class="wallet-notice"
            v-html="$t('msg.wallet_1')"
          />
        </template>
        <!-- 添加私钥助记词  隐藏 -->
        <!-- <template v-if="step === 2">
          <p class="wallet-subText">
            {{ $t('msg.wallet_2') }}
          </p>
          <p class="private-key">
            {{ this.seed }}
          </p>
          <p
            class="wallet-notice"
            v-html="$t('msg.wallet_3')"
          />
        </template> -->
        <el-alert
          v-if="errText.length > 0"
          class="mt20"
          title="error"
          type="error"
          :description="errText"
          show-icon
          :closable="false"
        />
        <div class="btn-wrap">
          <!-- 第0步-创建-->
          <el-button
            v-if="step === 0"
            class="w200"
            type="primary"
            :loading="btnloading"
            :disabled="errText.length > 0"
            @click="toStep1"
          >
            {{ $t('create') }}
          </el-button>
          <!-- 第1步-下载文件-->
          <el-tooltip
            v-else-if="step === 1"
            :disabled="isNext"
            :content="$t('creat_wallet_index_download')"
          >
            <el-button
              class="w200"
              :class="{'is-disabled': !isNext}"
              type="primary"
              :loading="btnloading"
              @click="pushToMyWallet"
            >
              {{ $t('finished') }}
            </el-button>
          </el-tooltip>


          <!--<el-tooltip
            v-else-if="step === 1"
            :disabled="isNext"
            :content="$t('creat_wallet_index_download')"
          >
            <el-button
              class="w200"
              :class="{'is-disabled': !isNext}"
              type="primary"
              :loading="btnloading"
              @click="toStep2"
            >
              {{ $t('continue') }}
            </el-button>
          </el-tooltip>

          <el-button
            v-else-if="step === 2"
            class="w200"
            type="primary"
            :loading="btnloading"
            @click="pushToMyWallet"
          >
            {{ $t('finished') }}
          </el-button> -->
        </div>
      </div>
    </div>
    <Footer v-if="this.$store.state.webtype" />
  </div>
</template>

<script>
import PsInput from "@/components/wallet/inputPassword"
import {
  saveCookie,
  getAccount,
} from "@/utlis"
import {
  createAccountFromSeed,
  exportAccountForKeystore,
  savePair
} from '@/utlis/dot/index.ts'
import Header from "@/congTuCloud/components/header/SubHeader.vue"
import Footer from "@/congTuCloud/components/footer/Footer.vue"

export default {
  name: "CreateWallet",
  components: {
    PsInput,
    Header,
    Footer,
  },
  data() {
    return {
      radio: "1",
      errText: "",
      btnloading: false,
      step: 0,
      nep2Key: "",
      isNext: false,
      underlineStyle: {
        width: "65px",
        left: "343px",
      },
      // 新加
      seed: '', // 生成的种子秘钥，即私钥
      pair: null, // 账户
      password: "",
    }
  },
  watch: {
    password(newVal) {
      if (newVal.length >= 8) {
        this.errText = ""
      } else {
        this.errText = this.$t("inputPsWarning")
      }
    },
  },
  methods: {
    async generateAccount() { // 生成新账号
      const {seed, pair} = await createAccountFromSeed()
      this.seed = seed
      this.pair = pair
    },
    saveKeyFile() {
      if (this.pair && this.password) {
        exportAccountForKeystore(this.pair, this.password)
        this.isNext = true
      }
    },
    pushToMyWallet() {
      savePair(this.pair, this.password)
      this.$router.push(`/newWallet/myWalletUnlock`)
    },
    toStep1 () {
      if (!this.errText) {
        this.generateAccount().then(() => {
          this.step = 1
        })
      }
    },
    toStep2() {
      if (this.isNext) {
        this.step = 2
      }
    },
  },
}
</script>

<style lang="scss" scoped>
/*@import "~@/assets/css/variables.scss";*/

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
}

.wallet-group {
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

.wallet-notice {
  line-height: 24px;
}

.private-key {
  font-size: 16px;
  font-weight: 700;
}
</style>
