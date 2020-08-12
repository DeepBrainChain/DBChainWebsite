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
            v-if="!item.mcData.dbc_open_status && item.mcData.time_dbc_close_status!=null &&!item.mcData.vocing_connectivity_verification"
          >{{$t('my_machine_miner_status')}}：{{$t('my_machine_miner_close_status')}}</span>
          <span
            v-else-if="item.mcData.online_status && item.mcData.dbc_open_status"
          >{{$t('my_machine_miner_status')}}：{{$t('my_machine_miner_online')}}</span>
          <span
            v-else-if="item.mcData.online_status && !item.mcData.dbc_open_status &&item.mcData.vocing_connectivity_verification"
          >{{$t('my_machine_miner_status')}}：{{$t('my_machine_miner_vocing_rentout')}}</span>
          <span
            v-else-if="!item.mcData.online_status"
          >{{$t('my_machine_miner_status')}}：{{$t('my_machine_miner_offline')}}</span>
          <span
            v-else-if="item.mcData.error_connectivity_verification"
          >{{$t('my_machine_miner_status')}}：{{$t('my_machine_miner_vocing_error')}}</span>
          <span
            class="cRed"
            v-if="!item.mcData.dbc_open_status && item.mcData.time_dbc_close_status!=null"
          >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('time_sold_out_machine')}}:{{$secToDate(item.mcData.min_time_dbc_close_status*60, 'DHM')}}</span>
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
        <div class="flex status-title">
          <el-rate :value="item.mcData.evaluation_score_average/2"></el-rate>
          <span class="fs28">
            <span
              v-if="item.mcData.dbc_open_status"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('accounting_area_info')}}:</span>
            <span
              class="cPrimaryColor"
              v-if="item.mcData.dbc_open_status"
            >{{item.mcData.machine_mode_String }}</span>
          </span>
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
          <div
            class="td"
            v-if="item.mcData.can_rent_start_time_later<=0 && item.mcData.dbc_open_status"
          >
            <span class="fs16">
              <a class="cPrimaryColor">{{-item.mcData.can_rent_start_time_later}}</a>
              {{$t('list_start_rentout')}}
            </span>
          </div>
          <div
            class="td"
            v-else-if="item.mcData.can_rent_start_time_later>0&& item.mcData.dbc_open_status"
          >
            <span class="fs16">{{$t('list_can_rentout')}}</span>
          </div>
        </div>
        <div class="flex">
          <div class="td5">
            <span class="fs28">
              <a
                class="cPrimaryColor"
              >{{$t('month_discount')}}:{{item.mcData.discount_month}}%&nbsp;&nbsp;</a>
            </span>
          </div>
          <div class="td5">
            <span class="fs28">
              <a
                class="cPrimaryColor"
              >{{$t('quarter_discount')}}:{{item.mcData.discount_quarter}}%&nbsp;&nbsp;</a>
            </span>
          </div>
          <div class="td5">
            <span class="fs28">
              <a
                class="cPrimaryColor"
              >{{$t('year_discount')}}:{{item.mcData.discount_year}}%&nbsp;&nbsp;</a>
            </span>
          </div>
          <div class="td5">
            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('rentout_machine_whole_instruction')"
              v-if="item.mcData.gpu_rentout_whole"
            >
              <span class="fs28">
                <a class="cPrimaryColor">{{$t('rentout_machine_whole')}}</a>
              </span>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('rentout_machine_one_gpu_instruction')"
              v-else
            >
              <span class="fs28">
                <a class="cPrimaryColor">{{$t('rentout_machine_one_gpu')}}</a>
              </span>
            </el-tooltip>
          </div>
          <div class="td5">
            <span class="fs28"></span>
            <el-tooltip class="item" effect="dark" :content="$t('high_stability_conditions4')">
              <span class="fs28">
                <a
                  class="cPrimaryColor"
                >{{$t('deposite_dbc_count')}}:{{item.mcData.rentout_deposite_dbc_count/item.mcData.gpu_count}}</a>
              </span>
            </el-tooltip>
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
              >{{parseInt(item.mcData.gpu_ram_size/(1000*1000))}}GB</a>
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
            v-if="isShowRendSuccessMsg(item.mcData.milli_time_dbc_open_status)&&item.mcData.dbc_open_status&&item.mcData.usage_type!==2"
          >{{$t('myMachine_rentout_success_msg')}}</span>

          <span
            v-else-if="isShowRendSuccessMsg(item.mcData.milli_time_dbc_open_status)&&item.mcData.dbc_open_status&&item.mcData.usage_type===2"
          >{{$t('myMachine_rentout_success_msg_mining')}}</span>

          <!--   <span class="cRed" v-else-if="item.mcData.vocing_error">{{$t('myMachine_rentout_error')}}</span>-->

          <span
            class="cRed"
            v-else-if="(ispayPocing||item.mcData.vocing_pay_deposite)&&pay_index===index"
          >{{$t('my_machine_order_vocing_pay')}}</span>

          <span
            class="cRed"
            v-else-if="item.mcData.error_pay_deposite&&!item.mcData.dbc_open_status"
          >{{$t('my_machine_order_vocing_pay_error')}}</span>

          <span class="cRed" v-else-if="item.mcData.error_connectivity_verification">{{tip}}</span>
          <span
            class="cRed"
            v-else-if="isPaying&&pay_index===index"
          >{{$t('myMachine_is_dbc_transfering')}}</span>

          <span
            class="cRed"
            v-else-if="item.mcData.vocing_connectivity_verification"
          >{{$t('myMachine_is_vocing_machine_rentout')}}</span>
          <span
            class="cRed"
            v-else-if="item.mcData.success_connectivity_verification && !item.mcData.dbc_open_status"
          >{{$t('success_connectivity_verification')}}</span>
          <span
            class="cRed"
            v-else-if="!item.mcData.dbc_open_status && item.mcData.time_dbc_close_status!=null"
          >{{$t('sold_out_machine_tip')}}</span>
          <span
            v-else-if="item.mcData.need_deposite_dbc && !item.mcData.success_pay_deposite&&
            !item.mcData.error_pay_deposite&& !ispayPocing&&!item.mcData.vocing_pay_deposite&&item.mcData.success_connectivity_verification"
          >{{$t('miner_confirmPay_tip3')}}</span>
        </div>
        <div class="r-wrap">
          <el-tooltip class="item" effect="dark" :content="$t('miner_confirmPay_tip0')">
            <el-button
              v-if="item.mcData.need_deposite_dbc && !item.mcData.success_pay_deposite&&
            !item.mcData.error_pay_deposite&& !ispayPocing&&!item.mcData.vocing_pay_deposite&&item.mcData.success_connectivity_verification&&!item.mcData.gpu_rentout_whole"
              plain
              class="tool-btn"
              size="mini"
              style="width: 126px"
              @click="openPay(item,index)"
            >{{$t('miner_confirmPay')}}</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('miner_confirmPay_tip1')">
            <el-button
              v-if="item.mcData.need_deposite_dbc && !item.mcData.success_pay_deposite&&
            !item.mcData.error_pay_deposite&& !ispayPocing&&!item.mcData.vocing_pay_deposite&&item.mcData.success_connectivity_verification&&item.mcData.gpu_rentout_whole"
              plain
              class="tool-btn"
              size="mini"
              style="width: 126px"
              @click="openPay(item,index)"
            >{{$t('miner_confirmPay')}}</el-button>
          </el-tooltip>
          <el-button
            v-if="item.mcData.error_pay_deposite && !ispayPocing&&!item.mcData.vocing_pay_deposite"
            plain
            class="tool-btn"
            size="mini"
            style="width: 126px"
            @click="openPayRepeat(item,index)"
          >{{$t('miner_confirmPay_repeat')}}</el-button>
          <el-tooltip class="item" effect="dark" :content="$t('sold_out_machine_tip')">
            <el-button
              plain
              class="tool-btn"
              size="mini"
              v-if="(!ispayPocing&&!item.mcData.vocing_pay_deposite)&& item.mcData.time_dbc_close_status==null"
              style="width: 86px"
              @click="openSold_out_machine(item.mcData)"
            >{{$t('my_machine_will_close')}}</el-button>
          </el-tooltip>

          <el-button
            plain
            class="tool-btn"
            size="mini"
            v-if="item.mcData.online_status&&!item.mcData.dbc_open_status&&item.mcData.time_dbc_close_status!=null&&!item.mcData.vocing_connectivity_verification"
            style="width: 86px"
            @click="pushToEditMc(item.mcData)"
          >{{$t('my_machine_will_putaway')}}</el-button>
          <el-button
            plain
            class="tool-btn"
            size="mini"
            v-else-if="item.mcData.online_status &&!item.mcData.error_pay_deposite&&!ispayPocing &&!item.mcData.vocing_pay_deposite&&!item.mcData.vocing_connectivity_verification"
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
    <dlg-minerpaydeposite
      :open.sync="dlgMinerpaydeposite_open"
      :place-order-data="placeOrderData"
      @confirm="switch_pay"
    ></dlg-minerpaydeposite>

    <dlg-soldoutmachine :open.sync="dlgsold_out_machine" :item="curItem" @success="soldOutSuccess"></dlg-soldoutmachine>
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
import DlgMinerpaydeposite from "@/components/machine/dlg_minerpaydeposite";
import DlgSoldoutmachine from "@/components/machine/dlg_soldoutmachine";
import {
  queryBindMail_rent,
  binding_is_ok,
  binding_is_ok_modify,
  rentout_get_machines_list,
  vocing_deposite_dbc,
  voc_machine,
  vocing_deposite_dbc_repeat,
  sold_out_machine
} from "@/api";
import { getAccount, transfer } from "@/utlis";

export default {
  name: "myMinerMachine_unlock",
  components: {
    DlgReload,
    DlgHd,
    DlgMail,
    DlgUnsubscribe,
    DlgRate,
    DlgReturnDbc,
    DlgMinerpaydeposite,
    DlgSoldoutmachine
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
      dlgMinerpaydeposite_open: false,
      dlgsold_out_machine: false,
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
      tip: "",
      ispayPocing: false,
      local_pay_error: false,
      pay_index: -1
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
    soldOutSuccess() {
      this.queryMcList();
    },
    openPay(item, index) {
      this.pay_index = index;
      this.dlgMinerpaydeposite_open = true;
      this.placeOrderData = item;
    },

    openSold_out_machine(item) {
      this.dlgsold_out_machine = true;
      this.curItem = item;
    },

    openPayRepeat(item, index) {
      this.pay_index = index;
      const language = this.$i18n.locale;
      return vocing_deposite_dbc_repeat({
        machine_id: item.mcData.machine_id,

        language
      })
        .then(res => {
          if (res.status === 1) {
            this.dlgMinerpaydeposite_open = true;
          } else if (res.status === -1) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: this.$t("unkown_error"),
            type: "error"
          });
        });
    },

    sold_out_machine(item) {
      const language = this.$i18n.locale;
      return sold_out_machine({
        machine_id: item.machine_id,

        language
      })
        .then(res => {
          if (res.status === 1) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success"
            });
            this.queryMcList();
          } else if (res.status === -1) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: this.$t("unkown_error"),
            type: "error"
          });
        });
    },

    forceToPocMachine() {
      // pay before
      let item = this.res_body.content.find(item => {
        // console.log(index)
        // console.log(item.orderData.creating_container)
        // console.log(item.orderData.container_is_exist)
        return item.mcData.vocing_connectivity_verification;
      });
      if (item) {
        this.pocMachine(item.mcData);
      }
    },
    switch_pay(item) {
      this.dlgMinerpaydeposite_open = false;
      if (item.switch_pay_mode === "confirm_pay") {
        this.payOrder(item);
      } else if (item.switch_pay_mode === "paid") {
        this.paid(item);
      }
    },
    confirm_sold_out_machine(item) {
      this.dlgsold_out_machine = false;
      this.sold_out_machine(item);
    },
    // pay
    payOrder(item) {
      this.ispayPocing = false;

      const amount = item.mcData.rentout_deposite_dbc_count;

      this.isPaying = true;
      this.local_pay_error = false;
      transfer({
        toAddress: item.mcData.rentout_deposite_wallet_address,
        amount
      })
        .then(res => {
          if (res.status === 1) {
            console.log("转账成功");
            this.$message({
              showClose: true,
              message: this.$t("transfer_success"),
              type: "success"
            });

            // pay after
            this.isPaying = false;

            const language = this.$i18n.locale;
            this.ispayPocing = true;

            // 支付后确认
            this.si = setInterval(() => {
              return vocing_deposite_dbc({
                machine_id: item.mcData.machine_id,

                language
              })
                .then(res => {
                  this.queryMcList();
                  if (res.status === 1) {
                    clearInterval(this.si);
                    this.pay_index = -1;
                    this.ispayPocing = false;
                  } else if (res.status === -1) {
                    this.ispayPocing = false;
                    this.pay_index = -1;
                    clearInterval(this.si);
                    this.$message({
                      showClose: true,
                      message: res.msg,
                      type: "error"
                    });
                  } else if (res.status === 2) {
                    this.ispayPocing = true;

                    this.queryMcList();
                  }
                })
                .catch(err => {
                  this.$message({
                    showClose: true,
                    message: this.$t("unkown_error"),
                    type: "error"
                  });
                  this.ispayPocing = false;
                  this.pay_index = -1;
                  clearInterval(this.si);
                });
            }, 8000);
          } else if (res.status === -1) {
            this.isPaying = false;
            this.pay_index = -1;
            this.$message({
              showClose: true,
              message: this.$t("dbc_lack_of_balance"),
              type: "error"
            });
            clearInterval(this.si);
            this.local_pay_error = true;
          } else {
            this.isPaying = false;
            this.pay_index = -1;
            this.$message({
              showClose: true,
              message: this.$t("transfer_error"),
              type: "error"
            });
            clearInterval(this.si);
            this.local_pay_error = true;
          }
        })
        .catch(err => {
          this.isPaying = false;
          this.pay_index = -1;
          clearInterval(this.si);
          this.$message({
            showClose: true,
            message: this.$t("transfer_error"),
            type: "error"
          });
        });

      //  }, 5000);
    },

    paid(item) {
      clearInterval(this.si);

      const language = this.$i18n.locale;
      // const txid = res.response.txid;
      //item.mcData.vocing_pay = true;
      this.ispayPocing = true;

      this.si = setInterval(() => {
        return vocing_deposite_dbc({
          machine_id: item.mcData.machine_id,

          language
        })
          .then(res => {
            this.queryMcList();
            if (res.status === 1) {
              clearInterval(this.si);

              this.ispayPocing = false;
            } else if (res.status === -1) {
              this.ispayPocing = false;

              clearInterval(this.si);
              this.$message({
                showClose: true,
                message: res.msg,
                type: "error"
              });
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: this.$t("unkown_error"),
              type: "error"
            });
            this.ispayPocing = false;
            clearInterval(this.si);
          });
      }, 8000);
    },
    pocMachine(item) {
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      return voc_machine({
        machine_id: item.machine_id,
        user_name_platform,
        language
      }).then(res => {
        if (res.status === 1 && res.content) {
          this.queryMcList();
        } else if (res.status === 2) {
          // item.orderData.creating_container = true;
          this.queryMcList();
        } else if (res.status == -1) {
          this.queryMcList();
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
          country_code: "CN",
          error_rent_count: 0,
          total_time_be_used: 0,
          success_pay_deposite: false,
          discount_week: 90,
          discount_month: 85,
          discount_year: 80,
          gpu_rentout_whole: false,
          machine_mode: 0,
          gpu_count: 0,
          rentout_deposite_dbc_count: 0
        }
      });
    },
    pushToEditMc(item) {
      //  console.log(item);
      this.$router.push({
        path: "/editMc",
        query: {
          machine_id: item.machine_id,
          can_rent_start_time_later: item.can_rent_start_time_later,
          end_rent_out_time_later: item.end_rent_out_time_later,
          gpu_price_dollar: item.gpu_price_dollar,
          country_code: item.country_code,
          error_rent_count: item.error_rent_count,
          total_time_be_used: item.total_time_be_used,
          success_pay_deposite: item.success_pay_deposite,
          discount_week: item.discount_week,
          discount_month: item.discount_month,
          discount_year: item.discount_year,
          gpu_rentout_whole: item.gpu_rentout_whole,
          machine_mode: item.machine_mode,
          gpu_count: item.gpu_count,
          rentout_deposite_dbc_count:
            item.rentout_deposite_dbc_count / item.gpu_count
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
      return minutes < 1;
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
    .td5 {
      width: 20%;
      line-height: 24px;

      .cPrimaryColor {
        font-size: 18px;

        &.fs16 {
          font-size: 18px;
        }
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
