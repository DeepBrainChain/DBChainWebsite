<template>
  <div class="wrap1200 bg-box">
    <div class="border-box">
      <h3 class="wallet-title">Open Wallet</h3>
      <p class="wallet-subText">How would you like to access your wallet?</p>
      <div class="wallet-group">
        <div class="row">
          <el-radio class="radio-item" v-model="radio" label="1">Keystore File</el-radio>
        </div>
        <div class="row">
          <el-radio class="radio-item" v-model="radio" label="2">Private key</el-radio>
        </div>
        <div class="row">
          <el-radio class="radio-item" v-model="radio" label="3">Encrypted key</el-radio>
        </div>
      </div>
      <div class="input-wrap">
        <ps-input></ps-input>
      </div>
      <div class="btn-wrap">
        <el-button class="w200" type="primary">unlock</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import PsInput from '@/components/wallet/inputPassword'

  export default {
    name: "index",
    data() {
      return {
        radio: '1',
      }
    },
    components: {
      PsInput
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
    color: #47495A;
  }

  .wallet-subText {
    text-align: left;
    font-size: 18px;
    color: #47495A;
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

</style>
