<template>
  <div class="border-box">
    <step :step-index="4"></step>
    <div class="main">
      <div class="title">
        <h3>{{display_text}}</h3>
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
import TradeList from "@/components/wallet/tradeList";
import { confirmPayment } from "@/api";
export default {
  name: "buy_3",
  data() {
    return {
      pay_result: false,
      open_paypal: false,
      open_wx: false,
      open_alipay: false,
      si: undefined,
      order_id: this.$route.query.order_id,
      display_text: this.$t("buyDBC.status1")
    };
  },
  beforeDestroy() {},
  mounted() {
    this.dbc_is_ok()
  },
  methods: {
    dbc_is_ok() {
      confirmPayment({
        orderId: this.$route.query.order_id,
        wallet: this.$route.query.address_user,
        DBCNum: this.$route.query.DBCNum,
      }).then(res => {
        console.log(res, 'res')
        if (res.success) {
          this.display_text = this.$t("buyDBC.status2")
        } else {
          if (res.code == -5) {
            this.display_text = this.$t("buyDBC.status3")
          } else if (res.code == -4 || res.code == -3 || res.code == -2) {
            this.display_text = this.$t("buyDBC.status4")
          } else {
            this.$message.error(res.msg)
          }
        }
        // if (res_1.status === 1) {
        //   this.display_text =
        //     "DBC转账成功，到账大概需要几分钟，请到钱包地址中查看";
        //   this.pay_result = true;
        // } else if (res_1.status === 2) {
        //   this.display_text = "正在转账处理中，请等待";
        // } else if (res_1.status === -1 && res_1.code === "11703") {
        //   this.display_text = "支付失败，请重新支付";
        //   this.pay_result = true;
        // } else if (res_1.status === -1 && res_1.code === "11704") {
        //   this.display_text =
        //     "支付成功，但DBC转账失败，请邮件联系support@dbctrade.io.我们会在24小时内帮您处理";
        //   this.pay_result = true;
        // } else if (res_1.status === -1 && res_1.code === "11705") {
        //   this.display_text =
        //     "支付失败，请邮件联系support@dbctrade.io.我们会在24小时内帮您处理";
        //   this.pay_result = true;
        // }
      });
    }
  },
  components: {
    Step,
    TradeList
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
  display: flex;
  justify-content: space-between;
  h3 {
    margin: 0;
    line-height: 20px;
    font-size: 20px;
    color: #47495a;
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
    background-color: #f0f5fa;
    border: 1px solid rgba(122, 140, 161, 0.3);
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
      height: 352px;
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
