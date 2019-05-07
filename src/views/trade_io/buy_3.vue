<template>
  <div class="border-box">
    <step></step>
    <div class="main">
      <h3 class="title">请选择支付方式：</h3>
      <div class="pay-chs">
        <div class="item" :class="{active:open_paypal}" @click="open_paypal = true">
          <div class="logo-wrap">
            <i class="iconfont iconpaypal" v-if="open_paypal === false"></i>
            <i class="iconfont iconpaypalcolor" v-else></i>
          </div>
        </div>
        <div class="item" :class="{active:open_wx}" @click="open_wx = true">
          <div class="logo-wrap">
            <i class="iconfont iconweixin"></i><span class="wx center">微信支付</span>
          </div>
        </div>
        <div class="item" :class="{active:open_alipay}" @click="open_alipay = true">
          <div class="logo-wrap">
            <i class="iconfont iconzhifubao"></i><span class="alipay center">支付宝</span>
          </div>
        </div>
      </div>
      <div class="trade-bottom-wrap">
        <div></div>
        <span class="service">客服支持： <a href="mailto:support@dbctra.io">support@dbctra.io</a> ,客服会在24小时内回复</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Step from '@/components/trade_io/stepNavi'

  export default {
    name: "buy_0",
    data() {
      return {
        open_paypal: false,
        open_wx: false,
        open_alipay: false
      }
    },
    methods:{
      clickPay() {

      }
    },
    components: {
      Step
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
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 20px;
    color: #47495A;
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
