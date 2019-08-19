<template>
  <div class="bg-box wrap1440 mb100">
    <div class="border-box">
      <div class="title">
        <h3>{{$t('gpu.mcTradeInfo')}}</h3>
        <div v-if="mcData" class="flex right vCenter">
          <p>{{mcData.evaluation_count}}人参与评分，评分：</p>
          <el-rate :value="mcData.evaluation_score_average/2"
                   disabled
                   ></el-rate>
          <span>{{mcData.evaluation_score_average}}分</span>
        </div>
      </div>
      <table class="tb-theme hAuto">
        <thead>
        <tr>
          <th width="350">{{$t('gpu.mcDetails.th_1')}}</th>
          <th>{{$t('gpu.mcDetails.th_2')}}</th>
          <th>{{$t('gpu.mcDetails.th_3')}}</th>
          <th>{{$t('gpu.mcDetails.th_4')}}</th>
<!--          <th>{{$t('gpu.mcDetails.th_5')}}</th>-->
          <th>{{$t('gpu.mcDetails.th_6')}}</th>
          <th width="300"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in content">
          <td>{{item.wallet_address_user}}</td>
          <td>{{item.dbc_real_need_count}}</td>
          <td>{{item.order_isnormal_over?'否':'是'}}</td>
          <td>{{item.gpu_count}}</td>
<!--          <td>24d 34h</td>-->
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
      </table>
    </div>
  </div>
</template>

<script>
  import {
    query_evaluation_list_by_machine_id,
    query_machine_by_id
  } from '@/api'

  export default {
    name: "machineDetail",
    data() {
      return {
        rateValue: 0,
        mcData: undefined,
        content: [],
      }
    },
    created() {
      this.queryMcDetail()
    },
    computed: {
      rateList() {
        content.map(item => {
          return {}
        })
      }
    },
    methods: {
      queryMcDetail() {
        query_machine_by_id({
          machine_id: this.$route.query.machine_id
        }).then(res => {
          if (res.status === 1) {
            this.mcData = res.content
          }
        })
        query_evaluation_list_by_machine_id({
          machine_id: this.$route.query.machine_id
        }).then(res => {
          if (res.status === 1) {
            this.content = res.content
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
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
