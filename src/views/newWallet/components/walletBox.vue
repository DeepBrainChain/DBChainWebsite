<template>
  <div class="wallet-box">
    <h3>Details</h3>
    <div class="box-content">
      <div class="flex vCenter">
        <el-tooltip class="item" effect="dark" :content="this.$t('wallet_box_adddress')">
          <i class="icon-tip el-icon-question"></i>
        </el-tooltip>
        <label>your address:</label>
      </div>
      <div class="pl30">
        <mu-text-field :value="address" full-width readonly></mu-text-field>
      </div>
      <template>
        <div class="flex vCenter">
          <el-tooltip class="item" effect="dark" :content="this.$t('wallet_box_keystore')">
            <i class="icon-tip el-icon-question"></i>
          </el-tooltip>
          <label>Keystore File:</label>
        </div>
        <div class="pt10 pl30">
          <el-button type="primary" size="small" @click="saveKeyFile">DOWNLOAD Keystore File</el-button>
        </div>
      </template>
<!--      <div class="flex vCenter pt10">
        <el-tooltip class="item" effect="dark" :content="this.$t('wallet_box_key')">
          <i class="icon-tip el-icon-question"></i>
        </el-tooltip>
        <label>Your Private Key:</label>
      </div>
      <div class="pl30">
        <mu-text-field
          full-width
          :value="wif"
          readonly
          :action-icon="visibility ? 'visibility_off' : 'visibility'"
          :action-click="() => (visibility = !visibility)"
          :type="visibility ? 'text' : 'password'"
        ></mu-text-field>
      </div>-->
    </div>
  </div>
</template>

<script>
import cookie from "js-cookie";
import {exportAccountForKeystore, getCurrentPair, savePair} from "@/utlis/dot"
import fileSave from "file-saver";

export default {
  name: "walletBox",
  data() {
    return {
      address: "",
      encryptedKey: "",
      wif: "",
      visibility: false,
      pair: null
    };
  },
  created() {
    this.pair = getCurrentPair()
    this.address = this.pair.address
    // this.nep2Key = getAccount().encrypted
    // this.wif = getAccount().WIF;
    // this.encryptedKey = cookie.get("encryptedKey");
  },
  methods: {
    saveKeyFile() {
      exportAccountForKeystore(this.pair)
    }
  }
};
</script>

<style lang="scss" scoped>
.wallet-box {
  border: 1px solid #979797;

  h3 {
    margin: 0;
    height: 48px;
    line-height: 48px;
    padding-left: 30px;
    color: #666;
    border-bottom: 1px solid #979797;
  }

  .box-content {
    padding: 10px 30px;

    .icon-tip {
      font-size: 20px;
      margin-right: 10px;
    }

    label {
      display: inline-block;
      font-size: 16px;
      color: #666;
      line-height: 24px;
    }
  }
}
</style>
