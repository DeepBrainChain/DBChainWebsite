<template>
  <div>
    <div class="title">
      <span v-if="$t('website_name') === 'congTuCloud'"
        >{{ $t("gpu.myMachineTitle") }}：{{ orderCount }}</span
      >
      <span v-else>{{ $t("stop_containers_number") }}：{{ rentNumber }}</span>
      <span :style="styleHidden">{{ $t("stop_instruaction") }}</span>
      <!--    <div v-if="!isBinding && bindMail" class="binding">
        <span class="bindingInfo">{{$t('my_machine_binding_email')}}:{{bindMail}}</span>
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
        <span v-if="isBinding" class="bindInfo">{{$t('my_machine_vocing')}}</span>
      </div>-->
    </div>
    <div
      v-if="res_body.content.length > 0"
      v-for="(item, index) in res_body.content"
      class="border-content"
    >
      <div class="tools-head">
        <div class="l-wrap">
          <!--          <span class="tools-title">{{$t('gpu.mcStatusTitle')}}：<b>{{$t('gpu.machineOnLine')}}</b></span>-->
          <span class="tools-title"
            >{{ $t("container_id") }}:{{ item.orderData.task_id }}</span
          >

          <span v-if="item.orderData.have_continue_pay" class="tools-title"
            >&nbsp; &nbsp; &nbsp; &nbsp;</span
          >
          <span
            v-if="
              item.orderData.order_is_cancer || item.orderData.order_is_over
            "
            class="tools-title"
          ></span>
          <span v-else class="tools-title"
            >{{ $t("gpu.remainingTime") }}：{{
              $secToDate(item.orderData.rest_time_rent * 60, "DHM")
            }}</span
          >
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
          <span
            v-if="
              item.orderData.order_is_over && item.orderData.order_isnormal_over
            "
            >{{ $t("container_isnormal_over") }}</span
          >
          <span
            v-else-if="
              item.orderData.order_is_over &&
              item.orderData.order_isnormal_over === false
            "
            >{{ $t("my_machine_nonormal_over") }}</span
          >
          <span v-else-if="item.orderData.order_is_cancer">{{
            $t("my_machine_order_cancer")
          }}</span>
          <span v-else-if="item.orderData.rent_success">{{
            $t("my_machine_order_rent_success")
          }}</span>

          <!--   <span v-else-if="item.orderData.vocing_pay">{{$t('my_machine_order_vocing_pay')}}</span>  -->
          <span
            v-else-if="
              item.orderData.pay_error && item.orderData.return_dbc === false
            "
            >{{ $t("my_machine_order_pay_error") }}</span
          >
          <span
            v-else-if="item.orderData.pay_error && item.orderData.return_dbc"
            >{{ $t("my_machine_order_return_dbc") }}</span
          >
          <span
            v-else-if="
              item.orderData.container_is_exist && !item.orderData.vocing_pay
            "
            >{{ $t("my_machine_order_vocing_machine_success") }}</span
          >
        </div>
      </div>
      <div class="pay-wrap">
        <div class="rate-head" v-if="item.mcData.evaluation_score_average > 0">
          <div
            class="flex right vCenter"
            v-if="$t('website_name') !== 'congTuCloud'"
          >
            <el-rate
              :value="item.mcData.evaluation_score_average / 2"
            ></el-rate>
            <!--     <span>{{item.mcData.evaluation_score_average}}{{$t('scores')}}</span> -->
          </div>
        </div>
        <div>
          <span class="tdred"
            >{{ $t("remaining_time_length") }}:{{
              $secToDate(item.orderData.remaining_time_length * 60, "DHM")
            }}</span
          >

          <span class="td"
            >{{ $t("stopped_time_length") }}:{{
              $secToDate(item.orderData.stopped_time_length * 60, "DHM")
            }}</span
          >
          <span class="td"
            >{{ $t("image_data_stopped") }}：{{
              parseInt(item.orderData.diskspace_image_data / (1024 * 1024))
            }}G</span
          >
        </div>
      </div>
      <div class="status-wrap">
        <div class="flex status-title">
          <div>
            <span>{{ item.mcData.machine_id }}</span>
            <span class="fs28">
              <span
                class="cPrimaryColor"
                v-if="$t('website_name') === 'congTuCloud'"
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {{ (item.mcData.gpu_price_dollar * usdToRmb).toFixed(2)
                }}{{ $t("RMB") }}/{{ $t("my_machine_hour") }}</span
              >
              <span class="cPrimaryColor" v-else
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$
                {{ item.mcData.gpu_price_dollar }}/{{
                  $t("my_machine_hour")
                }}</span
              >
            </span>
          </div>
          <div class="td" :style="styleHidden">
            <span class="fs16">
              {{ $t("my_machine_dbc_version") }}：
              <a class="cPrimaryColor">{{ item.mcData.dbc_version }}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div class="td2">
            <span class="fs28">
              <a class="cPrimaryColor">{{ item.mcData.gpu_type }}</a>
              <a class="cPrimaryColor">x{{ item.mcData.gpu_count }}</a>
            </span>
          </div>
          <div class="td2">
            <span class="fs28">
              <a class="cPrimaryColor">{{ item.mcData.country }}</a>
            </span>
          </div>
          <div class="td" v-if="item.mcData.can_rent_start_time_later < 0">
            <span class="fs16">
              <a class="cPrimaryColor">{{
                -item.mcData.can_rent_start_time_later
              }}</a>
              {{ $t("list_start_rentout") }}
            </span>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <span class="fs16">
              {{ $t("list_idle_gpus") }}:
              <a class="cPrimaryColor">{{
                item.mcData.gpu_count - item.mcData.gpu_be_used
              }}</a>
            </span>
          </div>

          <div class="td">
            <span class="fs16">
              {{ $t("list_length_of_available_time") }}：
              <a class="cPrimaryColor"
                >{{ Math.floor(item.mcData.length_of_available_time + 8 * 24)
                }}{{ $t("my_machine_hour") }}</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_total_time_be_used") }}：
              <a class="cPrimaryColor">{{
                $minsToHourMins(item.mcData.total_time_be_used)
              }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_total_rent_count") }}：
              <a class="cPrimaryColor">{{ item.mcData.total_rent_count }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_error_rent_count") }}：
              <a class="cPrimaryColor">{{ item.mcData.error_rent_count }}</a>
            </span>
          </div>
        </div>

        <div class="flex" v-if="item.mcData.dbc_version !== '0.3.7.2'">
          <div class="td">
            <span class="fs16">
              {{ $t("cpu_containers_list") }}:
              <a class="cPrimaryColor">{{ item.mcData.cpu_containers }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("cpu_containers_can_use_memory_list") }}：
              <a class="cPrimaryColor"
                >{{
                  parseInt(
                    item.mcData.cpu_containers_can_use_memory / (1024 * 1024)
                  )
                }}G</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("cpu_containers_can_use_disk_list") }}：
              <a class="cPrimaryColor"
                >{{
                  parseInt(
                    item.mcData.cpu_containers_can_use_disk / (1024 * 1024)
                  )
                }}G</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("gpu_containers_can_use_memory_list") }}：
              <a class="cPrimaryColor"
                >{{
                  parseInt(
                    item.mcData.gpu_containers_can_use_memory / (1024 * 1024)
                  )
                }}G</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("gpu_containers_can_use_disk_list") }}：
              <a class="cPrimaryColor"
                >{{
                  parseInt(
                    item.mcData.gpu_containers_can_use_disk / (1024 * 1024)
                  )
                }}G</a
              >
            </span>
          </div>
        </div>

        <div class="flex">
          <div v-if="item.mcData.tensor_cores" class="td">
            <span class="fs16">
              Tensor Cores：
              <a class="cPrimaryColor">{{ item.mcData.tensor_cores }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_cuda_version") }}：
              <a class="cPrimaryColor">{{ item.mcData.cuda_version }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_disk_space") }}：
              <a class="cPrimaryColor"
                >{{ parseInt(item.mcData.disk_space / (1024 * 1024)) }}GB</a
              >
              <a class="cPrimaryColor"
                >&nbsp;&nbsp;{{ item.mcData.disk_type }}</a
              >
            </span>
          </div>
          <div class="td3">
            <span class="fs16">
              {{ $t("list_cpu_type") }}：
              <a class="cPrimaryColor">{{ item.mcData.cpu_type }}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.mcData.half_precision_tflops > 0" class="td">
            <span class="fs16">
              {{ $t("list_half_precision_tflops") }}：
              <a class="cPrimaryColor"
                >{{ item.mcData.half_precision_tflops }}TFLOPS</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_gpu_ram_size") }}：
              <a class="cPrimaryColor"
                >{{ parseInt(item.mcData.gpu_ram_size / (1000 * 1000)) }}GB</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_disk_bandwidth") }}：
              <a class="cPrimaryColor"
                >{{ parseInt(item.mcData.disk_bandwidth / 1024) }}MB/s</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_cpu_numbers") }}：
              <a class="cPrimaryColor">{{ item.mcData.cpu_numbers }}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.mcData.single_precision_tflops > 0" class="td">
            <span class="fs16">
              {{ $t("list_single_precision_tflops") }}：
              <a class="cPrimaryColor"
                >{{ item.mcData.single_precision_tflops }}TFLOPS</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_gpu_ram_bandwidth") }}：
              <a class="cPrimaryColor"
                >{{
                  parseInt(item.mcData.gpu_ram_bandwidth / (1024 * 1024))
                }}GB/s</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_inet_up") }}：
              <a class="cPrimaryColor"
                >{{ parseInt(item.mcData.inet_up / 1024) }}Mbps</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_ram_size") }}：
              <a class="cPrimaryColor"
                >{{ parseInt(item.mcData.ram_size / (1024 * 1024)) }}GB</a
              >
            </span>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.mcData.double_precision_tflops > 0" class="td">
            <span class="fs16">
              {{ $t("list_double_precision_tflops") }}：
              <a class="cPrimaryColor"
                >{{ item.mcData.double_precision_tflops }}TFLOPS</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_pcie_bandwidth") }}：
              <a class="cPrimaryColor"
                >{{
                  parseInt(item.mcData.pcie_bandwidth / (1024 * 1024))
                }}GB/s</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_inet_down") }}：
              <a class="cPrimaryColor"
                >{{ parseInt(item.mcData.inet_down / 1024) }}Mbps</a
              >
            </span>
          </div>
          <div class="td3">
            <span class="fs16">
              {{ $t("list_os") }}：
              <a class="cPrimaryColor">{{ item.mcData.os }}</a>
            </span>
          </div>
        </div>
      </div>

      <div class="tools-head">
        <div class="l-wrap" v-if="item.mcData.dbc_version === '0.3.7.2'">
          <span class="cRed">{{ $t("dbc_vesion_error") }}</span>
        </div>
        <div class="l-wrap" v-else>
          <span class="cRed" v-if="!item.mcData.idle_status">{{
            $t("no_idle_gpus")
          }}</span>
          <span class="cRed" v-if="!item.mcData.can_create_cpu_container">{{
            $t("no_container")
          }}</span>
        </div>
        <div class="r-wrap">
          <el-button
            style="width: 140px"
            type="primary"
            size="mini"
            @click="openDlg_stop_to_gpu(item, index)"
            :loading="rentLoading_gpu && rentLoading_index === index"
            :disabled="
              item.mcData.dbc_version === '0.3.7.2' || !item.mcData.idle_status
            "
            >{{ $t("open_gpu_stopped") }}</el-button
          >
          <el-button
            v-if="item.mcData.usage_type === 0"
            style="width: 140px"
            type="primary"
            size="mini"
            :disabled="
              item.mcData.dbc_version === '0.3.7.2' ||
              !item.mcData.can_create_cpu_container
            "
            @click="openDlg_stop_to_cpu_switch(item, index)"
            :loading="rentLoading_cpu && rentLoading_index === index"
            >{{ $t("open_cpu_stopped") }}</el-button
          >
        </div>
      </div>
    </div>
    <dlg-leasegpu
      :open.sync="dlg_opengpu"
      :place-order-data="placeOrderData"
      @confirm="createOrder"
    ></dlg-leasegpu>
    <dlg-leaseswitchcpu
      :open.sync="dlg_openswitchcpu"
      :place-order-data="placeOrderData"
      @confirm="switch_cpu_mode"
    ></dlg-leaseswitchcpu>
    <dlg-leasecpupayment
      :open.sync="dlg_opencpupayment"
      :place-order-data="placeOrderData"
      @confirm="createOrder"
    ></dlg-leasecpupayment>
    <dlg-leasecpudeposit
      :open.sync="dlg_opencpudeposit"
      :place-order-data="placeOrderData"
      @confirm="createOrder"
    ></dlg-leasecpudeposit>
  </div>
</template>

<script>
import cookie from "js-cookie";
import DlgReload from "@/components/machine/dlg_reload";
import DlgHd from "@/components/machine/dlg_increaseHD";
import DlgMail from "@/components/machine/dlg_bindMail";
import DlgUnsubscribe from "@/components/machine/dlg_unsubscribe";
import DlgRestart from "@/components/machine/dlg_restart";
import DlgRate from "@/components/machine/dlg_rate";
import DlgReturnDbc from "@/components/machine/dlg_returnDbc";
import DlgContinuepay from "@/components/machine/dlg_continuepay";
import DlgLeasecputogpu from "@/components/machine/dlg_leasecputogpu";
import DlgLeasecpudeposit from "@/components/machine/dlg_leasecpudeposit";
import DlgLeasecpupayment from "@/components/machine/dlg_leasecpupayment";
import DlgLeasegpu from "@/components/machine/dlg_leasegpu";
import DlgLeaseswitchcpu from "@/components/machine/dlg_leaseswitchcpu";
import {
  queryBindMail_rent,
  continue_pay_get_dbc_price,
  continue_pay_get_pay_dbc_count,
  continue_pay_create_order,
  continue_pay_place_order,
  query_machine_by_wallet,
  get_create_container_time,
  get_dbchain_address,
  get_all_order_be_stopped,
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
  get_dbc_price,
  create_order,
  pay_update,
  update_container_is_ok,
  place_order_stop_to_gpu_new,
  place_order_stop_to_cpu_new,
  get_gpu_order_id_list,
  get_cpu_order_id_list,
} from "@/api";

import {
  getAccount,
  transfer,
  getBalance,
  getCookie,
  getUsdToRmb,
} from "@/utlis";

export default {
  name: "myMachine_unlock_stopped",
  components: {
    DlgReload,
    DlgHd,
    DlgMail,
    DlgUnsubscribe,
    DlgRestart,
    DlgRate,
    DlgReturnDbc,
    DlgContinuepay,
    DlgLeasecputogpu,
    DlgLeasecpudeposit,
    DlgLeasecpupayment,
    DlgLeaseswitchcpu,
    DlgLeasegpu,
  },
  data() {
    return {
      orderCount: 0,
      usdToRmb: getUsdToRmb(),
      styleHidden: {},
      rentLoading_index: -1,
      rateValue: undefined,
      dlgReload_open: false,
      dlgHD_open: false,
      dlgMail_open: false,

      dlgRate_open: false,

      openContinueDlg: false,
      isNewMail: false,
      isBinding: false,
      isBinded: false,
      placeOrderData: undefined,

      dlg_open_cpu_to_gpu: false,
      bindMail: "",

      res_body: {
        content: [],
      },
      isPaying: false,
      local_pay_error: false,
      ispayPocing: false,
      isPocing: false,
      curItem: undefined,
      isRateEdit: false,
      si: undefined,
      queryOrderListSi: undefined,
      container_tips: "",
      dlg_openswitchcpu: false,
      dlg_opengpu: false,
      dlg_opencpupayment: false,
      dlg_opencpudeposit: false,
      rentLoading_cpu: false,
      rentLoading_gpu: false,
    };
  },
  watch: {
    "$i18n.locale"() {
      this.queryOrderList().then((res) => {
        if (res.status === 1) {
          this.forceToPocMachineUpdate();
        }
        //  pocMachine();
      });
      if (this.queryOrderListSi) {
        clearInterval(this.queryOrderListSi);
      }
      let timesRun = 0;
      this.queryOrderListSi = setInterval(() => {
        timesRun += 1;
        if (timesRun === 10) {
          clearInterval(this.queryOrderListSi);
        }
        if (this.isPaying !== true) {
          this.queryOrderList();
          this.forceToPocMachineUpdate();
        }
      }, 15000);
    },
  },
  beforeMount() {
    if (this.$t("website_name") === "congTuCloud") {
      this.styleHidden.visibility = "hidden";
    }
  },
  activated() {
    // this.binding(isNewMail);

    this.queryMail();
    this.queryOrderList().then((res) => {
      if (res.status === 1) {
        this.forceToPocMachineUpdate();
      }
      //  pocMachine();
    });
    if (this.queryOrderListSi) {
      clearInterval(this.queryOrderListSi);
    }
    let timesRun = 0;
    this.queryOrderListSi = setInterval(() => {
      timesRun += 1;
      if (timesRun === 10) {
        clearInterval(this.queryOrderListSi);
      }
      if (this.isPaying !== true) {
        this.queryOrderList();
        this.forceToPocMachineUpdate();
      }
    }, 15000);
  },
  deactivated() {
    if (this.queryOrderListSi) {
      clearInterval(this.queryOrderListSi);
    }
    if (this.si) {
      clearInterval(this.si);
    }
  },
  computed: {
    rentNumber() {
      return this.res_body.content.filter((item) => {
        return item.orderData.rent_success;
      }).length;
    },
  },
  methods: {
    // 打开gpu弹窗
    openDlg_stop_to_gpu(item, index) {
      if (this.$t("website_name") === "congTuCloud") {
        //  获取数据库中当前用户邮箱的 order_id
        if (!getCookie("email")) {
          this.$router.push("/" + "login");
          return;
        }

        this.rentLoading_gpu = true;
        this.$forceUpdate();
        this.rentLoading_index = index;
        const user_name_platform = this.$t("website_name");
        const language = this.$i18n.locale;
        place_order_stop_to_gpu_new({
          email: getCookie("email"),
          machine_type: item.orderData.machine_type,
          machine_id: item.orderData.machine_id,
          wallet_address_user: "tmp",
          order_id_pre: item.orderData.order_id,
          user_name_platform,
          language,
        })
          .then((res_1) => {
            if (res_1.status === 1) {
              this.placeOrderData = res_1.content;
              this.placeOrderData.dbc_price = 0.0026;
              return get_dbc_price({
                order_id: this.placeOrderData.order_id,
                user_name_platform,
                language,
              });
            } else {
              this.$message({
                showClose: true,
                message: res_1.msg,
                type: "error",
              });
              return Promise.reject(res_1.msg);
            }
          })
          .then((res_2) => {
            if (res_2.status === 1) {
              this.placeOrderData.dbc_price = res_2.content;
              this.dlg_opengpu = true;
            } else {
              this.$message({
                showClose: true,
                message: res_2.msg,
                type: "success",
              });
              return Promise.reject(res_2.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.rentLoading_gpu = false;
            this.rentLoading_index = -1;
          });
      } else {
        if (!getAccount()) {
          this.$message({
            showClose: true,
            message: this.$t("pleae_create_wallet"),
            type: "error",
          });
          return;
        }

        this.rentLoading_gpu = true;
        this.$forceUpdate();
        this.rentLoading_index = index;
        const user_name_platform = this.$t("website_name");
        const language = this.$i18n.locale;
        place_order_stop_to_gpu_new({
          machine_type: item.orderData.machine_type,
          machine_id: item.orderData.machine_id,
          wallet_address_user: getAccount().address,
          order_id_pre: item.orderData.order_id,
          user_name_platform,
          language,
        })
          .then((res_1) => {
            if (res_1.status === 1) {
              this.placeOrderData = res_1.content;
              this.placeOrderData.dbc_price = 0.0026;
              return get_dbc_price({
                order_id: this.placeOrderData.order_id,
                user_name_platform,
                language,
              });
            } else {
              this.$message({
                showClose: true,
                message: res_1.msg,
                type: "error",
              });
              return Promise.reject(res_1.msg);
            }
          })
          .then((res_2) => {
            if (res_2.status === 1) {
              this.placeOrderData.dbc_price = res_2.content;
              this.dlg_opengpu = true;
            } else {
              this.$message({
                showClose: true,
                message: res_2.msg,
                type: "success",
              });
              return Promise.reject(res_2.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.rentLoading_gpu = false;
            this.rentLoading_index = -1;
          });
      }
    },

    openDlg_stop_to_cpu_switch(item, index) {
      // 聪图云模式下
      if (this.$t("website_name") === "congTuCloud") {
        //  获取数据库中当前用户邮箱的 order_id
        if (!getCookie("email")) {
          this.$router.push("/" + "login");
          return;
        }
        this.dlg_openswitchcpu = false;
        this.$forceUpdate();
        this.placeOrderData = item.orderData;
        this.placeOrderData.index = index;
        item = this.placeOrderData;
        item.switch_cpu_mode = "payment";
        this.switch_cpu_mode(item);
      } else {
        if (!getAccount()) {
          // this.$router.push(`/openWallet/${type}`);
          this.$message({
            showClose: true,
            message: this.$t("pleae_create_wallet"),
            type: "error",
          });
          return;
        }

        this.dlg_openswitchcpu = true;
        this.$forceUpdate();
        this.placeOrderData = item.orderData;
        this.placeOrderData.index = index;
        //   confirm_new("", this.$t("cpu_mode_switch"));
        //    this.confirm_new("xxx", this.$t("cpu_mode_switch"), item);
      }
    },

    switch_cpu_mode(item) {
      this.dlg_openswitchcpu = false;
      if (item.switch_cpu_mode === "payment") {
        this.to_payment(item, item.index);
      } else if (item.switch_cpu_mode === "deposit") {
        this.to_deposit(item, item.index);
      }
    },

    to_payment(item, index) {
      if (this.$t("website_name") === "congTuCloud") {
        //  获取数据库中当前用户邮箱的 order_id
        if (!getCookie("email")) {
          this.$router.push("/" + "login");
          return;
        }
        this.rentLoading_cpu = true;
        this.rentLoading_index = index;
        const user_name_platform = this.$t("website_name");
        const language = this.$i18n.locale;
        place_order_stop_to_cpu_new({
          email: getCookie("email"),
          machine_type: item.machine_type,
          machine_id: item.machine_id,
          wallet_address_user: "tmp",
          mode: "payment",
          order_id_pre: item.order_id,
          user_name_platform,
          language,
        })
          .then((res_1) => {
            if (res_1.status === 1) {
              this.placeOrderData = res_1.content;
              this.placeOrderData.dbc_price = 0.0026;
              return get_dbc_price({
                order_id: this.placeOrderData.order_id,
                user_name_platform,
                language,
              });
            } else {
              this.$message({
                showClose: true,
                message: res_1.msg,
                type: "error",
              });
              return Promise.reject(res_1.msg);
            }
          })
          .then((res_2) => {
            if (res_2.status === 1) {
              this.placeOrderData.dbc_price = res_2.content;
              this.dlg_opencpupayment = true;
            } else {
              this.$message({
                showClose: true,
                message: res_2.msg,
                type: "success",
              });
              return Promise.reject(res_2.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.rentLoading_cpu = false;
            this.rentLoading_index = -1;
          });
      } else {
        if (!getAccount()) {
          // this.$router.push(`/openWallet/${type}`);
          this.$message({
            showClose: true,
            message: this.$t("pleae_create_wallet"),
            type: "error",
          });
          return;
        }
        this.rentLoading_cpu = true;
        this.rentLoading_index = index;
        const user_name_platform = this.$t("website_name");
        const language = this.$i18n.locale;
        place_order_stop_to_cpu_new({
          machine_type: item.machine_type,
          machine_id: item.machine_id,
          wallet_address_user: getAccount().address,
          mode: "payment",
          order_id_pre: item.order_id,
          user_name_platform,
          language,
        })
          .then((res_1) => {
            if (res_1.status === 1) {
              this.placeOrderData = res_1.content;
              this.placeOrderData.dbc_price = 0.0026;
              return get_dbc_price({
                order_id: this.placeOrderData.order_id,
                user_name_platform,
                language,
              });
            } else {
              this.$message({
                showClose: true,
                message: res_1.msg,
                type: "error",
              });
              return Promise.reject(res_1.msg);
            }
          })
          .then((res_2) => {
            if (res_2.status === 1) {
              this.placeOrderData.dbc_price = res_2.content;
              this.dlg_opencpupayment = true;
            } else {
              this.$message({
                showClose: true,
                message: res_2.msg,
                type: "success",
              });
              return Promise.reject(res_2.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.rentLoading_cpu = false;
            this.rentLoading_index = -1;
          });
      }
    },

    to_deposit(item, index) {
      this.rentLoading_cpu = true;
      this.rentLoading_index = index;
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      place_order_stop_to_cpu_new({
        machine_type: item.machine_type,
        machine_id: item.machine_id,
        wallet_address_user: getAccount().address,
        order_id_pre: item.order_id,
        user_name_platform,
        mode: "deposit",
        language,
      })
        .then((res_1) => {
          if (res_1.status === 1) {
            this.placeOrderData = res_1.content;
            this.placeOrderData.dbc_price = 0.0026;
            return get_dbc_price({
              order_id: this.placeOrderData.order_id,
              user_name_platform,
              language,
            });
          } else {
            this.$message({
              showClose: true,
              message: res_1.msg,
              type: "error",
            });
            return Promise.reject(res_1.msg);
          }
        })
        .then((res_2) => {
          if (res_2.status === 1) {
            this.placeOrderData.dbc_price = res_2.content;
            this.dlg_opencpudeposit = true;
          } else {
            this.$message({
              showClose: true,
              message: res_2.msg,
              type: "success",
            });
            return Promise.reject(res_2.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.rentLoading_cpu = false;
          this.rentLoading_index = -1;
        });
    },

    pushContinuePayDetail(order_id, order_is_over) {
      this.$router.push(
        "/continuePayDetail?order_id=" +
          order_id +
          "&order_is_over=" +
          order_is_over
      );
    },

    // create order
    createOrder(params) {
      const loading = this.$loading();
      create_order(params)
        .then((res) => {
          if (res.status === 1) {
            this.$message({
              showClose: true,
              message: this.$t("list_create_order_success"),
              type: "success",
            });
            this.dlg_openswitchcpu = false;
            this.dlg_opengpu = false;
            this.dlg_opencpupayment = false;
            this.dlg_opencpudeposit = false;
            if (params.gpu_count === 0) {
              this.$router.push("/mymachine/myMachine_cpu");
            } else {
              this.$router.push("/mymachine/myMachine");
            }
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
          }
        })
        .finally(() => {
          loading.close();
        });
    },

    forceToPay() {
      // console.log('调用强制支付')
      // 判断如果有订单没有支付完成，强制支付
      const order = this.res_body.content.find((item, index) => {
        // console.log(index)
        // console.log(item.orderData.creating_container)
        // console.log(item.orderData.container_is_exist)
        return (
          !item.orderData.order_is_over &&
          !item.orderData.order_is_cancer &&
          !item.orderData.rent_success &&
          !item.orderData.vocing_pay &&
          (item.orderData.creating_container ||
            item.orderData.container_is_exist)
        );
      });
      if (order) {
        this.payOrder(order);
      }
    },
    isShowRendSuccessMsg(milli_rent_success_time) {
      const minutes =
        (new Date().getTime() - milli_rent_success_time) / 1000 / 60;
      return minutes < 10;
    },

    forceToPocMachineUpdate() {
      // pay before
      const order = this.res_body.content.find((item, index) => {
        // console.log(index)
        // console.log(item.orderData.creating_container)
        // console.log(item.orderData.container_is_exist)
        return (
          item.orderData.order_id_pre !== null &&
          !item.orderData.order_is_over &&
          !item.orderData.order_is_cancer &&
          !item.orderData.rent_success &&
          item.orderData.pay_success &&
          !item.orderData.container_is_exist
        );
      });
      if (order) {
        this.pocMachineUpdate(order);
      }
    },

    pocMachineUpdate(item) {
      this.isPocing = true;
      clearInterval(this.si);
      item.orderData.creating_container = true;
      this.ispayPocing = false;
      item.orderData.vocing_pay = false;
      this.si = setInterval(() => {
        //   if (item.orderData.isPocing) {
        //     return;
        //   }
        const user_name_platform = this.$t("website_name");
        const language = this.$i18n.locale;
        return update_container_is_ok({
          order_id: item.orderData.order_id,
          user_name_platform,
          language,
        }).then((res) => {
          if (res.status === 1 && res.content) {
            console.log(res.msg);
            item.notice = "";
            this.queryOrderList();
            clearInterval(this.si);
          } else if (res.status === 2) {
            // item.orderData.creating_container = true;
            this.queryOrderList();
          } else if (res.status == -1 && res.code == 10303) {
            this.container_tips = res.msg;
            clearInterval(this.si);
          } else if (!res.content) {
            this.queryOrderList();
            clearInterval(this.si);
          } else {
            this.queryOrderList();
            clearInterval(this.si);

            return Promise.reject({
              status: -1,
              msg: res.msg,
            });
          }

          if (item.orderData.order_is_cancer) {
            clearInterval(this.si);
          }
        });
      }, 5000);
    },

    forceToPocIsPayed() {
      // pay before
      const order = this.res_body.content.find((item, index) => {
        // console.log(index)
        // console.log(item.orderData.creating_container)
        // console.log(item.orderData.container_is_exist)
        return (
          !item.orderData.order_is_over &&
          !item.orderData.order_is_cancer &&
          !item.orderData.rent_success &&
          !item.orderData.vocing_pay &&
          !item.orderData.pay_error &&
          item.orderData.container_is_exist
        );
      });
      if (order) {
        this.pocIsPayed(order);
      }
    },
    pocIsPayed(item) {
      this.PocingPayed = true;
      clearInterval(this.si);
      //item.orderData.creating_container = true;
      this.si = setInterval(() => {
        //   if (item.orderData.isPocing) {
        //     return;
        //   }
        const user_name_platform = this.$t("website_name");
        const language = this.$i18n.locale;
        return can_rent_this_machine({
          order_id: item.orderData.order_id,
          user_name_platform,
          language,
        }).then((res) => {
          if (res.status === 1 && res.content) {
            console.log(res.msg);
            item.notice = "";
            this.queryOrderList();
            clearInterval(this.si);
          } else if (res.status === 2) {
            // item.orderData.creating_container = true;
            this.queryOrderList();
            return Promise.reject({
              status: 2,
              msg: "正在验证机器环境是否可用，请耐心等待，大概需要1-3分钟",
            });
          } else if (!res.content) {
            this.queryOrderList();
            clearInterval(this.si);
            return Promise.reject({
              status: -1,
              msg: "机器可能已经被租用，请取消订单，重新租用其他机器",
            });
          } else {
            this.queryOrderList();
            clearInterval(this.si);
            return Promise.reject({
              status: -1,
              msg: res.msg,
            });
          }

          if (item.orderData.order_is_cancer) {
            clearInterval(this.si);
          }
        });
      }, 5000);
    },
    pocMachine(item) {
      this.isPocing = true;
      clearInterval(this.si);
      item.orderData.creating_container = true;
      this.si = setInterval(() => {
        //   if (item.orderData.isPocing) {
        //     return;
        //   }
        const user_name_platform = this.$t("website_name");
        const language = this.$i18n.locale;
        return can_rent_this_machine({
          order_id: item.orderData.order_id,
          user_name_platform,
          language,
        }).then((res) => {
          if (res.status === 1 && res.content) {
            console.log(res.msg);
            item.notice = "";
            this.queryOrderList();
            clearInterval(this.si);
          } else if (res.status === 2) {
            // item.orderData.creating_container = true;
            this.queryOrderList();
            return Promise.reject({
              status: 2,
              msg: "正在验证机器环境是否可用，请耐心等待，大概需要3分钟",
            });
          } else if (res.status == -1 && res.code == 10303) {
            this.container_tips = res.msg;
            clearInterval(this.si);
          } else if (!res.content) {
            this.queryOrderList();
            clearInterval(this.si);
            return Promise.reject({
              status: -1,
              msg: "机器可能已经被租用，请取消订单，重新租用其他机器",
            });
          } else {
            this.queryOrderList();
            clearInterval(this.si);

            return Promise.reject({
              status: -1,
              msg: res.msg,
            });
          }

          if (item.orderData.order_is_cancer) {
            clearInterval(this.si);
          }
        });
      }, 5000);
    },

    paid(item) {
      clearInterval(this.si);

      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      // const txid = res.response.txid;
      item.orderData.vocing_pay = true;
      this.ispayPocing = true;
      this.si = setInterval(() => {
        return pay({
          order_id: item.orderData.order_id,
          //  dbc_hash: txid,
          user_name_platform,
          language,
        })
          .then((res) => {
            this.queryOrderList();
            if (res.status === 1) {
              clearInterval(this.si);
              this.ispayPocing = false;
              item.orderData.vocing_pay = false;
              this.queryOrderList();
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
              clearInterval(this.si);
            } else if (err) {
              console.log("其他报错");
              console.log(err);
              clearInterval(this.si);
            }
          });
      }, 5000);
    },

    // pay
    payOrder(item) {
      clearInterval(this.si);

      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      get_dbchain_address({
        order_id: item.orderData.order_id,
        user_name_platform,
        language,
      }).then((res) => {
        if (res.status === 1 && res.content) {
          const amount =
            item.orderData.dbc_total_count + item.orderData.code * 1;
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
                item.orderData.vocing_pay = true;
                const user_name_platform = this.$t("website_name");
                const language = this.$i18n.locale;
                this.ispayPocing = true;
                // 支付后确认
                if (item.orderData.order_id_pre === null) {
                  this.si = setInterval(() => {
                    return pay({
                      order_id: item.orderData.order_id,
                      dbc_hash: txid,
                      user_name_platform,
                      language,
                    })
                      .then((res) => {
                        this.queryOrderList();
                        if (res.status === 1) {
                          clearInterval(this.si);
                          this.ispayPocing = false;
                          item.orderData.vocing_pay = false;
                          this.queryOrderList();
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
                          clearInterval(this.si);
                        } else if (err) {
                          console.log("其他报错");
                          console.log(err);
                          clearInterval(this.si);
                        }
                      });
                  }, 5000);
                } else {
                  this.si = setInterval(() => {
                    return pay_update({
                      order_id: item.orderData.order_id,
                      dbc_hash: txid,
                      user_name_platform,
                      language,
                    })
                      .then((res) => {
                        this.queryOrderList();
                        if (res.status === 1) {
                          clearInterval(this.si);

                          if (this.queryOrderListSi) {
                            clearInterval(this.queryOrderListSi);
                          }
                          this.queryOrderListSi = setInterval(() => {
                            if (this.isPaying !== true) {
                              this.queryOrderList();
                              this.forceToPocMachineUpdate();
                            }
                          }, 10000);
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
                          clearInterval(this.si);
                        } else if (err) {
                          console.log("其他报错");
                          console.log(err);
                          clearInterval(this.si);
                        }
                        if (this.queryOrderListSi) {
                          clearInterval(this.queryOrderListSi);
                        }
                        this.queryOrderListSi = setInterval(() => {
                          if (this.isPaying !== true) {
                            this.queryOrderList();
                            this.forceToPocMachineUpdate();
                          }
                        }, 10000);
                      });
                  }, 5000);
                }
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
            msg: "机器可能已经被租用，请取消订单，重新租用其他机器",
          });
        }
      });
      // pay

      //  }, 5000);
    },

    queryOrderList() {
      // 聪图云模式下
      if (this.$t("website_name") === "congTuCloud") {
        //  获取数据库中当前用户邮箱的 order_id
        if (!getCookie("email")) {
          this.$router.push("/" + "login");
          return;
        }
        let wallet_address_user = "tmp";
        const user_name_platform = this.$t("website_name");
        const language = this.$i18n.locale;
        const promiseList = [
          query_machine_by_wallet({
            wallet_address_user,
            user_name_platform,
            language,
          }),
          get_all_order_be_stopped({
            wallet_address_user,
            user_name_platform,
            language,
          }),
          get_gpu_order_id_list({
            email: getCookie("email"),
            language,
          }),
          get_cpu_order_id_list({
            email: getCookie("email"),
            language,
          }),
        ];
        return Promise.all(promiseList)
          .then(([res_1, res_2, res_3, res_4]) => {
            console.log(
              "Promise>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
            );
            console.log(res_1);
            console.log(res_2);
            console.log(res_3);
            console.log(res_4);
            this.res_body.content = [];
            if (res_2.content) {
              res_2.content.forEach((item) => {
                const mcItem = res_1.content.find(
                  (mc) => item.machine_id === mc.machine_id
                );
                if (mcItem) {
                  // 显示GPU订单
                  for (let i of res_3.content) {
                    if (i.order_id === item.order_id) {
                      this.res_body.content.push({
                        verifing: false,
                        notice: "",
                        orderData: item,
                        mcData: mcItem,
                      });
                      this.orderCount = this.res_body.content.length;
                    }
                  }
                  // 显示CPU订单
                  for (let i of res_4.content) {
                    if (i.order_id === item.order_id) {
                      this.res_body.content.push({
                        verifing: false,
                        notice: "",
                        orderData: item,
                        mcData: mcItem,
                      });
                      this.orderCount = this.res_body.content.length;
                    }
                  }
                }
              });
            }
            return Promise.resolve({
              status: 1,
            });
          })
          .catch((err) => {
            if (err) {
              console.log(err);
            }
          });
      } else {
        if (!getAccount()) {
          this.$router.push(`/openWallet/${type}`);
          return;
        }
        let wallet_address_user = getAccount().address;
        const user_name_platform = this.$t("website_name");
        const language = this.$i18n.locale;
        const promiseList = [
          query_machine_by_wallet({
            wallet_address_user,
            user_name_platform,
            language,
          }),
          get_all_order_be_stopped({
            wallet_address_user,
            user_name_platform,
            language,
          }),
        ];
        return Promise.all(promiseList)
          .then(([res_1, res_2]) => {
            // console.log(
            //   "Promise>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
            // );
            // console.log(res_1);
            // console.log(res_2);
            this.res_body.content = [];
            if (res_2.content) {
              res_2.content.forEach((item) => {
                const mcItem = res_1.content.find(
                  (mc) => item.machine_id === mc.machine_id
                );
                if (mcItem) {
                  this.res_body.content.push({
                    verifing: false,
                    notice: "",
                    orderData: item,
                    mcData: mcItem,
                  });
                }
              });
            }
            return Promise.resolve({
              status: 1,
            });
          })
          .catch((err) => {
            if (err) {
              console.log(err);
            }
          });
      }
    },
    pushDetail(machine_id) {
      this.$router.push("/machineDetail?machine_id=" + machine_id);
    },
    openDlgMail(isNewMail) {
      getBalance().then((res) => {
        this.balance = res.balance;
        if (this.balance < 1) {
          this.$message({
            showClose: true,
            message: this.$t("dlg_bindMail_no_dbc"),
            type: "error",
          });
        } else {
          this.isNewMail = isNewMail;
          this.dlgMail_open = true;
        }
      });
    },
    //
    queryMail() {
      this.bindMail = cookie.get("mail");
      let address = "tmp";
      if (this.$t("website_name") != "congTuCloud") {
        address = getAccount().address;
      }
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      queryBindMail_rent({
        wallet_address: address,
        user_name_platform,
        language,
      }).then((res) => {
        if (res.status === 1) {
          this.bindMail = res.content;
          cookie.set("mail", res.content);
        } else {
          binding_is_ok({
            wallet_address: address,
            user_name_platform,
            language,
          }).then((ren) => {
            if (ren.status === 2) {
              this.isBinding = true;
            }
          });
          binding_is_ok_modify({
            wallet_address: address,
            user_name_platform,
            language,
          }).then((ren) => {
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
              language,
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
              language,
            });
            if (res.status === 1) {
              clearInterval(si);
              this.bindSuccess();
            }
          }
        }
        binding = true;
      }, 15000);
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
    openRateDlg(item) {
      this.curItem = item;
      this.dlgRate_open = true;
    },
    successRate() {
      this.queryOrderList();
    },

    returnSuccess() {
      this.queryOrderList();
    },
  },
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
  .tdred {
    display: inline-block;
    width: 33.3%;
    color: $textColor_red;
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
