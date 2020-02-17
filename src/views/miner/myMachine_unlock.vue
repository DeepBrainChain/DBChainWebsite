<template>
  <div>
    <div class="title">
      <span>{{$t('my_machine_miner_info')}}：{{res_body.content.length}}</span>
      <div v-if="!isBinding && bindMail" class="binding">
        <span class="bindingInfo">{{$t('my_machine_binding_email')}}：{{bindMail}}</span>
        <el-button
          class="ml10"
          size="mini"
          plain
          @click="openDlgMail(false)"
        >{{$t('gpu.modifyMail')}}</el-button>
        <el-tooltip class="item" effect="dark" :content="$t('my_machine_miner_tips')">
          <el-button
            type="primary"
            size="mini"
            class="ml10"
            @click="pushToMc"
          >{{$t('my_machine_miner_rentout')}}</el-button>
        </el-tooltip>
      </div>
      <div v-else-if="!isBinding" class="bind">
        <el-button size="small" plain @click="openDlgMail(true)">{{$t('gpu.bindMail')}}</el-button>
        <span class="bindInfo ml10" v-html="$t('gpu.bindMailInfo')"></span>
      </div>
      <div v-else-if="isBinding">
        <span v-if="isBinding" class="bindInfo">{{$t('my_machine_miner_vocing')}}</span>
      </div>
    </div>
    <div
      v-if="res_body.content.length > 0"
      v-for="(item, index) in res_body.content"
      class="border-content"
    >
      <div class="tools-head">
        <div class="l-wrap">
          <span
            v-if="item.mcData.online_status && item.mcData.dbc_open_status"
          >{{$t('my_machine_miner_status')}}：{{$t('my_machine_miner_online')}}</span>
          <span
            v-if="item.mcData.online_status && !item.mcData.dbc_open_status &&!item.mcData.vocing_error "
          >{{$t('my_machine_miner_status')}}：{{$t('my_machine_miner_vocing_rentout')}}</span>
          <span
            v-if="!item.mcData.online_status "
          >{{$t('my_machine_miner_status')}}：{{$t('my_machine_miner_offline')}}</span>
          <span
            v-if="item.mcData.vocing_error "
          >{{$t('my_machine_miner_status')}}：{{$t('my_machine_miner_vocing_error')}}</span>
        </div>
        <div class="r-wrap">
          <el-tooltip effect="light" placement="left">
            <div class="tooltip-content" slot="content">
              <h3>{{$t('my_machine_miner_can_beused_time')}}:</h3>
              {{Math.floor(item.mcData.can_rent_start_time_later>0?item.mcData.can_rent_start_time_later/60:-item.mcData.can_rent_start_time_later/60)}}{{$t('my_machine_hour')}}{{item.mcData.can_rent_start_time_later > 0 ? $t('my_machine_before'): $t('my_machine_after') }}{{$t('my_machine_start')}}
              <br />
              {{Math.floor(item.mcData.end_rent_out_time_later/60)}}{{$t('my_machine_end')}}
            </div>
            <el-button
              plain
              class="tool-btn"
              size="mini"
              style="width: 86px"
            >{{$t('my_machine_can_time')}}</el-button>
          </el-tooltip>
        </div>
      </div>
      <div class="status-wrap">
        <div class="flex vCenter right">
          <el-rate :value="item.mcData.evaluation_score_average/2"></el-rate>
          <!--   <span>{{item.mcData.evaluation_score_average}}{{$t('scores')}}</span> -->
        </div>
        <div class="flex status-title">
          <div>
            <el-button
              plain
              class="is-link"
              @click="pushOrder(item.mcData.machine_id)"
            >{{item.mcData.machine_id}}</el-button>
            <span class="fs28">
              <span
                class="cPrimaryColor"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$ {{item.mcData.gpu_price_dollar }}/{{$t('my_machine_hour')}}</span>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('my_machine_dbc_version')}}：
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
              <a class="cPrimaryColor">{{item.mcData.country}}</a>
            </span>
          </div>
          <div class="td" v-if="item.mcData.can_rent_start_time_later<=0">
            <span class="fs16">
              <a class="cPrimaryColor">{{-item.mcData.can_rent_start_time_later}}</a>
              {{$t('list_start_rentout')}}
            </span>
          </div>
          <div class="td" v-else-if="item.mcData.can_rent_start_time_later>0">
            <span class="fs16">{{$t('list_can_rentout')}}</span>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <span class="fs16">
              {{$t('list_idle_gpus')}}:
              <a
                class="cPrimaryColor"
              >{{item.mcData.gpu_count - item.mcData.gpu_be_used}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('list_length_of_available_time')}}：
              <a
                class="cPrimaryColor"
              >{{Math.floor(item.mcData.length_of_available_time)}}{{$t('my_machine_hour')}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('list_total_time_be_used')}}：
              <a
                class="cPrimaryColor"
              >{{$minsToHourMins(item.mcData.total_time_be_used)}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('list_total_rent_count')}}：
              <a
                class="cPrimaryColor"
              >{{item.mcData.total_rent_count}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('list_error_rent_count')}}：
              <a
                class="cPrimaryColor"
              >{{item.mcData.error_rent_count}}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.mcData.tensor_core" class="td">
            <span class="fs16">
              Tensor Cores：
              <a class="cPrimaryColor">{{item.mcData.tensor_core}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('list_cuda_version')}}：
              <a class="cPrimaryColor">{{item.mcData.cuda_version}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('list_disk_space')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.mcData.disk_space/(1024*1024))}}GB</a>
              <a class="cPrimaryColor">&nbsp;&nbsp;{{item.mcData.disk_type}}</a>
            </span>
          </div>
          <div class="td3">
            <span class="fs16">
              {{$t('list_cpu_type')}}：
              <a class="cPrimaryColor">{{item.mcData.cpu_type}}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.mcData.half_precision_tflops" class="td">
            <span class="fs16">
              {{$t('list_half_precision_tflops')}}：
              <a
                class="cPrimaryColor"
              >{{item.mcData.half_precision_tflops}}TFLOPS</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('list_gpu_ram_size')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.mcData.gpu_ram_size/(1024*1024))}}GB</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('list_disk_bandwidth')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.mcData.disk_bandwidth/1024)}}MB/s</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('list_cpu_numbers')}}：
              <a class="cPrimaryColor">{{item.mcData.cpu_numbers}}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.mcData.single_precision_tflops" class="td">
            <span class="fs16">
              {{$t('list_single_precision_tflops')}}：
              <a
                class="cPrimaryColor"
              >{{item.mcData.single_precision_tflops}}TFLOPS</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('list_gpu_ram_bandwidth')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.mcData.gpu_ram_bandwidth/(1024*1024))}}GB/s</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('list_inet_up')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.mcData.inet_up/1024)}}Mbps</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('list_ram_size')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.mcData.ram_size/(1024*1024))}}GB</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.mcData.duoble_precision_tflops" class="td">
            <span class="fs16">
              {{$t('list_double_precision_tflops')}}：
              <a
                class="cPrimaryColor"
              >{{item.mcData.duoble_precision_tflops}}TFLOPS</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('list_pcie_bandwidth')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.mcData.pcie_bandwidth/(1024*1024))}}GB/s</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('list_inet_down')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.mcData.inet_down/1024)}}Mbps</a>
            </span>
          </div>
          <div class="td3">
            <span class="fs16">
              {{$t('list_os')}}：
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
            v-if="isShowRendSuccessMsg(item.mcData.milli_can_rent_start_time)&&item.mcData.dbc_open_status"
          >{{$t('myMachine_rentout_success_msg')}}</span>

          <!--   <span class="cRed" v-else-if="item.mcData.vocing_error">{{$t('myMachine_rentout_error')}}</span>-->
          <span class="cRed" v-else-if="item.mcData.vocing_error">{{tip}}</span>
          <span
            class="cRed"
            v-else-if="item.mcData.vocing"
          >{{$t('myMachine_is_vocing_machine_rentout')}}</span>
        </div>
        <div class="r-wrap">
          <el-button
            plain
            class="tool-btn"
            size="mini"
            style="width: 86px"
            @click="pushToEditMc(item.mcData)"
          >{{$t('my_machine_edit')}}</el-button>
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
import cookie from "js-cookie";
import DlgReload from "@/components/machine/dlg_reload";
import DlgHd from "@/components/machine/dlg_increaseHD";
import DlgMail from "@/components/machine/dlg_bindMail";
import DlgUnsubscribe from "@/components/machine/dlg_unsubscribe";
import DlgRate from "@/components/machine/dlg_rate";
import DlgReturnDbc from "@/components/machine/dlg_returnDbc";
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
  rentout_get_machines_list,
  voc_machine
} from "@/api";
import { getAccount, transfer } from "@/utlis";

export default {
  name: "myMachine_unlock",
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
      tip: ""
    };
  },
  activated() {
    // this.binding(isNewMail);
    this.queryMail();
    // this.queryMcList();

    this.queryMcList();
    this.forceToPocMachine();
    if (this.queryOrderListSi) {
      clearInterval(this.queryOrderListSi);
    }
    this.queryOrderListSi = setInterval(() => {
      this.queryMcList();
      this.forceToPocMachine();
    }, 5000);
  },

  deactivated() {
    if (this.si) {
      clearInterval(this.si);
    }
  },
  methods: {
    forceToPocMachine() {
      // pay before
      let item = this.res_body.content.find((item, index) => {
        // console.log(index)
        // console.log(item.orderData.creating_container)
        // console.log(item.orderData.container_is_exist)
        return item.mcData.vocing || item.mcData.vocing_error;
      });
      if (item) {
        this.pocMachine(item.mcData);
      }
    },

    pocMachine(item) {
      clearInterval(this.si);

      //   if (item.orderData.isPocing) {
      //     return;
      //   }
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      return voc_machine({
        machine_id: item.machine_id,
        user_name_platform,
        language
      }).then(res => {
        if (res.status === 1 && res.content) {
          console.log(res.msg);

          //  this.queryMcList();

          clearInterval(this.si);
        } else if (res.status === 2) {
          // item.orderData.creating_container = true;
          //   this.queryMcList();
        } else if (res.status == -1) {
          //   this.queryMcList();
          this.tip = res.msg;
        }
      });
    },

    pushToMc() {
      // this.$router.push("/addMc");
      this.$router.push({
        path: "/addMc",
        query: {
          machine_id: "",
          can_rent_start_time_later: 0,
          end_rent_out_time_later: 600000,
          gpu_price_dollar: 0,
          country_code: "CN"
        }
      });
    },
    pushToEditMc(item) {
      console.log(item);
      this.$router.push({
        path: "/editMc",
        query: {
          machine_id: item.machine_id,
          can_rent_start_time_later: item.can_rent_start_time_later,
          end_rent_out_time_later: item.end_rent_out_time_later,
          gpu_price_dollar: item.gpu_price_dollar,
          country_code: item.country_code
        }
      });
    },
    queryMcList() {
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      rentout_get_machines_list({
        wallet_address: getAccount().address,
        user_name_platform,
        language
      }).then(res => {
        if (res.status === 1) {
          this.res_body.content = res.content.map(item => {
            return {
              mcData: item
            };
          });
        }
      });
    },
    isShowRendSuccessMsg(milli_rent_success_time) {
      const hours =
        (new Date().getTime() - milli_rent_success_time) / 1000 / 3600;
      return hours < 1;
    },
    pushOrder(machine_id) {
      this.$router.push("/machineOrder?machine_id=" + machine_id);
    },
    openDlgMail(isNewMail) {
      this.isNewMail = isNewMail;
      this.dlgMail_open = true;
    },
    //
    queryMail() {
      this.bindMail = cookie.get("mail");
      const address = getAccount().address;
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      queryBindMail_rent({
        wallet_address: address,
        user_name_platform,
        language
      }).then(res => {
        if (res.status === 1) {
          this.bindMail = res.content;
        } else {
          binding_is_ok({
            wallet_address: address,
            user_name_platform,
            language
          }).then(ren => {
            if (ren.status === 2) {
              this.isBinding = true;
            }
          });
          binding_is_ok_modify({
            wallet_address: address,
            user_name_platform,
            language
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
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      const si = setInterval(async () => {
        if (binding) {
          if (isNewMail) {
            binding = false;
            const res = await binding_is_ok({
              wallet_address: getAccount().address,
              user_name_platform,
              language
            });
            if (res.status === 1) {
              clearInterval(si);
              this.bindSuccess();
            }
          } else {
            binding = false;
            const res = await binding_is_ok_modify({
              wallet_address: getAccount().address,
              user_name_platform,
              language
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
      this.curItem = item;
      this.dlgReturnDbc_open = true;
    },
    returnSuccess() {
      this.queryOrderList();
    },
    isShowRendSuccessMsg(milli_rent_success_time) {
      const minutes =
        (new Date().getTime() - milli_rent_success_time) / 1000 / 60;
      return minutes < 20;
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
