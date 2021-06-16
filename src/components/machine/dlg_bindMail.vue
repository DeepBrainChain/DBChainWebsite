<template>
  <el-dialog :visible.sync="isOpen" width="540px" @close="closed">
    <div slot="title">{{isNewMail ? $t('bind') : $t('modify')}}{{$t('gpu.mailAddress')}}</div>
    <el-form class="dlg-content" :model="form">
      <div class="form mt20">
        <el-form-item
          label-width="130px"
          :rules="rules.email"
          prop="email"
          :label="isNewMail ? $t('gpu.inputMail'):$t('gpu.inputNewMail') + ':'"
        >
          <el-input style="width: 200px" type="email" v-model="form.email" size="small"></el-input>
          <el-button
            class="ml10"
            size="mini"
            plain
            :loading="isSending"
            @click="sendVerifyMail"
          >{{$t('gpu.receiveMail')}}</el-button>
        </el-form-item>
      </div>

      <div class="midInfo mt20">{{$t('gpu.receiveMailInfo')}}</div>
      <div class="form mt20">
        <el-form-item label-width="180px" :label="$t('gpu.verifyDbc') + ':'">
          <el-input style="width: 150px" type="number" v-model="form.dbcNum" size="small"></el-input>
          <span class="ml10">{{$t('gpu.attentionDecimal')}}</span>
        </el-form-item>
      </div>
      <div class="cRed">
        <span>{{$t('dlg_bindMail_dbc_tip')}}</span>
      </div>
      <div class="form mt20" v-if="isNewWallet == 'true'">
        <el-form-item label-width="150px" :label="$t('verifyPassward') + ':'">
          <el-input style="width: 300px"  show-password v-model="form.passward" size="small"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="dlg-bottom">
      <el-button
        class="dlg-btn"
        type="primary"
        size="small"
        @click="binding"
        :loading="isLoading"
      >{{$t('gpu.startBind')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  sendMail_rent,
  bindMail_rent,
  modifyBindMail_rent,
  modifySendMail_rent
} from "@/api/index";
import { getAccount, transfer, getGasBalance } from "@/utlis";
import { getCurrentPair } from "@/utlis/dot"
import { mapState } from "vuex"
export default {
  name: "popup_reload",
  props: {
    open: Boolean,
    isNewMail: Boolean
  },
  computed:{
    ...mapState(["isNewWallet"]),
  },
  watch: {
    open(newVal) {
      this.isOpen = newVal;
      this.form.email = "";
      this.form.dbcNum = "";
      this.form.passward = "";
      this.getGasBalance();
    }
  },
  data() {
    return {
      isOpen: this.open,
      isLoading: false,
      isSending: false,
      gas_balance: 0,
      form: {
        email: "",
        dbcNum: "",
        passward: ""
      },
      rules: {
        email: [
          {
            type: "email",
            message: this.$t("dlg_bindMail_input_email"),
            trigger: "change"
          }
        ]
      },
      wallet_address: (getAccount() && getAccount().address) || (getCurrentPair() && getCurrentPair().address)
    };
  },
  methods: {
    closed() {
      this.isOpen = false;
      this.$emit("update:open", false);
    },
    getGasBalance() {
      getGasBalance().then(res => {
        this.gas_balance = res.gas_balance;
      });
    },
    binding() {
      // const self = this
      const ac = (getAccount() || getCurrentPair());
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      if (!ac) {
        return;
      }
      if (this.form.dbcNum === "") {
        this.$message({
          showClose: true,
          message: this.$t("dbcnum_error"),
          type: "error"
        });
        return;
      }
      if (parseInt(this.form.dbcNum) >= 1) {
        this.$message({
          showClose: true,
          message: this.$t("dbcnum_error"),
          type: "error"
        });
        return;
      }

      if (!(this.isNewWallet == 'true') && this.gas_balance === 0) {
        this.$message({
          showClose: true,
          message: this.$t("zerogas"),
          type: "error"
        });
        return;
      }

      this.isLoading = true;
      transfer({
        toAddress: this.$tAddress,
        amount: this.form.dbcNum,
        passward: this.form.passward
      })
        .then(res => {
          console.log(res, 'res');
          if (res.status === 1) {
            if (this.isNewMail) {
              bindMail_rent({
                // email: this.form.email,
                wallet_address: ac.address,
                code: this.form.dbcNum,
                user_name_platform,
                language
              })
                .then(res => {
                  if (res.status === 2) {
                    this.$message({
                      showClose: true,
                      message: res.msg,
                      type: "success"
                    });
                    // 绑定成功
                    this.closed();
                    this.$emit("binding", true);
                  } else {
                    this.$message({
                      showClose: true,
                      message: res.msg,
                      type: "error"
                    });
                    // 绑定失败
                    this.$emit("fail", res.msg);
                  }
                })
                .catch(err => {
                  if (err) {
                    this.$message({
                      showClose: true,
                      message: "绑定失败",
                      type: "error"
                    });
                    this.$emit("fail", "timeout");
                  }
                })
                .finally(() => {
                  this.isLoading = false;
                });
            } else {
              modifyBindMail_rent({
                // email: this.form.email,
                wallet_address: ac.address,
                code: this.form.dbcNum,
                user_name_platform,
                language
              })
                .then(res => {
                  if (res.status === 2) {
                    this.$message({
                      showClose: true,
                      message: res.msg,
                      type: "success"
                    });
                    // 绑定成功
                    this.closed();
                    this.$emit("binding");
                  } else {
                    this.$message({
                      showClose: true,
                      message: res.msg,
                      type: "error"
                    });
                    // 绑定失败
                    this.$emit("fail", res.msg);
                  }
                })
                .catch(err => {
                  if (err) {
                    this.$message({
                      showClose: true,
                      message: this.$t("dlg_bindMail_binding_error"),
                      type: "error"
                    });
                    this.$emit("fail", "timeout");
                  }
                })
                .finally(() => {
                  this.isLoading = false;
                });
            }
          } else if (res.status === -1) {
            this.$message({
              showClose: true,
              message: this.$t("dlg_bindMail_no_dbc"),
              type: "error"
            });

            this.isLoading = false;
          } else {
            this.$message({
              showClose: true,
              message: this.$t("dlg_bindMail_voc_failure"),
              type: "error"
            });

            this.isLoading = false;
          }
        })
        .catch(err => {
          console.log(err,'err')

          this.$message({
            showClose: true,
            message: this.$t("dlg_bindMail_no_dbc"),
            type: "error"
          });

          this.isLoading = false;
        });
    },

    // this.binding(),
    // send mail
    sendVerifyMail() {
      this.isSending = true;
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      if (this.isNewMail) {
        sendMail_rent({
          email: this.form.email,
          wallet_address: this.wallet_address,
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
          .catch(err => {
            if (err) {
              console.log(err);
            }
          })
          .finally(() => {
            this.isSending = false;
          });
      } else {
        modifySendMail_rent({
          email: this.form.email,
          wallet_address: this.wallet_address,
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
          .catch(err => {
            if (err) {
              console.log(err);
            }
          })
          .finally(() => {
            this.isSending = false;
          });
      }
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
