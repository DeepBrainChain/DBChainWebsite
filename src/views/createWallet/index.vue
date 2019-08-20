<template>
  <div class="wrap1200 bg-box">
    <div class="border-box">
      <h3 class="wallet-title">{{$t('newWallet')}}</h3>
      <template v-if="step === 0">
        <p class="wallet-subText">{{$t('msg.wallet_5')}}</p>
        <div class="input-wrap">
          <ps-input :isPassword="true" :placeholder="$t('enterPassword')" v-model.trim="password"></ps-input>
        </div>
      </template>
      <template v-if="step === 1">
        <p class="wallet-subText">{{$t('msg.wallet_0')}}</p>
        <div>
          <el-button class="btn lg" plain @click="saveKeyFile">{{$t('dlEncryptedKey')}}</el-button>
        </div>
        <p class="wallet-notice" v-html="$t('msg.wallet_1')"></p>
      </template>
      <template v-if="step === 2">
        <p class="wallet-subText">{{$t('msg.wallet_2')}}</p>
        <p class="private-key">{{this.wif}}</p>
        <p class="wallet-notice" v-html="$t('msg.wallet_3')"></p>
      </template>
      <el-alert
        class="mt20"
        v-if="errText.length > 0"
        title="error"
        type="error"
        :description="errText"
        show-icon
        :closable="false"
      ></el-alert>
      <div class="btn-wrap">
        <el-button
          v-if="step === 0"
          class="w200"
          type="primary"
          :loading="btnloading"
          @click="generateAccount"
        >{{$t('create')}}</el-button>
        <el-tooltip v-else-if="step === 1" :disabled="isNext" content="请下载加密后的私钥">
          <el-button
            class="w200"
            :class="{'is-disabled': !isNext}"
            type="primary"
            :loading="btnloading"
            @click="next"
          >{{$t('continue')}}</el-button>
        </el-tooltip>

        <el-button
          v-else-if="step === 2"
          class="w200"
          type="primary"
          :loading="btnloading"
          @click="pushToMyWallet"
        >{{$t('finished')}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import PsInput from "@/components/wallet/inputPassword";
import {
  createAccount,
  getWIFFromPrivateKey,
  saveCookie,
  getAccount
} from "@/utlis";
import fileSave from "file-saver";

export default {
  name: "index",
  data() {
    return {
      radio: "1",
      password: "",
      errText: "",
      btnloading: false,
      step: 0,
      nep2Key: "",
      wif: "",
      isNext: false
    };
  },
  created() {},
  watch: {
    password(newVal) {
      if (newVal.length >= 8) {
        this.errText = "";
      } else {
        this.errText = this.$t("inputPsWarning");
      }
    }
  },
  methods: {
    generateAccount() {
      if (this.password.length >= 8) {
        this.btnloading = true;
        createAccount(this.password)
          .then(({ nep2Key, privateKey }) => {
            this.nep2Key = nep2Key;
            this.wif = getWIFFromPrivateKey(privateKey);
            this.step = 1;
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            this.btnloading = false;
          });
      } else {
        this.errText = this.$t("inputPsWarning");
      }
    },
    saveKeyFile() {
      const blob = new Blob([this.nep2Key], {
        type: "text/plain;charset=utf-8"
      });
      fileSave.saveAs(blob, `${this.nep2Key}.txt`)
      this.isNext = true
    },
    pushToMyWallet() {
      const type = this.$route.params.type
      saveCookie(getAccount());
      this.$router.push(`/${type}/myWalletUnlock`);
    },
    next() {
      if (this.isNext) {
        this.step = 2
      }
    }
  },
  components: {
    PsInput
  }
};
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
