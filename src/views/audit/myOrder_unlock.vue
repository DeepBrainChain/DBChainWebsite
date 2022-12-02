<template>
  <div>
    <div class="order_tips ">{{$t('audit.ogMachine_tips')}}</div>
    <template v-if="res_body.content.length > 0">
      <div
        v-for="(item, index) in res_body.content"
        class="border-content"
        :key="index"
      >
        <div class="order-list">
          <div>{{$t("audit.order")}}: {{item.report_id}}</div>
          <div v-if="!('rentedInaccessible' in item.report_order.machine_fault_type)">
            <el-button v-if="item.report_info.encrypted_err_info == null && item.report_info.order_status != 'Finished'" size="small" plain @click="seeDetails(false, item)">{{$t("audit.seeDetails1")}}</el-button>
            <el-button v-else-if="item.report_info.order_status != 'Finished'" size="small" plain @click="seeDetails(true, item)" :loading='item.btnloading1'>{{$t("audit.seeDetails2")}}</el-button>
          </div>
          <el-button class="button" :disabled="item.report_info.order_status == 'WaitingEncrypt'" v-if="item.report_info.hash_time == 0 && item.report_info.order_status != 'Finished'" size="small" plain @click="start(1, item)">{{$t("audit.verification1")}}</el-button>
          <el-button class="button" v-else-if="item.report_info.order_status != 'Finished'" size="small" plain @click="start(2, item)">{{$t("audit.verification2")}}</el-button>
          <el-button class="button" disabled v-else size="small" plain>{{$t("audit.verification5")}}</el-button>
          <!-- <el-button class="button" size="small" plain @click="start(1, item)">{{$t("audit.verification1")}}</el-button>
          <el-button class="button" size="small" plain @click="start(2, item)">{{$t("audit.verification2")}}</el-button> -->
        </div>
        <div class="order-list mt20">
          <div>{{$t("audit.hasNum")}}:{{ item.report_order.booked_committee.length }}</div>
          <!-- 显示提交Hash倒计时 -->
          <div v-if="item.report_info.hash_time == 0">{{$t("audit.verification1_time")}}：{{ item.report_info.booked_time}}</div>
          <!-- 显示提交结果倒计时 -->
          <div v-if="item.report_info.hash_time != 0 && item.report_info.order_status != 'Finished'">{{$t("audit.verification2_time")}}：{{ item.report_order.confirm_start}}</div>
          <!-- 当order_status 等于 'Finished' 显示我的验证结果 -->
          <div v-if="item.report_info.order_status == 'Finished'">{{$t("audit.myResult")}}:{{ item.report_order.support_committee.indexOf(wallet_address) >= 0 ? $t("audit.hasError") : $t("audit.noError") }}</div>
          <!-- 当report_status 等于 CommitteeConfirmed，显示最终验证结果 -->
          <div v-if="item.report_order.report_status == 'CommitteeConfirmed'">{{$t("audit.finalResult")}}:{{ item.report_order.support_committee.length.length > item.report_order.against_committee.length? $t("audit.noError") :$t("audit.hasError")}}</div>
          <div>{{ $t("audit.proportion") }}: {{item.report_order.support_committee.length}}/{{item.report_order.against_committee.length}}</div>
        </div>
      </div>
    </template>
    <!-- 提交信息 -->
    <el-dialog :visible.sync="dialogTableVisible2" width="700px" :close-on-click-modal='false'>
      <div v-if="isHex" slot="title">{{$t('audit.verification1')}}</div>
      <div v-else slot="title">{{$t('audit.verification2')}}</div>
      <el-form :model="formInline2" class="form-inline">
        <el-form-item :label="$t('audit.report_id')+':'">
          <span>{{formInline2.report_id}}</span>
        </el-form-item>
        <el-form-item :label="$t('audit.machine_id')+':'">
          <span>{{formInline2.machine_id}}</span>
        </el-form-item>
        <el-form-item :label="$t('audit.validator_nonce')+':'">
          <span>{{formInline2.committee_rand_str}}</span>
        </el-form-item>
        <el-form-item :label="$t('audit.problem')+':'" prop="radio">
          <el-radio :disabled='radioDisabled' v-model="formInline2.support_report" label="1">{{$t("audit.hasproblem")}}</el-radio>
          <el-radio :disabled='radioDisabled' v-model="formInline2.support_report" label="0">{{$t("audit.noproblem")}}</el-radio>
        </el-form-item>
        <el-form-item :label="$t('verifyPassward')+':'" prop="passward">
          <el-input style="width:200px" v-model="formInline2.passward" show-password :placeholder="$t('verifyPassward')"></el-input>
        </el-form-item>
        <el-form-item class="dlg-bottom">
          <el-button class="dlg-bttn" :loading="btnloading" plain size="small" @click="commit1">{{$t('confirm')}}</el-button>
          <el-button class="dlg-bn" plain size="small" @click="cancel1">{{$t('cancel')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 提交信息 -->
    <el-dialog :visible.sync="dialogTableVisible1" width="700px" :close-on-click-modal='false'>
      <div v-if="isHex" slot="title">{{$t('audit.verification1')}}</div>
      <div v-else slot="title">{{$t('audit.verification2')}}</div>
      <el-form :model="formInline" class="form-inline">
        <el-form-item :label="$t('audit.machine_id')+':'">
          <span>{{formInline.machine_id}}</span>
        </el-form-item>
        <el-form-item :label="$t('audit.reporter_nonce')+':'">
          <span>{{formInline.report_rand_str}}</span>
        </el-form-item>
        <el-form-item :label="$t('audit.validator_nonce')+':'">
          <span>{{formInline.committee_rand_str}}</span>
        </el-form-item>
        <el-form-item :label="$t('audit.contentofreport')+':'">
          <span>{{formInline.err_reason}}</span>
        </el-form-item>
        <el-form-item :label="$t('audit.problem')+':'" prop="radio">
          <el-radio :disabled='radioDisabled' v-model="formInline.support_report" label="1">{{$t("audit.hasproblem")}}</el-radio>
          <el-radio :disabled='radioDisabled' v-model="formInline.support_report" label="0">{{$t("audit.noproblem")}}</el-radio>
        </el-form-item>
        <el-form-item :label="$t('verifyPassward')+':'" prop="passward">
          <el-input style="width:200px" v-model="formInline.passward" show-password :placeholder="$t('verifyPassward')"></el-input>
        </el-form-item>
        <el-form-item class="dlg-bottom">
          <el-button class="dlg-bttn" :loading="btnloading" plain size="small" @click="commit">{{$t('confirm')}}</el-button>
          <el-button class="dlg-bn" plain size="small" @click="cancel1">{{$t('cancel')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 具体信息描述 -->
    <el-dialog :visible.sync="dialogTableVisible" width="700px" :close-on-click-modal='false'>
      <div slot="title">{{$t('audit.seeDetails2')}}</div>
      <div class="machine_details">
        <div class="machine_id"><span>Machine_ID: </span> {{formInline.machine_id}}</div>
        <div class="session_id"><span>session_id: </span> {{formInline.session_id}}</div>
        <div class="session_id"><span>session_id_sign: </span> {{formInline.session_id_sign}}</div>
        <div class="message"><span>{{$t('audit.message')}}: </span> {{formInline.err_reason}}</div>
      </div>
      <div class="dlg-bottom">
        <el-button class="dlg-btn" type="primary" size="small" @click="confirm">{{$t('audit.confirm')}}</el-button>
        <el-button class="dlg-btn" plain size="small" @click="cancel">{{$t('cancel')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  saveOrderHash,
  getOrderHash
} from "@/api";

import {
  getAccount,
  getCountDown,
  randomWord
} from "@/utlis";
import { Error_Reason } from "@/utlis/error_desc"
import { getCurrentPair, naclSeal, naclOpen, getKeypair, CreateSignature } from "@/utlis/dot"
import { mapState, mapMutations } from "vuex"
import { stringToU8a , u8aToHex, hexToU8a, hexToString, u8aToString } from '@polkadot/util';
import { naclBoxKeypairFromSecret, decodeAddress, randomAsU8a } from '@polkadot/util-crypto';
import { committeeOps, submitConfirmHash, submitConfirmRaw, committeeOrder, reportInfo, getTime, getBlockTime, committeeSubmitVerifyHash, committeeSubmitInaccessibleRaw } from "@/utlis/dot/api"
export default {
  name: "myOrder_unlock",
  computed: {
    ...mapState(["isNewWallet", "passward"]),
  },
  filters:{
    CountDown:(t) => {
      
    }
  },
  data() {
    return {
      wallet_address: (getAccount() && getAccount().address) || (getCurrentPair() && getCurrentPair().address),
      styleHidden: {},
      dlgMail_open: false,
      isNewMail: false,
      isBinding: false,
      btnloading: false,
      // btnloading1: false,
      bindMail: "",
      res_body: {
        content: [],
      },
      send_email_repeatLoading: false,
      send_email_repeat_index: -1,
      // 查询问题描述
      dialogTableVisible: false,
      str_Sealed:null,
      dialogTableVisible1: false,
      formInline: {
        passward: '',
        report_id:'',
        machine_id:'',
        report_rand_str:'1',
        committee_rand_str: '1',
        extra_err_info:'无其他问题',
        err_reason:'',
        support_report: "1",
      },
      radioDisabled: false,
      isHex: true,
      timer: [],
      // 第一种报错
      dialogTableVisible2: false,
      formInline2: {
        passward: '',
        report_id:'',
        machine_id:'',
        committee_rand_str: '',
        support_report: "1",
      },
    };
  },
  watch: {
  },
  beforeMount() {
    if (this.$t("website_name") === "congTuCloud") {
      this.styleHidden.visibility = "hidden";
    }
  },
  activated() {
    // this.binding(this.isNewMail);
    this.stopInter()
    // this.queryMail();
    this.getList()
  },
  deactivated() {
    this.stopInter()
  },
  methods: {
    ...mapMutations(['setPassWard']),
    // 获取列表
    getList(){
      committeeOrder(this.wallet_address).then( async res=> {
        this.res_body.content = []
        res = [ ...res.booked_report, ...res.hashed_report, ...res.confirmed_report ]
        let BlockchainTime = await getBlockTime().then( (res) => { return parseFloat(res.replace(/,/g, '')) }) // 获取链上块时间
        for(let i=0; i< res.length; i++){
          let res1 = await committeeOps(this.wallet_address, res[i])
          let res2 =  await reportInfo(res[i])
          console.log(res2, 'res2');
          if ('rentedInaccessible' in res2.machine_fault_type) {
            res1.booked_time = await getCountDown(7, res2.first_book_time, BlockchainTime)
          } else {
            res1.booked_time = await getCountDown(1, res1.booked_time, BlockchainTime)
          }
          res2.confirm_start = await getCountDown(3, res2.confirm_start, BlockchainTime)
          let report = { report_id: res[i], report_info: res1, report_order: res2 , btnloading1: false}
          this.res_body.content.push({ ...report })
          if(report.report_order.confirm_start > 0 ){
            this.count(report.report_order.confirm_start, i, (msg)=>{
              report.report_order.confirm_start = msg;
            })
          }else{
            report.report_order.confirm_start = '00:00:00'
          }
          if(report.report_info.booked_time > 0 ){
            this.count(res1.booked_time, i, (msg)=>{
              report.report_info.booked_time=msg;
            })
          }else{
            report.report_info.booked_time = '00:00:00'
          }
        }
        console.log(this.res_body.content,'this.res_body.content');
      })
    },
    // 提交结果
    start(num, item){
      this.formInline.report_id = item.report_id
      console.log(this.formInline, 'formInline');
      if(num == 1){
        if (!this.formInline.err_reason && this.formInline.err_reason != '') {
          this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
            confirmButtonText: this.$t('confirm'),
            cancelButtonText:  this.$t('cancel'),
            inputType:'password',
            inputValue: this.passward
          }).then( ({ value }) => {
            this.setPassWard(value)
            let KeyPair;
            try {
              KeyPair = getKeypair(value)
            } catch (err) {
              this.$message({
                message: err.message,
                type: "error",
              });
              return false
            }
            const typekey = Object.keys(item.report_order.machine_fault_type)[0]
            let message = u8aToString(naclOpen( 
              hexToU8a(item.report_info.encrypted_err_info), 
              hexToU8a('0x8d842da497f095e0d0afb969e3a7cb51e77d76dc97343dfc'), 
              hexToU8a(item.report_order.machine_fault_type[typekey][1]), 
              KeyPair.secretKey
            ))
            if (message[message.length-1] == '}') {
              this.formInline = {...this.formInline, ... JSON.parse(message)}
              this.formInline.report_id = item.report_id
              if ('rentedInaccessible' in item.report_order.machine_fault_type) {
                this.radioDisabled = false
                this.isHex = true
                this.dialogTableVisible2 = true
                this.formInline2.report_id = item.report_id
                this.formInline2.passward = this.passward
                this.formInline2.machine_id = item.report_order.machine_fault_type['rentedInaccessible'][0]
                this.formInline2.committee_rand_str = randomWord()
              } else {
                this.formInline.committee_rand_str = randomWord()
                this.radioDisabled = false
                this.isHex = true
                this.dialogTableVisible1 = true
              }
            } else {
              this.$message.error(this.$t('myvirtual.mac_err_msg11'))
            }
          })
        } else {
          if ('rentedInaccessible' in item.report_order.machine_fault_type) {
            this.radioDisabled = false
            this.isHex = true
            this.dialogTableVisible2 = true
            this.formInline2.report_id = item.report_id
            this.formInline2.passward = this.passward
            this.formInline2.machine_id = item.report_order.machine_fault_type['rentedInaccessible'][0]
            this.formInline2.committee_rand_str = randomWord()
          } else {
            this.formInline.committee_rand_str = randomWord()
            this.radioDisabled = false
            this.isHex = true
            this.dialogTableVisible1 = true
          }
        }
      }else{
        this.radioDisabled = true
        this.isHex = false
        this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText:  this.$t('cancel'),
          inputType:'password',
          inputValue: this.passward
        })
        .then( ({ value }) => {
          const signaturemsg = randomWord()
          CreateSignature(signaturemsg, value)
          .then((res)=> {
            this.setPassWard(value)
            let parmas = { 
              report_id: item.report_id,
              signature: res,
              signaturemsg: signaturemsg,
              wallet: this.wallet_address
            }
            getOrderHash(parmas).then(res1 => {
              if (res1.success) {
                if ('rentedInaccessible' in item.report_order.machine_fault_type) {
                  this.formInline2 = {...this.formInline2, ...res1.content}
                  this.formInline2.support_report = res1.content?String(res1.content.support_report):''
                  this.formInline2.passward = this.passward
                  this.dialogTableVisible2 = true
                } else {
                  this.formInline = {...this.formInline, ...res1.content}
                  this.formInline.report_rand_str = res1.content.reporter_rand_str
                  this.formInline.support_report = res1.content?String(res1.content.support_report):''
                  this.formInline.passward = this.passward
                  this.dialogTableVisible1 = true
                }
              } else {
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
          })
        })
      }
      if(this.passward != ''){
        this.formInline.passward = this.passward
      }
    },
    commit(){
      if (this.formInline.passward == '') {
        this.$message({
          showClose: true,
          message: this.$t('verifyPassward'),
          type: "error",
        });
      } else {
        this.btnloading = true;
        if (this.passward == '') {
          this.setPassWard(this.formInline.passward)
        }
        if (this.isHex) {
          const signaturemsg = randomWord()
          CreateSignature(signaturemsg, this.formInline.passward)
          .then((res) =>{
            let params = {
              machine_id: this.formInline.machine_id,
              report_id: this.formInline.report_id, 
              reporter_rand_str: this.formInline.report_rand_str, 
              committee_rand_str: this.formInline.committee_rand_str, 
              err_reason: this.formInline.err_reason, 
              support_report: this.formInline.support_report,
              wallet: this.wallet_address,
              signature: res,
              signaturemsg: signaturemsg,
            }
            saveOrderHash(params).then(res1=>{
              if (res1.success) {
                submitConfirmHash(params, this.formInline.passward, (res2) => {
                  if (res2.success) {
                    this.$message({
                      showClose: true,
                      message: this.$t('audit.Op_Successful'),
                      type: "success",
                    });
                  } else {
                    this.$message({
                      showClose: true,
                      message: ( res2.index == 0 || res2.index ) ? Error_Reason[res2.section][res2.index] : res2.msg,
                      type: "error",
                    });
                  }
                  this.dialogTableVisible1 = false
                  this.btnloading = false;
                  this.getList()
                })
              } else {
                this.$message({
                  showClose: true,
                  message: res1.msg,
                  type: "error",
                });
                this.dialogTableVisible1 = false
                this.btnloading = false;
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
        } else {
          submitConfirmRaw(this.formInline, this.formInline.passward, (res)=>{
            if(res.success){
              this.$message({
                showClose: true,
                message: this.$t('audit.Op_Successful'),
                type: "success",
              });
            }else{
              this.$message({
                showClose: true,
                message: ( res.index == 0 || res.index ) ? Error_Reason[res.section][res.index] : res.msg,
                type: "error",
              });
            }
            this.dialogTableVisible1 = false;
            this.btnloading = false;
            this.getList()
          })
        }
      }
    },
    commit1() {
      console.log(this.formInline2, 'this.formInline2');
      if (this.formInline2.passward == '') {
        this.$message({
          showClose: true,
          message: this.$t('verifyPassward'),
          type: "error",
        });
      } else {
        this.btnloading = true;
        if (this.passward == '') {
          this.setPassWard(this.formInline2.passward)
        }
        if (this.isHex) {
          const signaturemsg = randomWord()
          CreateSignature(signaturemsg, this.formInline2.passward)
          .then((res) =>{
            let perams = {
              report_id: this.formInline2.report_id, 
              committee_rand_str: this.formInline2.committee_rand_str, 
              support_report: this.formInline2.support_report,
              wallet: this.wallet_address,
              signature: res,
              signaturemsg: signaturemsg,
            }
            saveOrderHash(perams).then(res1 => {
              if (res1.success) {
                committeeSubmitVerifyHash(this.formInline2, this.formInline2.passward, (res2) => {
                  if (res2.success) {
                    this.$message({
                      showClose: true,
                      message: this.$t('audit.Op_Successful'),
                      type: "success",
                    });
                  } else {
                    this.$message({
                      showClose: true,
                      message: ( res2.index == 0 || res2.index ) ? Error_Reason[res2.section][res2.index] : res2.msg,
                      type: "error",
                    });
                  }
                  this.dialogTableVisible2 = false
                  this.btnloading = false;
                  this.getList()
                })
              } else {
                this.$message({
                  showClose: true,
                  message: res1.msg,
                  type: "error",
                });
                this.dialogTableVisible2 = false
                this.btnloading = false;
              }
            })
          })
          .catch( err=> {
            this.$message({
              showClose: true,
              message: err.message,
              type: "error",
            });
            this.dialogTableVisible2 = false
            this.btnloading = false;
          })
        } else {
          committeeSubmitInaccessibleRaw(this.formInline2, this.formInline2.passward, (res)=>{
            if (res.success) {
              this.$message({
                showClose: true,
                message: this.$t('audit.Op_Successful'),
                type: "success",
              });
            } else {
              this.$message({
                showClose: true,
                message: ( res.index == 0 || res.index ) ? Error_Reason[res.section][res.index] : res.msg,
                type: "error",
              });
            }
            this.dialogTableVisible2 = false
            this.btnloading = false;
            this.getList()
          })
        }
      }
    },
    cancel1(){
      this.formInline.passward = ''
      this.formInline2.passward = ''
      this.dialogTableVisible1 = false
      this.dialogTableVisible2 = false
    },
    // 查看问题描述
    seeDetails(status, item){
      if(status){
        this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText:  this.$t('cancel'),
          inputType:'password',
          inputValue: this.passward
        }).then( ({ value }) => {
          this.setPassWard(value)
          let KeyPair;
          try {
            KeyPair = getKeypair(value)
          } catch (err) {
            this.$message({
              message: err.message,
              type: "error",
            });
            return false
          }
          console.log(KeyPair, 'KeyPair');
          item.btnloading1 = true
          const typekey = Object.keys(item.report_order.machine_fault_type)[0]
          let message = u8aToString(naclOpen( 
            hexToU8a(item.report_info.encrypted_err_info), 
            hexToU8a('0x8d842da497f095e0d0afb969e3a7cb51e77d76dc97343dfc'), 
            hexToU8a(item.report_order.machine_fault_type[typekey][1]), 
            KeyPair.secretKey
          ))
          if (message[message.length-1] == '}') {
            this.formInline = {...this.formInline, ... JSON.parse(message)}
            this.formInline.report_id = item.report_id
            this.dialogTableVisible = true
          } else {
            this.$message.error(this.$t('myvirtual.mac_err_msg11'))
          }
          item.btnloading1 = false
        })
      }else{
        this.$message({
          message: this.$t('audit.tipmsg'),
          type: "warning",
        });
      }
    },
    confirm() {
      this.dialogTableVisible = false
      // this.$emit("confirm", item);
    },
    cancel() {
      this.dialogTableVisible = false
      // this.$emit("confirm", item);
    },
    closed() {
      this.isOpen = false;
      this.$emit("update:open", false);
    },
    // 倒计时
    count(time, i, fn){
      let t=this;
      let times= time>0 ? time: 0;
      ti()
      t.timer[i] = setInterval(ti,1000)
      function ti(){
        times--
        // 定义变量 h,m,s保存倒计时的时间  
        let h,m,s;  
        if (times>=0) {
          // 时分秒
          h = Math.floor(times/60/60);  
          m = Math.floor(times/60%60);  
          s = Math.floor(times%60);
          let msg=t.repair(h)+':'+t.repair(m)+':'+t.repair(s);
          fn(msg);
        }else{
          // 关闭定时器
          clearInterval(t.timer[i]);
          return false
        }
      }
    },
    // 数字补0
    repair(o){
      let x=o;
      let t=x > 9 ? x : '0' + x
      return t
    },
    // 关闭定时器
    stopInter(){
      this.timer.map((item)=>{
        clearInterval(item);
      })
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
.order_tips{
  width: 100%;
  font-size: 14px;
  margin-bottom: 20px;
}
.border-content {
  padding: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid #979797;
  .order-list{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.machine_details{
  div{
    margin-bottom: 10px;
  }
}
.dlg-btn {
  width: 110px;
  margin: 0 10px;
}
.el-form-item{
  margin-bottom: 0;
}
</style>
