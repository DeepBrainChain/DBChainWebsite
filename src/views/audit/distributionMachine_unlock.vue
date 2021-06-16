<template>
  <div>
    <div class="title">
      <div></div>
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
        <div class="flex status-title">
          <div class="verification_time f16 c333">{{ $t("audit.mytime") }}: 0-3h49m / 11h45-15h45m / 19h45m-23h45m</div>
          <div class="center">
            <el-button 
              v-if="item.usage_type == 1"
              style="width: 120px"
              type="primary"
              size="mini"
              @click="verification(item, index)"
              >{{ $t("audit.verification") }}</el-button
            >
            <el-button
              v-else-if="item.usage_type == 2"
              style="width: 155px"
              type="primary"
              size="mini"
              @click="verification(item, index)"
              >{{ $t("audit.verification1") }}</el-button
            >
            <el-button
              v-else
              style="width: 155px"
              type="primary"
              size="mini"
              @click="verification(item, index)"
              >{{ $t("audit.verification2") }}</el-button
            >
            <div v-if="item.usage_type == 0" class="verification_tips">{{ $t("audit.verification_tips1") }}</div>
            <div v-else class="verification_tips">{{ $t("audit.verification_tips1") }}</div>
          </div>
        </div>
        <div class="flex">
          <div class="machineIdBox">
            {{ item.machine_id }}
          </div>
        </div>
        <div class="flex">
          <div class="td2">
            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('list_gpu_count_tip')"
            >
              <span class="fs28">
                <a class="cPrimaryColor">{{ item.gpu_type }}</a>
                <a class="cRedbig">x{{ item.gpu_count }} GPU</a>
              </span>
            </el-tooltip>
          </div>
          <div class="td2">
            <span class="fs28">
              <a class="cPrimaryColor">{{ item.country }}</a>
            </span>
          </div>
          <div class="td" v-if="item.can_rent_start_time_later < 0">
            <span class="fs16">
              <a class="cPrimaryColor">{{ -item.can_rent_start_time_later }}</a>
              {{ $t("list_start_rentout") }}
            </span>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <span class="fs16">
              {{ $t("list_idle_gpus") }}:
              <a class="cPrimaryColor">{{
                item.gpu_count - item.gpu_be_used
              }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_length_of_available_time") }}：
              <a class="cPrimaryColor"
                >{{ Math.floor(item.length_of_available_time)
                }}{{ $t("my_machine_hour") }}</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_total_time_be_used") }}：
              <a class="cPrimaryColor">{{
                $minsToHourMins(item.total_time_be_used)
              }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_total_rent_count") }}：
              <a class="cPrimaryColor">{{ item.total_rent_count }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_error_rent_count") }}：
              <a class="cPrimaryColor">{{ item.error_rent_count }}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.tensor_cores > 0" class="td">
            <span class="fs16">
              Tensor Cores：
              <a class="cPrimaryColor">{{ item.tensor_cores }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_cuda_version") }}：
              <a class="cPrimaryColor">{{ item.cuda_version }}</a>
            </span>
          </div>
          <div class="td">
            <span v-if="item.disk_space" class="fs16">
              {{ $t("list_disk_space") }}：
              <a class="cPrimaryColor"
                >{{ parseInt(item.disk_space / (1024 * 1024)) }}GB</a
              >
              <a class="cPrimaryColor">&nbsp;&nbsp;{{ item.disk_type }}</a>
            </span>
          </div>
          <div class="td3">
            <span class="fs16">
              {{ $t("list_cpu_type") }}：
              <a class="cPrimaryColor">{{ item.cpu_type }}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.half_precision_tflops > 0" class="td">
            <span class="fs16">
              {{ $t("list_half_precision_tflops") }}：
              <a class="cPrimaryColor"
                >{{ item.half_precision_tflops }}TFLOPS</a
              >
            </span>
          </div>
          <div v-if="item.gpu_ram_size > 0" class="td">
            <span class="fs16">
              {{ $t("list_gpu_ram_size") }}：
              <a class="cPrimaryColor"
                >{{ parseInt(item.gpu_ram_size / (1000 * 1000)) }}GB</a
              >
            </span>
          </div>
          <div v-if="item.disk_bandwidth > 0" class="td">
            <span class="fs16">
              {{ $t("list_disk_bandwidth") }}：
              <a class="cPrimaryColor"
                >{{ parseInt(item.disk_bandwidth / 1024) }}MB/s</a
              >
            </span>
          </div>
          <div v-if="item.cpu_numbers > 0" class="td">
            <span class="fs16">
              {{ $t("list_cpu_numbers") }}：
              <a class="cPrimaryColor">{{ item.cpu_numbers }}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.single_precision_tflops > 0" class="td">
            <span class="fs16">
              {{ $t("list_single_precision_tflops") }}：
              <a class="cPrimaryColor"
                >{{ item.single_precision_tflops }}TFLOPS</a
              >
            </span>
          </div>
          <div v-if="item.gpu_ram_bandwidth > 0" class="td">
            <span class="fs16">
              {{ $t("list_gpu_ram_bandwidth") }}：
              <a class="cPrimaryColor"
                >{{ parseInt(item.gpu_ram_bandwidth / (1024 * 1024)) }}GB/s</a
              >
            </span>
          </div>
          <div v-if="item.inet_up > 0" class="td">
            <span class="fs16">
              {{ $t("list_inet_up") }}：
              <a class="cPrimaryColor"
                >{{ parseInt(item.inet_up / 1024) }}Mbps</a
              >
            </span>
          </div>
          <div v-if="item.ram_size > 0" class="td">
            <span class="fs16">
              {{ $t("list_ram_size") }}：
              <a class="cPrimaryColor"
                >{{ parseInt(item.ram_size / (1024 * 1024)) }}GB</a
              >
            </span>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.double_precision_tflops > 0" class="td">
            <span class="fs16">
              {{ $t("list_double_precision_tflops") }}：
              <a class="cPrimaryColor"
                >{{ item.double_precision_tflops }}TFLOPS</a
              >
            </span>
          </div>
          <div v-if="item.pcie_bandwidth > 0" class="td">
            <span class="fs16">
              {{ $t("list_pcie_bandwidth") }}：
              <a class="cPrimaryColor"
                >{{ parseInt(item.pcie_bandwidth / (1024 * 1024)) }}GB/s</a
              >
            </span>
          </div>
          <div v-if="item.inet_down > 0" class="td">
            <span class="fs16">
              {{ $t("list_inet_down") }}：
              <a class="cPrimaryColor"
                >{{ parseInt(item.inet_down / 1024) }}Mbps</a
              >
            </span>
          </div>
          <div class="td3">
            <span class="fs16">
              {{ $t("list_os") }}：
              <a class="cPrimaryColor">{{ item.os }}</a>
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
export default {
  name: "distributionMachine_unlock",
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
    this.queryMc();
    this.queryMail();
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
    arrangeAllMachines(res) {
      let machines = []; //所有可展示机器
      for (let item of res.content) {
        // console.log(item);
        if (item.online_status) {
          machines.push(item);
        }
      }
      // console.log(machines);
      this.res_body.code = res.code; //原始返回数据
      this.res_body.msg = res.msg; //原始返回数据
      this.res_body.status = res.status; //原始返回数据
      this.allListedMachine = machines; //所有可展示机器
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
        language: this.language,
      };
      query_machines_by_machine_type(params).then((res) => {
        // this.res_body = res;
        this.arrangeAllMachines(res);
        this.showMachines(
          this.allListedMachine,
          this.currentPage,
          this.pageSize
        );
      });
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
    // 开时验证
    verification(item,index){
      this.$message({
        showClose: true,
        message: this.$t('audit.tipmsg3'),
        type: "success",
      });
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

    .verification_time{
      font-weight: bold;
    }
    
    .verification_tips{
      font-size: 10px;
      color: red;  
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
      width: 396.67px;
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
}
.paging {
  .el-pagination {
    display: flex;
    justify-content: center;
  }
}

</style>
