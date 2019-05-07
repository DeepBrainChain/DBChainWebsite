<template>
  <div class="my-wallet">
    <div class="wallet-btns">
      <el-button type="primary" v-on:click="pushTo('/createWallet')">创建钱包账号</el-button>
      <el-button type="primary" v-on:click="pushTo('/openWallet')">打开钱包账号</el-button>
    </div>
    <div class="center-box">
      <el-button plain>Open or create a wallet to 租用机</el-button>
    </div>
    <div class="center-box">
      <el-button class="btn lg" plain>
        Transfer Details<br>
        Open or create a wallet to view wallet transfer details.
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "myWallet",
    methods: {
      pushTo(to) {
        this.$router.push(to)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wallet-btns {
    margin-bottom: 30px;
    text-align: left;
  }

  .center-box {
    padding: 55px 0;
    border: 1px solid #7A8CA1;
    border-radius: 2px;
    margin-bottom: 30px;
    text-align: center;
    .btn {
      line-height: 22px;
    }
  }
</style>
