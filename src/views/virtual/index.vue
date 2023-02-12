<template>
  <div class="virtual" ref="virtualBox">
    <Header v-if="this.$store.state.webtype" :underlineStyle="underlineStyle" />
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
                  <span>{{String(item).slice(7)}}</span>
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
                <div class="topitem">
                  {{$t('virtual.Machine_status')}}: 
                  <el-select class='select' v-model="Machine_status" size='mini' @change='SelectStatus' placeholder="">
                    <el-option :label="$t('virtual.All')" value=""></el-option>
                    <el-option :label="$t('virtual.Rented')" value="rented"></el-option>
                    <el-option :label="$t('virtual.Idle')" value="online"></el-option>
                  </el-select>
                </div>
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
                <div class="topitem">
                  {{$t('virtual.All_Machine')}}: {{All_Machine}}
                </div>
                <div class="topitem">
                  {{$t('virtual.Idle_Machine')}}: {{Idle_Machine}}
                </div>
              </div>
              <div class="topcon_right">
                <el-button
                  class="batch"
                  size="mini"
                  plain
                  @click="batch"
                >
                  {{ $t('virtual.batch') }}
                </el-button>
              </div>
            </div>
            <div class="table">
              <div v-if="openCheck" class="checkAll">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{$t('virtual.choose')}}</el-checkbox>
                <el-button class="batch" size="mini" plain @click="commit()">
                  {{ $t('virtual.commit') }} {{checkedCities.length}}
                </el-button>
              </div>
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <div class="tableli" v-for="el in Machine_info" :key="el.machine_id">
                  <div class="li_list1">
                    <div>
                      <el-checkbox v-if="openCheck" :disabled="el.machine_status != 'online' || el.hasSignle" :label="el.machine_id" :key="el.machine_id">{{''}}</el-checkbox>
                      <span class="Machine_id">{{$t('virtual.Machine_ID')}}: {{el.machine_id}}</span>
                    </div>
                    <span v-if="el.hasIP">{{$t('virtual.dedicated')}}</span>
                    <span v-if="el.server_room" :title="el.server_room">{{$t('virtual.Room_number')}}: {{String(el.server_room).substring(0,10)+'...'}}</span>
                    <span>{{$t('virtual.Machine_sta')}}: {{el.machine_status != 'online'?$t('virtual.Rented'):$t('virtual.Idle')}}</span>
                    <span v-if="!openCheck">
                      <el-button class="batch" :disabled='el.machine_status != "online" || el.hasSignle' size="mini" plain @click="batch_Mac(el)">
                        {{ $t('virtual.batch_Mac') }}
                      </el-button>
                    </span>
                  </div>
                  <div class="li_list2">
                    <span class="bold">{{$t('virtual.GPU_Num')}}: {{el.gpu_num}}</span>
                    <span class="bold">{{$t('virtual.GPU_memory')}}: {{el.gpu_mem}}G</span>
                    <span class="width30 bold">{{$t('virtual.GPU_type')}}: {{el.gpuType}}</span>
                    <span class="width30 bold">{{$t('virtual.Daily_Rent')}}: 
                      <i class="color"> {{getnum2(Number(el.calc_point)/100*GPUPointPrice * (1 + DBCPercentage))}}$≈{{getnum2(Number(el.calc_point)/100*GPUPointPrice * (1 + DBCPercentage)/dbc_price)}}DBC </i>
                    </span>
                    <span>{{$t('virtual.Country')}}: {{el.country}}</span>
                    <span>{{$t('virtual.City')}}: {{el.city}}</span>
                    <span>
                      {{$t('virtual.lable_two2')}}: 
                      <i :title="el.machine_owner" v-if='!el.machine_name'>{{String(el.machine_stash).substring(0,10)+'...'}}</i>
                      <i :title="el.machine_owner" v-else>{{el.machine_name}}</i> 
                    </span> 
                    <span>{{$t('virtual.Cumulative_DBC_rent')}}: {{getnum1(el.total_rent_fee)}}</span>
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
              </el-checkbox-group>
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
    <el-dialog width='40%' :title="$t('virtual.batch_Mac')" :visible.sync="dialogFormVisible">
      <div v-if="openCheck">
        <p><span class="bold">{{$t('virtual.Machine_num')}}:</span> {{checkedCities.length}}</p>
      </div>
      <div class="useTime">
        <div>
          <span class="bold">{{$t('virtual.useTime')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="useTime" @change="inputNum" :min="1" :max="60"></el-input-number>
           {{$t('day')}}
        </div>
        <div v-if="!openCheck">{{$t('virtual.Daily_Rent')}}: <span class="color">{{getnum2(Number(chooseMac.calc_point)/100*GPUPointPrice * (1 + DBCPercentage))}}$≈{{getnum2(Number(chooseMac.calc_point)/100*GPUPointPrice * (1 + DBCPercentage)/dbc_price)}}DBC</span></div>
      </div>
      <div class="fs12">{{$t('virtual.tip1')}}</div>
      <div>
        <p v-if="!openCheck"><span class="bold">{{$t('virtual.Max_disk_Num')}}:</span> {{Number(chooseMac.data_disk)}}G</p>
        <p v-if="!openCheck"><span class="bold">{{$t('virtual.Max_Mem')}}:</span> <span style="color: #f56c6c;">{{max_vir_mem ? max_vir_mem : Math.ceil(Number(chooseMac.mem_num))}} </span>G</p>
        <p><span class="bold">{{$t('virtual.total')}}:</span> {{totalMoney}} $</p>
        <p><span class="bold">{{$t('virtual.equivalent')}}:</span> {{totalDbc}}</p>
      </div>
      <div>
        <p>{{$t('virtual.tip2')}}</p>
        <p>{{$t('virtual.tip3')}}</p>
        <p v-show="startConfirm" style="color: #f56c6c;">{{$t('responseTip')}}</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="batch" size="mini" plain :loading='btnloading'  @click="confirm">{{$t('virtual.confirm')}}</el-button>
        <el-button class="batch" size="mini" plain  @click="dialogFormVisible = false;btnloading=false">{{$t('virtual.cancal')}}</el-button>
      </div>
    </el-dialog>
    <Footer class="footer" v-if="this.$store.state.webtype" />
  </div>
</template>

<script>

import BigNumber from "bignumber.js";
import Header from "@/congTuCloud/components/header/SubHeader.vue";
import Footer from "@/congTuCloud/components/footer/Footer.vue";
import { getCurrentPair } from "@/utlis/dot";
import { getAccount, getBalance } from "@/utlis";
import { mapState, mapMutations } from "vuex";
import { transfer, getBlockTime, batchTransfer, standardGPUPointPrice, dbcPriceOcw } from '@/utlis/dot/api';
import { 
  getgpuType,
  getlistByGpu,
  CreateWallet,
  createVirOrder,
  rentmachine,
  getPercentage,
  getMachineInfo,
  getCity,
  getlistByCity,
  getRoomnum,
  getlistByRoom,
  getMacIp
} from "@/api"
export default {
  name: "virtual",
  data() {
    return {
      wallet_address: (getAccount() && getAccount().address) || (getCurrentPair() && getCurrentPair().address),
      active: '',
      Computing_Power: 0,
      dbc_price: 0,
      currentPage: 1,
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
      checkAll: false,
      checkedCities: [],
      isIndeterminate: false,
      openCheck: false,
      dialogFormVisible: false,
      useTime: 1,
      totalCalc: 0,
      totalMoney: 0,
      totalDbc: 0,
      chooseMac: {},
      underlineStyle: {
        width: "65px",
        left: "92px",
      },
      GPUPointPrice: 0.028229,
      DBCPercentage: 0,
      refresh: null,
      startConfirm: false,
      max_vir_mem: 0,
      enterType: this.$route.query.type ? this.$route.query.type : 'gpu',
      chooseCity: '',
      chooseCountry: '',
      chooseRoomnum: '',
      MacIpList: []
    };
  },
  beforeMount() {
    getPercentage().then(res => {
      if (res.success) {
        this.DBCPercentage = res.content.percentage_whole/100
      }
    })
    getMacIp().then(res => {
      this.MacIpList = res.success ? res.content : []
    })
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
      getgpuType().then(res => {
        this.tableData = res.content
        this.active = this.tableData.length ? this.tableData[0] : ''
        this.getList(this.active , this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
      })
    },
    getList(str = '', status = '', num = '', type , pageNum = 1, pageSize = 20 ) {
      let data = {
        gpu_type: str,
        status: status,
        gpu_num: Number(num),
        pageNum: pageNum - 1,
        pageSize: pageSize,
        signle: 0
      }
      getlistByGpu(data).then( async (res) => {
        if (!res.success) {
          return
        }
        res.content.list.map( (el, i) => {
          // if(el.operator){
          //   el.machine_name = this.byteToStr(JSON.parse(el.operator))
          // }
          if (this.MacIpList.indexOf(el.machine_id) != -1) {
            el.hasIP = true
          }
          el.online = '···'
        })
        this.All_Machine = res.content.total?res.content.total:0
        this.Idle_Machine = res.content.online?res.content.online:0
        // if(type == 'first'){
        //   if(this.refresh){
        //     clearInterval(this.refresh)
        //   }
        //   this.refresh = setInterval( async () => {
        //     this.getList(this.active , this.Machine_status, this.GPU_Num, '', this.currentPage, this.pageSize)
        //   }, 60000)
        // }
        if(type == 'first'){
          if(this.refresh){
            clearInterval(this.refresh)
          }
          this.isIndeterminate = false;
          this.checkedCities = [];
          this.checkAll = false;
          this.openCheck = false;
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
        this.Machine_info = res.content.list
        this.total = res.content.typeTotal
        this.Machine_info.map( (el) => {
          el.online = this.minsToHourMins(Math.floor((online_block-el.bonding_height)/2))
        })
      })
    },
    // 地区分类
    getcity(){
      getCity().then(res => {
        this.cityData = []
        if (res.success) {
          for (let i=0;i<res.content.length; i++) {
            if(res.content[i].city != '') {
              this.cityData.push(res.content[i])
            }
          }
          this.active = this.cityData[0] ? this.cityData[0].desc : ''
          this.chooseCountry = this.cityData[0].country
          this.chooseCity = this.cityData[0].city
        } else {
          this.cityData = []
        }
        this.getCityList(this.chooseCountry, this.chooseCity, this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
      })
    },
    getCityList(country, city, status = '', num = '', type , pageNum = 1, pageSize = 20 ) {
      // this.isIndeterminate = false;
      // this.checkedCities = [];
      // this.checkAll = false;
      // this.openCheck = false;
      let data = {
        country,
        city,
        status,
        gpu_num: Number(num),
        pageNum: pageNum - 1,
        pageSize: pageSize
      }
      getlistByCity(data).then( async (res) => {
        res.content.list.map( (el, i) => {
          el.machine_id = el._id
          // if(el.operator){
          //   el.machine_name = this.byteToStr(JSON.parse(el.operator))
          // }
          if (this.MacIpList.indexOf(el.machine_id) != -1) {
            el.hasIP = true
          }
          el.online = '···'
        })
        this.All_Machine = res.content.total
        this.Idle_Machine = res.content.online
        if(type == 'first'){
          if(this.refresh){
            clearInterval(this.refresh)
          }
          this.isIndeterminate = false;
          this.checkedCities = [];
          this.checkAll = false;
          this.openCheck = false;
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
        })
      })
    },
    // 机房分类
    getroom(){
      getRoomnum().then(res => {
        if (res.success) {
          this.active = res.content[0]
          this.roomData = res.content
          this.chooseRoomnum = res.content[0]
        } else {
          this.roomData = []
        }
        this.getRoomList(this.chooseRoomnum, this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
      })
    },
    getRoomList(roomnum, status = '', num = '', type , pageNum = 1, pageSize = 20 ) {
      // this.isIndeterminate = false;
      // this.checkedCities = [];
      // this.checkAll = false;
      // this.openCheck = false;
      let data = {
        roomnum,
        status,
        gpu_num: Number(num),
        pageNum: pageNum - 1,
        pageSize: pageSize
      }
      getlistByRoom(data).then( async (res) => {
        res.content.list.map( (el, i) => {
          el.machine_id = el._id
          // if(el.operator){
          //   el.machine_name = this.byteToStr(JSON.parse(el.operator))
          // }
          if (this.MacIpList.indexOf(el.machine_id) != -1) {
            el.hasIP = true
          }
          el.online = '···'
        })
        this.All_Machine = res.content.total
        this.Idle_Machine = res.content.online
        if(type == 'first'){
          this.isIndeterminate = false;
          this.checkedCities = [];
          this.checkAll = false;
          this.openCheck = false;
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
        })
      })
    },

    choose(str) {
      this.active = str
      this.Idle_Machine = 0
      this.All_Machine = 0
      this.Machine_info = []
      this.Machine_status = ''
      this.GPU_Num = ''
      this.currentPage = 1
      this.getList(this.active , this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
    },
    choosecity(str) {
      this.Idle_Machine = 0
      this.All_Machine = 0
      this.Machine_info = []
      this.Machine_status = ''
      this.GPU_Num = ''
      this.currentPage = 1
      this.active = str.desc
      this.chooseCountry = str.country
      this.chooseCity = str.city
      this.getCityList(this.chooseCountry, this.chooseCity, this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
    },
    chooseRoom(str) {
      this.Idle_Machine = 0
      this.All_Machine = 0
      this.Machine_info = []
      this.Machine_status = ''
      this.GPU_Num = ''
      this.active = str
      this.currentPage = 1
      this.chooseRoomnum = str
      this.getRoomList(this.chooseRoomnum, this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
    },
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
      return num1.substring(0,num1.indexOf(".")+3);
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
      this.Machine_info = []
      this.currentPage = 1
      if (this.enterType == "gpu") {
        this.getList(this.active , this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
      } else if (this.enterType == "city") {
        this.getCityList(this.chooseCountry, this.chooseCity, this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
      } else {
        this.getRoomList(this.chooseRoomnum, this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
      }
    },
    SelectNum() {
      this.Machine_info = []
      this.currentPage = 1
      if (this.enterType == "gpu") {
        this.getList(this.active , this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
      } else if (this.enterType == "city") {
        this.getCityList(this.chooseCountry, this.chooseCity, this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
      } else {
        this.getRoomList(this.chooseRoomnum, this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
      }
    },
    handleChangepageSize(num) {
      this.pageSize = num
      if (this.enterType == "gpu") {
        this.getList(this.active , this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
      } else if (this.enterType == "city") {
        this.getCityList(this.chooseCountry, this.chooseCity, this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
      } else {
        this.getRoomList(this.chooseRoomnum, this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
      }
      
    },
    handleCurrentChang(num) {
      this.currentPage = num
      if (this.enterType == "gpu") {
        this.getList(this.active , this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
      } else if (this.enterType == "city") {
        this.getCityList(this.chooseCountry, this.chooseCity, this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
      } else {
        this.getRoomList(this.chooseRoomnum, this.Machine_status, this.GPU_Num, 'first', this.currentPage, this.pageSize)
      }
    },
    batch() {
      if (!this.wallet_address) {
        this.$message({
          showClose: true,
          message: this.$t("pleae_create_wallet"),
          type: "error",
        });
        return;
      }
      this.openCheck = !this.openCheck;
      this.isIndeterminate = false;
      this.checkedCities = [];
      this.checkAll = false;
      this.chooseMac = {};
      this.totalMoney = 0;
      this.totalDbc = 0;
    },
    batch_Mac(el){
      if (!this.wallet_address) {
        this.$message({
          showClose: true,
          message: this.$t("pleae_create_wallet"),
          type: "error",
        });
        return;
      }
      this.chooseMac = el;
      getMachineInfo({machine_id: el.machine_id}).then(res => {
        if (res.success) {
          this.max_vir_mem = parseInt(res.content.info.mem.free)
        }
      })
      this.useTime = 1;
      this.dialogFormVisible = true;
      const getprice = Number(this.chooseMac.calc_point)/100 * this.GPUPointPrice * (1 + this.DBCPercentage)
      this.totalMoney = this.getnum2(getprice * this.useTime)
      this.totalDbc = Math.ceil(this.getnum2(getprice * this.useTime/this.dbc_price)) + 10
    },
    inputNum(val){
      if(!this.openCheck){
        const getprice = Number(this.chooseMac.calc_point)/100 * this.GPUPointPrice * (1 + this.DBCPercentage)
        this.totalMoney = this.getnum2(getprice * val)
        this.totalDbc = Math.ceil(this.getnum2(getprice * val/this.dbc_price)) + 10
      }else{
        this.totalCalc = 0
        this.totalMoney = 0
        this.totalDbc = 0
        this.checkedCities.map( el=>{
          this.totalCalc += Number(el.calc_point)
          const getprice = Number(el.calc_point)/100*this.GPUPointPrice * (1 + this.DBCPercentage)
          this.totalMoney += Number(this.getnum2(getprice*this.useTime))
          this.totalDbc += (Math.ceil(this.getnum2(getprice*this.useTime/this.dbc_price)) + 10)
        })
        this.totalMoney = this.getnum2(this.totalMoney)
        // this.totalMoney = this.getnum2(Number(this.totalCalc)/100*this.GPUPointPrice*val)
        // this.totalDbc = Math.ceil(this.getnum2(Number(this.totalCalc)/100*this.GPUPointPrice*val/this.dbc_price)) + 10
      }
    },
    handleCheckAllChange(val) {
      console.log(val, 'val');
      this.checkedCities = []
      this.Machine_info.map( el => {
        if(val){
          if(el.machine_status == 'online' && !el.hasSignle){
            this.checkedCities.push(el.machine_id)
          }
        }
      })
      this.isIndeterminate = false;
      console.log(this.checkedCities);
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.Machine_info.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.Machine_info.length;
    },
    commit(){
      if(this.checkedCities.length > 0){
        this.useTime = 1;
        // let machineList = []
        this.checkedCities.map( (el, index) => {
          this.Machine_info.map( res => {
            if(res.machine_id == el){
              this.checkedCities[index] = res
              // machineList.push(res)
              // 获取每个机器对应的临时钱包
              // CreateWallet( { id : res.machine_id+this.wallet_address, machine_id: res.machine_id } ).then(res1 => {
              //   console.log(res1, 'CreateWallet');
              // })
            }
          })
        })
        this.totalCalc = 0
        this.totalMoney = 0
        this.totalDbc = 0
        this.checkedCities.map( el=>{
          this.totalCalc += Number(el.calc_point)
          const getprice = Number(el.calc_point)/100*this.GPUPointPrice * (1 + this.DBCPercentage)
          this.totalMoney += Number(this.getnum2(getprice*this.useTime))
          this.totalDbc += (Math.ceil(this.getnum2(getprice*this.useTime/this.dbc_price)) + 10)
        })
        this.totalMoney = this.getnum2(this.totalMoney)
        this.dialogFormVisible = true;
      }else{
        this.$message({
          showClose: true,
          message: this.$t('virtual.tip0'),
          type: "error",
        });
      }
    },
    async confirm(){
      this.btnloading = true;
      this.startConfirm = true;
      let { balance } = await getBalance()
      if (balance < this.totalDbc+1) {
        this.btnloading = false;
        this.startConfirm = false;
        this.$message.error(this.$t('lessdbc'))
        return false
      }
      if(this.openCheck){
        console.log('批量租用')
        let orderInfo = []
        let errInfo = [] // 需要转账的钱包信息
        for(let i =0; i< this.checkedCities.length; i++){
          let orderdata = {
            id: this.checkedCities[i].machine_id+this.wallet_address,
            machine_id: this.checkedCities[i].machine_id,
            dollar: this.getnum2(Number(this.checkedCities[i].calc_point)/100*this.GPUPointPrice * (1 + this.DBCPercentage)),
            day: this.useTime,
            count: this.getnum2(Number(this.checkedCities[i].calc_point)/100*this.GPUPointPrice * (1 + this.DBCPercentage)*this.useTime),
            dbc: Math.ceil(this.getnum2(Number(this.checkedCities[i].calc_point)/100*this.GPUPointPrice * (1 + this.DBCPercentage) *this.useTime/this.dbc_price)) + 10,
            wallet: this.wallet_address,
            language: this.$i18n.locale
          }
          let order = await createVirOrder(orderdata)
          let wallet_info = await CreateWallet({ id: this.checkedCities[i].machine_id+this.wallet_address })
          if (order.success && wallet_info.success) {
            order.info = wallet_info.content,
            order.totalDbc = orderdata.dbc
            orderInfo.push(order)
          } else {
            errInfo.push(order.content)
          }
        }
        console.log(orderInfo, 'orderInfo', errInfo, 'errInfo','创建结果')
        if (orderInfo.length) {
          this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
            confirmButtonText: this.$t('confirm'),
            cancelButtonText:  this.$t('cancel'),
            inputType:'password',
            inputValue: this.passward
          })
          .then( ({ value }) => {
            this.setPassWard(value)
            batchTransfer( orderInfo, value, async (res1) => {
              console.log(res1, 'res');
              if(res1.success){
                let request = []
                for(let j =0; j< orderInfo.length; j++){
                  let permas = {
                    id: orderInfo[j].content
                  }
                  console.log(permas, 'permas'+j);
                  request.push(rentmachine(permas))
                }
                Promise.all(request).then(res => {
                  console.log(res, 'rentmachine');
                  let i = 0, e = 0;
                  for (let j = 0; j< res.length; j++) {
                    res[j].success ? i ++ : e ++
                  }
                  if (i) {
                    let msg = this.$message({
                      showClose: true,
                      message: this.$t('virtual.tip7') + i + this.$t('virtual.tip8'),
                      type: "success",
                    });
                    this.dialogFormVisible = false
                    setTimeout(() => {
                      msg.close()
                      this.$router.push('/mymachine/myMachine_gpuVirtual')
                    }, 1000);
                  } else {
                    this.$message({
                      showClose: true,
                      message: this.$t('virtual.tip5'),
                      type: "error",
                    });
                  }
                  this.btnloading = false;
                  this.startConfirm = false;
                })
                .catch(err => {
                  this.btnloading = false;
                  this.startConfirm = false;
                  this.$message({
                    showClose: true,
                    message: this.$t('virtual.tip5'),
                    type: "error",
                  });
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
          }).catch(() => {
            this.btnloading = false;
            this.startConfirm = false;
            console.log('取消下单');
          });
        }
      }else{
        let permas = {
          id: this.chooseMac.machine_id+this.wallet_address,
          machine_id: this.chooseMac.machine_id,
          dollar: this.getnum2(Number(this.chooseMac.calc_point)/100*this.GPUPointPrice * (1 + this.DBCPercentage)),
          day: this.useTime,
          count: this.totalMoney,
          dbc: this.totalDbc,
          wallet: this.wallet_address,
          language: this.$i18n.locale
        }
        createVirOrder(permas).then(res => { 
          console.log(res, 'createVirOrder');
          if(res.success){
            CreateWallet({ id: this.chooseMac.machine_id+this.wallet_address } )
            .then(res1=> {
              if (res1.success) {
                console.log(`向${res1.content.wallet}转账${this.totalDbc}.${res1.content.nonce}DBC`);
                this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
                  confirmButtonText: this.$t('confirm'),
                  cancelButtonText:  this.$t('cancel'),
                  inputType:'password',
                  inputValue: this.passward
                })
                .then( ({ value }) => {
                  this.setPassWard(value)
                  console.log('transfer-Start');
                  transfer(res1.content.wallet, `${this.totalDbc}.${res1.content.nonce}`, value, (res2) => {
                    console.log(res2, 'transfer');
                    if(res2.success){
                      let permas = {
                        id: this.chooseMac.machine_id+this.wallet_address
                      }
                      rentmachine(permas).then(res3 => { 
                        if (!res3.success) {
                          this.$message({
                            showClose: true,
                            message: res3.msg,
                            type: "error",
                          });
                        } else {
                          let msg = this.$message({
                            showClose: true,
                            message: this.$t('virtual.tip4'),
                            type: "success",
                          });
                          this.dialogFormVisible = false
                          setTimeout(() => {
                            msg.close()
                            this.$router.push('/mymachine/myMachine_gpuVirtual')
                          }, 1000);
                        }
                        this.btnloading = false;
                        this.startConfirm = false;
                      })
                    }else{
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
                  console.log('取消下单');
                });
              } else {
                this.btnloading = false;
                this.startConfirm = false;
                this.$message({
                  showClose: true,
                  message: this.$t('virtual.tip6'),
                  type: "error",
                });
              }
            })
            .catch(() => {
              this.btnloading = false;
              this.startConfirm = false;
            })
          }else{
            this.btnloading = false;
            this.startConfirm = false;
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
          }
        })
      }
    }
  },
  components: {
    Header,
    Footer
  },
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
    margin-bottom: 40px;
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
  span.color{
    color: #f56c6c;
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
