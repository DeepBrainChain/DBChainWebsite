<template>
  <div>
    <div class="order_tips ">{{$t('audit.ogMachine_tips')}}</div>
    <div class="order_tips ">{{$t('audit.ogMachine_tips1')}}</div>
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
          <div v-if="'rentedInaccessible' in item.machine_fault_type">{{$t("audit.report_err")}}:{{$t("audit.report_info")}}</div>
          <div v-else>{{$t("audit.report_err")}}:{{$t("audit.report_info1")}}</div>
          <div v-if="item.first_book_time != ''">{{$t("audit.countdown")}}: {{item.first_book_time}}</div>
          <!-- <div v-if="item.booked_committee.length != 0">抢单倒计时：</div> -->
          <div>{{$t("audit.hasNum")}}: {{item.booked_committee.length}}</div>
          <div v-if="item.booked_committee.length < 3">{{$t("audit.status")}}:{{$t("audit.status1")}}</div>
          <div v-else>{{$t("audit.status")}}:{{$t("audit.status2")}}</div>
          <el-button class="button" v-if="(item.report_status == 'Reported' || item.report_status == 'WaitingBook')" size="small" :loading="item.btnloading" plain @click="start(item)">{{$t("audit.start")}}</el-button>
          <el-button class="button" v-else-if="item.report_status == 'CommitteeConfirmed'" size="small" disabled plain>{{$t("audit.start2")}}</el-button>
          <el-button class="button" v-else size="small" disabled plain>{{$t("audit.start1")}}</el-button>
        </div>
      </div>
    </template>
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
import {
  getAccount,
  getCountDown
} from "@/utlis";
import { Error_Reason } from "@/utlis/error_desc"
import { getOrder, reportInfo, getCommitteeList, bookFaultOrder, getBlockTime } from '@/utlis/dot/api'
import { getCurrentPair } from "@/utlis/dot"
import { mapState, mapMutations } from "vuex"
export default {
  name: "ordergrabbingMachine_unlock",
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
    // 获取列表
    getOrderList(){
      this.stopInter();
      getOrder().then(async res => {
        res = [...res.bookable_report, ...res.verifying_report, ...res.waiting_raw_report]
        let BlockchainTime = await getBlockTime().then( (res) => { return parseFloat(res.replace(/,/g, '')) }) // 获取链上块时间
        let OrderArr = []
        for (let i= 0; i< res.length; i++) {
          let report = { report_id: res[i], btnloading: false }
          reportInfo(res[i]).then( async (res1) => {
            if ('rentedInaccessible' in res1.machine_fault_type) {
              res1.first_book_time = await getCountDown(6, res1.first_book_time, BlockchainTime)
            } else {
              res1.first_book_time = await getCountDown(2, res1.first_book_time, BlockchainTime)
            }
            OrderArr.push(
              {...report, ...res1}
            )
            if(res1.first_book_time > 0){
              this.count(res1.first_book_time, i, (msg)=>{
                OrderArr[i].first_book_time = msg
              })
            }else{
              OrderArr[i].first_book_time = ''
            }
          })
        }
        console.log(OrderArr, 'OrderArr')
        this.res_body.content = OrderArr
      });
    },
    // 开时抢单
    start(item){
      this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText:  this.$t('cancel'),
        inputType:'password',
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
                  message: ( res.index == 0 || res.index ) ? Error_Reason[res.section][res.index] : res.msg,
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
