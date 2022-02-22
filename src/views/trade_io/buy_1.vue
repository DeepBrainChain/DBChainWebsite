<template>
  <div class="buy border-box">
    <step :step-index="1"></step>
    <div class="main">
      <div>
        <label>
          {{$t("buyDBC.enterwallet")}}：
          <input class="dbc-input" type="text" v-model.trim="address" />
        </label>
      </div>
      <div class="trade-bottom-wrap">
        <el-button class="confirm-btn" type="primary" size="medium" @click="showDlg">{{$t("buyDBC.continue")}}</el-button>
        <span class="service">
          {{$t("buyDBC.support")}}：
          <a href="mailto:support@dbctrade.io">support@dbctrade.io</a> ,{{$t("buyDBC.reply")}}
        </span>
      </div>
    </div>
    <el-dialog :visible.sync="isOpen" :title="title" width="560px">
      <p class="dlg-content">{{$t("buyDBC.tip1")}}</p>
      <div class="center">
        <el-button
          class="dlg-btn"
          type="primary"
          size="medium"
          @click="next"
        >{{$t("buyDBC.continue")}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Step from "@/components/trade_io/stepNavi";
export default {
  name: "buy_1",
  data() {
    return {
      isOpen: false,
      address: this.$route.query.address_user,
      order_id: "",
      title: this.$t("buyDBC.title1")
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
          ...this.$route.query
        }
      });
    },
    add_address() {
      this.address = this.$route.query.address_user;
    },
    showDlg() {
      this.isOpen = true;
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
