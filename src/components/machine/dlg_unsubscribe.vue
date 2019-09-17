<template>
  <el-dialog :visible.sync="isOpen" width="540px" @close="closed">
    <div slot="title">{{$t('unsubscribe')}}</div>
    <div class="dlg-content">
      <div class="midInfo mt20">
        <!--<p>{{$t('gpu.backDbcNum')}}: xxx DBC</p>
        <div>
          <span v-html="$t('msg.dlg_6')"></span>
          <span></span>
        </div>-->
        <el-form>
          <el-form-item :label="$t('dlg_input_code')">
            <el-input v-model="stop_code" size="small" style="width: 200px"></el-input>
            <el-button
              :loading="isCoding"
              class="ml10"
              plain
              size="mini"
              @click="getStopCode"
            >{{$t('dlg_get_code')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="dlg-bottom">
      <el-button
        :loading="isLoading"
        class="dlg-btn"
        type="primary"
        size="small"
        @click="confirm"
      >{{$t('confirm')}}</el-button>
      <el-button class="dlg-btn" plain size="small" @click="cancel">{{$t('cancel')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { get_stop_code, stop } from "@/api";

export default {
  name: "popup_reload",
  props: {
    open: Boolean,
    item: Object
  },
  watch: {
    open(newVal) {
      this.isOpen = newVal;
    }
  },
  data() {
    return {
      isOpen: this.open,
      isLoading: false,
      isCoding: false,
      stop_code: ""
    };
  },
  methods: {
    closed() {
      this.isOpen = false;
      this.$emit("update:open", false);
    },
    getStopCode() {
      this.isCoding = true;
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      get_stop_code({
        order_id: this.item.orderData.order_id,
        user_name_platform,
        language
      })
        .then(res => {
          if (res.status === 1) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
        })
        .finally(() => {
          this.isCoding = false;
        });
    },
    confirm() {
      this.isLoading = true;
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      stop({
        order_id: this.item.orderData.order_id,
        stop_code: this.stop_code,
        user_name_platform,
        language
      })
        .then(res => {
          if (res.status === 1) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success"
            });
            this.closed();
            this.$emit("success");
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    cancel() {
      this.closed();
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

.midInfo {
  font-size: 16px;
}
</style>
