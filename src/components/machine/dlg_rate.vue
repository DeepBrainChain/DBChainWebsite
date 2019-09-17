<template>
  <el-dialog :visible.sync="isOpen" width="540px" @close="closed">
    <div slot="title">{{isEdit ? $t('dlg_rate_edit_evalute'):$t('gpu.rate')}}</div>
    <el-form :model="$data" ref="ruleForm" class="dlg-content">
      <div class="flex center">
        <el-rate v-model="rateVal" :max="5" allow-half></el-rate>
        <span>{{showRate}}{{$t('scores')}}</span>
      </div>
      <div class="center pt10 pb10">{{$t('gpu.rateMsg')}}</div>
      <div>
        <el-input
          type="textarea"
          :rows="8"
          :placeholder="$t('dlg_rate_please_input')"
          v-model="textarea"
        ></el-input>
      </div>
      <el-form-item
        :label="$t('dlg_rate_please_code')"
        :rules="rules.evalution_code"
        prop="evalution_code"
        label-width="130px"
      >
        <el-input v-model="evalution_code" class="w200" size="small"></el-input>
        <el-button
          :loading="isCoding"
          class="ml10"
          plain
          size="mini"
          @click="getEvaluationCode"
        >{{$t('dlg_rate_send_code')}}</el-button>
      </el-form-item>
    </el-form>
    <div class="dlg-bottom">
      <el-button class="dlg-btn" type="primary" size="small" @click="confirm">{{$t('confirm')}}</el-button>
      <el-button class="dlg-btn" plain size="small" @click="cancel">{{$t('cancel')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  get_evaluation_code,
  evaluate_machine,
  modify_evaluate_machine
} from "@/api";

export default {
  name: "popup_reload",
  props: {
    open: Boolean,
    item: Object
  },
  watch: {
    open(newVal) {
      this.isOpen = newVal;
      if (newVal) {
        this.getItem();
        this.evalution_code = "";
      }
    }
  },
  data() {
    return {
      isOpen: this.open,
      isLoading: false,
      isCoding: false,
      textarea: "",
      rateVal: 0,
      evalution_code: "",
      rules: {
        evalution_code: [
          {
            required: true,
            message: this.$t("dlg_rate_please_code"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    getItem() {
      this.textarea = this.item.orderData.evaluation_content;
      this.rateVal = this.item.orderData.evaluation_score / 2;
    },
    getEvaluationCode() {
      this.isCoding = true;
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      get_evaluation_code({
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
    closed() {
      this.isOpen = false;
      this.$emit("update:open", false);
    },
    confirm() {
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            modify_evaluate_machine({
              evaluation_content: this.textarea,
              evaluation_score: this.rateVal * 2,
              order_id: this.item.orderData.order_id,
              evalution_code: this.evalution_code,
              user_name_platform,
              language
            }).then(res => {
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
            });
          } else {
            evaluate_machine({
              evaluation_content: this.textarea,
              evaluation_score: this.rateVal * 2,
              order_id: this.item.orderData.order_id,
              evalution_code: this.evalution_code,
              user_name_platform,
              language
            }).then(res => {
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
            });
          }
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.closed();
    }
  },
  computed: {
    isEdit() {
      return this.item && this.item.orderData.milli_evaluation_time > 0;
    },
    showRate() {
      return this.rateVal * 2;
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
