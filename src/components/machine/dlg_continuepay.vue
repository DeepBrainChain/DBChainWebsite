<template>
  <el-dialog :visible.sync="isOpen" @closed="closed" width="580px">
    <div slot="title">{{ $t("continue_pay") }}</div>
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
        <label>{{ $t("continue_pay_time") }}：</label>
        <el-input
          style="width: 180px"
          size="small"
          type="number"
          v-model.number.trim="time"
          @input="computeTotalDBC"
        />
        <el-select
          class="time-select ml10"
          v-model="timeSelect"
          size="small"
          @change="computeTotalDBC"
        >
          <el-option
            v-for="item in timeOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <span
          class="fs12 cGray ml10"
          v-if="
            $t('website_name') !== 'congTuCloud' &&
            placeOrderData.gpu_count !== 0
          "
          >{{
            (
              placeOrderData.gpu_price_dollar * placeOrderData.gpu_count +
              placeOrderData.disk_dollar
            ).toFixed(4)
          }}$/{{ $t("my_machine_hour") }}</span
        >
        <span
          class="fs12 cGray ml10"
          v-if="
            $t('website_name') === 'congTuCloud' &&
            placeOrderData.gpu_count !== 0
          "
          >{{
            (
              (placeOrderData.gpu_price_dollar * placeOrderData.gpu_count +
                placeOrderData.disk_dollar) *
              usdToRmb
            ).toFixed(2)
          }}{{ $t("RMB") }}/{{ $t("my_machine_hour") }}</span
        >
        <span
          class="fs12 cGray ml10"
          v-if="
            $t('website_name') !== 'congTuCloud' &&
            placeOrderData.gpu_count === 0
          "
          >{{
            (
              placeOrderData.gpu_price_dollar + placeOrderData.disk_dollar
            ).toFixed(4)
          }}$/{{ $t("my_machine_hour") }}</span
        >
        <span
          class="fs12 cGray ml10"
          v-if="
            $t('website_name') === 'congTuCloud' &&
            placeOrderData.gpu_count === 0
          "
          >{{
            (
              (placeOrderData.gpu_price_dollar + placeOrderData.disk_dollar) *
              usdToRmb
            ).toFixed(2)
          }}{{ $t("RMB") }}/{{ $t("my_machine_hour") }}</span
        >
      </div>
      <div class="form-notice" v-if="$t('website_name') !== 'congTuCloud'">
        {{ $t("tips") }}：{{ $t("msg.dlg_0", { time: outDayTime }) }}
      </div>
      <div class="computer-dbc mt30">
        <!--          <span>{{$t('gpu.DBCRemaining')}}：349</span>-->
        <span v-if="$t('website_name') !== 'congTuCloud'"
          >{{ $t("total") }}：{{ totalPrice.toFixed(4) }}{{ $t("$") }}</span
        >
        <span v-else
          >{{ $t("total") }}：{{ (totalPrice * usdToRmb).toFixed(2)
          }}{{ $t("RMB") }}</span
        >
        <span class="ml20" v-if="$t('website_name') !== 'congTuCloud'"
          >{{ $t("gpu.exchangeDBC") }}：{{ total_price }}</span
        >
      </div>
      <div class="form-notice" v-if="$t('website_name') !== 'congTuCloud'">
        {{ $t("dlg_lease_wallet_balance") }}: {{ balance }}
      </div>
      <div class="form-notice" v-if="$t('website_name') !== 'congTuCloud'">
        {{ $t("left_gasamount") }}: {{ gas_balance.toFixed(3) }}
      </div>
      <div
        class="desc-box"
        v-if="$t('website_name') !== 'congTuCloud'"
        v-html="$t('msg.dlg_5')"
      ></div>
    </div>
    <div class="dlg-bottom">
      <el-button
        class="dlg-btn"
        type="primary"
        size="small"
        @click="confirm"
        :disabled="!isCanCreateOrder"
        >{{ $t("dlg_lease_create_order") }}</el-button
      >
      <el-button class="dlg-btn" plain size="small" @click="cancel">{{
        $t("cancel")
      }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { continue_pay_get_pay_dbc_count, can_rent_this_machine } from "@/api";
import { getBalance, getGasBalance, getUsdToRmb } from "@/utlis";

export default {
  name: "popup_continuepay",
  props: {
    open: Boolean,

    placeOrderData: {
      type: Object,
      default: () => {
        return {
          continue_pay_order_id: "",
          gpu_price_dollar: 0.0001,
          code: "0.3848",
          time_max: 1500,
          order_id: "",
          gpu_count: 1,
          dbc_price: 0.0026,
        };
      },
    },
    order_id_prefix: "",
  },
  data() {
    return {
      usdToRmb: getUsdToRmb(),
      isOpen: this.open,
      timeSelect: 1,
      timeOptions: [
        {
          name: this.$t("hour"),
          value: 1,
        },
        {
          name: this.$t("day"),
          value: 24,
        },
      ],
      gpuCount: 1,
      time: 1,
      total_price: "",
      isGetTotalPrice: false,
      reqSt: undefined,
      isCanCreateOrder: true,
      balance: "0",
      gas_balance: 0,
    };
  },
  watch: {
    open(newVal) {
      this.isOpen = newVal;
      if (newVal) {
        this.time = 1;
        this.dbc_price = "";
        this.getPayDbcCount();
        this.getBalance();
        this.getGasBalance();
      }
    },
    time(newVal) {
      if (newVal) {
        this.isCanCreateOrder = true;
      } else {
        this.isCanCreateOrder = false;
      }
    },
  },
  computed: {
    outDayTime() {
      const hours = parseInt(this.placeOrderData.time_max / 60);
      const day = Math.floor(hours / 24);
      const h = hours - day * 24;
      return `${day}d${h}h`;
    },
    gpuCountOptions() {
      let opts = [];
      for (let i = 1; i <= this.placeOrderData.gpu_count_max; i *= 2) {
        opts.push({
          name: i,
          value: i,
        });
      }
      return opts;
    },
    totalPrice() {
      if (this.placeOrderData.gpu_count === 0) {
        return (
          this.placeOrderData.gpu_price_dollar * this.time * this.timeSelect +
          this.placeOrderData.disk_dollar * this.time * this.timeSelect
        );
      } else {
        return (
          this.placeOrderData.gpu_price_dollar *
            this.placeOrderData.gpu_count *
            this.time *
            this.timeSelect +
          this.placeOrderData.disk_dollar * this.time * this.timeSelect
        );
      }
    },
    //dbcNum() {
    // return Math.floor(this.totalPrice / this.placeOrderData.dbc_price);
    //}
  },
  methods: {
    getBalance() {
      getBalance().then((res) => {
        this.balance = res.balance;
      });
    },

    getGasBalance() {
      getGasBalance().then((res) => {
        this.gas_balance = res.gas_balance;
      });
    },

    computeTotalDBC() {
      if (this.time) {
        clearTimeout(this.reqSt);
        this.reqSt = setTimeout(() => {
          this.getPayDbcCount();
        }, 1000);
      }
    },
    getPayDbcCount() {
      if (this.$t("website_name") === "congTuCloud") {
        const user_name_platform = this.$t("website_name");
        const language = this.$i18n.locale;
        continue_pay_get_pay_dbc_count({
          rent_time_length: this.time * 60 * this.timeSelect,
          order_id_prefix: this.order_id_prefix,
          continue_pay_order_id: this.placeOrderData.continue_pay_order_id,
          user_name_platform,
          language,
        }).then((res) => {
          if (res.status === 1) {
            this.total_price = res.content;
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
          }
        });
      } else {
        const user_name_platform = this.$t("website_name");
        const language = this.$i18n.locale;
        continue_pay_get_pay_dbc_count({
          rent_time_length: this.time * 60 * this.timeSelect,

          continue_pay_order_id: this.placeOrderData.continue_pay_order_id,
          user_name_platform,
          language,
        }).then((res) => {
          if (res.status === 1) {
            this.total_price = res.content;
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
          }
        });
      }
    },
    // poc machine
    pocMachine(order_id) {
      // pay before
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      can_rent_this_machine({
        order_id_new: order_id,
        user_name_platform,
        language,
      });
    },
    confirm() {
      if (this.$t("website_name") === "congTuCloud") {
        const params = {
          rent_time_length: this.time * this.timeSelect * 60,
          order_id: this.placeOrderData.order_id,
          r_count: (this.totalPrice * this.usdToRmb).toFixed(2),
          continue_pay_order_id: this.placeOrderData.continue_pay_order_id,

          user_name_platform: this.$t("website_name"),
          language: this.$i18n.locale,
        };
        this.$emit("confirm", params);
        //pocMachine(this.placeOrderData.order_id);
      } else {
        if (parseInt(this.dbc_count) > parseInt(this.balance)) {
          this.$message({
            showClose: true,
            message: this.$t("lessdbc"),
            type: "error",
          });
          return;
        }
        if (this.gas_balance === 0) {
          this.$message({
            showClose: true,
            message: this.$t("zerogas"),
            type: "error",
          });
          return;
        }

        const params = {
          rent_time_length: this.time * this.timeSelect * 60,
          order_id: this.placeOrderData.order_id,
          continue_pay_order_id: this.placeOrderData.continue_pay_order_id,

          user_name_platform: this.$t("website_name"),
          language: this.$i18n.locale,
        };
        this.$emit("confirm", params);
        //pocMachine(this.placeOrderData.order_id);
      }
    },
    cancel() {
      this.closed();
      this.$emit("cancel");
    },
    closed() {
      this.isOpen = false;
      this.$emit("update:open", false);
    },
  },
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
