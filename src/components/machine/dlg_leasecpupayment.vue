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
      <div
        class="cRed"
        v-if="
          placeOrderData.order_id_pre !== null &&
          !placeOrderData.from_stop_to_open
        "
      >
        <label>{{ $t("container_is_closed_update_stop_gpu") }}</label>
      </div>
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
        <span class="fs12 cGray ml10"
          >{{ (placeOrderData.gpu_price_dollar * usdToRmb).toFixed(2)
          }}{{ $t("RMB") }}/{{ $t("my_machine_hour") }}</span
        >
      </div>

      <div class="form mt20" v-if="placeOrderData.order_id_pre === null">
        <label>{{ $t("diskspace_dlg") }}：</label>
        <label>{{ $t("diskspace_giving") }}{{ disk_giving }}G</label>
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
        <label>{{ $t("buy_diskspace") }}：</label>
        <el-input
          style="width: 120px"
          size="small"
          type="number"
          v-model.number.trim="disk_buy"
          @input="computeTotalDBC"
        />
        <span class="fs12 cGray ml10">G</span>
        <span class="fs12 cGray ml10"
          >{{ (placeOrderData.disk_GB_perhour_dollar * usdToRmb).toFixed(3)
          }}{{ $t("RMB") }}/{{ $t("disk_hour") }}</span
        >

        <span class="fs12 cGray ml10"
          >{{ $t("disk_max")
          }}{{
            parseInt(
              (diskspace_max_cpu - placeOrderData.diskspace_giving > 0
                ? diskspace_max_cpu - placeOrderData.diskspace_giving
                : 0) /
                (1024 * 1024)
            )
          }}G</span
        >
      </div>
      <div class="form mt20" v-if="placeOrderData.order_id_pre !== null">
        <label v-if="!placeOrderData.from_stop_to_open"
          >({{ $t("diskspace_new_cpu") }}:{{
            (
              disk_buy +
              disk_giving -
              placeOrderData.diskspace_image_data / (1024 * 1024)
            ).toFixed(2)
          }}G)</label
        >
        <label v-if="placeOrderData.from_stop_to_open"
          >({{ $t("diskspace_new_cpu_stop") }}:{{
            (
              disk_buy +
              disk_giving -
              placeOrderData.diskspace_image_data / (1024 * 1024)
            ).toFixed(2)
          }}G)</label
        >
        <span
          class="fs12 cGray ml10"
          v-if="$t('website_name') === 'congTuCloud'"
          >{{ (placeOrderData.disk_GB_perhour_dollar * usdToRmb).toFixed(3)
          }}{{ $t("RMB") }}/{{ $t("disk_hour") }}</span
        >
        <span class="fs12 cGray ml10" v-else
          >{{ placeOrderData.disk_GB_perhour_dollar }}$/{{
            $t("disk_hour")
          }}</span
        >
      </div>
      <div class="form mt20">
        <label>{{ $t("memory_dlg") }}：</label>
        <label>{{ parseInt(memory / (1024 * 1024)) }}G</label>
        <label>({{ $t("memory_more") }})</label>
      </div>

      <div v-if="$t('website_name') !== 'congTuCloud'" class="cRed">
        {{ $t("tips") }}：{{ $t("msg.dlg_0", { time: outDayTime }) }}
      </div>

      <div class="computer-dbc mt30">
        <!--          <span>{{$t('gpu.DBCRemaining')}}：349</span>-->
        <span
          >{{ $t("total") }}：{{ (totalPrice * usdToRmb).toFixed(2)
          }}{{ $t("RMB") }}</span
        >
        <span v-if="$t('website_name') !== 'congTuCloud'" class="ml20"
          >{{ $t("gpu.exchangeDBC") }}：{{ dbc_count }}</span
        >
      </div>
      <div v-if="$t('website_name') !== 'congTuCloud'" class="form-notice">
        {{ $t("dlg_lease_wallet_balance") }}: {{ balance }}
      </div>
      <div v-if="$t('website_name') !== 'congTuCloud'" class="form-notice">
        {{ $t("left_gasamount") }}: {{ gas_balance.toFixed(3) }}
      </div>
      <div
        v-if="$t('website_name') !== 'congTuCloud'"
        class="desc-box"
        v-html="$t('msg.dlg_5')"
      ></div>
    </div>
    <div class="dlg-bottom">
      <el-button
        v-if="$t('website_name') === 'congTuCloud'"
        class="dlg-btn"
        type="primary"
        size="small"
        @click="confirmCongtu"
        :disabled="!isCanCreateOrder"
        >{{ $t("dlg_lease_create_order") }}</el-button
      >
      <el-button
        v-else
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
  get_memory_cpu_payment,
  get_max_disk_can_use,
} from "@/api";
import {
  getBalance,
  getGasBalance,
  getUsdToRmb,
  getCongtuCpuOrderIdPrefix,
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
          //       dbc_price: 0.0026,
          gpu_price_dollar: 0.0001,
          //       code: "0.3848",
          //       time_max: 1500,
          //       gpu_count_max: 1,
          images_tag: "tensorflow1.14-pytorch1.2",
          diskspace_giving: 31457280,
          //      diskSpace_per_gpu_max: 210736353,
          //      memory_per_gpu_max: 23741925,
          //      diskspace_max_cpu: 0,
          //      memory_max_cpu: 0,
          //      disk_GB_perhour_dollar: 3.3333334e-5,
          //      diskspace_image_data: 0
          disk_space: 60,
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
      diskspace_max_cpu: 300 * 1024 * 1024,
      disk_cpu_data: 0,
      disk_space: 60,
    };
  },
  watch: {
    open(newVal) {
      this.isOpen = newVal;
      if (newVal) {
        this.time = 1;
        this.dbc_price = "";
        // this.get_memory_cpu_payment(placeOrderData.machine_id, this.disk_buy);
        this.computeTotalDBC();
        //  this.getPayDbcCount();
        if (this.$t("website_name") === "congTuCloud") {
          return;
        }
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
    imagesOptions() {
      let opts = [];
      var tags = [];
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
      opts.push({
        name: this.$t("user_defined"),
        value: "tensorflow114andpytorch12",
      });
      return opts;
    },
    totalPrice() {
      return (
        this.placeOrderData.gpu_price_dollar * this.time * this.timeSelect +
        this.placeOrderData.disk_GB_perhour_dollar *
          this.disk_buy *
          this.time *
          this.timeSelect
      );
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
            this.placeOrderData.diskspace_giving / (1024 * 1024)
          );
          if (this.placeOrderData.order_id_pre !== null) {
            this.disk_buy = this.placeOrderData.disk_space / (1024 * 1024);
            /* this.disk_cpu_data = parseInt(
              this.placeOrderData.diskspace_image_data / (1024 * 1024)
            );

            if (
              this.placeOrderData.diskspace_image_data != 0 &&
              this.disk_buy === 60
            ) {
              this.disk_buy =
                parseInt(
                  this.placeOrderData.diskspace_image_data / (1024 * 1024)
                ) + this.disk_buy;
              if (
                this.disk_buy * (1024 * 1014) +
                  this.placeOrderData.diskspace_giving >
                this.diskspace_max_cpu
              ) {
                this.disk_buy = parseInt(
                  (this.diskspace_max_cpu -
                    this.placeOrderData.diskspace_giving) /
                    (1024 * 1014)
                );
              }
            }
            if (
              this.disk_buy * (1024 * 1014) +
                this.placeOrderData.diskspace_giving <
                this.placeOrderData.diskspace_image_data + 10 * 1024 * 1024 &&
              this.placeOrderData.order_id_pre === null
            ) {
              this.$message({
                showClose: true,
                message: this.$t("less_data_disk_10g"),
                type: "error"
              });
            }

            if (
              this.disk_buy * (1024 * 1014) +
                this.placeOrderData.diskspace_giving <
                this.placeOrderData.diskspace_image_data + 1 * 1024 * 1024 &&
              this.placeOrderData.order_id_pre !== null
            ) {
              this.$message({
                showClose: true,
                message: this.$t("less_data_disk_1g"),
                type: "error"
              });
            }

            if (
              this.placeOrderData.diskspace_image_data >
              this.diskspace_max_cpu + 10 * 1024 * 1024
            ) {
              this.$message({
                showClose: true,
                message: this.$t("less_data_disk_over_max"),
                type: "error"
              });
            }*/
          }
          /*   if (
            this.disk_buy * (1024 * 1014) +
              this.placeOrderData.diskspace_giving >
            this.diskspace_max_cpu
          ) {
            this.$message({
              showClose: true,
              message: this.$t("over_max_disk"),
              type: "error"
            });
            this.disk_buy =
              parseInt(
                (this.diskspace_max_cpu -
                  this.placeOrderData.diskspace_giving) /
                  (1024 * 1024)
              ) > 0
                ? parseInt(
                    (this.diskspace_max_cpu -
                      this.placeOrderData.diskspace_giving) /
                      (1024 * 1024)
                  )
                : 0;
          } */

          this.get_memory_cpu_payment(
            this.placeOrderData.machine_id,
            this.disk_buy
          );
          this.get_max_disk_can_use();
          this.getPayDbcCount();
        }, 1000);
      }
    },
    getPayDbcCount() {
      if (this.$t("website_name") === "congTuCloud") {
        const user_name_platform = this.$t("website_name");
        const language = this.$i18n.locale;
        this.disk_giving = parseInt(
          this.placeOrderData.diskspace_giving / (1024 * 1024)
        );

        get_pay_dbc_count({
          rent_time_length: this.time * 60 * this.timeSelect,
          gpu_count: 0,
          diskspace: this.disk_buy * 1024 * 1024,
          order_id: this.placeOrderData.order_id,
          order_id_prefix: getCongtuCpuOrderIdPrefix(),
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
      } else {
        const user_name_platform = this.$t("website_name");
        const language = this.$i18n.locale;
        this.disk_giving = parseInt(
          this.placeOrderData.diskspace_giving / (1024 * 1024)
        );

        get_pay_dbc_count({
          rent_time_length: this.time * 60 * this.timeSelect,
          gpu_count: 0,
          diskspace: this.disk_buy * 1024 * 1024,
          order_id: this.placeOrderData.order_id,
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
      }
    },

    get_memory_cpu_payment(machine_id, disk_buy) {
      get_memory_cpu_payment({
        order_id: this.placeOrderData.order_id,
        machine_id: this.placeOrderData.machine_id,

        diskspace: this.disk_buy * 1024 * 1024,
      }).then((res) => {
        if (res.status === 1) {
          this.memory = res.content;
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error",
          });
        }
      });
    },

    get_max_disk_can_use() {
      get_max_disk_can_use({
        machine_id: this.placeOrderData.machine_id,
      }).then((res) => {
        if (res.status === 1) {
          this.diskspace_max_cpu = res.content;
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
        params = {
          rent_time_length: this.time * this.timeSelect * 60,

          gpu_count: 0,

          diskspace: this.disk_buy * 1024 * 1024,
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
          diskspace: this.disk_buy * 1024 * 1024,
          order_type: "training",
          order_id: this.placeOrderData.order_id,

          user_name_platform: this.$t("website_name"),
          language: this.$i18n.locale,
        };
      }
      this.$emit("confirm", params);

      if (this.placeOrderData.order_id_pre === null) {
        this.pocMachine(this.placeOrderData.order_id);
      }
    },
    confirmCongtu() {
      let params;

      if (this.placeOrderData.order_id_pre !== null) {
        params = {
          rent_time_length: this.time * this.timeSelect * 60,

          gpu_count: 0,
          image_tag: this.images,

          diskspace: this.disk_buy * 1024 * 1024,
          order_type: "training",
          order_id: this.placeOrderData.order_id,

          user_name_platform: this.$t("website_name"),
          language: this.$i18n.locale,
          r_count: `${(this.totalPrice * this.usdToRmb).toFixed(2)}`,
          congtu_order_id_prefix: getCongtuCpuOrderIdPrefix(),
        };
      } else {
        params = {
          rent_time_length: this.time * this.timeSelect * 60,

          gpu_count: 0,
          image_tag: this.images,
          diskspace: this.disk_buy * 1024 * 1024,
          order_type: "training",
          order_id: this.placeOrderData.order_id,

          user_name_platform: this.$t("website_name"),
          language: this.$i18n.locale,
          r_count: `${(this.totalPrice * this.usdToRmb).toFixed(2)}`,
          congtu_order_id_prefix: getCongtuCpuOrderIdPrefix(),
        };
      }
      console.log("-------------cpu params--------------");
      console.log(params);
      this.$emit("confirm", params);

      if (this.placeOrderData.order_id_pre === null) {
        this.pocMachine(this.placeOrderData.order_id);
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
