<template>
  <div>
    <div class="title">
      <span>{{$t('gpu.myMachineTitle')}}：{{res_body.content.length}} {{$t('gpu.pcs')}} </span>
      <div v-if="!isBinding && bindMail" class="binding">
        <span class="bindingInfo">绑定的邮箱：{{bindMail}}</span>
        <el-button class="ml10" size="mini" plain @click="openDlgMail(false)">{{$t('gpu.modifyMail')}}</el-button>
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
          <span class="tools-title">{{$t('gpu.remainingTime')}}：{{$hourToDT(item.orderData.rest_time_rent/60)}}</span>
        </div>
        <div class="r-wrap">
          <span v-if="item.rent_success">正在使用中</span>
          <span
            v-if="Math.floor((new Date().getTime() - item.orderData.milli_create_order_time)/60000) <= 15">等待支付</span>
          <span v-else-if="item.orderData.order_is_cancer">未支付</span>
          <span v-if="item.orderData.order_is_cancer === false" class="ml10">剩余支付时间：{{
            15 - Math.floor((new Date().getTime() - item.orderData.milli_create_order_time)/60000)
            }}分钟</span>
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
          <span class="td">{{$t('gpu.currentRemaining')}}：{{item.orderData.dbc_total_count - item.orderData.dbc_real_need_count}} DBC</span>
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
          <span class="cPrimaryColor">ID : <a class="is-link" href="javascript:" @click="pushDetail">{{item.mcData.machine_id}}</a></span>
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
            <div>
              累计出租时长
            </div>
            <div class="cPrimaryColor">
              {{item.mcData.total_rent_count}}h
            </div>
          </div>
          <div class="td">
            <div>
              出租总次数
            </div>
            <div class="cPrimaryColor">
              {{item.mcData.total_time_be_used}}
            </div>
          </div>
          <div class="td">
            <div>
              中断次数
            </div>
            <div class="cPrimaryColor">
              {{item.mcData.error_rent_count}}
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <div>Tensor Core</div>
            <div class="cPrimaryColor">{{item.mcData.tensor_core}}</div>
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
          <span class="tools-title small">{{$t('gpu.machineLoginInfo')}}：ssh -p 20049 root@116.85.24.172，{{$t('password')}}：xxxxx</span>
        </div>
      </div>
      <div v-if="item.orderData.order_is_cancer === false" class="tools-head">
        <div class="l-wrap"></div>
        <div class="r-wrap">
          <el-button style="width: 86px" class="tool-btn blue" size="mini" @click="payOrder(item)">
            确认支付
          </el-button>
          <el-button style="width: 86px" class="tool-btn blue" size="mini" @click="cancelOrder(item)">
            取消订单
          </el-button>
          <el-button style="width: 86px" class="tool-btn blue" size="mini" @click="dlgReload_open = true">
            {{$t('gpu.reload')}}
          </el-button>
          <el-button class="tool-btn blue" style="width: 86px" size="mini" @click="dlgUnsubscribe_open=true">
            {{$t('unsubscribe')}}
          </el-button>
          <el-button class="tool-btn blue" style="width: 86px" size="mini" @click="dlgUnsubscribe_open=true">
            退币
          </el-button>
          <el-button v-if="item.orderData.order_is_over" class="tool-btn blue" size="mini" style="width: 86px"
                     @click="dlgRate_open=true">
            {{$t('gpu.rate')}}
          </el-button>
        </div>
      </div>
    </div>
    <!--    reload-dlg-->
    <dlg-reload :open.sync="dlgReload_open"></dlg-reload>
    <!--    increaseHD-dlg-->
    <dlg-hd :open.sync="dlgHD_open"></dlg-hd>
    <!--    bindMail-dlg-->
    <dlg-mail :open.sync="dlgMail_open" :is-new-mail="isNewMail" @binding="isBinding=true" @fail="bindFail"
              @success="bindSuccess"></dlg-mail>
    <!--    Unsubscribe-->
    <dlg-unsubscribe :open.sync="dlgUnsubscribe_open"></dlg-unsubscribe>
    <!--    rate-->
    <dlg-rate :open.sync="dlgRate_open"></dlg-rate>
  </div>
</template>

<script>
  import DlgReload from '@/components/machine/dlg_reload'
  import DlgHd from '@/components/machine/dlg_increaseHD'
  import DlgMail from '@/components/machine/dlg_bindMail'
  import DlgUnsubscribe from '@/components/machine/dlg_unsubscribe'
  import DlgRate from '@/components/machine/dlg_rate'
  import {
    queryBindMail_rent,
    query_machine_by_wallet,
    get_all_order,
    can_rent_this_machine,
    pay,
    get_cancer_code,
    cancer_order
  } from '@/api'
  import {
    getAccount,
    transfer,
  } from '@/utlis'

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
        bindMail: '',
        res_body: {
          content: []
        },
      }
    },
    created() {
      this.queryMail()
      this.queryOrderList()
    },
    methods: {
      // pay
      payOrder(item) {
        const loading = this.$loading()
        can_rent_this_machine({
          order_id: item.orderData.order_id
        }).then(res => {
            if (res.status === 1) {
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'success'
              })
              const amount = item.orderData.dbc_total_count + item.orderData.code * 1
            debugger
              return transfer({
                toAddress: getAccount().address,
                amount
              })
            } else {
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'error'
              })
            }
          }
        ).then(res => {
          const txid = res.response.txid
          return pay({
            order_id: item.orderData.order_id,
            dbc_hash: txid
          })
        }).then(res => {
          if (res.status === 1) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error'
            })
          }
        }).finally(() => {
          loading.close()
        })
      },
      // cancel
      cancelOrder(item) {
        get_cancer_code({
          order_id: item.orderData.order_id
        }).then(res => {
          if (res.status === 1) {
            this.$prompt('验证码已发送至您的邮箱，请填写验证码', '取消订单', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(({value}) => {
              return cancer_order({
                order_id: item.orderData.order_id,
                code: res.code
              })
            }).catch(() => {
            });
            /*this.$confirm('验证码已发送至您的邮箱。', '取消订单', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(() => {

            }).catch(() => {

            })*/
          }
        }).then(res => {
          if (res.status === 1) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'success'
            })
          }
        }).finally(() => {

        })
      },
      // get Order List
      queryOrderList() {
        if (!getAccount()) {
          this.$router.push('/openWallet')
          return
        }
        const wallet_address_user = getAccount().address
        const promiseList = [
          query_machine_by_wallet({
            wallet_address_user
          }),
          get_all_order({
            wallet_address_user
          })
        ]
        Promise.all(promiseList).then(([res_1, res_2]) => {
          this.res_body.content = res_2.content.map(item => {
            const mcItem = res_1.content.find(mc => item.machine_id === mc.machine_id)
            return {
              orderData: item,
              mcData: mcItem
            }
          })
        }).catch(err => {
          console.log(err)
        })
      },
      pushDetail() {
        this.$router.push('/machineDetail')
      },
      openDlgMail(isNewMail) {
        this.isNewMail = isNewMail
        this.dlgMail_open = true
      },
      //
      queryMail() {
        const address = getAccount().address
        queryBindMail_rent({
          wallet_address: address
        }).then(res => {
          if (res.content) {
            this.bindMail = res.content
          }
        })
      },
      // bind fail
      bindFail() {
        this.isBinding = false
      },
      // bind success
      bindSuccess() {
        this.queryMail()
        this.isBinding = false
      }
    },

  }
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
      border-bottom: 1px solid #E1E6EC;
    }

    .tools-title {
      font-size: 16px;
      color: #050D68;

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
    border-top: 1px solid #E1E6EC;
    font-size: 14px;
    line-height: 28px;
    color: #666;
    background-color: #F6F9FC;

    .td {
      display: inline-block;
      width: 33.3%;

    }
  }

  .status-wrap {
    padding: 15px 20px 12px;
    border-top: 1px solid #E1E6EC;
    border-bottom: 1px solid #E1E6EC;
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

        .upSpeed, .downSpeed {
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
