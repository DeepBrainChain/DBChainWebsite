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
        v-if="!placeOrderData.from_stop_to_open&&!placeOrderData.dbc_version!=='0.3.7.2'"
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
      </div>

      <div class="form mt20">
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

      <div class="form mt20">
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

      <div class="form mt20">
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
        >({{$t('diskspace_new_cpu_stop')}}:{{(disk_buy+disk_giving-placeOrderData.diskspace_image_data / (1024 * 1024)).toFixed(2)}}G)</label>
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
import { getBalance } from "@/utlis";

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
          images_tag: "pytorch 1.1+tensorflow 1.14@pytorch 1.2",
          diskspace_giving: 31457280,
          diskSpace_per_gpu_max: 210736353,
          memory_per_gpu_max: 23741925,
          diskspace_max_cpu: 0,
          memory_max_cpu: 0,
          disk_GB_perhour_dollar: 3.3333334e-5,
          diskspace_image_data: 0
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
      images: "pytorch 1.1+tensorflow 1.14",
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
      memory: 0,
      memory_every_gpu: 0
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
      return `${day}D${h}H`;
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
      tags = this.placeOrderData.images_tag.split("@");
      for (let i = 0; i <= tags.length; i++) {
        opts.push({
          name: tags[i],
          value: tags[i]
        });
      }
      opts.push({
        name: this.$t("user_defined"),
        value: "pytorch 1.2"
      });
      return opts;
    },

    totalPrice() {
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
    },
    dbcNum() {
      return Math.floor(this.totalPrice / this.placeOrderData.dbc_price);
    }
  },
  methods: {
    getBalance() {
      getBalance().then(res => {
        this.balance = res.balance;
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

          if (this.disk_buy > this.disk_max) {
            this.$message({
              showClose: true,
              message: this.$t("over_max_disk"),
              type: "error"
            });
            this.disk_buy = this.disk_max;
          }
          this.getPayDbcCount();
        }, 1000);
      }
    },
    getPayDbcCount() {
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
      if (
        this.disk_buy +
          this.disk_giving -
          this.placeOrderData.diskspace_image_data <=
        0
      ) {
        this.$message({
          showClose: true,
          message: this.$t("diskspace_less_zero"),
          type: "error"
        });
      }
      get_pay_dbc_count({
        rent_time_length: this.time * 60 * this.timeSelect,
        gpu_count: this.gpuCount,
        diskspace: this.disk_buy * 1024 * 1024,
        order_id: this.placeOrderData.order_id,
        user_name_platform,
        language
      }).then(res => {
        if (res.status === 1) {
          this.total_price = res.content;
          if (parseInt(this.total_price) > parseInt(this.balance)) {
            this.$message({
              showClose: true,
              message: this.$t("lessdbc"),
              type: "error"
            });
          }
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
