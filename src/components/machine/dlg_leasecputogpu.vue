<template>
  <el-dialog :visible.sync="isOpen" @closed="closed" width="580px">
    <div slot="title">{{ $t("open_gpu_cpu_to_gpu") }}</div>
    <div class="dlg-content">
      <!--<h3 class="content-head">
        {{$t('gpu.needHD')}}：66GB $ 22/{{$t('hour')}}
      </h3>-->
      <div class="cRed">
        <label>{{ $t("container_is_closed_update") }}</label>
      </div>

      <div class="form mt20">
        <label>{{ $t("gpu.choseGpuCount") }}：</label>
        <el-select
          v-if="!gpu_rentout_whole"
          class="time-select ml10"
          v-model="gpuCount"
          size="small"
          @change="computeTotalDBC"
        >
          <el-option
            v-for="item in gpuCountOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <label v-if="gpu_rentout_whole"
          >{{ placeOrderData.gpu_count_max }}&nbsp;&nbsp;&nbsp;&nbsp;{{
            $t("whole_rent_machine_tip")
          }}</label
        >
      </div>
      <div class="form mt20">
        <el-radio-group v-model="discount" @change="computeTotalDBC">
          <el-radio label="0">{{ $t("leaseback_anytime") }}</el-radio>

          <el-radio label="2">{{ $t("monthly") }}</el-radio>
          <el-radio label="3">{{ $t("quarterly") }}</el-radio>
          <el-radio label="4">{{ $t("yearly") }}</el-radio>
        </el-radio-group>
      </div>
      <div class="form mt20">
        <label class="cRed" v-if="discount === '2'">{{
          $t("month_discount_instruction")
        }}</label>
        <label class="cRed" v-else-if="discount === '3'">{{
          $t("quarter_discount_instruction")
        }}</label>
        <label class="cRed" v-else-if="discount === '4'">{{
          $t("year_discount_instruction")
        }}</label>
      </div>
      <div class="form mt20" v-if="discount === '0'">
        <label>{{ $t("dlg_lease_time") }}：</label>
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
          v-if="$t('website_name') === 'congTuCloud'"
          >{{ (placeOrderData.gpu_price_dollar * usdToRmb).toFixed(2)
          }}{{ $t("RMB") }}/{{ $t("my_machine_hour") }}</span
        >
        <span class="fs12 cGray ml10" v-else
          >{{ placeOrderData.gpu_price_dollar }}$/{{
            $t("my_machine_hour")
          }}</span
        >
      </div>
      <div class="form mt20">
        <label>{{ $t("diskspace_cpu_data") }}:{{ disk_cpu_data }}G</label>
      </div>

      <div class="form mt20">
        <label
          >({{ $t("diskspace_new_gpu") }}{{ disk_buy - disk_cpu_data }}G)</label
        >
        <span
          class="fs12 cGray ml10"
          v-if="!gpu_rentout_whole && $t('website_name') === 'congTuCloud'"
          >{{ (placeOrderData.disk_GB_perhour_dollar * usdToRmb).toFixed(3)
          }}{{ $t("RMB") }}/{{ $t("disk_hour") }}</span
        >
        <span
          class="fs12 cGray ml10"
          v-if="!gpu_rentout_whole && $t('website_name') !== 'congTuCloud'"
          >{{ placeOrderData.disk_GB_perhour_dollar }}$/{{
            $t("disk_hour")
          }}</span
        >
      </div>
      <div class="form mt20">
        <label>{{ $t("memory_dlg") }}：</label>
        <label>{{ memory }}G</label>
        <label>({{ $t("memory_every_gpu") }}{{ memory_every_gpu }}G)</label>
      </div>

      <div class="cRed" v-if="$t('website_name') !== 'congTuCloud'">
        {{ $t("tips") }}：{{ $t("msg.dlg_0", { time: outDayTime }) }}
      </div>
      <div class="computer-dbc mt30">
        <!--          <span>{{$t('gpu.DBCRemaining')}}：349</span>-->
        <span v-if="$t('website_name') === 'congTuCloud'"
          >{{ $t("total") }}：{{ (totalPrice * usdToRmb).toFixed(2)
          }}{{ $t("RMB") }}</span
        >
        <span v-else
          >{{ $t("total") }}：{{ totalPrice.toFixed(4) }}{{ $t("$") }}</span
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
import { get_pay_dbc_count, can_rent_this_machine } from "@/api";
import {
  getBalance,
  getGasBalance,
  getCookie,
  getUsdToRmb,
  getCongtuGpuOrderIdPrefix,
} from "@/utlis";

export default {
  name: "popup_reload",
  props: {
    open: Boolean,
    mcData: Object,
    placeOrderData: {
      type: Object,
      default: () => {
        return {
          order_id: "5d42e162e124f45a4fa158f5",
          dbc_price: 0.0026,
          gpu_price_dollar: 0.0001,
          code: "0.3848",
          time_max: 1500,
          gpu_count_max: 1,
          images_tag: "tensorflow1.14-pytorch1.2",
          diskspace_giving: 31457280,
          diskSpace_per_gpu_max: 210736353,
          memory_per_gpu_max: 23741925,
          diskspace_max_cpu: 0,
          memory_max_cpu: 0,
          disk_GB_perhour_dollar: 3.3333334e-5,
          diskspace_image_data: 0,
          disk_space: 60,
          gpu_rentout_whole: false,
          machine_type: 0,
        };
      },
    },
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
      images: "tensorflow1.14-pytorch1.2",
      time: 1,
      total_price: "",
      isGetTotalPrice: false,
      reqSt: undefined,
      isCanCreateOrder: true,
      disk_giving: 0,
      disk_buy: 60,
      disk_giving_every_gpu: 0,
      disk_max: 100,
      balance: "0",
      gas_balance: 0,
      memory: 0,
      memory_every_gpu: 0,
      disk_cpu_data: 0,
      diskspace_every_cpu_can_buy: 0,

      discount: "0",
      gpu_rentout_whole: false,
      machine_type: 0,
    };
  },
  watch: {
    open(newVal) {
      this.isOpen = newVal;
      if (newVal) {
        this.time = 1;
        this.dbc_price = "";
        this.gpu_rentout_whole = this.placeOrderData.gpu_rentout_whole;
        this.machine_type = this.placeOrderData.machine_type;
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
      for (let i = 1; i <= this.placeOrderData.gpu_count_max; i++) {
        opts.push({
          name: i,
          value: i,
        });
      }
      return opts;
    },

    imagesOptions() {
      let opts = [];
      var tags = new Array();
      if (
        this.placeOrderData.images_tag === null ||
        this.placeOrderData.images_tag === ""
      ) {
        this.placeOrderData.images_tag = "tensorflow1.14-pytorch1.2";
      }
      tags = this.placeOrderData.images_tag.split("@");
      for (let i = 0; i <= tags.length; i++) {
        opts.push({
          name: tags[i],
          value: tags[i],
        });
      }
      return opts;
    },

    totalPrice() {
      if (this.gpu_rentout_whole) {
        this.gpuCount = this.placeOrderData.gpu_count_max;
      }
      if (this.discount === "2") {
        return (
          this.placeOrderData.gpu_price_dollar * this.gpuCount * 24 * 30 +
          this.placeOrderData.disk_GB_perhour_dollar * this.disk_buy * 24 * 30
        );
      } else if (this.discount === "3") {
        return (
          this.placeOrderData.gpu_price_dollar * this.gpuCount * 24 * 90 +
          this.placeOrderData.disk_GB_perhour_dollar * this.disk_buy * 24 * 90
        );
      } else if (this.discount === "4") {
        return (
          this.placeOrderData.gpu_price_dollar * this.gpuCount * 24 * 365 +
          this.placeOrderData.disk_GB_perhour_dollar * this.disk_buy * 24 * 365
        );
      } else {
        return (
          this.placeOrderData.gpu_price_dollar *
            this.gpuCount *
            this.time *
            this.timeSelect +
          this.placeOrderData.disk_GB_perhour_dollar *
            this.disk_buy *
            this.time *
            this.timeSelect
        );
      }
    },
    dbcNum() {
      return Math.floor(this.totalPrice / this.placeOrderData.dbc_price);
    },
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
          // this.totalPrice();

          this.disk_giving = parseInt(
            (this.placeOrderData.diskspace_giving * this.gpuCount) /
              (1024 * 1024)
          );
          this.disk_giving_every_gpu = parseInt(
            this.placeOrderData.diskspace_giving / (1024 * 1024)
          );
          this.disk_max = parseInt(
            (this.placeOrderData.diskSpace_per_gpu_max * this.gpuCount) /
              (1024 * 1024) -
              this.disk_giving
          );
          this.memory = parseInt(
            (this.placeOrderData.memory_per_gpu_max / (1024 * 1024)) *
              this.gpuCount
          );

          this.memory_every_gpu = parseInt(
            this.placeOrderData.memory_per_gpu_max / (1024 * 1024)
          );

          this.disk_cpu_data = parseInt(
            this.placeOrderData.diskspace_image_data / (1024 * 1024)
          );

          this.diskspace_every_cpu_can_buy = parseInt(
            (this.placeOrderData.diskSpace_per_gpu_max -
              this.placeOrderData.diskspace_giving) /
              (1024 * 1024)
          );

          this.disk_buy = this.placeOrderData.disk_space / (1024 * 1024);

          /*     if (this.disk_buy > this.disk_max) {
              this.$message({
                showClose: true,
                message: this.$t("over_max_disk"),
                type: "error"
              });
              this.disk_buy = this.disk_max;
            }*/

          this.getPayDbcCount();
        }, 1000);
      }
    },
    getPayDbcCount() {
      let rent_type = 0;
      if (this.discount === "1") {
        rent_type = 1;
      } else if (this.discount === "2") {
        rent_type = 2;
      } else if (this.discount === "3") {
        rent_type = 3;
      } else if (this.discount === "4") {
        rent_type = 4;
      }
      if (this.gpu_rentout_whole) {
        this.gpuCount = this.placeOrderData.gpu_count_max;
      }
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      this.disk_giving = parseInt(
        (this.placeOrderData.diskspace_giving * this.gpuCount) / (1024 * 1024)
      );
      this.disk_giving_every_gpu = parseInt(
        this.placeOrderData.diskspace_giving / (1024 * 1024)
      );
      this.disk_max = parseInt(
        (this.placeOrderData.diskSpace_per_gpu_max * this.gpuCount) /
          (1024 * 1024) -
          this.disk_giving
      );
      this.memory = parseInt(
        (this.placeOrderData.memory_per_gpu_max / (1024 * 1024)) * this.gpuCount
      );

      this.memory_every_gpu = parseInt(
        this.placeOrderData.memory_per_gpu_max / (1024 * 1024)
      );

      this.disk_cpu_data = parseInt(
        this.placeOrderData.diskspace_image_data / (1024 * 1024)
      );
      this.diskspace_every_cpu_can_buy = parseInt(
        (this.placeOrderData.diskSpace_per_gpu_max -
          this.placeOrderData.diskspace_giving) /
          (1024 * 1024)
      );

      this.disk_buy = this.placeOrderData.disk_space / (1024 * 1024);

      if (this.$t("website_name") === "congTuCloud") {
        get_pay_dbc_count({
          rent_time_length: this.time * 60 * this.timeSelect,
          gpu_count: this.gpuCount,
          diskspace: this.disk_buy * 1024 * 1024,
          order_id: this.placeOrderData.order_id,
          order_id_prefix: getCongtuGpuOrderIdPrefix(),
          rent_type: rent_type,
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
        get_pay_dbc_count({
          rent_time_length: this.time * 60 * this.timeSelect,
          gpu_count: this.gpuCount,
          diskspace: this.disk_buy * 1024 * 1024,
          order_id: this.placeOrderData.order_id,
          rent_type: rent_type,
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

    confirm() {
      // 聪图云模式下
      if (this.$t("website_name") === "congTuCloud") {
        let rent_type = 0;
        // 判断是否登录
        if (getCookie("login") != "login") {
          this.$router.push("/login");
          return;
        }
        if (this.discount === "1") {
          rent_type = 1;
        } else if (this.discount === "2") {
          rent_type = 2;
        } else if (this.discount === "3") {
          rent_type = 3;
        } else if (this.discount === "4") {
          rent_type = 4;
        }
        if (this.gpu_rentout_whole) {
          this.gpuCount = this.placeOrderData.gpu_count_max;
        }
        const params = {
          rent_time_length: this.time * this.timeSelect * 60,

          gpu_count: this.gpuCount,
          image_tag: this.images,
          diskspace: this.disk_buy * 1024 * 1024,
          order_type: "training",
          order_id: this.placeOrderData.order_id,
          congtu_order_id_prefix: getCongtuGpuOrderIdPrefix(),
          r_count: `${(this.totalPrice * this.usdToRmb).toFixed(2)}`,
          rent_type: rent_type,
          machine_type: this.machine_type,
          user_name_platform: this.$t("website_name"),
          language: this.$i18n.locale,
        };
        this.$emit("confirm", params);
        // pocMachine(this.placeOrderData.order_id);
      } else {
        let rent_type = 0;
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
        if (this.discount === "1") {
          rent_type = 1;
        } else if (this.discount === "2") {
          rent_type = 2;
        } else if (this.discount === "3") {
          rent_type = 3;
        } else if (this.discount === "4") {
          rent_type = 4;
        }
        if (this.gpu_rentout_whole) {
          this.gpuCount = this.placeOrderData.gpu_count_max;
        }
        const params = {
          rent_time_length: this.time * this.timeSelect * 60,

          gpu_count: this.gpuCount,
          image_tag: this.images,
          diskspace: this.disk_buy * 1024 * 1024,
          order_type: "training",
          order_id: this.placeOrderData.order_id,
          rent_type: rent_type,
          machine_type: this.machine_type,
          user_name_platform: this.$t("website_name"),
          language: this.$i18n.locale,
        };
        this.$emit("confirm", params);
        // pocMachine(this.placeOrderData.order_id);
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
