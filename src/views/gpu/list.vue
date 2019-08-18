<template>
  <div class="machine">
    <div class="machineData-wrap">
      <drop-item
        v-model="req_body.county"
        class="machine-item"
        title="国家"
        :drop-list="countries"
        @selected="queryMc"
      ></drop-item>
      <!--      <drop-item class="machine-item" title="Image" :dropList="images"></drop-item>-->
      <drop-item
        class="machine-item"
        :title="$t('dbc_version_title')"
        v-model="req_body.dbcVersion"
        :dropList="dbc_version"
        @selected="queryMc"
      ></drop-item>
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
        v-model="req_body.status"
        :dropList="mcStatus"
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
      >{{showlengthOfAvailableTime}}
      </slide-item>
      <slide-item
        class="machine-item"
        :title="$t('total_time')"
        v-model="totalTimeVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showTotalTime}}
      </slide-item>
      <slide-item
        class="machine-item"
        :title="$t('disk_space')"
        v-model="diskSpaceVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showDiskSpace}}
      </slide-item>
      <slide-item
        class="machine-item"
        :title="$t('gpu_price_dollar')"
        v-model="gpuPriceVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showGpuPrice}}
      </slide-item>
      <slide-item
        class="machine-item"
        :title="$t('gpu_count')"
        v-model="gpuCountVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showGpuCount}}
      </slide-item>
      <slide-item
        class="machine-item"
        :title="$t('total_rent_count')"
        v-model="total_rent_count_CountVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{show_total_rent_count}}
      </slide-item>
      <slide-item
        class="machine-item"
        :title="$t('error_rent_count')"
        v-model="error_rent_count_CountVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{show_error_rent_count}}
      </slide-item>
      <slide-item
        class="machine-item"
        :title="$t('tensor_cores')"
        v-model="tensor_cores_CountVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{show_tensor_cores_count}}
      </slide-item>
      <slide-item
        class="machine-item"
        :title="$t('half_precision_tflops')"
        v-model="half_tflopsVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{half_showTflops}}
      </slide-item>
      <slide-item
        class="machine-item"
        :title="$t('single_precision_tflops')"
        v-model="single_tflopsVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{single_showTflops}}
      </slide-item>
      <slide-item
        class="machine-item"
        :title="$t('double_precision_tflops')"
        v-model="double_tflopsVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{double_showTflops}}
      </slide-item>
      <slide-item
        class="machine-item"
        :title="$t('gpu_ram_size')"
        v-model="gpuRamSizeVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showGpuRamSize}}
      </slide-item>
      <slide-item
        class="machine-item"
        :title="$t('gpu_ram_bandwidth')"
        v-model="gpuRamBandwidthVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showGpuRamBandwidth}}
      </slide-item>
      <slide-item
        class="machine-item"
        :title="$t('pcie_bandwidth')"
        v-model="piceBandwidthVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showPiceBandwidth}}
      </slide-item>
      <slide-item
        class="machine-item"
        :title="$t('cpu_numbers')"
        v-model="cpuCoresVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showCpuCores}}
      </slide-item>
      <slide-item
        class="machine-item"
        :title="$t('ram_size')"
        v-model="cpuRamSizeVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showCpuRamSize}}
      </slide-item>
      <slide-item
        class="machine-item"
        :title="$t('disk_bandwidth')"
        v-model="diskBandwidthVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showDiskBandwidth}}
      </slide-item>
      <slide-item
        class="machine-item"
        :title="$t('inet_up')"
        v-model="inetUpVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showInetUp}}
      </slide-item>
      <slide-item
        class="machine-item"
        :title="$t('inet_down')"
        v-model="inetDownVal"
        :min="0"
        :max="100"
        :step="1"
        @change="queryMc"
      >{{showInetDown}}
      </slide-item>
    </div>
    <ul>
      <li v-for="(item, index) in res_body.content" v-if="item.online_status" class="info-wrap">
        <div v-if="item.evaluation_score_average > 0" class="flex vCenter">
          <el-rate :value="item.evaluation_score_average/2">
          </el-rate>
          <span>{{item.evaluation_score_average}}{{$t('scores')}}</span>
        </div>
        <div class="flex status-title">
          <div>
            <el-button plain class="is-link" @click="pushDetail(item.machine_id)">{{item.machine_id}}</el-button>
            <span class="fs28">
              <span class="cPrimaryColor">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$ {{item.gpu_price_dollar }}/小时</span>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              DBC版本：
              <a class="cPrimaryColor">{{item.dbc_version}}</a>
            </span>
          </div>
          <div>
            <el-button
              style="width: 100px"
              plain
              size="mini"
              @click="openTry(item)"
              :disabled="!item.idle_status"
              :loading="item.try_rentLoading"
            >试用
            </el-button>
            <el-button
              style="width: 100px"
              type="primary"
              size="mini"
              @click="openDlg(item)"
              :disabled="!item.idle_status"
              :loading="item.rentLoading"
            >租用
            </el-button>
          </div>
        </div>
        <div class="flex">
          <div class="td2">
            <span class="fs28">
              <a class="cPrimaryColor">{{item.gpu_type}}</a>
              <a class="cPrimaryColor">x{{item.gpu_count}}</a>
            </span>
          </div>
          <div class="td2">
            <span class="fs28">
              <a class="cPrimaryColor">{{item.county}}中国</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <span class="fs16">
              闲置GPU数:
              <a class="cPrimaryColor">{{item.gpu_count - item.gpu_be_used}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              最长可租用时间：
              <a class="cPrimaryColor">{{Math.floor(item.length_of_available_time/60)}}小时</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              累计出租时长：
              <a
                class="cPrimaryColor"
              >{{$minsToHourMins(item.total_time_be_used)}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              出租总次数：
              <a class="cPrimaryColor">{{item.total_rent_count}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              中断次数：
              <a class="cPrimaryColor">{{item.error_rent_count}}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <span class="fs16">
              Tensor Core：
              <a class="cPrimaryColor">{{item.tensor_core}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              CUDA版本号：
              <a class="cPrimaryColor">{{item.cuda_version}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              硬盘：
              <a class="cPrimaryColor">{{parseInt(item.disk_space/(1024*1024))}}GB</a>
              <a class="cPrimaryColor">&nbsp;&nbsp;{{item.disk_type}}</a>
            </span>
          </div>
          <div class="td3">
            <span class="fs16">
              CPU型号：
              <a class="cPrimaryColor">{{item.cpu_type}}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <span class="fs16">
              半精度浮点运算数：
              <a class="cPrimaryColor">{{item.half_precision_tflops}}TFLOPS</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              GPU显存：
              <a class="cPrimaryColor">{{parseInt(item.gpu_ram_size/(1024*1024))}}GB</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              硬盘带宽：
              <a class="cPrimaryColor">{{parseInt(item.disk_bandwidth/1024)}}MB/s</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              CPU内核数：
              <a class="cPrimaryColor">{{item.cpu_numbers}}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <span class="fs16">
              单精度浮点运算数：
              <a class="cPrimaryColor">{{item.single_precision_tflops}}TFLOPS</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              GPU显存带宽：
              <a class="cPrimaryColor">{{parseInt(item.gpu_ram_bandwidth/(1024*1024))}}GB/s</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              上行带宽：
              <a class="cPrimaryColor">{{parseInt(item.inet_up/1024)}}Mbps</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              内存数：
              <a class="cPrimaryColor">{{parseInt(item.ram_size/(1024*1024))}}GB</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <span class="fs16">
              双精度浮点运算数：
              <a class="cPrimaryColor">{{item.duoble_precision_tflops}}TFLOPS</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              总线传输速度：
              <a class="cPrimaryColor">{{parseInt(item.pcie_bandwidth/(1024*1024))}}GB/s</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              下行带宽：
              <a class="cPrimaryColor">{{parseInt(item.inet_down/1024)}}Mbps</a>
            </span>
          </div>
          <div class="td3">
            <span class="fs16">
              操作系统：
              <a class="cPrimaryColor">{{item.os}}</a>
            </span>
          </div>
        </div>
      </li>
    </ul>
    <dlg-lease :open.sync="dlg_open" :place-order-data="placeOrderData" @confirm="createOrder"></dlg-lease>
    <!--    try-dlg-->
    <dlg-try :open.sync="dlg_open_try" @confirm="createTry"></dlg-try>
  </div>
</template>

<script>
  import DropItem from "@/components/machine/dropItem"
  import SlideItem from "@/components/machine/slideItem"
  import DlgLease from "@/components/machine/dlg_lease"
  import DlgTry from '@/components/machine/dlg_try'
  import {
    getMcList,
    try_place_order,
    place_order,
    create_order,
    get_dbc_price
  } from "@/api"
  import {getAccount} from "@/utlis"

  export default {
    name: "list",
    components: {
      DropItem,
      SlideItem,
      DlgLease,
      DlgTry
    },
    data() {
      return {
        rentLoading: false,
        try_rentLoading: false,
        dlg_open: false,
        dlg_open_try: false,
        curVal: 0,
        // countries
        countries: [
          {
            name: "所有",
            value: "all"
          }
        ],
        //dbc version
        dbc_version: [
          {
            name: this.$t("gpu.dbc_version[0]"),
            value: 0
          },
          {
            name: this.$t("gpu.dbc_version[1]"),
            value: this.$t("gpu.dbc_version[1]")
          }
        ],

        // 是否有ip
        have_ip: [
          {
            name: this.$t("gpu.have_ip[0]"),
            value: 0
          },
          {
            name: this.$t("gpu.have_ip[1]"),
            value: 1
          },
          {
            name: this.$t("gpu.have_ip[2]"),
            value: 2
          }
        ],

        // 机器状态下拉
        mcStatus: [
          {
            name: this.$t("gpu.mcStatus[0]"),
            value: 0
          },
          {
            name: this.$t("gpu.mcStatus[1]"),
            value: 1
          },
          {
            name: this.$t("gpu.mcStatus[2]"),
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
          county: "all",
          dbcVersion: "V0.3.7.2",
          have_ip: 0,
          status: 0,
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
      }
    },
    watch: {
      curVal(newVal) {
      }
    },
    created() {
      this.queryMc()
    },
    methods: {
      pushDetail(machine_id) {
        this.$router.push("/machineDetail?machine_id=" + machine_id)
      },
      // 打开弹窗
      openDlg(item, isTry) {
        if (!getAccount()) {
          this.$router.push("/openWallet")
          return
        }
        item.rentLoading = true
        place_order({
          machine_id: item.machine_id,
          wallet_address_user: getAccount().address
        })
          .then(res_1 => {
            if (res_1.status === 1) {
              this.placeOrderData = res_1.content
              this.placeOrderData.dbc_price = 0.0026
              return get_dbc_price({order_id: this.placeOrderData.order_id})
            } else {
              this.$message({
                showClose: true,
                message: res_1.msg,
                type: "error"
              })
              return Promise.reject(res_1.msg)
            }
          })
          .then(res_2 => {
            if (res_2.status === 1) {
              this.placeOrderData.dbc_price = res_2.content
              this.dlg_open = true
            } else {
              this.$message({
                showClose: true,
                message: res_2.msg,
                type: "success"
              })
              return Promise.reject(res_2.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            item.rentLoading = false
          })

      },
      // open try
      openTry(item) {
        item.try_rentLoading = true
        try_place_order({
          machine_id: item.machine_id,
          wallet_address_user: getAccount().address
        }).then(res => {
          if (res.status === 1) {
            this.placeOrderData = res.content
            this.placeOrderData.dbc_price = 0.0026
            return get_dbc_price({order_id: this.placeOrderData.order_id})
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            })
            return Promise.reject(res.msg)
          }
        }).then(res => {
          if (res.status === 1) {
            this.placeOrderData.dbc_price = res.content
            this.dlg_open_try = true
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success"
            })
            return Promise.reject(res.msg)
          }
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          item.try_rentLoading = false
        })
      },
      // create order
      createOrder(params) {
        const loading = this.$loading()
        create_order(params)
          .then(res => {
            if (res.status === 1) {
              this.$message('创建订单成功')
              this.dlg_open = false
              this.$router.push("/gpu/myMachine")
            } else {
              this.$message(res.msg)
            }
          })
          .finally(() => {
            loading.close()
          })
      },
      // try order
      createTry() {
        const loading = this.$loading()
        create_order({
          rent_time_length: 10,
          dbc_price: this.placeOrderData.dbc_price,
          gpu_count: 1,
          order_id: this.placeOrderData.order_id,
          dbc_total_count: 0
        }).then(res => {
          if (res.status === 1) {
            this.$message(res.msg)
            this.$router.push("/gpu/myMachine")
          } else {
            this.$message(res.msg)
          }
        })
          .finally(() => {
            loading.close()
          })
      },
      queryMc() {
        const params = {
          county: this.req_body.county,
          idle_status: this.req_body.status,
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
          dbc_version: "0.3.7.2"
        }
        if (this.st) {
          clearTimeout(this.st)
        }
        this.st = setTimeout(() => {
          getMcList(params).then(res => {
            this.res_body = res
          })
        }, 1000)
      }
    },
    computed: {
      showTotalTime() {
        let showTotalTime = 0
        let hours = 0
        let day = 0
        let month = 0
        if (this.totalTimeVal < 24) {
          hours = this.totalTimeVal
          showTotalTime = hours + "hrs"
          this.req_body.totalTime = hours
        } else if (this.totalTimeVal >= 24 && this.totalTimeVal < 54) {
          day = this.totalTimeVal - 24 + 1
          showTotalTime = day + "days"
          this.req_body.totalTime = day * 24
        } else if (this.totalTimeVal >= 54 && this.totalTimeVal <= 100) {
          month = this.totalTimeVal - 54 + 1
          showTotalTime = month + "mon"
          this.req_body.totalTime = month * 720
        }
        return showTotalTime
      },
      showReliability() {
        this.req_body.reliability = this.reliabilityVal / 100
        return this.reliabilityVal > 0 ? `${this.reliabilityVal}%` : "New"
      },
      showDiskSpace() {
        let val = 0
        if (this.diskSpaceVal <= 10) {
          val = this.diskSpaceVal * 1
        } else if (this.diskSpaceVal > 10 && this.diskSpaceVal <= 20) {
          val = (this.diskSpaceVal - 10) * 10
        } else if (this.diskSpaceVal > 20 && this.diskSpaceVal <= 30) {
          val = (this.diskSpaceVal - 20) * 100
        } else if (this.diskSpaceVal > 30 && this.diskSpaceVal <= 40) {
          val = (this.diskSpaceVal - 30) * 1000
        } else if (this.diskSpaceVal > 40 && this.diskSpaceVal <= 100) {
          val = (this.diskSpaceVal - 40) * (90000 / 60) + 9990
        }
        // val += 10;
        this.req_body.diskSpace = val
        return val >= 1000 ? (val / 1000).toFixed(1) + "T" : val + "G"
      },
      showDiskPrice() {
        const min = 0.00001
        const max = 1
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
        ]
        let val = this.$noLinearNumAdd(min, max, stepArray, this.diskPriceVal)
        const money = parseFloat(val.toFixed(5))
        this.req_body.diskPrice = money
        return "$" + money
      },
      showlengthOfAvailableTime() {
        let showTotalTime = 0
        let hours = 0
        let day = 0
        let month = 0
        if (this.lengthOfAvailableTimeVal < 24) {
          hours = this.lengthOfAvailableTimeVal
          showTotalTime = hours + "hrs"
          this.req_body.lengthOfAvailableTime = hours
        } else if (
          this.lengthOfAvailableTimeVal >= 24 &&
          this.lengthOfAvailableTimeVal < 54
        ) {
          day = this.lengthOfAvailableTimeVal - 24 + 1
          showTotalTime = day + "days"
          this.req_body.lengthOfAvailableTime = day * 24
        } else if (
          this.lengthOfAvailableTimeVal >= 54 &&
          this.lengthOfAvailableTimeVal <= 100
        ) {
          month = this.lengthOfAvailableTimeVal - 54 + 1
          showTotalTime = month + "mon"
          this.req_body.lengthOfAvailableTime = month * 720
        }
        return showTotalTime
      },
      showGpuPrice() {
        const min = 0.00001
        const max = 1
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
        ]
        let val = this.$noLinearNumAdd(min, max, stepArray, this.gpuPriceVal)
        const money = parseFloat(val.toFixed(5))
        this.req_body.gpuPrice = money
        return "$" + money
      },
      showGpuCount() {
        const min = 1
        const max = 1024
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
        ]
        let val = this.$noLinearNumAdd(min, max, stepArray, this.gpuCountVal)
        val = Math.floor(val)
        this.req_body.gpuCount = val
        return val
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
        ]
        let val = this.$noLinearNumAdd(0, 10000, stepArray, this.half_tflopsVal)
        val = Math.floor(val)
        this.req_body.half_precision_tflops = val
        return val
      },

      showGpuCount() {
        const min = 1
        const max = 1024
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
        ]
        let val = this.$noLinearNumAdd(min, max, stepArray, this.gpuCountVal)
        val = Math.floor(val)
        this.req_body.gpuCount = val
        return val
      },

      show_total_rent_count() {
        const min = 0
        const max = 1024
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
        ]
        let val = this.$noLinearNumAdd(
          min,
          max,
          stepArray,
          this.total_rent_count_CountVal
        )
        val = Math.floor(val)
        this.req_body.total_rent_count = val
        return val
      },

      show_error_rent_count() {
        const min = 0
        const max = 1024
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
        ]
        let val = this.$noLinearNumAdd(
          min,
          max,
          stepArray,
          this.error_rent_count_CountVal
        )
        val = Math.floor(val)
        this.req_body.error_rent_count = val
        return val
      },

      show_tensor_cores_count() {
        const min = 0
        const max = 1024
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
        ]
        let val = this.$noLinearNumAdd(
          min,
          max,
          stepArray,
          this.tensor_cores_CountVal
        )
        val = Math.floor(val)
        this.req_body.tensor_cores = val
        return val
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
        ]
        let val = this.$noLinearNumAdd(
          0,
          10000,
          stepArray,
          this.single_tflopsVal
        )
        val = Math.floor(val)
        this.req_body.single_precision_tflops = val
        return val
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
        ]
        let val = this.$noLinearNumAdd(
          0,
          10000,
          stepArray,
          this.double_tflopsVal
        )
        val = Math.floor(val)
        this.req_body.double_precision_tflops = val
        return val
      },
      showGpuRamSize() {
        const min = 0
        const max = 1024
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
        ]
        let val = this.$noLinearNumAdd(min, max, stepArray, this.gpuRamSizeVal)
        val = Math.floor(val)
        this.req_body.gpuRamSize = val
        return val + "G"
      },
      showGpuRamBandwidth() {
        const min = 0
        const max = 10000
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
        ]
        let val = this.$noLinearNumAdd(
          min,
          max,
          stepArray,
          this.gpuRamBandwidthVal
        )
        val = Math.floor(val)
        this.req_body.gpuRamBandwidth = val
        return val < 1000 ? val + "G" : val / 1000 + "T"
      },
      showPiceBandwidth() {
        const min = 0
        const max = 128000
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
        ]
        let val = this.$noLinearNumAdd(
          min,
          max,
          stepArray,
          this.piceBandwidthVal
        )
        val = Math.floor(val)
        this.req_body.piceBandwidth = val
        return val < 1000 ? val + "M" : val / 1000 + "G"
      },
      showCpuCores() {
        const min = 0
        const max = 8096
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
        ]
        let val = this.$noLinearNumAdd(min, max, stepArray, this.cpuCoresVal)
        val = Math.floor(val)
        this.req_body.cpuCores = val
        return val
      },
      showCpuRamSize() {
        const min = 0
        const max = 8096
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
        ]
        let val = this.$noLinearNumAdd(min, max, stepArray, this.cpuRamSizeVal)
        val = Math.floor(val)
        this.req_body.cpuRamSize = val
        return val + "G"
      },
      showDiskBandwidth() {
        const min = 0
        const max = 20000
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
        ]
        let val = this.$noLinearNumAdd(
          min,
          max,
          stepArray,
          this.diskBandwidthVal
        )
        val = Math.floor(val)
        this.req_body.diskBandwidth = val
        return val < 1000 ? val + "M" : val / 1000 + "G"
      },
      showInetUp() {
        const min = 0
        const max = 8096
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
        ]
        let val = this.$noLinearNumAdd(min, max, stepArray, this.inetUpVal)
        this.req_body.inetUp = val
        return val < 1000 ? val + "Mbps" : (val / 1000).toFixed(3) + "Gbps"
      },
      showInetDown() {
        const min = 0
        const max = 8096
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
        ]
        let val = this.$noLinearNumAdd(min, max, stepArray, this.inetDownVal)
        this.req_body.inetDown = val
        return val < 1000 ? val + "Mbps" : (val / 1000).toFixed(3) + "Gbps"
      }
    }
  }
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
</style>
