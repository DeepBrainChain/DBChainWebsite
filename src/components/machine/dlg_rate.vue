<template>
  <el-dialog
    :visible.sync="isOpen"
    width="540px"
    @close="closed">
    <div slot="title">{{$t('gpu.rate')}}</div>
    <el-form class="dlg-content">
      <div class="flex center">
        <el-rate v-model="rateVal" :max="5" allow-half></el-rate>
        <span>{{showRate}}{{$t('scores')}}</span>
      </div>
      <div class="center pt10 pb10">
        {{$t('gpu.rateMsg')}}
      </div>
      <div>
        <el-input
          type="textarea"
          :rows="8"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
      </div>
      <el-form-item label="请输入验证码：">
        <el-input class="w200" size="small"></el-input>
        <el-button class="ml10" plain size="mini" >发送验证码</el-button>
      </el-form-item>
    </el-form>
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
      isEdit: {
        type: Boolean,
        default: false
      }
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
        textarea: '',
        rateVal: 0,
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
    },
    computed: {
      showRate() {
        return this.rateVal * 2
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
