<template>
  <div>
    <el-dialog
      :visible.sync="isOpen"
      @closed="closed"
      width="520px">
      <div slot="title">{{$t('gpu.increaseHD')}}<span class="ml15 fs12 cGray">{{$t('gpu.machineRemaining')}} xxxx{{$t('day')}}xxx{{$t('hour')}}</span></div>
      <div class="dlg-content">
        <div class="form">
          <label>{{$t('gpu.HDSpace')}}：</label>
          <span>{{$t('gpu.from')}}43GB{{$t('gpu.addTo')}}</span>
          <input class="small-input ml10" type="text">
          <span class="ml10">GB</span>
        </div>
        <div class="form-notice">
          {{$t('gpu.originalPrice')}}：234{{$t('$')}} - {{$t('gpu.currentPrice')}}：234{{$t('$')}}
        </div>
        <div class="computer-dbc mt30">
          <span>{{$t('gpu.DBCRemaining')}}：349</span>
          <span>{{$t('total')}}({{$t('$')}})：2323</span>
          <span>{{$t('gpu.exchangeDBC')}}：345</span>
        </div>
        <div class="form-notice">
          {{$t('msg.dlg_1')}}
        </div>
      </div>
      <div class="dlg-bottom">
        <el-button class="dlg-btn" type="primary" size="small" @click="confirm">{{$t('confirmPay')}}</el-button>
        <el-button class="dlg-btn" plain size="small" @click="cancel">{{$t('cancel')}}</el-button>
      </div>
    </el-dialog>
  </div>
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
      }
    },
    methods: {
      confirm () {
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
</style>
