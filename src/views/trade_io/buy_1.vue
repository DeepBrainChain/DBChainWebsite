<template>
  <div class="buy border-box">
    <step :step-index="1"></step>
    <div class="main">
      <div>
        <label>
          {{$t("buyDBC.enterwallet")}}：
          <input class="dbc-input" type="text" v-model.trim="address" />
        </label>
      </div>
      <div class="trade-bottom-wrap">
        <el-button class="confirm-btn" type="primary" size="medium" @click="next">{{$t("buyDBC.continue")}}</el-button>
        <span class="service">
          {{$t("buyDBC.support")}}：{{footer_service}} ,{{$t("buyDBC.reply")}}
        </span>
      </div>
    </div>
    <el-dialog :visible.sync="isOpen" :title="title" width="560px">
      <p class="dlg-content">{{$t("buyDBC.tip1")}}</p>
      <div class="center">
        <el-button
          class="dlg-btn"
          type="primary"
          size="medium"
          @click="next"
        >{{$t("buyDBC.continue")}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Step from "@/components/trade_io/stepNavi";
export default {
  name: "buy_1",
  data() {
    return {
      isOpen: false,
      address: this.$route.query.address_user,
      order_id: "",
      title: this.$t("buyDBC.title1")
    };
  },
  components: {
    Step
  },

  activated() {
    this.add_address();
  },
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
      } else if (this.$t("website_name") == "redstonewill") {
        return this.$t("footer_service_redstonewill");
      } else if (this.$t("website_name") == "alpha-dbchain") {
        return this.$t("footer_service_alpha_dbchain");
      } else if (this.$t("website_name") == "xyzlab") {
        return this.$t("footer_service_xyzlab");
      } else if (this.$t("website_name") == "gpgpu") {
        return this.$t("footer_service_gpgpu");
      } else if (this.$t("website_name") == "rocketai") {
        return this.$t("footer_service_rocketai");
      } else if (this.$t("website_name") == "deepbit") {
        return this.$t("footer_service_deepbit");
      } else if (this.$t("website_name") == "aichriscloud") {
        return this.$t("footer_service_aichriscloud");
      } else if (this.$t("website_name") == "vnxmart") {
        return this.$t("footer_service_vnxmart");
      } else if (this.$t("website_name") == "aiaicloud") {
        return this.$t("footer_service_aiaicloud");
      } else if (this.$t("website_name") == "snbt") {
        return this.$t("footer_service_snbt");
      } else if (this.$t("website_name") == "heekmind") {
        return this.$t("footer_service_heekmind");
      } else if (this.$t("website_name") == "aicv") {
        return this.$t("footer_service_aicv");
      } else if (this.$t("website_name") == "freegpu") {
        return this.$t("footer_service_freegpu");
      } else if (this.$t("website_name") == "boincplanet") {
        return this.$t("footer_service_boincplanet");
      } else if (this.$t("website_name") == "shareaiot") {
        return this.$t("footer_service_shareaiot");
      } else if (this.$t("website_name") == "topgpu") {
        return this.$t("footer_service_topgpu");
      } else if (this.$t("website_name") == "thinkotech") {
        return this.$t("footer_service_thinkotech");
      } else if (this.$t("website_name") == "coolgpu") {
        return this.$t("footer_service_coolgpu");
      } else if (this.$t("website_name") == "scclouds") {
        return this.$t("footer_service_scclouds");
      } else if (this.$t("website_name") == "nvidiaai") {
        return this.$t("footer_service_nvidiaai");
      } else if (this.$t("website_name") == "deligpu") {
        return this.$t("footer_service_deligpu");
      } else if (this.$t("website_name") == "longway") {
        return this.$t("footer_service_longway");
      } else if (this.$t("website_name") == "sharedgpu") {
        return this.$t("footer_service_sharedgpu");
      } else if (this.$t("website_name") == "aipower") {
        return this.$t("footer_service_aipower");
      } else if (this.$t("website_name") == "cvstudy") {
        return this.$t("footer_service_cvstudy");
      } else if (this.$t("website_name") == "gpuhub") {
        return this.$t("footer_service_gpuhub");
      } else if (this.$t("website_name") == "district51") {
        return this.$t("footer_service_district51");
      } else if (this.$t("website_name") == "deepmind") {
        return this.$t("footer_service_deepmind");
      } else if (this.$t("website_name") == "transportation") {
        return this.$t("footer_service_transportation");
      } else if (this.$t("website_name") == "planetc") {
        return this.$t("footer_service_planetc");
      } else if (this.$t("website_name") == "sdnu") {
        return this.$t("footer_service_sdnu");
      } else if (this.$t("website_name") == "freegputop") {
        return this.$t("footer_service_freegputop");
      } else if (this.$t("website_name") == "tensorgpu") {
        return this.$t("footer_service_tensorgpu");
      } else if (this.$t("website_name") == "opengpu") {
        return this.$t("footer_service_opengpu");
      } else if (this.$t("website_name") == "aiyanxishe") {
        return this.$t("footer_service_aiyanxishe");
      } else if (this.$t("website_name") == "codefate") {
        return this.$t("footer_service_codefate");
      } else if (this.$t("website_name") == "changhe") {
        return this.$t("footer_service_changhe");
      } else if (this.$t("website_name") == "dpool") {
        return this.$t("footer_service_dpool");
      } else if (this.$t("website_name") == "tycloud") {
        return this.$t("footer_service_tycloud");
      } else if (this.$t("website_name") == "Nexuicloud") {
        return this.$t("footer_service_Nexuicloud");
      }

      return this.$t("footer_service_dbchain");
    }
  },
  methods: {
    next() {
      if (this.address != '') {
        this.$router.push({
          path: "/trade/buy_2",
          query: {
            address_user: this.address
          }
        });
      } else {
        this.$message.error(this.$t('buyDBC.enterwallet'))
      }
    },
    add_address() {
      this.address = this.$route.query.address_user;
    },
    showDlg() {
      this.isOpen = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";

.border-box {
  padding: 30px 0;
}

.main {
  padding: 30px 30px;
}

label {
  font-size: 20px;
  color: #47495a;

  .dbc-input {
    width: 780px;
    border-bottom-width: 2px;
    border-bottom-color: rgba(71, 73, 90, 0.6);

    &:focus {
      border-color: $primaryColor;
    }
  }
}

.info {
  margin: 40px 0 20px;
  font-size: 16px;
  color: rgba(71, 73, 90, 0.8);
}

.other-wallet {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .wallet {
    display: block;
    box-sizing: border-box;
    width: 260px;
    height: 110px;
    line-height: 110px;
    border-radius: 2px;
    border: 1px solid rgba(229, 231, 238, 0.3);
    background-color: rgba(240, 245, 250, 1);
    color: #2d7dd8;
    font-size: 30px;
    text-align: center;

    &:hover {
      color: $primaryColor;
      border-color: $primaryColor;
    }
  }
}

.trade-bottom-wrap {
  margin-top: 124px;
}

.dlg-content {
  line-height: 28px;
  color: rgba(71, 73, 90, 0.8);
}

.dlg-btn {
  width: 150px;
}
</style>
