<template>
  <el-dialog :visible.sync="isOpen" @closed="closed" width="580px">
    <div slot="title">{{$t('lease')}}</div>
    <div class="dlg-content">
      <!--<h3 class="content-head">
        {{$t('gpu.needHD')}}：66GB $ 22/{{$t('hour')}}
      </h3>-->
      <div class="form">
        <label>{{$t('gpu.choseGpuCount')}}：</label>
        <el-select class="time-select ml10" v-model="gpuCount" size="small" @change="computeTotalDBC">
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
        <el-input style="width: 180px" size="small" type="number" v-model.number.trim="time" @input="computeTotalDBC"/>
        <el-select class="time-select ml10" v-model="timeSelect" size="small" @change="computeTotalDBC">
          <el-option
            v-for="item in timeOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <span class="fs12 cGray ml10">{{(placeOrderData.gpu_price_dollar)}}$/小时</span>
      </div>
      <div class="form-notice">{{$t('tips')}}：{{$t('msg.dlg_0',{time: outDayTime})}}</div>
      <div class="computer-dbc mt30">
        <!--          <span>{{$t('gpu.DBCRemaining')}}：349</span>-->
        <span>{{$t('total')}}：{{ totalPrice.toFixed(4) }}{{$t('$')}}</span>
        <span class="ml20">{{$t('gpu.exchangeDBC')}}：{{total_price}}</span>
      </div>
      <div class="form-notice">当前钱包DBC余额: {{balance}}</div>
      <div class="desc-box" v-html="$t('msg.dlg_5')"></div>
    </div>
    <div class="dlg-bottom">
      <el-button class="dlg-btn" type="primary" size="small" @click="confirm" :disabled="!isCanCreateOrder">生成订单
      </el-button>
      <el-button class="dlg-btn" plain size="small" @click="cancel">{{$t('cancel')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {get_pay_dbc_count} from '@/api'
  import {getBalance} from '@/utlis'

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
        time: 1,
        total_price: '',
        isGetTotalPrice: false,
        reqSt: undefined,
        isCanCreateOrder: true,
        balance: ''
      };
    },
    watch: {
      open(newVal) {
        this.isOpen = newVal;
        if (newVal) {
          this.time = 1;
          this.dbc_price = ''
          this.getPayDbcCount()
          this.getBalance()
        }
      },
      time(newVal) {
        if (newVal) {
          this.isCanCreateOrder = true
        } else {
          this.isCanCreateOrder = false
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
      getBalance() {
        getBalance().then(res => {
          this.balance = res.balance
        })
      },
      computeTotalDBC() {
        if (this.time) {
          clearTimeout(this.reqSt)
          this.reqSt = setTimeout(() => {
            this.getPayDbcCount()
          }, 1000)
        }
      },
      getPayDbcCount() {
        get_pay_dbc_count({
          rent_time_length: this.time * 60 * this.timeSelect,
          gpu_count: this.gpuCount,
          order_id: this.placeOrderData.order_id
        }).then(res => {
          if (res.status === 1) {
            this.total_price = res.content
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
        })
      },
      confirm() {
        const params = {
          rent_time_length: this.time * this.timeSelect * 60,
          dbc_price: this.placeOrderData.dbc_price,
          gpu_count: this.gpuCount,
          order_id: this.placeOrderData.order_id,
          dbc_total_count: this.total_price
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
