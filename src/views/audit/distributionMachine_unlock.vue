<template>
  <div class="machine">
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
              v-if="item.status == 'booked'"
              type="primary"
              size="mini"
              :disabled='item.submit'
              @click="verification(item, 0)"
              >{{ $t("audit.verification") }}</el-button
            >
            <el-button
              v-if="item.status == 'booked'"
              type="primary"
              size="mini"
              @click="verification(item, 1)"
              >{{ $t("audit.verification1") }}</el-button
            >
            <el-button
              v-if="item.status == 'hashed'"
              type="primary"
              size="mini"
              :disabled="item.canConfirm"
              :loading="item.btnloading1"
              @click="verification(item, 2)"
              >{{ $t("audit.verification2") }}</el-button
            >
            <div v-if="item.status == 'booked'" class="verification_tips">{{ $t("audit.verification_tips") }}</div>
            <div v-else class="verification_tips">
              {{ $t("audit.verification_tips1_1") }} {{ item.confirm_start_time }} {{ $t("audit.verification_tips1_2") }} {{ $t("audit.verification_tips1") }}
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="machineIdBox">
            {{ item.machine_id }}
          </div>
          <div>
            {{ $t("audit.confirmHash") }}：{{ item.HashSize }}
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <span class="fs16">
              {{$t('audit.GPUnumber')}}：
              <a class="cPrimaryColor">{{ item.gpu && parseInt(item.gpu.gpu_count) }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('list_ram_size')}}：
              <a class="cPrimaryColor">{{ item.mem && parseInt(item.mem.size) }}G</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t("audit.Shd_space")}}：
              <a class="cPrimaryColor">{{ item.disk_system && parseInt(item.disk_system.size) }}G</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t("audit.Dhd_space")}}：
              <a class="cPrimaryColor">{{ item.disk_data.length ? parseInt(item.disk_data[0].size ? item.disk_data[0].size : 0) : parseInt(item.disk_data.size? item.disk_data.size : 0) }}G</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <span class="fs16">
              {{ $t('list_cpu_numbers')}}：
              <a class="cPrimaryColor">{{ item.cpu && parseInt(item.cpu.cores) }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t('audit.CPUfrequency')}}：
              <a class="cPrimaryColor">{{ item.cpu && item.cpu.hz }}</a>
            </span>
          </div>
          <div class="td3">
            <span class="fs16">
              {{ $t("audit.CPUmodel") }}：
              <a class="cPrimaryColor">{{ item.cpu && item.cpu.type }}</a>
            </span>
          </div>
          <!-- <div class="td">
            <span class="fs16">
              Cuda_core：
              <a class="cPrimaryColor">{{ item.cpu.cores }}</a>
            </span>
          </div> -->
          <!-- <div class="td">
            <span class="fs16">
              {{ $t("list_gpu_ram_size") }}：
              <a class="cPrimaryColor"
                >{{ item.mem.free }}</a
              >
            </span>
          </div> -->
          <!-- <div class="td">
            <span class="fs16">
              {{$t("audit.SGC_power")}}：
              <a class="cPrimaryColor">{{ item.calc_point }}</a>
            </span>
          </div> -->
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
    <!-- 提交信息 -->
    <el-dialog :visible.sync="dialogTableVisible1" width="580px">
      <div slot="title">{{$t('audit.seeDetails3')}}</div>
      <el-form :model="formInline" class="form-inline">
        <el-form-item :label="$t('audit.coefficient')+':'">
          <el-select :disabled='radioDisabled' size="small" @change="selectcoe" v-model="formInline.coefficient" placeholder="请选择">
            <el-option
              v-for="item in Coefficient"
              :key="item._id"
              :label="language == 'CN' ? item.name: item.name_En"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="choosecoe" :label="$t('audit.coefficient1')+':'">
          <span>{{formInline.coe}}</span>
        </el-form-item>
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
          <span>{{ formInline.gpu_mem }}</span>
        </el-form-item>
        <el-form-item :label="$t('audit.GPUnumber')+':'">
          <span>{{ formInline.gpu_num }}</span>
          <!-- <el-select :disabled='radioDisabled' size="small" @change="selectCPUNum" v-model="formInline.gpu_num" placeholder="请选择">
            <el-option
              v-for="item in GPUnumberList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> -->
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
          <span>{{ formInline.sys_disk }}</span>
        </el-form-item>
        <el-form-item :label="$t('audit.Dhd_space')+':'">
          <span>{{ formInline.data_disk }}</span>
        </el-form-item>
        <el-form-item v-show="select" :label="$t('audit.SGC_power')+':'">
          <span>{{ formInline.calc_point }}</span>
          <!-- <el-input :disabled='radioDisabled' size="small" style="width:200px" v-model="formInline.calc_point"></el-input> -->
        </el-form-item>
        <el-form-item :label="$t('audit.Vresults')+':'" prop="radio">
          <el-radio :disabled='radioDisabled' v-model="formInline.is_support" label="1">{{$t('audit.isSupportY')}}</el-radio>
          <el-radio :disabled='radioDisabled' v-model="formInline.is_support" label="0">{{$t('audit.isSupportN')}}</el-radio>
        </el-form-item>
        <el-form-item :label="$t('verifyPassward')+':'" prop="passward">
          <el-input size="small" style="width:200px" v-model="formInline.passward" show-password :placeholder="$t('verifyPassward')"></el-input>
        </el-form-item>
        <el-form-item v-show="select">
          <span style="display: block;font-size: 12px;line-height: 20px;">({{ $t('audit.savemsgtip') }})</span>
        </el-form-item>
        <el-form-item v-show="startConfirm">
          <span style="display: block;font-size: 12px;line-height: 20px;color: red">{{ $t('responseTip') }}</span>
        </el-form-item>
        <el-form-item class="dlg-bottom">
          <el-button class="dlg-bn" plain size="small" @click="cancel1">{{$t('cancel')}}</el-button>
          <el-button class="dlg-bttn" plain :loading="btnloading" type="primary" size="small" @click="commit">{{$t('confirm')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getGPUList,
  getMachineList,
  Save_ResultHash,
  GetResultHash,
  changeStatus,
  getCoefficient
} from "@/api";
import {
  getAccount,
  getBlockchainTime,
  getBlockConfirm,
  getComputing_Power,
  randomWord
} from "@/utlis";
import FileSaver from 'file-saver'
import { Error_Reason } from "@/utlis/error_desc"
import { getCurrentPair, CreateSignature } from "@/utlis/dot"
import { ConfirmHash, ConfirmRaw, getBlockTime } from "@/utlis/dot/api"
import { mapState, mapMutations } from "vuex"
export default {
  name: "distributionMachine_unlock",
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
        coefficient: '',
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
        rand_str: randomWord(),
        is_support: '1',
        passward:'',
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
      HashSize: 0,
      dialogTableVisible1: false,
      btnloading: false,
      radioDisabled: false,
      select: false,
      select1: false,
      originalDefult: {
        "version": "0",
        "ip": "Undefined",
        "os": "Undefined",
        "cpu": {
          "type": "Undefined",
          "hz": "0",
          "cores": "0",
          "used_usage": "0"
        },
        "gpu": {
          "gpu_count": 1,
        },
        "mem": {
          "size": "0G",
          "free": "0G",
          "used_usage": "0"
        },
        "disk_system": {
          "type": "0",
          "size": "0G"
        },
        "disk_data": {
          "type": "0",
          "size": "0G",
          "free": "0G",
          "used_usage": "0%"
        },
        "images": [
          "null"
        ]
      },
      Coefficient: [],
      choosecoe: false,
      startConfirm: false
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
    // this.queryMail();
    getGPUList().then(res=>{
      this.GPUmodelList = res.content
    })
    getCoefficient().then(res => {
      this.Coefficient = res.content
    })
  },
  deactivated() {
    
  },
  methods: {
    ...mapMutations(['setPassWard']),
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
        let BlockchainTime = await getBlockTime().then((res) => { return parseFloat(res.replace(/,/g, '')) }) // 获取链上块时间
        this.allListedMachine = []
        if (res.success) {
          for(let i=0; i< res.content.length; i++){
            // res.content[i].lcOpsEntity = { ...res.content[i].booked_machine, HashSize: res.content[i].HashSize, btnloading1: false }
            let original = res.content[i].original.mainnet ? res.content[i].original.mainnet : res.content[i].original
            let newel = Object.assign(
              { submit: true, canConfirm: true, btnloading1: false}, 
              res.content[i],
              original.errcode == 0 ? original.message : this.originalDefult
              // original.errcode == 0 ? original.message: original.result_message, 
              // res.content[i].lcOpsEntity
            )
            res.content[i].confirm_start_time = parseFloat(res.content[i].confirm_start_time.replace(/,/g, ''))
            newel.confirm_start_time = await getBlockConfirm(BlockchainTime, res.content[i].confirm_start_time)
            if (res.content[i].confirm_start_time - BlockchainTime <= 0 || res.content[i].HashSize == 3) { //验证是否到提交原始值的时间 或有 已三人提交
              newel.canConfirm = false
            }
            newel.verify_time = await getBlockchainTime(BlockchainTime, newel.verify_time_high?newel.verify_time_high:[])
            let nowData = +new Date()
            newel.verify_time.map(el => {
              if(nowData > el.startTimestamp && nowData < el.endTimestamp){
                newel.submit = false
              }
            })
            this.allListedMachine.push(newel)
          }
          loadingInstance.close();
          console.log(this.allListedMachine, 'all');
          this.showMachines(
            this.allListedMachine,
            this.currentPage,
            this.pageSize
          );
        } else {
          loadingInstance.close();
        }
      })
      .catch( err => {
        console.log(err, 'err')
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
      if (index == 1) { // 提交原始结果hash值
        this.formInline.gpu_type = ''
        this.formInline.coefficient = ''
        this.select = false
        this.select1 = false
        this.choosecoe = false
        this.formInline.machine_id = item.machine_id
        this.formInline.data_disk = item.disk_data.length ? parseInt(item.disk_data[0].size ? item.disk_data[0].size : 0) : parseInt(item.disk_data.size ? item.disk_data.size : 0)
        this.formInline.cpu_type =  item.cpu && item.cpu.type
        this.formInline.gpu_num = item.gpu && item.gpu.gpu_count
        this.formInline.cpu_core_num =  item.cpu && parseInt(item.cpu.cores)
        this.formInline.mem_num = item.mem && parseInt(item.mem.size)
        this.formInline.cpu_rate = item.cpu && parseInt(item.cpu.hz) ? parseInt(item.cpu.hz) : 0
        this.formInline.passward = this.passward
        this.formInline.sys_disk = item.disk_system && parseInt(item.disk_system.size)
        this.formInline.is_support = '1'
        this.dialogTableVisible1 = true
        this.radioDisabled = false
        this.HashSize = item.HashSize
      } else if (index == 2) {
        item.btnloading1 = true
        this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText:  this.$t('cancel'),
          inputType:'password',
          inputValue: this.passward
        })
        .then( ({ value }) => {
          const signaturemsg = randomWord()
          CreateSignature(signaturemsg, value)
          .then(res=>{
            this.setPassWard(value)
            let parmas = { 
              machine_id: item.machine_id,
              signature: res,
              signaturemsg: signaturemsg,
              wallet: this.wallet_address
            }
            GetResultHash(parmas)
            .then(res1 => {
              if (res1.success) {
                this.formInline =  res1.content?res1.content:{}
                this.formInline.passward = this.passward
                this.formInline.machine_id = item.machine_id
                this.select = true
                this.select1 = true
                this.choosecoe = true
                this.formInline.is_support = res1.content?String(res1.content.is_support):'0'
                this.dialogTableVisible1 = true
                this.radioDisabled = true
              } else {
                this.$message({
                showClose: true,
                message: res1.msg,
                type: "error",
              }); 
              }
              // console.log(this.formInline, 'formInline')
            })
            .catch( err1 => {
              console.log(err1, 'err1');
              this.$message({
                showClose: true,
                message: err1.message,
                type: "error",
              }); 
            })
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
      } else {
        this.$message({
          showClose: true,
          message: this.$t('audit.tipmsg3'),
          type: "success",
        });
        this.$router.push('/mymachine/myVerify_gpuVirtual')
      }
    },
    selectCPU(val){
      this.select = true
      this.GPUmodelList.map(el => {
        if(el.gpu_type == val ){
          this.formInline = {...this.formInline, ...el}
        }
      })
      if (this.formInline.gpu_num != '' && this.formInline.coefficient != '') {
        let calc_point = getComputing_Power(this.formInline.gpu_num, this.formInline.mem_num, this.formInline.cuda_core, this.formInline.gpu_mem, this.formInline.coe)
        this.formInline.calc_point = calc_point ? parseInt(calc_point*100) : 0
      }
    },
    selectcoe(val) {
      this.Coefficient.map(el => {
        if(el._id == val) {
          this.choosecoe = true
          this.formInline.coe = el.coe
        }
      })
      if (this.formInline.gpu_num != '' && this.formInline.gpu_type != '') {
        let calc_point = getComputing_Power(this.formInline.gpu_num, this.formInline.mem_num, this.formInline.cuda_core, this.formInline.gpu_mem, this.formInline.coe)
        this.formInline.calc_point = calc_point ? parseInt(calc_point*100) : 0
      }
    },
    selectCPUNum(val){
      this.select1 = true
      let calc_point = getComputing_Power(this.formInline.gpu_num, this.formInline.mem_num, this.formInline.cuda_core, this.formInline.gpu_mem, this.formInline.coe)
      this.formInline.calc_point = calc_point ? parseInt(calc_point*100) : 0
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
        this.startConfirm = true;
        if(this.radioDisabled){
          this.formInline.is_support = this.formInline.is_support == 0 ? Number(this.formInline.is_support): this.formInline.is_support
          ConfirmRaw(this.formInline, this.formInline.passward, (res)=>{
            console.log(res, 'res');
            this.btnloading = false;
            this.startConfirm = false;
            if(res.success){
              this.$message({
                showClose: true,
                message: this.$t('audit.Op_Successful'),
                type: "success",
              });
              let data = {
                wallet: this.wallet_address,
                machine_id: this.formInline.machine_id,
                status: 'hashed',
                size: this.HashSize
              }
              changeStatus(data).then(res => {
                console.log(res.msg)
                this.dialogTableVisible1 = false
                this.queryMc()
              })
              // this.dialogTableVisible1 = false
              // this.queryMc()
            }else{
              this.$message({
                showClose: true,
                message: ( res.index == 0 || res.index ) ? Error_Reason[res.section][res.index] : res.msg,
                type: "error",
              });
            }
          })
        }else{
          if (this.formInline.gpu_type == '' || this.formInline.gpu_num == '' || this.formInline.calc_point == '') {
            this.$message.error('提交内容不能为空')
            this.btnloading = false;
            this.startConfirm = false;
            return false
          }
          const signaturemsg = randomWord()
          await CreateSignature(signaturemsg, this.formInline.passward)
          .then(res=>{
            this.setPassWard(this.formInline.passward)
            
            let params = {
              coefficient: this.formInline.coefficient,
              coe: this.formInline.coe,
              machine_id: this.formInline.machine_id,
              gpu_type: this.formInline.gpu_type,
              gpu_num: parseInt(this.formInline.gpu_num),
              cuda_core: parseInt(this.formInline.cuda_core),
              gpu_mem: parseInt(this.formInline.gpu_mem),
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
              signature: res,
              signaturemsg: signaturemsg
            }
            Save_ResultHash(params).then(res1=>{
              if(res1.success){
                this.formInline.gpu_num = parseInt(this.formInline.gpu_num)
                this.formInline.cuda_core = parseInt(this.formInline.cuda_core)
                this.formInline.gpu_mem = parseInt(this.formInline.gpu_mem)
                ConfirmHash(this.formInline, this.formInline.passward, (res)=>{
                  console.log(res, 'res');
                  this.btnloading = false;
                  this.startConfirm = false;
                  if(res.success){
                    let rawdata = {
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
                    }
                    const blob = new Blob([JSON.stringify(rawdata)], {type: 'application/json; charset=utf-8'});
                    FileSaver.saveAs(blob, `${rawdata.machine_id}.json`);
                    this.$message({
                      showClose: true,
                      message: this.$t('audit.Op_Successful'),
                      type: "success",
                    });
                    let data = {
                      wallet: this.wallet_address,
                      machine_id: this.formInline.machine_id,
                      status: 'booked',
                      size: this.HashSize
                    }
                    changeStatus(data).then(res => {
                      console.log(res.msg)
                      this.dialogTableVisible1 = false
                      this.queryMc()
                    })
                  }else{
                    this.$message({
                      showClose: true,
                      message: ( res.index == 0 || res.index ) ? Error_Reason[res.section][res.index] : res.msg,
                      type: "error",
                    });
                  }
                })
              }else{
                this.btnloading = false;
                this.startConfirm = false;
                this.$message({
                  showClose: true,
                  message: res1.msg,
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
            this.startConfirm = false;
          })
        }
      }
      
    },
    cancel1(){
      this.radioDisabled = false;
      this.btnloading = false;
      this.startConfirm = false;
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
    align-items: center;
    padding: 5px 0;

    &.status-title {
      justify-content: space-between;
      align-items: center;
    }

    .verification_time{
      font-weight: bold;
    }
    .center{
      // width: 250px;
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
      margin-right: 20px;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }
    // .machineIdBox:hover {
    //   background: #195d91;
    //   color: #ffffff;
    //   opacity: 0.7;
    // }
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
