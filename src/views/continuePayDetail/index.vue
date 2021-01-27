<template>
  <div>
    <Header
      class="header"
      v-if="this.$store.state.webtype"
      :underlineStyle="underlineStyle"
    />
    <div class="bg-box wrap1440 mb100">
      <div class="border-box" ref="boxObject">
        <div class="title">
          <h3>{{ $t("continue_pay_details") }}</h3>
        </div>

        <div v-for="item in content" class="border-content">
          <div class="tools-head">
            <div class="l-wrap">
              <!--          <span class="tools-title">{{$t('gpu.mcStatusTitle')}}：<b>{{$t('gpu.machineOnLine')}}</b></span>-->
              <span>ID:{{ item.continue_pay_order_id }}</span>

              <span
                v-if="
                  item.pay_success &&
                  item.rest_dbc_count > 0 &&
                  !item.main_order_is_over
                "
                class="tools-title"
                >&nbsp; &nbsp; &nbsp; &nbsp;{{ $t("gpu.remainingTime") }}：{{
                  $secToDate(item.rest_time_rent * 60, "DHM")
                }}</span
              >
            </div>
            <div class="r-wrap">
              <span v-if="item.order_is_cancer">{{
                $t("my_machine_order_cancer")
              }}</span>
              <span
                v-else-if="item.rest_dbc_count === 0 || item.main_order_is_over"
                >{{ $t("continue_pay_order_is_over") }}</span
              >
              <span v-else-if="item.pay_success">{{
                $t("continue_pay_success")
              }}</span>
              <span v-else-if="item.pay_error && !item.return_dbc">{{
                $t("my_machine_order_pay_error")
              }}</span>
              <span v-else-if="item.pay_error && item.return_dbc">{{
                $t("my_machine_order_return_dbc")
              }}</span>
            </div>
          </div>
          <div class="pay-wrap">
            <div>
              <span class="td"
                >{{ $t("continue_pay_time") }}：{{
                  parseInt(item.rent_time_length / 60)
                }}{{ $t("my_machine_hour") }}{{ item.rent_time_length % 60
                }}{{ $t("my_machine_min") }}</span
              >
              <span class="td"
                >{{ $t("my_machine_beused_time") }}：{{
                  parseInt(item.real_rent_time / 60)
                }}{{ $t("my_machine_hour") }}{{ item.real_rent_time % 60
                }}{{ $t("my_machine_min") }}</span
              >
              <span class="td"
                >{{ $t("gpu.payDBCs") }}：{{ item.dbc_total_count }} DBC</span
              >
            </div>
            <div>
              <span class="td"
                >{{ $t("gpu.actualPrice") }}：{{
                  item.dbc_real_need_count
                }}
                DBC</span
              >
              <span class="td"
                >{{ $t("gpu.gpuBilling") }}：$ {{ item.gpu_price_dollar }}/{{
                  $t("my_machine_hour")
                }}</span
              >
              <span class="td"
                >{{ $t("gpu.payPrice") }}：$
                {{ item.dbc_price.toFixed(4) }}</span
              >
            </div>
          </div>
          <div class="tools-head">
            <div class="l-wrap">
              <span v-if="item.vocing === true">{{
                $t("myMachine_is_pay_vocing")
              }}</span>

              <span
                class="cRed"
                v-else-if="
                  isPaying &&
                  !item.order_is_cancer &&
                  !item.pay_success &&
                  !item.pay_error
                "
                >{{ transferTips }}</span
              >
              <span class="cRed" v-else-if="local_pay_error && !isPaying">{{
                $t("myMachine_is_transfer_error")
              }}</span>
              <span
                class="cRed"
                v-else-if="
                  item.vocing_pay &&
                  !item.order_is_cancer &&
                  !item.pay_success &&
                  !item.pay_error
                "
                >{{ $t("my_machine_order_vocing_pay") }}</span
              >
              <span
                v-else-if="
                  item.pay_success === false &&
                  item.order_is_cancer === false &&
                  item.pay_error === false
                "
                >{{ $t("myMachine_confirm_pay_tip") }}</span
              >
            </div>
            <div
              v-if="
                item.pay_success === false && item.order_is_cancer === false
              "
              class="r-wrap"
            >
              <template>
                <el-button
                  v-if="item.pay_error === false"
                  :disabled="item.vocing_pay"
                  plain
                  :loading="isPaying"
                  class="tool-btn"
                  size="mini"
                  @click="payOrder(item)"
                  >{{ $t("myMachine_confirm_pay") }}</el-button
                >
                <el-button
                  v-if="!item.vocing_pay && item.pay_error === false"
                  :disabled="isPaying"
                  class="tool-btn"
                  size="mini"
                  plain
                  @click="cancelOrder(item)"
                  >{{ $t("myMachine_concer_order") }}</el-button
                >
              </template>
              <el-button
                v-if="
                  item.return_dbc === false &&
                  item.pay_error === true &&
                  !item.main_order_is_over
                "
                class="tool-btn"
                style="width: 86px"
                plain
                size="mini"
                @click="openReturnDbc(item)"
                >{{ $t("myMachine_return_dbc") }}</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <dlg-return-dbc-continue
        :open.sync="dlgReturnDbc_open"
        :item="curItem"
        @success="returnSuccess"
      ></dlg-return-dbc-continue>
    </div>
    <Footer v-if="this.$store.state.webtype" />
  </div>
</template>

<script>
import {
  get_continue_pay_order_list,
  get_dbchain_address,
  continue_pay_voc_pay,
  continue_pay_cancer_order_code,
  continue_pay_cancer_order,
  continue_pay_return_dbc,
  continue_pay_return_dbc_code,
  create_alipay_order_congtu,
  get_gpu_renewal_order_alipay_pay_status,
  get_gpu_renewal_order_dbc_res_code,
  get_cpu_renewal_order_alipay_pay_status,
  get_cpu_renewal_order_dbc_res_code,
} from "@/api";
import {
  transfer,
  getCongtuGpuRenewalTradeNoPrefix,
  getCongtuCpuRenewalTradeNoPrefix,
} from "@/utlis";
import DlgReturnDbcContinue from "@/components/machine/dlg_returnDbcContinue";
import Header from "@/congTuCloud/components/header/SubHeader.vue";
import Footer from "@/congTuCloud/components/footer/Footer.vue";
export default {
  name: "continuePayDetail",
  components: {
    DlgReturnDbcContinue,
    Header,
    Footer,
  },
  data() {
    return {
      rateValue: 0,
      order_id: undefined, //: this.$route.query.order_id,
      order_is_over: undefined, //: this.$route.query.order_is_over,
      order_id_prefix: undefined, //: this.$route.query.order_id_prefix,
      tradeNoPre: undefined, //: this.$route.query.tradeNoPre,
      placeOrderData: undefined,
      content: [],
      isPaying: false,
      local_pay_error: false,
      isPocing: false,
      queryOrderListSi: undefined,
      dlgReturnDbc_open: false,
      si: undefined,
      curItem: undefined,
      underlineStyle: {
        width: "65px",
        left: "218px",
      },
    };
  },
  created() {
    this.queryContinuePayDetail();
    // this.order_is_over = this.$route.query.order_is_over;
    this.queryOrderListSi = setInterval(() => {
      if (this.isPaying === false) {
        this.queryContinuePayDetail();
      }
    }, 5000);
  },
  deactivated() {
    if (this.queryOrderListSi) {
      clearInterval(this.queryOrderListSi);
    }
    if (this.si) {
      clearInterval(this.si);
    }
  },
  mounted() {
    if (this.$t("website_name") === "congTuCloud") {
      this.$refs.boxObject.style.marginBottom = "0px";
      this.$refs.boxObject.style.minHeight = "100vh";
    }
  },
  computed: {
    //   rateList() {
    //     content.map(item => {
    //      return {};
    //    });
    //   }
    transferTips() {
      return this.$t("website_name") === "congTuCloud"
        ? this.$t("myMachine_is_dbc_transfering_congtu_cloud")
        : this.$t("myMachine_is_dbc_transfering");
    },
  },
  methods: {
    returnSuccess() {},
    // 退币
    openReturnDbc(item) {
      this.curItem = item;
      this.dlgReturnDbc_open = true;
    },
    cancelOrder(item) {
      continue_pay_cancer_order_code({
        continue_pay_order_id: item.continue_pay_order_id,
        user_name_platform: this.$t("website_name"),
        language: this.$i18n.locale,
      })
        .then((res) => {
          if (res.status === 1) {
            this.$prompt(
              this.$t("myMachine_code_send"),
              this.$t("myMachine_cancer_order"),
              {
                confirmButtonText: this.$t("myMachine_confirm"),
                cancelButtonText: this.$t("myMachine_cancer"),
              }
            )
              .then(({ value }) => {
                return continue_pay_cancer_order({
                  continue_pay_order_id: item.continue_pay_order_id,
                  cancer_code: value,
                  user_name_platform: this.$t("website_name"),
                  language: this.$i18n.locale,
                });
              })
              .then((res) => {
                if (res.status === 1) {
                  this.$message({
                    showClose: true,
                    message: res.msg,
                    type: "success",
                  });
                  this.queryContinuePayDetail();
                } else {
                  this.$message({
                    showClose: true,
                    message: res.msg,
                    type: "error",
                  });
                }
              })
              .catch((err) => {
                if (err) {
                  console.log(err);
                }
              });
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
            return Promise.reject();
          }
        })
        .then((res) => {
          if (res.status === 1) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success",
            });
          }
        })
        .finally(() => {});
    },
    // pay
    payOrder(item) {
      // 聪图模式下
      if (this.$t("website_name") === "congTuCloud") {
        clearInterval(this.si);

        const user_name_platform = this.$t("website_name");
        const language = this.$i18n.locale;
        console.log("payOrder---");
        console.log(item);
        get_dbchain_address({
          order_id: item.order_id,
          continue_pay_order_id: item.continue_pay_order_id,
          order_id_prefix: this.$route.query.order_id_prefix,
          user_name_platform,
          language,
        }).then((res) => {
          if (res.status === 1 && res.content) {
            const amount = item.dbc_total_count + item.code * 1;
            this.$confirm(
              this.$t("myMachine_no_double_pay"),
              this.$t("myMachine_please_confirm_pay"),
              {
                confirmButtonText: this.$t("myMachine_confirm"),
                cancelButtonText: this.$t("myMachine_cancer"),
              }
            ).then(({ value }) => {
              console.log("create_alipay_order_congtu pre ---");
              console.log(item);
              this.isPaying = true;
              this.local_pay_error = false;
              create_alipay_order_congtu({
                response: {},
                orderData: item.order_id,
                continue_pay_order_id: item.continue_pay_order_id,
                dbcCode: item.code,
                tradeNoPre: this.$route.query.tradeNoPre,
              })
                .then((res) => {
                  console.log("-=-=-=-=-create_aliPay_order_congtu==========");
                  console.log(res);
                  let alipay = window.open();
                  alipay.document.body.innerHTML = res.slice(
                    0,
                    res.search("<script>")
                  );
                  alipay.document.body.getElementsByTagName("form")[0].submit();
                  // todo 定时 从后台数据库获取支付宝支付状态（包含dbc转账参数）
                  // todo 如果支付成功，返回参数， 为pay（）预备参数:txid
                  this.getAlipayStatusTimer = setInterval(() => {
                    if (
                      this.$route.query.tradeNoPre ===
                      getCongtuGpuRenewalTradeNoPrefix()
                    ) {
                      get_gpu_renewal_order_alipay_pay_status({
                        order_id: item.order_id,
                        continue_pay_order_id: item.continue_pay_order_id,
                        language,
                      }).then((res) => {
                        console.log(
                          "get_gpu_renewal_order_alipay_pay_status-------"
                        );
                        console.log(res);
                        if (res.content === "ok") {
                          clearInterval(this.getAlipayStatusTimer);
                          this.getDbcResCodeTimer = setInterval(() => {
                            get_gpu_renewal_order_dbc_res_code({
                              order_id: item.order_id,
                              continue_pay_order_id: item.continue_pay_order_id,
                              language,
                            }).then((res) => {
                              console.log(
                                "get_gpu_renewal_order_dbc_res_code-------"
                              );
                              console.log(res);
                              if (
                                res.content != null ||
                                res.content != undefined ||
                                res.content != ""
                              ) {
                                clearInterval(this.getDbcResCodeTimer);
                                const txid = res.content;

                                // pay after
                                this.isPaying = false;
                                item.vocing_pay = true;
                                const user_name_platform = this.$t(
                                  "website_name"
                                );
                                const language = this.$i18n.locale;
                                // 支付后确认
                                continue_pay_voc_pay({
                                  continue_pay_order_id:
                                    item.continue_pay_order_id,
                                  dbc_hash: txid,
                                  user_name_platform,
                                  language,
                                }).then((res) => {
                                  item.vocing_pay = true;
                                  this.queryContinuePayDetail();
                                  if (res.status === 1) {
                                    clearInterval(this.si);

                                    item.vocing_pay = false;
                                  }
                                });
                                //item.vocing_pay = true;
                                // this.queryContinuePayDetail();
                                //item.vocing_pay = true;
                                this.si = setInterval(() => {
                                  return continue_pay_voc_pay({
                                    continue_pay_order_id:
                                      item.continue_pay_order_id,
                                    dbc_hash: txid,
                                    user_name_platform,
                                    language,
                                  })
                                    .then((res) => {
                                      item.vocing_pay = true;
                                      this.queryContinuePayDetail();
                                      if (res.status === 1) {
                                        clearInterval(this.si);

                                        item.vocing_pay = false;
                                      }
                                    })
                                    .catch((err) => {
                                      if (err && err.status === -1) {
                                        console.log(err.msg);
                                        this.$message({
                                          showClose: true,
                                          message: err.msg,
                                          type: "error",
                                        });
                                        clearInterval(this.si);
                                      } else if (err && err.status === -2) {
                                        console.log(err.msg);
                                        // clearInterval(this.si)
                                      } else if (err) {
                                        console.log("其他报错");
                                        console.log(err);
                                        clearInterval(this.si);
                                      }
                                    });
                                }, 5000);
                              } else {
                                this.isPaying = false;

                                clearInterval(this.si);
                                this.local_pay_error = true;
                                console.log("转账失败");
                              }
                            });
                          }, 1000);
                        }
                      });
                    } else if (
                      this.$route.query.tradeNoPre ===
                      getCongtuCpuRenewalTradeNoPrefix()
                    ) {
                      get_cpu_renewal_order_alipay_pay_status({
                        order_id: item.order_id,
                        continue_pay_order_id: item.continue_pay_order_id,
                        language,
                      }).then((res) => {
                        console.log(
                          "get_cpu_renewal_order_alipay_pay_status-------"
                        );
                        console.log(res);
                        if (res.content === "ok") {
                          clearInterval(this.getAlipayStatusTimer);
                          this.getDbcResCodeTimer = setInterval(() => {
                            get_cpu_renewal_order_dbc_res_code({
                              order_id: item.order_id,
                              continue_pay_order_id: item.continue_pay_order_id,
                              language,
                            }).then((res) => {
                              console.log(
                                "get_cpu_renewal_order_dbc_res_code-------"
                              );
                              console.log(res);
                              if (
                                res.content != null ||
                                res.content != undefined ||
                                res.content != ""
                              ) {
                                clearInterval(this.getDbcResCodeTimer);
                                const txid = res.content;

                                // pay after
                                this.isPaying = false;
                                item.vocing_pay = true;
                                const user_name_platform = this.$t(
                                  "website_name"
                                );
                                const language = this.$i18n.locale;
                                // 支付后确认
                                continue_pay_voc_pay({
                                  continue_pay_order_id:
                                    item.continue_pay_order_id,
                                  dbc_hash: txid,
                                  user_name_platform,
                                  language,
                                }).then((res) => {
                                  item.vocing_pay = true;
                                  this.queryContinuePayDetail();
                                  if (res.status === 1) {
                                    clearInterval(this.si);

                                    item.vocing_pay = false;
                                  }
                                });
                                //item.vocing_pay = true;
                                // this.queryContinuePayDetail();
                                //item.vocing_pay = true;
                                this.si = setInterval(() => {
                                  return continue_pay_voc_pay({
                                    continue_pay_order_id:
                                      item.continue_pay_order_id,
                                    dbc_hash: txid,
                                    user_name_platform,
                                    language,
                                  })
                                    .then((res) => {
                                      item.vocing_pay = true;
                                      this.queryContinuePayDetail();
                                      if (res.status === 1) {
                                        clearInterval(this.si);

                                        item.vocing_pay = false;
                                      }
                                    })
                                    .catch((err) => {
                                      if (err && err.status === -1) {
                                        console.log(err.msg);
                                        this.$message({
                                          showClose: true,
                                          message: err.msg,
                                          type: "error",
                                        });
                                        clearInterval(this.si);
                                      } else if (err && err.status === -2) {
                                        console.log(err.msg);
                                        // clearInterval(this.si)
                                      } else if (err) {
                                        console.log("其他报错");
                                        console.log(err);
                                        clearInterval(this.si);
                                      }
                                    });
                                }, 5000);
                              } else {
                                this.isPaying = false;

                                clearInterval(this.si);
                                this.local_pay_error = true;
                                console.log("转账失败");
                              }
                            });
                          }, 1000);
                        }
                      });
                    }
                  }, 1000);
                })
                .catch((err) => {
                  if (err) {
                    console.log(err);
                  }
                })
                .finally(() => {
                  console.log("一定会执行的语句");
                });
            });
          } else {
            return Promise.reject({
              status: -1,
              msg: "出现未知错误，无法续租",
            });
          }
        });
      } else {
        clearInterval(this.si);

        const user_name_platform = this.$t("website_name");
        const language = this.$i18n.locale;
        get_dbchain_address({
          order_id: item.order_id,
          user_name_platform,
          language,
        }).then((res) => {
          if (res.status === 1 && res.content) {
            const amount = item.dbc_total_count + item.code * 1;
            this.$confirm(
              this.$t("myMachine_no_double_pay"),
              this.$t("myMachine_please_confirm_pay"),
              {
                confirmButtonText: this.$t("myMachine_confirm"),
                cancelButtonText: this.$t("myMachine_cancer"),
              }
            )
              .then(({ value }) => {
                this.isPaying = true;
                this.local_pay_error = false;
                return transfer({
                  toAddress: res.content,
                  amount,
                });
              })
              .then((res) => {
                if (res.status === 1) {
                  console.log("转账成功");
                  const txid = res.response.txid;

                  // pay after
                  this.isPaying = false;
                  item.vocing_pay = true;
                  const user_name_platform = this.$t("website_name");
                  const language = this.$i18n.locale;
                  // 支付后确认
                  continue_pay_voc_pay({
                    continue_pay_order_id: item.continue_pay_order_id,
                    dbc_hash: txid,
                    user_name_platform,
                    language,
                  }).then((res) => {
                    item.vocing_pay = true;
                    this.queryContinuePayDetail();
                    if (res.status === 1) {
                      clearInterval(this.si);

                      item.vocing_pay = false;
                    }
                  });
                  //item.vocing_pay = true;
                  // this.queryContinuePayDetail();
                  //item.vocing_pay = true;
                  this.si = setInterval(() => {
                    return continue_pay_voc_pay({
                      continue_pay_order_id: item.continue_pay_order_id,
                      dbc_hash: txid,
                      user_name_platform,
                      language,
                    })
                      .then((res) => {
                        item.vocing_pay = true;
                        this.queryContinuePayDetail();
                        if (res.status === 1) {
                          clearInterval(this.si);

                          item.vocing_pay = false;
                        }
                      })
                      .catch((err) => {
                        if (err && err.status === -1) {
                          console.log(err.msg);
                          this.$message({
                            showClose: true,
                            message: err.msg,
                            type: "error",
                          });
                          clearInterval(this.si);
                        } else if (err && err.status === -2) {
                          console.log(err.msg);
                          // clearInterval(this.si)
                        } else if (err) {
                          console.log("其他报错");
                          console.log(err);
                          clearInterval(this.si);
                        }
                      });
                  }, 5000);
                } else {
                  this.isPaying = false;

                  clearInterval(this.si);
                  this.local_pay_error = true;
                  console.log("转账失败");
                }
              });
          } else {
            return Promise.reject({
              status: -1,
              msg: "出现未知错误，无法续租",
            });
          }
        });
        // pay

        //  }, 5000);
      }
    },
    isShowRendSuccessMsg(milli_rent_success_time) {
      const minutes =
        (new Date().getTime() - milli_rent_success_time) / 1000 / 60;
      return minutes < 10;
    },
    queryContinuePayDetail() {
      this.order_is_over = this.$route.query.order_is_over;
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      get_continue_pay_order_list({
        order_id: this.$route.query.order_id,
        user_name_platform,
        language,
      }).then((res) => {
        if (res.status === 1) {
          this.content = res.content;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 30px;
}
.rate-wrap {
  label {
    vertical-align: top;
  }

  span {
    display: inline-block;
    width: 200px;
    vertical-align: top;
    text-align: left;
  }
}

.pay-wrap {
  padding: 10px 20px;
  border-top: 1px solid #e1e6ec;
  font-size: 14px;
  line-height: 28px;
  color: #666;
  background-color: #f6f9fc;

  .td {
    display: inline-block;
    width: 33.3%;
  }
}
.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;

  h3 {
    margin: 0;
    line-height: 20px;
    font-size: 20px;
    color: #47495a;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 16px;

    a {
      color: $primaryColor;
    }
  }
}
.border-content {
  border: 1px solid #979797;
  margin-bottom: 20px;
}

.rate-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tools-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  &.bd {
    border-bottom: 1px solid #e1e6ec;
  }

  .tools-title {
    font-size: 16px;
    color: #050d68;

    &.small {
      font-size: 14px;
      color: #333;
    }
  }

  .tool-btn {
    font-size: 14px;

    &.blue {
      border-color: $primaryColor;
      color: $primaryColor;
    }
  }

  .cGray {
    padding-left: 44px;
  }
}
</style>
