<template>
  <div class="footer">
    <div class="wrap1440">
      <p class="title">友情链接</p>
      <div class="link-list clearfix">
        <a href="http://www.deepbrainchain.org" target="_blank">{{$t('footer.DBChain')}}</a>
        <a href="http://www.dbcminer.io" target="_blank">{{$t('footer.DBCMiner')}}</a>
        <a href="http://www.dbctalk.ai" target="_blank">{{$t('footer.DBCTalk')}}</a>
        <a href="https://www.kcs.top/" target="_blank">{{$t('footer.KuCoin')}}</a>
        <a href="/trade">{{$t('footer.DBCTrade')}}</a>
<!--        <a href="#">{{$t('footer.DBCloud')}}</a>-->
        <a href="https://www.huobi.co" target="_blank">{{$t('footer.HuobiPro')}}</a>
        <a href="https://www.gateio.co/" target="_blank">{{$t('footer.GateIo')}}</a>
      </div>
      <div class="line"></div>
      <p class="contact">客服支持:support@dbchain.ai，客服会在24小时内回复</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "foot",

  }
</script>

<style lang="scss" scoped>
  .footer {
    padding: 60px 0;
    background-color: #EFF4F7;
  }
  .title {
    text-align: left;
    margin: 0;
    font-size: 18px;
    color: #47495A;
  }
  .line {
    height: 1px;
    background-color: #D0DDE7;
  }
  .link-list {
    padding-top: 30px;
    padding-bottom: 40px;
    a{
      float: left;
      color: #6D8198;
      margin-right: 75px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .contact {
    text-align: left;
    font-size: 16px;
    color: #6D8198;
    margin-top: 40px;
    margin-bottom: 0;
  }
</style>
