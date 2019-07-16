<template>
  <el-dialog
      :visible.sync="isOpen"
      @closed="closed"
      width="580px">
      <div slot="title">{{$t('lease')}}</div>
      <div class="dlg-content">
        <!--<h3 class="content-head">
          {{$t('gpu.needHD')}}：66GB $ 22/{{$t('hour')}}
        </h3>-->
        <div class="form">
          <label>{{$t('gpu.choseGpuCount')}}：</label>
          <el-select class="time-select ml10" v-model="gpuCountSelect" size="small">
            <el-option v-for="item in gpuCountOptions" :key="item.value"
                       :label="item.name"
                       :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="form mt20">
          <label>{{$t('gpu.needHD')}}：</label>
          <input class="small-input" type="number">
          <span class="fs12 cGray ml10">GB</span>
          <span class="fs12 cGray ml10">$xxx/{{$t('hour')}}</span>
        </div>

        <div class="form mt20">
          <label>{{$t('gpu.reloadTime')}}：</label>
          <input class="small-input" type="number">
          <el-select class="time-select ml10" v-model="timeSelect" size="small">
            <el-option v-for="item in timeOptions" :key="item.value"
                       :label="item.name"
                       :value="item.value"
            ></el-option>
          </el-select>
          <span class="fs12 cGray ml10"> {{$t('hour')}} $xxx</span>
        </div>
        <div class="form-notice">
          {{$t('tips')}}：{{$t('msg.dlg_0')}}
        </div>
        <div class="computer-dbc mt30">
<!--          <span>{{$t('gpu.DBCRemaining')}}：349</span>-->
          <span>{{$t('total')}}({{$t('$')}})：2323</span>
          <span class="ml20">{{$t('gpu.exchangeDBC')}}：345</span>
        </div>
        <div class="form-notice">
          {{$t('msg.dlg_1')}}
        </div>
        <div class="desc-box" v-html="$t('msg.dlg_5')">
        </div>
      </div>
      <div class="dlg-bottom">
        <el-button class="dlg-btn" type="primary" size="small" @click="confirm">{{$t('confirmPay')}}</el-button>
        <el-button class="dlg-btn" plain size="small" @click="cancel">{{$t('cancel')}}</el-button>
      </div>
    </el-dialog>
</template>

<script>

  export default {
    name: "popup_reload",
    props: {
      open: Boolean
    },
    watch: {
      open(newVal) {
        this.isOpen = newVal
      }
    },
    data() {
      return {
        isOpen: this.open,
        timeSelect: 0,
        timeOptions: [
          {
            name: this.$t('hour'),
            value: 0
          },
          {
            name: this.$t('day'),
            value: 1
          }
        ],
        gpuCountSelect: 1,
        gpuCountOptions: [
          {
            name: 1,
            value: 1
          },
          {
            name: 2,
            value: 2
          }
        ],
      }
    },
    methods: {
      confirm() {
        this.closed()
        this.$emit('confirm')
      },
      cancel() {
        this.closed()
        this.$emit('cancel')
      },
      closed() {
        this.isOpen = false
        this.$emit('update:open', false)
      }
    }
  }
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
    background-color: #F6F9FC;
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
