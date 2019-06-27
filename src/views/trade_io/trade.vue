<template>
  <div class="border-box">
    <div class="title">
      <h3>DBCTrade智能合约交易记录：</h3>
      <p>合约交易地址：<a href="javascript:">www.baxxxxxxx</a></p>
    </div>
    <trade-list class="tb-wrap"></trade-list>
  </div>
</template>

<script>
  // import Head from "../../components/head/index";
  import {mapActions, mapState} from 'vuex'
  import TradeList from "../../components/wallet/tradeList";

  export default {
    name: "trade",
    created () {
      this.getExchangeRate()
      this.getAccountState().then(data => {
        this.symbol = data.symbol
        this.getTransferList()
      }).catch(err => {
        this.$router.push('/openWallet')
      })
    },
    methods: {
      ...mapActions([
        'getAccountState',
        'getTransferList',
        'getExchangeRate'
      ]),
    },
    components: {TradeList}
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/css/variables.scss";

  .title {
    display: flex;
    justify-content: space-between;
    h3 {
      margin: 0;
      line-height: 20px;
      font-size: 20px;
      color: #47495A;
    }
    p {
      margin: 0;
      color: #666;
      font-size: 16px;
      a {
        color: $primaryColor;
      }
    }
  }
  .tb-wrap {
    margin-top: 30px;
  }
</style>
