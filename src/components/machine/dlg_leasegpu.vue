<template>
  <el-dialog :visible.sync="isOpen" @closed="closed" width="580px">
    <div slot="title" v-if="!placeOrderData.from_stop_to_open">{{$t('lease_gpu')}}</div>
    <div slot="title" v-if="placeOrderData.from_stop_to_open">{{$t('stop_to_gpu_container')}}</div>
    <div class="dlg-content">
      <!--<h3 class="content-head">
        {{$t('gpu.needHD')}}：66GB $ 22/{{$t('hour')}}
      </h3>-->

      <div
        class="cRed"
        v-if="!placeOrderData.from_stop_to_open&&!placeOrderData.dbc_version!=='0.3.7.2'&&machine_type!==3"
      >
        <label>{{$t('cpu_container_instruaction')}}</label>
      </div>

      <div class="form" v-if="!placeOrderData.from_stop_to_open">
        <label>{{$t('choseImages')}}：</label>
        <el-select class="time-select ml10" v-model="images" style="width: 360px" size="small">
          <el-option
            v-for="item in imagesOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="form mt20">
        <label>{{$t('gpu.choseGpuCount')}}：</label>
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
        <label
          v-if="gpu_rentout_whole"
        >{{placeOrderData.gpu_count_max}}&nbsp;&nbsp;&nbsp;&nbsp;{{$t('whole_rent_machine_tip')}}</label>
      </div>
      <div class="form mt20">
        <el-radio-group v-model="discount" @change="computeTotalDBC">
          <el-radio label="0">{{$t('leaseback_anytime')}}</el-radio>

          <el-radio label="2">{{$t('monthly')}}</el-radio>
          <el-radio label="3">{{$t('quarterly')}}</el-radio>
          <el-radio label="4">{{$t('yearly')}}</el-radio>
        </el-radio-group>
      </div>
      <div class="form mt20">
        <label class="cRed" v-if="discount==='2'">{{$t('month_discount_instruction')}}</label>
        <label class="cRed" v-else-if="discount==='3'">{{$t('quarter_discount_instruction')}}</label>
        <label class="cRed" v-else-if="discount==='4'">{{$t('year_discount_instruction')}}</label>
      </div>
      <div class="form mt20" v-if="discount==='0'">
        <label>{{$t('dlg_lease_time')}}：</label>
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
        >{{(placeOrderData.gpu_price_dollar)}}$/{{$t('my_machine_hour')}}</span>
      </div>

      <div class="form mt20" v-if="!placeOrderData.from_stop_to_open&&machine_type!==3">
        <label>{{$t('diskspace_dlg')}}：</label>
        <label>{{$t('diskspace_giving')}}{{disk_giving}}G</label>
        <label>({{$t('diskspace_giving_gpu')}}{{disk_giving_every_gpu}}G)</label>
      </div>
      <div class="form mt20" v-if="placeOrderData.order_id_pre!==null">
        <label
          v-if="placeOrderData.from_stop_to_open"
        >{{$t('diskspace_data_stop')}}{{(placeOrderData.diskspace_image_data / (1024 * 1024)).toFixed(2)}}G</label>
        <label
          v-if="!placeOrderData.from_stop_to_open"
        >{{$t('diskspace_gpu_data')}}{{(placeOrderData.diskspace_image_data / (1024 * 1024)).toFixed(2)}}G</label>
      </div>

      <div class="form mt20" v-if="!placeOrderData.from_stop_to_open&&machine_type!==3">
        <label>{{$t('buy_diskspace')}}：</label>
        <el-input
          style="width: 120px"
          size="small"
          type="number"
          v-model.number.trim="disk_buy"
          @input="computeTotalDBC"
        />
        <span class="fs12 cGray ml10">G</span>
        <span
          class="fs12 cGray ml10"
        >{{(placeOrderData.disk_GB_perhour_dollar)}}$/{{$t('disk_hour')}}</span>

        <span class="fs12 cGray ml10">{{$t('disk_max')}}{{(disk_max)}}G</span>
      </div>
      <div class="form mt20" v-if="placeOrderData.order_id_pre!==null">
        <label
          v-if="!placeOrderData.from_stop_to_open"
        >({{$t('diskspace_new_cpu')}}:{{(disk_buy+disk_giving-placeOrderData.diskspace_image_data / (1024 * 1024)).toFixed(2)}}G)</label>
        <label
          v-if="placeOrderData.from_stop_to_open"
        >({{$t('diskspace_new_cpu_stop')}}:{{(disk_buy-placeOrderData.diskspace_image_data / (1024 * 1024)).toFixed(2)}}G)</label>
        <span
          class="fs12 cGray ml10"
          v-if="!gpu_rentout_whole"
        >{{(placeOrderData.disk_GB_perhour_dollar)}}$/{{$t('disk_hour')}}</span>
      </div>
      <div class="form mt20" v-if="machine_type===3&&!placeOrderData.from_stop_to_open">
        <label>{{$t('disk_auto_machine_type')}}：</label>
        <label>{{disk_giving+disk_max}}G</label>
      </div>
      <div class="form mt20">
        <label>{{$t('memory_dlg')}}：</label>
        <label>{{memory}}G</label>
        <label>({{$t('memory_every_gpu')}}{{memory_every_gpu}}G)</label>
      </div>

      <div class="cRed">{{$t('tips')}}：{{$t('msg.dlg_0',{time: outDayTime})}}</div>
      <div class="computer-dbc mt30">
        <!--          <span>{{$t('gpu.DBCRemaining')}}：349</span>-->
        <span>{{$t('total')}}：{{ totalPrice.toFixed(4) }}{{$t('$')}}</span>
        <span class="ml20">{{$t('gpu.exchangeDBC')}}：{{total_price}}</span>
      </div>
      <div class="form-notice">{{$t('dlg_lease_wallet_balance')}}: {{balance}}</div>
      <div class="form-notice">{{$t('left_gasamount')}}: {{gas_balance.toFixed(3)}}</div>
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
import { get_pay_dbc_count, can_rent_this_machine } from "@/api";
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
          order_id: "5d42e162e124f45a4fa158f5",
          dbc_price: 0.0026,
          gpu_price_dollar: 0.0001,
          code: "0.3848",
          time_max: 1500,
          gpu_count_max: 1,
          images_tag: "",
          diskspace_giving: 31457280,
          diskSpace_per_gpu_max: 210736353,
          memory_per_gpu_max: 23741925,
          diskspace_max_cpu: 0,
          memory_max_cpu: 0,
          disk_GB_perhour_dollar: 3.3333334e-5,
          diskspace_image_data: 0,
          disk_space: 60,
          gpu_rentout_whole: false,
          machine_type: 0
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
      gpuCount: 1,
      images: "",
      time: 1,
      total_price: "0",
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
      discount: "0",
      gpu_rentout_whole: false,
      machine_type: 0
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
        this.gpu_rentout_whole = this.placeOrderData.gpu_rentout_whole;
        this.machine_type = this.placeOrderData.machine_type;
        this.computeTotalDBC();
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
          value: i
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
        if (this.placeOrderData.machine_type !== 3) {
          this.placeOrderData.images_tag = "tensorflow1.14-pytorch1.2";
          this.images = "tensorflow1.14-pytorch1.2";
        } else {
          this.placeOrderData.images_tag = "filecoin-proof";
          this.images = "filecoin-proof";
        }
      } else {
        this.images = "tensorflow1.14-pytorch1.2";
      }
      tags = this.placeOrderData.images_tag.split("@");

      for (let i = 0; i <= tags.length; i++) {
        if (i === 0) {
          this.images = tags[i];
        }

        opts.push({
          name: tags[i],
          value: tags[i]
        });
      }
      if (
        this.placeOrderData.machine_type !== 3 &&
        this.placeOrderData.machine_type !== 4
      ) {
        opts.push({
          name: this.$t("user_defined"),
          value: "tensorflow114andpytorch12"
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
    }
  },
  methods: {
    updateChecked() {},
    getBalance() {
      getBalance().then(res => {
        this.balance = res.balance;
      });
    },
    getGasBalance() {
      getGasBalance().then(res => {
        this.gas_balance = res.gas_balance;
      });
    },
    computeTotalDBC() {
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
          if (this.placeOrderData.from_stop_to_open) {
            this.disk_buy = this.placeOrderData.disk_space / (1024 * 1024);
          } else {
            //如果是从停止启动容器，不限制硬盘空间
            if (this.disk_buy > this.disk_max) {
              this.$message({
                showClose: true,
                message: this.$t("over_max_disk"),
                type: "error"
              });
              this.disk_buy = this.disk_max;
            }
          }
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
      if (this.placeOrderData.from_stop_to_open) {
        this.disk_buy = this.placeOrderData.disk_space / (1024 * 1024);
      } else {
        if (
          this.disk_buy +
            this.disk_giving -
            this.placeOrderData.diskspace_image_data / (1024 * 1024) <=
          0
        ) {
          this.$message({
            showClose: true,
            message: this.$t("diskspace_less_zero"),
            type: "error"
          });
        }
      }

      get_pay_dbc_count({
        rent_time_length: this.time * 60 * this.timeSelect,
        gpu_count: this.gpuCount,
        diskspace: this.disk_buy * 1024 * 1024,
        order_id: this.placeOrderData.order_id,
        rent_type: rent_type,
        user_name_platform,
        language
      }).then(res => {
        if (res.status === 1) {
          this.total_price = res.content;
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error"
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
        language
      });
    },
    confirm() {
      if (parseInt(this.dbc_count) > parseInt(this.balance)) {
        this.$message({
          showClose: true,
          message: this.$t("lessdbc"),
          type: "error"
        });
        return;
      }

      if (this.gas_balance === 0) {
        this.$message({
          showClose: true,
          message: this.$t("zerogas"),
          type: "error"
        });
        return;
      }

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
      if (this.machine_type === 3) {
        this.disk_buy = this.disk_max;
      }
      const params = {
        rent_time_length: this.time * this.timeSelect * 60,
        order_is_over: this.placeOrderData.order_is_over,
        dbc_price: this.placeOrderData.dbc_price,
        gpu_count: this.gpuCount,
        image_tag: this.images,
        diskspace: this.disk_buy * 1024 * 1024,
        order_type: "training",
        order_id: this.placeOrderData.order_id,
        dbc_total_count: this.total_price,
        rent_type: rent_type,
        machine_type: this.machine_type,
        user_name_platform: this.$t("website_name"),
        language: this.$i18n.locale
      };
      this.$emit("confirm", params);
      pocMachine(this.placeOrderData.order_id);
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
