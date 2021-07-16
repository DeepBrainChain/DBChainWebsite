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
            <el-button v-if="item.status == 0" size="small" plain @click="seeDetails(false)">{{$t("audit.seeDetails1")}}</el-button>
            <el-button v-else size="small" plain @click="seeDetails(true)">{{$t("audit.seeDetails2")}}</el-button>
          </div>
          <el-button class="button" v-if="item.hashed_committee.length == 0" size="small" plain @click="start(1)">{{$t("audit.verification1")}}</el-button>
          <el-button class="button" v-else size="small" plain @click="start(2)">{{$t("audit.verification2")}}</el-button>
        </div>
        <div class="order-list mt20">
          <div>{{$t("audit.hasNum")}}:{{ item.booked_committee.length }}</div>
          <div>{{$t("audit.verification1_time")}}：{{ item.report_info.booked_time}}</div>
          <div>{{$t("audit.myResult")}}:{{ item.hashed_committee.length == 0? '' :$t("audit.hasError")}}</div>
          <div>{{$t("audit.finalResult")}}:{{ item.hashed_committee.length == 0? '' :$t("audit.hasError")}}</div>
          <div>{{ $t("audit.proportion") }}: {{item.support_committee.length}}/{{item.against_committee.length}}</div>
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
    <el-dialog :visible.sync="dialogTableVisible1" width="580px">
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
    <el-dialog :visible.sync="dialogTableVisible" width="580px">
      <div slot="title">{{$t('audit.seeDetails2')}}</div>
      <div class="machine_details">
        <div class="machine_id"><span>Machine_ID: </span> 2gfpp3MAB42X3BJhQjmMe6HAFivnMVU5QXVC1nFfAK5</div>
        <div class="session_id"><span>Session_ID: </span> 2gfpp3MAB42X3BJhQjmMe6HAFivnMVU5QXVC1nFfAK5</div>
        <div class="message"><span>{{$t('audit.message')}}: </span> 虚拟机运行报错等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等等</div>
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
  getOriginal
} from "@/api";

import {
  getAccount,
  getBalance,
  getCountDown
} from "@/utlis";
import { getCurrentPair ,getRand_str } from "@/utlis/dot"
import { mapState, mapMutations } from "vuex"

import { committeeOps, submitConfirmHash, submitConfirmRaw, committeeOrder, reportInfo, getTime } from "@/utlis/dot/api"
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
        report_id:'0',
        machine_id:'8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48',
        reporter_rand_str:'0x78dd824a692abcea95648bb26086c58adb3f46d019e6738e',
        committee_rand_str: getRand_str(),
        err_reason:'要不是写着2080ti，我差点以为是CPU跑的代码，2天多，resnet34层没跑到100批次',
        support_report: "1",
      },
      radioDisabled: false,
      isHex: true
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
    // this.binding(isNewMail);
    this.queryMail();
    committeeOrder(this.wallet_address).then( res=> {
      this.res_body.content = []
      res.booked_report.map(el => {
        committeeOps(this.wallet_address, el).then( res1 => {
          getCountDown(1, res1.booked_time).then(
            res3 => {
              res1.booked_time = -res3
            }
          )
          let report = { report_id: el, report_info: res1}
          reportInfo(el).then( res2 => {
            this.res_body.content.push(
              {...report, ...res2}
            )
          })
        })
        console.log(this.res_body.content, 'this.res_body.content');
      })
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

    // 开时抢单
    start(num){
      if(num == 1){
        this.radioDisabled = false
        this.isHex = true
      }else{
        this.radioDisabled = true
        this.isHex = false
        // getOriginal(this.wallet_address).then( res => {
        //   this.formInline = res
        // })
      }
      this.dialogTableVisible1 = true
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
          // getMachineCommittee(this.formInline).then( res => {
            // console.log(res);
            submitConfirmHash(this.formInline, this.formInline.passward, (res)=>{
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
          // })
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
    seeDetails(status){
      this.btnloading = true
      if(status){
        
      }else{

      }
      // let KeyPair = getKeypair('123456789')
      // let message = stringToU8a('Machine_ID: 234234234234234234234234 ');
      // let { secretKey , publicKey} = naclBoxKeypairFromSecret(decodeAddress('5DhFCVhtxZkz1mXWQcGv67tPvGzqXjEcF1q1DPUdCAJEX7vm'));
      // if(status){
      //   this.str_Sealed = naclSeal( message, secretKey, KeyPair.publicKey ); 
      //   console.log(this.str_Sealed, 'this.str_Sealed');
      // }else{
      //   console.log(u8aToString(naclOpen( this.str_Sealed.sealed , this.str_Sealed.nonce, publicKey, KeyPair.secretKey )));
      // //   this.$message({
      // //     message: this.$t('audit.tipmsg'),
      // //     type: "error",
      // //   });
      // }
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
    GetRTime(item, t){
      let iner;
      let time_str = ''
      clearInterval(iner)
      iner = setInterval( ()=> {
        let d = 0, h = 0, m = 0, s = 0
        if(t>=0){
          d=Math.floor(t/60/60/24);
          h=Math.floor(t/60/60%24);
          m=Math.floor(t/60%60);
          s=Math.floor(t%60);
          --t
          time_str = (d>0?d + 'Day ' : "") + (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s)
        }else{
          time_str = '00:00:00'
          clearInterval(iner)
        }
        item.report_info.booked_time = time_str
      }, 1000)
    },

    init(){
      //获取当前时间
      let cur = new Date().getTime();
      //设置截止时间
      let str=[
          "2022/6/30 00:00:00",
          "2022/7/1 00:00:00",
      ];
      // 倒计时
      this.counts.map((item,index)=>{
        // 当前时间减去停止时间
          let leftTime = parseInt((new Date(str[index])-cur)/1000)
          this.count(leftTime,(msg)=>{
              item.countNumber=msg;
          })
      })
    },
    // 倒计时
    count(time,fn){
      let t=this;
      let times=time;
      ti()
      this.timer.push(setInterval(ti,1000))
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
          clearInterval(t.timer);
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
