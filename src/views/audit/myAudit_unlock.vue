<template>
  <div class="myAudit">
    <div class="title flex between vCenter">
      <div class="fw600 all_profit">{{ $t("audit.all_profit") }}: {{totalReward}} DBC</div>
      <div class="fw600 today_profit">{{ $t("audit.today_profit") }}: {{todayReward}} DBC</div>
      <div class="fw600 all_machine">{{ $t("audit.all_machine") }}: {{machineCount}} <span class="fs12 cRed">{{ $t("audit.machineTips") }}</span></div>
    </div>
    <ul>
      <li
        v-for="(item, index) in res_body.content"
        class="info-wrap"
        :key='index'
      >
        <div class="flex vCenter profit">
          <div class="today_profit">{{ $t("audit.today_profit") }}: {{getnum1(item.todayReward)}} DBC</div>
          <div class="total_profit">{{ $t("audit.total_profit") }}: {{getnum1(item.totalReward)}} DBC</div>
        </div>
        <div class="flex status-title">
          <div class="machineIdBox" @click="Record(item)">
            {{ item.info.machine_info_detail.committee_upload_info.machine_id }}
          </div>
          <!-- <div>{{ $t("audit.machineStatus") }}: {{ $t("audit.machineStatus1") }}</div> -->
          <div>{{ $t("audit.verificationTime") }}: {{item.info.reward_committee.length}}</div>
          <div>{{ $t("audit.myResult") }}: {{ item.info.machine_info_detail.committee_upload_info.is_support ? $t("audit.adopt") : $t("audit.failed") }}</div>
          <div>{{ $t("audit.finalResult") }}: {{ item.info.machine_info_detail.committee_upload_info.is_support ? $t("audit.adopt") : $t("audit.failed")}}</div>
          <!-- <div>{{ $t("audit.proportion") }}: 1:2</div> -->
        </div>
        <div class="flex">
          <div class="td2">
            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('list_gpu_count_tip')"
            >
              <span class="fs28">
                <a class="cPrimaryColor">{{ item.info.machine_info_detail.committee_upload_info.gpu_type }}</a>
                <a class="cRedbig">x{{ item.info.machine_info_detail.committee_upload_info.gpu_num }} GPU</a>
              </span>
            </el-tooltip>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <span class="fs16">
              {{ $t("audit.Shd_space") }}：
              <a class="cPrimaryColor"
                >{{ item.info.machine_info_detail.committee_upload_info.sys_disk }}GB</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("audit.Dhd_space") }}：
              <a class="cPrimaryColor"
                >{{ item.info.machine_info_detail.committee_upload_info.data_disk }}GB</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_total_rent_count") }}：
              <a class="cPrimaryColor">{{ item.info.total_rented_times }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("audit.Memory") }}：
              <a class="cPrimaryColor"
                >{{ item.info.machine_info_detail.committee_upload_info.mem_num }}GB</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_gpu_ram_size") }}：
              <a class="cPrimaryColor"
                >{{ item.info.machine_info_detail.committee_upload_info.gpu_mem }}GB</a
              >
            </span>
          </div>

        </div>
        <div class="flex">
          <div class="td">
            <span class="fs16">
              {{ $t("audit.CPUcores") }}：
              <a class="cPrimaryColor"
                >{{ item.info.machine_info_detail.committee_upload_info.cpu_core_num }}</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("audit.CPUfrequency") }}：
              <a class="cPrimaryColor"
                >{{ item.info.machine_info_detail.committee_upload_info.cpu_rate }}GHz</a
              >
            </span>
          </div>
          <div class="td3">
            <span class="fs16">
              {{ $t("audit.CPUmodel") }}：
              <a class="cPrimaryColor">{{ item.info.machine_info_detail.committee_upload_info.cpu_type }}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <span class="fs16">
              {{ $t("list_inet_up") }}：
              <a class="cPrimaryColor"
                >{{ item.info.machine_info_detail.staker_customize_info.upload_net }}Mbps</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_inet_down") }}：
              <a class="cPrimaryColor"
                >{{ item.info.machine_info_detail.staker_customize_info.download_net }}Mbps</a
              >
            </span>
          </div>
        </div>
      </li>
    </ul>
    <div class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="machineCount"
      >
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogTableVisible" width="580px">
      <div slot="title">{{$t('audit.record')}}</div>
      <el-table
        :data="tableData"
        header-align='center'
        height="300"
        style="width: 100%">
        <el-table-column
          prop="index"
          align='center'
          :label="label1">
        </el-table-column>
        <el-table-column
          prop="reward"
          align='center'
          :label="label2">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { searchMachine } from "@/api";
import { getAccount } from "@/utlis";
import BigNumber from "bignumber.js";
import { getCurrentPair } from "@/utlis/dot"
import { mapState } from "vuex"
import { currentEra, erasMachineReleasedReward } from "@/utlis/dot/api"
export default {
  name: "myAudit_unlock",
  data() {
    return {
      wallet_address: (getAccount() && getAccount().address) || (getCurrentPair() && getCurrentPair().address),
      styleHidden: {},
      dlgMail_open: false,
      isNewMail: false,
      isBinding: false,
      bindMail: "",
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
        gpuCount: 1,
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
        double_precision_tflops: 0,
      },
      language: undefined,
      send_email_repeatLoading: false,
      send_email_repeat_index: -1,
      dialogTableVisible: false,
      machineCount: 0,
      todayReward: 0,
      totalReward: 0,
      label1: this.$t('audit.date'),
      label2: this.$t('audit.income'),
      pageSize1: 1,
      pageNum: 10,
      pageSize: 10,
      currentPage: 1,
      allListedMachine: [],
      res_body: {
        content: [],
      },
      tableData:[]
    };
  },
  watch: {
    "$i18n.locale"() {
      this.label1 = this.$t('audit.date')
      this.label2 = this.$t('audit.income')
    },
  },
  beforeMount() {
    if (this.$t("website_name") === "congTuCloud") {
      this.styleHidden.visibility = "hidden";
    }
  },
  activated() {
    this.language = this.$i18n.locale;
    // this.queryMail();
    this.getList();
  },
  deactivated() {
    
  },

  computed: {
    ...mapState(["isNewWallet"]),
  },
  methods: {
    // 查询机器
    getnum1(num) {
      const num1 = new BigNumber(Number(num)/ Math.pow(10,15)).toFormat()
      let hasPoint;
      num1.indexOf(".") >= 0? hasPoint = true: hasPoint = false
      return num1.substring(0,num1.indexOf(".")+3);
    },
    async getList(){
      let loadingInstance = this.$loading({target:'.myAudit'});
      searchMachine({pageSize: this.pageSize1, pageNum: this.pageNum, wallet: this.wallet_address}).then(res => {
        if(res.success){
          this.todayReward = this.getnum1(res.todayReward)
          this.totalReward = this.getnum1(res.totalReward)
          this.machineCount = res.total
          this.res_body.content = res.count
        }else{
          if(res.code == 10001){
            this.$message.error(this.$t('audit.err_tip1'))
          }else{
            this.$message.error(this.$t('audit.err_tip2'))
          }
          this.todayReward = 0
          this.totalReward = 0
          this.machineCount = 0
          this.res_body.content = []
        }
      })
      loadingInstance.close();
    },

    async showMachines(machines, currentPage, pageSize) {
      let loadingInstance = this.$loading({target:'.myAudit'});
      let needMachines = []; //需要展示的机器
      // 循环页面要显示的机器数量次
      for (
        let machineIndex = (currentPage - 1) * pageSize; //当前分页机器起始索引
        machineIndex < currentPage * pageSize && //当前分页机器索引范围
        machineIndex < machines.length; //机器索引最大值
        machineIndex++
      ) {
        needMachines.push(machines[machineIndex]);
      }
      let nowDay = await currentEra();
      for(let i = 0; i< needMachines.length; i++){
        needMachines[i].online_day = parseInt((needMachines[i].info.online_height.replace(',',''))/2880) // 获取机器第几天上线
        let day = needMachines[i].online_day + 1
        while( day < nowDay ){
          needMachines[i].reward.push( await erasMachineReleasedReward(day, needMachines[i].info.machine_info_detail.committee_upload_info.machine_id) ) // 计算从上线以后每一天的收益
          day ++ 
        }
      }
      for(let i = 0; i< needMachines.length; i++){
        let reward = needMachines[i].reward.length&&needMachines[i].reward.reduce(function(a, b) { 
          return a + b;
        })
        this.$set(needMachines[i], 'totalReward', this.getnum1(reward/99/needMachines[i].info.reward_committee.length)) // 计算累计收益
      }
      console.log(needMachines, 'needMachines');
      this.res_body.content = needMachines; //需要展示的机器
      this.machineCount = machines.length; //展示的机器总数
      loadingInstance.close();
    },
    handleSizeChange(pageSize) {
      console.log(`每页 ${pageSize} 条`);
      this.pageNum = pageSize;
      this.getList()
      // this.pageSize = pageSize;
      // this.showMachines(this.allListedMachine, this.currentPage, this.pageSize);
    },
    handleCurrentChange(currentPage) {
      console.log(`当前页: ${currentPage}`);
      this.pageSize1 = currentPage;
      this.getList()
      // this.currentPage = currentPage;
      // this.showMachines(this.allListedMachine, this.currentPage, this.pageSize);
    },
    // 查询历史记录
    Record(data){
      this.tableData = data.reward.map( (el, index) => {
        return { index: (index+1), reward: this.getnum1(el/99/data.info.reward_committee.length) }
      })
      this.dialogTableVisible = true
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";

.title {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 20px;
  line-height: 20px;
  .fw600{
    font-weight: 600;
  }
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
    .machineIdBox {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 510px;
      height: 50px;
      border: 1px solid #195d91;
      border-radius: 2px;
      color: #195d91;
      font-size: 14px;
      font-weight: 500;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }
    .machineIdBox:hover {
      background: #195d91;
      color: #ffffff;
      opacity: 0.7;
    }
  }

  .profit{
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    border-bottom: 1px solid #999;
    div{
      width: 260px;
    }
  }
}
.paging {
  .el-pagination {
    display: flex;
    justify-content: center;
  }
}

@media screen and (max-width: 1600px) {
  .title{
    font-size: 16px;
  }
  .info-wrap {
    font-size: 12px;
  }
}

</style>
