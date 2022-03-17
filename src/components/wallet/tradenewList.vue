<template>
  <div>
    <table class="tb-theme small">
      <thead>
        <tr>
          <th width="200">{{$t('transfer')}}</th>
          <th>{{$t('from')}}</th>
          <th>{{$t('to')}}</th>
          <th width="80">{{$t('result')}}</th>
          <th width="100">{{$t('value')}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in transferList" :key="index">
          <td class="cPrimaryColor" :title="item.txHash">
            <a
              class="cPrimaryColor"
              :title="item.txHash"
              :href="`https://dbc.subscan.io/extrinsic/${item.txHash}`"
              target="_blank"
            >{{item.txHash}}</a>
          </td>
          <td>
            <a
              class="cPrimaryColor"
              :title="item.fromAddress"
              :href="`https://dbc.subscan.io/account/${item.fromAddress}`"
              target="_blank"
            >{{item.fromAddress}}</a>
          </td>
          <td>
            <a
              class="cPrimaryColor"
              :href="`https://dbc.subscan.io/account/${item.toAddress}`"
              target="_blank"
            >{{item.toAddress}}</a>
          </td>
          <td>{{item.result == true}}</td>
          <td>{{$thousandsNum((item.amount * 1).toFixed(4))}}</td>
          <!--        <td>DBC</td>-->
        </tr>
      </tbody>
    </table>
    <div class="paging">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { get_address_abstracts1 } from "@/api";
export default {
  name: "TradeList",
  data() {
    return {
      tempNum: 12335234234.23456,
      pageSize: 10,
      currentPage: 1,
      refresh: undefined
    };
  },
  computed: {
    ...mapState(["transferList", "address", "listTotal"])
  },
  mounted(){
    this.refresh = setInterval(() => {
     this.getData();
    }, 30000)
  },
  beforeDestroy() {
    if(this.refresh){
      clearInterval(this.refresh)
    }
  },
  methods: {
    getData(){
      if (this.address  == '') {
        return
      }
      let data = {
        address: this.address,
        page: this.currentPage-1,
        row: this.pageSize
      }
      get_address_abstracts1(data).then(res => {
        let array = res.data.transfers&&res.data.transfers.map(item => {
          return {
            txHash: item.hash,
            fromAddress: item.from,
            toAddress: item.to,
            time: item.block_timestamp,
            amount: item.amount,
            result: item.success
          }
        })
        this.$store.commit('setTransferList', array)
        this.$store.commit('setListTotal', res.data.count)
      })
    },
    handleSizeChange(pageSize) {
      console.log(`每页 ${pageSize} 条`);
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.getData();
    },

    handleCurrentChange(currentPage) {
      console.log(`当前页: ${currentPage}`);
      this.currentPage = currentPage;
      this.getData();
    },
  }
}
</script>

<style lang="scss" scoped>
.tb-theme.small tbody{
  font-size: 12px;
}
.paging {
  margin-top: 10px;
  .el-pagination {
    display: flex;
    justify-content: center;
  }
}
</style>
