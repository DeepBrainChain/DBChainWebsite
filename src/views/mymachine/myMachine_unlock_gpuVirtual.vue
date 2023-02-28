<template>
  <div class="gpuVirtual">
    <div class="title">
      <span>{{$t("myvirtual.title")}}：{{ orderNumber }} {{$t("myvirtual.tower")}}</span>
    </div>
    <div class="table">
      <div class="tableli" v-for="el in Machine_info" :key="el.machine_id">
        <div class="li_list1">
          <div>
            <span class="Machine_id">{{$t('virtual.Machine_ID')}}: {{el.machine_id}}</span>
            <span class="time_left" v-if="el.orderStatus == 3">{{$t('myvirtual.time_left')}}: {{el.time_left}} </span>
          </div>
          <div v-if="el.orderStatus == 4">
            <div v-if="!el.hasdelectVm" class="fs14"><span class="bold">{{$t('myvirtual.vmdelectTime')}}</span>: {{el.vmdelectTime}}</div>
            <div v-else class="fs14"><span class="bold">{{$t('myvirtual.vmdelect')}}</span></div>
          </div>
          <div class="countTime" v-if="el.orderStatus == 2">
            <div class="fs14"><span class="bold">{{$t('myvirtual.confirm_time')}}</span>: {{el.confirmTime}}</div>
            <div>{{$t('myvirtual.tip1')}}</div>
          </div>
          <div class="order_status fs14 bold">
            <span v-if="el.orderStatus == 2">{{$t('myvirtual.status1')}}</span>
            <span v-if="el.orderStatus == 3">{{$t('myvirtual.status2')}}</span>
            <span v-if="el.orderStatus == 4">{{$t('myvirtual.status3')}}</span>
            <span v-if="el.orderStatus == 5">{{$t('myvirtual.status4')}}</span>
            <span v-if="el.orderStatus == 6">{{$t('myvirtual.status5')}}</span>
          </div>
        </div>
        <div class="pay-wrap">
          <div><span>{{$t('gpu.payDBCs')}}</span>: {{el.dbc}}</div>
          <!-- <div><span>{{$t('gpu.gpuBilling')}}</span>: {{el.gpu_price?el.gpu_price:0}}$</div> -->
          <!-- <div><span>{{$t('memory_space')}}</span>: 0</div> -->
          <div><span>{{$t('gpu.userTime')}}</span>: {{el.userTime}}</div>
          <div class="color" v-show="el.report_be_punish">{{$t('myvirtual.mac_err_tip3')}}</div>
          <div class="color" v-show="el.reportErr == 'ending-over'">{{$t('myvirtual.mac_err_tip4')}}</div>
          <!-- <div><span>{{$t('gpu.actualPrice')}}</span>: {{el.Actual_cost}}</div> -->
          <!-- <div><span>{{$t('diskspace_remaining')}}</span>: 0</div> -->
          <!-- <div><span>{{$t('gpu.currentRemaining')}}</span>: 0</div> -->
          <!-- <div><span>{{$t('gpu.payPrice')}}</span>: {{ Math.round(el.dbc_price* 1000000)/1000000}}$</div> -->
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
          <span v-if="el.server_room" :title="el.server_room">{{$t('virtual.Room_number')}}: {{String(el.server_room).substring(0,10)+'...'}}</span>
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
          <span class="width40">{{$t('virtual.CPU_type')}}: {{el.cpuType}}</span>
        </div>
        <div class="virtual" v-if="el.virtual_info&&el.virtual_info.length">
          <div class="v-list"  v-for="item in el.virtual_info" :key="item.task_id">
            <div class="li-top">
              <div class="left fs14"><span class="bold">{{$t('myvirtual.virId')}}</span>: {{item.task_id}}</div>
              <div>
                <span v-show="item.status == 'closed'">{{$t('myvirtual.vir_status')}}</span>
                <span v-show="item.status == 'creating'">{{$t('myvirtual.vir_status1')}}</span>
                <span v-show="item.status == 'running'">{{$t('myvirtual.vir_status2')}}</span>
                <span v-show="item.status == 'starting'">{{$t('myvirtual.vir_status3')}}</span>
                <span v-show="item.status == 'being poweroff'">{{$t('myvirtual.vir_status4')}}</span>
                <span v-show="item.status == 'restarting'">{{$t('myvirtual.vir_status5')}}</span>
                <span v-show="item.status == 'resetting'">{{$t('myvirtual.vir_status6')}}</span>
                <span v-show="item.status == 'start error'">{{$t('myvirtual.vir_status7')}}</span>
                <span v-show="item.status == 'restart error'">{{$t('myvirtual.vir_status8')}}</span>
                <span v-show="item.status == 'pm_suspended'">{{$t('myvirtual.vir_status9')}}</span>
              </div>
              <div v-if="item.status == 'creating'">{{$t('myvirtual.create_status1')}}</div>
              <div v-else-if="item.status == 'create error'">
                <span>{{$t('myvirtual.create_status2')}}</span>
                <el-button
                  plain
                  class="tool-btn"
                  style="margin-left: 10px"
                  size="mini"
                  v-if="el.orderStatus == 3"
                  @click="delect(item, el)"
                  >{{ $t("myvirtual.delect") }}</el-button
                >
              </div>
              <div v-else>
                <el-button
                  plain
                  class="tool-btn"
                  size="mini"
                  v-if="el.orderStatus == 3 && item.status == 'running'"
                  @click="stopVir(item, el)"
                  >{{ $t("myvirtual.stop") }}</el-button
                >
                <el-button
                  plain
                  class="tool-btn"
                  size="mini"
                  v-if="el.orderStatus == 3 && item.status == 'closed' || item.status == 'start error' || item.status == 'pm_suspended'"
                  @click="startVir(item, el)"
                  >{{ $t("myvirtual.start") }}</el-button
                >
                <el-button
                  plain
                  class="tool-btn"
                  size="mini"
                  v-if="el.orderStatus == 3 && item.status == 'running'"
                  @click="reboot(item, el)"
                  >{{ $t("myvirtual.reboot") }}</el-button
                >
                <el-button
                  plain
                  class="tool-btn"
                  size="mini"
                  v-if="el.orderStatus == 3 || el.orderStatus == 2"
                  @click="delect(item, el)"
                  >{{ $t("myvirtual.delect") }}</el-button
                >
                <el-button
                  plain
                  class="tool-btn"
                  size="mini"
                  v-if="el.orderStatus == 3 && item.status == 'running'"
                  @click="reset(item, el)"
                  >{{ $t("myvirtual.reset") }}</el-button
                >
                <el-button
                  plain
                  class="tool-btn"
                  size="mini"
                  v-if="el.orderStatus == 3"
                  @click="changeDisk(item, el)"
                  >{{ $t("myvirtual.editDisk") }}</el-button
                >
                <el-button
                  plain
                  class="tool-btn"
                  size="mini"
                  v-if="el.orderStatus == 3"
                  @click="operateVirtual1(el, item)"
                  >{{ $t("myvirtual.change") }}</el-button
                >
              </div>
            </div>
            <div v-if="item.status == 'running'"  class="li-bottom">
              <p>{{$t('myvirtual.mirror_name')}}: {{item.images}}</p>
              <p>{{$t('myvirtual.IP_address')}}: {{item.ssh_ip}}<span class="copy" @click="CopyTx(item.ssh_ip)"></span></p>
              <p v-show="item.network_sec">{{$t('myvirtual.security')}}: {{item.network_sec}}</p>
              <p>{{$t('myvirtual.user_name')}}: {{item.user_name}}<span class="copy" @click="CopyTx(item.user_name)"></span></p>
              <p>{{$t('myvirtual.password')}}: {{item.login_password}}<span class="copy" @click="CopyTx(item.login_password)"></span></p>
              <p v-if="item.os == 'linux'">{{$t('myvirtual.ssh_port')}}: {{item.ssh_port}}</p>
              <p v-if="item.os != 'linux'">{{$t('myvirtual.rdp_port')}}: {{item.rdp_port? item.rdp_port: ''}}</p>
              <p>{{$t('myvirtual.vir_mem')}}: {{item.mem_size}}</p>
              <template v-for="diskitem in item.disks">
                <p v-if="diskitem.name == 'vda'" :key="diskitem.name">{{$t('myvirtual.vir_sys')}}{{diskitem.name}}: {{diskitem.size}}</p>
                <p v-else>{{$t('myvirtual.vir_data')}}{{diskitem.name}}: {{diskitem.size}}</p>
              </template>
              <p>{{$t('myvirtual.vir_gpu_num')}}: {{item.gpu_count}}</p>
              <p >{{$t('myvirtual.vir_cpu_num')}}: {{item.cpu_cores}}</p>
              <p >{{$t('myvirtual.vnc_port')}}: {{item.vnc_port}}</p>
              <p v-if="item.network_Id&&item.network_filters&&item.network_filters.length">
                {{$t('myvirtual.securityPort')}}: 
                <span v-for="(filters, idx) in item.network_filters" :key="idx">
                  <span v-show='idx != 0'>/</span>{{filters.split(',')[2]}}
                </span>
              </p>
              <p v-else>{{$t('myvirtual.open_port_range')}}: {{item.port_min}} - {{item.port_max}}</p>
              <p >{{$t('myvirtual.mac_address')}}: 
                <template v-if="item.interface.length">
                  <span v-for="(mac, idx) in item.interface" :key="idx">
                    <span v-show='idx != 0'>/</span>{{mac.mac_address}}
                  </span>
                </template>
              </p>
              <p>{{$t('myvirtual.local_address')}}: {{item.local_address? item.local_address.toString(): ''}}</p>
            </div>
          </div>
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
              :loading='el.btnloading6'
              v-if="el.orderStatus == 3 && el.reportErr !='ending-over' && el.reportErr !='processing'"
              @click="mac_err(el)"
              >{{ $t("myvirtual.mac_err") }}</el-button
            >
            <el-button
              plain
              class="tool-btn"
              size="mini"
              :loading='el.btnloading6'
              v-if="el.reportErr =='processing'"
              @click="mac_err_cancel(el)"
              >{{ $t("myvirtual.mac_err_cancel") }}</el-button
            >
            <el-button
              plain
              class="tool-btn"
              size="mini"
              :loading='el.btnloading7'
              v-if="el.orderStatus == 3 && el.reportErr =='processing' && el.submitInfo"
              @click="mac_err_submsg(el)"
              >{{ $t("myvirtual.mac_err_submsg") }}</el-button
            >
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
              :loading='el.btnloading5'
              v-if="el.orderStatus == 3"
              @click="clearMem(el)"
              >{{ $t("myvirtual.clearMem") }}</el-button
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
    <!-- 续费 -->
    <el-dialog width='30%' :title="$t('myvirtual.Renew')" :visible.sync="dialogFormVisible">
      <div>
        <p><span class="bold">{{$t('myvirtual.time_left')}}:</span> {{time_left}}</p>
      </div>
      <div class="useTime">
        <div>
          <span class="bold">{{$t('myvirtual.renew_time')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="useTime" @change="inputNum" :min="1" :max="timeMax"></el-input-number>
           {{$t('day')}}
        </div>
        <div>{{$t('virtual.Daily_Rent')}}: <span class="color">{{getnum2(Number(chooseMac.calc_point)/100*GPUPointPrice * (1 + DBCPercentage))}}$≈{{getnum2(Number(chooseMac.calc_point)/100*GPUPointPrice * (1 + DBCPercentage)/dbc_price)}}DBC</span></div>
      </div>
      <div class="fs12">{{$t('myvirtual.tip6')}}</div>
      <div>
        <p><span class="bold">{{$t('myvirtual.balance')}}:</span> {{balance}} DBC</p>
        <p><span class="bold">{{$t('virtual.total')}}:</span> {{totalMoney}} $</p>
        <p><span class="bold">{{$t('virtual.equivalent')}}:</span> {{totalDbc}}</p>
      </div>
      <div v-show="startConfirm">
        <p style="color: #f56c6c;">{{$t('responseTip')}}</p>
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
          <span class="width12 bold">{{$t('myvirtual.operation')}}: </span>
          <el-select class='select' v-model="operation_system" size='mini' @change='changeOp' placeholder="choose">
            <el-option label='windows' value='windows'></el-option>
            <el-option label='linux' value='linux'></el-option>
          </el-select>
        </div>
      </div>
      <!-- <div class="fs12">
        {{$t('myvirtual.tip11')}}
      </div> -->
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.mirror_name')}}: </span>
          <el-select class='select' v-model="image_name" size='mini' @change='Selectimage' placeholder="choose">
            <el-option
              v-for="(item, index) in optiondefault"
              :key="index"
              :label="item.image_name"
              :value="item.image_name">
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 添加安全组 -->
      <div class="useTime" v-if="iplist.length">
        <div>
          <span class="width12 bold">{{$t('security.name')}}: </span>
          <el-select class='select' v-model="network_sec" size='mini' @change='SelectSecurity' placeholder="choose">
            <el-option
              v-for="(item, index) in security"
              :key="index"
              :label="item.SGname"
              :value="item.SGname">
            </el-option>
            <el-option :label="$t('myvirtual.label3')" value=""></el-option>
          </el-select>
        </div>
      </div>
      <div class="useTime" v-if="iplist.length">
        <div>
          <span class="width12 bold">{{$t('myvirtual.publicIp')}}: </span>
          <el-select class='select' v-model="public_ip" size='mini' @change='chooseIp' placeholder="choose">
            <el-option
              v-for="(item, index) in iplist"
              :key="index"
              :label="item.ip"
              :value="item.ip"
              :disabled="item.disabled">
            </el-option>
            <el-option :label="$t('myvirtual.label4')" value=""></el-option>
          </el-select>
        </div>
      </div>
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
          <el-input-number :precision="0" size="mini" v-model="vir_cpu_num" :min="2" :max="Number(max_cpu_num - max_cpu_num%2)" :step="2" step-strictly></el-input-number>
        </div>
        <div>{{$t('myvirtual.max_set')}}: {{max_cpu_num}}</div>
      </div>
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.vir_gpu_num')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="vir_gpu_num" :min="0" :max="Number(max_gpu_num)"></el-input-number>
        </div>
        <div>{{$t('myvirtual.max_set')}}: {{max_gpu_num}}</div>
      </div>
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.vir_data')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="vir_disk_size" :min="0" :max="Number(max_disk_num)"></el-input-number> G
        </div>
        <div>{{$t('myvirtual.max_set')}}: {{max_disk_num}}G</div>
      </div>
      <div class="useTime" v-show='!is_ubunto'>
        <div>
          <span class="width12 bold">{{$t('myvirtual.ssh_port')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="port_range" :min="5600" :max="5899" @change="sshportChange"></el-input-number>
        </div>
      </div>
      <div class="useTime" v-show='is_ubunto'>
        <div>
          <span class="width12 bold">{{$t('myvirtual.rdp_port')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="rdp_port" :min="5600" :max="5899" @change="rdpportChange"></el-input-number>
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
          <el-input-number :precision="0" size="mini" v-model="vnc_port" :min="5900" :max="5999" @change="vncportChange"></el-input-number>
        </div>
      </div>
      <div class="fs12">
        {{$t('myvirtual.tip9')}}
      </div>
      <div class="useTime" v-if="network_sec == ''">
        <div>
          <span class="width12 bold">{{$t('myvirtual.open_port_range')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="port_min" :min="6000" :max="port_max-1"></el-input-number>
           -
          <el-input-number :precision="0" size="mini" v-model="port_max" :min="port_min+1" :max="60000"></el-input-number>
        </div>
      </div>
      <div class="fs12" v-if="network_sec == ''">
        {{$t('myvirtual.tip7')}}
      </div>
      <!-- <div class="useTime">
        <div style="align-items: center; display: flex">
          <span class="width12 bold">{{$t('myvirtual.multicast')}}: </span>
          <el-input
            type="textarea"
            autosize
            style="width: 250px"
            size="mini"
            placeholder="224.0.0.0,239.255.255.255"
            v-model="multicast">
          </el-input>
        </div>
      </div>
      <div class="fs12">
        {{$t('myvirtual.tip12')}}
      </div> -->
      <div slot="footer" class="dialog-footer">
        <el-button class="batch" size="mini" plain :loading='btnloading1' @click="Createvirtual">{{$t('myvirtual.Confirm_create')}}</el-button>
        <el-button class="batch" size="mini" plain @click="dialogFormVisible1 = false;btnloading1 = false">{{$t('virtual.cancal')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog width='30%' :title="title" :visible.sync="dialogFormVisible4">
      <!-- 修改安全组 -->
      <div class="useTime" v-if="iplist.length">
        <div>
          <span class="width12 bold">{{$t('security.name')}}: </span>
          <el-select class='select' v-model="edit_network_sec" size='mini' @change='SelectSecurity' placeholder="choose">
            <el-option
              v-for="(item, index) in security"
              :key="index"
              :label="item.SGname"
              :value="item.SGname">
            </el-option>
            <el-option :label="$t('myvirtual.label2')" value=""></el-option>
          </el-select>
        </div>
      </div>
      <div class="useTime" v-if="iplist.length">
        <div>
          <span class="width12 bold">{{$t('myvirtual.publicIp')}}: </span>
          <el-select class='select' v-model="edit_public_ip" size='mini' @change='chooseIp' placeholder="choose">
            <el-option
              v-for="(item, index) in iplist"
              :key="index"
              :label="item.ip"
              :value="item.ip"
              :disabled="item.disabled">
            </el-option>
            <el-option :label="$t('myvirtual.label1')" value=""></el-option>
          </el-select>
        </div>
      </div>
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
          <el-input-number :precision="0" size="mini" v-model="edit_vir_gpu_num" :min="0" :max="Number(max_gpu_num)"></el-input-number>
        </div>
        <div>{{$t('myvirtual.max_set')}}: {{max_gpu_num}}</div>
      </div>
      <div class="useTime" v-show='edit_is_ubunto'>
        <div>
          <span class="width12 bold">{{$t('myvirtual.ssh_port')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="edit_port_range" :min="5600" :max="5899" @change="sshportChange"></el-input-number>
        </div>
      </div>
      <div class="useTime" v-show='!edit_is_ubunto'>
        <div>
          <span class="width12 bold">{{$t('myvirtual.rdp_port')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="edit_rdp_port" :min="5600" :max="5899" @change="rdpportChange"></el-input-number>
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
          <el-input-number :precision="0" size="mini" v-model="edit_vnc_port" :min="5900" :max="5999" @change="vncportChange"></el-input-number>
        </div>
      </div>
      <div class="fs12">
        {{$t('myvirtual.tip9')}}
      </div>
      <div class="useTime" v-if="edit_network_sec == ''">
        <div>
          <span class="width12 bold">{{$t('myvirtual.open_port_range')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="edit_port_min" :min="6000" :max="edit_port_max-1"></el-input-number>
           -
          <el-input-number :precision="0" size="mini" v-model="edit_port_max" :min="edit_port_min+1" :max="60000"></el-input-number>
        </div>
      </div>
      <div class="fs12" v-if="edit_network_sec == ''">
        {{$t('myvirtual.tip7')}}
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="batch" size="mini" plain :loading='btnloading6' @click="editVirtual">{{$t('myvirtual.Confirm_edit')}}</el-button>
        <el-button class="batch" size="mini" plain @click="dialogFormVisible4 = false;btnloading6 = false">{{$t('virtual.cancal')}}</el-button>
      </div>
    </el-dialog>
    <!-- 重置密码 -->
    <el-dialog width='30%' :title="$t('myvirtual.reset')" :visible.sync="dialogFormVisible2">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
        <el-form-item :label="$t('myvirtual.user')" prop="user">
          <el-input class="ruleForm_input" :disabled='editUser' type="text" v-model="ruleForm.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('myvirtual.pass1')" prop="pass">
          <el-input class="ruleForm_input" type="password" v-model="ruleForm.pass" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('myvirtual.pass2')" prop="checkPass">
          <el-input class="ruleForm_input" type="password" v-model="ruleForm.checkPass" show-password autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="batch" size="mini" plain :loading='btnloading2' @click="resetForm('ruleForm')">{{$t('confirm')}}</el-button>
        <el-button class="batch" size="mini" plain @click="dialogFormVisible2 = false">{{$t('virtual.cancal')}}</el-button>
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
    <!-- 修改硬盘大小 -->
    <el-dialog width='30%' :title="$t('myvirtual.editDisk')" :visible.sync="dialogFormVisible5">
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.driveletter')}}: </span>
          <el-select class='select' v-model="disk_name" size='mini' @change='chooseDisk' placeholder="choose">
            <el-option
              v-for="(item, index) in DiskName"
              :key="index"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.diskSize')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="edit_vir_disk_size" :min="edit_min_disk_num" :max="Number(max_disk_num)"></el-input-number> G
        </div>
        <div>{{$t('myvirtual.max_set_new')}}: {{max_disk_num}}G</div>
      </div>
      <div class="useTime">
        <el-button class="batch" size="mini" plain @click="addnewdisk">{{$t('myvirtual.addDisk')}}</el-button>
        <p style="font-size: 12px">{{$t('myvirtual.addDiskTip')}}</p>
      </div>

      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.chooseDisk')}}: </span>
          <el-select class='select' v-model="mount_dir" size='mini' @change='chooseDir' placeholder="choose">
            <el-option
              v-for="(item, index) in mountDirArr"
              :key="index"
              :label="item.path"
              :value="item.path">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="useTime">
        <div>
          <span class="width12 bold">{{$t('myvirtual.chooseDisk1')}}: </span>
          <el-input-number :precision="0" size="mini" v-model="edit_new_disk_size" :min="1" :max="Number(max_new_disk_num)"></el-input-number> G
        </div>
        <div>{{$t('myvirtual.max_set')}}: {{max_new_disk_num}}G</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="batch" size="mini" plain @click="addDisk('ruleForm')">{{$t('confirm')}}</el-button>
        <el-button class="batch" size="mini" plain @click="dialogFormVisible5 = false">{{$t('virtual.cancal')}}</el-button>
      </div>
    </el-dialog>
    <!-- 举报机器问题 -->
    <el-dialog width='30%' :title="$t('myvirtual.mac_err_t')" :visible.sync="dialogFormVisible6">
      <div class="useTime">
        <div>
          <span class="bold">{{$t('myvirtual.mac_err_label')}}: </span>
          <el-select class='select' v-model="err_info" size='mini' placeholder="choose">
            <el-option :label="$t('myvirtual.mac_err_label1')" value="RentedInaccessible"></el-option>
            <el-option :label="$t('myvirtual.mac_err_label2')" value="RentedHardwareMalfunction"></el-option>
            <el-option :label="$t('myvirtual.mac_err_label3')" value="RentedHardwareCounterfeit"></el-option>
          </el-select>
        </div>
      </div>
      <div class="" v-if="err_info != 'RentedInaccessible'">
        <div>
          <span class="bold">{{$t('myvirtual.mac_err_label4')}}: </span>
          <el-input autosize type="textarea" v-model="err_desc"></el-input>
        </div>
      </div>
      <div class="fs12" v-if="err_info == 'RentedInaccessible'">
        {{$t('myvirtual.mac_err_tip1')}}
      </div>
      <div class="fs12" v-else>
        {{$t('myvirtual.mac_err_tip2')}}
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="batch" size="mini" :loading='btnloading7' plain @click="reportErr()">{{$t('confirm')}}</el-button>
        <el-button class="batch" size="mini" plain @click="dialogFormVisible6 = false; btnloading7 = false">{{$t('virtual.cancal')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BigNumber from "bignumber.js";
import {
  get_Virtual,
  Create_VMS,
  createNetwork,
  VMS_details,
  CreateWallet,
  ConFirm_Rent,
  Renew_Rent,
  VMS_restart,
  getPercentage,
  getMachineInfo,
  timedQueryTask,
  deleteVir,
  stopVir,
  startVir,
  editVir,
  editpasswd,
  searchRoomIp,
  editDisk,
  addVMDisk,
  getSecurity,
  clearMem,
  reportErr,
  reportCancel,
  reportFinish,
  reportRefund,
  reportSubmitMsg
} from "@/api";

import {
  getAccount,
  getUsdToRmb,
  randomWord
} from "@/utlis";
import { transfer, getAccountBalance, standardGPUPointPrice, dbcPriceOcw, getOrder, reportInfo, getCommitteePub } from '@/utlis/dot/api';
import { getCurrentPair, CreateSignature } from "@/utlis/dot"
import { mapState, mapMutations } from "vuex"
export default {
  name: "myMachine_unlock_gpuVirtual",
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
    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('myvirtual.user1')));
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
      timeMax: 60,
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
      btnloading6: false,
      // 创建、修改 虚拟机
      edit_chooseMac: {},
      edit_is_ubunto: true,
      title:'',
      dialogFormVisible1: false,
      dialogFormVisible4: false,
      option: [],
      optiondefault: [],
      image_name: '',
      multicast:'224.0.0.0',
      operation_system: '',
      bios_mode: '',
      vir_mem: 0.1,
      edit_vir_mem: 0,
      vir_cpu_num: 4,
      edit_vir_cpu_num: 0,
      vir_gpu_num: 1,
      edit_vir_gpu_num: 0,
      vir_disk_size: 1,
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
      iplist: [],
      public_ip:'',
      edit_public_ip: '',
      security: [],
      network_sec: '',
      network_Id: '',
      network_filters: [],
      edit_network_sec: '',
      edit_network_Id: '',
      edit_network_filters: [],
      // 修改密码
      editUser: true,
      dialogFormVisible2: false,
      ruleForm: {
        user: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        user: [
          { validator: validatePass3, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      // 订单详情
      dialogFormVisible3: false,
      GPUPointPrice: 0.028229,
      DBCPercentage: 0,
      startConfirm: false,
      is_ubunto: false,
      hasPort: [],
      // 修改数据盘
      dialogFormVisible5: false,
      innerVisible: false,
      edit_vir_disk_size: 0,
      DiskName: [],
      machine_disk_data: [],
      disk_name: '',
      mount_dir: '',
      mountDirArr: [],
      edit_new_disk_size: 0,
      max_new_disk_num: 0,
      // 举报问题
      dialogFormVisible6: false,
      btnloading7: false,
      err_info: 'RentedInaccessible',
      errMac: {},
      err_desc: ''
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
  beforeMount() {
    if (this.$t("website_name") === "congTuCloud") {
      this.styleHidden.visibility = "hidden";
    }
    getPercentage().then(res => {
      if (res.success) {
        this.DBCPercentage = res.content.percentage_whole/100
      }
    })
  },
  activated() {
    // this.binding(isNewMail);
    clearInterval(this.si);
    // this.queryMail();
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
        if (res.success) {
          for(let i = 0; i< res.content.length; i++){
            let nowTime = + new Date();
            let startTime = res.content[i].createTime
            let endTime = ''
            if (res.content[i].orderStatus == 5 || res.content[i].orderStatus == 6) {
              endTime = startTime + 15*60*1000
            } else {
              endTime = startTime + res.content[i].day*24*60*60*1000
            }
            res.content[i].btnloading1 = false
            res.content[i].btnloading2 = false
            res.content[i].btnloading3 = false
            res.content[i].btnloading4 = false
            res.content[i].btnloading5 = false
            res.content[i].btnloading6 = false
            res.content[i].btnloading7 = false
            res.content[i].time = startTime
            if (endTime - nowTime > 0) {
              res.content[i].time_left = this.minsToHourMins(Math.ceil((endTime - nowTime)/60000) - 1)
              res.content[i].userTime = this.minsToHourMins(Math.ceil((nowTime - res.content[i].time)/60000))
              res.content[i].Actual_cost = Math.ceil((Number(res.content[i].dbc)/Number(res.content[i].day)/24/60)*((nowTime - res.content[i].time)/60000))
            } else {
              res.content[i].time_left = '0h0m'
              res.content[i].userTime = this.minsToHourMins(Math.ceil((endTime - res.content[i].time)/60000))
              res.content[i].Actual_cost = res.content[i].dbc
              if (endTime + 777600000 - nowTime > 0 ) {
                res.content[i].hasdelectVm = false
                res.content[i].vmdelectTime = this.minsToHourMins(Math.ceil(((endTime + 777600000) - nowTime)/60000))
              } else {
                res.content[i].hasdelectVm = true
              }
            }
            res.content[i].confirmTime = (res.content[i].time+900000 -nowTime)/1000
            if (this.firstLoading) {
              res.content[i].virtual_info = []
            } else {
              if (this.Machine_info[i].virtual_info.length) {
                res.content[i].virtual_info = this.Machine_info[i].virtual_info
              } else {
                res.content[i].virtual_info = []
              }
            }
            if (res.content[i].orderStatus == 3 && res.content[i].reportErr == 'processing') {
              let reportArr = []
              const order = await getOrder()
              let orderArr = [...order.bookable_report, ...order.verifying_report, ...order.waiting_raw_report, ...order.finished_report]
              // order.finished_report
              for (let i = 0; i< orderArr.length; i++) {
                let Info = await reportInfo(orderArr[i])
                Info.report_id = orderArr[i]
                reportArr.push(Info)
              }
              let walletInfo = await CreateWallet({ id: res.content[i]._id })
              let newArr = reportArr.filter(res1 => {
                if (res.content[i].errType == 'RentedInaccessible') {
                  return res1.reporter == walletInfo.content.wallet && res1.machine_id == res.content[i].machine_id
                } else {
                  return res1.reporter == walletInfo.content.wallet && res1.machine_fault_type[res.content[i].errType][0] == res.content[i].ReportHash
                }
              })
              if (newArr.length) {
                for (let k= 0; k< newArr.length; k++ ) {
                  if (newArr[k].report_status == 'CommitteeConfirmed') {
                    await reportFinish({id: res.content[i]._id, status: 'end'})
                  }
                  res.content[i].submitInfo = newArr[k].booked_committee.length != newArr[k].get_encrypted_info_committee.length ? true : false
                }
              } else if (newArr.length && res.content[i].reportErr == 'processing') {
                await reportFinish({id: res.content[i]._id, status: 'error'})
              }
            }
          }
          let DBCprice1 = await dbcPriceOcw()
          this.dbc_price = DBCprice1/1000000
          if (this.firstLoading) {
            loadingInstance.close();
            const GPUPrice = await standardGPUPointPrice()
            this.GPUPointPrice = GPUPrice? GPUPrice.gpu_price/1000000 : this.GPUPointPrice
          }
          this.firstLoading = false
          this.Machine_info = res.content
          this.orderNumber = res.content.length
          this.total = res.content.length
          this.Machine_info.map((el, index) => {
            if (el.confirmTime  > 0) {
              this.count( el.confirmTime, index, (msg)=>{
                this.$set(this.Machine_info[index], 'confirmTime', msg)
              })
            } else {
              el.confirmTime = '00:00'
            }
          })
        } else {
          if (this.firstLoading) {
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
    CopyTx(text) {
      this.$copyText(String(text)).then(() => {
        this.$message.success(this.$t('copySuccess'))
      })
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
          machine_id: el.machine_id,
          rent_order: el.OrderId
        }
        ConFirm_Rent(perams).then(res => {
          console.log(res, 'res');
          if (res.success) {
            this.getMyVirtual();
            this.si = setInterval( ()=> {
              this.getMyVirtual()
            }, 60000)
            this.$message({
              type: 'success',
              message: this.$t('myvirtual.rental_success')
            });
            let perams = {
              machine_id: el.machine_id,
              wallet: this.wallet_address,
              server_room: el.server_room,
              rent_order: el.OrderId
            }
            createNetwork(perams).then(res => {
              console.log(res, 'createNetwork');
            })
          } else {
            this.$message({
              type: 'error',
              message: this.$t('myvirtual.rental_fails')
            });
          }
          el.btnloading1 = false
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
      this.timeMax = 60-Math.floor((el.createTime+el.day*24*60*60*1000 - new Date())/(24*60*60*1000))
      console.log(this.timeMax);
      el.btnloading2 = true
      this.unsubBalance = await getAccountBalance(this.wallet_address)
      this.balance = this.getnum1(this.unsubBalance.data.free)
      this.chooseMac = el
      this.useTime = 7
      this.time_left = this.chooseMac.time_left
      const getprice = Number(this.chooseMac.calc_point)/100 * this.GPUPointPrice * (1 + this.DBCPercentage)
      this.totalMoney = this.getnum2(getprice*this.useTime)
      this.totalDbc = Math.ceil(this.getnum2(getprice*this.useTime/this.dbc_price))
      el.btnloading2 = false
      this.dialogFormVisible = true
    },
    inputNum(val){
      const getprice = Number(this.chooseMac.calc_point)/100 * this.GPUPointPrice * (1 + this.DBCPercentage)
      this.totalMoney = this.getnum2(getprice*val)
      this.totalDbc = Math.ceil(this.getnum2(getprice*val/this.dbc_price))
    },
    confirmRenew(){
      this.btnloading = true;
      this.startConfirm = true;
      CreateWallet({ id: this.chooseMac.machine_id+this.wallet_address } ).then(res=> {
        if (res.success) {
          console.log(`向${res.content.wallet}转账${this.totalDbc}.${res.content.nonce}DBC`);
          this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
            confirmButtonText: this.$t('confirm'),
            cancelButtonText:  this.$t('cancel'),
            inputType:'password',
            inputValue: this.passward
          })
          .then( ({ value }) => {
            this.setPassWard(value)
            transfer(res.content.wallet, `${this.totalDbc}.${res.content.nonce}`, value, (res1) => {
              console.log(res1, 'res');
              if(res1.success){
                let permas = {
                  id: this.chooseMac.machine_id+this.wallet_address,
                  add_day: this.useTime,
                  dbc: this.totalDbc,
                  wallet: this.wallet_address,
                  rent_order: this.chooseMac.OrderId
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
                    this.startConfirm = false;
                    this.dialogFormVisible = false
                  } else {
                    this.$message({
                      showClose: true,
                      message: res2.msg,
                      type: "error",
                    });
                    this.btnloading = false;
                    this.startConfirm = false;
                    this.dialogFormVisible = false
                  }
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
            console.log(this.$t('cancel'));
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
    },
    changeOp(val){
      console.log(val, 'val')
      this.image_name = ''
      if (val == 'linux') {
        this.bios_mode = 'legacy'
        this.is_ubunto = false
        this.optiondefault = this.option.filter(el => {
          console.log(el, 'el');
          if (el.image_name.indexOf('ubuntu') != -1 || el.image_name.indexOf('win') == -1){
            return el
          }
        })
      } else {
        this.bios_mode = 'uefi'
        this.is_ubunto = true
        this.optiondefault = this.option.filter(el => {
          if (el.image_name.indexOf('win') != -1 || el.image_name.indexOf('ubuntu') == -1) return el
        })
      }
    },
    sshportChange(newvalue, oldvalue) {
      
    },
    rdpportChange(newvalue, oldvalue) {

    },
    vncportChange(newvalue, oldvalue) {
      
    },
    // 创建 虚拟机
    operateVirtual(str, data) {
      this.network_sec = ''
      this.public_ip = ''
      this.operation_system = ''
      this.image_name = ''
      let perams = {
        machine_id: data.machine_id,
        wallet: this.wallet_address,
        server_room: data.server_room,
        rent_order: data.OrderId
      }
      createNetwork(perams).then(res => {
        if (res.success) {
          data.network_name = res.content
        }
      })
      searchRoomIp({machine_id: data.machine_id}).then(res => {
        if (res.success) {
          this.iplist = res.content
        } else {
          this.iplist = []
        }
      })
      
      getSecurity({ wallet: this.wallet_address }).then(res => {
        this.security = res.success ? res.content : []
      })
      
      getMachineInfo({machine_id: data.machine_id, id: data._id}).then(res => {
        if (res.success) {
          let info = res.content.info
          this.max_vir_mem = parseInt(info.mem.free)
          this.max_cpu_num = Math.floor(info.cpu.cores)
          this.max_gpu_num = Math.floor(info.gpu.gpu_count - info.gpu.gpu_used)
          let disk_data_free = 0
          // info.disk_data.map(disk => {
          //   disk_data_free += parseInt(disk.free)
          // })
          disk_data_free = parseInt(info.disk_data[0]?info.disk_data[0].free:info.disk_data.free)
          disk_data_free = disk_data_free
          this.max_disk_num = disk_data_free > 0 ? Math.floor(disk_data_free * 0.75) : 0
          this.option = info.images
          this.dialogFormVisible1 = true
          this.chooseMac = data
          this.vir_mem = this.max_vir_mem/2
          this.vir_cpu_num = this.max_cpu_num/2
          this.vir_disk_size = this.max_disk_num/2
          this.hasPort = res.content.taskInfo
          let sshOrrdp = 5600
          let VncPort = 5900
          let portMin = 6000
          let use_sshOrrdp = []
          let use_VncPort = []
          let use_portMin = []
          let use_ip = []
          let averageValue = Math.floor(54000/info.gpu.gpu_count)
          res.content.taskInfo.map(el => {
            use_sshOrrdp.push(Number(el.ssh_port ? el.ssh_port : el.rdp_port))
            use_VncPort.push(Number(el.vnc_port))
            use_portMin.push(Number(el.port_min))
            use_ip.push(el.ssh_ip)
          })
          while (sshOrrdp < 5899) {
            if (use_sshOrrdp.indexOf(sshOrrdp) != -1) {
              sshOrrdp += 10
            } else {
              this.port_range = sshOrrdp
              this.rdp_port = sshOrrdp
              break
            }
          }
          while (VncPort < 5999) {
            if (use_VncPort.indexOf(VncPort) != -1) {
              VncPort += 10
            } else {
              this.vnc_port = VncPort
              break
            }
          }
          while (portMin < 60000) {
            if (use_portMin.indexOf(portMin) != -1) {
              portMin += averageValue
            } else {
              this.port_min = portMin
              this.port_max = portMin + averageValue - 1
              break
            }
          }
          this.iplist.map((ip, idx) => {
            if (use_ip.indexOf(ip) == -1) {
              this.iplist[idx] = { ip: ip }
              this.public_ip = ip
            } else {
              this.iplist[idx] = {
                ip: ip,
                disabled: true
              }
            }
          })
        } else {
          this.$message.error(res.msg)
        }
      })
      if(str == 'create'){
        this.title = this.$t('myvirtual.Build')
      }else{
        this.title = this.$t('myvirtual.change')
      }
    },
    // 修改 虚拟机
    operateVirtual1(el, item) {
      this.edit_chooseMac = {}
      if (item.status == 'closed' || item.status == 'start error') {
        searchRoomIp({machine_id: el.machine_id}).then(res => {
          if (res.success) {
            this.iplist = res.content
          } else {
            this.iplist = []
          }
        })
        
        getSecurity({ wallet: this.wallet_address }).then(res => {
          this.security = res.success ? res.content : []
        })
        
        getMachineInfo({machine_id: el.machine_id, id: el._id}).then(res => {
          if (res.success) {
            let info = res.content.info
            this.max_vir_mem = parseInt(info.mem.free)
            this.max_cpu_num = Math.floor(info.cpu.cores)
            this.max_gpu_num = Math.floor(info.gpu.gpu_count - info.gpu.gpu_used)
            this.dialogFormVisible4 = true
            this.hasPort = res.content.taskInfo
            let use_ip = []
            res.content.taskInfo.map(el => {
              use_ip.push(el.ssh_ip)
            })
            this.iplist.map((ip, idx) => {
              if (use_ip.indexOf(ip) == -1) {
                this.iplist[idx] = { ip: ip }
              } else {
                this.iplist[idx] = {
                  ip: ip,
                  disabled: true
                }
              }
            })
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
        this.edit_network_Id = item.network_Id ? item.network_Id: ''
        this.edit_network_sec = item.network_sec ? item.network_sec: ''
        this.edit_public_ip = item.ssh_ip
        this.edit_port_max = item.port_max
        this.edit_port_min = item.port_min
        this.edit_vir_cpu_num = item.cpu_cores
        this.edit_vir_gpu_num = item.gpu_count
        this.edit_vir_mem = parseInt(item.mem_size)
        this.edit_vnc_port = item.vnc_port
        this.title = this.$t('myvirtual.change')
        this.edit_chooseMac = item
        this.edit_chooseMac.machine_id = el.machine_id
        this.edit_chooseMac.OrderId = el.OrderId
      } else {
        this.$message.error(this.$t('myvirtual.tip16'))
      }
    },
    Selectimage(val) {
      
    },
    chooseIp(val) {

    },
    SelectSecurity() {

    },
    Createvirtual(){
      if (this.image_name == '' || this.operation_system == '') {
        this.$message.error(this.$t('myvirtual.newTip1'))
        return false
      }
      for(let i= 0; i< this.hasPort.length; i ++) {
        let el = this.hasPort[i]
        if (el.ssh_port !='' && !this.is_ubunto && this.port_range == el.ssh_port) {
          this.$message.error(this.$t('myvirtual.newTip2'))
          return false
        }
        if (el.rdp_port !='' && this.is_ubunto && this.rdp_port == el.rdp_port) {
          this.$message.error(this.$t('myvirtual.newTip3'))
          return false
        }
        if (this.vnc_port == el.vnc_port) {
          this.$message.error(this.$t('myvirtual.newTip4'))
          return false
        }
        // if (!(this.port_min > el.port_max || this.port_max < el.port_min)) {
        //   this.$message.error(this.$t('myvirtual.newTip5'))
        //   return false
        // }
      }

      this.network_filters = []
      this.security.map(el => {
        if (el.SGname == this.network_sec) {
          this.network_Id = el._id
          this.network_filters = []
          el.rule.map(el1 => {
            let str = `${el1.direction},${el1.protocol},${el1.port},${el1.object},${el1.strategy}`
            this.network_filters.push(str)
          })
        }
      })
      this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText:  this.$t('cancel'),
        inputType:'password',
        inputValue: this.passward
      })
      .then( async ({ value }) => {
        try {
          let nonce = await randomWord()
          let sign = await CreateSignature(nonce, value)
          this.btnloading1 = true
          let perams = {
            id: this.chooseMac._id,
            networkId: this.chooseMac.server_room + this.wallet_address,
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
            // network_name: this.chooseMac.network_name,
            public_ip: this.public_ip,
            network_sec: this.network_sec,
            network_Id: this.network_Id,
            network_filters: this.network_filters,
            nonce: nonce,
            sign: sign,
            wallet: this.wallet_address,
            rent_order: this.chooseMac.OrderId
          }
          Create_VMS(perams).then( res=> {
            if(res.success){
              this.$message.success(this.$t('myvirtual.Build_success'))
              let chooseIndex;
              this.Machine_info.map((el, index) => {
                if (el._id == this.chooseMac._id) {
                  chooseIndex = index
                }
              })
              this.Machine_info[chooseIndex].virtual_info.push(res.content)
              let timeData = {
                id: this.Machine_info[chooseIndex]._id,
                machine_id: this.Machine_info[chooseIndex].machine_id,
                task_id: res.content.task_id,
                rent_order: this.Machine_info[chooseIndex].OrderId
              }
              let timetask = null
              timetask = setInterval( async () => {
                let timedQuery = await timedQueryTask(timeData)
                if (timedQuery.success) {
                  let virarr = this.Machine_info[chooseIndex].virtual_info.map(item => 
                    item.task_id === timeData.task_id ? timedQuery.content : item
                  )
                  this.Machine_info[chooseIndex].virtual_info = virarr
                } else {
                  let virarr = this.Machine_info[chooseIndex].virtual_info.map(item => 
                    item.task_id === timeData.task_id ? { task_id: item.task_id, status: 'create error' } : item
                  )
                  this.Machine_info[chooseIndex].virtual_info = virarr
                }
                if (timedQuery.content && timedQuery.content.status != 'creating') {
                  clearInterval(timetask)
                  timetask = null
                }
              }, 60000)
            }else{
              // this.$message.error(this.$t('myvirtual.Build_fails'))
              this.$message.error(res.msg)
            }
            this.btnloading1 = false
            this.dialogFormVisible1 = false
          })
        } catch (err) {
          this.btnloading1 = false
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
    editVirtual() {
      // console.log('编辑'); editVir
      for(let i= 0; i< this.hasPort.length; i ++) {
        let el = this.hasPort[i]
        if (el.status != "closed") {
          if (el.ssh_port !='' && this.edit_is_ubunto && this.edit_port_range == el.ssh_port) {
            this.$message.error(this.$t('myvirtual.newTip2'))
            return false
          }
          if (el.rdp_port !='' && !this.edit_is_ubunto && this.edit_rdp_port == el.rdp_port) {
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
      this.edit_network_filters = []
      this.edit_network_Id = ''
      this.security.map(el => {
        if (el.SGname == this.edit_network_sec) {
          this.edit_network_Id = el._id
          this.edit_network_filters = []
          el.rule.map(el1 => {
            let str = `${el1.direction},${el1.protocol},${el1.port},${el1.object},${el1.strategy}`
            this.edit_network_filters.push(str)
          })
        }
      })
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
          new_mem_size: this.edit_vir_mem,
          // new_public_ip:  this.edit_public_ip,   
          // new_network_filters: this.edit_network_filters,
          rent_order: this.edit_chooseMac.OrderId
        }
        if (this.edit_chooseMac.ssh_ip != this.edit_public_ip) {
          perams.new_public_ip = this.edit_public_ip // 公网ip地址
        }
        if (this.edit_chooseMac.network_Id != this.edit_network_Id) {
          perams.new_network_filters = this.edit_network_filters
          perams.network_Id = this.edit_network_Id
          perams.network_sec = this.edit_network_sec
        }
        editVir(perams).then( async res=> {
          if(res.success){
            this.$message.success(this.$t('myvirtual.edit_success'))
            let timeData = {
              id: this.edit_chooseMac.belong,
              machine_id: this.edit_chooseMac.machine_id,
              task_id: this.edit_chooseMac.task_id,
              rent_order: this.edit_chooseMac.OrderId
            }
            let timedQuery1 = await timedQueryTask(timeData)
            let chooseIndex1;
            this.Machine_info.map((ele, index) => {
              if (ele._id == this.edit_chooseMac.belong) {
                chooseIndex1 = index
              }
            })
            if (timedQuery1.success) {
              let virarr1 = this.Machine_info[chooseIndex1].virtual_info.map(ele => 
                ele.task_id === timeData.task_id ? timedQuery1.content : ele
              )
              this.Machine_info[chooseIndex1].virtual_info = virarr1
            }
          }else{
            // this.$message.error(this.$t('myvirtual.edit_fails'))
            this.$message.error(res.msg)
          }
          this.btnloading6 = false
          this.dialogFormVisible4 = false
        })
      } catch (err) {
        this.btnloading1 = false
        this.$message({
          showClose: true,
          message: err.message,
          type: "error",
        });
      }
    },
    SeeVirtual(el) {
      el.btnloading4 = true
      this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText:  this.$t('cancel'),
        inputType:'password',
        inputValue: this.passward
      })
      .then( async ({ value }) => {
        if (el.orderStatus == 2 || el.orderStatus == 3) {
          let perams = {
            machine_id: el.machine_id,
            wallet: this.wallet_address,
            server_room: el.server_room,
            rent_order: el.OrderId
          }
          createNetwork(perams).then(res => {
            console.log(res, 'createNetwork');
          })
        }
        let chooseIndex;
        this.Machine_info.map((ele, index) => {
          if (ele._id == el._id) {
            chooseIndex = index
          }
        })
        try {
          let nonce = await randomWord()
          let sign = await CreateSignature(nonce, value)
          let VMS_Info = await VMS_details({ id: el._id, machine_id: el.machine_id, nonce, sign, wallet: this.wallet_address, rent_order: el.OrderId })
          this.setPassWard(value)
          if(VMS_Info.success){
            if (!VMS_Info.content.length) {
              this.$message.error(this.$t('myvirtual.err_msg'))
            }
            this.Machine_info[chooseIndex].virtual_info = []
            this.Machine_info[chooseIndex].virtual_info = VMS_Info.content
            for (let i = 0; i < VMS_Info.content.length; i ++) {
              if (VMS_Info.content[i].status && VMS_Info.content[i].status == 'creating' ) {
                let timeData = {
                  id: this.Machine_info[chooseIndex]._id,
                  machine_id: this.Machine_info[chooseIndex].machine_id,
                  task_id: VMS_Info.content[i].task_id,
                  rent_order: this.Machine_info[chooseIndex].OrderId
                }
                let timetask1 = null
                timetask1 = setInterval( async () => {
                  let timedQuery = await timedQueryTask(timeData)
                  if (timedQuery.success) {
                    let virarr = this.Machine_info[chooseIndex].virtual_info.map(item => 
                      item.task_id === timeData.task_id ? timedQuery.content : item
                    )
                    this.Machine_info[chooseIndex].virtual_info = virarr
                  } else {
                    let virarr = this.Machine_info[chooseIndex].virtual_info.map(item => 
                      item.task_id === timeData.task_id ? { task_id: item.task_id, status: 'create error' } : item
                    )
                    this.Machine_info[chooseIndex].virtual_info = virarr
                  }
                  if (timedQuery.content && timedQuery.content.status != 'creating') {
                    clearInterval(timetask1)
                    timetask1 = null
                  }
                }, 60000)
              }
            }
          }else{
            this.$message.error(VMS_Info.msg)
          }
          this.Machine_info[chooseIndex].btnloading4 = false
        } catch (err) {
          this.Machine_info[chooseIndex].btnloading4 = false
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
    reboot(item, el) {
      el.btnloading3 = true
      this.$confirm(this.$t('myvirtual.tip5'), this.$t('myvirtual.reboot'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        VMS_restart({ task_id: item.task_id, id: item.belong, machine_id: el.machine_id, rent_order: el.OrderId}).then( async (res) => {
          if(!res.success){
            this.$message({
              type: 'error',
              message: res.msg
            });
          }else{
            let timeData = {
              id: item.belong,
              machine_id: el.machine_id,
              task_id: item.task_id,
              rent_order: el.OrderId
            }
            let timedQuery1 = await timedQueryTask(timeData)
            let chooseIndex1;
            this.Machine_info.map((ele, index) => {
              if (ele._id == item.belong) {
                chooseIndex1 = index
              }
            })
            if (timedQuery1.success) {
              let virarr1 = this.Machine_info[chooseIndex1].virtual_info.map(ele => 
                ele.task_id === timeData.task_id ? timedQuery1.content : ele
              )
              this.Machine_info[chooseIndex1].virtual_info = virarr1
            }
            let timetask = null
            timetask = setInterval( async () => {
              let timedQuery = await timedQueryTask(timeData)
              let chooseIndex;
              this.Machine_info.map((ele, index) => {
                if (ele._id == item.belong) {
                  chooseIndex = index
                }
              })
              if (timedQuery.success) {
                let virarr = this.Machine_info[chooseIndex].virtual_info.map(ele => 
                  ele.task_id === timeData.task_id ? timedQuery.content : ele
                )
                this.Machine_info[chooseIndex].virtual_info = virarr
              }
              if (timedQuery.content.status == 'running' || timedQuery.content.status == 'error') {
                clearInterval(timetask)
                timetask = null
              }
            }, 20000)
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
    // 删除虚拟机
    delect(item, el) {
      this.$confirm(this.$t('myvirtual.tip13'), this.$t('myvirtual.delect'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        deleteVir({ task_id: item.task_id, id: item.belong, machine_id: el.machine_id, rent_order: el.OrderId}).then( res => {
          if(!res.success){
            this.$message({
              type: 'error',
              message: res.msg
            });
          }else{
            el.virtual_info.splice(el.virtual_info.indexOf(el.virtual_info.find(ele => {
              return ele._id == item.task_id
            })), 1)
            this.$message({
              type: 'success',
              message: this.$t('myvirtual.delect_success')
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
    stopVir(item, el) {
      this.$confirm(this.$t('myvirtual.tip14'), this.$t('myvirtual.stop'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        stopVir({ task_id: item.task_id, id: item.belong, machine_id: el.machine_id, rent_order: el.OrderId}).then( async (res) => {
          if(!res.success){
            this.$message({
              type: 'error',
              message: res.msg
            });
          }else{
            let timeData = {
              id: item.belong,
              machine_id: el.machine_id,
              task_id: item.task_id,
              rent_order: el.OrderId
            }
            let timedQuery1 = await timedQueryTask(timeData)
            let chooseIndex1;
            this.Machine_info.map((ele, index) => {
              if (ele._id == item.belong) {
                chooseIndex1 = index
              }
            })
            if (timedQuery1.success) {
              let virarr1 = this.Machine_info[chooseIndex1].virtual_info.map(ele => 
                ele.task_id === timeData.task_id ? timedQuery1.content : ele
              )
              this.Machine_info[chooseIndex1].virtual_info = virarr1
            }
            let timetask = null
            timetask = setInterval( async () => {
              let timedQuery = await timedQueryTask(timeData)
              let chooseIndex;
              this.Machine_info.map((ele, index) => {
                if (ele._id == item.belong) {
                  chooseIndex = index
                }
              })
              if (timedQuery.success) {
                let virarr = this.Machine_info[chooseIndex].virtual_info.map(ele => 
                  ele.task_id === timeData.task_id ? timedQuery.content : ele
                )
                this.Machine_info[chooseIndex].virtual_info = virarr
              }
              if (timedQuery.content.status == 'closed' || timedQuery.content.status == 'error') {
                clearInterval(timetask)
                timetask = null
              }
            }, 20000)
            // this.$message({
            //   type: 'success',
            //   message: this.$t('myvirtual.stop_success')
            // });
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
    startVir(item, el) {
      this.$confirm(this.$t('myvirtual.tip15'), this.$t('myvirtual.stop'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        startVir({ task_id: item.task_id, id: item.belong, machine_id: el.machine_id, rent_order: el.OrderId}).then( async (res) => {
          if(!res.success){
            if (res.msg == 'check gpu failed') {
              this.$message({
                type: 'error',
                message: this.$t('myvirtual.GpuFailed')
              });
            } else {
              this.$message({
                type: 'error',
                message: res.msg
              });
            }
          } else {
            let timeData = {
              id: item.belong,
              machine_id: el.machine_id,
              task_id: item.task_id,
              rent_order: el.OrderId
            }
            let timedQuery1 = await timedQueryTask(timeData)
            let chooseIndex1;
            this.Machine_info.map((ele, index) => {
              if (ele._id == item.belong) {
                chooseIndex1 = index
              }
            })
            if (timedQuery1.success) {
              let virarr1 = this.Machine_info[chooseIndex1].virtual_info.map(ele => 
                ele.task_id === timeData.task_id ? timedQuery1.content : ele
              )
              this.Machine_info[chooseIndex1].virtual_info = virarr1
            }
            let timetask = null
            timetask = setInterval( async () => {
              let timedQuery = await timedQueryTask(timeData)
              let chooseIndex;
              this.Machine_info.map((ele, index) => {
                if (ele._id == item.belong) {
                  chooseIndex = index
                }
              })
              if (timedQuery.success) {
                let virarr = this.Machine_info[chooseIndex].virtual_info.map(ele => 
                  ele.task_id === timeData.task_id ? timedQuery.content : ele
                )
                this.Machine_info[chooseIndex].virtual_info = virarr
              }
              if (timedQuery.content.status == 'running' || timedQuery.content.status == 'error' || timedQuery.content.status == 'start error') {
                clearInterval(timetask)
                timetask = null
              }
            }, 20000)
            // this.$message({
            //   type: 'success',
            //   message: this.$t('myvirtual.start_success')
            // });
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
    reset(item, el){
      this.chooseMac = item
      this.chooseMac.machine_id = el.machine_id
      this.chooseMac.OrderId = el.OrderId
      this.ruleForm.user = item.user_name
      this.ruleForm.pass = item.login_password
      this.ruleForm.checkPass = item.login_password
      if (item.user_name == "" || item.user_name == "N/A") {
        this.editUser = false
      } else {
        this.editUser = true
      }
      this.dialogFormVisible2 = true
    },
    resetForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            id: this.chooseMac.belong,
            task_id: this.chooseMac.task_id,
            machine_id: this.chooseMac.machine_id,
            username: this.ruleForm.user,
            password: this.ruleForm.pass,
            rent_order: this.chooseMac.OrderId
          }
          editpasswd(data).then( async (res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: this.$t('myvirtual.edit_success')
              });
              this.dialogFormVisible2 = false
              let timeData = {
                id: this.chooseMac.belong,
                machine_id: this.chooseMac.machine_id,
                task_id: this.chooseMac.task_id,
                rent_order: this.chooseMac.OrderId
              }
              let timedQuery1 = await timedQueryTask(timeData)
              let chooseIndex1;
              this.Machine_info.map((ele, index) => {
                if (ele._id == this.chooseMac.belong) {
                  chooseIndex1 = index
                }
              })
              if (timedQuery1.success) {
                let virarr1 = this.Machine_info[chooseIndex1].virtual_info.map(ele => 
                  ele.task_id === timeData.task_id ? timedQuery1.content : ele
                )
                this.Machine_info[chooseIndex1].virtual_info = virarr1
              }
            } else {
              if (res.msg.indexOf('child process has failed to set user password') != -1) {
                this.$message({
                  type: 'error',
                  message: this.$t('myvirtual.tip18')
                });
              } else {
                this.$message({
                  type: 'error',
                  message: res.msg
                });
              }
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      // this.dialogFormVisible2 = false
      // this.$refs[formName].resetFields();
    },
    // 修改硬盘
    changeDisk(item, data) {
      if (item.status == 'closed') {
        this.edit_vir_disk_size = 0
        this.edit_min_disk_num = 0
        this.disk_name = ''
        this.mount_dir = ''
        this.edit_new_disk_size = 1
        this.DiskName = item.disks
        getMachineInfo({machine_id: data.machine_id, id: data._id}).then(res => {
          if (res.success) {
            let info = res.content.info
            // let disk_data_free = 0
            this.mountDirArr = []
            info.disk_data.map(disk => {
              if (disk.path != '/data') {
                this.mountDirArr.push(disk)
              }
              // disk_data_free += parseInt(disk.free)
            })
            // disk_data_free = disk_data_free - 350
            // this.max_disk_num = disk_data_free > 0 ? Math.floor(disk_data_free * 0.75) : 0
            this.machine_disk_data = info.disk_data
            this.dialogFormVisible5 = true
            this.chooseMac = item
            this.chooseMac.machine_id = data.machine_id
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        this.$message.error(this.$t('myvirtual.errTip'))
      }
    },
    chooseDisk(val) {
      this.DiskName.map(diskitem => {
        let source_file = ''
        if (diskitem.name == val) {
          this.edit_min_disk_num = parseInt(diskitem.size)
          this.edit_vir_disk_size = parseInt(diskitem.size)
          source_file = '/' + diskitem.source_file.split('/')[1]
        }
        this.machine_disk_data.map(el => {
          if (el.path == source_file) {
            let disk_data_free = 0
            if (el.path == '/data') {
              disk_data_free = parseInt(el.free) - 350
            } else {
              disk_data_free = parseInt(el.free)
            }
            this.max_disk_num = disk_data_free > 0 ? Math.floor(disk_data_free * 0.75) : this.edit_min_disk_num
          }
        })
      })
    },
    addDisk() {
      let data = {
        id: this.chooseMac.belong,
        task_id: this.chooseMac.task_id,
        machine_id: this.chooseMac.machine_id,
        disk_name: this.disk_name
      }
      if (parseInt(this.edit_vir_disk_size - this.edit_min_disk_num) > 0) {
        data.disk_num = parseInt(this.edit_vir_disk_size - this.edit_min_disk_num)
      }
      editDisk(data).then( async res => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: this.$t('myvirtual.addDisksuccess')
          });
          this.dialogFormVisible5 = false
          let timeData = {
            id: this.chooseMac.belong,
            machine_id: this.chooseMac.machine_id,
            task_id: this.chooseMac.task_id,
            rent_order: this.chooseMac.OrderId
          }
          let timedQuery1 = await timedQueryTask(timeData)
          let chooseIndex1;
          this.Machine_info.map((ele, index) => {
            if (ele._id == this.chooseMac.belong) {
              chooseIndex1 = index
            }
          })
          if (timedQuery1.success) {
            let virarr1 = this.Machine_info[chooseIndex1].virtual_info.map(ele => 
              ele.task_id === timeData.task_id ? timedQuery1.content : ele
            )
            this.Machine_info[chooseIndex1].virtual_info = virarr1
          }
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          });
        }
      })
    },
    addnewdisk() {
      let data = {
        id: this.chooseMac.belong,
        task_id: this.chooseMac.task_id,
        machine_id: this.chooseMac.machine_id,
        mount_dir: this.mount_dir,
        size: this.edit_new_disk_size
      }
      if (this.mount_dir == '') {
        this.$message.error(this.$t('myvirtual.addTip'))
        return false
      }
      addVMDisk(data).then( async res => {
        console.log(res, 'res');
        if (res.success) {
          // this.innerVisible = false
          // this.dialogFormVisible5 = false
          this.$message.success(this.$t('myvirtual.addDisksuccess'))
          let timeData = {
            id: this.chooseMac.belong,
            machine_id: this.chooseMac.machine_id,
            task_id: this.chooseMac.task_id,
            rent_order: this.chooseMac.OrderId
          }
          let timedQuery1 = await timedQueryTask(timeData)
          // let chooseIndex1;
          // this.Machine_info.map((ele, index) => {
          //   if (ele._id == this.chooseMac.belong) {
          //     chooseIndex1 = index
          //   }
          // })
          if (timedQuery1.success) {
            this.DiskName = timedQuery1.content.disks
          }
        }
      })
    },
    chooseDir(val) {
      this.mountDirArr.map(el => {
        if (el.path == val) {
          this.edit_new_disk_size = 0
          this.max_new_disk_num = parseInt(el.free)
        }
      })
    },
    clearMem(el) {
      el.btnloading5 = true
      clearMem({machine_id: el.machine_id, id: el._id, rent_order: el.OrderId}).then(res => {
        if (res.success) {
          this.$message.success(this.$t('myvirtual.clearMem_success'))
        } else {
          this.$message.error(res.msg)
        }
        el.btnloading5 = false
      })
    },

    // 举报机器
    mac_err(el) {
      this.dialogFormVisible6 = true
      this.errMac = el
    },
    async mac_err_cancel(el) {
      el.btnloading6 = true
      let reportArr = []
      const order = await getOrder()
      let orderArr = [...order.bookable_report, ...order.verifying_report, ...order.waiting_raw_report]
      for (let i = 0; i< orderArr.length; i++) {
        let Info = await reportInfo(orderArr[i])
        Info.report_id = orderArr[i]
        reportArr.push(Info)
      }
      let walletInfo = await CreateWallet({ id: el.machine_id+this.wallet_address })
      let newArr = reportArr.filter(res1 => {
        if (el.errType == 'RentedInaccessible') {
          return res1.reporter == walletInfo.content.wallet && res1.machine_id == el.machine_id
        } else {
          return res1.reporter == walletInfo.content.wallet && res1.machine_fault_type[el.errType][0] == el.ReportHash
        }
      })
      if (newArr.length && newArr[0].report_status == "Reported") {
        let data = {
          id: el._id,
          machine_id: el.machine_id,
          report_id: newArr[0].report_id
        }
        reportCancel(data).then(res => {
          if (res.success) {
            if (res.content == 'unstake-fail') {
              this.$message.success(this.$t('myvirtual.mac_err_msg1'))
              el.btnloading6 = false
            } else {
              reportRefund({ id: el._id, wallet: this.wallet_address }).then(res => {
                if (res.success) {
                  this.getMyVirtual()
                  this.$message.success(this.$t('myvirtual.mac_err_msg7'))
                } else {
                  this.$message.error(this.$t('myvirtual.mac_err_msg6'))
                }
                el.btnloading6 = false
              })
            }
          } else {
            el.btnloading6 = false
            this.$message.error(this.$t('myvirtual.mac_err_msg2'))
          }
        })
      } else {
        el.btnloading6 = false
        this.$message.error(this.$t('myvirtual.mac_err_msg3'))
      }
    },
    async mac_err_submsg(el) {
      el.btnloading7 = true
      let reportArr = []
      const order = await getOrder()
      let orderArr = [...order.bookable_report, ...order.verifying_report, ...order.waiting_raw_report]
      for (let i = 0; i< orderArr.length; i++) {
        let Info = await reportInfo(orderArr[i])
        Info.report_id = orderArr[i]
        reportArr.push(Info)
      }
      let walletInfo = await CreateWallet({ id: el.machine_id+this.wallet_address })
      let newArr = reportArr.filter(res1 => {
        if (el.errType == 'RentedInaccessible') {
          return res1.reporter == walletInfo.content.wallet && res1.machine_id == el.machine_id
        } else {
          return res1.reporter == walletInfo.content.wallet && res1.machine_fault_type[el.errType][0] == el.ReportHash
        }
      })
      if (newArr.length && newArr[0].report_status == "Verifying") {
        let B = newArr[0].booked_committee.filter((item) => !newArr[0].get_encrypted_info_committee.includes(item))
        let getpub = await getCommitteePub(B[0])
        let data = {
          id: el._id,
          machine_id: el.machine_id,
          report_id: newArr[0].report_id,
          toWallet: B[0],
          toPub: getpub.box_pubkey
        }
        reportSubmitMsg(data).then(res => {
          if (res.success) {
            this.$message.success(this.$t('myvirtual.mac_err_msg9'))
            this.getMyVirtual()
          } else {
            this.$message.error(this.$t('myvirtual.mac_err_msg10'))
          }
          el.btnloading7 = false
        })
      } else {
        el.btnloading7 = false
      }
    },
    reportErr() {
      this.btnloading7 = true
      CreateWallet({ id: this.errMac.machine_id+this.wallet_address } ).then(res=> {
        if (res.success) {
          console.log(`向${res.content.wallet}转账20010DBC`);
          this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
            confirmButtonText: this.$t('confirm'),
            cancelButtonText:  this.$t('cancel'),
            inputType:'password',
            inputValue: this.passward
          })
          .then( ({ value }) => {
            this.setPassWard(value)
            transfer(res.content.wallet, `20010`, value, (res1) => {
              if (res1.success) {
                let data;
                if (this.err_info == 'RentedInaccessible') {
                  data = {
                    id: this.errMac._id,
                    machine_id: this.errMac.machine_id,
                    errType: this.err_info,
                    wallet: this.wallet_address
                  }
                } else {
                  data = {
                    id: this.errMac._id,
                    machine_id: this.errMac.machine_id,
                    errType: this.err_info,
                    err_desc: this.err_desc,
                    wallet: this.wallet_address
                  }
                }
                reportErr(data).then(res2 => {
                  console.log(res2, 'res2');
                  if (res2.success) {
                    this.getMyVirtual()
                    this.btnloading7 = false
                    this.dialogFormVisible6 = false
                    this.$message.success(this.$t('myvirtual.mac_err_msg4'))
                  } else {
                    reportRefund({ id: this.errMac._id, wallet: this.wallet_address }).then(res => {
                      if (res.success) {
                        this.$message.success(this.$t('myvirtual.mac_err_msg7'))
                      } else {
                        this.$message.error(this.$t('myvirtual.mac_err_msg6'))
                      }
                      this.btnloading7 = false
                    })
                  }
                })
              } else {
                this.btnloading7 = false
                this.$message({
                  showClose: true,
                  message: res1.msg,
                  type: "error",
                });
              }
            })
          }).catch(() => {
            this.btnloading7 = false
            console.log(this.$t('cancel'));
          });
        } else {
          this.btnloading7 = false
          this.$message({
            showClose: true,
            message: this.$t('virtual.tip6'),
            type: "error",
          });
        }
      })
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
      .color {
        line-height: 1.2;
        color: #f56c6c;
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
          .left{
            width: 300px;
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
