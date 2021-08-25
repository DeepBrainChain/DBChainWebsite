<template>
  <div class="machine">
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
          <div class="verification_time f16 c333">{{ $t("audit.mytime") }}:
            <span v-for="(el, idx) in item.verify_time" class="fs14" :key="idx">
              {{el.timestart}}-{{el.timeend}}
              <i v-if="idx != item.verify_time.length-1" class="f16"> | </i>
            </span>
          </div>
          <div class="center">
            <el-button 
              v-if="item.machine_status == 'CommitteeVerifying'"
              style="width: 120px"
              type="primary"
              size="mini"
              @click="verification(item, 0)"
              >{{ $t("audit.verification") }}</el-button
            >
            <el-button
              v-else-if="item.machine_status == 'booked'"
              style="width: 155px"
              type="primary"
              size="mini"
              :disabled='!item.submit'
              @click="verification(item, 1)"
              >{{ $t("audit.verification1") }}</el-button
            >
            <el-button
              v-else
              style="width: 155px"
              type="primary"
              size="mini"
              :loading="item.btnloading1"
              @click="verification(item, 2)"
              >{{ $t("audit.verification2") }}</el-button
            >
            <div v-if="item.machine_status == 'booked'" class="verification_tips">{{ $t("audit.verification_tips") }}</div>
            <div v-else-if="item.machine_status == 'CommitteeVerifying'" class="verification_tips">{{ $t("audit.verification_tips1") }}</div>
          </div>
        </div>
        <div class="flex">
          <div class="machineIdBox">
            {{ item.booked_committee }}
          </div>
        </div>
        <!-- <div class="flex">
          <div class="td2">
            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('list_gpu_count_tip')"
            >
              <span class="fs28">
                <a class="cPrimaryColor">{{ item.gpu_type }}</a>
                <a class="cRedbig">x{{ item.gpu_num }} GPU</a>
              </span>
            </el-tooltip>
          </div>
        </div> -->
        <div class="flex">
          <div class="td">
            <span class="fs16">
              Cuda_core：
              <a class="cPrimaryColor">{{ item.cuda_core }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_gpu_ram_size") }}：
              <a class="cPrimaryColor"
                >{{ parseInt(item.gpu_mem / (1000 * 1000)) }}GB</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t("audit.SGC_power")}}：
              <a class="cPrimaryColor">{{ item.calc_point }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t("audit.Shd_space")}}：
              <a class="cPrimaryColor">{{ parseInt(item.sys_disk / (1000 * 1000)) }}GB</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t("audit.Dhd_space")}}：
              <a class="cPrimaryColor">{{ item.data && item.data.disk.size }}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <span class="fs16">
              {{ $t('list_cpu_numbers')}}：
              <a class="cPrimaryColor">{{ item.data && item.data.cpu.num }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t('audit.CPUfrequency')}}：
              <a class="cPrimaryColor">{{ item.cpu_rate }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('list_ram_size')}}：
              <a class="cPrimaryColor">{{ item.data && item.data.mem }}</a>
            </span>
          </div>
          <div class="td3">
            <span class="fs16">
              {{ $t("list_cpu_type") }}：
              <a class="cPrimaryColor">{{ item.data && item.data.cpu.type }}</a>
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
    <!-- bindMail-dlg-->
    <dlg-mail
      :open.sync="dlgMail_open"
      :is-new-mail="isNewMail"
      @binding="binding"
      @fail="bindFail"
    ></dlg-mail>

    <!-- 提交信息 -->
    <el-dialog :visible.sync="dialogTableVisible1" width="580px">
      <div slot="title">{{$t('audit.seeDetails3')}}</div>
      <el-form :model="formInline" class="form-inline">
        <el-form-item :label="$t('audit.GPUmodel')+':'">
          <el-select :disabled='radioDisabled' size="small" @change="selectCPU" v-model="formInline.gpu_type" placeholder="请选择">
            <el-option
              v-for="item in GPUmodelList"
              :key="item.gpu_type"
              :label="item.gpu_type"
              :value="item.gpu_type">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="select" :label="$t('audit.CC_num')+':'">
          <span>{{formInline.cuda_core}}</span>
        </el-form-item>
        <el-form-item v-show="select" :label="$t('audit.Memoryvalue')+':'">
          <span>{{ formInline.gpu_mem }}GB</span>
        </el-form-item>
        <el-form-item v-show="select" :label="$t('audit.GPUnumber')+':'">
          <el-select :disabled='radioDisabled' size="small" @change="selectCPUNum" v-model="formInline.gpu_num" placeholder="请选择">
            <el-option
              v-for="item in GPUnumberList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('audit.CPUcores')+':'">
          <span>{{formInline.cpu_core_num}}</span>
        </el-form-item>
        <el-form-item :label="$t('audit.CPUmodel')+':'">
          <span>{{ formInline.cpu_type }}</span>
        </el-form-item>
        <el-form-item :label="$t('audit.CPUfrequency')+':'">
          <span>{{formInline.cpu_rate}}</span>
        </el-form-item>
        <el-form-item :label="$t('audit.Memory')+':'">
          <span>{{ formInline.mem_num }}</span>
        </el-form-item>
        <el-form-item :label="$t('audit.Shd_space')+':'">
          <span>{{ parseInt(formInline.sys_disk / (1000 * 1000)) }}GB</span>
        </el-form-item>
        <el-form-item :label="$t('audit.Dhd_space')+':'">
          <span>{{ formInline.data_disk }}</span>
        </el-form-item>
        <el-form-item v-show="select1" :label="$t('audit.SGC_power')+':'">
          <el-input size="small" style="width:200px" v-model="formInline.calc_point"></el-input>
        </el-form-item>
        <el-form-item :label="$t('audit.Vresults')+':'" prop="radio">
          <el-radio :disabled='radioDisabled' v-model="formInline.is_support" label="1">有问题</el-radio>
          <el-radio :disabled='radioDisabled' v-model="formInline.is_support" label="0">没问题</el-radio>
        </el-form-item>
        <el-form-item :label="$t('verifyPassward')+':'" prop="passward">
          <el-input size="small" style="width:200px" v-model="formInline.passward" show-password :placeholder="$t('verifyPassward')"></el-input>
        </el-form-item>
        <el-form-item class="dlg-bottom">
          <el-button class="dlg-bttn" :loading="btnloading" plain size="small" @click="commit">{{$t('confirm')}}</el-button>
          <el-button class="dlg-bn" plain size="small" @click="cancel1">{{$t('cancel')}}</el-button>
        </el-form-item>
      </el-form>
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
  getGPUList,
  getMachineList,
  Save_GrabbingHash,
  GetGrabbingHash
} from "@/api";
import {
  getAccount,
  getBalance,
  getBlockchainTime,
  getComputing_Power
} from "@/utlis";

import { getCurrentPair, getRand_str, CreateSignature } from "@/utlis/dot"
import { ConfirmHash, ConfirmRaw, getBlockTime } from "@/utlis/dot/api"
import { mapState, mapMutations } from "vuex"
export default {
  name: "distributionMachine_unlock",
  components: {
    DlgMail,
  },
  computed: {
    ...mapState(["isNewWallet", "passward"]),
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
      formInline: {
        machine_id:'',
        gpu_type:'',
        gpu_num:'',
        cuda_core:'',
        gpu_mem: '',
        calc_point:'',
        sys_disk:'',
        data_disk:'',
        cpu_type: '',
        cpu_core_num:'',
        cpu_rate:'',
        mem_num:'',
        rand_str: getRand_str(),
        is_support: '1',
        passward:'',
      },
      sclectItem: {
        calc_point: "",
        cuda_core: "",
        gpu_mem: "",
        gpu_type: ""
      },
      GPUmodelList:[],
      GPUnumberList:[
        {
          value: "1",
          label: "1"
        }, {
          value: "2",
          label: "2"
        }, {
          value: "3",
          label: "3"
        }, {
          value: "4",
          label: "4"
        }, {
          value: "5",
          label: "5"
        }, {
          value: "6",
          label: "6"
        }, {
          value: "7",
          label: "7"
        }, {
          value: "8",
          label: "8"
        }, {
          value: "9",
          label: "9"
        }, {
          value: "10",
          label: "10"
        }
      ],
      dialogTableVisible1: false,
      btnloading: false,
      radioDisabled: false,
      select: false,
      select1: false
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
    getGPUList().then(res=>{
      this.GPUmodelList = res
    })
  },
  deactivated() {
    
  },
  methods: {
    ...mapMutations(['setPassWard']),
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
      let loadingInstance = this.$loading({target:'.machine'});
      let params = {
        wallet: this.wallet_address
      };
      getMachineList(params)
      .then( async (res) => {
        let BlockchainTime = await getBlockTime().then( (res) => { return parseFloat(res.replace(/,/g, '')) }) // 获取链上块时间
        this.allListedMachine = []
        await res.content.map( async el=>{ 
          el.lcOpsEntity == null ? el.lcOpsEntity = {btnloading1: false} : el.lcOpsEntity.btnloading1 = false;
          let newel = Object.assign({ submit: false }, JSON.parse(el.original), el.lcOpsEntity)
          newel.verify_time = await getBlockchainTime(BlockchainTime, newel.verify_time?newel.verify_time:[])
          let nowData = +new Date()
          newel.verify_time.map(el => {
            if(nowData > el.startTimestamp && nowData < el.endTimestamp){
              newel.submit = true
            }
          })
          this.allListedMachine.push(newel)
        })
        loadingInstance.close();
        this.showMachines(
          this.allListedMachine,
          this.currentPage,
          this.pageSize
        );
      })
      .catch( err => {
        console.log(err, 'ere');
        this.$message({
          showClose: true,
          message: this.$t('audit.errormsg'),
          type: "error",
        });
        loadingInstance.close();
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
      if(index == 1){ // 提交原始结果hash值
        this.formInline.machine_id = item.booked_committee
        this.formInline.data_disk = item.data && item.data.disk.size
        this.formInline.cpu_type =  item.data && item.data.cpu.type
        this.formInline.cpu_core_num =  item.data && item.data.cpu.num
        this.formInline.mem_num = item.data && item.data.mem
        this.formInline.is_support = '1'
        this.dialogTableVisible1 = true
        this.radioDisabled = false
      }else if(index == 2 ){
        item.btnloading1 = true
        this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText:  this.$t('cancel'),
          inputValue: this.passward
        })
        .then( ({ value }) => {
          CreateSignature(item.booked_committee, value)
          .then(res=>{
            this.setPassWard(value)
            let parmas = { 
              machine_id: item.booked_committee,
              signature: res,
              wallet: this.wallet_address
            }
            GetGrabbingHash(parmas)
              .then(res => {
                this.formInline =  res?res:{}
                this.select = true
                this.select1 = true
                this.formInline.is_support = res?String(res.is_support):''
                this.sclectItem.gpu_type = res.gpu_type
              })
            this.dialogTableVisible1 = true
            this.radioDisabled = true
            item.btnloading1 = false
          })
          .catch( err => {
            this.$message({
              showClose: true,
              message: err.message,
              type: "error",
            }); 
            item.btnloading1 = false
          })
        })
        .catch( err => {
          item.btnloading1 = false
        })
      }else{
        if(!this.isBinding){
          this.$message({
            showClose: true,
            message: this.$t('audit.bindEmail'),
            type: "error",
          });
        }else{
          this.$message({
            showClose: true,
            message: this.$t('audit.tipmsg3'),
            type: "success",
          });
        }
      }
    },
    selectCPU(val){
      this.select = true
      this.sclectItem = val
      this.GPUmodelList.map(el => {
        if(el.gpu_type == val ){
          this.formInline = {...this.formInline, ...el}
        }
      })
    },
    selectCPUNum(val){
      this.select1 = true
      this.formInline.calc_point = getComputing_Power(
        val, 
        parseInt(this.formInline.gpu_mem), 
        parseInt(this.formInline.cuda_core), 
        parseInt(this.formInline.sys_disk / (1000 * 1000))
      )
    },
    async commit(){
      if(this.formInline.passward == ''){
        this.$message({
          showClose: true,
          message: this.$t('verifyPassward'),
          type: "error",
        });
      }else{
        this.btnloading = true;
        if(this.radioDisabled){
          ConfirmRaw(this.formInline, this.formInline.passward, (res)=>{
            console.log(res, 'res');
            this.btnloading = false;
            if(res.success){
              this.$message({
                showClose: true,
                message: this.$t('audit.Op_Successful'),
                type: "success",
              });
            }else{
              this.$message({
                showClose: true,
                message: res.msg,
                type: "error",
              });
            }
          })
        }else{
          await CreateSignature(this.formInline.machine_id, this.formInline.passward)
          .then(res=>{
            this.setPassWard(this.formInline.passward)
            let params = {
              machine_id: this.formInline.machine_id,
              gpu_type: this.formInline.gpu_type, 
              gpu_num: this.formInline.gpu_num, 
              cuda_core: this.formInline.cuda_core, 
              gpu_mem: this.formInline.gpu_mem, 
              calc_point: this.formInline.calc_point, 
              sys_disk: this.formInline.sys_disk, 
              data_disk: this.formInline.data_disk, 
              cpu_type: this.formInline.cpu_type, 
              cpu_core_num: this.formInline.cpu_core_num, 
              cpu_rate: this.formInline.cpu_rate, 
              mem_num: this.formInline.mem_num, 
              rand_str: this.formInline.rand_str, 
              is_support: this.formInline.is_support,
              wallet: this.wallet_address,
              signature: res
            }
            Save_GrabbingHash(params).then(res1=>{
              if(res1){
                ConfirmHash(this.formInline, this.formInline.passward, (res)=>{
                  console.log(res, 'res');
                  this.btnloading = false;
                  if(res.success){
                    this.$message({
                      showClose: true,
                      message: this.$t('audit.Op_Successful'),
                      type: "success",
                    });
                  }else{
                    this.$message({
                      showClose: true,
                      message: res.msg,
                      type: "error",
                    });
                  }
                })
              }else{
                this.$message({
                  showClose: true,
                  message: res,
                  type: "error",
                });
              }
            })
          })
          .catch( err=> {
            this.$message({
              showClose: true,
              message: err.message,
              type: "error",
            });
            this.btnloading = false;
          })
        }
      }
      
    },
    cancel1(){
      this.radioDisabled = false;
      this.btnloading = false;
      this.dialogTableVisible1 = false
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
    .center{
      width: 250px;
      text-align: right;
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
      width: 530px;
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

.el-form-item{
  margin-bottom: 0;
}
.el-form-item__content {
  line-height: 35px;
}
.el-form-item__label {
  line-height: 35px;
}
</style>
