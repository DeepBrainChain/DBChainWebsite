<template>
  <div class="wallet-box">
    <h3>Details</h3>
    <div class="box-content">
      <div class="flex vCenter">
        <el-tooltip
          class="item"
          effect="dark"
          content="钱包地址：
您的地址也可以称为您的帐户。当你把这个地址发给对方时，对方可以给您的钱包地址打DBC代币。"
        >
          <i class="icon-tip el-icon-question"></i>
        </el-tooltip>
        <label>your address:</label>
      </div>
      <div class="pl30">
        <mu-text-field :value="address" full-width readonly></mu-text-field>
      </div>
      <template v-if="encryptedKey">
        <div class="flex vCenter">
          <el-tooltip class="item" effect="dark" content="提示文字">
            <i class="icon-tip el-icon-question"></i>
          </el-tooltip>
          <label>Keystore File:</label>
        </div>
        <div class="pt10 pl30">
          <el-button type="primary" size="small" @click="saveKeyFile">DOWNLOAD ENCRYPTED KEY</el-button>
        </div>
      </template>

      <div class="flex vCenter pt10">
        <el-tooltip
          class="item"
          effect="dark"
          content="您的私钥
这是您的私钥的未加密文本版本，意味着不需要密码。如果有人找到你的未加密的私钥，他们可以在没有密码的情况下访问你的钱包。因此，通常建议使用加密版本"
        >
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
      </div>
      <!--<div class="flex vCenter">
        <el-tooltip class="item" effect="dark" content="提示文字">
          <i class="icon-tip el-icon-question"></i>
        </el-tooltip>
        <label>Print Paper Wallet:</label>
      </div>
      <div>
        <div class="pt10 pl30">
          <el-button type="primary" size="small">PRINT PAPER WALLET</el-button>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
  import cookie from 'js-cookie'
  import {
    getEncryptedKey,
    getAccount
  } from "@/utlis"
  import fileSave from "file-saver"

  export default {
    name: "walletBox",
    data() {
      return {
        address: "",
        encryptedKey: "",
        wif: "",
        visibility: false
      }
    },
    created() {
      this.address = getAccount().address
      // this.nep2Key = getAccount().encrypted
      this.wif = getAccount().WIF
      this.encryptedKey = cookie.get('encryptedKey')
    },
    methods: {
      saveKeyFile() {
        const blob = new Blob([this.encryptedKey], {
          type: "text/plain;charset=utf-8"
        })
        fileSave.saveAs(blob, `${this.encryptedKey}.txt`)
      }
    }
  }
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
