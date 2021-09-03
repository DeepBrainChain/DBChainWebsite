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
    <div class="order_tips ">{{$t('audit.ogMachine_tips')}}</div>
    <template v-if="res_body.content.length > 0">
      <div
        v-for="(item, index) in res_body.content"
        class="border-content"
        :key="index"
      >
        <div class="order-list">
          <div>{{$t("audit.order")}}: {{item.report_id}}</div>
          <div>
            <el-button v-if="item.report_info.encrypted_err_info == null" size="small" plain @click="seeDetails(false, '')">{{$t("audit.seeDetails1")}}</el-button>
            <el-button v-else size="small" plain @click="seeDetails(true, item)" :loading='item.btnloading1'>{{$t("audit.seeDetails2")}}</el-button>
          </div>
          <el-button class="button" v-if="item.report_info.hash_time == 0" size="small" plain @click="start(1, '')">{{$t("audit.verification1")}}</el-button>
          <el-button class="button" v-else size="small" plain @click="start(2, item)">{{$t("audit.verification2")}}</el-button>
        </div>
        <div class="order-list mt20">
          <div>{{$t("audit.hasNum")}}:{{ item.report_order.booked_committee.length }}</div>
          <div v-if="item.report_info.hash_time == 0">{{$t("audit.verification1_time")}}：{{ item.report_info.booked_time}}</div>
          <div v-else>{{$t("audit.verification2_time")}}：{{ item.report_order.confirm_start}}</div>
          <div v-if="item.report_info.order_status == 'Finished'">{{$t("audit.myResult")}}:{{ item.report_info.order_status != 'Finished'? '' :$t("audit.hasError")}}</div>
          <div v-if="item.report_info.order_status == 'Finished'">{{$t("audit.finalResult")}}:{{ item.report_order.support_committee.length.length > item.report_order.against_committee.length? $t("audit.noError") :$t("audit.hasError")}}</div>
          <div>{{ $t("audit.proportion") }}: {{item.report_order.support_committee.length}}/{{item.report_order.against_committee.length}}</div>
        </div>
      </div>
    </template>
    <!--    bindMail-dlg-->
    <dlg-mail
      :open.sync="dlgMail_open"
      :is-new-mail="isNewMail"
      @binding="binding"
      @fail="bindFail"
    ></dlg-mail>
    <!-- 提交信息 -->
    <el-dialog :visible.sync="dialogTableVisible1" width="580px" :close-on-click-modal='false'>
      <div v-if="isHex" slot="title">{{$t('audit.verification1')}}</div>
      <div v-else slot="title">{{$t('audit.verification2')}}</div>
      <el-form :model="formInline" class="form-inline">
        <el-form-item :label="$t('audit.machine_id')+':'">
          <span>{{formInline.machine_id}}</span>
        </el-form-item>
        <el-form-item :label="$t('audit.reporter_nonce')+':'">
          <span>{{formInline.reporter_rand_str}}</span>
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
    <el-dialog :visible.sync="dialogTableVisible" width="580px" :close-on-click-modal='false'>
      <div slot="title">{{$t('audit.seeDetails2')}}</div>
      <div class="machine_details">
        <div class="machine_id"><span>Machine_ID: </span> {{formInline.machine_id}}</div>
        <div class="session_id"><span>Session_ID: </span> {{formInline.session_id}}</div>
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
import cookie from "js-cookie";
import DlgMail from "@/components/machine/dlg_bindMail";
import {
  queryBindMail_rent,
  binding_is_ok,
  binding_is_ok_modify,
  send_email_repeat,
  getMachineCommittee,
  getOriginal,
  Save_GrabbingHash,
  GetGrabbingHash
} from "@/api";

import {
  getAccount,
  getBalance,
  getCountDown
} from "@/utlis";
import { getCurrentPair ,getRand_str, naclSeal, naclOpen, getKeypair, CreateSignature } from "@/utlis/dot"
import { mapState, mapMutations } from "vuex"
import { stringToU8a , u8aToHex, hexToU8a, hexToString, u8aToString } from '@polkadot/util';
import { naclBoxKeypairFromSecret, decodeAddress, randomAsU8a } from '@polkadot/util-crypto';
import { committeeOps, submitConfirmHash, submitConfirmRaw, committeeOrder, reportInfo, getTime, getBlockTime, reportMachineFault } from "@/utlis/dot/api"
export default {
  name: "myOrder_unlock",
  components: {
    DlgMail,
  },
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
        reporter_rand_str:'0x8d842da497f095e0d0afb969e3a7cb51e77d76dc97343dfc',
        committee_rand_str: '0x8d842da497f095e0d0afb969e3a7cb51e77d76dc97343dfc',
        err_reason:'',
        support_report: "1",
      },
      radioDisabled: false,
      isHex: true,
      timer: []
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
    // reportMachineFault((res2)=>{
    //   console.log(res2, 'res2');
    // })
    // this.binding(isNewMail);
    this.stopInter()
    this.queryMail();
    committeeOrder(this.wallet_address).then( async res=> {
      this.res_body.content = []
      res = [ ...res.booked_report, ...res.hashed_report, ...res.confirmed_report, ...res.online_machine ]
      let BlockchainTime = await getBlockTime().then( (res) => { return parseFloat(res.replace(/,/g, '')) }) // 获取链上块时间
      for(let i=0; i< res.length; i++){
        let res1 = await committeeOps(this.wallet_address, res[i])
        let res2 =  await reportInfo(res[i])
        res1.booked_time = await getCountDown(1, res1.booked_time, BlockchainTime)
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
  deactivated() {
    this.stopInter()
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
    
    // 提交结果
    start(num, item){
      if(num == 1){
        this.radioDisabled = false
        this.isHex = true
        this.dialogTableVisible1 = true
      }else{
        this.radioDisabled = true
        this.isHex = false
        this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText:  this.$t('cancel'),
          inputValue: this.passward
        })
        .then( ({ value }) => {
          CreateSignature(this.wallet_address, value)
          .then((res)=> {
            this.setPassWard(value)
            let parmas = { 
              machine_id: this.wallet_address,
              signature: res,
              wallet: this.wallet_address
            }
            GetGrabbingHash(parmas)
            .then(res1 => {
              if( typeof res == 'string'){
                this.$message({
                  showClose: true,
                  message: res1,
                  type: "error",
                });
              }else{
                this.formInline = res1?res1:{}
                this.formInline.is_support = res?String(res1.is_support):''
                this.dialogTableVisible1 = true
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
      if(this.formInline.passward == ''){
        this.$message({
          showClose: true,
          message: this.$t('verifyPassward'),
          type: "error",
        });
      }else{
        this.btnloading = true;
        if(this.passward == ''){
          this.setPassWard(this.formInline.passward)
        }
        if(this.isHex){
          CreateSignature(this.formInline.machine_id, this.formInline.passward)
          .then((res) =>{
            let params = {
              machine_id: this.formInline.machine_id,
              report_id: this.formInline.report_id, 
              reporter_rand_str: this.formInline.reporter_rand_str, 
              committee_rand_str: this.formInline.committee_rand_str, 
              err_reason: this.formInline.err_reason, 
              is_support: this.formInline.is_support,
              wallet: this.wallet_address,
              signature: res
            }
            Save_GrabbingHash(params).then(res1=>{
              if(typeof res1 != 'string'){
                submitConfirmHash(this.formInline, this.formInline.passward, (res2)=>{
                  if(res2.success){
                    this.$message({
                      showClose: true,
                      message: this.$t('audit.Op_Successful'),
                      type: "success",
                    });
                  }else{
                    this.$message({
                      showClose: true,
                      message: res2.msg,
                      type: "error",
                    });
                  }
                  this.btnloading = false;
                })
              }else{
                this.$message({
                  showClose: true,
                  message: res1,
                  type: "error",
                });
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
        }else{
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
                message: res.msg,
                type: "error",
              });
            }
            this.btnloading = false;
          })
        }
      }
    },
    cancel1(){
      this.formInline.passward = ''
      this.dialogTableVisible1 = false
    },
    // 查看问题描述
    seeDetails(status, item){
      if(status){
        this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText:  this.$t('cancel'),
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
          item.btnloading1 = true
          let { secretKey , publicKey} = naclBoxKeypairFromSecret(decodeAddress(item.report_order.reporter));
          let message = u8aToString(naclOpen( 
            hexToU8a(item.report_info.encrypted_err_info), 
            hexToU8a('0x8d842da497f095e0d0afb969e3a7cb51e77d76dc97343dfc'), 
            publicKey, 
            KeyPair.secretKey 
          ))
          this.formInline = {...this.formInline, ... JSON.parse(message)}
          // this.formInline.machine_id = item.machine_id
          // this.formInline.report_id = item.report_id
          this.dialogTableVisible = true
          item.btnloading1 = false
        })
      }else{
        this.$message({
          message: this.$t('audit.tipmsg'),
          type: "warning",
        });
        // let KeyPair;
        // try {
        //   KeyPair = getKeypair('lynn123123')
        // } catch (err) {
        //   this.$message({
        //     message: err.message,
        //     type: "error",
        //   });
        //   return false
        // }
        // console.log(KeyPair, 'KeyPair');
        // let perams = {
        //   report_id:'21',
        //   machine_id:'11111111111111111111111111111111111111111111',
        //   err_reason:'测试Bug,通过一下',
        // }
        // let message = stringToU8a(JSON.stringify(perams));
        // let { secretKey , publicKey} = naclBoxKeypairFromSecret(decodeAddress("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"));
        // console.log(u8aToHex(secretKey), u8aToHex(publicKey), 'secretKey');
        // let nonce = hexToU8a('0x8d842da497f095e0d0afb969e3a7cb51e77d76dc97343dfc')
        // this.str_Sealed = naclSeal( message, secretKey, KeyPair.publicKey, nonce ); 
        // console.log(this.str_Sealed,'this.str_Sealed');
        // str_Sealed： "0x9c86fffb12d3751b3a533a093b9af85257430bc0c44422ce0cd6ad9ad4edb416bc554ca5859e11a3ab0fda675ed20ae62aa15f848a5b6c92fde01c6c958c2007c4a2d0f0861abca00969aed6e7f60142365af9f9ab7047a5ac4d3afc3df56abc657022a8cf65fb4ea1a12430f2d11a989ea6ca7ff0d5203be2a21cba9e5650f86fca0772"
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
