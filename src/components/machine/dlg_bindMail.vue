<template>
  <el-dialog
      :visible.sync="isOpen"
      width="540px"
  @close="closed">
      <div slot="title">{{isNewMail ? $t('bind') : $t('modify')}}{{$t('gpu.mailAddress')}}</div>
      <div class="dlg-content">
        <div class="form mt20">
          <label>{{isNewMail ? $t('gpu.inputMail'):$t('gpu.inputNewMail')}}：</label>
          <input class="small-input" type="email">
          <el-button class="ml10" size="mini" plain @click="verifyMail">{{$t('gpu.receiveMail')}}</el-button>
        </div>

        <div class="midInfo mt20">
          {{$t('gpu.receiveMailInfo')}}
        </div>
        <div class="form mt20">
          <label>{{$t('gpu.verifyDbc')}}：</label>
          <input class="small-input" type="number">
          <span class="ml10">{{$t('gpu.attentionDecimal')}}</span>
        </div>
      </div>
      <div class="dlg-bottom">
        <el-button class="dlg-btn" type="primary" size="small" @click="binding" :loading="isLoading">{{$t('gpu.startBind')}}</el-button>
      </div>
    </el-dialog>
</template>

<script>

  export default {
    name: "popup_reload",
    props: {
      open: Boolean,
      isNewMail:Boolean
    },
    watch: {
      open(newVal) {
        this.isOpen = newVal
      }
    },
    data() {
      return {
        isOpen: this.open,
        isLoading: false,
      }
    },
    methods: {
      closed() {
        this.isOpen = false
        this.$emit('update:open', false)
      },
      binding() {

      },
      verifyMail() {

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
  .midInfo {
    font-size: 16px;
  }

</style>
