<template>
  <div>
    <table class="tb-theme small">
      <thead>
        <tr>
          <th>{{$t('transfer')}}</th>
          <th>{{$t('from')}}</th>
          <th>{{$t('to')}}</th>
          <th width="100">{{$t('value')}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in transferList" :key="index">
          <td class="cPrimaryColor">
            <a
              class="cPrimaryColor"
              :title="item.txHash"
              :href="`https://neotracker.io/tx/${item.txHash}`"
              target="_blank"
            >{{item.txHash}}</a>
          </td>
          <td>
            <span v-if="item.fromAddress === address">{{item.fromAddress}}</span>
            <a
              class="cPrimaryColor"
              v-else
              :title="item.fromAddress"
              :href="`https://neotracker.io/address/${item.fromAddress}`"
              target="_blank"
            >{{item.fromAddress}}</a>
          </td>
          <td :title="item.toAddress">
            <span v-if="item.toAddress === address">{{item.toAddress}}</span>
            <a
              v-else
              class="cPrimaryColor"
              :href="`https://neotracker.io/address/${item.toAddress}`"
              target="_blank"
            >{{item.toAddress}}</a>
          </td>
          <td>{{$thousandsNum((item.amount * 1).toFixed(4))}}</td>
          <!--        <td>DBC</td>-->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "TradeList",
  data() {
    return {
      tempNum: 12335234234.23456,
      address: ''
    };
  },
  computed: {
    ...mapState(["transferList"])
  },
}
</script>

<style scoped>
</style>
