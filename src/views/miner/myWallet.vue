<template>
  <div class="my-wallet">
    <div class="wallet-btns">
      <el-button type="primary" v-on:click="openCreateWallet('/createWallet')">创建钱包账号</el-button>
      <el-button type="primary" v-on:click="openWallet">打开钱包账号</el-button>
    </div>
    <div class="center-box">
      <el-button plain>Open or create a wallet to 出租机器</el-button>
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
  import {mapActions, mapState} from 'vuex'

  export default {
    name: "myWallet",
    created() {

    },
    methods: {
      ...mapActions([
        'getAccountState',
        'getTransferList'
      ]),
      openCreateWallet() {
        this.$router.push('/createWallet')
      },
      openWallet() {
        this.getAccountState().then(data => {
          this.$router.push('/miner/myWalletUnlock')
        }).catch(err => {
          this.$router.push('/openWallet')
        })
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
