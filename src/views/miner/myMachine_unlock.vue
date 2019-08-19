<template>
  <div>
    <div class="title">
      <span>我出租的机器信息：{{res_body.content.length}} {{$t('gpu.pcs')}}</span>
      <div v-if="!isBinding && bindMail" class="binding">
        <span class="bindingInfo">绑定的邮箱：{{bindMail}}</span>
        <el-button
          class="ml10"
          size="mini"
          plain
          @click="openDlgMail(false)"
        >{{$t('gpu.modifyMail')}}
        </el-button>
        <el-tooltip class="item" effect="dark" content="如果机器使用过程中出现中断，则将会把合约中质押的7天机器使用量的DBC扣除。出租时间不超过7天，则全部扣除">
          <el-button type="primary" size="mini" class="ml10" @click="pushToMc">出租机器</el-button>
        </el-tooltip>
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
          <span>机器状态：{{item.mcData.online_status ? '在线':'离线'}}</span>
        </div>
        <div class="r-wrap">
          <el-tooltip effect="light" placement="left">
            <div class="tooltip-content" slot="content">
              <h3>可用时段:</h3>
              {{Math.floor(item.mcData.can_rent_start_time_later/60)}}小时{{item.mcData.can_rent_start_time_later > 0 ? '前': '后' }}开始<br>
              {{Math.floor(item.mcData.end_rent_out_time_later/60)}}小时后结束
            </div>
            <el-button
              plain
              class="tool-btn"
              size="mini"
              style="width: 86px"
            >可用时间
            </el-button>
          </el-tooltip>
        </div>
      </div>
      <div class="status-wrap">
        <div class="flex vCenter right">
          <el-rate :value="item.mcData.evaluation_score_average/2">
          </el-rate>
          <span>{{item.mcData.evaluation_score_average}}{{$t('scores')}}</span>
        </div>
        <div class="flex status-title">
          <div>
            <el-button plain class="is-link" @click="pushOrder(item.mcData.machine_id)">{{item.mcData.machine_id}}
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
              <a class="cPrimaryColor">{{$minsToHourMins(item.mcData.length_of_available_time)}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              累计出租时长：
              <a
                class="cPrimaryColor"
              >{{$minsToHourMins(item.mcData.total_time_be_used)}}</a>
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
          <!--<span
            v-if="isShowRendSuccessMsg(item.orderData.milli_rent_success_time)"
          >机器租用成功，登陆信息已发送至您的邮箱，请查收并妥善保管</span>-->
        </div>
        <div class="r-wrap">
          <el-button
            plain
            class="tool-btn"
            size="mini"
            style="width: 86px"
            @click="pushToEditMc(item.mcData)">重新编辑
          </el-button>
          <!--<el-button
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
            &lt;!&ndash;<el-button plain style="width: 86px" class="tool-btn" size="mini"
                       @click="dlgReload_open = true">
              {{$t('gpu.reload')}}
            </el-button>&ndash;&gt;
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
              :disabled="item.orderData.container_is_exist && item.orderData.rent_success === false"
              plain
              :loading="isPaying"
              class="tool-btn"
              size="mini"
              @click="payOrder(item)"
            >确认支付
            </el-button>
            <el-button
              v-if="!(item.orderData.container_is_exist && item.orderData.rent_success === false)"
              :loading="isPaying"
              class="tool-btn"
              size="mini"
              plain
              @click="cancelOrder(item)"
            >取消订单
            </el-button>
          </template>-->
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
  import DlgReload from "@/components/machine/dlg_reload"
  import DlgHd from "@/components/machine/dlg_increaseHD"
  import DlgMail from "@/components/machine/dlg_bindMail"
  import DlgUnsubscribe from "@/components/machine/dlg_unsubscribe"
  import DlgRate from "@/components/machine/dlg_rate"
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
    request_return_dbc,
    rentout_get_machines_list
  } from "@/api"
  import {getAccount, transfer} from "@/utlis"

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
        si: undefined
      }
    },
    created() {
      // this.binding(isNewMail);
      this.queryMail()
      this.queryMcList()
    },
    computed: {},
    methods: {
      pushToMc() {
        this.$router.push('/addMc')
      },
      pushToEditMc(item) {
        console.log(item)
        this.$router.push({
          path: '/editMc',
          query: {
            machine_id: item.machine_id,
            can_rent_start_time_later: item.can_rent_start_time_later,
            end_rent_out_time_later: item.end_rent_out_time_later,
            gpu_price_dollar: item.gpu_price_dollar
          }
        })
      },
      queryMcList() {
        rentout_get_machines_list({
          wallet_address: getAccount().address
        }).then(res => {
          if (res.status === 1) {
            this.res_body.content = res.content.map(item => {
              return {
                mcData: item
              }
            })
          }
        })
      },
      isShowRendSuccessMsg(milli_rent_success_time) {
        const hours = (new Date().getTime() - milli_rent_success_time) / 1000 / 3600
        return hours < 1
      },
      pushOrder(machine_id) {
        this.$router.push("/machineOrder?machine_id=" + machine_id)
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
          if (res.status === 1) {
            this.bindMail = res.content
          } else {
            binding_is_ok({
              wallet_address: address
            }).then(ren => {
              if (ren.status === 2) {
                this.isBinding = true
              }
            })
            binding_is_ok_modify({
              wallet_address: address
            }).then(ren => {
              if (ren.status === 2) {
                this.isBinding = true
              }
            })
          }
        })
      },
      binding(isNewMail) {
        this.isBinding = true
        let binding = true
        const si = setInterval(async () => {
          if (binding) {
            if (isNewMail) {
              binding = false
              const res = await binding_is_ok({
                wallet_address: getAccount().address
              })
              if (res.status === 1) {
                clearInterval(si)
                this.bindSuccess()
              }
            } else {
              binding = false
              const res = await binding_is_ok_modify({
                wallet_address: getAccount().address
              })
              if (res.status === 1) {
                clearInterval(si)
                this.bindSuccess()
              }
            }
          }
          binding = true
        }, 10000)
      },
      // bind fail
      bindFail() {
        this.isBinding = false
      },
      // bind success
      bindSuccess() {
        this.isBinding = false
        this.queryMail()
      },
      // stop rent
      stopRent(item) {
        this.dlgUnsubscribe_open = true
        this.curItem = item
      },
      stopRentSuccess() {
        this.queryOrderList()
      },
      openRateDlg(item) {
        this.curItem = item
        this.dlgRate_open = true
      },
      successRate() {
        this.queryOrderList()
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
  }

  .tooltip-content {
    h3 {
      margin: 0;
      padding-bottom: 10px;
      text-align: left;
    }

    font-size: 14px;
    color: #333;
    line-height: 18px;
  }
</style>
