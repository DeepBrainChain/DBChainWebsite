<template>
  <div class="footer" tyle=" text-align:center">
    <div class="wrap1440">
      <p class="title">{{$t('footer_friend')}}</p>
      <div class="link-list clearfix" margin:0 auto>
        <a href="http://www.deepbrainchain.org" target="_blank">{{$t('footer.DBChain')}}</a>

        <a href="https://www.kcs.top/" target="_blank">{{$t('footer.KuCoin')}}</a>

        <a href="https://www.huobi.br.com/zh-cn/" target="_blank">{{$t('footer.HuobiPro')}}</a>
        <a href="https://www.gateio.co/" target="_blank">{{$t('footer.GateIo')}}</a>
      </div>
      <div class="line" tyle=" text-align:center"></div>
      <p class="contact">{{footer_service}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "foot",
  data() {
    return {
      website_name: this.$t("website_name")
    };
  },

  created() {},

  computed: {
    footer_service() {
      if (this.$t("website_name") == "dbchain") {
        return this.$t("footer_service_dbchain");
      } else if (this.$t("website_name") == "yousanai") {
        return this.$t("footer_service_yousanai");
      } else if (this.$t("website_name") == "aionego") {
        return this.$t("footer_service_aionego");
      } else if (this.$t("website_name") == "deepshare") {
        return this.$t("footer_service_deepshare");
      }

      return this.$t("footer_service_dbchain");
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.footer {
  padding: 60px 0;
  background-color: #eff4f7;
}
.title {
  text-align: center;
  margin: 0;
  font-size: 18px;
  color: #47495a;
}
.line {
  height: 1px;
  background-color: #d0dde7;
}
.link-list {
  text-align: center;
  padding-top: 30px;
  padding-bottom: 40px;
  a {
    /*float: left;*/
    color: #6d8198;
    margin-right: 75px;
    &:hover {
      text-decoration: underline;
    }
  }
}
.contact {
  text-align: center;
  font-size: 16px;
  color: #6d8198;
  margin-top: 40px;
  margin-bottom: 0;
}
</style>
