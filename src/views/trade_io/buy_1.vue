<template>
  <div class="border-box">
    <step :stepIndex="1"></step>
    <div class="main">
      <div class="flex">
        <div class="l-wrap">
          <h3 class="trade-title">购买金额: <span>RMB</span></h3>
          <div>
            <input class="money-input" type="text" v-model.trim.number="rmb">
          </div>
          <p class="notice">平台收取3%的手续费</p>
        </div>
        <div class="r-wrap">
          <h3 class="trade-title">对应的等值数量：<span>DBC</span></h3>
          <div class="dbc-num">{{dbc}}</div>
          <p class="trade-info">
            DBC价格参考gate DBC/USDT交易对价格， <br>
            点击查看价格：<a href="https://www.gateio.co/trade/DBC_USDT">https://www.gateio.co/trade/DBC_USDT</a>
          </p>
        </div>
      </div>

      <div class="trade-bottom-wrap">
        <el-button class="confirm-btn" type="primary" size="medium" @click="next">继续</el-button>
        <span class="service">客服支持： <a href="mailto:support@dbctra.io">support@dbctra.io</a> ,客服会在24小时内回复</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Step from '@/components/trade_io/stepNavi'

  export default {
    name: "buy_1",
    data() {
      return {
        rmb: '',
        dbc: 100
      }
    },
    components: {
      Step
    },
    methods: {
      next() {
        if (this.rmb.length === 0) {
          this.$message({
            showClose: true,
            message: '请输入金额',
            type: 'error'
          })
          return
        }
        if (this.rmb.toString().match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) {
          this.$router.push({
            path: '/trade/buy_2',
            query: {
              rmb: this.rmb,
              dbc: this.dbc
            }
          })
        } else {
          this.$message({
            showClose: true,
            message: '输入金额不正确',
            type: 'error'
          })
        }
      }
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

  .flex {
    display: flex;
  }

  .l-wrap, .r-wrap {
    width: 50%;
  }

  .trade-title {
    margin-top: 0;
    margin-bottom: 40px;
    font-size: 20px;
    color: #47495A;

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
      color: #6E8299;
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
