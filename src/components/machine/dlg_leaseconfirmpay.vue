<template>
  <el-dialog :visible.sync="isOpen" @closed="closed" width="580px">
    <div slot="title">{{$t('please_confirm_pay')}}</div>

    <div class="form mt20">
      <label>{{$t("myMachine_no_double_pay")}}</label>
    </div>
    <div class="form mt20" v-if="isNewWallet == 'true'">
      <span>{{$t('verifyPassward') + ': '}}</span>
      <el-input style="width: 300px"  show-password v-model="passward" size="small"></el-input>
    </div>
    <div class="dlg-bottom">
      <el-button class="dlg-btn" type="primary" size="small" @click="confirm">{{$t('confirmPay')}}</el-button>
      <el-button class="dlg-btn" plain size="small" @click="cancel">{{$t('myMachine_paid')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { get_pay_dbc_count, can_rent_this_machine } from "@/api";
import { getBalance } from "@/utlis";
import { mapState } from "vuex"
export default {
  name: "popup_reload",
  props: {
    open: Boolean,
    mcData: Object,
    placeOrderData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed:{
    ...mapState(["isNewWallet"]),
  },
  data() {
    return {
      isOpen: this.open,
      passward: ''
    };
  },
  watch: {
    open(newVal) {
      this.isOpen = newVal;
    }
  },
  methods: {
    confirm() {
      let item = this.placeOrderData;
      item.switch_pay_mode = "confirm_pay";
      item.passward = this.passward
      this.$emit("confirm", item);
    },
    cancel() {
      let item = this.placeOrderData;
      item.switch_pay_mode = "paid";
      this.$emit("confirm", item);
    },
    closed() {
      this.isOpen = false;
      this.$emit("update:open", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.content-head {
  margin: 0 0 15px;
  font-size: 14px;
  line-height: 14px;
}

.desc-box {
  margin-top: 18px;
  padding: 10px 12px;
  background-color: #f6f9fc;
  font-size: 12px;
  color: #999;
  line-height: 20px;
}

.dlg-btn {
  width: 110px;
  margin: 0 10px;
}

.time-select {
  width: 80px;
}

.computer-dbc {
  justify-content: flex-start;
}
</style>
