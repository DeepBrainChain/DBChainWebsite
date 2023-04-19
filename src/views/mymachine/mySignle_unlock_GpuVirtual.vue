<template>
  <div class="gpuVirtual" id="gpuVirtualInfo">
    <div class="title">
      <span>{{$t("signleVir.title")}}：{{ orderNumber }} {{$t("myvirtual.tower")}}</span>
    </div>
    <div class="table">
      <div class="tableli" v-for="el in Machine_info" :key="el._id">
        <div class="li_list1">
          <div>
            <span class="Machine_id">{{$t('signleVir.orderId')}}: {{el._id}}</span>
            <span class="time_left" v-if="el.orderStatus == 3">{{$t('myvirtual.time_left')}}: {{el.time_left}} </span>
          </div>
          <div v-if="el.orderStatus == 4">
            <div v-if="!el.hasdelectVm" class="fs14"><span class="bold">{{$t('signleVir.vmdelectTime')}}</span>: {{el.vmdelectTime}}</div>
            <div v-else class="fs14"><span class="bold">{{$t('signleVir.vmdelect')}}</span></div>
          </div>
          <div class="order_status fs14 bold">
            <span v-show="el.orderStatus == 1">{{$t('signleVir.order_status1')}}</span>
            <span v-show="el.orderStatus == 2">{{$t('signleVir.order_status2')}}</span>
            <span v-show="el.orderStatus == 3">{{$t('signleVir.order_status3')}}</span>
            <span v-show="el.orderStatus == 4">{{$t('signleVir.order_status4')}}</span>
            <span v-show="el.orderStatus == 5">{{$t('signleVir.order_status5')}}</span>
            <span v-show="el.orderStatus == 6">{{$t('signleVir.order_status6')}}</span>
          </div>
        </div>
        <div class="pay-wrap">
          <div><span>{{$t('gpu.payDBCs')}}</span>: {{getnum2(el.dbc)}}</div>
          <!-- <div><span>{{$t('gpu.gpuBilling')}}</span>: {{el.gpu_price?el.gpu_price:0}}$</div> -->
          <!-- <div><span>{{$t('memory_space')}}</span>: 0</div> -->
          <div v-if="el.orderStatus == 3"><span>{{$t('gpu.userTime')}}</span>: {{el.userTime}}</div>
          <!-- <div><span>{{$t('gpu.actualPrice')}}</span>: {{el.Actual_cost}}</div> -->
          <!-- <div><span>{{$t('diskspace_remaining')}}</span>: 0</div> -->
          <!-- <div><span>{{$t('gpu.currentRemaining')}}</span>: 0</div> -->
          <!-- <div><span>{{$t('gpu.payPrice')}}</span>: {{ Math.round(el.dbc_price* 1000000)/1000000}}$</div> -->
        </div>
        <div class="li_list2">
          <span class="width50 bold">{{$t('signleVir.machineId')}}: {{el.machine_id}}</span>
          <span class="bold">{{$t('signleVir.remainingGPU')}}: {{el.CanUseGpu}}</span>
          <span class="bold">{{$t('virtual.Hours_Rent')}}: <i class="color">{{el.singleCardHour}} DBC</i></span>
          <!-- <span class="bold">{{$t('virtual.GPU_Num')}}: {{el.gpu_num}}</span>
          <span class="bold">{{$t('virtual.GPU_memory')}}: {{el.gpu_mem}}G</span> -->
          <!-- <span class="width30 bold">{{$t('virtual.GPU_type')}}: {{el.gpuType}}</span> -->
          <!-- <span>{{$t('virtual.Country')}}: {{el.country}}</span>
          <span>{{$t('virtual.City')}}: {{el.city}}</span>
          <span v-if="el.server_room" :title="el.server_room">{{$t('virtual.Room_number')}}: {{String(el.server_room).substring(0,10)+'...'}}</span>
          <span class="operators">{{$t('virtual.Network_operators')}}:
            <span class="opera">
              <i v-for="(operators,index) in el.telecom_operators" :key='index'>
                {{operators}}
              </i>
            </span>
          </span>
          <span>{{$t('virtual.Memory_num')}}: {{Math.ceil(Number(el.mem_num))}}G</span>
          <span>{{$t('virtual.System_hd')}}: {{el.sys_disk}}G</span>
          <span>{{$t('virtual.Data_hd')}}: {{Number(el.data_disk)/1000}}T</span>
          <span>{{$t('virtual.Bandwidth1')}}: {{el.upload_net}}Mbps</span>
          <span>{{$t('virtual.Bandwidth2')}}: {{el.download_net}}Mbps</span>
          <span>{{$t('virtual.CPU_cores')}}: {{el.cpu_core_num}}</span>
          <span>{{$t('virtual.CPU_frequency')}}: {{getnum2(Number(el.cpu_rate)/1000)}}Ghz</span>
          <span class="width40">{{$t('virtual.CPU_type')}}: {{el.cpuType}}</span> -->
        </div>
        <div class="virtual" v-if="el.orderStatus == 3">
          <!-- <div class="v-list"  v-for="item in el.virtual_info" :key="item.task_id"> -->
            <div class="li-top">
              <!-- <div class="left fs14"><span class="bold">{{$t('myvirtual.virId')}}</span>: {{el.task_id}}</div> -->
              <div class="blod fs14">
                <span>{{$t('signleVir.virStatus')}}:</span>
                <span v-show="el.status == 'closed'">{{$t('myvirtual.vir_status')}}</span>
                <span v-show="el.status == 'creating'">{{$t('myvirtual.vir_status1')}}</span>
                <span v-show="el.status == 'running'">{{$t('myvirtual.vir_status2')}}</span>
                <span v-show="el.status == 'starting'">{{$t('myvirtual.vir_status3')}}</span>
                <span v-show="el.status == 'being poweroff'">{{$t('myvirtual.vir_status4')}}</span>
                <span v-show="el.status == 'restarting'">{{$t('myvirtual.vir_status5')}}</span>
                <span v-show="el.status == 'resetting'">{{$t('myvirtual.vir_status6')}}</span>
                <span v-show="el.status == 'start error'">{{$t('myvirtual.vir_status7')}}</span>
                <span v-show="el.status == 'restart error'">{{$t('myvirtual.vir_status8')}}</span>
                <span v-show="el.status == 'pm_suspended'">{{$t('myvirtual.vir_status9')}}</span>
              </div>
              <div>
                <el-button
                  plain
                  class="tool-btn"
                  size="mini"
                  :loading='el.btnloading1'
                  v-if="el.orderStatus == 3 && el.status == 'running'"
                  @click="stopVir(el)"
                  >{{ $t("myvirtual.stop") }}</el-button
                >
                <el-button
                  plain
                  class="tool-btn"
                  size="mini"
                  :loading='el.btnloading2'
                  v-if="el.orderStatus == 3 && (el.status == 'closed' || el.status == 'start error' || el.status == 'pm_suspended')"
                  @click="startVir(el)"
                  >{{ $t("myvirtual.start") }}</el-button
                >
                <el-button
                  plain
                  class="tool-btn"
                  size="mini"
                  :loading='el.btnloading3'
                  v-if="el.orderStatus == 3 && el.status == 'running'"
                  @click="reboot(el)"
                  >{{ $t("myvirtual.reboot") }}</el-button
                >
                <!-- <el-button
                  plain
                  class="tool-btn"
                  size="mini"
                  v-if="el.orderStatus == 3"
                  @click="delect(el, el)"
                  >{{ $t("myvirtual.delect") }}</el-button
                > -->
                <!-- <el-button
                  plain
                  class="tool-btn"
                  size="mini"
                  v-if="el.orderStatus == '正在使用中' || el.orderStatus == '待确认支付' "
                  @click="reset(el)"
                  >{{ $t("myvirtual.reset") }}</el-button
                > -->
                <!-- <el-button
                  plain
                  class="tool-btn"
                  size="mini"
                  :loading='el.btnloading4'
                  v-if="el.orderStatus == 3"
                  @click="operateVirtual1(el)"
                  >{{ $t("myvirtual.change") }}</el-button
                > -->
              </div>
            </div>
            <div v-if="el.status == 'running'"  class="li-bottom">
              <p>{{$t('myvirtual.mirror_name')}}: {{el.images}}</p>
              <p>{{$t('myvirtual.IP_address')}}: {{el.ssh_ip}} <span class="copy" @click="CopyTx(el.ssh_ip)"></span></p>
              <p>{{$t('myvirtual.user_name')}}: {{el.user_name}} <span class="copy" @click="CopyTx(el.user_name)"></span></p>
              <p>{{$t('myvirtual.password')}}: {{el.login_password}} <span class="copy" @click="CopyTx(el.login_password)"></span></p>
              <p v-if="el.os == 'linux'">{{$t('myvirtual.ssh_port')}}: {{el.ssh_port}}</p>
              <p v-if="el.os != 'linux'">{{$t('myvirtual.rdp_port')}}: {{el.rdp_port? el.rdp_port: ''}}</p>
              <!-- <p>{{$t('myvirtual.port_range')}}: 600~6000</p> -->
              <p>{{$t('myvirtual.vir_mem')}}: {{el.mem_size}}</p>
              <p >{{$t('myvirtual.vir_sys')}}: {{el.disk_system}}</p>
              <p>{{$t('myvirtual.vir_data')}}: {{el.disks | getDiskData}}</p>
              <p>{{$t('myvirtual.vir_gpu_num')}}: {{el.gpu_count}}</p>
              <p >{{$t('myvirtual.vir_cpu_num')}}: {{el.cpu_cores}}</p>
              <p >{{$t('myvirtual.vnc_port')}}: {{el.vnc_port}}</p>
              <p >{{$t('myvirtual.open_port_range')}}: {{el.port_min}} - {{el.port_max}}</p>
              <!-- <p >{{$t('myvirtual.multicast')}}: {{el.multicast? el.multicast.toString(): ''}}</p> -->
              <p style="width: 50%">{{$t('myvirtual.local_address')}}: {{el.local_address? el.local_address.toString(): ''}}</p>
            </div>
          <!-- </div> -->
        </div>
        <div class="tools-head">
          <div class="l-wrap">
            <!-- {{$t('myvirtual.tip2')}} -->
          </div>
          <div class="r-warp">
            <el-button
              plain
              class="tool-btn"
              size="mini"
              :loading='el.btnloading2'
              @click="Renew(el)"
              v-if="el.orderStatus == 3"
              >{{ $t("myvirtual.Renew") }}</el-button
            >
            <el-button
              plain
              class="tool-btn"
              size="mini"
              :loading='el.btnloading5'
              @click="RentAgain(el)"
              v-if="el.orderStatus == 4 && !el.hasdelectVm"
              >{{ $t("signleVir.RentAgain") }}</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="paging">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleChangepageSize"
        @current-change="handleCurrentChang"
      />
    </div>
    <!-- 续费 -->
    <el-dialog width='30%' :title="$t('myvirtual.Renew')" :visible.sync="dialogFormVisible">
      <div>
        <p><span class="bold">{{$t('myvirtual.time_left')}}:</span> {{time_left}}</p>
      </div>
      <div class="useTime">
        <div>
          <span class="bold">{{$t('myvirtual.renew_time')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="useTime" @change="inputNum" :min="1"></el-input-number>
           {{$t('hour')}}
        </div>
        <div>{{$t('virtual.Hours_Rent')}}: 
          <span class="color">{{chooseMac.singleCardHour}} DBC</span>
        </div>
      </div>
      <div class="fs12">{{$t('signleVir.tip1')}}</div>
      <div>
        <p><span class="bold">{{$t('myvirtual.balance')}}:</span> {{balance}}</p>
        <!-- <p><span class="bold">{{$t('virtual.total')}}:</span> {{totalMoney}} $</p> -->
        <p><span class="bold">{{$t('virtual.equivalent')}}:</span> {{totalDBC}}</p>
      </div>
      <div v-show="startConfirm">
        <p style="color: #f56c6c;">{{$t('responseTip')}}</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="batch" size="mini" plain :loading='btnloading'  @click="confirmRenew">{{$t('virtual.confirm')}}</el-button>
        <el-button class="batch" size="mini" plain  @click="dialogFormVisible = false">{{$t('virtual.cancal')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog width='30%' :title="title" :visible.sync="dialogFormVisible4">
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.vir_mem')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="edit_vir_mem" :min="1" :max="max_vir_mem" :step="1"></el-input-number> G
        </div>
        <div>{{$t('myvirtual.max_set')}}: {{max_vir_mem}}G</div>
      </div>
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.vir_cpu_num')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="edit_vir_cpu_num" :min="2" :max="Number(max_cpu_num - max_cpu_num%2)" :step="2" step-strictly></el-input-number>
        </div>
        <div>{{$t('myvirtual.max_set')}}: {{max_cpu_num}}</div>
      </div>
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.vir_gpu_num')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="edit_vir_gpu_num" :min="1" :max="Number(max_gpu_num)"></el-input-number>
        </div>
        <div>{{$t('myvirtual.max_set')}}: {{max_gpu_num}}</div>
      </div>
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.vir_data')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="edit_vir_disk_size" :min="edit_min_disk_num" :max="Number(max_disk_num)"></el-input-number> G
        </div>
        <div>{{$t('myvirtual.max_set')}}: {{max_disk_num}}G</div>
      </div>
      <div class="useTime" v-show='edit_is_ubunto'>
        <div>
          <span class="width12 bold">{{$t('myvirtual.ssh_port')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="edit_port_range" :min="5600" :max="5899"></el-input-number>
        </div>
      </div>
      <div class="useTime" v-show='!edit_is_ubunto'>
        <div>
          <span class="width12 bold">{{$t('myvirtual.rdp_port')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="edit_rdp_port" :min="5600" :max="5899"></el-input-number>
        </div>
      </div>
      <div class="fs12">
        {{$t('myvirtual.tip8')}}
      </div>
      <!-- <div class="fs12">
        {{$t('myvirtual.tip8')}}
      </div> -->
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.vnc_port')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="edit_vnc_port" :min="5900" :max="5999"></el-input-number>
        </div>
      </div>
      <div class="fs12">
        {{$t('myvirtual.tip9')}}
      </div>
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.open_port_range')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="edit_port_min" :min="6000" :max="port_max-1"></el-input-number>
           -
          <el-input-number :precision="0" size="mini" v-model="edit_port_max" :min="port_min+1" :max="60000"></el-input-number>
        </div>
      </div>
      <div class="fs12">
        {{$t('myvirtual.tip7')}}
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="batch" size="mini" plain :loading='btnloading6' @click="editVirtual">{{$t('myvirtual.Confirm_edit')}}</el-button>
        <el-button class="batch" size="mini" plain @click="dialogFormVisible4 = false;btnloading6 = false">{{$t('virtual.cancal')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog width='30%' :title="$t('signleVir.RentAgain')" :visible.sync="dialogFormVisible1">
      <div class="useTime">
        <div>
          <span class="bold">{{$t('myvirtual.renew_time')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="useTime" @change="inputNum" :min="1"></el-input-number>
           {{$t('hour')}}
        </div>
        <div>{{$t('virtual.Hours_Rent')}}: 
          <span class="color">{{chooseMac.singleCardHour}} DBC</span>
        </div>
      </div>
      <div class="fs12">{{$t('signleVir.tip1')}}</div>
      <div>
        <p><span class="bold">{{$t('myvirtual.balance')}}:</span> {{balance}}</p>
        <!-- <p><span class="bold">{{$t('virtual.total')}}:</span> {{totalMoney}} $</p> -->
        <p><span class="bold">{{$t('virtual.equivalent')}}:</span> {{totalDBC}}</p>
      </div>
      <div v-show="startConfirm">
        <p style="color: #f56c6c;">{{$t('responseTip')}}</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="batch" size="mini" plain :loading='btnloading1'  @click="ComRentAgain">{{$t('virtual.confirm')}}</el-button>
        <el-button class="batch" size="mini" plain  @click="dialogFormVisible1 = false">{{$t('virtual.cancal')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BigNumber from "bignumber.js";
import {
  getSignleVirtual,
  renewRentSignle,
  restartSignleVir,
  RentgetMachineInfo,
  timedQuerySignleTask,
  changeSignleVirStatus,
  getPercentage,
  stopSignleVir,
  startSignleVir,
  editVir,
  VirconfirmRent,
  createSignleWallet,
  rentagain
} from "@/api";
import { mapState, mapMutations } from "vuex";
import { getUsdToRmb } from "@/utlis";
import { getAccount, getBalance } from "@/utlis";
import { getCurrentPair } from "@/utlis/dot";
import { transfer, standardGPUPointPrice, dbcPriceOcw } from '@/utlis/dot/api';
export default {
  name: "mySignleGpuVirtual",
  data() {
    return {
      si: undefined,
      account: (getAccount() && getAccount().address) || (getCurrentPair() && getCurrentPair().address),
      // 余额
      unsubBalance: null,
      balance: 0,
      // 新增
      firstLoading: true,
      timer: [],
      dbc_price: 0,
      currentPage: 0,
      pageSize: 20,
      currentPage1: 0,
      pageSize1: 20,
      total1: 0,
      total: 0,
      orderNumber: 0,
      Machine_info: [],
      // 续费
      dialogFormVisible: false,
      useTime: 1,
      chooseMac: {},
      totalMoney: 0,
      totalDBC: 0,
      time_left: '0h0m',
      btnloading: false,
      btnloading6: false,
      // 创建、修改 虚拟机
      edit_chooseMac: {},
      edit_is_ubunto: true,
      title:'',
      dialogFormVisible4: false,
      option: [],
      optiondefault: [],
      image_name: '',
      // multicast:'224.0.0.0',
      operation_system: '',
      bios_mode: '',
      vir_mem: 0.1,
      edit_vir_mem: 0,
      vir_cpu_num: 4,
      edit_vir_cpu_num: 0,
      vir_gpu_num: 1,
      edit_vir_gpu_num: 0,
      vir_disk_size: 1,
      edit_vir_disk_size: 0,
      max_vir_mem: 0,
      max_cpu_num: 0,
      max_gpu_num: 0,
      max_disk_num: 0,
      edit_min_disk_num: 0,
      port_range: 5600,
      edit_port_range: '',
      rdp_port: 5601,
      edit_rdp_port: '',
      port_min: 6000,
      edit_port_min: 0,
      port_max: 60000,
      edit_port_max: 0,
      vnc_port: 5900,
      edit_vnc_port: 0,
      Vir_info: [],
      
      // 订单详情
      dialogFormVisible3: false,
      GPUPointPrice: 0.028229,
      DBCPercentage: 0,
      startConfirm: false,
      is_ubunto: false,
      hasPort: [],

      dialogFormVisible1: false,
      btnloading1: false,
    };
  },
  filters: {
    getDiskData(data) {
      let disk_data = 0
      data.map(diskitem => {
        if (diskitem.name != 'vda') {
          disk_data += parseInt(diskitem.size)
        }
      })
      return disk_data+'G';
    }
  },
  watch: {
    "$i18n.locale"() {
      
    },
  },
  mounted() {
    getPercentage().then(res => {
      if (res.success) {
        this.DBCPercentage = res.content.percentage_signle/100
      }
    })
    clearInterval(this.si);
    this.stopInter()
    this.stopAnyInter()
    this.getMyVirtual();
    this.si = setInterval( ()=> {
      this.getMyVirtual()
    }, 60000)
  },
  beforeDestroy() {
    if (this.si) {
      clearInterval(this.si);
      this.si = null
    }
    this.stopInter()
    this.stopAnyInter()
  },
  computed: {
    ...mapState(["passward"]),
  },
  methods: {
    ...mapMutations(['setPassWard']),
    // 新增 
    byteToStr(arr) {
      if (typeof arr === "string") {
        return arr;
      }
      var str = "", _arr = arr;
      for (var i = 0; i < _arr.length; i++) {
        var one = _arr[i].toString(2),
          v = one.match(/^1+?(?=0)/);
        if (v && one.length == 8) {
          var bytesLength = v[0].length;
          var store = _arr[i].toString(2).slice(7 - bytesLength);
          for (var st = 1; st < bytesLength; st++) {
            store += _arr[st + i].toString(2).slice(2);
          }
          str += String.fromCharCode(parseInt(store, 2));
          i += bytesLength - 1;
        } else {
          str += String.fromCharCode(_arr[i]);
        }
      }
      return str;
    },
    getnum2(num) {
      let num1 = String(num)
      let hasPoint;
      num1.indexOf(".") >= 0? hasPoint = true: hasPoint = false
      return hasPoint ? num1.substring(0,num1.indexOf(".")+3) : num1;
    },
    getnum1(num) {
      const num1 = new BigNumber(Number(num)/ Math.pow(10,15)).toFormat()
      let hasPoint;
      num1.indexOf(".") >= 0? hasPoint = true: hasPoint = false
      return num1.substring(0,num1.indexOf(".")+5);
    },
    getMyVirtual() {
      this.stopInter()
      let loadingInstance;
      if(this.firstLoading){
        loadingInstance = this.$loading({target:'#gpuVirtualInfo'});
      }
      getSignleVirtual({ account: this.account }).then( async res => {
        if (res.success) {
          for (let i = 0; i < res.content.length; i++) {
            let el = res.content[i]
            if(this.firstLoading){
              el.btnloading1 = false
              el.btnloading2 = false
              el.btnloading3 = false
              el.btnloading4 = false
              el.btnloading5 = false
            }
            let nowTime = + new Date();
            let endTime = el.createTime + el.time*60*60*1000
            if(endTime - nowTime > 0 ){
              el.time_left = this.minsToHourMins(Math.ceil((endTime - nowTime)/60000))
              el.userTime = this.minsToHourMins(Math.ceil((nowTime - el.createTime)/60000))
            }else{
              el.time_left = '0h0m'
              el.userTime = this.minsToHourMins(Math.ceil((endTime - el.createTime)/60000))
              if (endTime + (24*60*60*1000*2) - nowTime > 0 ) {
                res.content[i].hasdelectVm = false
                res.content[i].vmdelectTime = this.minsToHourMins(Math.ceil(((endTime + (24*60*60*1000*2)) - nowTime)/60000))
              } else {
                res.content[i].hasdelectVm = true
              }
            }
            let DBCprice1 = await dbcPriceOcw()
            this.dbc_price = DBCprice1/1000000
            const GPUPrice = await standardGPUPointPrice()
            this.GPUPointPrice = GPUPrice ? GPUPrice.gpu_price/1000000 : this.GPUPointPrice
            el.singleCardHour = this.getnum2((Number(el.calc_point)/100*this.GPUPointPrice * (1 + this.DBCPercentage)/this.dbc_price)/el.gpu_num/24)
            if (el.status == 'creating' || el.orderStatus == 2 ) {
              let timeData = {
                virOrderId: el._id,
                machine_id: el.machine_id,
                task_id: el.task_id,
                account: this.account
              }
              let timedQuery = await timedQuerySignleTask(timeData)
              if (timedQuery.success) {
                if (timedQuery.content.status != 'creating') {
                  if (timedQuery.content.status == 'running' && !el.confirmRent) {
                    this.confirmRent({_id: el._id})
                  } else {
                    let changeData = {
                      virOrderId: el._id,
                      status: timedQuery.content.status == 'running' ? 2 : 5,
                    }
                    changeSignleVirStatus(changeData).then( res => {
                      this.getMyVirtual()
                    })
                  }
                } else {
                  let timetask = null
                  timetask = setInterval( async () => {
                    let timedQuery1 = await timedQuerySignleTask(timeData)
                    if (timedQuery1.success) {
                      el.singleCardHour = this.getnum2((Number(el.calc_point)/100*this.GPUPointPrice * (1 + this.DBCPercentage)/this.dbc_price)/el.gpu_num/24)
                      timedQuery1.content.singleCardHour = el.singleCardHour
                      this.$set(res.content, i, timedQuery1.content)
                    }
                    if (timedQuery1.content.status != 'creating') {
                      clearInterval(timetask)
                      timetask = null
                      if (timedQuery1.content.status == 'running' && !el.confirmRent) {
                        this.confirmRent({_id: el._id})
                      } else {
                        let changeData = {
                          virOrderId: el._id,
                          status: timedQuery1.content.status == 'running' ? 2 : 5,
                        }
                        changeSignleVirStatus(changeData).then( res => {
                          this.getMyVirtual()
                        })
                      }
                    }
                  }, 30000)
                }
                el.singleCardHour = this.getnum2((Number(el.calc_point)/100*this.GPUPointPrice * (1 + this.DBCPercentage)/this.dbc_price)/el.gpu_num/24)
                timedQuery.content.singleCardHour = el.singleCardHour
                this.$set(res.content, i, timedQuery.content)
              }
            }
            
            if (el.orderStatus == 6 && el.status == 'closed') {
              this.RestartVir(el)
            }
            if (el.orderStatus == 6 && el.confirmRent) {
              let changeData = {
                virOrderId: el._id,
                status: el.status == 'running' ? 2 : 5,
              }
              changeSignleVirStatus(changeData).then( res => {
                this.getMyVirtual()
              })
            }
          }
          this.orderNumber = res.content.length
          this.Machine_info = res.content
          if(this.firstLoading){
            this.firstLoading = false
            loadingInstance.close();
          }
        } else {
          if(this.firstLoading){
            loadingInstance.close();
            this.$message.error(this.$t('myvirtual.err_msg1'))
          }
          this.firstLoading = false
          if (this.si) {
            clearInterval(this.si);
          }
        }
      })
    },
    handleChangepageSize(num) {
      this.pageSize = num
    },
    handleCurrentChang(num) {
      this.currentPage = num
    },
    // 确认租用
    async confirmRent(data) {
      let timedQuery = await VirconfirmRent({virOrderId: data._id})
      if (timedQuery.success) {
        let changeData = {
          virOrderId: data._id,
          status: 2,
        }
        changeSignleVirStatus(changeData).then( res => {
          this.getMyVirtual()
        })
      } else {
        let time = null
        time = setInterval( async () => {
          let timedQuery1 = await VirconfirmRent({virOrderId: data._id})
          if (timedQuery1.success) {
            clearInterval(time)
            time = null
            let changeData = {
              virOrderId: data._id,
              status: 2,
            }
            changeSignleVirStatus(changeData).then( res => {
              this.getMyVirtual()
            })
          }
        }, 30000)
      }
    },

    // 续费
    async Renew(el) {
      el.btnloading2 = true
      let { balance } = await getBalance()
      this.balance = balance.toFixed(2)
      this.chooseMac = el
      this.useTime = 1
      this.time_left = this.chooseMac.time_left
      this.totalDBC = this.chooseMac.singleCardHour ? this.getnum2(Number(this.chooseMac.singleCardHour) * this.useTime * this.chooseMac.gpu_count) : 0
      el.btnloading2 = false
      this.dialogFormVisible = true
    },
    
    inputNum(val){
      this.totalDBC = this.chooseMac.singleCardHour ? this.getnum2(Number(this.chooseMac.singleCardHour) * val * this.chooseMac.gpu_count) : 0
    },
    confirmRenew(){
      this.btnloading = true;
      this.startConfirm = true;
      createSignleWallet({id: this.chooseMac.machine_id+this.account}).then(res => {
        if (!res.success) {
          this.$message.error(this.$t('signleVir.tip3'))
        } else {
          const walletInfo = res.content
          this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
            confirmButtonText: this.$t('confirm'),
            // cancelButtonText:  this.$t('cancel'),
            inputType:'password',
            inputValue: this.passward
          })
          .then( ({ value }) => {
            this.setPassWard(value)
            console.log('transfer-Start');
            transfer(walletInfo.wallet, `${this.totalDBC}`, value, (res2) => {
              console.log(res2, 'transfer');
              if (res2.success) {
                let permas = {
                  virOrderId: this.chooseMac._id,
                  machine_id: this.chooseMac.machine_id,
                  add_hour: this.useTime,
                  dbc: this.totalDBC,
                  account: this.account,
                  rent_order: this.chooseMac.OrderId
                }
                renewRentSignle(permas).then(res3 => {
                  if (res3.success) {
                    this.getMyVirtual();
                    this.$message({
                      showClose: true,
                      message: this.$t('myvirtual.renew_success'),
                      type: "success",
                    });
                    this.btnloading = false;
                    this.startConfirm = false;
                    this.dialogFormVisible = false
                  } else {
                    let msg;
                    if (res3.code == -3) {
                      msg = this.$t('signleVir.tip7')
                    } else {
                      msg = this.$t('signleVir.tip8')
                    }
                    this.$message({
                      showClose: true,
                      message: msg,
                      type: "error",
                    });
                    this.btnloading = false;
                    this.startConfirm = false;
                    this.dialogFormVisible = false
                  }
                })
              } else {
                this.btnloading = false;
                this.startConfirm = false;
                this.$message({
                  showClose: true,
                  message: res2.msg,
                  type: "error",
                });
              }
            })
          }).catch(() => {
            this.btnloading = false;
            this.startConfirm = false;
          });
        }
      })
    },
    changeOp(val){
      this.image_name = ''
      if (val == 'linux') {
        this.bios_mode = 'legacy'
        this.is_ubunto = false
        this.port_range = this.hasPort.length*10 + 5600
        this.optiondefault = this.option.filter(el => {
          if (el.image_name.indexOf('ubuntu') != -1 || el.image_name.indexOf('win') == -1){
            return el
          }
        })
      } else {
        this.bios_mode = 'uefi'
        this.is_ubunto = true
        this.rdp_port = this.hasPort.length*10 + 5600
        this.optiondefault = this.option.filter(el => {
          if (el.image_name.indexOf('win') != -1 || el.image_name.indexOf('ubuntu') == -1) return el
        })
      }
    },

    async RentAgain(el) {
      if (el.CanUseGpu >= el.gpu_count) {
        el.btnloading5 = true
        let { balance } = await getBalance()
        this.balance = balance.toFixed(2)
        this.chooseMac = el
        this.useTime = 1
        this.time_left = this.chooseMac.time_left
        this.totalDBC = this.chooseMac.singleCardHour ? this.getnum2(Number(this.chooseMac.singleCardHour) * this.useTime * this.chooseMac.gpu_count) : 0
        el.btnloading5 = false
        this.dialogFormVisible1 = true
      } else {
        this.$message({
          showClose: true,
          message: this.$t('signleVir.tip9'),
          type: "error",
        });
      }
    },
    ComRentAgain() {
      if ( Number(this.balance) < 0.5 || Number(this.balance) < Number(this.totalDBC)) {
        this.$message.error(this.$t('signleVir.tip2'))
        return false
      }
      createSignleWallet({id: this.chooseMac.machine_id+this.account}).then(res => {
        if (!res.success) {
          this.$message.error(this.$t('signleVir.tip3'))
        } else {
          this.btnloading1 = true;
          this.startConfirm = true;
          const walletInfo = res.content
          this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
            confirmButtonText: this.$t('confirm'),
            // cancelButtonText:  this.$t('cancel'),
            inputType:'password',
            inputValue: this.passward
          })
          .then( ({ value }) => {
            this.setPassWard(value)
            console.log('transfer-Start');
            transfer(walletInfo.wallet, `${this.totalDBC}`, value, (res2) => {
              console.log(res2, 'transfer');
              if (res2.success) {
                const perams = {
                  virOrderId: this.chooseMac._id,
                  machine_id: this.chooseMac.machine_id,
                  add_hour: this.useTime,
                  dbc: this.totalDBC,
                  account: this.account,
                  gpu_count: this.chooseMac.gpu_count
                }
                rentagain(perams).then(res3 => {
                  if (res3.success) {
                    this.getMyVirtual()
                    this.RestartVir(this.chooseMac)
                    this.dialogFormVisible1 = false
                  } else {
                    let msg = ''
                    if (res.code == -2) {
                      msg = this.$t('signleVir.tip5')
                    } else {
                      msg = this.$t('signleVir.tip4') 
                    }
                    this.$message({
                      showClose: true,
                      message: msg,
                      type: "error",
                    });
                  }
                  this.btnloading1 = false;
                  this.startConfirm = false;
                }).catch(() => {
                  this.btnloading1 = false;
                  this.startConfirm = false;
                })
              } else {
                this.btnloading1 = false;
                this.startConfirm = false;
                this.$message({
                  showClose: true,
                  message: res2.msg,
                  type: "error",
                });
              }
            })
          }).catch(() => {
            this.btnloading1 = false;
            this.startConfirm = false;
          });
          // this.createSignleVir(perams, res.content)
        }
      }).catch(() => {
        this.$message.error(this.$t('signleVir.tip3'))
      });
    },
    // 租用以后重启机器并修改机器状态
    RestartVir(el) {
      let requestdata = {
        virOrderId: el._id,
        task_id: el.task_id,
        machine_id: el.machine_id,
        account: this.account
      }
      startSignleVir(requestdata).then( async (res) => {
        if (!res.success) {
          // this.$message({
          //   type: 'error',
          //   message: res.msg
          // });
        } else {
          let timeData = {
            virOrderId: el._id,
            machine_id: el.machine_id,
            task_id: el.task_id,
            account: this.account
          }
          let timedQuery = await timedQuerySignleTask(timeData)
          if (timedQuery.success) {
            if (timedQuery.content.status != 'starting') {
              if (timedQuery.content.status == 'running' && !el.confirmRent) {
                this.confirmRent({_id: el._id})
              } else {
                let changeData = {
                  virOrderId: el._id,
                  status: timedQuery.content.status == 'running' ? 2 : 5,
                }
                changeSignleVirStatus(changeData).then( res => {
                  this.getMyVirtual()
                })
              }
            } else {
              let timetask = null
              timetask = setInterval( async () => {
                let timedQuery1 = await timedQuerySignleTask(timeData)
                if (timedQuery1.content.status != 'starting') {
                  clearInterval(timetask)
                  timetask = null
                  if (timedQuery1.content.status == 'running' && !el.confirmRent) {
                    this.confirmRent({_id: el._id})
                  } else {
                    let changeData = {
                      virOrderId: el._id,
                      status: timedQuery1.content.status == 'running' ? 2 : 5,
                    }
                    changeSignleVirStatus(changeData).then( res => {
                      this.getMyVirtual()
                    })
                  }
                }
              }, 30000)
            }
          } else {
            let timetask1 = null
            timetask1 = setInterval( async () => {
              let timedQuery1 = await timedQuerySignleTask(timeData)
              if (timedQuery1.content.status != 'starting') {
                clearInterval(timetask1)
                timetask1 = null
                if (timedQuery1.content.status == 'running' && !el.confirmRent) {
                  this.confirmRent({_id: el._id})
                } else {
                  let changeData = {
                    virOrderId: el._id,
                    status: timedQuery1.content.status == 'running' ? 2 : 5,
                  }
                  changeSignleVirStatus(changeData).then( res => {
                    this.getMyVirtual()
                  })
                }
              }
            }, 30000)
          }
        }
      })
    },

    // 修改 虚拟机
    operateVirtual1(el, item) {
      this.edit_chooseMac = {}
      if (item.status == 'closed') {
        RentgetMachineInfo({machine_id: el.machine_id, id: el._id}).then(res => {
          if (res.success) {
            let info = res.content.info
            this.max_vir_mem = parseInt(info.mem.free)
            this.max_cpu_num = Math.floor(info.cpu.cores)
            this.max_gpu_num = Math.floor(info.gpu.gpu_count - info.gpu.gpu_used)
            let disk_data_free = parseInt(info.disk_data.free)- 350
            this.max_disk_num = disk_data_free > 0 ? Math.floor(disk_data_free * 0.75) : 0
            this.dialogFormVisible4 = true
            this.hasPort = res.content.taskInfo
          } else {
            this.$message.error(res.msg)
          }
        })
        if (item.os == 'linux') {
          this.edit_rdp_port = ''
          this.edit_port_range = item.ssh_port
          this.edit_is_ubunto = true
        } else {
          this.edit_port_range = ''
          this.edit_rdp_port = item.rdp_port
          this.edit_is_ubunto = false
        }
        this.edit_vir_disk_size = 0
        this.edit_min_disk_num = 0
        item.disks.map(diskitem => {
          if (diskitem.name != 'vda') {
            this.edit_min_disk_num += parseInt(diskitem.size)
            this.edit_vir_disk_size += parseInt(diskitem.size)
          }
        })
        this.edit_port_max = item.port_max
        this.edit_port_min = item.port_min
        this.edit_vir_cpu_num = item.cpu_cores
        this.edit_vir_gpu_num = item.gpu_count
        this.edit_vir_mem = parseInt(item.mem_size)
        this.edit_vnc_port = item.vnc_port
        this.title = this.$t('myvirtual.change')
        this.edit_chooseMac = item
        this.edit_chooseMac.machine_id = el.machine_id
      } else {
        this.$message.error(this.$t('myvirtual.tip16'))
      }
    },
    Selectimage(val) {
      
    },
    editVirtual() {
      // console.log('编辑'); editVir
      for(let i= 0; i< this.hasPort.length; i ++) {
        let el = this.hasPort[i]
        if (el.status != "closed") {
          if (el.ssh_port !='' && this.edit_port_range == el.ssh_port) {
            this.$message.error(this.$t('myvirtual.newTip2'))
            return false
          }
          if (el.rdp_port !='' && this.edit_rdp_port == el.rdp_port) {
            this.$message.error(this.$t('myvirtual.newTip3'))
            return false
          }
          if (this.edit_vnc_port == el.vnc_port) {
            this.$message.error(this.$t('myvirtual.newTip4'))
            return false
          }
          if (!(this.edit_port_min > el.port_max || this.edit_port_max < el.port_min)) {
            this.$message.error(this.$t('myvirtual.newTip5'))
            return false
          }
        }
      }
      try {
        this.btnloading6 = true
        let perams = {
          id: this.edit_chooseMac.belong,
          task_id: this.edit_chooseMac.task_id,
          machine_id: this.edit_chooseMac.machine_id,
          new_ssh_port: this.edit_is_ubunto ? this.edit_port_range : '',
          new_vnc_port: this.edit_vnc_port,
          new_rdp_port: !this.edit_is_ubunto ? this.edit_rdp_port : '',
          port_min: this.edit_port_min,
          port_max: this.edit_port_max,
          new_gpu_count: this.edit_vir_gpu_num,
          new_cpu_cores: this.edit_vir_cpu_num,
          new_mem_size: this.edit_vir_mem
        }
        if (parseInt(this.edit_vir_disk_size - this.edit_min_disk_num) > 0) {
          perams.increase_disk_size = parseInt(this.edit_vir_disk_size - this.edit_min_disk_num)
        }
        editVir(perams).then( res=> {
          if(res.success){
            this.$message.success(this.$t('myvirtual.edit_success'))
          }else{
            // this.$message.error(this.$t('myvirtual.edit_fails'))
            this.$message.error(res.msg)
          }
          this.btnloading6 = false
          this.dialogFormVisible4 = false
        })
      } catch (err) {
        this.$message({
          showClose: true,
          message: err.message,
          type: "error",
        });
      }
    },
    // 重启虚拟机
    reboot(item) {
      item.btnloading3 = true
      let requestdata = {
        virOrderId: item._id,
        task_id: item.task_id,
        machine_id: item.machine_id,
        account: this.account
      }
      restartSignleVir(requestdata).then( async (res) => {
        if(!res.success){
          this.$message({
            type: 'error',
            message: res.msg
          });
        }else{
          let timeData = {
            virOrderId: item._id,
            machine_id: item.machine_id,
            task_id: item.task_id,
            account: this.account
          }
          let chooseIndex1;
          this.Machine_info.forEach((ele, index) => {
            if (ele.task_id == item.task_id) {
              chooseIndex1 = index
            }
          })
          let timedQuery = await timedQuerySignleTask(timeData)
          if (timedQuery.success) {
            let nowTime = + new Date();
            let endTime = item.createTime + item.time*60*60*1000
            if(endTime - nowTime > 0 ){
              timedQuery.content.time_left = this.minsToHourMins(Math.ceil((endTime - nowTime)/60000))
              timedQuery.content.userTime = this.minsToHourMins(Math.ceil((nowTime - item.createTime)/60000))
            }else{
              timedQuery.content.time_left = '0h0m'
              timedQuery.content.userTime = this.minsToHourMins(Math.ceil((endTime - item.createTime)/60000))
            }
            timedQuery.content.singleCardHour = this.getnum2((Number(item.calc_point)/100*this.GPUPointPrice * (1 + this.DBCPercentage)/this.dbc_price)/item.gpu_num/24)
            this.$set(this.Machine_info, chooseIndex1, timedQuery.content)
          }
          let timetask = null
          timetask = setInterval( async () => {
            let timedQuery1 = await timedQuerySignleTask(timeData)
            if (timedQuery1.success) {
              let nowTime = + new Date();
              let endTime = item.createTime + item.time*60*60*1000
              if(endTime - nowTime > 0 ){
                timedQuery1.content.time_left = this.minsToHourMins(Math.ceil((endTime - nowTime)/60000))
                timedQuery1.content.userTime = this.minsToHourMins(Math.ceil((nowTime - item.createTime)/60000))
              }else{
                timedQuery1.content.time_left = '0h0m'
                timedQuery1.content.userTime = this.minsToHourMins(Math.ceil((endTime - item.createTime)/60000))
              }
              timedQuery1.content.singleCardHour = this.getnum2((Number(item.calc_point)/100*this.GPUPointPrice * (1 + this.DBCPercentage)/this.dbc_price)/item.gpu_num/24)
              this.$set(this.Machine_info, chooseIndex1, timedQuery1.content)
            }
            if (timedQuery1.content.status == 'running' || timedQuery1.content.status == 'error') {
              clearInterval(timetask)
              timetask = null
            }
          }, 10000)
          this.$message({
            type: 'success',
            message: this.$t('myvirtual.reboot_success')
          });
        }
        item.btnloading3 = false
      })
    },
    stopVir(item) {
      item.btnloading1 = true
      let requestdata = {
        virOrderId: item._id,
        task_id: item.task_id,
        machine_id: item.machine_id,
        account: this.account
      }
      stopSignleVir(requestdata).then( async (res) => {
        if(!res.success){
          this.$message({
            type: 'error',
            message: res.msg
          });
        }else{
          let timeData = {
            virOrderId: item._id,
            machine_id: item.machine_id,
            task_id: item.task_id,
            account: this.account
          }
          let chooseIndex1;
          this.Machine_info.map((ele, index) => {
            if (ele.task_id == item.task_id) {
              chooseIndex1 = index
            }
          })
          let timedQuery = await timedQuerySignleTask(timeData)
          if (timedQuery.success) {
            let nowTime = + new Date();
            let endTime = item.createTime + item.time*60*60*1000
            if(endTime - nowTime > 0 ){
              timedQuery.content.time_left = this.minsToHourMins(Math.ceil((endTime - nowTime)/60000))
              timedQuery.content.userTime = this.minsToHourMins(Math.ceil((nowTime - item.createTime)/60000))
            }else{
              timedQuery.content.time_left = '0h0m'
              timedQuery.content.userTime = this.minsToHourMins(Math.ceil((endTime - item.createTime)/60000))
            }
            timedQuery.content.singleCardHour = this.getnum2((Number(item.calc_point)/100*this.GPUPointPrice * (1 + this.DBCPercentage)/this.dbc_price)/item.gpu_num/24)
            this.$set(this.Machine_info, chooseIndex1, timedQuery.content)
          }
          let timetask = null
          timetask = setInterval( async () => {
            let timedQuery1 = await timedQuerySignleTask(timeData)
            if (timedQuery1.success) {
              let nowTime = + new Date();
              let endTime = item.createTime + item.time*60*60*1000
              if(endTime - nowTime > 0 ){
                timedQuery1.content.time_left = this.minsToHourMins(Math.ceil((endTime - nowTime)/60000))
                timedQuery1.content.userTime = this.minsToHourMins(Math.ceil((nowTime - item.createTime)/60000))
              }else{
                timedQuery1.content.time_left = '0h0m'
                timedQuery1.content.userTime = this.minsToHourMins(Math.ceil((endTime - item.createTime)/60000))
              }
              timedQuery1.content.singleCardHour = this.getnum2((Number(item.calc_point)/100*this.GPUPointPrice * (1 + this.DBCPercentage)/this.dbc_price)/item.gpu_num/24)
              this.$set(this.Machine_info, chooseIndex1, timedQuery1.content)
            }
            if (timedQuery1.content.status == 'closed' || timedQuery1.content.status == 'error') {
              clearInterval(timetask)
              timetask = null
            }
          }, 10000)
        }
        item.btnloading1 = false
      })
    },
    startVir(item) {
      item.btnloading2 = true
      let requestdata = {
        virOrderId: item._id,
        task_id: item.task_id,
        machine_id: item.machine_id,
        account: this.account
      }
      startSignleVir(requestdata).then( async (res) => {
        if(!res.success){
          this.$message({
            type: 'error',
            message: res.msg
          });
        }else{
          let timeData = {
            virOrderId: item._id,
            machine_id: item.machine_id,
            task_id: item.task_id,
            account: this.account
          }
          let chooseIndex1;
          this.Machine_info.forEach((ele, index) => {
            if (ele.task_id == item.task_id) {
              chooseIndex1 = index
            }
          })
          let timedQuery = await timedQuerySignleTask(timeData)
          if (timedQuery.success) {
            let nowTime = + new Date();
            let endTime = item.createTime + item.time*60*60*1000
            if(endTime - nowTime > 0 ){
              timedQuery.content.time_left = this.minsToHourMins(Math.ceil((endTime - nowTime)/60000))
              timedQuery.content.userTime = this.minsToHourMins(Math.ceil((nowTime - item.createTime)/60000))
            }else{
              timedQuery.content.time_left = '0h0m'
              timedQuery.content.userTime = this.minsToHourMins(Math.ceil((endTime - item.createTime)/60000))
            }
            timedQuery.content.singleCardHour = this.getnum2((Number(item.calc_point)/100*this.GPUPointPrice * (1 + this.DBCPercentage)/this.dbc_price)/item.gpu_num/24)
            this.$set(this.Machine_info, chooseIndex1, timedQuery.content)
          }
          let timetask = null
          timetask = setInterval( async () => {
            let timedQuery1 = await timedQuerySignleTask(timeData)
            if (timedQuery1.success) {
              let nowTime = + new Date();
              let endTime = item.createTime + item.time*60*60*1000
              if(endTime - nowTime > 0 ){
                timedQuery1.content.time_left = this.minsToHourMins(Math.ceil((endTime - nowTime)/60000))
                timedQuery1.content.userTime = this.minsToHourMins(Math.ceil((nowTime - item.createTime)/60000))
              }else{
                timedQuery1.content.time_left = '0h0m'
                timedQuery1.content.userTime = this.minsToHourMins(Math.ceil((endTime - item.createTime)/60000))
              }
              timedQuery1.content.singleCardHour = this.getnum2((Number(item.calc_point)/100*this.GPUPointPrice * (1 + this.DBCPercentage)/this.dbc_price)/item.gpu_num/24)
              this.$set(this.Machine_info, chooseIndex1, timedQuery1.content)
            }
            if (timedQuery1.content.status == 'running' || timedQuery1.content.status.indexOf('error') !== -1) {
              clearInterval(timetask)
              timetask = null
            }
          }, 10000)
        }
        item.btnloading2 = false
      })
    },
    // 重置密码
    reset(){
      this.dialogFormVisible2 = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.dialogFormVisible2 = false
      this.$refs[formName].resetFields();
    },

    CopyTx(text) {
      this.$copyText(String(text)).then(() => {
        this.$message.success(this.$t('copySuccess'))
      })
    },

    minsToHourMins(mins){
      if (mins < 60) {
        return mins + 'm'
      } else {
        const h = Math.floor(mins / 60)
        const m = mins % 60
        return `${h}h${m}m`
      }
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
    },
    stopAnyInter() {
      let id = setInterval(()=> {console.log('stopAnyInter')}, 0)
      while (id > 0) {
        clearInterval(id)
        id --
      }
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

.bold{
  font-weight: bold;
}

.table{
  width: 100%;
  margin: 0 0 20px;
  .checkAll{
    width: 100%;
    padding: 10px;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    .batch{
      margin-left: 20px;
    }
  }
  .tableli{
    width: 100%;
    padding: 10px 0;
    font-size: 14px;
    box-sizing: border-box;
    border: 1px solid #999;
    margin-bottom: 15px;
    .li_list1{
      padding: 0 10px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 10px;
      &:first-child{
        justify-content: space-between;
      }
      span{
        word-break: break-all;
        display: inline-block;
        &.Machine_id {
          padding: 10px 5px;
          box-sizing: border-box;
          border: 1px solid #999;
        }
        &.time_left {
          margin-left: 20px;
        }
        i{
          font-style: normal;
          color: #195d91;
        }
      }
      .countTime{
        span{
          margin: 0;
        }
      }
    }
    .pay-wrap{
      padding: 10px 20px;
      border-top: 1px solid #e1e6ec;
      font-size: 14px;
      line-height: 28px;
      color: #666;
      background-color: #f6f9fc;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      div{
        width: 33%;
        font-size: 14px;
      }
      div.width100{
        width: 100%;
        font-size: 12px;
      }
    }
    .li_list2{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 12px 10px 0;
      justify-content: space-between;
      border-top: 1px solid #e1e6ec;
      border-bottom: 1px solid #e1e6ec;
      span{
        width: 20%;
        margin-bottom: 12px;
        word-break: break-all;
        &.width70{
          width: 70%;
        }
        &.width50{
          width: 60%;
        }
        &.width25{
          width: 25%;
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
        &.operators{
          display: flex;
          align-items: center;
          .opera{
            flex: 1;
            display: flex;
            margin: 0 0 0 5px;
            flex-direction: column;
          }
        }
      }
    }
    .virtual{
      padding: 10px 20px;
      border-bottom: 1px solid #e1e6ec;
      // .v-list{
      //   padding: 10px;
      //   margin-bottom: 10px;
      //   border: 1px solid #e1e6ec;
        // &:last-child{
        //   margin: 0;
        // }
        .li-top{
          display: flex;
          align-items: center;
          padding-bottom: 5px;
          justify-content: space-between;
          border-bottom: 1px solid #e1e6ec;
          .blod{
            font-weight: bold;
          }
        }
        .li-bottom{
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding-top: 10px;
          p{
            width: 25%;
            margin: 0 0 6px;
            // margin-bottom: 6px;
            word-break: break-all;
            &.width50{
              width: 60%;
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
            .copy {
              width: 16px;
              height: 16px;
              cursor: pointer;
              margin-left: 5px;
              vertical-align: sub;
              display: inline-block;
              background: url(../../assets/imgs/copy.png) no-repeat 100%/100%;
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
      // }
    }
    .tools-head{
      padding: 10px 10px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
.paging {
  .el-pagination {
    display: flex;
    justify-content: center;
  }
}

.useTime{
  width: 100%;
  display: flex;
  margin-bottom: 5px;
  align-items: center;
  justify-content: space-between;
  .el-input{
    margin: 0 10px;
    width: 80px;
  }
  span{
    &.width12{
      display: inline-block;
      width: 120px;
    }
    &.color{
      color: #f56c6c;
    }
  }
}
.ruleForm{
  .ruleForm_input{
    width: 300px;
  }
}

.order_list{
  width: 100%;
  padding: 10px;
  .order_li{
    display: flex;
    padding: 5px 10px;
    margin-bottom: 10px;
    align-items: center;
    border: 1px solid #999;
    justify-content: space-between;
    background-color: #f6f9fc;
    &:last-child{
      margin: 0;
    }
    .li-left{
      padding: 10px 20px;
      font-size: 14px;
      line-height: 28px;
      color: #666;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      div{
        width: 33%;
        font-size: 14px;
        span{
          font-weight: bold;
        }
      }
    }
  }
}


@media screen and (max-width: 1600px) {
  .table{
    .tableli{
      font-size: 12px;
      .li_list2{
        span{
          &.bold{
            font-size: 14px;
          }
        }
      }
    }
  }
}

</style>
