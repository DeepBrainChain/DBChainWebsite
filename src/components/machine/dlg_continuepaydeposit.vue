<template>
  <el-dialog :visible.sync="isOpen" @closed="closed" width="580px">
    <div slot="title">{{$t('continue_pay')}}</div>
    <div class="dlg-content">
      <!--<h3 class="content-head">
        {{$t('gpu.needHD')}}：66GB $ 22/{{$t('hour')}}
      </h3>-->

      <!--<div class="form mt20">
        <label>{{$t('gpu.needHD')}}：</label>
        <input class="small-input" type="number">
        <span class="fs12 cGray ml10">GB</span>
        <span class="fs12 cGray ml10">$xxx/{{$t('hour')}}</span>
      </div>-->
      <div class="form mt20">
        <label>{{$t('continue_pay_time')}}：</label>
        <el-input
          style="width: 180px"
          size="small"
          type="number"
          v-model.number.trim="time"
          @input
        />
        <el-select class="time-select ml10" v-model="timeSelect" size="small" @change>
          <el-option
            v-for="item in timeOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="form-notice">{{$t('tips')}}：{{$t('msg.dlg_0',{time: outDayTime})}}</div>

      <div class="desc-box" v-html="$t('msg.dlg_5')"></div>
    </div>
    <div class="dlg-bottom">
      <el-button
        class="dlg-btn"
        type="primary"
        size="small"
        @click="confirm"
        :disabled="!isCanCreateOrder"
      >{{$t('dlg_lease_create_order')}}</el-button>
      <el-button class="dlg-btn" plain size="small" @click="cancel">{{$t('cancel')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { continue_pay_get_pay_dbc_count, can_rent_this_machine } from "@/api";
import { getBalance } from "@/utlis";

export default {
  name: "popup_continuepay",
  props: {
    open: Boolean,

    placeOrderData: {
      type: Object,
      default: () => {
        return {
          order_id: "",

          time_max: 0
        };
      }
    }
  },
  data() {
    return {
      isOpen: this.open,
      timeSelect: 1,
      timeOptions: [
        {
          name: this.$t("hour"),
          value: 1
        },
        {
          name: this.$t("day"),
          value: 24
        }
      ],
      gpuCount: 0,
      time: 1,
      total_price: "",
      isGetTotalPrice: false,
      reqSt: undefined,
      isCanCreateOrder: true,
      balance: ""
    };
  },
  watch: {
    open(newVal) {
      this.isOpen = newVal;
      if (newVal) {
        this.time = 1;
        this.dbc_price = "";
      }
    },
    time(newVal) {
      if (newVal) {
        this.isCanCreateOrder = true;
      } else {
        this.isCanCreateOrder = false;
      }
    }
  },
  computed: {
    outDayTime() {
      const hours = parseInt(this.placeOrderData.time_max);
      const day = Math.floor(hours / 24);
      const h = hours - day * 24;
      return `${day}d${h}h`;
    }

    //dbcNum() {
    // return Math.floor(this.totalPrice / this.placeOrderData.dbc_price);
    //}
  },
  methods: {
    getBalance() {
      getBalance().then(res => {
        this.balance = res.balance;
      });
    },

    confirm() {
      const params = {
        order_id: this.placeOrderData.order_id,
        rent_time_length: this.time * this.timeSelect * 60,

        user_name_platform: this.$t("website_name"),
        language: this.$i18n.locale
      };
      this.$emit("confirm", params);
      //pocMachine(this.placeOrderData.order_id);
    },
    cancel() {
      this.closed();
      this.$emit("cancel");
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
