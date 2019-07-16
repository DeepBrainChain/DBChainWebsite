<template>
  <el-dialog
    :visible.sync="isOpen"
    width="540px"
    @close="closed">
    <div slot="title">{{$t('unsubscribe')}}</div>
    <div class="dlg-content">
      <div class="midInfo mt20">
        <p>{{$t('gpu.backDbcNum')}}: xxx DBC</p>
        <div>
          <span v-html="$t('msg.dlg_6')"></span>
          <span></span>
        </div>
      </div>
    </div>
    <div class="dlg-bottom">
      <el-button class="dlg-btn" type="primary" size="small" @click="confirm">{{$t('confirm')}}</el-button>
      <el-button class="dlg-btn" plain size="small" @click="cancel">{{$t('cancel')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>

  export default {
    name: "popup_reload",
    props: {
      open: Boolean,
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
      confirm() {
        this.closed()
      },
      cancel() {
        this.closed()
      },
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
