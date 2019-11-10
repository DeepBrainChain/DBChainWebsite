<template>
  <div class="buy border-box">
    <step :step-index="1"></step>
    <div class="main">
      <div>
        <label>
          请输入收取DBC的钱包地址：
          <input class="dbc-input" type="text" v-model.trim="address" />
        </label>
      </div>
      <p class="info">如果没有DBC钱包，可以到下面任一支持dbc的钱包创建地址</p>
      <div class="other-wallet">
        <!-- <a class="wallet" href="https://www.dbchain.ai" target="_blank">DBChain网站</a>-->
        <a class="wallet" href="https://neotracker.io" target="_blank">NEOTracker网站</a>
        <a class="wallet" href="https://otcgo.cn/download/" target="_blank">SEA钱包</a>
        <a class="wallet" href="http://www.mathwallet.org/cn/" target="_blank">麦子钱包</a>
      </div>
      <div class="trade-bottom-wrap">
        <el-button class="confirm-btn" type="primary" size="medium" @click="showDlg">继续</el-button>
        <span class="service">
          客服支持：
          <a href="mailto:support@dbctrade.io">support@dbctrade.io</a> ,客服会在24小时内回复
        </span>
      </div>
    </div>
    <el-dialog :visible.sync="isOpen" title="重要提示：" width="560px">
      <p class="dlg-content">DBCTrade平台是通过智能合约进行DBC转账，支付完成后，智能合约会自动将您购买的DBC打入到您指定的DBC地址.</p>
      <p class="dlg-content">
        您可以查询合约转账地址：
        <a
          href="https://neotracker.io/address/AKMqDy51FuMnc4poiGBczQvPh6819hQuLH"
          target="_blank"
        >点击查看合约钱包地址</a>
      </p>
      <div class="center">
        <el-button
          class="dlg-btn"
          type="primary"
          size="medium"
          @click="next_place_order_dbctrade"
        >继续</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Step from "@/components/trade_io/stepNavi";
import { isAddress } from "@/utlis";
import { place_order_dbctrade } from "@/api";
export default {
  name: "buy_1",
  data() {
    return {
      isOpen: false,
      address: this.$route.query.address_user,
      order_id: ""
    };
  },
  components: {
    Step
  },

  activated() {
    this.add_address();
  },
  methods: {
    next() {
      this.$router.push({
        path: "/trade/buy_2",
        query: {
          address: this.address,
          ...this.$route.query
        }
      });
    },
    next_place_order_dbctrade() {
      place_order_dbctrade({
        wallet_address_user: this.address,
        type: 0
      }).then(res_1 => {
        if (res_1.status === 1) {
          this.order_id = res_1.content;
          this.$router.push({
            path: "/trade/buy_2",
            query: {
              order_id: this.order_id,
              ...this.$route.query
            }
          });
        } else {
          this.$message({
            showClose: true,
            message: "无法创建购买订单，请稍后再试",
            type: "error"
          });
          return Promise.reject(res_1.msg);
        }
      });
    },
    add_address() {
      this.address = this.$route.query.address_user;
    },
    showDlg() {
      if (isAddress(this.address)) {
        this.isOpen = true;
      } else {
        this.$message({
          showClose: true,
          message: "请输入正确的地址",
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
  padding: 30px 30px;
}

label {
  font-size: 20px;
  color: #47495a;

  .dbc-input {
    width: 780px;
    border-bottom-width: 2px;
    border-bottom-color: rgba(71, 73, 90, 0.6);

    &:focus {
      border-color: $primaryColor;
    }
  }
}

.info {
  margin: 40px 0 20px;
  font-size: 16px;
  color: rgba(71, 73, 90, 0.8);
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
    border: 1px solid rgba(229, 231, 238, 0.3);
    background-color: rgba(240, 245, 250, 1);
    color: #2d7dd8;
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
