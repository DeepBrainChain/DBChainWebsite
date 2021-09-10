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
          <!-- <div>
            <el-button v-if="item.status == 0" size="small" plain @click="seeDetails(false)">{{$t("audit.seeDetails")}}</el-button>
            <el-button v-else-if="item.status == 1" size="small" plain @click="seeDetails(false)">{{$t("audit.seeDetails1")}}</el-button>
            <el-button v-else size="small" plain @click="seeDetails(true)">{{$t("audit.seeDetails2")}}</el-button>
          </div> -->
          <div v-if="item.first_book_time != ''">订单倒计时：{{item.first_book_time}}</div>
          <!-- <div v-if="item.booked_committee.length != 0">抢单倒计时：</div> -->
          <div>{{$t("audit.hasNum")}}: {{item.booked_committee.length}}</div>
          <div>{{$t("audit.status")}}:{{$t("audit.status1")}}</div>
          <el-button class="button" v-if="(item.report_status == 'Reported' || item.report_status == 'WaitingBook')" size="small" :loading="item.btnloading" plain @click="start(item)">{{$t("audit.start")}}</el-button>
          <el-button class="button" v-else size="small" disabled plain>{{$t("audit.start1")}}</el-button>
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
    <!-- seeDetails -->
    <el-dialog :visible.sync="dialogTableVisible" width="580px" :close-on-click-modal='false'>
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
  send_email_repeat
} from "@/api";

import {
  getAccount,
  getBalance,
  getCountDown
} from "@/utlis";
import { getOrder, reportInfo, getCommitteeList, bookFaultOrder, getBlockTime } from '@/utlis/dot/api'
import { getCurrentPair } from "@/utlis/dot"
import { mapState, mapMutations } from "vuex"
export default {
  name: "ordergrabbingMachine_unlock",
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
      btnloading: false,
      bindMail: "",
      res_body: {
        content: [],
      },
      send_email_repeatLoading: false,
      send_email_repeat_index: -1,
      // 查询问题描述
      dialogTableVisible: false,
      timer:[],
      setInt: null
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
    this.getOrderList();
    this.setInt = setInterval(()=>{
      this.getOrderList()
    }, 30000)
  },
  deactivated() {
    this.stopInter()
    clearInterval(this.setInt)
  },

  computed: {
    ...mapState(["isNewWallet", "passward"]),
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
    // 获取列表
    getOrderList(){
      this.stopInter();
      getOrder().then(async res => {
        this.res_body.content = []
        res = [...res.bookable_report, ...res.verifying_report, ...res.waiting_raw_report, ...res.finished_report]
        let BlockchainTime = await getBlockTime().then( (res) => { return parseFloat(res.replace(/,/g, '')) }) // 获取链上块时间
        res.map((el, index) => {
          let report = { report_id: el, btnloading: false }
          reportInfo(el).then( async (res1) => {
            res1.first_book_time = await getCountDown(2, res1.first_book_time, BlockchainTime)
            this.res_body.content.push(
              {...report, ...res1}
            )
            if(res1.first_book_time > 0){
              this.count(res1.first_book_time, index, (msg)=>{
                this.res_body.content[index].first_book_time = msg
              })
            }else{
              this.res_body.content[index].first_book_time = ''
            }
          })
        })
      });
      console.log(this.res_body.content, 'this.res_body.content');
    },
    // 开时抢单
    start(item){
      this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText:  this.$t('cancel'),
        inputValue: this.passward
      }).then( ({ value }) => {
        this.setPassWard(value)
        item.btnloading = true
        getCommitteeList(this.wallet_address).then(res=>{
          if(res){
            clearInterval(this.setInt)
            bookFaultOrder(item.report_id, value, res=>{
              if(res.success){
                this.$message({
                  showClose: true,
                  message: this.$t('audit.tipmsg1'),
                  type: "success",
                });
                item.btnloading = false
              }else{
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "error",
                });
                item.btnloading = false
              }
              this.setInt = setInterval(()=>{
                this.getOrderList()
              }, 10000)
            })
          }else{
            this.$message({
              showClose: true,
              message: this.$t('audit.tipmsg4'),
              type: "error",
            });
            item.btnloading = false
          }
        })
      }).catch(() => {
        // this.$message({
        //   showClose: true,
        //   message: this.$t('verifyPassward'),
        //   type: "warning",
        // });  
        console.log('取消抢单');
      });
    },
    // 查看问题描述
    seeDetails(status){
      if(status){
        this.dialogTableVisible = true
      }else{
        this.$message({
          message: this.$t('audit.tipmsg'),
          type: "error",
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
      let times=time>0?time:0;
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
    }
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
    div{
      flex:1
    }
    .button{
      width: 120px;
    }
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

</style>
