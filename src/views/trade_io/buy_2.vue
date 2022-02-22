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
        <el-button class="confirm-btn" type="primary" size="medium" @click="next">{{$t("buyDBC.continue")}}</el-button>
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
import { dbcPriceOcw } from '@/utlis/dot/api'
export default {
  name: "buy_2",
  data() {
    return {
      usd: 0.00,
      dbc: 0,
      dbcPrice: 0.002771,
      order_id: this.$route.query.order_id
    };
  },
  components: {
    Step
  },
  created() {
    this.getPrice()
  },
  computed: {},
  methods: {
    computeTotalDBC() {
      if (this.usd !== "" && this.usd !== 0) {
        this.usd = parseFloat(this.usd).toFixed(2)
        const useUSD = this.usd - (this.usd*0.14+0.3)
        this.dbc = Math.ceil(useUSD/this.dbcPrice)
      }
    },
    async getPrice() {
      let DBCprice1 = await dbcPriceOcw()
      this.dbcPrice = DBCprice1/1000000
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
        } else if (this.usd <= 0) {
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
              DBCNum: this.dbc,
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
