<template>
  <div class="border-box">
    <step :step-index="3"></step>
    <div class="main">
      <h3 class="title">{{$t("buyDBC.payBy")}}</h3>
      <div class="pay-chs">
        <PayPal
          :amount="money"
          currency="USD"
          :client="credentials"
          :locale="locale"
          :button-style="myStyle"
          :experience="experienceOptions"
          env="sandbox"
          v-on:payment-authorized="paymentAuthorized"
          v-on:payment-completed="paymentCompleted"
          v-on:payment-cancelled="paymentCancelled"
          >
        </PayPal>
      </div>
      <div class="trade-bottom-wrap">
        <div></div>
        <span class="service">
          {{$t("buyDBC.support")}}：
          <a href="mailto:support@dbctrade.io">support@dbctrade.io</a> ,{{$t("buyDBC.reply")}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Step from "@/components/trade_io/stepNavi";
import PayPal from 'vue-paypal-checkout'
export default {
  name: "buy_3",
  data() {
    return {
      money: String(this.$route.query.usd),
      credentials: {
        sandbox: 'ARjMsl3vJb4k_5-s4MfSRHzYgg4u2CEdCKGmMd6Q61ugXJpwS3putLp_7L3RrNDJo_yTTSQ_k_sWKS1P',
        production: '<production client id>'
      },
      experienceOptions: {
        input_fields: {
          no_shipping: 1
        }
      },
      myStyle: {
        label: 'checkout',
        size:  'medium',    // small | medium | large | responsive
        shape: 'pill',         // pill | rect
        color: 'blue'
      },
      locale:'en_US'
    };
  },
  components: {
    Step,
    PayPal
  },
  created() {
    if (this.$i18n.locale == 'CN') {
      this.locale = "zh_CN"
    } else if (this.$i18n.locale == 'FR') {
      this.locale = "fr_FR"
    } else {
      this.locale = 'en_US'
    }
  },
  methods: {
    // Paypal
    paymentAuthorized: function (data) {
      console.log(data, '验证账号');
    },
    paymentCompleted: function (data) {
      let orderId = data.transactions[0].related_resources[0].sale.id
      this.$router.push({
        path: "/trade/buy_4",
        query: {
          order_id: orderId,
          ...this.$route.query
        }
      });
    },
    paymentCancelled: function (data) {
      console.log(data, '取消付款');
    },
  },
  components: {
    Step,
    PayPal
  }
};
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
  color: #47495a;
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
    border: 1px solid rgba(25, 66, 214, 0.3);
    background-color: rgb(255, 255, 255);

    text-align: center;
    cursor: pointer;
    transition: all 300ms;
    .logo-wrap {
      margin-top: 44px;
      font-size: 30px;
      line-height: 50px;
      color: #7a8ca1;
      transition: all 300ms;
    }
    span {
      display: inline-block;
      vertical-align: middle;
    }
    .iconpaypal {
      display: inline-block;
      font-size: 46px;
      color: #7a8ca1;
    }
    .iconweixin,
    .iconzhifubao {
      display: inline-block;
      font-size: 46px;
      margin-right: 16px;
      vertical-align: middle;
    }
    &.active {
      display: inline-block;
      // height: 352px;
      height: 210px;
      .logo-wrap {
        margin-top: 10px;
      }
      .iconpaypalcolor {
        font-size: 30px;
        color: #419bd8;
      }
      .iconweixin,
      .iconzhifubao {
        font-size: 30px;
      }
      .iconweixin {
        color: #6dd401;
      }
      .iconzhifubao {
        color: #439fe3;
      }
      .wx {
        font-size: 20px;
        color: #6dd401;
      }
      .alipay {
        font-size: 20px;
        color: #439fe3;
      }
    }
  }
}
</style>
