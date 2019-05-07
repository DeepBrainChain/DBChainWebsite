<template>
  <div class="wrap1200 bg-box">
    <div class="border-box">
      <h3 class="wallet-title">Open Wallet</h3>
      <p class="wallet-subText">
        This password encrypts your private key.This does not act as a seed to generate your keys.<br>
        You will need this passwprd and your private key to unlock your wallet.
      </p>
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
