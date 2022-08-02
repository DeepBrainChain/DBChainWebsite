<template>
  <div class="wrap1200 bg-box mb100">
    <div class="border-box">
      <h2>{{$t('help.title')}}</h2>
      <!-- <h3 v-if="this.$i18n.locale==='cn' || this.$i18n.locale==='CN'">
        {{$t('help.1')}}
        <a href="javascript:" @click="tradedbcHref">dbctrade</a>
      </h3>

      <h3>
        {{$t('help.2')}}，
        <a
          v-if="this.$i18n.locale==='cn' || this.$i18n.locale==='CN'"
          href="https://www.huobi.pro/zh-cn/exchange/dbc_btc/"
          target="_blank"
        >https://www.huobi.me/zh-cn/</a>

        <a
          v-else
          href="https://www.huobi.pro/en-us/exchange/dbc_btc/"
          target="_blank"
        >https://www.huobi.me/en-us/</a>
        .{{$t('help.reloadWallet')}}
      </h3> -->

      <h3>
        <span v-if="$t('showAliPay') == '1'">{{$t('help.3')}}</span>
        <span v-else>{{$t('help.3-1')}}</span>
        <a href="javascript:" @click="tradedbcHref">{{$t('help.enter')}}</a>
      </h3>

      <h3>
        {{$t('help.4')}}，
        <a href="https://www.gateio.la" target="_blank">https://www.gateio.la</a>
        .{{$t('help.reloadWallet')}}
      </h3>

      <h3>
        {{$t('help.5')}} 
        <a href="https://www.dbcwallet.io" target="_blank">https://www.dbcwallet.io</a>
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "howBuy",
  data(){
    return{
      address: this.$route.query.address_user
    }
  },
  mounted() {
    console.log(this.address, 'sss');
  },
  methods: {
    tradedbcHref() {
      this.$router.push({
        path:'/trade',
        query: { address_user:this.address }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  color: #008bf3;
}
</style>
