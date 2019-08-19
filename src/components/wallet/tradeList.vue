<template>
  <div>
    <table class="tb-theme small">
      <thead>
      <tr>
        <th>{{$t('transfer')}}</th>
        <th>{{$t('from')}}</th>
        <th>{{$t('to')}}</th>
        <th width="100">{{$t('value')}}</th>
<!--        <th width="100">{{$t('asset')}}</th>-->
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in transferList" :key="index">
        <td class="cPrimaryColor">
          <a class="cPrimaryColor" :title="item.txHash" :href="`https://neotracker.io/tx/${item.txHash}`" target="_blank">{{item.txHash}}</a>
        </td>
        <td>
          <span v-if="item.fromAddress === address">{{item.fromAddress}}</span>
          <a class="cPrimaryColor" v-else :title="item.fromAddress" :href="`https://neotracker.io/address/${item.fromAddress}`">{{item.fromAddress}}</a>
        </td>
        <td :title="item.toAddress">
          <span v-if="item.toAddress === address">{{item.toAddress}}</span>
          <a v-else class="cPrimaryColor" :href="`https://neotracker.io/address/${item.toAddress}`">{{item.toAddress}}</a>
        </td>
        <td>{{$thousandsNum((item.amount * 1).toFixed(4))}}</td>
<!--        <td>DBC</td>-->
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    name: "tradeList",
    data() {
      return {
        tempNum: 12335234234.23456
      }
    },
    computed: {
      ...mapState([
        'address',
        'transferList',
        'dbcToUS'
      ])
    }
  }
</script>

<style scoped>

</style>
