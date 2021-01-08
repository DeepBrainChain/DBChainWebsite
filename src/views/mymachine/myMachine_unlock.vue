<template>
  <div>
    <div class="title">
      <span v-if="$t('website_name') === 'congTuCloud'"
        >{{ $t("gpu.myMachineTitle") }}：{{ orderCount }}</span
      >
      <span v-else>{{ $t("gpu.myMachineTitle") }}：{{ rentNumber }}</span>

      <div v-if="!isBinding && bindMail" class="binding">
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
    <div
      v-if="res_body.content.length > 0"
      v-for="(item, index) in res_body.content"
      class="border-content"
    >
      <div class="tools-head">
        <div class="l-wrap">
          <!--          <span class="tools-title">{{$t('gpu.mcStatusTitle')}}：<b>{{$t('gpu.machineOnLine')}}</b></span>-->
          <span class="tools-title" v-if="item.orderData.task_id"
            >{{ $t("container_id") }}:{{ item.orderData.task_id }}&nbsp;
            &nbsp;&nbsp; &nbsp;</span
          >
          <el-button
            v-if="item.orderData.have_continue_pay"
            plain
            class="is-link"
            @click="
              pushContinuePayDetail(
                item.orderData.order_id,
                item.orderData.order_is_over
              )
            "
            >{{ $t("click_to_view_continue_pay") }}</el-button
          >
          <span v-if="item.orderData.have_continue_pay" class="tools-title"
            >&nbsp; &nbsp; &nbsp; &nbsp;</span
          >
          <span
            v-if="
              item.orderData.order_is_cancer || item.orderData.order_is_over
            "
            class="tools-title"
          ></span>
          <span v-else class="tools-title"
            >{{ $t("gpu.remainingTime") }}：{{
              $secToDate(item.orderData.rest_time_rent * 60, "DHM")
            }}</span
          >
        </div>
        <div class="r-wrap">
          <!--<span v-if="item.rent_success">正在使用中</span>
          <span
            v-if="Math.floor((new Date().getTime() - item.orderData.milli_create_order_time)/60000) <= 15"
          >等待支付</span>
          <span v-else-if="item.orderData.order_is_cancer">未支付</span>
          <span v-if="item.orderData.order_is_cancer === false" class="ml10">
            剩余支付时间：{{
            15 - Math.floor((new Date().getTime() - item.orderData.milli_create_order_time)/60000)
            }}分钟
          </span>-->
          <span
            v-if="
              item.orderData.order_is_over && item.orderData.order_isnormal_over
            "
            >{{ $t("my_machine_isnormal_over") }}</span
          >
          <span
            v-else-if="
              item.orderData.order_is_over &&
              item.orderData.order_isnormal_over === false
            "
            >{{ $t("my_machine_nonormal_over") }}</span
          >
          <span v-else-if="item.orderData.order_is_cancer">{{
            $t("my_machine_order_cancer")
          }}</span>
          <span v-else-if="item.orderData.rent_success">{{
            $t("my_machine_order_rent_success")
          }}</span>

          <!--   <span v-else-if="item.orderData.vocing_pay">{{$t('my_machine_order_vocing_pay')}}</span>  -->
          <span
            v-else-if="
              item.orderData.pay_error && item.orderData.return_dbc === false
            "
            >{{ $t("my_machine_order_pay_error") }}</span
          >
          <span
            v-else-if="item.orderData.pay_error && item.orderData.return_dbc"
            >{{ $t("my_machine_order_return_dbc") }}</span
          >
          <span
            v-else-if="
              item.orderData.container_is_exist && !item.orderData.vocing_pay
            "
            >{{ $t("my_machine_order_vocing_machine_success") }}</span
          >
        </div>
      </div>
      <div class="pay-wrap" v-if="$t('website_name') != 'congTuCloud'">
        <div class="rate-head" v-if="item.mcData.evaluation_score_average > 0">
          <div class="flex right vCenter">
            <el-rate
              :value="item.mcData.evaluation_score_average / 2"
            ></el-rate>
            <!--     <span>{{item.mcData.evaluation_score_average}}{{$t('scores')}}</span> -->
          </div>
        </div>
        <div>
          <span class="td"
            >{{ $t("gpu.payDBCs") }}：{{
              (
                item.orderData.dbc_total_count + parseFloat(item.orderData.code)
              ).toFixed(4)
            }}</span
          >
          <span class="td"
            >{{ $t("my_machine_beused_time") }}：{{
              parseInt(item.orderData.real_rent_time / 60)
            }}{{ $t("my_machine_hour") }}{{ item.orderData.real_rent_time % 60
            }}{{ $t("my_machine_min") }}</span
          >
          <span class="td"
            >{{ $t("my_gpu_count") }}：{{ item.orderData.gpu_count }}</span
          >
        </div>

        <div>
          <span class="td"
            >{{ $t("gpu.actualPrice") }}：{{
              item.orderData.dbc_real_need_count
            }}
            DBC</span
          >
          <span v-if="item.orderData.have_continue_pay === false" class="td"
            >{{ $t("gpu.gpuBilling") }}：$
            {{ item.orderData.gpu_price_dollar }}/{{
              $t("my_machine_hour")
            }}</span
          >
          <span v-if="item.mcData.dbc_version !== '0.3.7.2'" class="td"
            >{{ $t("diskspace_remaining") }}：{{
              parseInt(
                (item.orderData.diskspace +
                  item.orderData.diskspace_giving * item.orderData.gpu_count -
                  item.orderData.diskspace_image_data) /
                  (1024 * 1024)
              )
            }}G</span
          >
        </div>
        <div>
          <span class="td"
            >{{ $t("gpu.currentRemaining") }}：{{
              (
                item.orderData.dbc_total_count -
                item.orderData.dbc_real_need_count +
                parseFloat(item.orderData.code)
              ).toFixed(4)
            }}
            DBC</span
          >
          <span v-if="item.orderData.have_continue_pay === false" class="td"
            >{{ $t("gpu.payPrice") }}：$
            {{ item.orderData.dbc_price.toFixed(4) }}</span
          >
          <span v-if="item.mcData.dbc_version !== '0.3.7.2'" class="td"
            >{{ $t("memory_space") }}：{{
              parseInt(item.orderData.memory / (1024 * 1024))
            }}G</span
          >
        </div>
      </div>
      <div class="status-wrap">
        <div class="flex status-title">
          <div>
            <span>{{ item.mcData.machine_id }}</span>
            <!--    <span class="fs28">
              <span
                class="cPrimaryColor"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$ {{item.mcData.gpu_price_dollar }}/{{$t('my_machine_hour')}}</span>
            </span>-->
          </div>
          <div class="td" :style="styleHidden">
            <span class="fs16">
              {{ $t("my_machine_dbc_version") }}：
              <a class="cPrimaryColor">{{ item.mcData.dbc_version }}</a>
            </span>
          </div>
        </div>

        <div class="flex">
          <div class="td2">
            <span class="fs28">
              <a class="cPrimaryColor">{{ item.mcData.gpu_type }}</a>
              <a class="cPrimaryColor">x{{ item.mcData.gpu_count }}</a>
            </span>
          </div>
          <div class="td2">
            <span class="fs28">
              <a class="cPrimaryColor">{{ item.mcData.country }}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div class="td5">
            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('month_discount_instruction')"
            >
              <span class="fs28">
                <a class="cPrimaryColor"
                  >{{ $t("month_discount") }}:{{
                    item.mcData.discount_month
                  }}%&nbsp;&nbsp;</a
                >
              </span>
            </el-tooltip>
          </div>
          <div class="td5">
            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('quarter_discount_instruction')"
            >
              <span class="fs28">
                <a class="cPrimaryColor"
                  >{{ $t("quarter_discount") }}:{{
                    item.mcData.discount_quarter
                  }}%&nbsp;&nbsp;</a
                >
              </span>
            </el-tooltip>
          </div>
          <div class="td5">
            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('year_discount_instruction')"
            >
              <span class="fs28">
                <a class="cPrimaryColor"
                  >{{ $t("year_discount") }}:{{
                    item.mcData.discount_year
                  }}%&nbsp;&nbsp;</a
                >
              </span>
            </el-tooltip>
          </div>
          <div class="td5">
            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('rentout_machine_whole_instruction')"
              v-if="item.mcData.gpu_rentout_whole"
            >
              <span class="fs28">
                <a class="cPrimaryColor">{{ $t("rentout_machine_whole") }}</a>
              </span>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('rentout_machine_one_gpu_instruction')"
              v-else
            >
              <span class="fs28">
                <a class="cPrimaryColor">{{ $t("rentout_machine_one_gpu") }}</a>
              </span>
            </el-tooltip>
          </div>
          <div class="td5" :style="styleHidden">
            <span class="fs28"></span>
            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('deposite_dbc_count_instruction')"
            >
              <span class="fs28">
                <a class="cPrimaryColor"
                  >{{ $t("compensation_dbc_count") }}:{{
                    item.mcData.rentout_deposite_dbc_count /
                    item.mcData.gpu_count
                  }}</a
                >
              </span>
            </el-tooltip>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <span class="fs16">
              {{ $t("list_idle_gpus") }}:
              <a class="cPrimaryColor">{{
                item.mcData.gpu_count - item.mcData.gpu_be_used
              }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_length_of_available_time") }}：
              <a class="cPrimaryColor"
                >{{ Math.floor(item.mcData.length_of_available_time)
                }}{{ $t("my_machine_hour") }}</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_total_time_be_used") }}：
              <a class="cPrimaryColor">{{
                $minsToHourMins(item.mcData.total_time_be_used)
              }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_total_rent_count") }}：
              <a class="cPrimaryColor">{{ item.mcData.total_rent_count }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_error_rent_count") }}：
              <a class="cPrimaryColor">{{ item.mcData.error_rent_count }}</a>
            </span>
          </div>
        </div>

        <!--     <div class="flex" v-if="item.mcData.dbc_version!=='0.3.7.2'">
          <div class="td">
            <span class="fs16">
              {{$t('cpu_containers_list')}}:
              <a class="cPrimaryColor">{{item.mcData.cpu_containers}}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('cpu_containers_can_use_memory_list')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.mcData.cpu_containers_can_use_memory/(1024*1024))}}G</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('cpu_containers_can_use_disk_list')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.mcData.cpu_containers_can_use_disk/(1024*1024))}}G</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('gpu_containers_can_use_memory_list')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.mcData.gpu_containers_can_use_memory/(1024*1024))}}G</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{$t('gpu_containers_can_use_disk_list')}}：
              <a
                class="cPrimaryColor"
              >{{parseInt(item.mcData.gpu_containers_can_use_disk/(1024*1024))}}G</a>
            </span>
          </div>
        </div>-->

        <div class="flex">
          <div v-if="item.mcData.tensor_cores" class="td">
            <span class="fs16">
              Tensor Cores：
              <a class="cPrimaryColor">{{ item.mcData.tensor_cores }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_cuda_version") }}：
              <a class="cPrimaryColor">{{ item.mcData.cuda_version }}</a>
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_disk_space") }}：
              <a class="cPrimaryColor"
                >{{ parseInt(item.mcData.disk_space / (1024 * 1024)) }}GB</a
              >
              <a class="cPrimaryColor"
                >&nbsp;&nbsp;{{ item.mcData.disk_type }}</a
              >
            </span>
          </div>
          <div class="td3">
            <span class="fs16">
              {{ $t("list_cpu_type") }}：
              <a class="cPrimaryColor">{{ item.mcData.cpu_type }}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.mcData.half_precision_tflops > 0" class="td">
            <span class="fs16">
              {{ $t("list_half_precision_tflops") }}：
              <a class="cPrimaryColor"
                >{{ item.mcData.half_precision_tflops }}TFLOPS</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_gpu_ram_size") }}：
              <a class="cPrimaryColor"
                >{{ parseInt(item.mcData.gpu_ram_size / (1000 * 1000)) }}GB</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_disk_bandwidth") }}：
              <a class="cPrimaryColor"
                >{{ parseInt(item.mcData.disk_bandwidth / 1024) }}MB/s</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_cpu_numbers") }}：
              <a class="cPrimaryColor">{{ item.mcData.cpu_numbers }}</a>
            </span>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.mcData.single_precision_tflops > 0" class="td">
            <span class="fs16">
              {{ $t("list_single_precision_tflops") }}：
              <a class="cPrimaryColor"
                >{{ item.mcData.single_precision_tflops }}TFLOPS</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_gpu_ram_bandwidth") }}：
              <a class="cPrimaryColor"
                >{{
                  parseInt(item.mcData.gpu_ram_bandwidth / (1024 * 1024))
                }}GB/s</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_inet_up") }}：
              <a class="cPrimaryColor"
                >{{ parseInt(item.mcData.inet_up / 1024) }}Mbps</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_ram_size") }}：
              <a class="cPrimaryColor"
                >{{ parseInt(item.mcData.ram_size / (1024 * 1024)) }}GB</a
              >
            </span>
          </div>
        </div>
        <div class="flex">
          <div v-if="item.mcData.double_precision_tflops > 0" class="td">
            <span class="fs16">
              {{ $t("list_double_precision_tflops") }}：
              <a class="cPrimaryColor"
                >{{ item.mcData.double_precision_tflops }}TFLOPS</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_pcie_bandwidth") }}：
              <a class="cPrimaryColor"
                >{{
                  parseInt(item.mcData.pcie_bandwidth / (1024 * 1024))
                }}GB/s</a
              >
            </span>
          </div>
          <div class="td">
            <span class="fs16">
              {{ $t("list_inet_down") }}：
              <a class="cPrimaryColor"
                >{{ parseInt(item.mcData.inet_down / 1024) }}Mbps</a
              >
            </span>
          </div>
          <div class="td3">
            <span class="fs16">
              {{ $t("list_os") }}：
              <a class="cPrimaryColor">{{ item.mcData.os }}</a>
            </span>
          </div>
        </div>
      </div>
      <!--<div class="tools-head bd">
        <div class="l-wrap">
          <span class="tools-title small">{{$t('gpu.machineLoginInfo')}}：ssh -p 20049 root@116.85.24.172，{{$t('password')}}：xxxxx</span>
        </div>
      </div>-->
      <div class="tools-head">
        <div class="l-wrap">
          <span
            v-if="
              isShowRendSuccessMsg(item.orderData.milli_rent_success_time) &&
              item.orderData.order_id_pre === null &&
              !item.orderData.from_stop_to_open
            "
            >{{ $t("myMachine_rent_success_msg") }}</span
          >

          <span
            v-if="
              isShowRendSuccessMsg(item.orderData.milli_rent_success_time) &&
              item.orderData.order_id_pre !== null &&
              !item.orderData.from_stop_to_open
            "
            >{{ $t("myMachine_rent_success_msg_update") }}</span
          >
          <span
            v-if="
              isShowRendSuccessMsg(item.orderData.milli_rent_success_time) &&
              item.orderData.order_id_pre !== null &&
              item.orderData.from_stop_to_open
            "
            >{{ $t("myMachine_rent_success_msg_update_stop_to_open") }}</span
          >

          <span v-else-if="item.orderData.vocing === true">{{
            $t("myMachine_is_pay_vocing")
          }}</span>
          <span
            class="cRed"
            v-else-if="
              item.orderData.order_is_cancer === false &&
              item.orderData.container_is_exist &&
              item.orderData.wallet_address_dbchain === null
            "
            >{{ $t("myMachine_maybe_is_used") }}</span
          >
          <span
            class="cRed"
            v-else-if="
              item.orderData.order_id_pre === null &&
              (item.orderData.creating_container || creating_container) &&
              !item.orderData.order_is_cancer &&
              !item.orderData.order_is_over &&
              !item.orderData.rent_success &&
              !item.orderData.pay_error
            "
            >{{ $t("myMachine_is_vocing_machine") }}</span
          >

          <span
            class="cRed"
            v-else-if="
              item.orderData.order_id_pre !== null &&
              (item.orderData.creating_container || creating_container) &&
              !item.orderData.order_is_cancer &&
              !item.orderData.order_is_over &&
              !item.orderData.rent_success &&
              !item.orderData.pay_error &&
              !item.orderData.from_stop_to_open
            "
            >{{ $t("myMachine_is_vocing_machine_update")
            }}{{
              parseInt(
                item.orderData.diskspace_image_data / (1024 * 1024 * 16)
              ) + 1
            }}-{{
              parseInt(
                item.orderData.diskspace_image_data / (1024 * 1024 * 1.5)
              ) + 9
            }}{{ $t("my_machine_min") }}</span
          >
          <span
            class="cRed"
            v-else-if="
              item.orderData.order_id_pre !== null &&
              (item.orderData.creating_container || creating_container) &&
              !item.orderData.order_is_cancer &&
              !item.orderData.order_is_over &&
              !item.orderData.rent_success &&
              !item.orderData.pay_error &&
              item.orderData.from_stop_to_open
            "
            >{{ $t("myMachine_is_vocing_machine_update_stop_to_open")
            }}{{
              parseInt(
                item.orderData.diskspace_image_data / (1024 * 1024 * 16)
              ) + 1
            }}-{{
              parseInt(
                item.orderData.diskspace_image_data / (1024 * 1024 * 1.5)
              ) + 9
            }}{{ $t("my_machine_min") }}</span
          >

          <span
            class="cRed"
            v-else-if="
              isPaying &&
              !item.orderData.order_is_cancer &&
              !item.orderData.pay_success &&
              !item.orderData.order_is_over &&
              !item.orderData.rent_success &&
              !item.orderData.pay_error &&
              $t('website_name') === 'congTuCloud'
            "
            >{{ $t("myMachine_is_paying") }}</span
          >
          <span
            class="cRed"
            v-else-if="
              isPaying &&
              !item.orderData.order_is_cancer &&
              !item.orderData.pay_success &&
              !item.orderData.order_is_over &&
              !item.orderData.rent_success &&
              !item.orderData.pay_error
            "
            >{{ $t("myMachine_is_dbc_transfering") }}</span
          >
          <span class="cRed" v-else-if="local_pay_error && !isPaying">{{
            $t("myMachine_is_transfer_error")
          }}</span>
          <span
            class="cRed"
            v-else-if="
              ((item.orderData.vocing_pay || ispayPocing) &&
                !item.orderData.order_is_cancer &&
                !item.orderData.rent_success &&
                !item.orderData.order_is_over &&
                item.orderData.container_is_exist &&
                item.orderData.order_id_pre === null) ||
              ((item.orderData.vocing_pay || ispayPocing) &&
                !item.orderData.order_is_cancer &&
                !item.orderData.pay_success &&
                !item.orderData.order_is_over &&
                item.orderData.order_id_pre != null)
            "
            >{{ $t("my_machine_order_vocing_pay") }}</span
          >
          <span
            class="cRed"
            v-else-if="
              item.mcData.gpu_be_used === item.mcData.gpu_count &&
              item.orderData.order_is_cancer === false &&
              !item.orderData.rent_success &&
              !item.orderData.order_is_over &&
              !item.orderData.container_is_exist
            "
            >{{ $t("myMachine_maybe_is_used") }}</span
          >
          <span
            class="cRed"
            v-else-if="
              !isShowRendSuccessMsg(item.orderData.milli_rent_success_time) &&
              item.orderData.rent_success &&
              !item.orderData.order_is_over &&
              !item.mcData.can_create_cpu_container
            "
            >{{ $t("no_container") }}</span
          >
          <span
            v-else-if="
              item.orderData.rent_success === false &&
              ((item.orderData.order_id_pre === null &&
                item.orderData.container_is_exist === true &&
                item.orderData.pay_error === false) ||
                (item.orderData.order_id_pre !== null &&
                  item.orderData.order_is_over === false &&
                  item.orderData.order_is_cancer === false &&
                  item.orderData.pay_success === false &&
                  item.orderData.pay_error === false))
            "
            >{{ $t("myMachine_confirm_pay_tip") }}</span
          >
        </div>
        <div
          v-if="
            item.orderData.order_is_cancer === false &&
            !(
              item.orderData.return_dbc === true &&
              item.orderData.pay_error === true
            )
          "
          class="r-wrap"
        >
          <el-button
            v-if="item.orderData.order_is_over"
            plain
            class="tool-btn"
            size="mini"
            style="width: 86px"
            :style="styleHidden"
            @click="openRateDlg(item)"
            >{{ $t("gpu.rate") }}</el-button
          >
          <template v-else-if="item.orderData.rent_success">
            <!--<el-button plain style="width: 86px" class="tool-btn" size="mini"
                       @click="dlgReload_open = true">
              {{$t('gpu.reload')}}
            </el-button>-->

            <el-button
              plain
              v-if="
                isShowRendSuccessMsg(item.orderData.milli_rent_success_time)
              "
              class="tool-btn"
              style="width: 100px"
              size="mini"
              :loading="
                send_email_repeatLoading && send_email_repeat_index === index
              "
              @click="send_email_repeat(item, index)"
              >{{ $t("send_email_repeat") }}</el-button
            >

            <el-button
              plain
              v-if="item.orderData.try_rent === false"
              class="tool-btn"
              style="width: 80px"
              size="mini"
              :loading="continue_payLoading && continue_pay_index === index"
              @click="openContinuePay(item, index)"
              >{{ $t("continue_pay") }}</el-button
            >
            <el-tooltip
              class="item"
              v-if="
                item.mcData.dbc_version !== '0.3.7.2' &&
                item.orderData.try_rent === false &&
                $t('website_name') != 'congTuCloud'
              "
              effect="dark"
              :content="$t('stoprent_tip_mymachine')"
            >
              <el-button
                plain
                v-if="item.orderData.try_rent === false"
                class="tool-btn"
                style="width: 90px"
                size="mini"
                @click="stopRent(item)"
                >{{ $t("unsubscribe") }}</el-button
              >
            </el-tooltip>
            <el-tooltip
              class="item"
              v-if="
                item.mcData.dbc_version !== '0.3.7.2' &&
                item.orderData.try_rent === false &&
                $t('website_name') === 'congTuCloud'
              "
              effect="dark"
              :content="null"
            >
              <el-button
                plain
                v-if="item.orderData.try_rent === false"
                class="tool-btn"
                style="width: 90px"
                size="mini"
                @click="stopRent(item)"
                >{{ $t("unsubscribe") }}</el-button
              >
            </el-tooltip>

            <el-button
              plain
              v-if="
                item.mcData.dbc_version === '0.3.7.2' &&
                item.orderData.try_rent === false
              "
              class="tool-btn"
              style="width: 110px"
              size="mini"
              @click="stopRent(item)"
              >{{ $t("unsubscribe") }}</el-button
            >

            <el-tooltip
              class="item"
              v-if="
                item.orderData.try_rent === false &&
                $t('website_name') != 'congTuCloud'
              "
              effect="dark"
              :content="$t('stopgpu_tip_mymachine')"
            >
              <el-button
                plain
                class="tool-btn"
                style="width: 110px"
                size="mini"
                @click="stopGpu(item, index)"
                :disabled="
                  item.mcData.dbc_version === '0.3.7.2' ||
                  !item.mcData.can_create_cpu_container
                "
                :loading="rentLoading_cpu && rent_cpu_index === index"
                >{{ $t("stopGpu_mymachine") }}</el-button
              >
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('restart_tip_mymachine')"
            >
              <el-button
                plain
                class="tool-btn"
                style="width: 110px"
                size="mini"
                @click="restartMachine(item)"
                >{{ $t("restart_machine") }}</el-button
              >
            </el-tooltip>
          </template>

          <el-button
            v-else-if="
              item.orderData.return_dbc === false && item.orderData.pay_error
            "
            class="tool-btn"
            style="width: 86px"
            plain
            size="mini"
            @click="openReturnDbc(item)"
            >{{ $t("myMachine_return_dbc") }}</el-button
          >
          <template v-else-if="item.orderData.rent_success === false">
            <el-button
              v-if="
                (item.orderData.order_id_pre === null &&
                  item.orderData.container_is_exist === true &&
                  item.orderData.pay_error === false) ||
                (item.orderData.order_id_pre !== null &&
                  item.orderData.order_is_over === false &&
                  item.orderData.order_is_cancer === false &&
                  item.orderData.pay_success === false &&
                  item.orderData.pay_error === false)
              "
              :disabled="
                item.verifing === true ||
                item.orderData.vocing_pay ||
                ispayPocing
              "
              plain
              :loading="isPaying"
              class="tool-btn"
              size="mini"
              @click="openPay(item)"
              >{{ $t("myMachine_confirm_pay") }}</el-button
            >
            <!--     <el-button
              v-if="item.orderData.container_is_exist===true && item.orderData.pay_error===false"
              :disabled="isPaying||item.verifing === true || item.orderData.vocing_pay||ispayPocing"
              plain
              class="tool-btn"
              size="mini"
              @click="paid(item)"
            >{{$t('myMachine_paid')}}</el-button>-->
            <el-button
              v-if="
                item.orderData.order_id_pre === null ||
                item.orderData.pay_success === false
              "
              :disabled="isPaying"
              class="tool-btn"
              size="mini"
              plain
              :loading="isCancering"
              @click="cancelOrder(item)"
              >{{ $t("myMachine_concer_order") }}</el-button
            >
          </template>
        </div>
      </div>
    </div>
    <!--    reload-dlg-->
    <dlg-reload :open.sync="dlgReload_open"></dlg-reload>
    <!--    increaseHD-dlg-->
    <dlg-hd :open.sync="dlgHD_open"></dlg-hd>
    <!--    bindMail-dlg-->
    <dlg-mail
      :open.sync="dlgMail_open"
      :is-new-mail="isNewMail"
      @binding="binding"
      @fail="bindFail"
    ></dlg-mail>
    <!--    Unsubscribe-->
    <dlg-unsubscribe
      :item="curItem"
      :open.sync="dlgUnsubscribe_open"
      @success="stopRentSuccess"
    ></dlg-unsubscribe>

    <!--    restart-->
    <dlg-restart
      :item="curItem"
      :open.sync="dlgRestart_open"
      @success="restartSuccess"
    ></dlg-restart>

    <!--    rate-->
    <dlg-rate
      :open.sync="dlgRate_open"
      :item="curItem"
      @success="successRate"
    ></dlg-rate>
    <!--    return dbc-->
    <dlg-return-dbc
      :open.sync="dlgReturnDbc_open"
      :item="curItem"
      @success="returnSuccess"
    ></dlg-return-dbc>
    <dlg-continuepay
      :open.sync="openContinueDlg"
      :place-order-data="placeOrderData"
      @confirm="createOrder"
    ></dlg-continuepay>
    <dlg-leasestopgpu
      :open.sync="dlg_stopgpu"
      :place-order-data="placeOrderData"
      @confirm="switch_cpu_mode"
    ></dlg-leasestopgpu>
    <dlg-leasecpupayment
      :open.sync="dlg_opencpupayment"
      :place-order-data="placeOrderData"
      @confirm="createOrderCpu"
    ></dlg-leasecpupayment>
    <dlg-leasecpudeposit
      :open.sync="dlg_opencpudeposit"
      :place-order-data="placeOrderData"
      @confirm="createOrderCpu"
    ></dlg-leasecpudeposit>

    <dlg-leaseconfirmpay
      :open.sync="dlg_leaseconfirmpay"
      :place-order-data="placeOrderData"
      @confirm="switch_pay"
    ></dlg-leaseconfirmpay>
  </div>
</template>

<script>
import cookie from "js-cookie";
import DlgReload from "@/components/machine/dlg_reload";
import DlgHd from "@/components/machine/dlg_increaseHD";
import DlgMail from "@/components/machine/dlg_bindMail";
import DlgUnsubscribe from "@/components/machine/dlg_unsubscribe";
import DlgRestart from "@/components/machine/dlg_restart";
import DlgRate from "@/components/machine/dlg_rate";
import DlgReturnDbc from "@/components/machine/dlg_returnDbc";
import DlgContinuepay from "@/components/machine/dlg_continuepay";
import DlgLeasestopgpu from "@/components/machine/dlg_leasestopgpu";
import DlgLeasecpudeposit from "@/components/machine/dlg_leasecpudeposit";
import DlgLeasecpupayment from "@/components/machine/dlg_leasecpupayment";
import DlgLeaseconfirmpay from "@/components/machine/dlg_leaseconfirmpay";
import {
  queryBindMail_rent,
  continue_pay_get_dbc_price,
  continue_pay_get_pay_dbc_count,
  continue_pay_create_order,
  continue_pay_place_order,
  query_machine_by_wallet,
  get_create_container_time,
  get_dbchain_address,
  get_all_order,
  can_rent_this_machine,
  pay,
  get_cancer_code,
  cancer_order,
  binding_is_ok,
  binding_is_ok_modify,
  get_stop_code,
  stop,
  get_return_dbc_code,
  request_return_dbc,
  pay_update,
  update_container_is_ok,
  place_order_gpu_to_cpu_new,
  get_dbc_price,
  create_order,
  create_order_congtu,
  send_email_repeat,
  get_pay_status,
  get_dbc_res_code,
  get_order_id_list,
} from "@/api";

import { getAccount, transfer, getBalance, getCookie } from "@/utlis";

export default {
  name: "myMachine_unlock",
  components: {
    DlgReload,
    DlgHd,
    DlgMail,
    DlgUnsubscribe,
    DlgRestart,
    DlgRate,
    DlgReturnDbc,
    DlgContinuepay,
    DlgLeasecpudeposit,
    DlgLeasecpupayment,
    DlgLeasestopgpu,
    DlgLeaseconfirmpay,
  },
  data() {
    return {
      dlgRestart_open: false,
      styleHidden: {},
      rateValue: undefined,
      dlgReload_open: false,
      dlgHD_open: false,
      dlgMail_open: false,
      dlgUnsubscribe_open: false,
      dlgRate_open: false,
      dlgReturnDbc_open: false,
      dlg_opencpupayment: false,
      dlg_opencpudeposit: false,
      dlg_stopgpu: false,
      openContinueDlg: false,
      dlg_leaseconfirmpay: false,
      isNewMail: false,
      isBinding: false,
      isBinded: false,
      placeOrderData: undefined,
      bindMail: "",

      res_body: {
        content: [],
      },
      isPaying: false,
      local_pay_error: false,
      ispayPocing: false,
      isPocing: false,
      curItem: undefined,
      isRateEdit: false,
      si: undefined,
      queryOrderListSi: undefined,
      container_tips: "",
      creating_container: false,
      isCancering: false,
      continue_payLoading: false,
      rentLoading_cpu: false,
      rent_cpu_index: -1,
      send_email_repeatLoading: false,
      send_email_repeat_index: -1,
      continue_pay_index: -1,
      times: 20,
      getAlipayStatusTimer: "",
      getDbcResCodeTimer: "",
      orderCount: 0,
    };
  },

  watch: {
    "$i18n.locale"() {
      this.queryOrderList().then((res) => {
        if (res.status === 1) {
          this.forceToPocMachine();
          this.forceToPocMachineUpdate();
        }
      });
      if (this.queryOrderListSi) {
        clearInterval(this.queryOrderListSi);
      }
      let timesRun = 0;
      this.queryOrderListSi = setInterval(() => {
        timesRun += 1;
        if (timesRun === this.times) {
          clearInterval(this.queryOrderListSi);
        }

        if (this.isPaying !== true) {
          this.queryOrderList().then((res) => {
            if (res.status === 1) {
              this.forceToPocMachine();
              this.forceToPocMachineUpdate();
            }
          });
        }
      }, 15000);
    },
  },
  mounted() {
    if (this.$t("website_name") === "congTuCloud") {
      this.styleHidden.visibility = "hidden";
    }
  },
  activated() {
    // this.binding(isNewMail);
    this.ispayPocing = false;
    this.queryMail();
    this.queryOrderList().then((res) => {
      if (res.status === 1) {
        this.forceToPocMachine();
        this.forceToPocMachineUpdate();
      }
    });
    if (this.queryOrderListSi) {
      clearInterval(this.queryOrderListSi);
    }
    let timesRun = 0;
    this.queryOrderListSi = setInterval(() => {
      timesRun += 1;
      if (timesRun === this.times) {
        clearInterval(this.queryOrderListSi);
      }
      if (this.isPaying !== true) {
        this.queryOrderList().then((res) => {
          if (res.status === 1) {
            this.forceToPocMachine();
            this.forceToPocMachineUpdate();
          }
        });
      }
    }, 15000);
  },
  deactivated() {
    if (this.queryOrderListSi) {
      clearInterval(this.queryOrderListSi);
    }
    if (this.si) {
      clearInterval(this.si);
    }
  },

  computed: {
    rentNumber() {
      return this.res_body.content.filter((item) => {
        return item.orderData.rent_success;
      }).length;
    },
  },
  methods: {
    openPay(item) {
      console.log("openpay------------------");
      console.log(item);
      this.dlg_leaseconfirmpay = true;
      this.placeOrderData = item;
    },

    switch_pay(item) {
      this.dlg_leaseconfirmpay = false;
      if (item.switch_pay_mode === "confirm_pay") {
        if (this.$t("website_name") === "congTuCloud") {
          this.payOrder_congtu(item);
        } else {
          this.payOrder(item);
        }
      } else if (item.switch_pay_mode === "paid") {
        this.paid(item);
      }
    },

    stopGpu(item, index) {
      // item.rentLoading_cpu = true;
      this.dlg_stopgpu = true;
      this.placeOrderData = item.orderData;
      this.placeOrderData.index = index;
      //   confirm_new("", this.$t("cpu_mode_switch"));
      //    this.confirm_new("xxx", this.$t("cpu_mode_switch"), item);
    },

    switch_cpu_mode(item) {
      this.dlg_stopgpu = false;
      if (item.switch_cpu_mode === "payment") {
        this.to_payment(item, item.index);
      } else if (item.switch_cpu_mode === "deposit") {
        this.to_deposit(item, item.index);
      }
    },

    to_payment(item, index) {
      this.rentLoading_cpu = true;
      this.rent_cpu_index = index;
      this.$forceUpdate();
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      place_order_gpu_to_cpu_new({
        machine_type: item.machine_type,
        machine_id: item.machine_id,
        wallet_address_user: getAccount().address,
        mode: "payment",
        order_id_pre: item.order_id,
        user_name_platform,
        language,
      })
        .then((res_1) => {
          if (res_1.status === 1) {
            this.placeOrderData = res_1.content;
            this.placeOrderData.dbc_price = 0.0026;
            return get_dbc_price({
              order_id: this.placeOrderData.order_id,
              user_name_platform,
              language,
            });
          } else {
            this.$message({
              showClose: true,
              message: res_1.msg,
              type: "error",
            });
            return Promise.reject(res_1.msg);
          }
        })
        .then((res_2) => {
          if (res_2.status === 1) {
            this.placeOrderData.dbc_price = res_2.content;
            this.dlg_opencpupayment = true;
          } else {
            this.$message({
              showClose: true,
              message: res_2.msg,
              type: "success",
            });
            return Promise.reject(res_2.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.rentLoading_cpu = false;
          this.rent_cpu_index = index;
        });
    },

    to_deposit(item, index) {
      this.rentLoading_cpu = true;
      this.rent_cpu_index = index;
      this.$forceUpdate();
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      place_order_gpu_to_cpu_new({
        machine_type: item.machine_type,
        machine_id: item.machine_id,
        wallet_address_user: getAccount().address,
        user_name_platform,
        mode: "deposit",
        order_id_pre: item.order_id,
        language,
      })
        .then((res_1) => {
          if (res_1.status === 1) {
            this.placeOrderData = res_1.content;
            this.placeOrderData.dbc_price = 0.0026;
            return get_dbc_price({
              order_id: this.placeOrderData.order_id,
              user_name_platform,
              language,
            });
          } else {
            this.$message({
              showClose: true,
              message: res_1.msg,
              type: "error",
            });
            return Promise.reject(res_1.msg);
          }
        })
        .then((res_2) => {
          if (res_2.status === 1) {
            this.placeOrderData.dbc_price = res_2.content;
            this.dlg_opencpudeposit = true;
          } else {
            this.$message({
              showClose: true,
              message: res_2.msg,
              type: "success",
            });
            return Promise.reject(res_2.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.rentLoading_cpu = false;
          this.rent_cpu_index = index;
        });
    },

    createOrderCpu(params) {
      const loading = this.$loading();
      create_order(params)
        .then((res) => {
          if (res.status === 1) {
            this.$message({
              showClose: true,
              message: this.$t("list_create_order_success"),
              type: "success",
            });

            this.dlg_stopgpu = false;
            this.dlg_opencpupayment = false;
            this.dlg_opencpudeposit = false;
            if (params.gpu_count === 0) {
              this.$router.push("/mymachine/myMachine_cpu");
            } else {
              this.$router.push("/mymachine/myMachine");
            }
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
          }
        })
        .finally(() => {
          loading.close();
        });
    },

    pushContinuePayDetail(order_id, order_is_over) {
      this.$router.push(
        "/continuePayDetail?order_id=" +
          order_id +
          "&order_is_over=" +
          order_is_over
      );
    },
    createOrder(params) {
      const loading = this.$loading();

      continue_pay_create_order(params)
        .then((res) => {
          if (res.status === 1) {
            this.$message({
              showClose: true,
              message: this.$t("list_create_order_success"),
              type: "success",
            });
            this.openContinueDlg = false;
            this.$router.push(
              "/continuePayDetail?order_id=" +
                params.order_id +
                "&order_is_over=" +
                params.order_is_over
            );
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
          }
        })
        .finally(() => {
          loading.close();
        });
    },
    // 打开弹窗
    openContinuePay(item, index) {
      this.continue_payLoading = true;
      this.continue_pay_index = index;
      this.$forceUpdate();
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      continue_pay_place_order({
        order_id: item.orderData.order_id,

        user_name_platform,
        language,
      })
        .then((res_1) => {
          if (res_1.status === 1) {
            this.placeOrderData = res_1.content;
            // this.placeOrderData.dbc_price = -1;
            return continue_pay_get_dbc_price({
              continue_pay_order_id: this.placeOrderData.continue_pay_order_id,
              user_name_platform,
              language,
            });
          } else {
            this.$message({
              showClose: true,
              message: res_1.msg,
              type: "error",
            });
            return Promise.reject(res_1.msg);
          }
        })
        .then((res_2) => {
          if (res_2.status === 1) {
            this.placeOrderData.dbc_price = res_2.content;
            this.openContinueDlg = true;
          } else {
            this.$message({
              showClose: true,
              message: res_2.msg,
              type: "success",
            });
            return Promise.reject(res_2.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.continue_payLoading = false;
          this.continue_pay_index = -1;
        });
    },

    forceToPocMachine() {
      // pay before
      let order = this.res_body.content.find((item, index) => {
        // console.log(index)
        // console.log(item.orderData.creating_container)
        // console.log(item.orderData.container_is_exist)
        return (
          item.orderData.order_id_pre === null &&
          !item.orderData.order_is_over &&
          !item.orderData.order_is_cancer &&
          !item.orderData.rent_success &&
          !item.orderData.vocing_pay &&
          !item.orderData.pay_error &&
          !item.orderData.container_is_exist
        );
      });
      if (order) {
        this.pocMachine(order);
      }
    },

    forceToPocMachineUpdate() {
      // pay before
      let order = this.res_body.content.find((item, index) => {
        // console.log(index)
        // console.log(item.orderData.creating_container)
        // console.log(item.orderData.container_is_exist)
        return (
          item.orderData.order_id_pre !== null &&
          !item.orderData.order_is_over &&
          !item.orderData.order_is_cancer &&
          !item.orderData.rent_success &&
          item.orderData.pay_success &&
          !item.orderData.container_is_exist
        );
      });
      if (order) {
        this.pocMachineUpdate(order);
      }
    },

    forceToPocIsPayed() {
      // pay before
      let order = this.res_body.content.find((item, index) => {
        // console.log(index)
        // console.log(item.orderData.creating_container)
        // console.log(item.orderData.container_is_exist)
        return (
          !item.orderData.order_is_over &&
          !item.orderData.order_is_cancer &&
          !item.orderData.rent_success &&
          !item.orderData.vocing_pay &&
          !item.orderData.pay_error &&
          item.orderData.container_is_exist
        );
      });
      if (order) {
        this.pocIsPayed(order);
      }
    },
    pocIsPayed(item) {
      this.PocingPayed = true;
      clearInterval(this.si);
      //item.orderData.creating_container = true;
      this.si = setInterval(() => {
        //   if (item.orderData.isPocing) {
        //     return;
        //   }
        const user_name_platform = this.$t("website_name");
        const language = this.$i18n.locale;
        return can_rent_this_machine({
          order_id: item.orderData.order_id,
          user_name_platform,
          language,
        }).then((res) => {
          if (res.status === 1 && res.content) {
            console.log(res.msg);
            item.notice = "";
            this.queryOrderList();
            clearInterval(this.si);
          } else if (res.status === 2) {
            // item.orderData.creating_container = true;
            this.queryOrderList();
            return Promise.reject({
              status: 2,
              msg: "正在验证机器环境是否可用，请耐心等待，大概需要1-3分钟",
            });
          } else if (!res.content) {
            this.queryOrderList();
            clearInterval(this.si);
            return Promise.reject({
              status: -1,
              msg: "机器可能已经被租用，请取消订单，重新租用其他机器",
            });
          } else {
            this.queryOrderList();
            clearInterval(this.si);
            return Promise.reject({
              status: -1,
              msg: res.msg,
            });
          }

          if (item.orderData.order_is_cancer) {
            clearInterval(this.si);
          }
        });
      }, 5000);
    },
    pocMachine(item) {
      this.isPocing = true;
      clearInterval(this.si);
      item.orderData.creating_container = true;
      this.si = setInterval(() => {
        //   if (item.orderData.isPocing) {
        //     return;
        //   }
        const user_name_platform = this.$t("website_name");
        const language = this.$i18n.locale;
        return can_rent_this_machine({
          order_id: item.orderData.order_id,
          user_name_platform,
          language,
        })
          .then((res) => {
            if (res.status === 1 && res.content) {
              console.log(res.msg);
              item.notice = "";
              this.queryOrderList();
              this.creating_container = false;
              this.ispayPocing = false;
              clearInterval(this.si);
              times = 150;
            } else if (res.status === 2) {
              // item.orderData.creating_container = true;
              this.ispayPocing = false;
              this.queryOrderList();
              return Promise.reject({
                status: 2,
                msg: "正在验证机器环境是否可用，请耐心等待，大概需要3分钟",
              });
            } else if (res.status == -1) {
              this.container_tips = res.msg;
              this.creating_container = false;
              this.ispayPocing = false;
              clearInterval(this.si);
              this.queryOrderList();
              this.$message({
                showClose: true,
                message: res.msg,
                type: "error",
              });
            } else if (!res.content) {
              this.queryOrderList();
              this.creating_container = false;
              this.ispayPocing = false;
              clearInterval(this.si);
              return Promise.reject({
                status: -1,
                msg: "机器可能已经被租用，请取消订单，重新租用其他机器",
              });
            } else {
              this.queryOrderList();
              this.creating_container = false;
              this.ispayPocing = false;
              clearInterval(this.si);

              return Promise.reject({
                status: -1,
                msg: res.msg,
              });
            }

            if (item.orderData.order_is_cancer) {
              this.ispayPocing = false;
              clearInterval(this.si);
            }
          })
          .catch((err) => {
            this.ispayPocing = false;
            this.queryOrderList();
            clearInterval(this.si);
          });
      }, 5000);
    },

    pocMachineUpdate(item) {
      this.isPocing = true;
      clearInterval(this.si);
      item.orderData.creating_container = true;
      this.si = setInterval(() => {
        //   if (item.orderData.isPocing) {
        //     return;
        //   }
        const user_name_platform = this.$t("website_name");
        const language = this.$i18n.locale;
        return update_container_is_ok({
          order_id: item.orderData.order_id,
          user_name_platform,
          language,
        })
          .then((res) => {
            if (res.status === 1 && res.content) {
              console.log(res.msg);
              item.notice = "";
              this.creating_container = false;
              this.queryOrderList();
              clearInterval(this.si);
            } else if (res.status === 2) {
              // item.orderData.creating_container = true;
              this.queryOrderList();
            } else if (res.status == -1) {
              this.container_tips = res.msg;
              clearInterval(this.si);
              this.creating_container = false;
              this.queryOrderList();
              this.$message({
                showClose: true,
                message: res.msg,
                type: "error",
              });
            } else if (!res.content) {
              this.queryOrderList();
              this.creating_container = false;
              clearInterval(this.si);
            } else {
              this.queryOrderList();
              this.creating_container = false;
              clearInterval(this.si);

              return Promise.reject({
                status: -1,
                msg: res.msg,
              });
            }

            if (item.orderData.order_is_cancer) {
              clearInterval(this.si);
            }
          })
          .catch((err) => {
            this.queryOrderList();
            clearInterval(this.si);
          });
      }, 5000);
    },

    paid(item) {
      clearInterval(this.si);

      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      // const txid = res.response.txid;
      item.orderData.vocing_pay = true;
      this.ispayPocing = true;
      if (item.orderData.order_id_pre === null) {
        this.si = setInterval(() => {
          return pay({
            order_id: item.orderData.order_id,
            // dbc_hash: txid,
            user_name_platform,
            language,
          })
            .then((res) => {
              this.queryOrderList();
              if (res.status === 1) {
                clearInterval(this.si);

                this.ispayPocing = false;
                item.orderData.vocing_pay = false;
                this.queryOrderList();
              } else if (res.status === 2) {
                this.queryOrderList();
              } else if (res.status === -1) {
                this.queryOrderList();
                this.ispayPocing = false;
                item.orderData.vocing_pay = false;
                clearInterval(this.si);
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "error",
                });
              }
            })
            .catch((err) => {
              //  clearInterval(this.si);
            });
        }, 5000);
      } else {
        this.si = setInterval(() => {
          return pay_update({
            order_id: item.orderData.order_id,
            // dbc_hash: txid,
            user_name_platform,
            language,
          })
            .then((res) => {
              // this.queryOrderList();
              if (res.status === 1) {
                clearInterval(this.si);
                this.ispayPocing = false;
                this.creating_container = true;
                item.orderData.vocing_pay = false;
                this.queryOrderList();
                this.forceToPocMachineUpdate();
              } else if (res.status === -1) {
                clearInterval(this.si);
                this.ispayPocing = false;
                item.orderData.vocing_pay = false;
                this.queryOrderList();
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "error",
                });
              } else if (res.status === 2) {
                // item.orderData.creating_container = true;
                this.queryOrderList();
              }
            })
            .catch((err) => {
              // this.ispayPocing = false;
              // clearInterval(this.si);
            });
        }, 5000);
      }
    },

    // pay
    payOrder(item) {
      clearInterval(this.si);
      this.ispayPocing = false;
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      get_dbchain_address({
        order_id: item.orderData.order_id,
        user_name_platform,
        language,
      }).then((res) => {
        if (res.status === 1 && res.content) {
          const amount =
            item.orderData.dbc_total_count + item.orderData.code * 1;
          this.isPaying = true;
          this.local_pay_error = false;
          return transfer({
            toAddress: res.content,
            amount,
          }).then((res) => {
            if (res.status === 1) {
              this.$message({
                showClose: true,
                message: this.$t("transfer_success"),
                type: "success",
              });
              const txid = res.response.txid;

              // pay after
              this.isPaying = false;
              item.orderData.vocing_pay = true;
              const user_name_platform = this.$t("website_name");
              const language = this.$i18n.locale;
              this.ispayPocing = true;
              this.times = 10; //此时重新设置为10
              // 支付后确认

              if (item.orderData.order_id_pre === null) {
                this.si = setInterval(() => {
                  return pay({
                    order_id: item.orderData.order_id,
                    dbc_hash: txid,
                    user_name_platform,
                    language,
                  })
                    .then((res) => {
                      this.queryOrderList();
                      if (res.status === 1) {
                        clearInterval(this.si);

                        this.ispayPocing = false;
                        item.orderData.vocing_pay = false;
                        this.queryOrderList();
                      } else if (res.status === 2) {
                        this.queryOrderList();
                      } else if (res.status === -1) {
                        this.queryOrderList();
                        this.ispayPocing = false;
                        item.orderData.vocing_pay = false;
                        clearInterval(this.si);
                        this.$message({
                          showClose: true,
                          message: res.msg,
                          type: "error",
                        });
                      }
                    })
                    .catch((err) => {
                      //   this.ispayPocing = false;
                      //   clearInterval(this.si);
                    });
                }, 8000);
              } else {
                this.si = setInterval(() => {
                  return pay_update({
                    order_id: item.orderData.order_id,
                    dbc_hash: txid,
                    user_name_platform,
                    language,
                  })
                    .then((res) => {
                      // this.queryOrderList();
                      if (res.status === 1) {
                        clearInterval(this.si);
                        this.ispayPocing = false;
                        this.creating_container = true;
                        item.orderData.vocing_pay = false;
                        this.queryOrderList();
                        this.forceToPocMachineUpdate();
                      } else if (res.status === -1) {
                        clearInterval(this.si);
                        this.ispayPocing = false;
                        item.orderData.vocing_pay = false;
                        this.queryOrderList();
                        this.$message({
                          showClose: true,
                          message: res.msg,
                          type: "error",
                        });
                      } else if (res.status === 2) {
                        // item.orderData.creating_container = true;
                        this.queryOrderList();
                      }
                    })
                    .catch((err) => {
                      //   this.ispayPocing = false;
                      //   clearInterval(this.si);
                    });
                }, 8000);
              }
            } else {
              this.isPaying = false;
              this.$message({
                showClose: true,
                message: this.$t("transfer_error"),
                type: "error",
              });
              clearInterval(this.si);
              this.local_pay_error = true;
              console.log("转账失败");
            }
          });
        } else {
          return Promise.reject({
            status: -1,
            msg: "机器可能已经被租用，请取消订单，重新租用其他机器",
          });
        }
      });
      // pay

      //  }, 5000);
    },
    payOrder_congtu(item) {
      clearInterval(this.si);
      this.ispayPocing = false;
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      get_dbchain_address({
        order_id: item.orderData.order_id,
        user_name_platform,
        language,
      }).then((res) => {
        console.log("-=-=-=-=get_dbchain_address==============");
        console.log(res);
        if (res.status === 1 && res.content) {
          this.isPaying = true;
          this.local_pay_error = false;
          create_order_congtu({
            response: {},
            orderData: item.orderData.order_id,
            dbcCode: item.orderData.code,
            tradeNoPre: "21712",
          })
            .then((res) => {
              console.log("-=-=-=-=-create_aliPay_order_congtu==========");
              console.log(res);
              let alipay = window.open();
              alipay.document.body.innerHTML = res.slice(
                0,
                res.search("<script>")
              );
              alipay.document.body.getElementsByTagName("form")[0].submit();
              // todo 定时 从后台数据库获取支付宝支付状态（包含dbc转账参数）
              // todo 如果支付成功，返回参数， 为pay（）预备参数:txid
              this.getAlipayStatusTimer = setInterval(() => {
                get_pay_status({
                  order_id: item.orderData.order_id,
                  language,
                }).then((res) => {
                  console.log("get_pay_status-------");
                  console.log(res);
                  if (res.content === "ok") {
                    clearInterval(this.getAlipayStatusTimer);
                    this.getDbcResCodeTimer = setInterval(() => {
                      get_dbc_res_code({
                        order_id: item.orderData.order_id,
                        language,
                      }).then((res) => {
                        console.log("get_dbc_res_code-------");
                        console.log(res);
                        if (
                          res.content != null ||
                          res.content != undefined ||
                          res.content != ""
                        ) {
                          clearInterval(this.getDbcResCodeTimer);
                          const txid = res.content;

                          // pay after
                          this.isPaying = false;
                          item.orderData.vocing_pay = true;
                          const user_name_platform = this.$t("website_name");
                          const language = this.$i18n.locale;
                          this.ispayPocing = true;
                          this.times = 10; //此时重新设置为10
                          // 支付后确认

                          if (item.orderData.order_id_pre === null) {
                            this.si = setInterval(() => {
                              return pay({
                                order_id: item.orderData.order_id,
                                dbc_hash: txid,
                                user_name_platform,
                                language,
                              })
                                .then((res) => {
                                  console.log("pay-------");
                                  console.log(res);
                                  this.queryOrderList();
                                  if (res.content.status === 1) {
                                    clearInterval(this.si);

                                    this.ispayPocing = false;
                                    item.orderData.vocing_pay = false;
                                    this.queryOrderList();
                                  } else if (res.content.status === 2) {
                                    this.queryOrderList();
                                  } else if (res.content.status === -1) {
                                    this.queryOrderList();
                                    this.ispayPocing = false;
                                    item.orderData.vocing_pay = false;
                                    clearInterval(this.si);
                                    this.$message({
                                      showClose: true,
                                      message: res.msg,
                                      type: "error",
                                    });
                                  }
                                })
                                .catch((err) => {
                                  //   this.ispayPocing = false;
                                  //   clearInterval(this.si);
                                });
                            }, 8000);
                          } else {
                            this.si = setInterval(() => {
                              return pay_update({
                                order_id: item.orderData.order_id,
                                dbc_hash: txid,
                                user_name_platform,
                                language,
                              })
                                .then((res) => {
                                  // this.queryOrderList();
                                  if (res.status === 1) {
                                    clearInterval(this.si);
                                    this.ispayPocing = false;
                                    this.creating_container = true;
                                    item.orderData.vocing_pay = false;
                                    this.queryOrderList();
                                    this.forceToPocMachineUpdate();
                                  } else if (res.status === -1) {
                                    clearInterval(this.si);
                                    this.ispayPocing = false;
                                    item.orderData.vocing_pay = false;
                                    this.queryOrderList();
                                    this.$message({
                                      showClose: true,
                                      message: res.msg,
                                      type: "error",
                                    });
                                  } else if (res.status === 2) {
                                    // item.orderData.creating_container = true;
                                    this.queryOrderList();
                                  }
                                })
                                .catch((err) => {
                                  //   this.ispayPocing = false;
                                  //   clearInterval(this.si);
                                });
                            }, 8000);
                          }
                        } else {
                          this.isPaying = false;
                          this.$message({
                            showClose: true,
                            message: this.$t("transfer_error"),
                            type: "error",
                          });
                          clearInterval(this.si);
                          this.local_pay_error = true;
                          console.log("转账失败");
                        }
                      });
                    }, 1000);
                  }
                });
              }, 1000);
            })
            .catch((err) => {
              if (err) {
                console.log(err);
              }
            })
            .finally(() => {
              console.log("一定会执行的语句");
            });
        }
      });
    },

    // cancel
    cancelOrder(item) {
      this.isCancering = true;
      get_cancer_code({
        order_id: item.orderData.order_id,
        user_name_platform: this.$t("website_name"),
        language: this.$i18n.locale,
      })
        .then((res) => {
          if (res.status === 1) {
            this.$prompt(
              this.$t("myMachine_code_send"),
              this.$t("myMachine_cancer_order"),
              {
                confirmButtonText: this.$t("myMachine_confirm"),
                cancelButtonText: this.$t("myMachine_cancer"),
              }
            )
              .then(({ value }) => {
                return cancer_order({
                  order_id: item.orderData.order_id,
                  cancer_code: value,
                  user_name_platform: this.$t("website_name"),
                  language: this.$i18n.locale,
                });
              })
              .then((res) => {
                if (res.status === 1) {
                  this.isCancering = false;
                  this.$message({
                    showClose: true,
                    message: res.msg,
                    type: "success",
                  });
                  this.queryOrderList();
                } else {
                  this.isCancering = false;
                  this.$message({
                    showClose: true,
                    message: res.msg,
                    type: "error",
                  });
                }
              })
              .catch((err) => {
                this.isCancering = false;
                if (err) {
                  console.log(err);
                }
              });
          } else {
            this.isCancering = false;
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
            return Promise.reject();
          }
        })

        .catch((err) => {
          this.isCancering = false;
        })
        .finally(() => {});
    },
    // get Order List
    queryOrderList() {
      if (this.$t("website_name") === "congTuCloud") {
        //  获取数据库中当前用户邮箱的 order_id
        if (!getCookie("email")) {
          this.$router.push("/" + "login");
          return;
        }
      } else {
        if (!getAccount()) {
          // this.$router.push(`/openWallet/${type}`);
          return;
        }
      }
      let wallet_address_user = "tmp";
      if (this.$t("website_name") != "congTuCloud") {
        wallet_address_user = getAccount().address;
      }
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      const promiseList = [
        query_machine_by_wallet({
          wallet_address_user,
          user_name_platform,
          language,
        }),
        get_all_order({
          wallet_address_user,
          user_name_platform,
          language,
        }),
        get_order_id_list({
          email: getCookie("email"),
          language,
        }),
      ];
      return Promise.all(promiseList)
        .then(([res_1, res_2, res_3]) => {
          this.res_body.content = [];
          // console.log(
          //   "Promise>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
          // );
          // console.log(res_1);
          // console.log(res_2);
          // console.log(res_3);
          if (res_2.content) {
            res_2.content.forEach((item) => {
              const mcItem = res_1.content.find(
                (mc) => item.machine_id === mc.machine_id
              );
              if (mcItem) {
                if (this.$t("website_name") === "congTuCloud") {
                  for (let i of res_3.content) {
                    if (i.order_id === item.order_id) {
                      this.res_body.content.push({
                        verifing: false,
                        notice: "",
                        orderData: item,
                        mcData: mcItem,
                      });
                      this.orderCount = this.res_body.content.length;
                    }
                  }
                } else {
                  this.res_body.content.push({
                    verifing: false,
                    notice: "",
                    orderData: item,
                    mcData: mcItem,
                  });
                }

                if (
                  item.order_id_pre === null &&
                  item.container_is_exist === true &&
                  item.pay_error === false
                ) {
                  this.times = 30;
                } else if (
                  item.order_id_pre !== null &&
                  item.order_is_over === false &&
                  item.order_is_cancer === false &&
                  item.pay_success === false &&
                  item.pay_error === false
                ) {
                  this.times = 150;
                }
              }
            });
          }
          return Promise.resolve({
            status: 1,
          });
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    },
    pushDetail(machine_id) {
      this.$router.push("/machineDetail?machine_id=" + machine_id);
    },
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
        address = getAccount().address;
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
              wallet_address: getAccount().address,
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
              wallet_address: getAccount().address,
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
    // stop rent
    stopRent(item) {
      this.dlgUnsubscribe_open = true;
      this.curItem = item;
    },

    // restart machine
    restartMachine(item) {
      this.dlgRestart_open = true;
      this.curItem = item;
    },

    stopRentSuccess() {
      this.queryOrderList();
    },

    restartSuccess() {
      this.queryOrderList();
    },

    openRateDlg(item) {
      this.curItem = item;
      this.dlgRate_open = true;
    },
    successRate() {
      this.queryOrderList();
    },
    // 退币
    openReturnDbc(item) {
      this.curItem = item;
      this.dlgReturnDbc_open = true;
    },
    returnSuccess() {
      this.queryOrderList();
    },
    isShowRendSuccessMsg(milli_rent_success_time) {
      const minutes =
        (new Date().getTime() - milli_rent_success_time) / 1000 / 60;
      return minutes < 14;
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

.border-content {
  border: 1px solid #979797;
  margin-bottom: 20px;
}

.rate-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tools-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  &.bd {
    border-bottom: 1px solid #e1e6ec;
  }

  .tools-title {
    font-size: 16px;
    color: #050d68;

    &.small {
      font-size: 14px;
      color: #333;
    }
  }

  .tool-btn {
    font-size: 14px;

    &.blue {
      border-color: $primaryColor;
      color: $primaryColor;
    }
  }

  .cGray {
    padding-left: 44px;
  }
}

.pay-wrap {
  padding: 10px 20px;
  border-top: 1px solid #e1e6ec;
  font-size: 14px;
  line-height: 28px;
  color: #666;
  background-color: #f6f9fc;

  .td {
    display: inline-block;
    width: 33.3%;
  }
}

.status-wrap {
  padding: 15px 20px 12px;
  border-top: 1px solid #e1e6ec;
  border-bottom: 1px solid #e1e6ec;
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

    .td2 {
      width: 50%;

      line-height: 24px;

      .cPrimaryColor {
        font-size: 32px;

        &.fs28 {
          font-size: 32px;
        }
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
  }

  /*.flex {
            display: flex;
            padding: 5px 0;

            .td {
              width: 20%;
              line-height: 24px;

              .bold {
                font-weight: 700;
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
          }*/
}
</style>
