<template>
  <div class="home">
    <el-row class="wrap1440 mb100">
      <el-col class="flex" :md="12">
        <div class="content">
          <div class="text">
            <p>{{get_text1}}{{get_intr_4}}</p>
            <p>{{$t('home.intr_5')}}</p>
          </div>
          <div class="btn-wrap mt60">
            <el-button class="lg fs18 long" type="primary" @click="pushToWallet">
              {{$t('startVir')}}
              <i class="el-icon-back r"></i>
            </el-button>
          </div>
          <div class="btn-wrap flex mt40">
            
          </div>
        </div>
      </el-col>
      <el-col class="center" :md="12">
        <img :src="image1" />
      </el-col>
    </el-row>
    <!--<el-row class="wrap1440 pb120">
      <el-col :md="6" :sm="12">
        <div class="gpu-data-content">
          <h3>全网GPU在线数</h3>
          <div class="cycle-data">
            84968
          </div>
        </div>
      </el-col>
      <el-col :md="6" :sm="12">
        <div class="gpu-data-content">
          <h3>全网DBC交易数</h3>
          <div class="cycle-data">
            84968
          </div>
        </div>
      </el-col>
      <el-col :md="6" :sm="12">
        <div class="gpu-data-content">
          <h3>全网GPU使用时长</h3>
          <div class="cycle-data">
            84968
          </div>
        </div>
      </el-col>
      <el-col :md="6" :sm="12">
        <div class="gpu-data-content">
          <h3>全网GPU交易次数</h3>
          <div class="cycle-data">
            84968
          </div>
        </div>
      </el-col>
    </el-row>-->
    <div class="pt80 pb80 bg-white">
      <el-row class="wrap1440">
        <el-col class="flex" :sm="12">
          <div class="gpu-info">
            <img src="~@/assets/imgs/gpu_img_1.jpg" alt />
            <div class="text">
              <p>{{$t('home.intr_2')}}</p>
              <p>{{$t('home.intr_3')}}</p>
            </div>
          </div>
        </el-col>
        <el-col class="flex" :sm="12">
          <div class="gpu-info">
            <img src="~@/assets/imgs/gpu_img_2.jpg" alt />
            <div class="text">
              <p>{{$t('home_intr')}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
// @ is an alias to /src
export default {
  name: "home",
  data() {
    return {
      image1: undefined
    };
  },
  created() {
    this.set_image1();
  },
  methods: {
    ...mapActions([
      "getAccountState",
      "getExchangeRate"
    ]),
    initData() {
      this.getExchangeRate();
      this.getAccountState()
        .then(data => {})
        .catch(err => {});
    },
    pushToWallet() {
      this.$router.push({
        path:"/wholeVirtual",
        query: {
          type: 'gpu'
        }
      });
      this.$store.commit("setMenuName", "wholeVirtual");
    },
    set_image1() {
      this.image1 = require("../assets/imgs/building@1x.png");
    }
  },
  computed: {
    ...mapState([
      "address",
      "balance",
      "transferList",
      "dbcToUS",
    ]),
    get_text1() {
      if (this.$t("website_name") == "dbchain") {
        return this.$t("home.intr_dbchain_1");
      } else if (this.$t("website_name") == "yousanai") {
        return this.$t("home.intr_yousanai_1");
      } else if (this.$t("website_name") == "aionego") {
        return this.$t("home.intr_aionego_1");
      } else if (this.$t("website_name") == "deepshare") {
        return this.$t("home.intr_deepshare_1");
      } else if (this.$t("website_name") == "sharegpu") {
        return this.$t("home.intr_sharegpu_1");
      } else if (this.$t("website_name") == "panchuangai") {
        return this.$t("home.intr_panchuangai_1");
      } else if (this.$t("website_name") == "yalecloud") {
        return this.$t("home.intr_yalecloud_1");
      } else if (this.$t("website_name") == "52lm") {
        return this.$t("home.intr_52lm_1");
      } else if (this.$t("website_name") == "dimi") {
        return this.$t("home.intr_dimi_1");
      } else if (this.$t("website_name") == "mayi") {
        return this.$t("home.intr_mayi_1");
      } else if (this.$t("website_name") == "windywinter") {
        return this.$t("home.intr_windywinter_1");
      } else if (this.$t("website_name") == "1024lab") {
        return this.$t("home.intr_1024lab_1");
      } else if (this.$t("website_name") == "litaai") {
        return this.$t("home.intr_litaai_1");
      } else if (this.$t("website_name") == "ainlp") {
        return this.$t("home.intr_ainlp_1");
      } else if (this.$t("website_name") == "52cv") {
        return this.$t("home.intr_52cv_1");
      } else if (this.$t("website_name") == "redstonewill") {
        return this.$t("home.intr_redstonewill_1");
      } else if (this.$t("website_name") == "alpha-dbchain") {
        return this.$t("home.intr_alpha_dbchain_1");
      } else if (this.$t("website_name") == "xyzlab") {
        return this.$t("home.intr_xyzlab_1");
      } else if (this.$t("website_name") == "gpgpu") {
        return this.$t("home.intr_gpgpu_1");
      } else if (this.$t("website_name") == "rocketai") {
        return this.$t("home.intr_rocketai_1");
      } else if (this.$t("website_name") == "deepbit") {
        return this.$t("home.intr_deepbit_1");
      } else if (this.$t("website_name") == "aichriscloud") {
        return this.$t("home.intr_aichriscloud_1");
      } else if (this.$t("website_name") == "vnxmart") {
        return this.$t("home.intr_vnxmart_1");
      } else if (this.$t("website_name") == "aiaicloud") {
        return this.$t("home.intr_aiaicloud_1");
      } else if (this.$t("website_name") == "snbt") {
        return this.$t("home.intr_snbt_1");
      } else if (this.$t("website_name") == "heekmind") {
        return this.$t("home.intr_heekmind_1");
      } else if (this.$t("website_name") == "aicv") {
        return this.$t("home.intr_aicv_1");
      } else if (this.$t("website_name") == "freegpu") {
        return this.$t("home.intr_freegpu_1");
      } else if (this.$t("website_name") == "boincplanet") {
        return this.$t("home.intr_boincplanet_1");
      } else if (this.$t("website_name") == "shareaiot") {
        return this.$t("home.intr_shareaiot_1");
      } else if (this.$t("website_name") == "topgpu") {
        return this.$t("home.intr_topgpu_1");
      } else if (this.$t("website_name") == "thinkotech") {
        return this.$t("home.intr_thinkotech_1");
      } else if (this.$t("website_name") == "coolgpu") {
        return this.$t("home.intr_coolgpu_1");
      } else if (this.$t("website_name") == "scclouds") {
        return this.$t("home.intr_scclouds_1");
      } else if (this.$t("website_name") == "nvidiaai") {
        return this.$t("home.intr_nvidiaai_1");
      } else if (this.$t("website_name") == "deligpu") {
        return this.$t("home.intr_deligpu_1");
      } else if (this.$t("website_name") == "longway") {
        return this.$t("home.intr_longway_1");
      } else if (this.$t("website_name") == "sharedgpu") {
        return this.$t("home.intr_sharedgpu_1");
      } else if (this.$t("website_name") == "aipower") {
        return this.$t("home.intr_aipower_1");
      } else if (this.$t("website_name") == "cvstudy") {
        return this.$t("home.intr_cvstudy_1");
      } else if (this.$t("website_name") == "gpuhub") {
        return this.$t("home.intr_gpuhub_1");
      } else if (this.$t("website_name") == "district51") {
        return this.$t("home.intr_district51_1");
      } else if (this.$t("website_name") == "deepmind") {
        return this.$t("home.intr_deepmind_1");
      } else if (this.$t("website_name") == "transportation") {
        return this.$t("home.intr_transportation_1");
      } else if (this.$t("website_name") == "planetc") {
        return this.$t("home.intr_planetc_1");
      } else if (this.$t("website_name") == "sdnu") {
        return this.$t("home.intr_sdnu_1");
      } else if (this.$t("website_name") == "freegputop") {
        return this.$t("home.intr_freegputop_1");
      } else if (this.$t("website_name") == "tensorgpu") {
        return this.$t("home.intr_tensorgpu_1");
      } else if (this.$t("website_name") == "opengpu") {
        return this.$t("home.intr_opengpu_1");
      } else if (this.$t("website_name") == "aiyanxishe") {
        return this.$t("home.intr_aiyanxishe_1");
      } else if (this.$t("website_name") == "codefate") {
        return this.$t("home.intr_codefate_1");
      } else if (this.$t("website_name") == "changhe") {
        return this.$t("home.intr_changhe_1");
      } else if (this.$t("website_name") == "dpool") {
        return this.$t("home.intr_dpool_1");
      }else if (this.$t("website_name") == "tycloud") {
        return this.$t("home.intr_tycloud_1");
      }else if (this.$t("website_name") == "Nexuicloud") {
        return this.$t("home.intr_Nexuicloud_1");
      }

      return this.$t("home.intr_dbchain_1");
    },

    get_intr_4() {
      if (this.$t("website_name") == "snbt") {
        return this.$t("home.intr_snbt_4");
      } else {
        return this.$t("home.intr_4");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  margin-top: 60px;
}

.grid-content {
  height: 20px;
}

.bg-purple {
  background-color: crimson;
}

.text {
  font-size: 18px;
  line-height: 36px;
  color: #fff;
  font-weight: 400;
  text-align: left;
  p {
    margin: 0;
  }
}

.btn-wrap {
  &.flex {
    display: flex;
    justify-content: space-between;
  }
}

.vm {
  vertical-align: middle;
}

.icon-left {
  margin-right: 10px;
}

.w200 {
  width: 200px;
}

.content {
  width: 440px;
}

.flex {
  display: flex;
  justify-content: center;
}

.gpu-data-content {
  h3 {
    font-size: 18px;
    color: #fff;
    text-align: center;
    margin-top: 0;
    margin-bottom: 0;
    padding-bottom: 28px;
  }
  .cycle-data {
    width: 162px;
    height: 162px;
    margin: 0 auto;
    line-height: 162px;
    border: 1px solid #fff;
    border-radius: 50%;
    font-size: 18px;
    color: #fff;
    text-align: center;
  }
}

.gpu-info {
  width: 440px;
  img {
    display: block;
    width: 100%;
  }
  .text {
    padding-top: 40px;
    width: 100%;
    font-size: 18px;
    line-height: 36px;
    color: #70737d;
  }
}
</style>
