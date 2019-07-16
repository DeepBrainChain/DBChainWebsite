<template>
  <div class="border-box">
    <step :step-index="4"></step>
    <div class="main">
      <div class="title">
        <h3>支付已完成，请查看转账合约记录</h3>
      </div>
      <trade-list class="tb-wrap"></trade-list>

      <div class="trade-bottom-wrap">
        <div></div>
        <span class="service">客服支持： <a href="mailto:support@dbctra.io">support@dbctra.io</a> ,客服会在24小时内回复</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Step from '@/components/trade_io/stepNavi'
  import TradeList from "../../components/wallet/tradeList";

  export default {
    name: "buy_3",
    data() {
      return {
        open_paypal: false,
        open_wx: false,
        open_alipay: false
      }
    },
    methods:{

    },
    components: {
      Step,
      TradeList
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/css/variables.scss";

  .border-box {
    padding: 30px 0;
  }
  .main {
    padding: 30px;
  }
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

  .trade-bottom-wrap {
    margin-top: 30px;
  }
  .pay-chs {
    display: flex;
    justify-content: space-between;
    .item {
      box-sizing: border-box;
      width: 352px;
      height: 137px;
      background-color: #F0F5FA;
      border: 1px solid rgba(122,140,161,0.3);
      text-align: center;
      cursor: pointer;
      transition: all 300ms;
      .logo-wrap {
        margin-top: 44px;
        font-size: 30px;
        line-height: 50px;
        color: #7A8CA1;
        transition: all 300ms;
      }
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .iconpaypal {
        display: inline-block;
        font-size: 46px;
        color: #7A8CA1;
      }
      .iconweixin,.iconzhifubao {
        display: inline-block;
        font-size: 46px;
        margin-right: 16px;
        vertical-align: middle;
      }
      &.active {
        display: inline-block;
        height: 352px;
        .logo-wrap {
          margin-top: 10px;
        }
        .iconpaypalcolor {
          font-size: 30px;
          color: #419bd8;
        }
        .iconweixin,.iconzhifubao {
          font-size: 30px;
        }
        .iconweixin {
          color: #6DD401;
        }
        .iconzhifubao {
          color: #439fe3;
        }
        .wx {
          font-size: 20px;
          color: #6DD401;
        }
        .alipay {
          font-size: 20px;
          color: #439fe3;
        }
      }
    }
  }
</style>
