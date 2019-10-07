<template>
  <div class="footer" tyle=" text-align:center">
    <div class="wrap1440">
      <p class="title">{{$t('footer_friend')}}</p>
      <div class="link-list clearfix" margin:0 auto>
        <a
          v-if="$t('website_name')==='panchuangai'"
          href="http://docs.panchuang.net"
          target="_blank"
        >PanChuang Docs</a>
        <a href="https://www.deepbrainchain.org" target="_blank">{{$t('footer.DBChain')}}</a>
        <a href="https://www.kcs.top/" target="_blank">{{$t('footer.KuCoin')}}</a>

        <a href="https://www.huobi.br.com/zh-cn/" target="_blank">{{$t('footer.HuobiPro')}}</a>
        <a href="https://www.gateio.co/" target="_blank">{{$t('footer.GateIo')}}</a>
      </div>
      <div class="line" tyle=" text-align:center"></div>
      <p class="contact">{{$t('footer_service')}}:{{footer_service}},{{$t('footr_reply')}}</p>
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
      } else if (this.$t("website_name") == "panchuangai") {
        return this.$t("footer_service_panchuangai");
      } else if (this.$t("website_name") == "sharegpu") {
        return this.$t("footer_service_sharegpu");
      } else if (this.$t("website_name") == "yalecloud") {
        return this.$t("footer_service_yalecloud");
      } else if (this.$t("website_name") == "52lm") {
        return this.$t("footer_service_52lm");
      } else if (this.$t("website_name") == "dimi") {
        return this.$t("footer_service_dimi");
      } else if (this.$t("website_name") == "mayi") {
        return this.$t("footer_service_mayi");
      } else if (this.$t("website_name") == "windywinter") {
        return this.$t("footer_service_windywinter");
      } else if (this.$t("website_name") == "1024lab") {
        return this.$t("footer_service_1024lab");
      } else if (this.$t("website_name") == "litaai") {
        return this.$t("footer_service_litaai");
      } else if (this.$t("website_name") == "ainlp") {
        return this.$t("footer_service_ainlp");
      } else if (this.$t("website_name") == "52cv") {
        return this.$t("footer_service_52cv");
      } else if (this.$t("website_name") == "52cv") {
        return this.$t("footer_service_52cv");
      } else if (this.$t("website_name") == "redstonewill") {
        return this.$t("footer_service_redstonewill");
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
