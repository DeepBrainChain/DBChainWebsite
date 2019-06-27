<template>
  <div class="wrap1200 bg-box mb100">
    <div class="border-box">
      <h3>{{$t('help.title')}}</h3>
      <p>{{$t('help.1')}}<router-link to="/trade">dbctrade.io</router-link></p>

      <p>{{$t('help.2')}}，<a href="https://www.huobi.br.com/zh-cn/" target="_blank">https://www.huobi.br.com/zh-cn/</a>.{{$t('help.reloadWallet')}}</p>

      <p>{{$t('help.3')}}，<a href="https://kcs.top" target="_blank">https://kcs.top</a>.{{$t('help.reloadWallet')}}</p>

      <p>{{$t('help.4')}}，<a href="https://www.gateio.co">https://www.gateio.co</a>.{{$t('help.reloadWallet')}}</p>

      <p>{{$t('help.5')}}</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "howBuy"
    }
</script>

<style lang="scss" scoped>
  a {
    color: #008BF3;
  }
</style>
