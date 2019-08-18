<template>
  <div class="bg-box wrap1440 mb100">
    <div class="border-box">
      <div class="title">
        <h3>机器出租的订单信息</h3>
      </div>
      <div v-for="item in content" class="border-content">
        <div class="tools-head">
          <div class="l-wrap" style="width: 70%">
            <span v-if="item.orderData.evaluation_content">
              <b>用户评价：</b>{{item.orderData.evaluation_content}}
            </span>
           <!-- <span
              v-if="item.orderData.order_is_cancer || item.orderData.order_is_over"
              class="tools-title"
            ></span>
            <span
              v-else
              class="tools-title"
            >{{$t('gpu.remainingTime')}}：{{$secToDate(item.orderData.rest_time_rent*60, 'DHM')}}</span>-->
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
            <span v-if="item.orderData.order_is_over && item.orderData.order_isnormal_over">订单已结束</span>
            <span
              v-else-if="item.orderData.order_is_over && item.orderData.order_isnormal_over===false"
            >订单被中断</span>
            <span v-else-if="item.orderData.order_is_cancer">订单已取消</span>
            <span v-else-if="item.orderData.rent_success">正在使用中</span>
            <span
              v-else-if="item.orderData.container_is_exist && item.orderData.rent_success===false"
            >支付验证中</span>
            <span v-else-if="item.orderData.pay_error && item.orderData.return_dbc===false">支付验证失败</span>
            <span v-else-if="item.orderData.pay_error && item.orderData.return_dbc">退币成功</span>
          </div>
        </div>
        <div class="pay-wrap">
          <div class="rate-head">
            <div class="flex right vCenter" v-if="item.orderData.evaluation_time">
              <el-rate :value="item.orderData.evaluation_score/2"></el-rate>
              <span>{{item.orderData.evaluation_score}}{{$t('scores')}}</span>
            </div>
          </div>
          <div>
            <span class="td">{{$t('gpu.payDBCs')}}：{{item.orderData.dbc_total_count}}</span>
            <span class="td">已使用时间：{{parseInt(item.orderData.real_rent_time/60)}}小时{{item.orderData.real_rent_time%60}}分钟</span>
          </div>
          <div>
            <span class="td">{{$t('gpu.actualPrice')}}：{{item.orderData.dbc_real_need_count}}DBC</span>
            <span class="td">{{$t('gpu.gpuBilling')}}：$ {{item.orderData.gpu_price_dollar}}/小时</span>
          </div>
          <div>
          <span
            class="td"
          >{{$t('gpu.currentRemaining')}}：{{item.orderData.dbc_total_count - item.orderData.dbc_real_need_count}} DBC</span>
            <span class="td">{{$t('gpu.payPrice')}}：$ {{item.orderData.dbc_price.toFixed(4)}}</span>
          </div>
          <!--        <div>-->
          <!--          <span class="td">{{$t('gpu.gpuRemainTime')}}（DBC）：422</span>-->
          <!--          <span class="td">{{$t('gpu.storeBilling')}}：45 DBC/hr</span>-->
          <!--          <span class="td">{{$t('gpu.gpuCost')}}：{{item.orderData.dbc_price/item.orderData.gpu_price_dollar}} DBC</span>-->
          <!--          <span class="td">{{$t('gpu.storeCost')}}：{{item.orderData.rent_time_length}}</span>-->
          <!--          <span class="td">{{$t('gpu.storeBilling')}}（DBC）：45/hr</span>-->
          <!--          <span class="td">{{$t('gpu.storeRemainTime')}}（DBC）：422</span>-->
          <!--        </div>-->
        </div>
      </div>
      <!--<table class="tb-theme hAuto">
        <thead>
        <tr>
          <th width="350">{{$t('gpu.mcDetails.th_1')}}</th>
          <th>{{$t('gpu.mcDetails.th_2')}}</th>
          <th>{{$t('gpu.mcDetails.th_3')}}</th>
          <th>{{$t('gpu.mcDetails.th_4')}}</th>
&lt;!&ndash;          <th>{{$t('gpu.mcDetails.th_5')}}</th>&ndash;&gt;
          <th>{{$t('gpu.mcDetails.th_6')}}</th>
          <th width="300"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in content">
          <td>{{item.wallet_address_user}}</td>
          <td>{{item.dbc_real_need_count}}</td>
          <td>{{item.order_isnormal_over?'是':'否'}}</td>
          <td>{{item.gpu_count}}</td>
&lt;!&ndash;          <td>24d 34h</td>&ndash;&gt;
          <td>{{$secToDate(item.rent_time_length * 60, 'DH')}}</td>
          <td>
            <div class="flex right vCenter">
              <el-rate
                :value="item.evaluation_score/2"
                disabled
                ></el-rate>
              <span>{{item.evaluation_score}}分</span>
            </div>
            <div class="rate-wrap">
              <label>{{$t('gpu.userRate')}}：</label>
              <span>{{item.evaluation_content}}</span>
            </div>
          </td>
        </tr>
        </tbody>
      </table>-->
    </div>
  </div>
</template>

<script>
  import {
    rentout_get_orders_list_by_machine_id
  } from '@/api'

  export default {
    name: "machineOrder",
    data() {
      return {
        rateValue: 0,
        mcData: undefined,
        content: [],
      }
    },
    created() {
      this.queryOrderList()
    },
    computed: {
      rateList() {
        content.map(item => {
          return {}
        })
      }
    },
    methods: {
      queryOrderList() {
        rentout_get_orders_list_by_machine_id({
          machine_id: this.$route.query.machine_id
        }).then(res => {
          if (res.status === 1) {
            this.content = res.content.map(item => {
              return {
                orderData: item
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .border-content {
    border: 1px solid #979797;
    margin-bottom: 20px;
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

    .rate-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
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

  .rate-wrap {
    label {
      vertical-align: top;
    }

    span {
      display: inline-block;
      width: 200px;
      vertical-align: top;
      text-align: left;
    }
  }

  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;

    h3 {
      margin: 0;
      line-height: 20px;
      font-size: 20px;
      color: #47495A;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 16px;

      a {
        color: $primaryColor;
      }
    }
  }

</style>
