<template>
  <div class="machine">
    <div class="machineData-wrap">
      <drop-item class="machine-item" title="国家"></drop-item>
      <!--      <drop-item class="machine-item" title="Image" :dropList="images"></drop-item>-->
      <drop-item class="machine-item" :title="$t('gpu.mcStatusTitle')" v-model="req_body.status" :dropList="mcStatus"
                 @selected="queryMc"></drop-item>
      <slide-item class="machine-item"
                  :title="$t('gpu.cumulativeDuration')"
                  v-model="totalTimeVal"
                  :min="0"
                  :max="100"
                  :step="1"
                  @change="queryMc"
      >{{showTotalTime}}
      </slide-item>
      <slide-item class="machine-item"
                  :title="$t('gpu.reliability')"
                  v-model="reliabilityVal"
                  :min="0"
                  :max="100"
                  :step="1"
                  @change="queryMc"
      >{{showReliability}}
      </slide-item>
      <slide-item class="machine-item"
                  title="Disk Space To Allocate"
                  v-model="diskSpaceVal"
                  :min="0"
                  :max="100"
                  :step="1"
                  @change="queryMc"
      >{{showDiskSpace}}
      </slide-item>
      <slide-item class="machine-item"
                  title="$/GB"
                  v-model="diskPriceVal"
                  :min="0"
                  :max="100"
                  :step="1"
                  @change="queryMc"
      >{{showDiskPrice}}
      </slide-item>
      <slide-item class="machine-item"
                  :title="$t('gpu.lengthOfAvailableTime')"
                  v-model="lengthOfAvailableTimeVal"
                  :min="0"
                  :max="100"
                  :step="1"
                  @change="queryMc"
      >{{showlengthOfAvailableTime}}
      </slide-item>
      <slide-item class="machine-item"
                  title="$/GPU"
                  v-model="gpuPriceVal"
                  :min="0"
                  :max="100"
                  :step="1"
                  @change="queryMc"
      >{{showGpuPrice}}
      </slide-item>
      <slide-item class="machine-item"
                  title="GPU Count"
                  v-model="gpuCountVal"
                  :min="0"
                  :max="100"
                  :step="1"
                  @change="queryMc"
      >{{showGpuCount}}
      </slide-item>
      <slide-item class="machine-item"
                  title="TFLOPS(Total)"
                  v-model="tflopsVal"
                  :min="0"
                  :max="100"
                  :step="1"
                  @change="queryMc"
      >{{showTflops}}
      </slide-item>
      <slide-item class="machine-item"
                  title="GPU RAM"
                  v-model="gpuRamSizeVal"
                  :min="0"
                  :max="100"
                  :step="1"
                  @change="queryMc"
      >{{showGpuRamSize}}
      </slide-item>
      <slide-item class="machine-item"
                  title="GPU RAM Bandwidth"
                  v-model="gpuRamBandwidthVal"
                  :min="0"
                  :max="100"
                  :step="1"
                  @change="queryMc">{{showGpuRamBandwidth}}
      </slide-item>
      <slide-item class="machine-item"
                  title="PICE Bandwidth"
                  v-model="piceBandwidthVal"
                  :min="0"
                  :max="100"
                  :step="1"
                  @change="queryMc"
      >{{showPiceBandwidth}}
      </slide-item>
      <slide-item class="machine-item"
                  title="Cpu Cores"
                  v-model="cpuCoresVal"
                  :min="0"
                  :max="100"
                  :step="1"
                  @change="queryMc"
      >{{showCpuCores}}
      </slide-item>
      <slide-item class="machine-item"
                  title="Cpu Ram"
                  v-model="cpuRamSizeVal"
                  :min="0"
                  :max="100"
                  :step="1"
                  @change="queryMc"
      >{{showCpuRamSize}}
      </slide-item>
      <slide-item class="machine-item"
                  title="Disk Bandwidth"
                  v-model="diskBandwidthVal"
                  :min="0"
                  :max="100"
                  :step="1"
                  @change="queryMc"
      >{{showDiskBandwidth}}
      </slide-item>
      <slide-item class="machine-item"
                  title="Inet Up"
                  v-model="inetUpVal"
                  :min="0"
                  :max="100"
                  :step="1"
                  @change="queryMc"
      >{{showInetUp}}
      </slide-item>
      <slide-item class="machine-item"
                  title="Inet Down"
                  v-model="inetDownVal"
                  :min="0"
                  :max="100"
                  :step="1"
                  @change="queryMc"
      >{{showInetDown}}
      </slide-item>

    </div>
    <div class="info-wrap">
      <div class="flex status-title">
        <div>
          <span class="fs16">ID: <a class="is-link" href="javascript:" @click="pushDetail">sfssfsfsdfgsdfdf</a>
          <span class="pl100">$ 0.404/hr</span>
          </span>
        </div>
        <!--        <el-button style="width: 100px" type="primary" size="mini" @click="openDlg">租用</el-button>-->
      </div>
      <div class="flex">
        <div class="td">
          <div>2X RTX 2080TI</div>
          <div></div>
        </div>
        <div class="td">
          <div>
            Z10PE
          </div>
          <div class="cPrimaryColor fs12">
            PCIE 3.0, 16x 5.5GB/s
          </div>
        </div>
        <div class="td">
          <div>
            {{$t('gpu.totalTime')}}
          </div>
          <div class="cPrimaryColor">
            100h
          </div>
        </div>
        <div class="td">
          <div>Up Speed</div>
          <div class="cPrimaryColor fs12">26.7 Mbps</div>
        </div>
        <div class="td">
          <div>Down Speed</div>
          <div class="cPrimaryColor fs12">26.7 Mbps</div>
        </div>
      </div>
      <div class="flex">
        <div class="td">
          <div>Max Duration</div>
          <div class="cPrimaryColor fs12">1 mon, 28d</div>
        </div>
        <div class="td">
          <div>Max CUDA</div>
          <div class="cPrimaryColor fs12">1234</div>
        </div>
        <div class="td">
          <div>TFLOPS</div>
          <div class="cPrimaryColor fs12">36.6</div>
        </div>
        <div class="td">

        </div>
        <div class="td">
          <div class="cPrimaryColor">Xeon E5-2620 v3</div>
          <div class="cPrimaryColor fs12">12.0/24 Cores 64/129 GB</div>
        </div>
      </div>
      <div class="flex">
        <div class="td">
          <div>{{$t('gpu.storage')}}</div>
          <div class="cPrimaryColor fs12">2106MB/s 590.5GB</div>
        </div>
        <div class="td">
          <div class="cPrimaryColor">38.6 DLPerf</div>
          <div class="cPrimaryColor ps12">95.5 DLP/$/hr</div>
        </div>
        <div class="td">
          <div>{{$t('gpu.reliable')}}</div>
          <div class="cPrimaryColor fs12">98%</div>
        </div>
        <div class="td"></div>
        <div class="td"></div>
      </div>
    </div>
    <dlg-lease :open.sync="dlg_open"></dlg-lease>
  </div>
</template>

<script>
  import DropItem from '@/components/machine/dropItem'
  import SlideItem from '@/components/machine/slideItem'
  import DlgLease from '@/components/machine/dlg_lease'

  export default {
    name: "list",
    data() {
      return {
        dlg_open: false,
        curVal: 0,
        // 机器状态下拉
        mcStatus: [
          {
            name: this.$t('gpu.mcStatus[0]'),
            value: 0
          },
          {
            name: this.$t('gpu.mcStatus[1]'),
            value: 1
          },
          {
            name: this.$t('gpu.mcStatus[2]'),
            value: 2
          }
        ],

        totalTimeVal: 1, // 使用时长
        reliabilityVal: 90, // 历史可靠性
        diskSpaceVal: 0, // 硬盘空间
        diskPriceVal: 0.00001, // 硬盘价格
        lengthOfAvailableTimeVal: 1, //可用时长
        gpuPriceVal: 0.00001,
        gpuCountVal: 0,
        tflopsVal: 1,
        gpuRamSizeVal: 1,
        gpuRamBandwidthVal: 1,
        piceBandwidthVal: 1,
        cpuCoresVal: 1,
        cpuRamSizeVal: 1,
        diskBandwidthVal: 1,
        inetUpVal: 0.5,
        inetDownVal: 0.5,

        images: [
          {
            name: 'TesorFlow',
            value: 1
          },
          {
            name: 'other',
            value: 2
          }
        ],
        req_body: {
          county: '中国',
          status: 0,
          totalTime: 1,
          reliability: 0.9,
          diskSpace: 10,
          diskPrice: 0.00001,
          lengthOfAvailableTime: 1,
          gpuPrice: 0.00001,
          gpuCount: 0,
          tflops: 5,
          gpuRamSize: 1,
          gpuRamBandwidth: 10,
          piceBandwidth: 50,
          cpuCores: 1,
          cpuRamSize: 1,
          diskBandwidth: 50,
          inetUp: 0.5,
          inetDown: 0.5
        }
      }
    },
    watch: {
      curVal(newVal) {

      }
    },
    methods: {
      pushDetail() {
        this.$router.push('/miner/machineDetail')
      },
      openDlg() {
        this.dlg_open = true
      },
      queryMc() {
        console.log(this.req_body)
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
          showTotalTime = hours + 'hrs'
          this.req_body.totalTime = hours
        } else if (this.totalTimeVal >= 24 && this.totalTimeVal < 54) {
          day = (this.totalTimeVal - 24) + 1
          showTotalTime = day + 'days'
          this.req_body.totalTime = day * 24
        } else if (this.totalTimeVal >= 54 && this.totalTimeVal <= 100) {
          month = (this.totalTimeVal - 54) + 1
          showTotalTime = month + 'mon'
          this.req_body.totalTime = month * 720
        }
        return showTotalTime
      },
      showReliability() {
        this.req_body.reliability = this.reliabilityVal / 100
        return this.reliabilityVal > 0 ? `${this.reliabilityVal}%` : 'New'
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
        val += 10
        this.req_body.diskSpace = val
        return val >= 1000 ? (val / 1000).toFixed(1) + 'T' : val + 'G'
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
        return '$' + money
      },
      showlengthOfAvailableTime() {
        let showTotalTime = 0
        let hours = 0
        let day = 0
        let month = 0
        if (this.lengthOfAvailableTimeVal < 24) {
          hours = this.lengthOfAvailableTimeVal
          showTotalTime = hours + 'hrs'
          this.req_body.lengthOfAvailableTime = hours
        } else if (this.lengthOfAvailableTimeVal >= 24 && this.lengthOfAvailableTimeVal < 54) {
          day = (this.lengthOfAvailableTimeVal - 24) + 1
          showTotalTime = day + 'days'
          this.req_body.lengthOfAvailableTime = day * 24
        } else if (this.lengthOfAvailableTimeVal >= 54 && this.lengthOfAvailableTimeVal <= 100) {
          month = (this.lengthOfAvailableTimeVal - 54) + 1
          showTotalTime = month + 'mon'
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
        return '$' + money
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
      showTflops() {
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
        let val = this.$noLinearNumAdd(5, 10000, stepArray, this.tflopsVal)
        val = Math.floor(val)
        this.req_body.tflops = val
        return val
      },
      showGpuRamSize() {
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
        let val = this.$noLinearNumAdd(min, max, stepArray, this.gpuRamSizeVal)
        val = Math.floor(val)
        this.req_body.gpuRamSize = val
        return val + 'G'
      },
      showGpuRamBandwidth() {
        const min = 10
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
        let val = this.$noLinearNumAdd(min, max, stepArray, this.gpuRamBandwidthVal)
        val = Math.floor(val)
        this.req_body.gpuRamBandwidth = val
        return val < 1000 ? val + 'G' : val / 1000 + 'T'
      },
      showPiceBandwidth() {
        const min = 50
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
        let val = this.$noLinearNumAdd(min, max, stepArray, this.piceBandwidthVal)
        val = Math.floor(val)
        this.req_body.piceBandwidth = val
        return val < 1000 ? val + 'M' : val / 1000 + 'G'

      },
      showCpuCores() {
        const min = 1
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
        const min = 1
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
        return val + 'G'
      },
      showDiskBandwidth() {
        const min = 50
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
        let val = this.$noLinearNumAdd(min, max, stepArray, this.diskBandwidthVal)
        val = Math.floor(val)
        this.req_body.diskBandwidth = val
        return val < 1000 ? val + 'M' : val / 1000 + 'G'
      },
      showInetUp() {
        const min = 0.5
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
        return val < 1000 ? val + 'Mbps' : (val / 1000).toFixed(3) + 'Gbps'
      },
      showInetDown() {
        const min = 0.5
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
        return val < 1000 ? val + 'Mbps' : (val / 1000).toFixed(3) + 'Gbps'
      }

    },
    components: {
      DropItem,
      SlideItem,
      DlgLease
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
    padding: 15px 20px 12px;
    border: 1px solid #979797;
    color: #666;
    font-size: 14px;

    .status-title {
      padding-bottom: 17px;
    }

    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;

      .td {
        width: 20%;
        line-height: 24px;

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

        div {
          height: 24px;
        }
      }
    }
  }

</style>
