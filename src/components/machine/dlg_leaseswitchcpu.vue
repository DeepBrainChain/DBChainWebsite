<template>
  <el-dialog :visible.sync="isOpen" @closed="closed" width="580px">
    <div slot="title">{{$t('please_switch_cpu_mode')}}</div>

    <div class="form mt20">
      <label>{{$t('cpu_mode_switch')}}</label>
    </div>

    <div class="dlg-bottom">
      <el-button class="dlg-btn" type="primary" size="small" @click="confirm">{{$t('payment')}}</el-button>
      <el-button class="dlg-btn" plain size="small" @click="cancel">{{$t('deposit')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { get_pay_dbc_count, can_rent_this_machine } from "@/api";
import { getBalance } from "@/utlis";

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
  data() {
    return {
      isOpen: this.open
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
      item.switch_cpu_mode = "payment";
      this.$emit("confirm", item);
    },
    cancel() {
      let item = this.placeOrderData;
      item.switch_cpu_mode = "deposit";
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
