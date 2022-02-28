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
          :env="boxEnv"
          v-on:payment-authorized="paymentAuthorized"
          v-on:payment-completed="paymentCompleted"
          v-on:payment-cancelled="paymentCancelled"
          >
        </PayPal>
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
import PayPal from 'vue-paypal-checkout'
export default {
  name: "buy_3",
  data() {
    return {
      money: String(this.$route.query.usd),
      credentials: {
        sandbox: 'ARjMsl3vJb4k_5-s4MfSRHzYgg4u2CEdCKGmMd6Q61ugXJpwS3putLp_7L3RrNDJo_yTTSQ_k_sWKS1P', //<sandbox client id>
        production: '<production client id>'
      },
      boxEnv: 'sandbox', // sandbox, production
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
    // Paypal
    paymentAuthorized: function (data) {
      console.log(data, '验证账号');
    },
    paymentCompleted: function (data) {
      let orderId = data.transactions[0].related_resources[0].sale.id
      this.$router.push({
        path: "/trade/buy_4",
        query: {
          pay_id: orderId,
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
