<template>
  <div class="border-box">
    <step :stepIndex="2"></step>
    <div class="main">
      <div class="flex">
        <div class="l-wrap">
          <h3 class="trade-title">
            {{$t("buyDBC.amount")}}:
            <span>USD</span>
          </h3>
          <div>
            <input
              class="money-input"
              type="number"
              v-model.number.trim="usd"
              @input="computeTotalDBC"
            />
          </div>
          <p class="notice">
            {{$t("buyDBC.tip2")}}
            <br />{{$t("buyDBC.tip3")}}
          </p>
        </div>
        <div class="r-wrap">
          <h3 class="trade-title">
            {{$t("buyDBC.quantity")}}:
            <span>DBC</span>
          </h3>
          <div class="dbc-num">{{dbc}}</div>
          <p class="trade-info">
            {{$t("buyDBC.tip4")}}
            <br />{{$t("buyDBC.seePrice")}}
            <a
              href="https://www.gateio.la/trade/DBC_USDT"
              target="_blank"
            >https://www.gateio.la/trade/DBC_USDT</a>
          </p>
        </div>
      </div>
      <div class="trade-bottom-wrap">
        <el-button class="confirm-btn" :disabled='cancontinue' type="primary" size="medium" @click="next">{{$t("buyDBC.continue")}}</el-button>
        <span class="service">
          {{$t("buyDBC.support")}}：{{footer_service}} ,{{$t("buyDBC.reply")}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Step from "@/components/trade_io/stepNavi";
import { getUsdToRmb } from '@/utlis/index'
import { createBuyOd } from '@/api'
export default {
  name: "buy_2",
  data() {
    return {
      price: getUsdToRmb(),
      usd: 0.00,
      dbc: 0,
      rmb: 0.00,
      order_id: '',
      address: this.$route.query.address_user,
      time: null,
      cancontinue: true
    };
  },
  components: {
    Step
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
    getOrder(num) {
      this.rmb = Math.ceil(Number(this.usd) * this.price * 100) / 100
      let data = {
        wallet: this.address,
        order_num: this.order_id,
        usd: num,
        rmb: this.rmb
      }
      createBuyOd(data).then(res => {
        if (res.success) {
          this.dbc = res.content.dbc
          this.order_id = res.content._id
          this.cancontinue = false
        } else {
          if (res.code == -3) {
            if (this.usd = 1) {
              this.$message.error(this.$t('buyDBC.tip10'))
            } else {
              this.$message.error(this.$t('buyDBC.tip9'))
              this.usd = 1
              this.getOrder(this.usd)
            }
          } else if (res.code == -2) {
            this.$message.error(this.$t("buyDBC.tip8"))
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    computeTotalDBC() {
      if (this.usd !== "" && this.usd !== 0) {
        if (this.usd < 1) {
          this.usd = 1
        }
        this.usd = parseFloat(this.usd).toFixed(2)
        clearTimeout(this.time)
        this.time = setTimeout(() => {
          this.getOrder(this.usd)
        }, 1500);
      }
    },
    next() {
      if (this.usd.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t("buyDBC.enterAmount"),
          type: "error"
        });
        return;
      }

      if (this.usd === "" || this.usd === 0) {
        this.$message({
          showClose: true,
          message: this.$t("buyDBC.tip5"),
          type: "error"
        });
        return;
      }

      if (
        this.usd
          .toString()
          .match(
            /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
          )
      ) {
        if (this.usd > 2000) {
          this.$message({
            showClose: true,
            message: this.$t("buyDBC.tip6"),
            type: "error"
          });
          return;
        } else if (this.usd < 1) {
          this.$message({
            showClose: true,
            message: this.$t("buyDBC.tip7"),
            type: "error"
          });
          return;
        } else {
          this.$router.push({
            path: "/trade/buy_3",
            query: {
              usd: this.usd,
              rmb: this.rmb,
              order_id: this.order_id,
              ...this.$route.query
            }
          });
        }
      } else {
        this.$message({
          showClose: true,
          message: this.$t("buyDBC.tip8"),
          type: "error"
        });
      }
    }
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

.flex {
  display: flex;
}

.l-wrap,
.r-wrap {
  width: 50%;
}

.trade-title {
  margin-top: 0;
  margin-bottom: 40px;
  font-size: 20px;
  color: #47495a;

  span {
    color: rgba(110, 130, 153, 0.8);
  }
}

.l-wrap {
  .notice {
    font-size: 14px;
    color: rgba(153, 153, 153, 0.8);
  }
}

.r-wrap {
  .dbc-num {
    font-size: 40px;
    color: #6e8299;
  }

  .trade-info {
    line-height: 28px;
    font-size: 16px;
    color: rgba(71, 73, 90, 0.8);

    a {
      color: $primaryColor;
    }
  }
}

.trade-bottom-wrap {
  margin-top: 124px;
}
</style>
