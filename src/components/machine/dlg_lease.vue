<template>
  <el-dialog :visible.sync="isOpen" @closed="closed" width="580px">
    <div slot="title">{{$t('lease')}}</div>
    <div class="dlg-content">
      <!--<h3 class="content-head">
        {{$t('gpu.needHD')}}：66GB $ 22/{{$t('hour')}}
      </h3>-->
      <div class="form">
        <label>{{$t('gpu.choseGpuCount')}}：</label>
        <el-select class="time-select ml10" v-model="gpuCount" size="small">
          <el-option
            v-for="item in gpuCountOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <!--<div class="form mt20">
        <label>{{$t('gpu.needHD')}}：</label>
        <input class="small-input" type="number">
        <span class="fs12 cGray ml10">GB</span>
        <span class="fs12 cGray ml10">$xxx/{{$t('hour')}}</span>
      </div>-->
      <div class="form mt20">
        <label>使用时长：</label>
        <input class="small-input" type="number" v-model="time" />
        <el-select class="time-select ml10" v-model="timeSelect" size="small">
          <el-option
            v-for="item in timeOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <span class="fs12 cGray ml10">${{(placeOrderData.gpu_price_dollar*timeSelect).toFixed(4) }}</span>
      </div>
      <div class="form-notice">{{$t('tips')}}：{{$t('msg.dlg_0',{time: outDayTime})}}</div>
      <div class="computer-dbc mt30">
        <!--          <span>{{$t('gpu.DBCRemaining')}}：349</span>-->
        <span>{{$t('total')}}({{$t('$')}})：{{ totalPrice.toFixed(4) }}</span>
        <span class="ml20">{{$t('gpu.exchangeDBC')}}：{{dbcNum}}</span>
      </div>
      <div class="form-notice">{{$t('msg.dlg_1')}}</div>
      <div class="desc-box" v-html="$t('msg.dlg_5')"></div>
    </div>
    <div class="dlg-bottom">
      <el-button class="dlg-btn" type="primary" size="small" @click="confirm">生成订单</el-button>
      <el-button class="dlg-btn" plain size="small" @click="cancel">{{$t('cancel')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
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
          gpu_price_dollar: 0.0001,
          code: "0.3848",
          time_max: 1500,
          gpu_count_max: 1,
          dbc_price: 0.0026
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
      time: 1
    };
  },
  watch: {
    open(newVal) {
      this.isOpen = newVal;
      if (newVal) {
        this.time = 1;
      }
    }
  },
  computed: {
    outDayTime() {
      const hours = parseInt(this.placeOrderData.time_max / 60);
      const day = Math.floor(hours / 24);
      const h = hours - day * 24;
      return `${day}天${h}小时`;
    },
    gpuCountOptions() {
      let opts = [];
      for (let i = 1; i <= this.placeOrderData.gpu_count_max; i *= 2) {
        opts.push({
          name: i,
          value: i
        });
      }
      return opts;
    },
    totalPrice() {
      return (
        this.placeOrderData.gpu_price_dollar *
        this.gpuCount *
        this.time *
        this.timeSelect
      );
    },
    dbcNum() {
      return Math.floor(this.totalPrice / this.placeOrderData.dbc_price);
    }
  },
  methods: {
    confirm() {
      const params = {
        rent_time_length: this.time * this.timeSelect * 60,
        dbc_price: this.placeOrderData.dbc_price,
        gpu_count: this.gpuCount,
        order_id: this.placeOrderData.order_id,
        dbc_total_count: this.dbcNum
      };
      this.$emit("confirm", params);
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
