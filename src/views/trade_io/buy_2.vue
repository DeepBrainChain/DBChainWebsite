<template>
  <div class="buy border-box">
    <step></step>
    <div class="main">
      <div>
        <label>
          请输入收取DBC的钱包地址：
          <input class="dbc-input" type="text">
        </label>
      </div>
      <p class="info">如果没有DBC钱包，可以到下面任一支持dbc的钱包创建地址</p>
      <div class="other-wallet">
        <a class="wallet" href="javascript:">DBChain</a>
        <a class="wallet" href="javascript:">DBChain</a>
        <a class="wallet" href="javascript:">DBChain</a>
        <a class="wallet" href="javascript:">DBChain</a>
      </div>
      <div class="trade-bottom-wrap">
        <el-button class="confirm-btn" type="primary" size="medium" @click="pushTo('buy_3')">继续</el-button>
        <span class="service">客服支持： <a href="mailto:support@dbctra.io">support@dbctra.io</a> ,客服会在24小时内回复</span>
      </div>
    </div>
    <el-dialog
      :visible.sync="isOpen"
      title="重要提示："
    width="560px">
      <p class="dlg-content">DBCTrade平台是通过智能合约进行dbc转账，支付完成后， 智能合约会自动将购买的dbc打入到你指定的DBC地址.</p>
      <p class="dlg-content">您可以查询合约转账地址：<a href="javascript:">https://www.gateio.co/trade/DBC</a></p>
      <div class="center">
        <el-button class="dlg-btn" type="primary" size="medium">继续</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Step from '@/components/trade_io/stepNavi'

  export default {
    name: "buy_1",
    data() {
      return {
        isOpen: true
      }
    },
    components: {
      Step
    },
    methods: {
      pushTo(to) {
        this.$router.push(`/trade/${to}`)
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
    padding: 30px 30px;
  }

  label {
    font-size: 20px;
    color: #47495A;
    .dbc-input {
      width: 780px;
      border-bottom-width: 2px;
      border-bottom-color: rgba(71, 73, 90, 0.6);
    }
  }

  .info {
    margin: 40px 0 20px;
    font-size: 16px;
    color: rgba(71, 73, 90, 0.8)
  }

  .other-wallet {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .wallet {
      display: block;
      box-sizing: border-box;
      width: 260px;
      height: 110px;
      line-height: 110px;
      border-radius: 2px;
      border: 1px solid rgba(122, 140, 161, 0.3);
      background-color: rgba(240, 245, 250, 1);
      color: #7A8CA1;
      font-size: 30px;
      text-align: center;
      &:hover {
        color: $primaryColor;
        border-color: $primaryColor;
      }
    }
  }

  .trade-bottom-wrap {
    margin-top: 124px;
  }

  .dlg-content {
    line-height: 28px;
    color: rgba(71, 73, 90, 0.8);
  }
  .dlg-btn {
    width: 150px;
  }
</style>
