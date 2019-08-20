<template>
  <div class="wrap1200 bg-box">
    <div class="border-box">
      <h3 class="wallet-title">{{$t('open_wallet')}}</h3>
      <p class="wallet-subText">{{$t('access_wallet')}}</p>
      <el-radio-group class="wallet-group" v-model="radio" @change="radioChange">
        <div class="row">
          <el-radio class="radio-item" label="1">{{$t('keystore_file')}}</el-radio>
        </div>
        <div class="row">
          <el-radio class="radio-item" label="2">{{$t('private_key')}}</el-radio>
        </div>
        <!--  <div class="row">
          <el-radio class="radio-item" label="3">{{$t('encrypted_key')}}</el-radio>
        </div>-->
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
              :on-change="keyFileChange"
              :disabled="disableBtn"
            >
              <el-button slot="trigger" size="small" type="primary">{{$t('select_wallet_file')}}</el-button>
            </el-upload>
          </div>
          <!--      EncryptedKey input-->
          <div v-else-if="radio === '3'" class="input-wrap">
            <ps-input v-model="encryptedKey">{{$t('paste_key')}}</ps-input>
          </div>
          <!--         password input-->
          <div v-if="canInputPassword" class="input-wrap mt20">
            <ps-input v-model.trim="password" :isPassword="true" :placeholder="$t('enter_key')"></ps-input>
          </div>
          <div v-if="radio === '3' && !canInputPassword" class="btn-wrap">
            <el-button class="w200" type="primary" @click="continueEncryptedKey">{{$t('continue')}}c</el-button>
          </div>
          <div v-if="canInputPassword" class="btn-wrap">
            <el-button
              class="w200"
              type="primary"
              native-type="submit"
              @keyup.enter.native="unlockWalletFromEncryptedKey"
              @click.native="unlockWalletFromEncryptedKey"
              :loading="isLoading"
            >{{$t('unlock')}}</el-button>
          </div>
        </div>

        <!--      privatekey-->
        <div v-else-if="radio === '2'">
          <div class="input-wrap">
            <ps-input v-model="privateKey" :placeholder="$t('paste_key')"></ps-input>
          </div>
          <div class="btn-wrap">
            <el-button
              class="w200"
              type="primary"
              @click="unlockWalletFromPrivateKey"
              :loading="isLoading"
            >{{$t('unlock')}}</el-button>
          </div>
        </div>

        <el-alert
          class="mt20"
          v-if="errText.length > 0"
          type="error"
          :description="errText"
          show-icon
          :closable="false"
          @close="closeAlert"
        ></el-alert>
      </el-form>
    </div>
  </div>
</template>

<script>
import PsInput from "@/components/wallet/inputPassword";
import { mapActions, mapState } from "vuex";
import { wallet } from "@cityofzion/neon-js";

export default {
  name: "index",
  data() {
    return {
      radio: "1",
      password: "",
      encryptedKey: "",
      privateKey: "",
      keyFile: undefined,
      disableBtn: false,
      errText: "",
      canInputPassword: "",
      isLoading: false
    };
  },
  methods: {
    ...mapActions([
      "createAccountFromPrivateKey",
      "createAccountFromEncryptedKey"
    ]),
    unlockWalletFromEncryptedKey() {
      this.isLoading = true;
      if (this.password.length > 0) {
        this.createAccountFromEncryptedKey({
          encryptedKey: this.encryptedKey,
          password: this.password
        })
          .then(() => {
            this.pushToMyWalletUnlock();
          })
          .catch(() => {
            this.errText = "then key or password is wrong~!";
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    unlockWalletFromPrivateKey() {
      this.isLoading = true;
      this.createAccountFromPrivateKey(this.privateKey)
        .then(() => {
          this.pushToMyWalletUnlock();
        })
        .catch(err => {
          this.errText = this.$t("msg.wallet_4");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    continueEncryptedKey() {
      if (wallet.isNEP2(this.encryptedKey)) {
        this.canInputPassword = true;
        this.errText = "";
      } else {
        this.errText =
          "Invalid Encrypted Key. A valid NEP-2 Encrypted Key looks like 6PYTp4fNNhn2oV6HZhjzfg6YoeC8r1wWsCPikEJXxcTmsitDm92mWpdqd6";
      }
    },
    keyFileChange(file) {
      const fileReader = new FileReader();
      fileReader.onload = event => {
        const encryptedKey = event.target.result;
        /*this.createAccountFromEncryptedKey(encryptedKey).then(account => {
            this.encryptedKey = account.encrypted
            this.canInputPassword =true
            this.errText=''
          }).catch(err => {
          })*/
        if (wallet.isNEP2(encryptedKey)) {
          this.encryptedKey = encryptedKey;
          this.canInputPassword = true;
          this.errText = "";
        } else {
          this.errText =
            "Invalid Encrypted Key. A valid NEP-2 Encrypted Key looks like 6PYTp4fNNhn2oV6HZhjzfg6YoeC8r1wWsCPikEJXxcTmsitDm92mWpdqd6";
        }
      };
      fileReader.readAsText(file.raw);
    },
    radioChange(radio) {
      this.canInputPassword = false;
      this.privateKey = "";
      this.errText = "";
      if (radio === "1") {
        if (this.$isSupportFileApi() === false) {
          this.$message({
            message: "你的浏览器不支持本地文件读取",
            type: "warning"
          });
          this.disableBtn = true;
        }
      }
    },
    pushToMyWalletUnlock() {
      const type = this.$route.params.type
      this.$router.push(`/${type}/myWalletUnlock`)
    },
    closeAlert() {}
  },
  computed: {
    ...mapState(["account"])
  },
  components: {
    PsInput
  }
};
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
