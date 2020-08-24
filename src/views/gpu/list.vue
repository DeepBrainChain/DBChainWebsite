<template>
  <div class="machine">
    <div class="machineData-wrap">
      <drop-item
        v-model="req_body.country"
        class="machine-item"
        :title="$t('list_country')"
        :drop-list="countries"
        @selected="queryMc"
      ></drop-item>
      <!--      <drop-item class="machine-item" title="Image" :dropList="images"></drop-item>-->

      <drop-item
        class="machine-item"
        :title="$t('have_ip_title')"
        v-model="req_body.have_ip"
        :dropList="have_ip"
        @selected="queryMc"
      ></drop-item>
      <drop-item
        class="machine-item"
        :title="$t('idle_status')"
        v-model="req_body.idle_status"
        :dropList="idle_status"
        @selected="queryMc"
      ></drop-item>
      <slide-item
        class="machine-item"
        :title="$t('length_of_available_time')"
        v-model="lengthOfAvailableTimeVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showlengthOfAvailableTime}}</slide-item>
      <slide-item
        class="machine-item"
        :title="$t('total_time')"
        v-model="totalTimeVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showTotalTime}}</slide-item>
      <slide-item
        class="machine-item"
        :title="$t('disk_space')"
        v-model="diskSpaceVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showDiskSpace}}</slide-item>
      <slide-item
        class="machine-item"
        :title="$t('gpu_price_dollar')"
        v-model="gpuPriceVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showGpuPrice}}</slide-item>
      <slide-item
        class="machine-item"
        :title="$t('gpu_count')"
        v-model="gpuCountVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showGpuCount}}</slide-item>
      <slide-item
        class="machine-item"
        :title="$t('total_rent_count')"
        v-model="total_rent_count_CountVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{show_total_rent_count}}</slide-item>
      <slide-item
        class="machine-item"
        :title="$t('error_rent_count')"
        v-model="error_rent_count_CountVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{show_error_rent_count}}</slide-item>
      <slide-item
        class="machine-item"
        :title="$t('tensor_cores')"
        v-model="tensor_cores_CountVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{show_tensor_cores_count}}</slide-item>
      <slide-item
        class="machine-item"
        :title="$t('half_precision_tflops')"
        v-model="half_tflopsVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{half_showTflops}}</slide-item>
      <slide-item
        class="machine-item"
        :title="$t('single_precision_tflops')"
        v-model="single_tflopsVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{single_showTflops}}</slide-item>
      <slide-item
        class="machine-item"
        :title="$t('double_precision_tflops')"
        v-model="double_tflopsVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{double_showTflops}}</slide-item>
      <slide-item
        class="machine-item"
        :title="$t('gpu_ram_size')"
        v-model="gpuRamSizeVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showGpuRamSize}}</slide-item>
      <slide-item
        class="machine-item"
        :title="$t('gpu_ram_bandwidth')"
        v-model="gpuRamBandwidthVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showGpuRamBandwidth}}</slide-item>
      <slide-item
        class="machine-item"
        :title="$t('pcie_bandwidth')"
        v-model="piceBandwidthVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showPiceBandwidth}}</slide-item>
      <slide-item
        class="machine-item"
        :title="$t('cpu_numbers')"
        v-model="cpuCoresVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showCpuCores}}</slide-item>
      <slide-item
        class="machine-item"
        :title="$t('ram_size')"
        v-model="cpuRamSizeVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showCpuRamSize}}</slide-item>
      <slide-item
        class="machine-item"
        :title="$t('disk_bandwidth')"
        v-model="diskBandwidthVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showDiskBandwidth}}</slide-item>
      <slide-item
        class="machine-item"
        :title="$t('inet_up')"
        v-model="inetUpVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showInetUp}}</slide-item>
      <slide-item
        class="machine-item"
        :title="$t('inet_down')"
        v-model="inetDownVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showInetDown}}</slide-item>
    </div>
    <ul>
      <li v-for="(item, index) in res_body.content" v-if="item.online_status" class="info-wrap">
        <div v-if="item.evaluation_score_average > 0" class="flex vCenter">
          <el-rate :value="item.evaluation_score_average/2"></el-rate>
          <span>{{item.evaluation_score_average}}</span>
        </div>
        <div class="flex status-title">
          <div>
            <el-button
              plain
              class="is-link"
              @click="pushDetail(item.machine_id)"
            >{{item.machine_id}}</el-button>
            <span class="fs28">
              <span
                class="cRedbig"
              >&nbsp;&nbsp;$ {{item.gpu_price_dollar }}/{{$t('my_machine_hour')}}</span>
            </span>
          </div>
          <div class="td4">
            <span class="fs16">
              {{$t('list_dbc_version')}}：
              <a class="cPrimaryColor">{{item.dbc_version}}</a>
            </span>
          </div>
          <div>
            <el-button
              style="width: 70px"
              plain
              size="mini"
              @click="openTry(item,index)"
              :disabled="!item.idle_status||item.can_rent_start_time_later<0"
              :loading="try_rentLoading && try_rent_index===index "
            >{{$t('list_try')}}</el-button>
            <el-button
              style="width: 150px"
              type="primary"
              size="mini"
              @click="openDlg_gpu(item,index)"
              :disabled="!item.idle_status||item.can_rent_start_time_later<0"
              :loading="rentLoading_gpu && rent_index===index"
            >{{$t('list_rentout_gpu')}}</el-button>
            <el-button
              style="width: 150px"
              type="primary"
              size="mini"
              v-if="item.dbc_version!=='0.3.7.2' && item.usage_type===0"
              @click="openDlg_cpu_switch(item,index)"
              :disabled="!item.can_create_cpu_container||item.can_rent_start_time_later<0"
              :loading="rentLoading_cpu&& rent_index===index"
            >{{$t('list_rentout_cpu')}}</el-button>
          </div>
        </div>
        <div class="flex">
          <div class="td2">
            <el-tooltip class="item" effect="dark" :content="$t('list_gpu_count_tip')">
              <span class="fs28">
                <a class="cPrimaryColor">{{item.gpu_type}}</a>
                <a class="cRedbig">x{{item.gpu_count}} GPU</a>
              </span>
            </el-tooltip>
          </div>
          <div class="td2">
            <span class="fs28">
              <a class="cPrimaryColor">{{item.country}}</a>
            </span>
          </div>
          <div class="td" v-if="item.can_rent_start_time_later<0">
            <span class="fs16">
              <a class="cPrimaryColor">{{-item.can_rent_start_time_later}}</a>
              {{$t('list_start_rentout')}}
            </span>
          </div>
        </div>
        <div class="flex">
          <div class="td5">
            <el-tooltip class="item" effect="dark" :content="$t('month_discount_instruction')">
              <span class="fs28">
                <a
                  class="cPrimaryColor"
                >{{$t('month_discount')}}:{{item.discount_month}}%&nbsp;&nbsp;</a>
              </span>
            </el-tooltip>
          </div>
          <div class="td5">
            <el-tooltip class="item" effect="dark" :content="$t('quarter_discount_instruction')">
              <span class="fs28">
                <a
                  class="cPrimaryColor"
                >{{$t('quarter_discount')}}:{{item.discount_quarter}}%&nbsp;&nbsp;</a>
              </span>
            </el-tooltip>
          </div>
          <div class="td5">
            <el-tooltip class="item" effect="dark" :content="$t('year_discount_instruction')">
              <span class="fs28">
                <a class="cPrimaryColor">{{$t('year_discount')}}:{{item.discount_year}}%&nbsp;&nbsp;</a>
              </span>
            </el-tooltip>
          </div>
          <div class="td5">
            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('rentout_machine_whole_instruction')"
              v-if="item.gpu_rentout_whole"
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
            <el-tooltip class="item" effect="dark" :content="$t('deposite_dbc_count_instruction')">
              <span class="fs28">
                <a
                  class="cPrimaryColor"
                >{{$t('compensation_dbc_count')}}:{{item.rentout_deposite_dbc_count/item.gpu_count}}</a>
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
              >{{item.gpu_count - item.gpu_be_used}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('list_length_of_available_time')}}：
              <a
                class="cPrimaryColor"
              >{{Math.floor(item.length_of_available_time)}}{{$t('my_machine_hour')}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('list_total_time_be_used')}}：
              <a
                class="cPrimaryColor"
              >{{$minsToHourMins(item.total_time_be_used)}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('list_total_rent_count')}}：
              <a class="cPrimaryColor">{{item.total_rent_count}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('list_error_rent_count')}}：
              <a class="cPrimaryColor">{{item.error_rent_count}}</a>
            </span>
          </div>
        </div>

        <div class="flex" v-if="item.dbc_version!=='0.3.7.2'">
          <div class="td">
            <span class="fs16">
              {{$t('cpu_containers_list')}}:
              <a class="cPrimaryColor">{{item.cpu_containers}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('cpu_containers_can_use_memory_list')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.cpu_containers_can_use_memory/(1024*1024))}}G</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('cpu_containers_can_use_disk_list')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.cpu_containers_can_use_disk/(1024*1024))}}G</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('gpu_containers_can_use_memory_list')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.gpu_containers_can_use_memory/(1024*1024))}}G</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('gpu_containers_can_use_disk_list')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.gpu_containers_can_use_disk/(1024*1024))}}G</a>
            </span>
          </div>
        </div>

        <div class="flex">
          <div v-if="item.tensor_cores>0" class="td">
            <span class="fs16">
              Tensor Cores：
              <a class="cPrimaryColor">{{item.tensor_cores}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('list_cuda_version')}}：
              <a class="cPrimaryColor">{{item.cuda_version}}</a>
            </span>
          </div>
          <div class="td">
            <span v-if="item.disk_space" class="fs16">
              {{$t('list_disk_space')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.disk_space/(1024*1024))}}GB</a>
              <a class="cPrimaryColor">&nbsp;&nbsp;{{item.disk_type}}</a>
            </span>
          </div>
          <div class="td3">
            <span class="fs16">
              {{$t('list_cpu_type')}}：
              <a class="cPrimaryColor">{{item.cpu_type}}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.half_precision_tflops > 0" class="td">
            <span class="fs16">
              {{$t('list_half_precision_tflops')}}：
              <a
                class="cPrimaryColor"
              >{{item.half_precision_tflops}}TFLOPS</a>
            </span>
          </div>
          <div v-if="item.gpu_ram_size > 0" class="td">
            <span class="fs16">
              {{$t('list_gpu_ram_size')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.gpu_ram_size/(1000*1000))}}GB</a>
            </span>
          </div>
          <div v-if="item.disk_bandwidth> 0" class="td">
            <span class="fs16">
              {{$t('list_disk_bandwidth')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.disk_bandwidth/1024)}}MB/s</a>
            </span>
          </div>
          <div v-if="item.cpu_numbers> 0" class="td">
            <span class="fs16">
              {{$t('list_cpu_numbers')}}：
              <a class="cPrimaryColor">{{item.cpu_numbers}}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.single_precision_tflops > 0" class="td">
            <span class="fs16">
              {{$t('list_single_precision_tflops')}}：
              <a
                class="cPrimaryColor"
              >{{item.single_precision_tflops}}TFLOPS</a>
            </span>
          </div>
          <div v-if="item.gpu_ram_bandwidth > 0" class="td">
            <span class="fs16">
              {{$t('list_gpu_ram_bandwidth')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.gpu_ram_bandwidth/(1024*1024))}}GB/s</a>
            </span>
          </div>
          <div v-if="item.inet_up > 0" class="td">
            <span class="fs16">
              {{$t('list_inet_up')}}：
              <a class="cPrimaryColor">{{parseInt(item.inet_up/1024)}}Mbps</a>
            </span>
          </div>
          <div v-if="item.ram_size > 0" class="td">
            <span class="fs16">
              {{$t('list_ram_size')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.ram_size/(1024*1024))}}GB</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.double_precision_tflops > 0" class="td">
            <span class="fs16">
              {{$t('list_double_precision_tflops')}}：
              <a
                class="cPrimaryColor"
              >{{item.double_precision_tflops}}TFLOPS</a>
            </span>
          </div>
          <div v-if="item.pcie_bandwidth > 0" class="td">
            <span class="fs16">
              {{$t('list_pcie_bandwidth')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.pcie_bandwidth/(1024*1024))}}GB/s</a>
            </span>
          </div>
          <div v-if="item.inet_down> 0" class="td">
            <span class="fs16">
              {{$t('list_inet_down')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.inet_down/1024)}}Mbps</a>
            </span>
          </div>
          <div class="td3">
            <span class="fs16">
              {{$t('list_os')}}：
              <a class="cPrimaryColor">{{item.os}}</a>
            </span>
          </div>
        </div>
      </li>
    </ul>
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
    <!--    try-dlg-->
    <dlg-try :open.sync="dlg_open_try" @confirm="createTry"></dlg-try>
  </div>
</template>

<script>
import DropItem from "@/components/machine/dropItem";
import SlideItem from "@/components/machine/slideItem";
import DlgLeasecpudeposit from "@/components/machine/dlg_leasecpudeposit";
import DlgLeasecpupayment from "@/components/machine/dlg_leasecpupayment";
import DlgLeasegpu from "@/components/machine/dlg_leasegpu";
import DlgLeaseswitchcpu from "@/components/machine/dlg_leaseswitchcpu";
import DlgTry from "@/components/machine/dlg_try";
import {
  getMcList,
  query_machines_by_machine_type,
  try_place_order,
  place_order,
  place_order_cpu,
  create_order,
  get_dbc_price
} from "@/api";
import { getAccount } from "@/utlis";

export default {
  name: "list",
  components: {
    DropItem,
    SlideItem,
    DlgLeasecpudeposit,
    DlgLeasecpupayment,
    DlgLeaseswitchcpu,
    DlgLeasegpu,
    DlgTry
  },
  data() {
    return {
      rent_index: -1,
      rentLoading_cpu: false,
      rentLoading_gpu: false,
      try_rentLoading: false,
      try_rent_index: -1,
      dlg_openswitchcpu: false,
      dlg_opengpu: false,
      dlg_opencpupayment: false,
      dlg_opencpudeposit: false,
      dlg_open_try: false,
      curVal: 0,
      si: undefined,
      // countries
      countries: [
        {
          name: undefined, //this.$t("list_all"),
          value: "all"
        }
      ],
      //dbc version
      dbc_version: [
        {
          name: this.$t("gpu.dbc_version[0]"),
          value: "0"
        },
        {
          name: this.$t("gpu.dbc_version[1]"),
          value: this.$t("gpu.dbc_version[1]")
        },
        {
          name: this.$t("gpu.dbc_version[2]"),
          value: this.$t("gpu.dbc_version[2]")
        }
      ],

      // 是否有ip
      have_ip: [
        {
          name: undefined, //this.$t("gpu.have_ip[0]"),
          value: 0
        },
        {
          name: undefined, //this.$t("gpu.have_ip[1]"),
          value: 1
        },
        {
          name: undefined, //this.$t("gpu.have_ip[2]"),
          value: 2
        }
      ],

      // 机器状态下拉
      idle_status: [
        {
          name: undefined, //this.$t("gpu.idle_status[0]"),
          value: 0
        },
        {
          name: undefined, // this.$t("gpu.idle_status[1]"),
          value: 1
        },
        {
          name: undefined, //this.$t("gpu.idle_status[2]"),
          value: 2
        }
      ],

      totalTimeVal: 0, // 使用时长
      //reliabilityVal: 90, // 历史可靠性
      diskSpaceVal: 0, // 硬盘空间
      // diskPriceVal: 0.00001, // 硬盘价格
      lengthOfAvailableTimeVal: 1, //可用时长
      gpuPriceVal: 0.00001,
      gpuCountVal: 0,
      total_rent_count_CountVal: 0,
      error_rent_count_CountVal: 0,
      tensor_cores_CountVal: 0,
      half_tflopsVal: 0,
      single_tflopsVal: 0,
      double_tflopsVal: 0,
      gpuRamSizeVal: 0,
      gpuRamBandwidthVal: 0,
      piceBandwidthVal: 0,
      cpuCoresVal: 0,
      cpuRamSizeVal: 0,
      diskBandwidthVal: 0,
      inetUpVal: 0,
      inetDownVal: 0,
      language: undefined,
      images: [
        {
          name: "TesorFlow",
          value: 1
        },
        {
          name: "other",
          value: 2
        }
      ],
      req_body: {
        country: "all",
        dbcVersion: "0",
        have_ip: 0,
        idle_status: 1,
        totalTime: 0,
        reliability: 0.9,
        diskSpace: 0,
        diskPrice: 0.00001,
        lengthOfAvailableTime: 1,
        gpuPrice: 0.00001,
        gpuCount: 0,
        tflops: 0,
        gpuRamSize: 0,
        gpuRamBandwidth: 0,
        piceBandwidth: 0,
        cpuCores: 0,
        cpuRamSize: 0,
        diskBandwidth: 0,
        inetUp: 0,
        inetDown: 0,
        total_rent_count: 0,
        error_rent_count: 0,
        disk_GB_perhour_dollar: 0,
        tensor_cores: 0,
        half_precision_tflops: 0,
        single_precision_tflops: 0,
        double_precision_tflops: 0
      },
      res_body: {
        content: []
      },
      placeOrderData: undefined,
      st: undefined
    };
  },
  watch: {
    "$i18n.locale"() {
      this.init_data();
      this.queryMc();
    },
    curVal(newVal) {}
  },
  created() {
    this.init_data();
  },

  activated() {
    this.queryMc();
  },
  deactivated() {
    if (this.si) {
      clearInterval(this.si);
    }
  },

  methods: {
    init_data() {
      this.countries[0].name = this.$t("list_all");
      this.have_ip[0].name = this.$t("gpu.have_ip[0]");
      this.have_ip[1].name = this.$t("gpu.have_ip[1]");
      this.have_ip[2].name = this.$t("gpu.have_ip[2]");
      this.idle_status[0].name = this.$t("gpu.idle_status[0]");
      this.idle_status[1].name = this.$t("gpu.idle_status[1]");
      this.idle_status[2].name = this.$t("gpu.idle_status[2]");
      this.language = this.$i18n.locale;
    },
    pushDetail(machine_id) {
      this.$router.push("/machineDetail?machine_id=" + machine_id);
    },
    // 打开gpu弹窗
    openDlg_gpu(item, index) {
      if (!getAccount()) {
        this.$message({
          showClose: true,
          message: this.$t("pleae_create_wallet"),
          type: "error"
        });
        return;
      }
      this.rent_index = index;
      this.rentLoading_gpu = true;
      this.$forceUpdate();
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      place_order({
        machine_id: item.machine_id,
        wallet_address_user: getAccount().address,
        user_name_platform,
        language
      })
        .then(res_1 => {
          if (res_1.status === 1) {
            this.placeOrderData = res_1.content;
            this.placeOrderData.dbc_price = 0.0026;
            return get_dbc_price({
              order_id: this.placeOrderData.order_id,
              user_name_platform,
              language
            });
          } else {
            this.$message({
              showClose: true,
              message: res_1.msg,
              type: "error"
            });
            return Promise.reject(res_1.msg);
          }
        })
        .then(res_2 => {
          if (res_2.status === 1) {
            this.placeOrderData.dbc_price = res_2.content;
            this.dlg_opengpu = true;
          } else {
            this.$message({
              showClose: true,
              message: res_2.msg,
              type: "success"
            });
            return Promise.reject(res_2.msg);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.rentLoading_gpu = false;
          this.rent_index = -1;
        });
    },

    openDlg_cpu_switch(item, index) {
      if (!getAccount()) {
        // this.$router.push(`/openWallet/${type}`);
        this.$message({
          showClose: true,
          message: this.$t("pleae_create_wallet"),
          type: "error"
        });
        return;
      }

      this.dlg_openswitchcpu = true;
      this.placeOrderData = item;
      this.placeOrderData.index = index;
      //   confirm_new("", this.$t("cpu_mode_switch"));
      //    this.confirm_new("xxx", this.$t("cpu_mode_switch"), item);
    },

    switch_cpu_mode(item) {
      this.dlg_openswitchcpu = false;
      this.$forceUpdate();
      if (item.switch_cpu_mode === "payment") {
        this.to_payment(item, item.index);
      } else if (item.switch_cpu_mode === "deposit") {
        this.to_deposit(item, item.index);
      }
    },

    to_payment(item, index) {
      if (!getAccount()) {
        // this.$router.push(`/openWallet/${type}`);
        this.$message({
          showClose: true,
          message: this.$t("pleae_create_wallet"),
          type: "error"
        });
        return;
      }
      this.rent_index = index;
      this.rentLoading_cpu = true;
      this.$forceUpdate();
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      place_order_cpu({
        machine_id: item.machine_id,
        wallet_address_user: getAccount().address,
        mode: "payment",
        user_name_platform,
        language
      })
        .then(res_1 => {
          if (res_1.status === 1) {
            this.placeOrderData = res_1.content;
            this.placeOrderData.dbc_price = 0.0026;
            return get_dbc_price({
              order_id: this.placeOrderData.order_id,
              user_name_platform,
              language
            });
          } else {
            this.$message({
              showClose: true,
              message: res_1.msg,
              type: "error"
            });
            return Promise.reject(res_1.msg);
          }
        })
        .then(res_2 => {
          if (res_2.status === 1) {
            this.placeOrderData.dbc_price = res_2.content;
            this.dlg_opencpupayment = true;
          } else {
            this.$message({
              showClose: true,
              message: res_2.msg,
              type: "success"
            });
            return Promise.reject(res_2.msg);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.rentLoading_cpu = false;
          this.rent_index = -1;
        });
    },

    to_deposit(item, index) {
      this.rentLoading_cpu = true;
      this.rent_index = index;
      this.$forceUpdate();
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      place_order_cpu({
        machine_id: item.machine_id,
        wallet_address_user: getAccount().address,
        user_name_platform,
        mode: "deposit",
        language
      })
        .then(res_1 => {
          if (res_1.status === 1) {
            this.placeOrderData = res_1.content;
            this.placeOrderData.dbc_price = 0.0026;
            return get_dbc_price({
              order_id: this.placeOrderData.order_id,
              user_name_platform,
              language
            });
          } else {
            this.$message({
              showClose: true,
              message: res_1.msg,
              type: "error"
            });
            return Promise.reject(res_1.msg);
          }
        })
        .then(res_2 => {
          if (res_2.status === 1) {
            this.placeOrderData.dbc_price = res_2.content;
            this.dlg_opencpudeposit = true;
          } else {
            this.$message({
              showClose: true,
              message: res_2.msg,
              type: "success"
            });
            return Promise.reject(res_2.msg);
          }
          this.rentLoading_cpu = false;
          this.rent_index = -1;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    },

    // open try
    openTry(item, index) {
      if (!getAccount()) {
        this.$message({
          showClose: true,
          message: this.$t("pleae_create_wallet"),
          type: "error"
        });
        return;
      }
      this.try_rentLoading = true;
      this.try_rent_index = index;
      this.$forceUpdate();
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      try_place_order({
        machine_id: item.machine_id,
        wallet_address_user: getAccount().address,
        user_name_platform,
        language
      })
        .then(res => {
          if (res.status === 1) {
            this.placeOrderData = res.content;
            this.placeOrderData.dbc_price = 0.0026;
            return get_dbc_price({
              order_id: this.placeOrderData.order_id,
              user_name_platform,
              language
            });
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
            return Promise.reject(res.msg);
          }
        })
        .then(res => {
          if (res.status === 1) {
            this.placeOrderData.dbc_price = res.content;
            this.dlg_open_try = true;
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success"
            });
            return Promise.reject(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.try_rentLoading = false;
          this.try_rent_index = -1;
        });
    },
    // create order
    createOrder(params) {
      const loading = this.$loading();
      create_order(params)
        .then(res => {
          if (res.status === 1) {
            this.$message({
              showClose: true,
              message: this.$t("list_create_order_success"),
              type: "success"
            });
            this.dlg_openswitchcpu = false;
            this.dlg_opengpu = false;
            this.dlg_opencpupayment = false;
            this.dlg_opencpudeposit = false;
            if (params.gpu_count === 0) {
              this.$router.push("/mymachine/myMachine_cpu");
              this.$store.commit("setMenuName", "mymachine");
            } else {
              this.$router.push("/mymachine/myMachine");
              this.$store.commit("setMenuName", "mymachine");
            }
          } else if (res.status === -1) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
        })
        .finally(() => {
          loading.close();
        });
    },
    // try order
    createTry() {
      const loading = this.$loading();
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      create_order({
        rent_time_length: 15,
        dbc_price: this.placeOrderData.dbc_price,
        gpu_count: 0,
        order_id: this.placeOrderData.order_id,
        dbc_total_count: 0,
        user_name_platform,
        language
      })
        .then(res => {
          if (res.status === 1) {
            this.$message(res.msg);
            this.$router.push("/mymachine/myMachine_cpu");
            this.$store.commit("setMenuName", "mymachine");
          } else {
            this.$message(res.msg);
          }
        })
        .finally(() => {
          loading.close();
        });
    },
    queryMc() {
      let params = {
        machine_type: 0,
        country: this.req_body.country,
        idle_status: this.req_body.idle_status,
        total_time: this.req_body.totalTime,
        total_rent_count: this.req_body.total_rent_count,
        error_rent_count: this.req_body.error_rent_count,
        disk_GB_perhour_dollar: this.req_body.disk_GB_perhour_dollar,
        length_of_available_time: this.req_body.lengthOfAvailableTime,
        gpu_price_dollar: this.req_body.gpuPrice,
        gpu_count: this.req_body.gpuCount,
        gpu_ram_size: this.req_body.gpuRamSize,
        gpu_ram_bandwidth: this.req_body.gpuRamBandwidth,
        pcie_bandwidth: this.req_body.piceBandwidth,
        cpu_numbers: this.req_body.cpuCores,
        ram_size: this.req_body.cpuRamSize,
        disk_bandwidth: this.req_body.diskBandwidth,
        inet_up: this.req_body.inetUp,
        inet_down: this.req_body.inetDown,
        have_ip: this.req_body.have_ip,
        onlines_tatus: 0,
        disk_space: this.req_body.diskSpace,
        tensor_cores: this.req_body.tensor_cores,
        half_precision_tflops: this.req_body.half_precision_tflops,
        single_precision_tflops: this.req_body.single_precision_tflops,
        double_precision_tflops: this.req_body.double_precision_tflops,
        dbc_version: this.req_body.dbcVersion,
        user_name_platform: this.$t("website_name"),
        language: this.language
      };
      query_machines_by_machine_type(params).then(res => {
        this.res_body = res;
      });
      if (this.si) {
        clearInterval(this.si);
      }
      let timesRun = 0;
      this.si = setInterval(() => {
        timesRun += 1;
        if (timesRun === 10) {
          clearInterval(this.si);
        }
        query_machines_by_machine_type(params).then(res => {
          this.res_body = res;
        });
      }, 15000);
      // if (this.st) {
      //  clearTimeout(this.st);
      //  }
      // this.st = setTimeout(() => {
      //  getMcList(params).then(res => {
      //    this.res_body = res;
      // });
      //}, 5000);
    }
  },
  computed: {
    showTotalTime() {
      let showTotalTime = 0;
      let hours = 0;
      let day = 0;
      let month = 0;
      if (this.totalTimeVal < 24) {
        hours = this.totalTimeVal;
        showTotalTime = hours + "hrs";
        this.req_body.totalTime = hours;
      } else if (this.totalTimeVal >= 24 && this.totalTimeVal < 54) {
        day = this.totalTimeVal - 24 + 1;
        showTotalTime = day + "days";
        this.req_body.totalTime = day * 24;
      } else if (this.totalTimeVal >= 54 && this.totalTimeVal <= 100) {
        month = this.totalTimeVal - 54 + 1;
        showTotalTime = month + "mon";
        this.req_body.totalTime = month * 720;
      }
      return showTotalTime;
    },
    showReliability() {
      this.req_body.reliability = this.reliabilityVal / 100;
      return this.reliabilityVal > 0 ? `${this.reliabilityVal}%` : "New";
    },
    showDiskSpace() {
      let val = 0;
      if (this.diskSpaceVal <= 10) {
        val = this.diskSpaceVal * 1;
      } else if (this.diskSpaceVal > 10 && this.diskSpaceVal <= 20) {
        val = (this.diskSpaceVal - 10) * 10;
      } else if (this.diskSpaceVal > 20 && this.diskSpaceVal <= 30) {
        val = (this.diskSpaceVal - 20) * 100;
      } else if (this.diskSpaceVal > 30 && this.diskSpaceVal <= 40) {
        val = (this.diskSpaceVal - 30) * 1000;
      } else if (this.diskSpaceVal > 40 && this.diskSpaceVal <= 100) {
        val = (this.diskSpaceVal - 40) * (90000 / 60) + 9990;
      }
      // val += 10;
      this.req_body.diskSpace = val;
      return val >= 1000 ? (val / 1000).toFixed(1) + "T" : val + "G";
    },
    showDiskPrice() {
      const min = 0.00001;
      const max = 1;
      const stepArray = [
        {
          valMax: 0.0001,
          step: 0.00001
        },
        {
          valMax: 0.001,
          step: 0.0001
        },
        {
          valMax: 0.01,
          step: 0.001
        },
        {
          valMax: 0.1,
          step: 0.01
        },
        {
          valMax: 1,
          step: -1
        }
      ];
      let val = this.$noLinearNumAdd(min, max, stepArray, this.diskPriceVal);
      const money = parseFloat(val.toFixed(5));
      this.req_body.diskPrice = money;
      return "$" + money;
    },
    showlengthOfAvailableTime() {
      let showTotalTime = 0;
      let hours = 0;
      let day = 0;
      let month = 0;
      if (this.lengthOfAvailableTimeVal < 24) {
        hours = this.lengthOfAvailableTimeVal;
        showTotalTime = hours + "hrs";
        this.req_body.lengthOfAvailableTime = hours;
      } else if (
        this.lengthOfAvailableTimeVal >= 24 &&
        this.lengthOfAvailableTimeVal < 54
      ) {
        day = this.lengthOfAvailableTimeVal - 24 + 1;
        showTotalTime = day + "days";
        this.req_body.lengthOfAvailableTime = day * 24;
      } else if (
        this.lengthOfAvailableTimeVal >= 54 &&
        this.lengthOfAvailableTimeVal <= 100
      ) {
        month = this.lengthOfAvailableTimeVal - 54 + 1;
        showTotalTime = month + "mon";
        this.req_body.lengthOfAvailableTime = month * 720;
      }
      return showTotalTime;
    },
    showGpuPrice() {
      const min = 0.00001;
      const max = 1;
      const stepArray = [
        {
          valMax: 0.0001,
          step: 0.00001
        },
        {
          valMax: 0.001,
          step: 0.0001
        },
        {
          valMax: 0.01,
          step: 0.001
        },
        {
          valMax: 0.1,
          step: 0.01
        },
        {
          valMax: 1,
          step: -1
        }
      ];
      let val = this.$noLinearNumAdd(min, max, stepArray, this.gpuPriceVal);
      const money = parseFloat(val.toFixed(5));
      this.req_body.gpuPrice = money;
      return "$" + money;
    },
    showGpuCount() {
      const min = 1;
      const max = 1024;
      const stepArray = [
        {
          valMax: 10,
          step: 1
        },
        {
          valMax: 500,
          step: 10
        },
        {
          valMax: 800,
          step: 20
        },
        {
          valMax: 1024,
          step: -1
        }
      ];
      let val = this.$noLinearNumAdd(min, max, stepArray, this.gpuCountVal);
      val = Math.floor(val);
      this.req_body.gpuCount = val;
      return val;
    },
    half_showTflops() {
      const stepArray = [
        {
          valMax: 100,
          step: 5
        },
        {
          valMax: 1000,
          step: 50
        },
        {
          valMax: 5000,
          step: 200
        },
        {
          valMax: 10000,
          step: -1
        }
      ];
      let val = this.$noLinearNumAdd(0, 10000, stepArray, this.half_tflopsVal);
      val = Math.floor(val);
      this.req_body.half_precision_tflops = val;
      return val;
    },

    showGpuCount() {
      const min = 1;
      const max = 1024;
      const stepArray = [
        {
          valMax: 10,
          step: 1
        },
        {
          valMax: 500,
          step: 10
        },
        {
          valMax: 800,
          step: 20
        },
        {
          valMax: 1024,
          step: -1
        }
      ];
      let val = this.$noLinearNumAdd(min, max, stepArray, this.gpuCountVal);
      val = Math.floor(val);
      this.req_body.gpuCount = val;
      return val;
    },

    show_total_rent_count() {
      const min = 0;
      const max = 1024;
      const stepArray = [
        {
          valMax: 10,
          step: 1
        },
        {
          valMax: 500,
          step: 10
        },
        {
          valMax: 800,
          step: 20
        },
        {
          valMax: 1024,
          step: -1
        }
      ];
      let val = this.$noLinearNumAdd(
        min,
        max,
        stepArray,
        this.total_rent_count_CountVal
      );
      val = Math.floor(val);
      this.req_body.total_rent_count = val;
      return val;
    },

    show_error_rent_count() {
      const min = 0;
      const max = 1024;
      const stepArray = [
        {
          valMax: 10,
          step: 1
        },
        {
          valMax: 500,
          step: 10
        },
        {
          valMax: 800,
          step: 20
        },
        {
          valMax: 1024,
          step: -1
        }
      ];
      let val = this.$noLinearNumAdd(
        min,
        max,
        stepArray,
        this.error_rent_count_CountVal
      );
      val = Math.floor(val);
      this.req_body.error_rent_count = val;
      return val;
    },

    show_tensor_cores_count() {
      const min = 0;
      const max = 1024;
      const stepArray = [
        {
          valMax: 10,
          step: 1
        },
        {
          valMax: 500,
          step: 10
        },
        {
          valMax: 800,
          step: 20
        },
        {
          valMax: 1024,
          step: -1
        }
      ];
      let val = this.$noLinearNumAdd(
        min,
        max,
        stepArray,
        this.tensor_cores_CountVal
      );
      val = Math.floor(val);
      this.req_body.tensor_cores = val;
      return val;
    },
    single_showTflops() {
      const stepArray = [
        {
          valMax: 100,
          step: 5
        },
        {
          valMax: 1000,
          step: 50
        },
        {
          valMax: 5000,
          step: 200
        },
        {
          valMax: 10000,
          step: -1
        }
      ];
      let val = this.$noLinearNumAdd(
        0,
        10000,
        stepArray,
        this.single_tflopsVal
      );
      val = Math.floor(val);
      this.req_body.single_precision_tflops = val;
      return val;
    },
    double_showTflops() {
      const stepArray = [
        {
          valMax: 100,
          step: 5
        },
        {
          valMax: 1000,
          step: 50
        },
        {
          valMax: 5000,
          step: 200
        },
        {
          valMax: 10000,
          step: -1
        }
      ];
      let val = this.$noLinearNumAdd(
        0,
        10000,
        stepArray,
        this.double_tflopsVal
      );
      val = Math.floor(val);
      this.req_body.double_precision_tflops = val;
      return val;
    },
    showGpuRamSize() {
      const min = 0;
      const max = 1024;
      const stepArray = [
        {
          valMax: 10,
          step: 1
        },
        {
          valMax: 500,
          step: 10
        },
        {
          valMax: 800,
          step: 20
        },
        {
          valMax: 1024,
          step: -1
        }
      ];
      let val = this.$noLinearNumAdd(min, max, stepArray, this.gpuRamSizeVal);
      val = Math.floor(val);
      this.req_body.gpuRamSize = val;
      return val + "G";
    },
    showGpuRamBandwidth() {
      const min = 0;
      const max = 10000;
      const stepArray = [
        {
          valMax: 100,
          step: 5
        },
        {
          valMax: 5000,
          step: 100
        },
        {
          valMax: max,
          step: -1
        }
      ];
      let val = this.$noLinearNumAdd(
        min,
        max,
        stepArray,
        this.gpuRamBandwidthVal
      );
      val = Math.floor(val);
      this.req_body.gpuRamBandwidth = val;
      return val < 1000 ? val + "G" : val / 1000 + "T";
    },
    showPiceBandwidth() {
      const min = 0;
      const max = 128000;
      const stepArray = [
        {
          valMax: 100,
          step: 10
        },
        {
          valMax: 1000,
          step: 100
        },
        {
          valMax: 10000,
          step: 500
        },
        {
          valMax: 100000,
          step: 2000
        },
        {
          valMax: max,
          step: -1
        }
      ];
      let val = this.$noLinearNumAdd(
        min,
        max,
        stepArray,
        this.piceBandwidthVal
      );
      val = Math.floor(val);
      this.req_body.piceBandwidth = val;
      return val < 1000 ? val + "M" : val / 1000 + "G";
    },
    showCpuCores() {
      const min = 0;
      const max = 8096;
      const stepArray = [
        {
          valMax: 8,
          step: 1
        },
        {
          valMax: 32,
          step: 2
        },
        {
          valMax: 128,
          step: 8
        },
        {
          valMax: 256,
          step: 16
        },
        {
          valMax: 512,
          step: 32
        },
        {
          valMax: 1024,
          step: 64
        },
        {
          valMax: max,
          step: -1
        }
      ];
      let val = this.$noLinearNumAdd(min, max, stepArray, this.cpuCoresVal);
      val = Math.floor(val);
      this.req_body.cpuCores = val;
      return val;
    },
    showCpuRamSize() {
      const min = 0;
      const max = 8096;
      const stepArray = [
        {
          valMax: 8,
          step: 1
        },
        {
          valMax: 32,
          step: 2
        },
        {
          valMax: 128,
          step: 8
        },
        {
          valMax: 256,
          step: 16
        },
        {
          valMax: 512,
          step: 32
        },
        {
          valMax: 1024,
          step: 64
        },
        {
          valMax: max,
          step: -1
        }
      ];
      let val = this.$noLinearNumAdd(min, max, stepArray, this.cpuRamSizeVal);
      val = Math.floor(val);
      this.req_body.cpuRamSize = val;
      return val + "G";
    },
    showDiskBandwidth() {
      const min = 0;
      const max = 20000;
      const stepArray = [
        {
          valMax: 100,
          step: 10
        },
        {
          valMax: 1000,
          step: 50
        },
        {
          valMax: 10000,
          step: 500
        },
        {
          valMax: max,
          step: -1
        }
      ];
      let val = this.$noLinearNumAdd(
        min,
        max,
        stepArray,
        this.diskBandwidthVal
      );
      val = Math.floor(val);
      this.req_body.diskBandwidth = val;
      return val < 1000 ? val + "M" : val / 1000 + "G";
    },
    showInetUp() {
      const min = 0;
      const max = 8096;
      const stepArray = [
        {
          valMax: 8,
          step: 0.5
        },
        {
          valMax: 64,
          step: 4
        },
        {
          valMax: 128,
          step: 8
        },
        {
          valMax: 256,
          step: 16
        },
        {
          valMax: 512,
          step: 32
        },
        {
          valMax: 1024,
          step: 64
        },
        {
          valMax: max,
          step: -1
        }
      ];
      let val = this.$noLinearNumAdd(min, max, stepArray, this.inetUpVal);
      this.req_body.inetUp = val;
      return val < 1000 ? val + "Mbps" : (val / 1000).toFixed(3) + "Gbps";
    },
    showInetDown() {
      const min = 0;
      const max = 8096;
      const stepArray = [
        {
          valMax: 8,
          step: 0.5
        },
        {
          valMax: 64,
          step: 4
        },
        {
          valMax: 128,
          step: 8
        },
        {
          valMax: 256,
          step: 16
        },
        {
          valMax: 512,
          step: 32
        },
        {
          valMax: 1024,
          step: 64
        },
        {
          valMax: max,
          step: -1
        }
      ];
      let val = this.$noLinearNumAdd(min, max, stepArray, this.inetDownVal);
      this.req_body.inetDown = val;
      return val < 1000 ? val + "Mbps" : (val / 1000).toFixed(3) + "Gbps";
    }
  }
};
</script>

<style lang="scss" scoped>
.machineData-wrap {
  display: flex;
  flex-wrap: wrap;

  .machine-item {
    margin-right: 10px;
    margin-bottom: 40px;
  }
}

.info-wrap {
  margin-bottom: 20px;
  padding: 15px 20px 12px;
  border: 1px solid #979797;
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
    .fs28 {
      font-size: 18px;
      .cRedbig {
        color: #f56c6c;
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

      .cRedbig {
        font-size: 32px;
        color: #f56c6c;
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

    .td4 {
      width: 12%;
      line-height: 24px;

      .cPrimaryColor {
        font-size: 12px;

        &.fs16 {
          font-size: 16px;
        }
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
</style>
