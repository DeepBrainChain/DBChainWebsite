<template>
  <div class="myAudit">
    <div class="title flex between vCenter">
      <div class="fw600 all_profit">{{ $t("audit.all_profit") }}: 5000 DBC</div>
      <div class="fw600 today_profit">{{ $t("audit.today_profit") }}: 500 DBC</div>
      <div class="fw600 all_machine">{{ $t("audit.all_machine") }}: {{allListedMachine.length}} <span class="fs12 cRed">{{ $t("audit.machineTips") }}</span></div>
      <div
        v-if="!isBinding && bindMail && $t('website_name') !== 'congTuCloud'"
        class="binding"
      >
        <span class="bindingInfo"
          >{{ $t("my_machine_binding_email") }}:{{ bindMail }}</span
        >
        <el-button class="ml10" size="mini" plain @click="openDlgMail(false)">{{
          $t("gpu.modifyMail")
        }}</el-button>
      </div>
      <div
        v-else-if="!isBinding && this.$t('website_name') != 'congTuCloud'"
        class="bind"
      >
        <el-button size="small" plain @click="openDlgMail(true)">{{
          $t("gpu.bindMail")
        }}</el-button>
        <span class="bindInfo ml10" v-html="$t('gpu.bindMailInfo')"></span>
      </div>
      <div v-else-if="isBinding">
        <span v-if="isBinding" class="bindInfo">{{
          $t("my_machine_vocing")
        }}</span>
      </div>
    </div>
    <ul>
      <li
        v-for="(item, index) in res_body.content"
        class="info-wrap"
        :key='index'
      >
        <div class="flex vCenter profit">
          <!-- <div class="today_profit">{{ $t("audit.today_profit") }}: 100 DBC</div> -->
          <div class="total_profit">{{ $t("audit.total_profit") }}: {{item.total_rent_fee}}</div>
        </div>
        <div class="flex status-title">
          <div class="machineIdBox" @click="Record">
            {{ item.machine_info_detail.committee_upload_info.machine_id }}
          </div>
          <!-- <div>{{ $t("audit.machineStatus") }}: {{ $t("audit.machineStatus1") }}</div> -->
          <div>{{ $t("audit.verificationTime") }}: {{item.reward_committee.length}}</div>
          <div>{{ $t("audit.myResult") }}: {{ item.machine_info_detail.committee_upload_info.is_support ? $t("audit.adopt") : $t("audit.failed") }}</div>
          <div>{{ $t("audit.finalResult") }}: {{ item.machine_info_detail.committee_upload_info.is_support ? $t("audit.adopt") : $t("audit.failed")}}</div>
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
                <a class="cPrimaryColor">{{ item.machine_info_detail.committee_upload_info.gpu_type }}</a>
                <a class="cRedbig">x{{ item.machine_info_detail.committee_upload_info.gpu_num }} GPU</a>
              </span>
            </el-tooltip>
          </div>
          <!-- <div class="td2">
            <span class="fs28">
              <a class="cPrimaryColor">{{ item.country }}</a>
            </span>
          </div> -->
        </div>
        <div class="flex">
          <div class="td">
            <span class="fs16">
              {{ $t("audit.Shd_space") }}：
              <a class="cPrimaryColor"
                >{{ item.machine_info_detail.committee_upload_info.sys_disk }}GB</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("audit.Dhd_space") }}：
              <a class="cPrimaryColor"
                >{{ item.machine_info_detail.committee_upload_info.data_disk }}GB</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_total_rent_count") }}：
              <a class="cPrimaryColor">{{ item.total_rented_times }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("audit.Memory") }}：
              <a class="cPrimaryColor"
                >{{ item.machine_info_detail.committee_upload_info.mem_num }}GB</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_gpu_ram_size") }}：
              <a class="cPrimaryColor"
                >{{ item.machine_info_detail.committee_upload_info.gpu_mem }}GB</a
              >
            </span>
          </div>

        </div>
        <div class="flex">
          <div class="td">
            <span class="fs16">
              {{ $t("audit.CPUcores") }}：
              <a class="cPrimaryColor"
                >{{ item.machine_info_detail.committee_upload_info.cpu_core_num }}</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("audit.CPUfrequency") }}：
              <a class="cPrimaryColor"
                >{{ item.machine_info_detail.committee_upload_info.cpu_rate }}GHz</a
              >
            </span>
          </div>
          <div class="td3">
            <span class="fs16">
              {{ $t("list_cpu_type") }}：
              <a class="cPrimaryColor">{{ item.machine_info_detail.committee_upload_info.cpu_type }}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <span class="fs16">
              {{ $t("list_inet_up") }}：
              <a class="cPrimaryColor"
                >{{ item.machine_info_detail.staker_customize_info.upload_net }}Mbps</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_inet_down") }}：
              <a class="cPrimaryColor"
                >{{ item.machine_info_detail.staker_customize_info.download_net }}Mbps</a
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
    <!--    bindMail-dlg-->
    <dlg-mail
      :open.sync="dlgMail_open"
      :is-new-mail="isNewMail"
      @binding="binding"
      @fail="bindFail"
    ></dlg-mail>

    <el-dialog :visible.sync="dialogTableVisible" width="580px">
      <div slot="title">{{$t('audit.record')}}</div>
      <el-table
        :data="tableData"
        header-align='center'
        style="width: 100%">
        <el-table-column
          prop="date"
          align='center'
          label="日期">
        </el-table-column>
        <el-table-column
          prop="address"
          align='center'
          label="收益">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import cookie from "js-cookie";
import DlgMail from "@/components/machine/dlg_bindMail";
import {
  queryBindMail_rent,
  binding_is_ok,
  binding_is_ok_modify,
  send_email_repeat,
  query_machines_by_machine_type,
} from "@/api";
import {
  getAccount,
  getBalance,
} from "@/utlis";

import { getCurrentPair } from "@/utlis/dot"
import { mapState } from "vuex"
import { leaseCommitteeOps, machinesInfo } from "@/utlis/dot/api"
export default {
  name: "myAudit_unlock",
  components: {
    DlgMail,
  },
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
      pageSize: 10,
      currentPage: 1,
      allListedMachine: [],
      res_body: {
        content: [],
      },
      tableData:[
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    };
  },
  watch: {
    "$i18n.locale"() {
      this.queryMc();
    },
  },
  beforeMount() {
    if (this.$t("website_name") === "congTuCloud") {
      this.styleHidden.visibility = "hidden";
    }
  },
  activated() {
    this.language = this.$i18n.locale;
    this.queryMail();
    this.getList();
  },
  deactivated() {
    
  },

  computed: {
    ...mapState(["isNewWallet"]),
  },
  methods: {
    // 绑定邮箱
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
        address = this.wallet_address
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
              wallet_address: this.wallet_address,
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
              wallet_address: this.wallet_address,
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
    send_email_repeat(item, index) {
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      this.send_email_repeatLoading = true;
      this.send_email_repeat_index = index;
      send_email_repeat({
        order_id: item.orderData.order_id,

        user_name_platform,
        language,
      })
        .then((res) => {
          if (res.status === 1) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success",
            });
          } else if (res.status === -1) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: this.$t("send_email_error"),
            type: "error",
          });
        })
        .finally(() => {
          this.send_email_repeatLoading = false;
          this.send_email_repeat_index = -1;
        });
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

    // 查询机器
    async getList(){
      let loadingInstance = this.$loading({target:'.myAudit'});
      let machinesList =  await leaseCommitteeOps('5D1vwMoK1DjBF7pfApKjT9Gi5C4DKHvZMztFRhTsMqo71B8r');
      // await machinesList.map( async el => {
      //   el[2] = await machinesInfo(el[0][1])
      // })
      let list = machinesList.online_machine
      for(let i = 0; i< list.length; i++){
        list[i] = await machinesInfo(list[i])
      }
      this.allListedMachine = list
      this.showMachines(this.allListedMachine, this.currentPage, this.pageSize)
      loadingInstance.close();
      console.log(this.res_body.content, 'this.res_body.content');
    },

    showMachines(machines, currentPage, pageSize) {
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
      this.res_body.content = needMachines; //需要展示的机器
      this.machineCount = machines.length; //展示的机器总数
    },
    handleSizeChange(pageSize) {
      console.log(`每页 ${pageSize} 条`);
      this.pageSize = pageSize;
      this.showMachines(this.allListedMachine, this.currentPage, this.pageSize);
    },
    handleCurrentChange(currentPage) {
      console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
      this.showMachines(this.allListedMachine, this.currentPage, this.pageSize);
    },
    // 查询历史记录
    Record(){
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

</style>
