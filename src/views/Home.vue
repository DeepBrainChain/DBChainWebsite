<template>
  <div class="home">
    <!-- DBC 3.0 Announcement Banner -->
    <div class="dbc3-banner">
      <div class="dbc3-particles">
        <span v-for="n in 20" :key="n" class="particle" :style="particleStyle(n)"></span>
      </div>
      <div class="dbc3-content">
        <div class="dbc3-badge">COMING SOON</div>
        <h1 class="dbc3-title">
          <span class="dbc3-highlight">DeepBrainChain</span>
          <span class="dbc3-version">3.0</span>
        </h1>
        <p class="dbc3-subtitle">{{ $t('dbc3.subtitle') }}</p>
        <div class="dbc3-divider"></div>
        <div class="dbc3-features">
          <div class="dbc3-feature-item" v-for="(item, idx) in 3" :key="idx">
            <span class="dbc3-dot"></span>
            <span>{{ $t('dbc3.feature_' + (idx + 1)) }}</span>
          </div>
        </div>
        <p class="dbc3-mystery">{{ $t('dbc3.mystery') }}</p>
        <div class="dbc3-cta">
          <span class="dbc3-stay">{{ $t('dbc3.stay_tuned') }}</span>
        </div>
      </div>
    </div>
    <!-- End DBC 3.0 Banner -->

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
    },
    particleStyle(n) {
      const left = ((n * 37 + 13) % 100);
      const delay = ((n * 0.3) % 4).toFixed(1);
      const duration = (3 + (n % 4)).toFixed(1);
      const size = 2 + (n % 4);
      return {
        left: left + '%',
        animationDelay: delay + 's',
        animationDuration: duration + 's',
        width: size + 'px',
        height: size + 'px'
      };
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

/* ===== DBC 3.0 Announcement Banner ===== */
.dbc3-banner {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1050 30%, #0d1847 60%, #020b1a 100%);
  padding: 80px 20px;
  text-align: center;
  margin-bottom: 60px;
  border-bottom: 2px solid rgba(0, 200, 255, 0.15);
}

.dbc3-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  .particle {
    position: absolute;
    bottom: -10px;
    border-radius: 50%;
    background: rgba(0, 180, 255, 0.6);
    animation: floatUp 4s ease-in infinite;
    box-shadow: 0 0 6px rgba(0, 180, 255, 0.4);
  }
}

@keyframes floatUp {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-500px) scale(0.3);
    opacity: 0;
  }
}

.dbc3-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.dbc3-badge {
  display: inline-block;
  padding: 6px 24px;
  border: 1px solid rgba(0, 200, 255, 0.5);
  border-radius: 20px;
  color: #00c8ff;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 4px;
  margin-bottom: 30px;
  animation: badgePulse 2s ease-in-out infinite;
}

@keyframes badgePulse {
  0%, 100% {
    box-shadow: 0 0 10px rgba(0, 200, 255, 0.2);
  }
  50% {
    box-shadow: 0 0 25px rgba(0, 200, 255, 0.5);
  }
}

.dbc3-title {
  margin: 0 0 20px;
  line-height: 1.2;
  .dbc3-highlight {
    display: block;
    font-size: 48px;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 0 0 30px rgba(0, 150, 255, 0.3);
  }
  .dbc3-version {
    display: inline-block;
    font-size: 72px;
    font-weight: 800;
    background: linear-gradient(90deg, #00c8ff, #7b61ff, #00e5a0);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 3s ease infinite;
    margin-top: 5px;
  }
}

@keyframes gradientShift {
  0% { background-position: 0% center; }
  50% { background-position: 100% center; }
  100% { background-position: 0% center; }
}

.dbc3-subtitle {
  font-size: 22px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 30px;
  font-weight: 400;
  letter-spacing: 2px;
}

.dbc3-divider {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00c8ff, transparent);
  margin: 0 auto 30px;
}

.dbc3-features {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  margin-bottom: 36px;
}

.dbc3-feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.75);
  font-size: 15px;
}

.dbc3-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00c8ff;
  box-shadow: 0 0 8px rgba(0, 200, 255, 0.6);
}

.dbc3-mystery {
  font-size: 17px;
  color: rgba(200, 210, 255, 0.6);
  font-style: italic;
  margin: 0 0 36px;
  letter-spacing: 1px;
}

.dbc3-cta {
  .dbc3-stay {
    display: inline-block;
    padding: 12px 40px;
    border: 1px solid rgba(0, 200, 255, 0.4);
    border-radius: 30px;
    color: #00c8ff;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 2px;
    transition: all 0.3s ease;
    cursor: default;
    &:hover {
      background: rgba(0, 200, 255, 0.1);
      box-shadow: 0 0 20px rgba(0, 200, 255, 0.3);
    }
  }
}

@media (max-width: 768px) {
  .dbc3-banner {
    padding: 50px 16px;
  }
  .dbc3-title {
    .dbc3-highlight {
      font-size: 30px;
    }
    .dbc3-version {
      font-size: 48px;
    }
  }
  .dbc3-subtitle {
    font-size: 16px;
  }
  .dbc3-features {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
}
/* ===== End DBC 3.0 Banner ===== */

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
