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
              style="width: 120px"
              type="primary"
              size="mini"
              :loading='item.btnloading2'
              :disabled='item.submit'
              @click="SeeVirtual(item)"
              >{{ $t("audit.verification3") }}</el-button
            >
            <el-button 
              v-if="item.status == 'booked'"
              style="width: 120px"
              type="primary"
              size="mini"
              :loading='item.btnloading1'
              :disabled='item.submit'
              @click="CreateVirtual(item)"
              >{{ $t("audit.verification4") }}</el-button
            >
            <div v-if="item.status == 'booked'" class="verification_tips">{{ $t("audit.verification_tips2") }}</div>
          </div>
        </div>
        <div class="flex">
          <div class="machineIdBox">
            {{ item.machine_id }}
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
              <a class="cPrimaryColor">{{ item.mem&&item.mem.size }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t("audit.Shd_space")}}：
              <a class="cPrimaryColor">{{ item.disk_system&&item.disk_system.size }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t("audit.Dhd_space")}}：
              <a class="cPrimaryColor">{{ item.disk_data[0] && item.disk_data[0].size }}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <span class="fs16">
              {{ $t('list_cpu_numbers')}}：
              <a class="cPrimaryColor">{{ item.cpu&&item.cpu.cores }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t('audit.CPUfrequency')}}：
              <a class="cPrimaryColor">{{ item.cpu&&item.cpu.hz }}</a>
            </span>
          </div>
          <div class="td3">
            <span class="fs16">
              {{ $t("audit.CPUmodel") }}：
              <a class="cPrimaryColor">{{ item.cpu && item.cpu.type }}</a>
            </span>
          </div>
        </div>
        <div class="virtual" v-if="item.virtual_info&&item.virtual_info.length">
          <div class="v-list"  v-for="el in item.virtual_info" :key="el.task_id">
            <div class="li-top">
              <div class="left fs14"><span class="bold">{{$t('myvirtual.virId')}}</span>: {{el.task_id}}</div>
              <div v-if="el.status == 'creating'">{{$t('audit.verify_msg')}}</div>
              <div v-else-if="el.status == 'running'">
                <el-button
                  plain
                  class="tool-btn"
                  size="mini"
                  @click="reboot(el, item)"
                  :loading='item.btnloading3'
                  >{{ $t("myvirtual.reboot") }}</el-button
                >
              </div>
              <div v-else>{{$t('audit.verify_msg1')}}</div>
            </div>
            <div v-if="el.status == 'running'" class="li-bottom">
              <span>{{$t('myvirtual.mirror_name')}}: ubuntu.qcow2</span>
              <span>{{$t('myvirtual.IP_address')}}: {{el.ssh_ip}}</span>
              <span>{{$t('myvirtual.user_name')}}: {{el.user_name}}</span>
              <span>{{$t('myvirtual.password')}}: {{el.login_password}}</span>
              <span>{{$t('myvirtual.ssh_port')}}: {{el.ssh_port}}</span>
              <span>{{$t('myvirtual.vir_mem')}}: {{el.mem_size}}</span>
              <span >{{$t('myvirtual.vir_sys')}}: {{el.disk_system}}</span>
              <span>{{$t('myvirtual.vir_data')}}: {{el.disks[1].size}}</span>
              <span>{{$t('myvirtual.vir_gpu_num')}}: {{el.gpu_count}}</span>
              <span >{{$t('myvirtual.vir_cpu_num')}}: {{el.cpu_cores}}</span>
            </div>
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
  </div>
</template>

<script>
import {
  VerifierMachine,
  Verifier_CreateVM,
  Tasks,
  Restart
} from "@/api";
import {
  getAccount,
  getBlockchainTime,
  randomWord
} from "@/utlis";

import { getCurrentPair, CreateSignature } from "@/utlis/dot"
import { getBlockTime, getCommitteeList } from "@/utlis/dot/api"
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
      isNewMail: false,
      isBinding: false,
      bindMail: "",
      language: undefined,
      send_email_repeatLoading: false,
      send_email_repeat_index: -1,
      machineCount: 0,
      pageSize: 10,
      currentPage: 1,
      allListedMachine: [],
      res_body: {
        content: [],
      },
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
      }
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
    getCommitteeList(this.wallet_address).then(res => {
      if (!res) {
        this.$router.push('/home')
      }
    })
  },
  mounted() {
    this.language = this.$i18n.locale;
    this.queryMc();
    // this.queryMail();
  },
  beforeDestroy() {
    
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
      VerifierMachine(params) 
      .then( async (res) => {
        let BlockchainTime = await getBlockTime().then((res) => { return parseFloat(res.replace(/,/g, '')) }) // 获取链上块时间
        this.allListedMachine = []
        if (res.success) {
          for(let i=0; i< res.content.length; i++){
            let original = res.content[i].original.mainnet ? res.content[i].original.mainnet : res.content[i].original
            let newel = Object.assign(
              { submit: true, canConfirm: true, btnloading1: false}, 
              res.content[i],
              original.errcode == 0 ? original.message : this.originalDefult
            )
            newel.verify_time = await getBlockchainTime(BlockchainTime, newel.verify_time_high?newel.verify_time_high:[])
            let nowData = +new Date()
            newel.verify_time.map(el => {
              if(nowData > el.startTimestamp && nowData < el.endTimestamp){
                newel.submit = false
              }
            })
            newel.virtual_info = []
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
    // 查看虚拟机
    SeeVirtual(el) {
      el.btnloading2 = true
      this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText:  this.$t('cancel'),
        inputType:'password',
        inputValue: this.passward
      })
      .then( async ({ value }) => {
        this.setPassWard(value)
        try {
          let nonce = await randomWord()
          let sign = await CreateSignature(nonce, value)
          let VMS_Info = await Tasks({ machine_id: el.machine_id, nonce, sign, wallet: this.wallet_address })
          el.virtual_info = []
          console.log(VMS_Info, 'VMS_Info');
          if(VMS_Info.success){
            el.virtual_info.push(VMS_Info.content)
          }else{
            this.$message.error(this.$t('audit.verify_msg2'))
            el.virtual_info = []
          }
          console.log(el, 'el')
          el.btnloading2 = false
        } catch (err) {
          el.btnloading2 = false
          this.$message({
            showClose: true,
            message: err.message,
            type: "error",
          });
        }
      })
      .catch( err => {
        el.btnloading2 = false
        console.log(err, 'err');
      })
    } ,
    // 创建虚拟机
    CreateVirtual(el) {
      el.btnloading1 = true
      this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText:  this.$t('cancel'),
        inputType:'password',
        inputValue: this.passward
      })
      .then( async ({ value }) => {
        this.setPassWard(value)
        try {
          let nonce = await randomWord()
          let sign = await CreateSignature(nonce, value)
          console.log(el.images, 'el.images');
          let perams = {
            machine_id: el.machine_id,
            image_name: 'ubuntu.qcow2',
            gpu_count: el.gpu.gpu_count,
            cpu_cores: el.cpu.cores,
            mem_size: parseFloat(el.mem.free) > 10 ? 10 : parseFloat(el.mem.free),
            disk_size: parseFloat(el.disk_data[0].free) > 10 ? 10 : parseFloat(el.disk_data[0].free),
            wallet: this.wallet_address,
            sign,
            nonce
          }
          let VMS_Info = await Verifier_CreateVM(perams)
          el.virtual_info = []
          if(VMS_Info.success){
            el.virtual_info.push(VMS_Info.content)
          }else{
            if (VMS_Info.code == -4) {
              this.$message.error(VMS_Info.msg)
            } else if (VMS_Info.code == -10001) {
              this.$message.error(VMS_Info.msg)
            } else {
              this.$message.error(this.$t('audit.verify_msg3'))
            }
            el.virtual_info = []
          }
          el.btnloading1 = false
        } catch (err) {
          el.btnloading1 = false
          this.$message({
            showClose: true,
            message: err.message,
            type: "error",
          });
        }
      })
      .catch( err => {
        el.btnloading1 = false
        console.log(err, 'err');
      })
    },
    // 重启虚拟机
    reboot(el, item) {
      item.btnloading3 = true
      this.$confirm(this.$t('myvirtual.tip5'), this.$t('myvirtual.reboot'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then( async () => {
        let nonce = await randomWord()
        let sign = await CreateSignature(nonce, this.passward)
        Restart({ task_id: el.task_id, machine_id: item.machine_id, nonce, sign, wallet: this.wallet_address }).then( res => {
          if(!res.success){
            this.$message({
              type: 'error',
              message: res.message
            });
          }else{
            this.$message({
              type: 'success',
              message: this.$t('myvirtual.reboot_success')
            });
          }
          item.btnloading3 = false
        })
        // this.$message({
        //   type: 'success',
        //   message: '重启'
        // });
      }).catch((err) => {
        console.log(err, 'err');
        item.btnloading3 = false
        this.$message({
          type: 'info',
          message: this.$t('cancel')
        });          
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
.virtual{
  padding: 10px 20px;
  .v-list{
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #e1e6ec;
    &:last-child{
      margin: 0;
    }
    .li-top{
      display: flex;
      align-items: center;
      padding-bottom: 5px;
      justify-content: space-between;
      border-bottom: 1px solid #e1e6ec;
    }
    .li-bottom{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding-top: 10px;
      span{
        width: 16%;
        margin-bottom: 6px;
        word-break: break-all;
        &.width50{
          width: 50%;
        }
        &.width40{
          width: 40%;
        }
        &.width30{
          width: 30%;
        }
        &.bold{
          font-size: 18px;
          font-weight: bold;
        }
        .color{
          color: #f56c6c;
        }
        i{
          font-style: normal;
          color: #195d91;
        }
      }
    }
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
