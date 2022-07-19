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
          {{$t("buyDBC.support")}}：{{footer_service}} ,{{$t("buyDBC.reply")}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Step from "@/components/trade_io/stepNavi";
import TradeList from "@/components/wallet/tradeList";
import { confirmPayment, checkPayByAli } from "@/api";
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
  computed: {
    footer_service() {
      if (this.$t("website_name") == "dbchain") {
        return this.$t("footer_service_dbchain");
      } else if (this.$t("website_name") == "yousanai") {
        return this.$t("footer_service_yousanai");
      } else if (this.$t("website_name") == "aionego") {
        return this.$t("footer_service_aionego");
      } else if (this.$t("website_name") == "deepshare") {
        return this.$t("footer_service_deepshare");
      } else if (this.$t("website_name") == "panchuangai") {
        return this.$t("footer_service_panchuangai");
      } else if (this.$t("website_name") == "sharegpu") {
        return this.$t("footer_service_sharegpu");
      } else if (this.$t("website_name") == "yalecloud") {
        return this.$t("footer_service_yalecloud");
      } else if (this.$t("website_name") == "52lm") {
        return this.$t("footer_service_52lm");
      } else if (this.$t("website_name") == "dimi") {
        return this.$t("footer_service_dimi");
      } else if (this.$t("website_name") == "mayi") {
        return this.$t("footer_service_mayi");
      } else if (this.$t("website_name") == "windywinter") {
        return this.$t("footer_service_windywinter");
      } else if (this.$t("website_name") == "1024lab") {
        return this.$t("footer_service_1024lab");
      } else if (this.$t("website_name") == "litaai") {
        return this.$t("footer_service_litaai");
      } else if (this.$t("website_name") == "ainlp") {
        return this.$t("footer_service_ainlp");
      } else if (this.$t("website_name") == "52cv") {
        return this.$t("footer_service_52cv");
      } else if (this.$t("website_name") == "redstonewill") {
        return this.$t("footer_service_redstonewill");
      } else if (this.$t("website_name") == "alpha-dbchain") {
        return this.$t("footer_service_alpha_dbchain");
      } else if (this.$t("website_name") == "xyzlab") {
        return this.$t("footer_service_xyzlab");
      } else if (this.$t("website_name") == "gpgpu") {
        return this.$t("footer_service_gpgpu");
      } else if (this.$t("website_name") == "rocketai") {
        return this.$t("footer_service_rocketai");
      } else if (this.$t("website_name") == "deepbit") {
        return this.$t("footer_service_deepbit");
      } else if (this.$t("website_name") == "aichriscloud") {
        return this.$t("footer_service_aichriscloud");
      } else if (this.$t("website_name") == "vnxmart") {
        return this.$t("footer_service_vnxmart");
      } else if (this.$t("website_name") == "aiaicloud") {
        return this.$t("footer_service_aiaicloud");
      } else if (this.$t("website_name") == "snbt") {
        return this.$t("footer_service_snbt");
      } else if (this.$t("website_name") == "heekmind") {
        return this.$t("footer_service_heekmind");
      } else if (this.$t("website_name") == "aicv") {
        return this.$t("footer_service_aicv");
      } else if (this.$t("website_name") == "freegpu") {
        return this.$t("footer_service_freegpu");
      } else if (this.$t("website_name") == "boincplanet") {
        return this.$t("footer_service_boincplanet");
      } else if (this.$t("website_name") == "shareaiot") {
        return this.$t("footer_service_shareaiot");
      } else if (this.$t("website_name") == "topgpu") {
        return this.$t("footer_service_topgpu");
      } else if (this.$t("website_name") == "thinkotech") {
        return this.$t("footer_service_thinkotech");
      } else if (this.$t("website_name") == "coolgpu") {
        return this.$t("footer_service_coolgpu");
      } else if (this.$t("website_name") == "scclouds") {
        return this.$t("footer_service_scclouds");
      } else if (this.$t("website_name") == "nvidiaai") {
        return this.$t("footer_service_nvidiaai");
      } else if (this.$t("website_name") == "deligpu") {
        return this.$t("footer_service_deligpu");
      } else if (this.$t("website_name") == "longway") {
        return this.$t("footer_service_longway");
      } else if (this.$t("website_name") == "sharedgpu") {
        return this.$t("footer_service_sharedgpu");
      } else if (this.$t("website_name") == "aipower") {
        return this.$t("footer_service_aipower");
      } else if (this.$t("website_name") == "cvstudy") {
        return this.$t("footer_service_cvstudy");
      } else if (this.$t("website_name") == "gpuhub") {
        return this.$t("footer_service_gpuhub");
      } else if (this.$t("website_name") == "district51") {
        return this.$t("footer_service_district51");
      } else if (this.$t("website_name") == "deepmind") {
        return this.$t("footer_service_deepmind");
      } else if (this.$t("website_name") == "transportation") {
        return this.$t("footer_service_transportation");
      } else if (this.$t("website_name") == "planetc") {
        return this.$t("footer_service_planetc");
      } else if (this.$t("website_name") == "sdnu") {
        return this.$t("footer_service_sdnu");
      } else if (this.$t("website_name") == "freegputop") {
        return this.$t("footer_service_freegputop");
      } else if (this.$t("website_name") == "tensorgpu") {
        return this.$t("footer_service_tensorgpu");
      } else if (this.$t("website_name") == "opengpu") {
        return this.$t("footer_service_opengpu");
      } else if (this.$t("website_name") == "aiyanxishe") {
        return this.$t("footer_service_aiyanxishe");
      } else if (this.$t("website_name") == "codefate") {
        return this.$t("footer_service_codefate");
      } else if (this.$t("website_name") == "changhe") {
        return this.$t("footer_service_changhe");
      } else if (this.$t("website_name") == "dpool") {
        return this.$t("footer_service_dpool");
      } else if (this.$t("website_name") == "tycloud") {
        return this.$t("footer_service_tycloud");
      } else if (this.$t("website_name") == "Nexuicloud") {
        return this.$t("footer_service_Nexuicloud");
      }

      return this.$t("footer_service_dbchain");
    }
  },
  methods: {
    dbc_is_ok() {
      if (this.$route.query.payType == 'paypal') {
        confirmPayment({
          orderId: this.$route.query.order_id,
          payId: this.$route.query.pay_id,
          wallet: this.$route.query.address_user
        }).then(res => {
          if (res.success) {
            this.display_text = this.$t("buyDBC.status2")
          } else {
            if (res.code == -5 || res.code == -6) {
              this.display_text = this.$t("buyDBC.status3")
            } else if (res.code == -4 || res.code == -3 || res.code == -2) {
              this.display_text = this.$t("buyDBC.status4")
            } else if (res.code == -7) {
              this.display_text = this.$t("buyDBC.status5")
            } else {
              this.$message.error(res.msg)
            }
          }
        });
      } else {
        checkPayByAli({ orderId: this.order_id, wallet: this.$route.query.address_user }).then(res => {
          if (res.success) {
            this.display_text = this.$t("buyDBC.status2")
          } else {
            if (res.code == -5 && res.code == -6) {
              this.display_text = this.$t("buyDBC.status3")
            } else if (res.code == -4 || res.code == -3 || res.code == -2) {
              this.display_text = this.$t("buyDBC.status4")
            } else if (res.code == -7) {
              this.display_text = this.$t("buyDBC.status5")
            } else {
              this.$message.error(res.msg)
            }
          }
        })
      }
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
