<template>
  <div class="wrap1200 bg-box mb100">
    <div class="border-box">
      <h2>{{$t('help.title')}}</h2>
      <h3>
        {{$t('help.1')}}
        <a href="http://https://www.dbctrade.io">dbctrade.io</a>
      </h3>

      <h3>
        {{$t('help.2')}}，
        <a
          href="https://www.huobi.br.com/zh-cn/"
          target="_blank"
        >https://www.huobi.br.com/zh-cn/</a>
        .{{$t('help.reloadWallet')}}
      </h3>

      <h3>
        {{$t('help.3')}}，
        <a href="https://kcs.top" target="_blank">https://kcs.top</a>
        .{{$t('help.reloadWallet')}}
      </h3>

      <h3>
        {{$t('help.4')}}，
        <a href="https://www.gateio.co">https://www.gateio.co</a>
        .{{$t('help.reloadWallet')}}
      </h3>

      <h3>{{$t('help.5')}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "howBuy"
};
</script>

<style lang="scss" scoped>
a {
  color: #008bf3;
}
</style>
