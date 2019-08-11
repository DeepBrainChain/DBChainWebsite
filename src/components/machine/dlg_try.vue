<template>
  <el-dialog :visible.sync="isOpen" @closed="closed" width="400px">
    <div slot="title">试用</div>
    <div class="dlg-content">
      <div>
        试用条件：当前钱包持有大于等于1000 DBC
      </div>
      <div>
        试用费用：0 DBC
      </div>
      <div>
        试用时间：10分钟
      </div>
      <div>
        GPU 数量：1
      </div>
    </div>
    <div class="dlg-bottom">
      <el-button class="dlg-btn" type="primary" size="small" @click="confirm">确认支付</el-button>
      <el-button class="dlg-btn" plain size="small" @click="cancel">{{$t('cancel')}}</el-button>
    </div>
    <div class="mt20">
      支付1DBC成功后，机器登陆信息将会发送到您的邮箱中
    </div>
  </el-dialog>
</template>

<script>
  import {get_pay_dbc_count} from '@/api'

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
        reqSt: undefined
      };
    },
    watch: {
      open(newVal) {
        this.isOpen = newVal;
        if (newVal) {
          this.time = 1;
          this.dbc_price = ''
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
      computeTotalDBC() {
        console.log('改变')
        clearTimeout(this.reqSt)
        this.reqSt = setTimeout(() => {
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
        }, 1000)
      },
      confirm() {
        this.closed()
        this.$emit("confirm");
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
