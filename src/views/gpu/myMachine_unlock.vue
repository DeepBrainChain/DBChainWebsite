<template>
  <div>
    <div class="title">
      <span>{{$t('gpu.myMachineTitle')}}：{{rentNumber}} {{$t('gpu.pcs')}}</span>
      <div v-if="!isBinding && bindMail" class="binding">
        <span class="bindingInfo">绑定的邮箱：{{bindMail}}</span>
        <el-button
          class="ml10"
          size="mini"
          plain
          @click="openDlgMail(false)"
        >{{$t('gpu.modifyMail')}}
        </el-button>
      </div>
      <div v-else-if="!isBinding" class="bind">
        <el-button size="small" plain @click="openDlgMail(true)">{{$t('gpu.bindMail')}}</el-button>
        <span class="bindInfo ml10" v-html="$t('gpu.bindMailInfo')"></span>
      </div>
      <div v-else-if="isBinding">
        <span v-if="isBinding" class="bindInfo">正在验证中,大概需要几分钟</span>
      </div>
    </div>
    <div
      v-if="res_body.content.length > 0"
      v-for="(item, index) in res_body.content"
      class="border-content"
    >
      <div class="tools-head">
        <div class="l-wrap">
          <!--          <span class="tools-title">{{$t('gpu.mcStatusTitle')}}：<b>{{$t('gpu.machineOnLine')}}</b></span>-->
          <span
            v-if="item.orderData.order_is_cancer ||item.orderData.order_is_over"
            class="tools-title"
          ></span>
          <span
            v-else
            class="tools-title"
          >{{$t('gpu.remainingTime')}}：{{$secToDate(item.orderData.rest_time_rent*60, 'DHM')}}</span>
        </div>
        <div class="r-wrap">
          <!--<span v-if="item.rent_success">正在使用中</span>
          <span
            v-if="Math.floor((new Date().getTime() - item.orderData.milli_create_order_time)/60000) <= 15"
          >等待支付</span>
          <span v-else-if="item.orderData.order_is_cancer">未支付</span>
          <span v-if="item.orderData.order_is_cancer === false" class="ml10">
            剩余支付时间：{{
            15 - Math.floor((new Date().getTime() - item.orderData.milli_create_order_time)/60000)
            }}分钟
          </span>-->
          <span v-if="item.orderData.order_is_over && item.orderData.order_isnormal_over">订单已结束</span>
          <span
            v-else-if="item.orderData.order_is_over && item.orderData.order_isnormal_over===false"
          >订单被中断</span>
          <span v-else-if="item.orderData.order_is_cancer">订单已取消</span>
          <span v-else-if="item.orderData.rent_success">正在使用中</span>
          <span
            v-else-if="item.orderData.vocing_pay===true"
          >支付验证中</span>
          <span v-else-if="item.orderData.pay_error && item.orderData.return_dbc===false">支付验证失败</span>
          <span v-else-if="item.orderData.pay_error && item.orderData.return_dbc">退币成功</span>
        </div>
      </div>
      <div class="pay-wrap">
        <div class="rate-head">
          <div class="flex right vCenter">
            <el-rate :value="item.mcData.evaluation_score_average/2"></el-rate>
            <span>{{item.mcData.evaluation_score_average}}{{$t('scores')}}</span>
          </div>
        </div>
        <div>
          <span class="td">{{$t('gpu.payDBCs')}}：{{item.orderData.dbc_total_count}}</span>
          <span
            class="td"
          >已使用时间：{{parseInt(item.orderData.real_rent_time/60)}}小时{{item.orderData.real_rent_time%60}}分钟</span>
        </div>
        <div>
          <span class="td">{{$t('gpu.actualPrice')}}：{{item.orderData.dbc_real_need_count}}DBC</span>
          <span class="td">{{$t('gpu.gpuBilling')}}：$ {{item.orderData.gpu_price_dollar}}/小时</span>
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
          <div>
            <el-button plain class="is-link" @click="pushDetail(item.mcData.machine_id)">{{item.mcData.machine_id}}
            </el-button>
            <span class="fs28">
              <span
                class="cPrimaryColor"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$ {{item.mcData.gpu_price_dollar }}/小时</span>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              DBC版本：
              <a class="cPrimaryColor">{{item.mcData.dbc_version}}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div class="td2">
            <span class="fs28">
              <a class="cPrimaryColor">{{item.mcData.gpu_type}}</a>
              <a class="cPrimaryColor">x{{item.mcData.gpu_count}}</a>
            </span>
          </div>
          <div class="td2">
            <span class="fs28">
              <a class="cPrimaryColor">{{item.mcData.county}}中国</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <span class="fs16">
              闲置GPU数:
              <a class="cPrimaryColor">{{item.mcData.gpu_count - item.mcData.gpu_be_used}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              最长可租用时间：
              <a class="cPrimaryColor">{{Math.floor(item.mcData.length_of_available_time/60)}}小时</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              累计出租时长：
              <a class="cPrimaryColor">{{$minsToHourMins(item.mcData.total_time_be_used)}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              出租总次数：
              <a class="cPrimaryColor">{{item.mcData.total_rent_count}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              中断次数：
              <a class="cPrimaryColor">{{item.mcData.error_rent_count}}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.mcData.tensor_core" class="td">
            <span class="fs16">
              Tensor Core：
              <a class="cPrimaryColor">{{item.mcData.tensor_core}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              CUDA版本号：
              <a class="cPrimaryColor">{{item.mcData.cuda_version}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              硬盘：
              <a class="cPrimaryColor">{{parseInt(item.mcData.disk_space/(1024*1024))}}GB</a>
              <a class="cPrimaryColor">&nbsp;&nbsp;{{item.mcData.disk_type}}</a>
            </span>
          </div>
          <div class="td3">
            <span class="fs16">
              CPU型号：
              <a class="cPrimaryColor">{{item.mcData.cpu_type}}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.mcData.half_precision_tflops" class="td">
            <span class="fs16">
              半精度浮点运算数：
              <a class="cPrimaryColor">{{item.mcData.half_precision_tflops}}TFLOPS</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              GPU显存：
              <a class="cPrimaryColor">{{parseInt(item.mcData.gpu_ram_size/(1024*1024))}}GB</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              硬盘带宽：
              <a class="cPrimaryColor">{{parseInt(item.mcData.disk_bandwidth/1024)}}MB/s</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              CPU内核数：
              <a class="cPrimaryColor">{{item.mcData.cpu_numbers}}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.mcData.single_precision_tflops" class="td">
            <span class="fs16">
              单精度浮点运算数：
              <a class="cPrimaryColor">{{item.mcData.single_precision_tflops}}TFLOPS</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              GPU显存带宽：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.mcData.gpu_ram_bandwidth/(1024*1024))}}GB/s</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              上行带宽：
              <a class="cPrimaryColor">{{parseInt(item.mcData.inet_up/1024)}}Mbps</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              内存数：
              <a class="cPrimaryColor">{{parseInt(item.mcData.ram_size/(1024*1024))}}GB</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.mcData.duoble_precision_tflops" class="td">
            <span class="fs16">
              双精度浮点运算数：
              <a class="cPrimaryColor">{{item.mcData.duoble_precision_tflops}}TFLOPS</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              总线传输速度：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.mcData.pcie_bandwidth/(1024*1024))}}GB/s</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              下行带宽：
              <a class="cPrimaryColor">{{parseInt(item.mcData.inet_down/1024)}}Mbps</a>
            </span>
          </div>
          <div class="td3">
            <span class="fs16">
              操作系统：
              <a class="cPrimaryColor">{{item.mcData.os}}</a>
            </span>
          </div>
        </div>
      </div>
      <!--<div class="tools-head bd">
        <div class="l-wrap">
          <span class="tools-title small">{{$t('gpu.machineLoginInfo')}}：ssh -p 20049 root@116.85.24.172，{{$t('password')}}：xxxxx</span>
        </div>
      </div>-->
      <div class="tools-head">
        <div class="l-wrap">
          <span
            v-if="isShowRendSuccessMsg(item.orderData.milli_rent_success_time)"
          >机器租用成功，登陆信息已发送至您的邮箱，请查收并妥善保管</span>
          <span v-else-if="item.orderData.vocing === true">
            支付确认中
          </span>
          <span class="cRed" v-else-if="item.orderData.creating_container">
            正在确认中，请耐心等待，大概需要1-3分钟
          </span>
        </div>
        <div
          v-if="item.orderData.order_is_cancer === false && !(item.orderData.return_dbc === true && item.orderData.pay_error === true)"
          class="r-wrap">
          <el-button
            v-if="item.orderData.order_is_over"
            plain
            class="tool-btn"
            size="mini"
            style="width: 86px"
            @click="openRateDlg(item)"
          >{{$t('gpu.rate')}}
          </el-button>
          <el-button v-else-if="item.orderData.return_dbc === false && item.orderData.pay_error"
                     class="tool-btn"
                     style="width: 86px"
                     plain
                     size="mini"
                     @click="openReturnDbc(item)"
          >退币
          </el-button>
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
            >{{$t('unsubscribe')}}
            </el-button>
          </template>
          <template v-else-if="item.orderData.rent_success === false">
            <el-button
              :disabled="item.verifing === true || item.orderData.vocing_pay"
              plain
              :loading="isPaying"
              class="tool-btn"
              size="mini"
              @click="payOrder(item)"
            >确认支付
            </el-button>
            <el-button
              v-if="!item.orderData.vocing_pay && item.orderData.try_rent === false"
              :disabled="isPaying"
              class="tool-btn"
              size="mini"
              plain
              @click="cancelOrder(item)"
            >取消订单
            </el-button>
          </template>
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
    <dlg-rate :open.sync="dlgRate_open" :item="curItem" @success="successRate"></dlg-rate>
    <!--    return dbc-->
    <dlg-return-dbc :open.sync="dlgReturnDbc_open" :item="curItem" @success="returnSuccess"></dlg-return-dbc>
  </div>
</template>

<script>
  import DlgReload from "@/components/machine/dlg_reload";
  import DlgHd from "@/components/machine/dlg_increaseHD";
  import DlgMail from "@/components/machine/dlg_bindMail";
  import DlgUnsubscribe from "@/components/machine/dlg_unsubscribe";
  import DlgRate from "@/components/machine/dlg_rate";
  import DlgReturnDbc from "@/components/machine/dlg_returnDbc"
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
    stop,
    get_return_dbc_code,
    request_return_dbc
  } from "@/api";
  import {getAccount, transfer} from "@/utlis";

  export default {
    name: "myMachine",
    components: {
      DlgReload,
      DlgHd,
      DlgMail,
      DlgUnsubscribe,
      DlgRate,
      DlgReturnDbc
    },
    data() {
      return {
        rateValue: undefined,
        dlgReload_open: false,
        dlgHD_open: false,
        dlgMail_open: false,
        dlgUnsubscribe_open: false,
        dlgRate_open: false,
        dlgReturnDbc_open: false,
        isNewMail: false,
        isBinding: false,
        isBinded: false,
        bindMail: "",
        res_body: {
          content: []
        },
        isPaying: false,
        curItem: undefined,
        isRateEdit: false,
        si: undefined,
        queryOrderListSi: undefined
      };
    },
    created() {
      // this.binding(isNewMail);
      this.queryMail();
      this.queryOrderList().then(res => {
        if (res.status === 1) {
          this.forceToPay()
        }
      })
      this.queryOrderListSi = setInterval(() => {
        if (this.isPaying !== true) {
          this.queryOrderList();
        }
      }, 60000);
    },
    beforeRouteLeave(to, from ,next) {
      if (this.queryOrderListSi) {
        clearInterval(this.queryOrderListSi)
      }
      if (this.si) {
        clearInterval(this.si)
      }
      next()
    },
    computed: {
      rentNumber() {
        return this.res_body.content.filter(item => {
          return item.orderData.rent_success;
        }).length;
      }
    },
    methods: {
      forceToPay() {
        // console.log('调用强制支付')
        // 判断如果有订单没有支付完成，强制支付
        const order = this.res_body.content.find((item, index) => {
          // console.log(index)
          // console.log(item.orderData.creating_container)
          // console.log(item.orderData.container_is_exist)
          return !item.orderData.order_is_over &&
            !item.orderData.order_is_cancer &&
            !item.orderData.rent_success &&
            !item.orderData.vocing_pay &&
            (item.orderData.creating_container || item.orderData.container_is_exist)
        })
        if (order) {
          this.payOrder(order)
        }
      },
      isShowRendSuccessMsg(milli_rent_success_time) {
        const minutes =
          (new Date().getTime() - milli_rent_success_time) / 1000 / 60;
        return minutes < 10;
      },
      // pay
      payOrder(item) {
        this.isPaying = true;
        clearInterval(this.si)
        this.si = setInterval(() => {
          // pay before
          can_rent_this_machine({
            order_id: item.orderData.order_id
          })
            .then(res => {
              if (res.status === 1) {
                console.log(res.msg)
                item.notice = ''
                clearInterval(this.si)
                const amount = item.orderData.dbc_total_count + item.orderData.code * 1;
                // pay
                return transfer({
                  toAddress: res.content,
                  amount
                })
                /*return Promise.resolve({
                  status: 1,
                  response: {
                    txid: '200fb4df1fac3d9e010b0d7265bb102ad7dfa79d2599d93b42cbbd8af6b13080'
                  }
                })*/
              } else if (res.status === 2) {
                item.orderData.creating_container = true
                return Promise.reject({
                  status: -2,
                  msg: '正在确认是否可租用'
                })
              } else {
                this.queryOrderList()
                return Promise.reject({
                  status: -1,
                  msg: res.msg
                })
              }
            })
            .then(res => {
              if (res.status === 1) {
                console.log('转账成功')
                const txid = res.response.txid;
                clearInterval(this.si);
                // pay after
                item.verifing = true
                // 支付后确认
                return pay({
                  order_id: item.orderData.order_id,
                  dbc_hash: txid
                });
              }
            })
            .then(res => {
              if (res.status === 2) {
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "success"
                });
                item.orderData.vocing_pay = true
              } else {
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "error"
                });
              }
              this.isPaying = false;
              this.queryOrderList();
            })
            .catch(err => {
              if (err && err.status === -1) {
                this.$message({
                  showClose: true,
                  message: err.msg,
                  type: "error"
                })
                clearInterval(this.si)
                this.isPaying = false
              } else if (err && err.status === -2) {
                console.log(err.msg)
                // clearInterval(this.si)
              } else if (err) {
                console.log('其他报错')
                console.log(err)
                clearInterval(this.si)
                this.isPaying = false
              }
            })
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
                .then(({value}) => {
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
          .finally(() => {
          });
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
        return Promise.all(promiseList)
          .then(([res_1, res_2]) => {
            this.res_body.content = [];
            res_2.content.forEach(item => {
              const mcItem = res_1.content.find(
                mc => item.machine_id === mc.machine_id
              );
              if (mcItem) {
                this.res_body.content.push({
                  verifing: false,
                  notice: '',
                  orderData: item,
                  mcData: mcItem
                })
              }
            })
            return Promise.resolve({
              status: 1,
            })
          })
          .catch(err => {
            if (err) {
              console.log(err);
            }
          })
      },
      pushDetail(machine_id) {
        this.$router.push("/machineDetail?machine_id=" + machine_id)
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
        this.curItem = item;
        this.dlgRate_open = true;
      },
      successRate() {
        this.queryOrderList();
      },
      // 退币
      openReturnDbc(item) {
        this.curItem = item
        this.dlgReturnDbc_open = true
      },
      returnSuccess() {
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
      align-items: flex-start;
      padding: 5px 0;

      &.status-title {
        justify-content: space-between;
        align-items: center;
      }

      .td3 {
        width: 40%;
        line-height: 24px;

        .cPrimaryColor {
          font-size: 12px;

          &.fs16 {
            font-size: 28px;
          }
        }
      }

      .td2 {
        width: 50%;

        line-height: 24px;

        .cPrimaryColor {
          font-size: 32px;

          &.fs28 {
            font-size: 32px;
          }
        }
      }

      .td {
        width: 20%;
        line-height: 24px;

        .cPrimaryColor {
          font-size: 12px;

          &.fs16 {
            font-size: 16px;
          }
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

    /*.flex {
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
        }*/
  }
</style>
