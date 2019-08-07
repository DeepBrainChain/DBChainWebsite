<template>
  <div>
    <div class="title">
      <span>{{$t('gpu.myMachineTitle')}}：{{res_body.content.length}} {{$t('gpu.pcs')}}</span>
      <div v-if="!isBinding && bindMail" class="binding">
        <span class="bindingInfo">绑定的邮箱：{{bindMail}}</span>
        <el-button
          class="ml10"
          size="mini"
          plain
          @click="openDlgMail(false)"
        >{{$t('gpu.modifyMail')}}</el-button>
      </div>
      <div v-else-if="!isBinding" class="bind">
        <el-button size="small" plain @click="openDlgMail(true)">{{$t('gpu.bindMail')}}</el-button>
        <span class="bindInfo ml10" v-html="$t('gpu.bindMailInfo')"></span>
      </div>
      <div v-else-if="isBinding">
        <span v-if="isBinding" class="bindInfo">正在验证中,大概需要几分钟</span>
      </div>
    </div>
    <div v-for="(item, index) in res_body.content" class="border-content">
      <div class="tools-head">
        <div class="l-wrap">
          <!--          <span class="tools-title">{{$t('gpu.mcStatusTitle')}}：<b>{{$t('gpu.machineOnLine')}}</b></span>-->
          <span
            class="tools-title"
          >{{$t('gpu.remainingTime')}}：{{$hourToDT(item.orderData.rest_time_rent/60)}}</span>
        </div>
        <div class="r-wrap">
          <span v-if="item.rent_success">正在使用中</span>
          <span
            v-if="Math.floor((new Date().getTime() - item.orderData.milli_create_order_time)/60000) <= 15"
          >等待支付</span>
          <span v-else-if="item.orderData.order_is_cancer">未支付</span>
          <span v-if="item.orderData.order_is_cancer === false" class="ml10">
            剩余支付时间：{{
            15 - Math.floor((new Date().getTime() - item.orderData.milli_create_order_time)/60000)
            }}分钟
          </span>
        </div>
      </div>
      <div class="pay-wrap">
        <div class="rate-head">
          <div class="flex right vCenter">
            <el-rate v-model="rateValue"></el-rate>
            <span>7.7{{$t('scores')}}</span>
          </div>
        </div>
        <div>
          <span class="td">{{$t('gpu.payDBCs')}}：{{item.orderData.dbc_total_count}}</span>
          <span class="td">已使用时间：{{item.orderData.rent_time_length/60}} h</span>
        </div>
        <div>
          <span class="td">{{$t('gpu.actualPrice')}}：{{item.orderData.dbc_real_need_count}}DBC</span>
          <span class="td">{{$t('gpu.gpuBilling')}}：$ {{item.orderData.gpu_price_dollar}}/hr</span>
        </div>
        <div>
          <span
            class="td"
          >{{$t('gpu.currentRemaining')}}：{{item.orderData.dbc_total_count - item.orderData.dbc_real_need_count}} DBC</span>
          <span class="td">{{$t('gpu.payPrice')}}：$ {{item.orderData.dbc_price.toFixed(4)}}</span>
        </div>
        <!--        <div>-->
        <!--          <span class="td">{{$t('gpu.gpuRemainTime')}}（DBC）：422</span>-->
        <!--          <span class="td">{{$t('gpu.storeBilling')}}：45 DBC/hr</span>-->
        <!--          <span class="td">{{$t('gpu.gpuCost')}}：{{item.orderData.dbc_price/item.orderData.gpu_price_dollar}} DBC</span>-->
        <!--          <span class="td">{{$t('gpu.storeCost')}}：{{item.orderData.rent_time_length}}</span>-->
        <!--          <span class="td">{{$t('gpu.storeBilling')}}（DBC）：45/hr</span>-->
        <!--          <span class="td">{{$t('gpu.storeRemainTime')}}（DBC）：422</span>-->
        <!--        </div>-->
      </div>
      <div class="status-wrap">
        <div class="flex status-title">
          <span class="cPrimaryColor">
            ID :
            <a class="is-link" href="javascript:" @click="pushDetail">{{item.mcData.machine_id}}</a>
          </span>
          <span class="pl100">$ {{item.mcData.gpu_price_dollar * item.mcData.gpu_count}}/hr</span>
        </div>
        <div class="flex">
          <div class="td">
            <div class="bold">GPU数量</div>
            <div class="cPrimaryColor">{{item.mcData.gpu_count}}</div>
          </div>
          <div class="td">
            <div class="bold">GPU型号</div>
            <div class="cPrimaryColor">{{item.mcData.gpu_type}}</div>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <div>闲置gpu次数</div>
            <div class="cPrimaryColor">{{item.mcData.gpu_count - item.mcData.gpu_be_used}}</div>
          </div>
          <div class="td">
            <div>最长可租用时间</div>
            <div class="cPrimaryColor">{{item.mcData.length_of_available_time}}h</div>
          </div>
          <div class="td">
            <div>累计出租时长</div>
            <div class="cPrimaryColor">{{item.mcData.total_rent_count}}h</div>
          </div>
          <div class="td">
            <div>出租总次数</div>
            <div class="cPrimaryColor">{{item.mcData.total_time_be_used}}</div>
          </div>
          <div class="td">
            <div>中断次数</div>
            <div class="cPrimaryColor">{{item.mcData.error_rent_count}}</div>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <div>Tensor Core</div>
            <div class="cPrimaryColor">{{item.mcData.tensor_cores}}</div>
          </div>
          <div class="td">
            <div>CUDA版本号</div>
            <div class="cPrimaryColor">{{item.mcData.cuda_core}}</div>
          </div>
          <div class="td">
            <div>硬盘</div>
            <div class="cPrimaryColor">{{item.mcData.disk_type}}</div>
          </div>
          <div class="td">
            <div>CPU型号</div>
            <div class="cPrimaryColor">{{item.mcData.cpu_type}}</div>
          </div>
          <div class="td">
            <div class="bold">机器所在国家</div>
            <div class="cPrimaryColor">中国</div>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <div>半精度浮点运算数</div>
            <div class="cPrimaryColor">{{item.mcData.half_precision_tflops}}</div>
          </div>
          <div class="td">
            <div>GPU显存</div>
            <div class="cPrimaryColor">{{item.mcData.gpu_ram_size}}</div>
          </div>
          <div class="td">
            <div>硬盘带宽</div>
            <div class="cPrimaryColor">{{item.mcData.disk_bandwidth}}</div>
          </div>
          <div class="td">
            <div>内核数</div>
            <div class="cPrimaryColor">{{item.mcData.cpu_numbers}}</div>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <div>单精度浮点运算数</div>
            <div class="cPrimaryColor">{{item.mcData.single_precision_tflops}}</div>
          </div>
          <div class="td">
            <div>GPU显存带宽</div>
            <div class="cPrimaryColor">{{item.mcData.gpu_ram_bandwidth}}</div>
          </div>
          <div class="td">
            <div>上行带宽</div>
            <div class="cPrimaryColor">{{item.mcData.inet_up}}</div>
          </div>
          <div class="td">
            <div>内存数</div>
            <div class="cPrimaryColor">{{item.mcData.ram_size}}</div>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <div>双精度浮点运算数</div>
            <div class="cPrimaryColor">{{item.mcData.duoble_precision_tflops}}</div>
          </div>
          <div class="td">
            <div>总线传输速度</div>
            <div class="cPrimaryColor">{{item.mcData.pcie_bandwidth}}</div>
          </div>
          <div class="td">
            <div>下行带宽</div>
            <div class="cPrimaryColor">{{item.mcData.inet_down}}</div>
          </div>
          <div class="td">
            <div>操作系统</div>
            <div class="cPrimaryColor">{{item.mcData.os}}</div>
          </div>
          <div class="td">
            <div>DBC版本</div>
            <div class="cPrimaryColor">{{item.mcData.dbc_version}}</div>
          </div>
        </div>
      </div>
      <div class="tools-head bd">
        <div class="l-wrap">
          <span
            class="tools-title small"
          >{{$t('gpu.machineLoginInfo')}}：ssh -p 20049 root@116.85.24.172，{{$t('password')}}：xxxxx</span>
        </div>
      </div>
      <div class="tools-head">
        <div class="l-wrap">
          <span v-if="item.orderData.order_is_over && item.orderData.order_isnormal_over">订单中断</span>
          <span v-else-if="item.orderData.order_is_over && item.orderData.rder_isnormal_over">订单中断</span>
          <span v-else-if="item.orderData.order_is_cancer">订单取消</span>
          <span v-else-if="item.orderData.rent_success">正在使用中</span>
          <span
            v-else-if="item.orderData.ontainer_is_exis && item.orderData.rent_success===fasle"
          >支付验证中</span>
          <span v-else-if="item.orderData.pay_error && item.orderData.is_return_dbc===false">支付验证失败</span>
          <span v-else-if="item.orderData.pay_error && item.orderData.is_return_dbc">退币成功</span>
        </div>
        <div v-if="item.orderData.order_is_cancer === false" class="r-wrap">
          <el-button
            v-if="item.orderData.order_is_over"
            plain
            class="tool-btn"
            size="mini"
            style="width: 86px"
            @click="openRateDlg(item)"
          >{{$t('gpu.rate')}}</el-button>
          <template v-else-if="item.orderData.rent_success">
            <!--<el-button plain style="width: 86px" class="tool-btn" size="mini"
                       @click="dlgReload_open = true">
              {{$t('gpu.reload')}}
            </el-button>-->
            <el-button
              plain
              class="tool-btn"
              style="width: 86px"
              size="mini"
              @click="stopRent(item)"
            >{{$t('unsubscribe')}}</el-button>
          </template>
          <template v-else-if="item.orderData.rent_success === false">
            <el-button
              :disabled="item.orderData.container_is_exist && item.orderData.rent_success === false"
              plain
              :loading="isPaying"
              class="tool-btn"
              size="mini"
              @click="payOrder(item)"
            >确认支付</el-button>
            <el-button
              v-if="!(item.orderData.container_is_exist && item.orderData.rent_success === false)"
              :loading="isPaying"
              class="tool-btn"
              size="mini"
              plain
              @click="cancelOrder(item)"
            >取消订单</el-button>
          </template>
          <el-button
            v-else-if="item.orderData.is_return_dbc && item.orderData.pay_error"
            class="tool-btn"
            style="width: 86px"
            plain
            size="mini"
            @click="dlgUnsubscribe_open=true"
          >退币</el-button>
        </div>
      </div>
    </div>
    <!--    reload-dlg-->
    <dlg-reload :open.sync="dlgReload_open"></dlg-reload>
    <!--    increaseHD-dlg-->
    <dlg-hd :open.sync="dlgHD_open"></dlg-hd>
    <!--    bindMail-dlg-->
    <dlg-mail
      :open.sync="dlgMail_open"
      :is-new-mail="isNewMail"
      @binding="binding"
      @fail="bindFail"
    ></dlg-mail>
    <!--    Unsubscribe-->
    <dlg-unsubscribe :item="curItem" :open.sync="dlgUnsubscribe_open" @success="stopRentSuccess"></dlg-unsubscribe>
    <!--    rate-->
    <dlg-rate :open.sync="dlgRate_open" :isEdit="isRateEdit" :item="curItem" @success="successRate"></dlg-rate>
  </div>
</template>

<script>
import DlgReload from "@/components/machine/dlg_reload";
import DlgHd from "@/components/machine/dlg_increaseHD";
import DlgMail from "@/components/machine/dlg_bindMail";
import DlgUnsubscribe from "@/components/machine/dlg_unsubscribe";
import DlgRate from "@/components/machine/dlg_rate";
import {
  queryBindMail_rent,
  query_machine_by_wallet,
  get_all_order,
  can_rent_this_machine,
  pay,
  get_cancer_code,
  cancer_order,
  binding_is_ok,
  binding_is_ok_modify,
  get_stop_code,
  stop
} from "@/api";
import { getAccount, transfer } from "@/utlis";

export default {
  name: "myMachine",
  components: {
    DlgReload,
    DlgHd,
    DlgMail,
    DlgUnsubscribe,
    DlgRate
  },
  data() {
    return {
      rateValue: undefined,
      dlgReload_open: false,
      dlgHD_open: false,
      dlgMail_open: false,
      dlgUnsubscribe_open: false,
      dlgRate_open: false,
      isNewMail: false,
      isBinding: false,
      isBinded: false,
      bindMail: "",
      res_body: {
        content: []
      },
      isPaying: false,
      curItem: undefined,
      isRateEdit: false
    };
  },
  created() {
    // this.binding(isNewMail);
    this.queryMail();
    this.queryOrderList();
  },
  methods: {
    // pay
    payOrder(item) {
      this.isPaying = true;
      const si = setInterval(() => {
        can_rent_this_machine({
          order_id: item.orderData.order_id
        })
          .then(res => {
            if (res.status === 1) {
              this.$message({
                showClose: true,
                message: res.msg,
                type: "success"
              });
              const amount =
                item.orderData.dbc_total_count + item.orderData.code * 1;
              // console.log(amount)
              // console.log(res.content)
              return transfer({
                toAddress: res.content,
                amount
              });
            } else if (res.status === 2) {
              this.$message({
                showClose: true,
                message: res.msg,
                type: "info"
              });
            } else {
              this.$message({
                showClose: true,
                message: res.msg,
                type: "error"
              });
              clearInterval(si);
              this.isPaying = false;
            }
          })
          .then(res => {
            if (res.response.result) {
              const txid = res.response.txid;
              this.isPaying = false;
              clearInterval(si);
              return pay({
                order_id: item.orderData.order_id,
                dbc_hash: txid
              });
            } else {
              this.$message({
                showClose: true,
                message: "支付失败",
                type: "error"
              });
              this.isPaying = false;
              clearInterval(si);
              return Promise.reject("pay fail");
            }
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
            this.isPaying = false;
            this.queryOrderList();
          });
      }, 5000);
    },
    // cancel
    cancelOrder(item) {
      get_cancer_code({
        order_id: item.orderData.order_id
      })
        .then(res => {
          if (res.status === 1) {
            this.$prompt("验证码已发送至您的邮箱，请填写验证码", "取消订单", {
              confirmButtonText: "确定",
              cancelButtonText: "取消"
            })
              .then(({ value }) => {
                return cancer_order({
                  order_id: item.orderData.order_id,
                  cancer_code: value
                });
              })
              .then(res => {
                if (res.status === 1) {
                  this.$message({
                    showClose: true,
                    message: res.msg,
                    type: "success"
                  });
                  this.queryOrderList();
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
              });
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
            return Promise.reject();
          }
        })
        .then(res => {
          if (res.status === 1) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success"
            });
          }
        })
        .finally(() => {});
    },
    // get Order List
    queryOrderList() {
      if (!getAccount()) {
        this.$router.push("/openWallet");
        return;
      }
      const wallet_address_user = getAccount().address;
      const promiseList = [
        query_machine_by_wallet({
          wallet_address_user
        }),
        get_all_order({
          wallet_address_user
        })
      ];
      Promise.all(promiseList)
        .then(([res_1, res_2]) => {
          this.res_body.content = res_2.content.map(item => {
            const mcItem = res_1.content.find(
              mc => item.machine_id === mc.machine_id
            );
            return {
              orderData: item,
              mcData: mcItem
            };
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    pushDetail() {
      this.$router.push("/machineDetail");
    },
    openDlgMail(isNewMail) {
      this.isNewMail = isNewMail;
      this.dlgMail_open = true;
    },
    //
    queryMail() {
      const address = getAccount().address;

      queryBindMail_rent({
        wallet_address: address
      }).then(res => {
        if (res.status === 1) {
          this.bindMail = res.content;
        } else {
          binding_is_ok({
            wallet_address: address
          }).then(ren => {
            if (ren.status === 2) {
              this.isBinding = true;
            }
          });

          binding_is_ok_modify({
            wallet_address: address
          }).then(ren => {
            if (ren.status === 2) {
              this.isBinding = true;
            }
          });
        }
      });
    },
    binding(isNewMail) {
      this.isBinding = true;
      let binding = true;
      const si = setInterval(async () => {
        if (binding) {
          if (isNewMail) {
            binding = false;
            const res = await binding_is_ok({
              wallet_address: getAccount().address
            });
            if (res.status === 1) {
              clearInterval(si);
              this.bindSuccess();
            }
          } else {
            binding = false;
            const res = await binding_is_ok_modify({
              wallet_address: getAccount().address
            });
            if (res.status === 1) {
              clearInterval(si);
              this.bindSuccess();
            }
          }
        }
        binding = true;
      }, 10000);
    },
    // bind fail
    bindFail() {
      this.isBinding = false;
    },
    // bind success
    bindSuccess() {
      this.isBinding = false;
      this.queryMail();
    },
    // stop rent
    stopRent(item) {
      this.dlgUnsubscribe_open = true;
      this.curItem = item;
    },
    stopRentSuccess() {
      this.queryOrderList();
    },
    openRateDlg(item) {
      this.curItem = item
      this.dlgRate_open = true
    },
    successRate() {
      this.queryOrderList()
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";

.title {
  display: flex;
  justify-content: space-between;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 20px;
  line-height: 20px;

  .bindInfo {
    display: inline-block;
    font-size: 12px;
    min-height: 40px;
    color: $textColor_def;
    vertical-align: middle;
  }

  .bindingInfo {
    font-size: 12px;
    color: $textColor_def;
    vertical-align: middle;
  }

  .iconwenhao {
    color: $primaryColor;
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

.status-wrap {
  padding: 15px 20px 12px;
  border-top: 1px solid #e1e6ec;
  border-bottom: 1px solid #e1e6ec;
  color: #666;
  font-size: 14px;

  .status-title {
    padding-bottom: 17px;
  }

  .flex {
    display: flex;
    padding: 5px 0;

    .td {
      width: 20%;
      line-height: 24px;

      .bold {
        font-weight: 700;
      }

      .upSpeed,
      .downSpeed {
        display: inline-block;
        height: 16px;
        line-height: 16px;
        margin-right: 8px;
        border: 1px dashed #666;
        font-size: 14px;
      }

      .downSpeed {
        transform: rotateZ(180deg);
      }
    }
  }
}
</style>
