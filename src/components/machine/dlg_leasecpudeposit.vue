<template>
  <el-dialog :visible.sync="isOpen" @closed="closed" width="580px">
    <div
      slot="title"
      v-if="
        placeOrderData.order_id_pre === null &&
        !placeOrderData.from_stop_to_open
      "
    >
      {{ $t("rent_cpu_cotainer") }}
    </div>
    <div
      slot="title"
      v-if="
        placeOrderData.order_id_pre !== null &&
        !placeOrderData.from_stop_to_open
      "
    >
      {{ $t("stopgpu_to_cpu_payment") }}
    </div>
    <div slot="title" v-if="placeOrderData.from_stop_to_open">
      {{ $t("stop_to_cpu_container") }}
    </div>
    <div class="dlg-content">
      <!--<h3 class="content-head">
        {{$t('gpu.needHD')}}：66GB $ 22/{{$t('hour')}}
      </h3>-->
      <div class="form" v-if="placeOrderData.order_id_pre === null">
        <label>{{ $t("choseImages") }}：</label>
        <el-select
          class="time-select ml10"
          v-model="images"
          style="width: 360px"
          size="small"
        >
          <el-option
            v-for="item in imagesOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="form mt20">
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
      </div>
      <div class="cRed">
        {{ $t("tips") }}：{{ $t("deposit_time_tip", { time: outDayTime })
        }}{{ $t("stop_time_tip") }}
      </div>
      <div class="form mt20" v-if="placeOrderData.order_id_pre !== null">
        <label v-if="placeOrderData.from_stop_to_open"
          >{{ $t("diskspace_data_stop")
          }}{{
            (placeOrderData.diskspace_image_data / (1024 * 1024)).toFixed(2)
          }}G</label
        >
        <label v-if="!placeOrderData.from_stop_to_open"
          >{{ $t("diskspace_gpu_data")
          }}{{
            (placeOrderData.diskspace_image_data / (1024 * 1024)).toFixed(2)
          }}G</label
        >
      </div>

      <div class="form mt20" v-if="placeOrderData.order_id_pre === null">
        <label>{{ $t("switch_diskspace") }}：</label>

        <el-select
          class="time-select ml10"
          v-model="diskSelect"
          size="small"
          @change="computeTotalDBC"
        >
          <el-option
            v-for="item in diskOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <label>&nbsp;&nbsp;G</label>
      </div>
      <div class="form mt20" v-if="placeOrderData.order_id_pre !== null">
        <label
          >({{ $t("diskspace_new_cpu") }}:{{
            (
              (placeOrderData.disk_space -
                placeOrderData.diskspace_image_data) /
              (1024 * 1024)
            ).toFixed(2)
          }}G)</label
        >
      </div>
      <div class="form mt20">
        <label>{{ $t("switch_memory") }}：</label>

        <el-select
          class="time-select ml10"
          v-model="memorySelect"
          size="small"
          @change="computeTotalDBC"
        >
          <el-option
            v-for="item in memoryOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <label>&nbsp;&nbsp;G</label>
      </div>
      <div class="form-notice">{{ $t("deposit_tips1") }}</div>
      <div class="form-notice">{{ $t("deposit_tips2") }}</div>
      <div class="form-notice">{{ $t("deposit_tips3") }}</div>

      <div class="computer-dbc mt30">
        <span class="ml20">{{ $t("deposit_dbc_count") }}：{{ dbc_count }}</span>
      </div>
      <div class="form-notice">
        {{ $t("dlg_lease_wallet_balance") }}: {{ balance }}
      </div>
      <div class="form-notice">
        {{ $t("left_gasamount") }}: {{ gas_balance.toFixed(3) }}
      </div>
      <div class="desc-box" v-html="$t('return_deposit_dbc')"></div>
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
import {
  get_pay_dbc_count,
  can_rent_this_machine,
  get_disk_deposit_list,
  get_memory_deposit_list,
  get_deposit_dbc_count,
} from "@/api";
import { getBalance, getGasBalance } from "@/utlis";

export default {
  name: "popup_reload",
  props: {
    open: Boolean,
    mcData: Object,

    placeOrderData: {
      type: Object,
      default: () => {
        return {
          //    order_id: "5d42e162e124f45a4fa158f5",
          //       dbc_price: 0.0026,
          // gpu_price_dollar: 0.0001,
          //       code: "0.3848",
          //       time_max: 1500,
          //       gpu_count_max: 1,
          images_tag: "tensorflow1.14-pytorch1.2",
          //  diskspace_giving: 31457280,
          //      diskSpace_per_gpu_max: 210736353,
          //      memory_per_gpu_max: 23741925,
          //      diskspace_max_cpu: 0,
          //      memory_max_cpu: 0,
          //      disk_GB_perhour_dollar: 3.3333334e-5,
          //      diskspace_image_data: 0
          machine_id: "",
          disk_space: 60,
        };
      },
    },
  },
  data() {
    return {
      isOpen: this.open,
      timeSelect: 1,
      diskSelect: 30,
      memorySelect: 5,
      disk_tag: undefined,
      memory_tag: undefined,
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

      images: "tensorflow1.14-pytorch1.2",
      time: 1,
      total_price: "",
      dbc_count: "0",
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

      //  disk_deposit_list: new Array(),
      //  memory_deposit_list: new Array()
    };
  },
  watch: {
    open(newVal) {
      this.isOpen = newVal;
      if (newVal) {
        this.time = 1;
        this.computeTotalDBC();
        this.getBalance();
        this.getGasBalance();
      }
    },
  },
  computed: {
    outDayTime() {
      const hours = parseInt(this.placeOrderData.time_max / 60);
      const day = Math.floor(hours / 24);
      const h = hours - day * 24;
      return `${day}D${h}H`;
    },
    imagesOptions() {
      let opts = [];
      let tags = new Array();
      let images_tag = "";
      if (
        this.placeOrderData.images_tag === null ||
        this.placeOrderData.images_tag === "" ||
        this.placeOrderData.images_tag === undefined
      ) {
        images_tag = "tensorflow1.14-pytorch1.2";
      } else {
        images_tag = this.placeOrderData.images_tag;
      }

      tags = images_tag.split("@");
      for (let i = 0; i <= tags.length; i++) {
        opts.push({
          name: tags[i],
          value: tags[i],
        });
      }
      opts.push({
        name: this.$t("user_defined"),
        value: "tensorflow114andpytorch12",
      });
      return opts;
    },

    diskOptions() {
      let opts = [];

      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      if (
        !this.placeOrderData.machine_id ||
        this.placeOrderData.machine_id === ""
      ) {
        return opts;
      }
      get_disk_deposit_list({
        user_name_platform,
        language,
        machine_id: this.placeOrderData.machine_id,
      }).then((res) => {
        if (res.status === 1) {
          let disk_deposit_list = res.content;

          for (let i = 0; i < disk_deposit_list.length; i++) {
            opts.push({
              name: disk_deposit_list[i].capacity / (1024 * 1024),
              value: disk_deposit_list[i].capacity / (1024 * 1024),
            });
          }
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error",
          });
        }
      });

      return opts;
    },
    memoryOptions() {
      let opts = [];
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      if (
        !this.placeOrderData.machine_id ||
        this.placeOrderData.machine_id === ""
      ) {
        return opts;
      }
      get_memory_deposit_list({
        user_name_platform,
        language,
        machine_id: this.placeOrderData.machine_id,
      }).then((res) => {
        if (res.status === 1) {
          let memory_deposit_list = res.content;
          for (let i = 0; i < memory_deposit_list.length; i++) {
            opts.push({
              name: memory_deposit_list[i].capacity / (1024 * 1024),
              value: memory_deposit_list[i].capacity / (1024 * 1024),
            });
          }
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error",
          });
        }
      });

      return opts;
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
    /* computeTotalDBC() {
      if (this.time) {
        clearTimeout(this.reqSt);
        this.reqSt = setTimeout(() => {
          // this.totalPrice();
          this.getDepositDbcCount();
        }, 1000);
      }
    },*/

    computeTotalDBC() {
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      if (this.placeOrderData.order_id_pre !== null) {
        this.diskSelect =
          this.placeOrderData.disk_space -
          this.placeOrderData.diskspace_image_data;
      }
      get_deposit_dbc_count({
        order_id: this.placeOrderData.order_id,
        diskspace: this.diskSelect * (1024 * 1024),
        memory: this.memorySelect * (1024 * 1024),
        user_name_platform,
        language,
      }).then((res) => {
        if (res.status === 1) {
          this.dbc_count = res.content;
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error",
          });
        }
      });
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
      let params;

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

      if (this.placeOrderData.order_id_pre !== null) {
        this.diskSelect =
          this.placeOrderData.disk_space -
          this.placeOrderData.diskspace_image_data;
        params = {
          rent_time_length: this.time * this.timeSelect * 60,

          gpu_count: 0,

          diskspace: this.diskSelect * (1024 * 1024),
          memory: this.memorySelect * (1024 * 1024),
          order_type: "training",
          order_id: this.placeOrderData.order_id,

          user_name_platform: this.$t("website_name"),
          language: this.$i18n.locale,
        };
      } else {
        params = {
          rent_time_length: this.time * this.timeSelect * 60,

          gpu_count: 0,
          image_tag: this.images,
          diskspace: this.diskSelect * (1024 * 1024),
          memory: this.memorySelect * (1024 * 1024),
          order_type: "training",
          order_id: this.placeOrderData.order_id,

          user_name_platform: this.$t("website_name"),
          language: this.$i18n.locale,
        };
      }
      this.$emit("confirm", params);

      if (this.placeOrderData.order_id_pre === null) {
        pocMachine(this.placeOrderData.order_id);
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
