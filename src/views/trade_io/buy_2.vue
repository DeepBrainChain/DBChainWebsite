<template>
  <div class="border-box">
    <step :stepIndex="2"></step>
    <div class="main">
      <div class="flex">
        <div class="l-wrap">
          <h3 class="trade-title">
            购买金额:
            <span>RMB</span>
          </h3>
          <div>
            <input
              class="money-input"
              type="number"
              v-model.number.trim="rmb"
              @input="computeTotalDBC"
            />
          </div>
          <p class="notice">
            温馨提示：DBCTrade平台收取5%的手续费,单次购买金额最多99元，
            <br />DBC价格随时随刻都在波动，请注意风险！
          </p>
        </div>
        <div class="r-wrap">
          <h3 class="trade-title">
            对应的等值数量：
            <span>DBC</span>
          </h3>
          <div class="dbc-num">{{dbc}}</div>
          <p class="trade-info">
            DBC价格参考gate DBC/USDT交易对价格，
            <br />点击查看价格：
            <a
              href="https://www.gateio.co/trade/DBC_USDT"
              target="_blank"
            >https://www.gateio.co/trade/DBC_USDT</a>
          </p>
        </div>
      </div>
      <div class="trade-bottom-wrap">
        <el-button class="confirm-btn" type="primary" size="medium" @click="next">继续</el-button>
        <span class="service">
          客服支持：
          <a href="mailto:support@dbctrade.io">support@dbctrade.io</a> ,客服会在24小时内回复
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Step from "@/components/trade_io/stepNavi";
import { mapActions, mapState } from "vuex";
import { get_pay_dbc_count_dbctrade } from "@/api";
export default {
  name: "buy_2",
  data() {
    return {
      rmb: 0,
      dbc: 0,
      order_id: this.$route.query.order_id
    };
  },
  components: {
    Step
  },
  created() {
    // this.getExchangeRate();
  },
  computed: {
    // ...mapState(["dbcToUS", "USDToCNY"]),
    // computedDBC() {}
  },
  methods: {
    //  ...mapActions(["getExchangeRate"]),
    // get_pay_dbc_count() {},
    computeTotalDBC() {
      if (this.rmb !== "" && this.rmb !== 0) {
        clearTimeout(this.reqSt);
        this.reqSt = setTimeout(() => {
          get_pay_dbc_count_dbctrade({
            order_id: this.$route.query.order_id,
            count: this.rmb
          }).then(res_1 => {
            if (res_1.status === 1) {
              this.dbc = res_1.content;
            }
          });
        }, 1000);
      }
    },

    next() {
      if (this.rmb.length === 0) {
        this.$message({
          showClose: true,
          message: "请输入金额",
          type: "error"
        });
        return;
      }
      if (
        this.rmb
          .toString()
          .match(
            /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
          )
      ) {
        if (this.rmb > 99) {
          this.$message({
            showClose: true,
            message: "金额不能超过99",
            type: "error"
          });
          return;
        } else if (this.rmb <= 0) {
          this.$message({
            showClose: true,
            message: "金额不能小于等于0",
            type: "error"
          });
          return;
        } else {
          this.$router.push({
            path: "/trade/buy_3",
            query: {
              rmb: this.rmb,
              order_id: this.order_id
            }
          });
        }
      } else {
        this.$message({
          showClose: true,
          message: "输入金额不正确",
          type: "error"
        });
      }
    },
    rmbInput() {
      this.rmb = parseFloat(this.rmb).toFixed(2);
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
