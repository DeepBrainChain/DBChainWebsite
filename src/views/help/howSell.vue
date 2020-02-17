<template>
  <div class="wrap1200 bg-box mb100">
    <div class="border-box">
      <h2>{{$t('helpsell.title')}}</h2>

      <h3>
        {{$t('helpsell.2')}}，
        <a
          v-if="this.$i18n.locale==='cn' || this.$i18n.locale==='CN'"
          href="https://www.huobi.io/zh-cn/exchange/dbc_btc/"
          target="_blank"
        >https://www.huobi.io/zh-cn/</a>

        <a
          v-else
          href="https://www.huobi.io/en-us/exchange/dbc_btc/"
          target="_blank"
        >https://www.huobi.io/en-us/</a>
      </h3>

      <h3>
        {{$t('helpsell.3')}}，
        <a href="https://kcs.top" target="_blank">https://kcs.top</a>
      </h3>

      <h3>
        {{$t('helpsell.4')}}，
        <a
          href="https://www.gateio.life/trade/DBC_USDT"
          target="_blank"
        >https://www.gateio.life</a>
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "howBuy",

  methods: {}
};
</script>

<style lang="scss" scoped>
a {
  color: #008bf3;
}
</style>
