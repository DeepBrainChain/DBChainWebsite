<template>
  <div class="gpuVirtual">
    <div class="title">
      <span>{{$t("myvirtual.title")}}：{{ orderNumber }} {{$t("myvirtual.tower")}}</span>
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
    <div class="table">
      <div class="tableli" v-for="el in Machine_info" :key="el.machine_id">
        <div class="li_list1">
          <div>
            <span class="Machine_id">{{$t('virtual.Machine_ID')}}: {{el.machine_id}}</span>
            <span class="time_left" v-if="el.orderStatus == 3">{{$t('myvirtual.time_left')}}: {{el.time_left}} </span>
          </div>
          <div class="countTime" v-if="el.orderStatus == 2">
            <div class="fs14"><span class="bold">{{$t('myvirtual.confirm_time')}}</span>: {{el.confirmTime}}</div>
            <div>{{$t('myvirtual.tip1')}}</div>
          </div>
          <div class="order_status fs14 bold">
            <span v-if="el.orderStatus == 2">待确认租用</span>
            <span v-if="el.orderStatus == 3">正在使用中</span>
            <span v-if="el.orderStatus == 4">订单结束</span>
            <span v-if="el.orderStatus == 5">订单取消</span>
          </div>
        </div>
        <div class="pay-wrap">
          <div><span>{{$t('gpu.payDBCs')}}</span>: {{el.dbc}}</div>
          <!-- <div><span>{{$t('gpu.gpuBilling')}}</span>: {{el.gpu_price?el.gpu_price:0}}$</div> -->
          <!-- <div><span>{{$t('memory_space')}}</span>: 0</div> -->
          <div><span>{{$t('gpu.userTime')}}</span>: {{el.userTime}}</div>
          <!-- <div><span>{{$t('gpu.actualPrice')}}</span>: {{el.Actual_cost}}</div> -->
          <!-- <div><span>{{$t('diskspace_remaining')}}</span>: 0</div> -->
          <!-- <div><span>{{$t('gpu.currentRemaining')}}</span>: 0</div> -->
          <!-- <div><span>{{$t('gpu.payPrice')}}</span>: {{ Math.round(el.dbc_price* 1000000)/1000000}}$</div> -->
        </div>
        <div class="li_list2">
          <span class="bold">{{$t('virtual.GPU_Num')}}: {{el.gpu_num}}</span>
          <span class="bold">{{$t('virtual.GPU_memory')}}: {{el.gpu_mem}}G</span>
          <span class="width30 bold">{{$t('virtual.GPU_type')}}: {{el.gpu_type}}</span>
          <span class="width30 bold">{{$t('virtual.Daily_Rent')}}: 
            <i class="color"> {{getnum2(Number(el.calc_point)/100*0.028229)}}$≈{{getnum2(Number(el.calc_point)/100*0.028229/dbc_price)}}DBC </i>
          </span>
          <span>{{$t('virtual.Country')}}: {{el.country}}</span>
          <span>{{$t('virtual.City')}}: {{el.city}}</span>
          <!-- <span>
            {{$t('virtual.lable_two2')}}: 
            <i :title="el.machine_owner" v-if='!el.machine_name'>{{String(el.machine_owner).substring(0,10)+'...'}}</i>
            <i :title="el.machine_owner" v-else>{{el.machine_name}}</i> 
          </span> 
          <span>{{$t('virtual.Cumulative_DBC_rent')}}: {{getnum1(el.total_rent_fee)}}</span> -->
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
          <span class="width40">{{$t('virtual.CPU_type')}}: {{el.cpu_type}}</span>
        </div>
        <div class="virtual" v-if="el.virtual_info&&el.virtual_info.length">
          <div class="v-list"  v-for="item in el.virtual_info" :key="item.task_id">
            <div class="li-top">
              <div class="left fs14"><span class="bold">{{$t('myvirtual.virId')}}</span>: {{item.task_id}}</div>
              <div v-if="item.status == 'creating'">创建中,请在5~10分钟后点击查看虚拟机按钮，查看创建结果</div>
              <div v-else-if="item.status == 'create error'">创建失败</div>
              <div v-else>
                <el-button
                  plain
                  class="tool-btn"
                  size="mini"
                  v-if="el.orderStatus == 3 || el.orderStatus == 2 "
                  @click="reboot(el)"
                  :loading='el.btnloading3'
                  >{{ $t("myvirtual.reboot") }}</el-button
                >
                <!-- <el-button
                  plain
                  class="tool-btn"
                  size="mini"
                  v-if="el.orderStatus == '正在使用中' || el.orderStatus == '待确认支付' "
                  @click="reset(el)"
                  >{{ $t("myvirtual.reset") }}</el-button
                >
                <el-button
                  plain
                  class="tool-btn"
                  size="mini"
                  v-if="el.orderStatus == '正在使用中' || el.orderStatus == '待确认支付' "
                  @click="operateVirtual('revise', el)"
                  >{{ $t("myvirtual.change") }}</el-button
                > -->
              </div>
            </div>
            <div v-if="item.status == 'running'"  class="li-bottom">
              <span>{{$t('myvirtual.mirror_name')}}: ubuntu.qcow2</span>
              <span>{{$t('myvirtual.IP_address')}}: {{item.ssh_ip}}</span>
              <span>{{$t('myvirtual.user_name')}}: {{item.user_name}}</span>
              <span>{{$t('myvirtual.password')}}: {{item.login_password}}</span>
              <span>{{$t('myvirtual.ssh_port')}}: {{item.ssh_port}}</span>
              <!-- <span>{{$t('myvirtual.port_range')}}: 600~6000</span> -->
              <span>{{$t('myvirtual.vir_mem')}}: {{item.mem_size}}</span>
              <span >{{$t('myvirtual.vir_sys')}}: {{item.disk_system}}</span>
              <span>{{$t('myvirtual.vir_data')}}: {{item.disk_data}}</span>
              <span>{{$t('myvirtual.vir_gpu_num')}}: {{item.gpu_count}}</span>
              <span >{{$t('myvirtual.vir_cpu_num')}}: {{item.cpu_cores}}</span>
            </div>
          </div>
        </div>
        <div class="tools-head">
          <div class="l-wrap">
            <!-- {{$t('myvirtual.tip2')}} -->
          </div>
          <div class="r-warp">
            <!-- <el-tooltip
              class="item"
              effect="dark"
              :content="null"
            >
              <el-button
                plain
                class="tool-btn"
                style="width: 90px"
                size="mini"
                >{{ $t("unsubscribe") }}</el-button
              >
            </el-tooltip> -->
            <el-button
              plain
              class="tool-btn"
              size="mini"
              :loading='el.btnloading1'
              v-if="el.orderStatus == 2"
              @click="Confirm_rental(el)"
              >{{ $t("myvirtual.Confirm_rental") }}</el-button
            >
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
              v-if="el.orderStatus == 3 || el.orderStatus == 2"
              @click="operateVirtual('create', el)"
              >{{ $t("myvirtual.Build") }}</el-button
            >
            <el-button
              plain
              class="tool-btn"
              size="mini"
              :loading='el.btnloading4'
              @click="SeeVirtual(el)"
              >{{ $t("myvirtual.SeeVirtual") }}</el-button
            >
            <!-- <el-button
              plain
              class="tool-btn"
              size="mini"
              @click="orderDetails(el)"
              >{{ $t("myvirtual.order_details") }}</el-button
            > -->
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
    <!--    bindMail-dlg-->
    <dlg-mail
      :open.sync="dlgMail_open"
      :is-new-mail="isNewMail"
      @binding="binding"
      @fail="bindFail"
    ></dlg-mail>

    <!-- 续费 -->
    <el-dialog width='30%' :title="$t('myvirtual.Renew')" :visible.sync="dialogFormVisible">
      <div>
        <p><span class="bold">{{$t('myvirtual.time_left')}}:</span> {{time_left}}</p>
      </div>
      <div class="useTime">
        <div>
          <span class="bold">{{$t('myvirtual.renew_time')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="useTime" @change="inputNum" :min="1" :max="90"></el-input-number>
           {{$t('day')}}
        </div>
        <div>{{$t('virtual.Daily_Rent')}}: <span class="color">{{getnum2(Number(chooseMac.calc_point)/100*0.028229)}}$≈{{getnum2(Number(chooseMac.calc_point)/100*0.028229/dbc_price)}}DBC</span></div>
      </div>
      <div class="fs12">{{$t('myvirtual.tip6')}}</div>
      <div>
        <p><span class="bold">{{$t('myvirtual.balance')}}:</span> {{balance}} DBC</p>
        <p><span class="bold">{{$t('virtual.total')}}:</span> {{totalMoney}} $</p>
        <p><span class="bold">{{$t('virtual.equivalent')}}:</span> {{totalDbc}}</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="batch" size="mini" plain :loading='btnloading'  @click="confirmRenew">{{$t('virtual.confirm')}}</el-button>
        <el-button class="batch" size="mini" plain  @click="dialogFormVisible = false">{{$t('virtual.cancal')}}</el-button>
      </div>
    </el-dialog>

    <!-- 创建、修改 虚拟机 -->
    <el-dialog width='30%' :title="title" :visible.sync="dialogFormVisible1">
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.vir_mem')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="vir_mem" :min="1" :max="max_vir_mem" :step="1"></el-input-number> G
        </div>
        <div>{{$t('myvirtual.max_set')}}: {{max_vir_mem}}G</div>
      </div>
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.vir_cpu_num')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="vir_cpu_num" :min="4" :max="Number(max_cpu_num - max_cpu_num%4)" :step="4" step-strictly></el-input-number>
        </div>
        <div>{{$t('myvirtual.max_set')}}: {{max_cpu_num}}</div>
      </div>
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.vir_gpu_num')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="vir_gpu_num" :min="1" :max="Number(max_gpu_num)"></el-input-number>
        </div>
        <div>{{$t('myvirtual.max_set')}}: {{max_gpu_num}}</div>
      </div>
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.vir_data')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="vir_disk_size" :min="1" :max="Number(max_disk_num)"></el-input-number> G
        </div>
        <div>{{$t('myvirtual.max_set')}}: {{max_disk_num}}G</div>
      </div>
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.port_range')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="port_range" :min="5000" :max="6000"></el-input-number>
        </div>
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
      <!-- <div class="useTime">
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
      <div slot="footer" class="dialog-footer">
        <el-button class="batch" size="mini" plain :loading='btnloading1' @click="Createvirtual">{{$t('myvirtual.Confirm_create')}}</el-button>
        <el-button class="batch" size="mini" plain @click="dialogFormVisible1 = false">{{$t('virtual.cancal')}}</el-button>
      </div>
    </el-dialog>

    <!-- 重置密码 -->
    <el-dialog width='30%' :title="$t('myvirtual.reset')" :visible.sync="dialogFormVisible2">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
        <el-form-item :label="$t('myvirtual.pass1')" prop="pass">
          <el-input class="ruleForm_input" type="password" v-model="ruleForm.pass" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('myvirtual.pass2')" prop="checkPass">
          <el-input class="ruleForm_input" type="password" v-model="ruleForm.checkPass" show-password autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="batch" size="mini" plain :loading='btnloading2' @click="dialogFormVisible2 = false">{{$t('confirm')}}</el-button>
        <el-button class="batch" size="mini" plain  @click="resetForm('ruleForm')">{{$t('virtual.cancal')}}</el-button>
      </div>
    </el-dialog>
    <!-- 订单详情 -->
    <el-dialog width='50%' :title="$t('myvirtual.details')" :visible.sync="dialogFormVisible3">
      <div class="order_list">
        <div class="order_li">
          <div class="li-left">
            <div><span>{{$t('myvirtual.renewal_time')}}</span>: 7 {{$t('day')}}</div>
            <div><span>{{$t('gpu.payDBCs')}}</span>: 0</div>
            <div><span>{{$t('gpu.userTime')}}</span>: 0</div>
            <div><span>{{$t('memory_space')}}</span>: 0</div>
            <div><span>{{$t('gpu.actualPrice')}}</span>: 0</div>
            <div><span>{{$t('gpu.gpuBilling')}}</span>: 0</div>
            <div><span>{{$t('diskspace_remaining')}}</span>: 0</div>
            <div><span>{{$t('gpu.currentRemaining')}}</span>: 0</div>
            <div><span>{{$t('gpu.payPrice')}}</span>: 0</div>
          </div>
          <div class="li-right">
            <el-button
              plain
              class="tool-btn"
              size="mini"
              @click="refund"
              >{{ $t("myvirtual.refund") }}</el-button
            >
          </div>
        </div>
        <div class="order_li">
          <div class="li-left">
            <div><span>{{$t('myvirtual.renewal_time')}}</span>: 7 {{$t('day')}}</div>
            <div><span>{{$t('gpu.payDBCs')}}</span>: 0</div>
            <div><span>{{$t('gpu.userTime')}}</span>: 0</div>
            <div><span>{{$t('memory_space')}}</span>: 0</div>
            <div><span>{{$t('gpu.actualPrice')}}</span>: 0</div>
            <div><span>{{$t('gpu.gpuBilling')}}</span>: 0</div>
            <div><span>{{$t('diskspace_remaining')}}</span>: 0</div>
            <div><span>{{$t('gpu.currentRemaining')}}</span>: 0</div>
            <div><span>{{$t('gpu.payPrice')}}</span>: 0</div>
          </div>
          <div class="li-right">
            <el-button
              plain
              class="tool-btn"
              size="mini"
              @click="refund"
              >{{ $t("myvirtual.refund") }}</el-button
            >
          </div>
        </div>
      </div>
      <div class="paging">
        <el-pagination
          :current-page="currentPage1"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pageSize1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total1"
          @size-change="handleChangepageSize1"
          @current-change="handleCurrentChang1"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cookie from "js-cookie";
import BigNumber from "bignumber.js";
import DlgMail from "@/components/machine/dlg_bindMail";
import {
  queryBindMail_rent,
  binding_is_ok,
  binding_is_ok_modify,
  send_email_repeat,
  dbc_info,
  get_Virtual,
  Create_VMS,
  VMS_details,
  CreateWallet,
  ConFirm_Rent,
  Renew_Rent,
  VMS_restart
} from "@/api";

import {
  getAccount,
  getBalance,
  getUsdToRmb,
  randomWord
} from "@/utlis";
import { transfer, getAccountBalance } from '@/utlis/dot/api';
import { getCurrentPair, CreateSignature } from "@/utlis/dot"
import { mapState, mapMutations } from "vuex"
export default {
  name: "myMachine_unlock_gpuVirtual",
  components: {
    DlgMail,
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('myvirtual.pass3')));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('myvirtual.pass4')));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error(this.$t('myvirtual.pass5')));
      } else {
        callback();
      }
    };
    return {
      usdToRmb: getUsdToRmb(),
      styleHidden: {},
      dlgMail_open: false,
      isNewMail: false,
      isBinding: false,
      bindMail: "",
      si: undefined,
      send_email_repeatLoading: false,
      send_email_repeat_index: -1,
      wallet_address: (getAccount() && getAccount().address) || (getCurrentPair() && getCurrentPair().address),
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
      totalDbc: 0,
      time_left: '0h0m',
      btnloading: false,
      btnloading1: false,
      btnloading2: false,
      btnloading3: false,
      // 创建、修改 虚拟机
      title:'',
      dialogFormVisible1: false,
      vir_mem: 0.1,
      vir_cpu_num: 4,
      vir_gpu_num: 1,
      vir_disk_size: 1,
      max_vir_mem: 0,
      max_cpu_num: 0,
      max_gpu_num: 0,
      max_disk_num: 0,
      port_range: 5000,
      port_min: 6000,
      port_max: 60000,
      vnc_port: 5900,
      Vir_info: [],
      // 充值密码
      dialogFormVisible2: false,
      ruleForm: {
        pass: '',
        checkPass: '',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      // 订单详情
      dialogFormVisible3: false,
    };
  },

  watch: {
    "$i18n.locale"() {
      
    },
  },
  beforeMount() {
    if (this.$t("website_name") === "congTuCloud") {
      this.styleHidden.visibility = "hidden";
    }
    dbc_info().then( res => {
      this.dbc_price = res.content.dbc_price
    })
  },
  activated() {
    // this.binding(isNewMail);
    clearInterval(this.si);
    this.queryMail();
    this.stopInter()
    this.getMyVirtual();
    this.si = setInterval( ()=> {
      this.getMyVirtual()
    }, 60000)
  },
  deactivated() {
    if (this.queryOrderListSi) {
      clearInterval(this.queryOrderListSi);
    }
    if (this.si) {
      clearInterval(this.si);
    }
    this.stopInter()
  },

  computed: {
    ...mapState(["isNewWallet", "passward"]),
  },
  methods: {
    ...mapMutations(['setPassWard']),
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
      console.log(this.wallet_address, 'this.wallet_address');
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
      return num1.substring(0,num1.indexOf(".")+3);
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
        loadingInstance = this.$loading({target:'.gpuVirtual'});
      }
      get_Virtual({ wallet: this.wallet_address }).then( async res => {
        for(let i = 0; i< res.content.length; i++){
          let nowTime = + new Date();
          let startTime = res.content[i].createTime
          let endTime = ''
          if (res.content[i].orderStatus == 5) {
            endTime = startTime + 30*60*1000
          } else {
            endTime = startTime + res.content[i].day*24*60*60*1000
          }
          res.content[i].btnloading1 = false
          res.content[i].btnloading2 = false
          res.content[i].btnloading3 = false
          res.content[i].btnloading4 = false
          res.content[i].time = startTime
          if(endTime - nowTime > 0 ){
            res.content[i].time_left = this.minsToHourMins(Math.ceil((endTime - nowTime)/60000))
            res.content[i].userTime = this.minsToHourMins(Math.ceil((nowTime - res.content[i].time)/60000))
            res.content[i].Actual_cost = Math.ceil((Number(res.content[i].dbc)/Number(res.content[i].day)/24/60)*((nowTime - res.content[i].time)/60000))
          }else{
            res.content[i].time_left = '0h0m'
            res.content[i].userTime = this.minsToHourMins(Math.ceil((endTime - res.content[i].time)/60000))
            res.content[i].Actual_cost = res.content[i].dbc
          }
          res.content[i].confirmTime = (res.content[i].time+1800000 -nowTime)/1000
          if(this.firstLoading){
            res.content[i].virtual_info = []
          }else{
            if(this.Machine_info[i].virtual_info.length){
              res.content[i].virtual_info = this.Machine_info[i].virtual_info
            }else{
              res.content[i].virtual_info = []
            }
          }
        }
        if(this.firstLoading){
          loadingInstance.close();
        }
        this.firstLoading = false
        this.Machine_info = res.content
        this.orderNumber = res.content.length
        this.total = res.content.length
        this.Machine_info.map((el, index) => {
          if(el.confirmTime  > 0){
            this.count( el.confirmTime, index, (msg)=>{
              this.$set(this.Machine_info[index], 'confirmTime', msg)
            })
          }else{
            el.confirmTime = '00:00'
          }
        })
      })
    },
    handleChangepageSize(num) {
      this.pageSize = num
    },
    handleCurrentChang(num) {
      this.currentPage = num
    },

    // 确认租用
    Confirm_rental(el) {
      console.log(el, 'el');
      el.btnloading1 = true
      this.$confirm(this.$t('myvirtual.tip4'), this.$t('myvirtual.Confirm_rental'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        clearInterval(this.si);
        let perams = {
          id: el._id,
          machine_id: el.machine_id
        }
        ConFirm_Rent(perams).then(res => {
          console.log(res, 'res');
          this.getMyVirtual();
          this.si = setInterval( ()=> {
            this.getMyVirtual()
          }, 60000)
          el.btnloading1 = false
          this.$message({
            type: 'success',
            message: this.$t('myvirtual.rental_success')
          });
        })
        .catch((err)=>{
          this.si = setInterval( ()=> {
            this.getMyVirtual()
          }, 60000)
          this.$message({
            type: 'error',
            message: this.$t('myvirtual.rental_fails')
          });
          el.btnloading1 = false
        })
      }).catch(() => {
        el.btnloading1 = false
        this.$message({
          type: 'info',
          message: this.$t('cancel')
        });          
      });
    },
    // 续费
    async Renew(el) {
      // getBalance().then((res) => {
      //   this.balance = res.balance;
      // });
      el.btnloading2 = true
      this.unsubBalance = await getAccountBalance(this.wallet_address)
      this.balance = this.getnum1(this.unsubBalance.data.free)
      this.chooseMac = el
      this.useTime = 7
      this.time_left = this.chooseMac.time_left
      this.totalMoney = this.getnum2(Number(this.chooseMac.calc_point)/100*0.028229*this.useTime)
      this.totalDbc = Math.ceil(this.getnum2(Number(this.chooseMac.calc_point)/100*0.028229*this.useTime/this.dbc_price))
      el.btnloading2 = false
      this.dialogFormVisible = true
    },
    inputNum(val){
      this.totalMoney = this.getnum2(Number(this.chooseMac.calc_point)/100*0.028229*val)
      this.totalDbc = Math.ceil(this.getnum2(Number(this.chooseMac.calc_point)/100*0.028229*val/this.dbc_price))
    },
    confirmRenew(){
      this.btnloading = true;
      CreateWallet({ id: this.chooseMac.machine_id+this.wallet_address } ).then(res=> {
        if (res.success) {
          console.log(`向${res.content.wallet}转账${this.totalDbc}.${res.content.nonce}DBC`);
          this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
            confirmButtonText: this.$t('confirm'),
            cancelButtonText:  this.$t('cancel'),
            inputValue: this.passward
          })
          .then( ({ value }) => {
            this.setPassWard(value)
            transfer(res.content.wallet, `${this.totalDbc}.${res.content.nonce}`, value, (res1) => {
              console.log(res1, 'res');
              if(res1.success){
                let permas = {
                  id: this.chooseMac.machine_id+this.wallet_address,
                  machine_id: this.chooseMac.machine_id,
                  add_day: this.useTime,
                  dbc: this.totalDbc,
                  wallet: this.wallet_address
                }
                console.log(permas, 'permas');
                Renew_Rent(permas).then(res2 => {
                  console.log(res, 'res');
                  if (res2.success) {
                    this.getMyVirtual();
                    this.$message({
                      showClose: true,
                      message: this.$t('myvirtual.renew_success'),
                      type: "success",
                    });
                    this.btnloading = false;
                    this.dialogFormVisible = false
                  } else {
                    this.$message({
                      showClose: true,
                      message: res2.msg,
                      type: "error",
                    });
                    this.btnloading = false;
                    this.dialogFormVisible = false
                  }
                })
              }else{
                this.btnloading = false;
                this.$message({
                  showClose: true,
                  message: res1.msg,
                  type: "error",
                });
              }
            })
          }).catch(() => {
            this.btnloading = false;
            console.log(this.$t('cancel'));
          });
        } else {
          this.btnloading = false;
          this.$message({
            showClose: true,
            message: this.$t('virtual.tip6'),
            type: "error",
          });
        }
      })
    },
    // 创建、修改 虚拟机
    operateVirtual(str, data) {
      this.dialogFormVisible1 = true
      this.chooseMac = data
      let chooseVirtualMem = 0;
      let chooseVirtualCpu = 0;
      let chooseVirtualGpu = 0;
      let chooseVirtualDisk = 0;
      data.virtual_info.map(el => {
        chooseVirtualMem +=  parseFloat(el.mem_size)
        chooseVirtualCpu += el.cpu_cores
        chooseVirtualGpu += el.gpu_count
        chooseVirtualDisk += parseFloat(el.disk_size)
      })
      this.max_vir_mem = data.mem_num - chooseVirtualMem
      this.max_cpu_num = data.cpu_core_num - chooseVirtualCpu
      this.max_gpu_num = data.gpu_num - chooseVirtualGpu
      this.max_disk_num = data.sys_disk - chooseVirtualDisk
      if(str == 'create'){
        this.title = this.$t('myvirtual.Build')
      }else{
        this.title = this.$t('myvirtual.change')
      }
    },
    Createvirtual(){
      this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText:  this.$t('cancel'),
        inputValue: this.passward
      })
      .then( async ({ value }) => {
        try {
          let nonce = await randomWord()
          let sign = await CreateSignature(nonce, value)
          this.btnloading1 = true
          let perams = {
            id: this.chooseMac._id,
            machine_id: this.chooseMac.machine_id,
            ssh_port: this.port_range,
            // ssh_port: `${this.port_min}~${this.port_max}`,
            gpu_count: this.vir_gpu_num,
            cpu_cores: this.vir_cpu_num,
            mem_rate: this.vir_mem,
            disk_size: this.vir_disk_size,
            vnc_port: this.vnc_port,
            nonce: nonce,
            sign: sign,
            wallet: this.wallet_address
          }
          Create_VMS(perams).then( res=> {
            console.log(res ,'res');
            if(res.success){
              this.$message.success(this.$t('myvirtual.Build_success'))
            }else{
              this.$message.error(this.$t('myvirtual.Build_fails'))
            }
            this.btnloading1 = false
            this.dialogFormVisible1 = false
          })
        } catch (err) {
          this.$message({
            showClose: true,
            message: err.message,
            type: "error",
          });
        }
      })
      .catch( err => {
        console.log(err, 'err');
      })
    },
    SeeVirtual(el) {
      console.log(el, 'el')
      el.virtual_info = []
      el.btnloading4 = true
      this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText:  this.$t('cancel'),
        inputValue: this.passward
      })
      .then( async ({ value }) => {
        try {
          let nonce = await randomWord()
          let sign = await CreateSignature(nonce, value)
          let VMS_Info = await VMS_details({ id: el._id, machine_id: el.machine_id, nonce, sign, wallet: this.wallet_address })
          this.setPassWard(value)
          if(VMS_Info.success){
            if (!VMS_Info.content.length) {
              this.$message.error('该机器未创建虚拟机')
            } else {
              el.virtual_info = VMS_Info.content
            }
          }else{
            this.$message.error(VMS_Info.msg)
          }
          el.btnloading4 = false
        } catch (err) {
          el.btnloading4 = false
          this.$message({
            showClose: true,
            message: err.message,
            type: "error",
          });
        }
      })
      .catch( err => {
        el.btnloading4 = false
        console.log(err, 'err');
      })
    },
    // 重启虚拟机
    reboot(el) {
      el.btnloading3 = true
      this.$confirm(this.$t('myvirtual.tip5'), this.$t('myvirtual.reboot'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        VMS_restart({machine_id: el.machine_id, only_key: el.id}).then( res => {
          if(res.result_code != 0){
            this.$message({
              type: 'error',
              message: res.result_message
            });
          }else{
            this.$message({
              type: 'success',
              message: this.$t('myvirtual.reboot_success')
            });
          }
          el.btnloading3 = false
        })
      }).catch(() => {
        el.btnloading3 = false
        this.$message({
          type: 'info',
          message: this.$t('cancel')
        });          
      });
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
    // 订单详情
    orderDetails() {
      this.dialogFormVisible3 = true
    },
    handleChangepageSize1(num) {
      this.pageSize1 = num
    },
    handleCurrentChang1(num) {
      this.currentPage1 = num
    },
    refund() {
      this.$message.success('退币成功')
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
    font-size: 12px;
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
    }
    .li_list2{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 12px 10px 0;
      border-top: 1px solid #e1e6ec;
      border-bottom: 1px solid #e1e6ec;
      span{
        width: 20%;
        margin-bottom: 12px;
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
    .virtual{
      padding: 10px 20px;
      border-bottom: 1px solid #e1e6ec;
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
</style>
