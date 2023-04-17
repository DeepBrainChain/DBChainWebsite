<template>
  <div class="signleVirtual" ref="virtualBox">
    <div class="box">
      <el-container>
        <el-aside class="left-wrap">
          <div class="navi">
            <ul v-show="enterType == 'gpu'" class="btn-list">
              <li v-for="(item,idx) in tableData" :key="idx">
                <el-button
                  class="lg naviBtn"
                  :class="{active: active === item}"
                  v-on:click="choose(item)"
                >
                  <span>{{item}}</span>
                </el-button>
              </li>
            </ul>
            <ul v-show="enterType == 'city'" class="btn-list">
              <li v-for="(item,idx) in cityData" :key="idx">
                <el-button
                  class="lg naviBtn"
                  :class="{active: active === item.desc}"
                  v-on:click="choosecity(item)"
                >
                  <span>{{item.desc}}</span>
                </el-button>
              </li>
            </ul>
            <ul v-show="enterType == 'room'" class="btn-list">
              <li v-for="(item,idx) in roomData" :key="idx">
                <el-button
                  class="lg naviBtn"
                  :class="{active: active === item}"
                  v-on:click="chooseRoom(item)"
                >
                  <span :title="item">{{String(item).substring(0,15)+'...'}}</span>
                </el-button>
              </li>
            </ul>
          </div>
        </el-aside>
        <el-main class="right-wrap">
          <div class="right_con">
            <div class="topcon">
              <div class="topcon_left">
                <!-- <div class="topitem">
                  {{$t('virtual.Machine_status')}}: 
                  <el-select class='select' v-model="Machine_status" size='mini' @change='SelectStatus' placeholder="">
                    <el-option :label="$t('virtual.All')" value=""></el-option>
                    <el-option :label="$t('virtual.Rented')" value="rented"></el-option>
                    <el-option :label="$t('virtual.Idle')" value="online"></el-option>
                  </el-select>
                </div> -->
                <div class="topitem">
                  {{$t('virtual.GPU_Num')}}: 
                  <el-select class='select' v-model="GPU_Num" size='mini' @change='SelectNum' placeholder="">
                    <el-option :label="$t('virtual.All')" value=""></el-option>
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <!-- <div class="topitem">
                  {{$t('virtual.All_Machine')}}: {{All_Machine}}
                </div>
                <div class="topitem">
                  {{$t('virtual.Idle_Machine')}}: {{Idle_Machine}}
                </div> -->
              </div>
            </div>
            <div class="table">
              <div class="tableli" v-for="el in Machine_info" :key="el.machine_id">
                <div class="li_list1">
                  <div>
                    <span class="Machine_id">{{$t('virtual.Machine_ID')}}: {{el.machine_id}}</span>
                  </div>
                  <span v-if="el.server_room" :title="el.server_room">{{$t('virtual.Room_number')}}: {{String(el.server_room).substring(0,10)+'...'}}</span>
                  <span class="color">{{$t('virtual.Machine_onlineNum')}}: {{el.CanUseGpu}}</span>
                  <span>
                    <el-button class="batch" :disabled='el.CanUseGpu == 0' size="mini" plain @click="batch_Mac(el)">
                      {{ $t('virtual.batch_Mac') }}
                    </el-button>
                  </span>
                </div>
                <div class="li_list2">
                  <span class="bold">{{$t('virtual.GPU_Num')}}: {{el.gpu_num}}</span>
                  <span class="bold">{{$t('virtual.GPU_memory')}}: {{el.gpu_mem}}G</span>
                  <span class="width30 bold">{{$t('virtual.GPU_type')}}: {{el.gpuType}}</span>
                  <span class="width30 bold">{{$t('virtual.Hours_Rent')}}: 
                    <i class="color"> {{el.singleCardHour}} DBC </i>
                  </span>
                  <span>{{$t('virtual.Country')}}: {{el.country}}</span>
                  <span>{{$t('virtual.City')}}: {{el.city}}</span>
                  <span class="operators">{{$t('virtual.Network_operators')}}:
                    <span class="opera">
                      <i v-for="(operators,index) in el.telecom_operators" :key='index'>
                        {{operators}}
                      </i>
                    </span>
                  </span>
                  <span>{{$t('virtual.Online_time')}}: {{el.online}}</span>
                  <span>{{$t('virtual.Memory_num')}}: {{Math.ceil(Number(el.mem_num))}}G</span>
                  <span>{{$t('virtual.System_hd')}}: {{el.sys_disk}}G</span>
                  <span>{{$t('virtual.Data_hd')}}: {{Number(el.data_disk)/1000}}T</span>
                  <span>{{$t('virtual.Bandwidth1')}}: {{el.upload_net}}Mbps</span>
                  <span>{{$t('virtual.Bandwidth2')}}: {{el.download_net}}Mbps</span>
                  <span>{{$t('virtual.CPU_cores')}}: {{el.cpu_core_num}}</span>
                  <span>{{$t('virtual.CPU_frequency')}}: {{getnum2(Number(el.cpu_rate)/1000)}}Ghz</span>
                  <span class="width40">{{$t('virtual.CPU_type')}}: {{el.cpuType}}</span>
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
          </div>
        </el-main>
      </el-container>
    </div>
    <!-- 创建、修改 虚拟机 -->
    <el-dialog width='40%' :title="$t('myvirtual.Build')" :visible.sync="dialogFormVisible1">
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.operation')}}: </span>
          <el-select class='select' v-model="operation_system" size='mini' @change='changeOp' placeholder="choose">
            <el-option label='windows' value='windows'></el-option>
            <el-option label='linux' value='linux'></el-option>
          </el-select>
        </div>
      </div>
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.mirror_name')}}: </span>
          <el-select class='select' v-model="image_name" size='mini' placeholder="choose">
            <el-option
              v-for="(item, index) in optiondefault"
              :key="index"
              :label="item.image_name"
              :value="item.image_name">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.vir_gpu_num')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="vir_gpu_num" @change="inputGpuNum" :min="1" :max="Number(max_gpu_num)"></el-input-number>
        </div>
        <div>{{$t('myvirtual.max_set')}}: {{max_gpu_num}}</div>
      </div>
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('virtual.useTime')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="useTime" @change="inputNum" :min="1"></el-input-number>
           {{$t('hour')}}
        </div>
        <div>{{$t('virtual.Hours_Rent')}}: 
          <span class="color">{{chooseMac.singleCardHour}} DBC</span>
        </div>
      </div>
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.vir_mem')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="vir_mem" :min="1" :max="max_vir_mem*vir_gpu_num" :step="1"></el-input-number> G
        </div>
        <div>{{$t('myvirtual.max_set')}}: {{max_vir_mem*vir_gpu_num}}G</div>
      </div>
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.vir_cpu_num')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="vir_cpu_num" :min="2" :max="Number(max_cpu_num*vir_gpu_num - max_cpu_num*vir_gpu_num%2)" :step="2" step-strictly></el-input-number>
        </div>
        <div>{{$t('myvirtual.max_set')}}: {{max_cpu_num*vir_gpu_num}}</div>
      </div>
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.vir_data')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="vir_disk_size" :min="1" :max="Number(max_disk_num*vir_gpu_num)"></el-input-number> G
        </div>
        <div>{{$t('myvirtual.max_set')}}: {{max_disk_num*vir_gpu_num}}G</div>
      </div>
      <!-- <div class="useTime" v-show='!is_ubunto'>
        <div>
          <span class="width12 bold">{{$t('myvirtual.ssh_port')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="port_range" :min="5600" :max="5899"></el-input-number>
        </div>
      </div>
      <div class="useTime" v-show='is_ubunto'>
        <div>
          <span class="width12 bold">{{$t('myvirtual.rdp_port')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="rdp_port" :min="5600" :max="5899"></el-input-number>
        </div>
      </div>
      <div class="fs12">
        {{$t('myvirtual.tip8')}}
      </div>
      <div class="fs12">
        {{$t('myvirtual.tip8')}}
      </div>
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.vnc_port')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="vnc_port" :min="5900" :max="5999"></el-input-number>
        </div>
      </div>
      <div class="fs12">
        {{$t('myvirtual.tip9')}}
      </div>
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.open_port_range')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="port_min" :min="6000" :max="port_max-1"></el-input-number>
           -
          <el-input-number :precision="0" size="mini" v-model="port_max" :min="port_min+1" :max="60000"></el-input-number>
        </div>
      </div>
      <div class="fs12">
        {{$t('myvirtual.tip7')}}
      </div> -->
      <div class="useTime">
        <div><span class="bold">{{$t('myvirtual.balance')}}:</span> {{balance}}</div>
      </div>
      <div class="useTime">
        <span class="bold">{{$t("myvirtual.tip17")}}</span>
      </div>
      <!-- <div class="useTime">
        <div><span class="bold">{{$t('virtual.total')}}:</span> {{totalMoney}}$</div>
      </div> -->
      <div class="useTime">
        <div><span class="bold">{{$t('virtual.equivalent')}}:</span> {{totalDBC}}</div>
      </div>
      <p v-show="startConfirm" style="color: #f56c6c;">{{$t('responseTip')}}</p>
      <div slot="footer" class="dialog-footer">
        <el-button class="batch" size="mini" plain :loading='btnloading1' @click="Createvirtual">{{$t('myvirtual.Confirm_create')}}</el-button>
        <el-button class="batch" size="mini" plain @click="dialogFormVisible1 = false;btnloading1 = false">{{$t('virtual.cancal')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import BigNumber from "bignumber.js";
import { mapState, mapMutations } from "vuex";
import { transfer, getBlockTime, standardGPUPointPrice, dbcPriceOcw } from '@/utlis/dot/api';
import { getAccount, getBalance } from "@/utlis";
import { getCurrentPair } from "@/utlis/dot";
import { 
  getsignlegpuType,
  getsignlelistByGpu,
  getsignleCity,
  getsignlelistByCity,
  getsignleRoomnum,
  getsignlelistByRoom,
  getsignleMachineInfo,
  createSignleVirOrder,
  createSignleVir,
  changeSignleVirStatus,
  getPort,
  getPercentage,
  createSignleWallet
} from "@/api"
export default {
  name: "signleVirtual",
  data() {
    return {
      account: (getAccount() && getAccount().address) || (getCurrentPair() && getCurrentPair().address),
      active: '',
      Computing_Power: 0,
      dbc_price: 0,
      currentPage: 0,
      pageSize: 20,
      total: 0,
      btnloading: false,
      Gpu_Type:[
        {
          type: "GeForceGTX1660S",
          power: 42.08
        },
        {
          type: "GeForceRTX2070S",
          power: 0
        },
        {
          type: "GeForceRTX2080",
          power: 0
        },
        {
          type: "GeForceRTX2080S",
          power: 0
        },
        {
          type: "GeForceRTX3060",
          power: 65.67
        },
        {
          type: "GeForceRTX2080Ti",
          power: 68.25
        },
        {
          type: "GeForceRTX3060Ti",
          power: 68.79
        },
        {
          type: "GeForceRTX3070",
          power: 74.39
        },
        {
          type: "GeForceRTX3070Ti",
          power: 75.71
        },
        {
          type: "GeForceRTX3080",
          power: 89.96
        },
        {
          type: "GeForceRTX3080Ti",
          power: 99.01
        },
        {
          type: "NVIDIA A4000",
          power: 103.51
        },
        {
          type: "NVIDIA A5000",
          power: 103.51
        },
        {
          type: "GeForceRTX3090",
          power: 115.45
        },

        {
          type: "NVIDIA A100",
          power: 0
        },
        {
          type: "NVIDIA P100",
          power: 0
        },
        {
          type: "NVIDIA V100 16G",
          power: 0
        },
        {
          type: "NVIDIA V100 32G",
          power: 0
        },
        {
          type: "NVIDIA T4",
          power: 0
        },
        {
          type: "NVIDIA P40",
          power: 0
        },
        {
          type: "NVIDIA P4",
          power: 0
        },
        {
          type: "NVIDIA TITAN V",
          power: 0
        }
      ],
      options1:[
        {
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }, {
          value: '5',
          label: '5'
        }, {
          value: '6',
          label: '6'
        }, {
          value: '7',
          label: '7'
        }, {
          value: '8',
          label: '8'
        }, {
          value: '9',
          label: '9'
        }, {
          value: '10',
          label: '10'
        }
      ],
      tableData: [],
      cityData: [],
      roomData: [],
      tableDataDefulat: [
        {
          type: "GeForceGTX1660S",
          power: 42.08
        },
        {
          type: "GeForceRTX3060",
          power: 65.67
        },
        {
          type: "GeForceRTX2080Ti",
          power: 68.25
        },
        {
          type: "GeForceRTX3060Ti",
          power: 68.79
        },
        {
          type: "GeForceRTX3070",
          power: 74.39
        },
        {
          type: "GeForceRTX3070Ti",
          power: 75.71
        },
        {
          type: "GeForceRTX3080",
          power: 89.96
        },
        {
          type: "GeForceRTX3080Ti",
          power: 99.01
        },
        {
          type: "NVIDIA A4000",
          power: 103.51
        },
        {
          type: "NVIDIA A5000",
          power: 103.51
        },
        {
          type: "GeForceRTX3090",
          power: 115.45
        }
      ],
      Machine_info: [],
      All_Machine: 0,
      Idle_Machine: 0,
      GPU_Num: '',
      Machine_status: '',
      useTime: 1,
      totalCalc: 0,
      totalMoney: 0,
      totalDBC: 0,
      chooseMac: {},
      underlineStyle: {
        width: "65px",
        left: "92px",
      },
      GPUPointPrice: 0.028229,
      GPUPointPriceCongtu: 1,
      DBCPercentage: 0,
      refresh: null,
      max_vir_mem: 0,
      enterType: this.$route.query.type ? this.$route.query.type : 'gpu',
      chooseCity: '',
      chooseCountry: '',
      chooseRoomnum: '',
      // 创建GPU虚拟机
      balance: 0,
      operation_system: '',
      option: [],
      optiondefault: [],
      is_ubunto: false,
      bios_mode: '',
      image_name: '',
      vir_mem: 0.1,
      edit_vir_mem: 0,
      vir_cpu_num: 2,
      edit_vir_cpu_num: 0,
      vir_gpu_num: 1,
      edit_vir_gpu_num: 0,
      vir_disk_size: 1,
      edit_vir_disk_size: 0,
      max_vir_mem: 0,
      max_cpu_num: 0,
      max_gpu_num: 0,
      max_disk_num: 0,
      hasPort: {},
      port_range: 5600, // 5600~5899
      rdp_port: 5600, // 5600~5899
      port_min: 8600, // 6000~60000
      port_max: 8609, // 6000~60000
      vnc_port: 5900, // 5900~5999
      btnloading1: false,
      dialogFormVisible1: false,
      startConfirm: false
    };
  },
  beforeMount() {
    
  },
  mounted() {
    if (this.$t("website_name") === "congTuCloud") {
      this.$refs.virtualBox.style.marginBottom = "0px";
    }
    if (this.enterType == "gpu") {
      this.getGpuList()
    } else if (this.enterType == "city") {
      this.getcity()
    } else {
      this.getroom()
    }
    getPercentage().then(res => {
      if (res.success) {
        this.DBCPercentage = res.content.percentage_signle/100
      }
    })
  },
  beforeDestroy() {
    if(this.refresh){
      clearInterval(this.refresh)
    }
  },
  watch: {
    '$route.query.type'(value){
      this.enterType = value
      this.Machine_status = ''
      this.GPU_Num = ''
      this.Idle_Machine = 0
      this.All_Machine = 0
      this.Machine_info = []
      if (this.enterType == "gpu") {
        this.getGpuList()
      } else if (this.enterType == "city") {
        this.getcity()
      } else {
        this.getroom()
      }
    }
  },
  computed: {
    ...mapState(["isNewWallet", "passward"]),
  },
  methods: {
    ...mapMutations(['setPassWard']),
    // gpu显示
    getGpuList(){
      this.tableData = []
      getsignlegpuType().then(res => {
        this.tableData = res.content
        this.active = this.tableData.length ? this.tableData[0] : ''
        this.getList(this.active , this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
      })
    },
    getList(str = '', status = '', num = '', type , pageNum = 0, pageSize = 20 ) {
      let data = {
        gpu_type: str,
        status: status,
        gpu_num: Number(num),
        pageNum: pageNum,
        pageSize: pageSize,
        signle: 1
      }
      getsignlelistByGpu(data).then( async (res) => {
        if (!res.success) {
          return
        }
        res.content.list.map( (el, i) => {
          el.online = '···'
        })
        this.Machine_info = res.content.list
        this.total = res.content.typeTotal
        this.All_Machine = res.content.total?res.content.total:0
        this.Idle_Machine = res.content.online?res.content.online:0
        if(type == 'first'){
          if(this.refresh){
            clearInterval(this.refresh)
          }
          this.refresh = setInterval( async () => {
            let DBCprice1 = await dbcPriceOcw()
            this.dbc_price = DBCprice1/1000000
            this.getList(this.active , this.Machine_status, this.GPU_Num, '', this.currentPage, this.pageSize)
          }, 60000)
        }
        let DBCprice1 = await dbcPriceOcw()
        this.dbc_price = DBCprice1/1000000
        let online_block = await getBlockTime();
        const GPUPrice = await standardGPUPointPrice()
        this.GPUPointPrice = GPUPrice ? GPUPrice.gpu_price/1000000 : this.GPUPointPrice
        online_block = online_block.replace(/,/gi, '');
        this.Machine_info.map( (el) => {
          el.online = this.minsToHourMins(Math.floor((online_block-el.bonding_height)/2))
          el.singleCardHour = this.getnum2((Number(el.calc_point)/100*this.GPUPointPrice * (1 + this.DBCPercentage)/this.dbc_price)/el.gpu_num/24)
        })
      })
    },
    // 地区分类
    getcity(){
      getsignleCity({ signle: 1 }).then(res => {
        this.cityData = []
        if (res.success) {
          for (let i=0;i<res.content.length; i++) {
            if(res.content[i].city != '') {
              this.cityData.push(res.content[i])
            }
          }
          this.active = this.cityData.length ? this.cityData[0].desc : ''
          this.chooseCountry = this.cityData.length&&this.cityData[0].country
          this.chooseCity = this.cityData.length&&this.cityData[0].city
        } else {
          this.cityData = []
        }
        this.getCityList(this.chooseCountry, this.chooseCity, this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
      })
    },
    getCityList(country, city, status = '', num = '', type , pageNum = 0, pageSize = 20 ) {
      let data = {
        country,
        city,
        status,
        gpu_num: Number(num),
        pageNum: pageNum,
        pageSize: pageSize,
        signle: 1
      }
      getsignlelistByCity(data).then( async (res) => {
        if (!res.success) {
          return
        }
        res.content.list.map( (el, i) => {
          el.online = '···'
        })
        this.All_Machine = res.content.total
        this.Idle_Machine = res.content.online
        if(type == 'first'){
          if(this.refresh){
            clearInterval(this.refresh)
          }
          this.refresh = setInterval( async () => {
            let DBCprice1 = await dbcPriceOcw()
            this.dbc_price = DBCprice1/1000000
            this.getCityList(this.chooseCountry, this.chooseCity, this.Machine_status, this.GPU_Num, '', this.currentPage, this.pageSize)
          }, 60000)
        }
        let DBCprice1 = await dbcPriceOcw()
        this.dbc_price = DBCprice1/1000000
        let online_block = await getBlockTime();
        const GPUPrice = await standardGPUPointPrice()
        this.GPUPointPrice = GPUPrice ? GPUPrice.gpu_price/1000000 : this.GPUPointPrice
        online_block = online_block.replace(/,/gi, '');
        this.Machine_info = res.content.list
        this.total = res.content.typeTotal
        this.Machine_info.map( (el) => {
          el.online = this.minsToHourMins(Math.floor((online_block-el.bonding_height)/2))
          el.singleCardHour = this.getnum2((Number(el.calc_point)/100*this.GPUPointPrice * (1 + this.DBCPercentage)/this.dbc_price)/el.gpu_num/24)
        })
      })
    },
    // 机房分类
    getroom(){
      getsignleRoomnum({ signle: 1 }).then(res => {
        if (res.success) {
          this.active = res.content.length&&res.content[0]
          this.roomData = res.content
          this.chooseRoomnum = res.content.length&&res.content[0]
        } else {
          this.roomData = []
        }
        this.getRoomList(this.chooseRoomnum, this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
      })
    },
    getRoomList(roomnum, status = '', num = '', type , pageNum = 0, pageSize = 20 ) {
      let data = {
        roomnum,
        status,
        gpu_num: Number(num),
        pageNum: pageNum,
        pageSize: pageSize,
        signle: 1
      }
      getsignlelistByRoom(data).then( async (res) => {
        if (!res.success) {
          return
        }
        res.content.list.map( (el, i) => {
          el.online = '···'
        })
        this.All_Machine = res.content.total
        this.Idle_Machine = res.content.online
        if(type == 'first'){
          if(this.refresh){
            clearInterval(this.refresh)
          }
          this.refresh = setInterval( async () => {
            let DBCprice1 = await dbcPriceOcw()
            this.dbc_price = DBCprice1/1000000
            this.getRoomList(this.chooseRoomnum, this.Machine_status, this.GPU_Num, '', this.currentPage, this.pageSize)
          }, 60000)
        }
        let DBCprice1 = await dbcPriceOcw()
        this.dbc_price = DBCprice1/1000000  
        let online_block = await getBlockTime();
        const GPUPrice = await standardGPUPointPrice()
        this.GPUPointPrice = GPUPrice ? GPUPrice.gpu_price/1000000 : this.GPUPointPrice
        online_block = online_block.replace(/,/gi, '');
        this.Machine_info = res.content.list
        this.total = res.content.typeTotal
        this.Machine_info.map( (el) => {
          el.online = this.minsToHourMins(Math.floor((online_block-el.bonding_height)/2))
          el.singleCardHour = this.getnum2((Number(el.calc_point)/100*this.GPUPointPrice * (1 + this.DBCPercentage)/this.dbc_price)/el.gpu_num/24)
        })
      })
    },
    // 点击选择详细类型
    choose(str) {
      this.active = str
      this.Idle_Machine = 0
      this.All_Machine = 0
      this.Machine_info = []
      this.Machine_status = ''
      this.GPU_Num = ''
      this.getList(this.active , this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
    },
    choosecity(str) {
      this.Idle_Machine = 0
      this.All_Machine = 0
      this.Machine_info = []
      this.Machine_status = ''
      this.GPU_Num = ''
      this.active = str.desc
      this.chooseCountry = str.country
      this.chooseCity = str.city
      this.getCityList(this.chooseCountry, this.chooseCity, this.Machine_status, this.GPU_Num, '', this.currentPage, this.pageSize)
    },
    chooseRoom(str) {
      this.Idle_Machine = 0
      this.All_Machine = 0
      this.Machine_info = []
      this.Machine_status = ''
      this.GPU_Num = ''
      this.active = str
      this.chooseRoomnum = str
      this.getRoomList(this.chooseRoomnum, this.Machine_status, this.GPU_Num, '', this.currentPage, this.pageSize)
    },
    // 截取字符串长度，保留两位
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
      return num1.substring(0,num1.indexOf(".")+3);
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
    SelectStatus() {
      this.currentPage = 0
      this.Idle_Machine = 0
      this.All_Machine = 0
      this.Machine_info = []
      if (this.enterType == "gpu") {
        this.getList(this.active , this.Machine_status, this.GPU_Num, '', this.currentPage, this.pageSize)
      } else if (this.enterType == "city") {
        this.getCityList(this.chooseCountry, this.chooseCity, this.Machine_status, this.GPU_Num, '', this.currentPage, this.pageSize)
      } else {
        this.getRoomList(this.chooseRoomnum, this.Machine_status, this.GPU_Num, '', this.currentPage, this.pageSize)
      }
    },
    SelectNum() {
      this.currentPage = 0
      this.Idle_Machine = 0
      this.All_Machine = 0
      this.Machine_info = []
      if (this.enterType == "gpu") {
        this.getList(this.active , this.Machine_status, this.GPU_Num, '', this.currentPage, this.pageSize)
      } else if (this.enterType == "city") {
        this.getCityList(this.chooseCountry, this.chooseCity, this.Machine_status, this.GPU_Num, '', this.currentPage, this.pageSize)
      } else {
        this.getRoomList(this.chooseRoomnum, this.Machine_status, this.GPU_Num, '', this.currentPage, this.pageSize)
      }
    },
    handleChangepageSize(num) {
      this.pageSize = num
      if (this.enterType == "gpu") {
        this.getList(this.active , this.Machine_status, this.GPU_Num, '', this.currentPage, this.pageSize)
      } else if (this.enterType == "city") {
        this.getCityList(this.chooseCountry, this.chooseCity, this.Machine_status, this.GPU_Num, '', this.currentPage, this.pageSize)
      } else {
        this.getRoomList(this.chooseRoomnum, this.Machine_status, this.GPU_Num, '', this.currentPage, this.pageSize)
      }
      
    },
    handleCurrentChang(num) {
      this.currentPage = num
      if (this.enterType == "gpu") {
        this.getList(this.active , this.Machine_status, this.GPU_Num, '', this.currentPage, this.pageSize)
      } else if (this.enterType == "city") {
        this.getCityList(this.chooseCountry, this.chooseCity, this.Machine_status, this.GPU_Num, '', this.currentPage, this.pageSize)
      } else {
        this.getRoomList(this.chooseRoomnum, this.Machine_status, this.GPU_Num, '', this.currentPage, this.pageSize)
      }
    },
    // 创建虚拟机
    inputNum(val){
      this.totalDBC = this.getnum2(Number(this.chooseMac.singleCardHour) * val*this.vir_gpu_num) - 0 + 10
      this.vir_mem = this.max_vir_mem*this.vir_gpu_num/2
      this.vir_cpu_num = this.max_cpu_num*this.vir_gpu_num/2
      this.vir_disk_size = this.max_disk_num*this.vir_gpu_num/2
    },
    inputGpuNum(val) {
      this.totalDBC = this.getnum2(Number(this.chooseMac.singleCardHour) * this.useTime*val) - 0 + 10
      this.vir_mem = this.max_vir_mem*this.vir_gpu_num/2
      this.vir_cpu_num = this.max_cpu_num*this.vir_gpu_num/2
      this.vir_disk_size = this.max_disk_num*this.vir_gpu_num/2
    },
    changeOp(val){
      this.image_name = ''
      if (val == 'linux') {
        this.bios_mode = 'legacy'
        this.is_ubunto = false
        this.port_range = 5600
        this.optiondefault = this.option.filter(el => {
          if (el.image_name.indexOf('ubuntu') != -1 || el.image_name.indexOf('win') == -1){
            return el
          }
        })
      } else {
        this.bios_mode = 'uefi'
        this.is_ubunto = true
        this.rdp_port = 5600
        this.optiondefault = this.option.filter(el => {
          if (el.image_name.indexOf('win') != -1 || el.image_name.indexOf('ubuntu') == -1) return el
        })
      }
    },
    batch_Mac(el){
      if (!this.account) {
        this.$message({
          showClose: true,
          message: this.$t("pleae_create_wallet"),
          type: "error",
        });
        return;
      }
      this.chooseMac = el
      getPort().then(res => {
        if (res.success && res.content.length) {
          let machinehasPort =  res.content.filter( item => { return item._id == el.machine_id})
          if (machinehasPort.length) {
            this.hasPort = machinehasPort[0]
          } else {
            this.hasPort = {
              use_vnc: [],
              use_sshOrrdp: [],
              use_port_min: []
            }
          }
        } else {
          this.hasPort = {
            use_vnc: [],
            use_sshOrrdp: [],
            use_port_min: []
          }
        }
      })
      getsignleMachineInfo({machine_id: el.machine_id, id: el._id}).then( async (res) => {
        if (res.success) {
          let info = res.content
          this.max_vir_mem = info.mem.free > 0 ? parseInt(parseInt(info.mem.free)/el.gpu_num) : parseInt(parseInt(info.mem.size)/el.gpu_num)
          this.max_cpu_num = parseInt(Math.floor(info.cpu.cores)/el.gpu_num)
          this.max_gpu_num = el.CanUseGpu
          let disk_data_free = parseInt(info.disk_data[0]?info.disk_data[0].free:0)
          this.max_disk_num = disk_data_free > 0 ? parseInt(Math.floor(disk_data_free * 0.75)/(el.gpu_num*2)) : 0
          this.option = info.images
          this.vir_mem = this.max_vir_mem/2
          this.vir_cpu_num = this.max_cpu_num/2
          this.vir_disk_size = this.max_disk_num/2
          this.totalDBC = this.chooseMac.singleCardHour ? this.getnum2(Number(this.chooseMac.singleCardHour) * this.useTime * this.vir_gpu_num) - 0  + 10 : 0
          let { balance } = await getBalance()
          this.balance = balance.toFixed(2)
          this.dialogFormVisible1 = true
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    Createvirtual(){
      if ( Number(this.balance) < 0.5 || Number(this.balance) < Number(this.totalDBC)) {
        this.$message.error(this.$t('signleVir.tip2'))
        return false
      }
      if (this.image_name == '' || this.operation_system == '') {
        this.$message.error(this.$t('myvirtual.newTip1'))
        return false
      }
      // 获取ssh、rdp
      let sshOrrdp = 5600
      while (sshOrrdp < 5899) {
        if (this.hasPort.use_sshOrrdp.indexOf(sshOrrdp) != -1) {
          sshOrrdp ++
        } else {
          this.port_range = sshOrrdp
          this.rdp_port = sshOrrdp
          break
        }
      }
      // 获取vnc
      let vncPort = 5900
      while (vncPort < 5999) {
        if (this.hasPort.use_vnc.indexOf(vncPort) != -1) {
          vncPort ++
        } else {
          this.vnc_port = vncPort
          break
        }
      }
      // 获取开放端口
      let portMin = 8600
      while (portMin < 60000) {
        if (this.hasPort.use_port_min.indexOf(portMin) != -1) {
          portMin += 10
        } else {
          this.port_min = portMin
          this.port_max = portMin + 9
          break
        }
      }
      try {
        this.btnloading1 = true
        this.startConfirm = true;
        let perams = {
          machine_id: this.chooseMac.machine_id,
          ssh_port: !this.is_ubunto ? this.port_range : '',
          image_name: this.image_name,
          port_min: this.port_min,
          port_max: this.port_max,
          gpu_count: this.vir_gpu_num,
          cpu_cores: this.vir_cpu_num,
          mem_rate: this.vir_mem,
          disk_size: this.vir_disk_size,
          vnc_port: this.vnc_port,
          rdp_port: this.is_ubunto ? this.rdp_port : '',
          operation_system: this.operation_system,
          bios_mode: this.bios_mode,
          network_name: '',
          time: this.useTime, 
          dbc: this.totalDBC, 
          account: this.account, 
          language: this.$i18n.locale
        }
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
                  this.btnloading1 = false;
                  this.startConfirm = false;
                  this.$router.push({
                    name: "loading",
                    params: perams
                  });
                  return false;
                  createSignleVirOrder(perams).then(res => {
                    if (res.success) {
                      let data = {
                        virOrderId: res.content,
                        machine_id: this.chooseMac.machine_id,
                        account: this.account
                      }
                      this.createSignleVirmthods(data)
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
              this.btnloading = false;
              this.startConfirm = false;
            });
            // this.createSignleVir(perams, res.content)
          }
        })
      } catch (err) {
        this.btnloading1 = false
        this.startConfirm = false;
        this.$message({
          showClose: true,
          message: err.message,
          type: "error",
        });
      }
    },
    createSignleVirmthods(data){
      createSignleVir(data).then( res=> {
        if (res.success) {
          this.btnloading1 = false
          this.startConfirm = false;
          this.dialogFormVisible1 = false
          setTimeout(() => {
            this.$router.push('mymachine/mySignleUnlockGpuVirtual')
          }, 1000);
        } else {
          if (res.code == -5 || res.code == -6) {
            // if (res.code == -6) {
            //   this.is_ubunto ? data.rdp_port++ : data.ssh_port ++
            // }
            // if (res.code == -5 ) {
            //   data.vnc_port ++
            // }
            this.createSignleVirmthods(data)
          } else {
            this.btnloading1 = false;
            this.startConfirm = false;
            this.$message.error(res.msg)
            changeSignleVirStatus({virOrderId: data.virOrderId, status: 5}).then(res => {
              console.log(res, 'res');
              this.$message({
                showClose: true,
                message: this.$t('signleVir.tip6') ,
                type: "error",
              });
            })
          }
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";

.virtual {
  margin-bottom: 22px;
}
.right-wrap {
  margin-left: 10px;
}

.btn-list {
  padding-top: 20px;
  li {
    margin-bottom: 20px;
    text-align: center;
    .naviBtn {
      width: 280px;
      font-size: 16px;
      color: $textColor_gray;
      border-color: $textColor_gray;
      &.active,
      &:hover {
        background-color: rgb(
          25,
          93,
          145
        ); ////dbchain:#008BF3, yousanai,aicv:rgb(243, 186, 0),aionego:#c5c325,deepshare:rgb(25, 93,145),yalecloud:#008bf3,
        //panchuangai,alpha-dbchain:#008bf3
        //sharegpu:rgb( 25, 93, 145),52lm:rgb(25,93,145);mayi:rgb(25,93,145);windywinter\dimi\52cv\ainlp\1024lab\litaai,redstonewill\snbt:rgb(25,93,145);
        color: #fff;
        border-color: rgb(
          25,
          93,
          145
        ); ////dbchain:#008BF3, yousanai:rgb(243, 186, 0);aionego:#b4b645,deepshare:rgb(25, 93,145),yalecloud:#008bf3,
        //panchuangai,alpha-dbchain:#008bf3
      } // //sharegpu:rgb( 25, 93, 145),52lm:rgb(25,93,145);,mayi:rgb(25,93,145);windywinter\dimi\52cv\ainlp\1024lab\litaai,redstonewill\snbt:rgb(25,93,145);
      i {
        margin-right: 10px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
    }
  }
}

.bold{
  font-weight: bold;
}

.right_con{
  width: 100%;
  padding: 15px 10px;
  box-sizing: border-box;
  .topcon{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .topcon_left{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .topitem{
        font-size: 16px;
        margin-right: 40px;
        margin-bottom: 20px;
        .select{
          width: 90px;
        }
        span{
          color: #f56c6c;
        }
      }
    }
    .batch{
      margin-bottom: 20px;
      border-color: $primaryColor;
    }
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
      padding: 10px;
      font-size: 14px;
      box-sizing: border-box;
      border: 1px solid #999;
      margin-bottom: 15px;
      .li_list1{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        &:first-child{
          justify-content: space-between;
        }
        span{
          margin-bottom: 10px;
          word-break: break-all;
          display: inline-block;
          &.Machine_id{
            padding: 10px 5px;
            box-sizing: border-box;
            border: 1px solid #999;
          }
          i{
            font-style: normal;
            color: #195d91;
          }
        }
      }
      .li_list2{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        span{
          width: 20%;
          margin-bottom: 14px;
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
      .color{
        color: #f56c6c;
      }
    }
    // .machine_nifo{
    //   width: 90%;
    //   margin: auto;
    //   display: flex;
    //   font-size: 16px;
    //   flex-wrap: wrap;
    //   align-items: center;
    //   justify-content: space-between;
    // }
  }
  .paging {
    .el-pagination {
      display: flex;
      justify-content: center;
    }
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
@media screen and (max-width: 1600px) {
  .right_con{
    .topcon{
      .topcon_left{
        .topitem{
          font-size: 14px;
        }
      }
    }
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
}
</style>
