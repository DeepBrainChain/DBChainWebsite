<template>
  <div class="head">
    <div class="content wrap1440">
      <img class="logo" :src="logo" />
      <div v-show="headhidden" class="navlist">
        <a
          class="item"
          :class="{active: menuName === 'home'}"
          @click="pushMenu('home')"
        >{{$t('heads.home')}}</a>
        <el-dropdown
          class="item"
          v-on:command="drop_home1"
        >
          <span class="el-dropdown-link">
            <span class="item" :class="{active: this.$store.state.menuName === 'signleVirtual'}">{{$t('heads.virtual1')}}</span>
            <i class="el-icon-caret-bottom ml5"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="gpu">{{$t('heads.gputype')}}</el-dropdown-item>
            <el-dropdown-item command="city">{{$t('heads.area')}}</el-dropdown-item>
            <el-dropdown-item command="room">{{$t('heads.room')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown
          class="item"
          v-on:command="drop_home"
        >
          <span class="el-dropdown-link">
            <span class="item" :class="{active: this.$store.state.menuName === 'wholeVirtual'}">{{$t('heads.virtual')}}</span>
            <i class="el-icon-caret-bottom ml5"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="gpu">{{$t('heads.gputype')}}</el-dropdown-item>
            <el-dropdown-item command="city">{{$t('heads.area')}}</el-dropdown-item>
            <el-dropdown-item command="room">{{$t('heads.room')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <a
          class="item"
          :class="{active: menuName === 'virtual'}"
          @click="pushMenu('virtual')"
        >{{$t('heads.virtual')}}</a> -->
        <a
          class="item"
          :class="{active: menuName === 'audit'}"
          @click="pushMenu('audit')"
        >{{$t('heads.audit')}}</a>
        <a
          class="item"
          :class="{active: menuName === 'mymachine'}"
          @click="pushMenu('mymachine')"
        >{{$t('heads.mymachine')}}</a>
        <a
          class="item"
          :class="{active: menuName === 'mywallet'}"
          @click="pushMenu('mywallet')"
        >{{$t('heads.mywallet')}}</a>
        <a
          target="_blank"
          href="https://deepbrainchain.github.io/DBC-Wiki/dbc-introduction/rent-virtual.html"
          class="item"
        >{{$t('heads.help')}}</a>
        <a
          class="item"
          v-if="this.curLang==='cn' ||this.curLang==='CN' "
          href="http://www.dbctalk.ai"
          target="_blank"
        >{{set_dbctalk}}</a>
        <a class="item" v-else href="https://t.me/deepbrainchainglobal" target="_blank">Join Telegram</a>
      </div>
      <el-dropdown class="drop-lang" trigger="click" v-on:command="drop_command">
        <span class="el-dropdown-link">
          <i class="icon-language"></i>
          <span>{{language_name}}</span>
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="CN">简体中文</el-dropdown-item>
          <el-dropdown-item command="EN">ENGLISH</el-dropdown-item>
          <el-dropdown-item command="FR">Français</el-dropdown-item>
          <el-dropdown-item command="ES">español</el-dropdown-item>
          <!-- <el-dropdown-item command="RU">Ру́сский язы́к</el-dropdown-item> -->
          <!--    <el-dropdown-item command="VI">Việt nam</el-dropdown-item>
          <el-dropdown-item command="KO">한국어</el-dropdown-item>
          <el-dropdown-item command="TH">ภาษาไทย</el-dropdown-item>
          <el-dropdown-item command="RU">Ру́сский язы́к</el-dropdown-item>
          <el-dropdown-item command="TR">Türk Dili</el-dropdown-item>
          <el-dropdown-item command="JA">日本語</el-dropdown-item>-->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script >
import { mapActions, mapState } from "vuex";
export default {
  name: "Head",
  data() {
    return {
      curLang: undefined, //this.$i18n.locale,
      //  menuName: "",
      link: undefined,
      title: undefined,
      logo: undefined,
      language_name: "简体中文",
      headhidden: true
    };
  },
  created() {
    this.set_ico();
    this.set_title();
    this.set_logo();
    this.setLanguageCode();
    this.initData();
  },
  watch: {
    "$i18n.locale"() {
      this.set_ico()
      this.set_title()
      this.set_logo()
    },
    "$route"(oldvalue) {
      if (oldvalue.path.indexOf('/trade') != -1) {
        this.headhidden = false
      }
    }
  },
  computed: {
    ...mapState([
      "address",
      "balance",
      "transferList",
      "dbcToUS",
      "menuName",
    ]),
    set_dbctalk() {
      return "";
    }
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
    setLanguageCode() {
      let type = navigator.appName;
      let lang = "";
      if (type == "Netscape") {
        lang = navigator.language;
      } else {
        lang = navigator.userLanguage;
      }
      lang = lang.substr(0, 2);
      if (lang === "zh") {
        lang = "CN";
      } else if (lang === "en") {
        lang = "EN";
      }
      // else if (lang === "vi") {
      //  lang = "VI";
      // } else if (lang === "ko") {
      //   lang = "KO";
      // } else if (lang === "th") {
      //   lang = "TH";
      // }
      else if (lang === "ru") {
        lang = "RU";
      }
      //else if (lang === "tr") {
      //  lang = "TR";
      // } else if (lang === "ja") {
      //  lang = "JA";
      //}
      // console.log(this.$i18n.getLocaleMessage("en"));
      // this.curLang = lang;
      this.$loadLanguageAsync(lang).then(() => {
        if (lang === "CN") {
          this.curLang = "CN";
          this.language_name = "简体中文";
        } else if (lang === "EN") {
          this.curLang = "EN";
          this.language_name = "ENGLISH";
        } else if (lang === "FR") {
          this.curLang = "FR";
          this.language_name = "Français";
        } else if (lang === "ES") {
          this.curLang = "ES";
          this.language_name = "español";
        }
        //else if (lang === "VI") {
        //   this.language_name = "Việt nam";
        // } else if (lang === "KO") {
        //   this.language_name = "한국어";
        //} else if (lang === "TH") {
        //   this.language_name = "ภาษาไทย";
        // }
        else if (lang === "RU") {
          this.language_name = "Ру́сский язы́к";
        }
        //else if (lang === "TR") {
        //  this.language_name = "Türk Dili";
        // } else if (lang === "JA") {
        //   this.language_name = "日本語";
        // }
      });
    },
    set_ico() {
      this.link =
        document.querySelector("link[rel*='icon']") ||
        document.createElement("link");
      if (this.$t("website_name") == "dbchain") {
        this.link.href = "./dbchain.ico";
      } else if (this.$t("website_name") == "yousanai") {
        this.link.href = "./yousanai.ico";
      } else if (this.$t("website_name") == "aionego") {
        this.link.href = "./aionego.ico";
      } else if (this.$t("website_name") == "deepshare") {
        this.link.href = "./deepshare.ico";
      } else if (this.$t("website_name") == "panchuangai") {
        this.link.href = "./panchuangai.ico";
      } else if (this.$t("website_name") == "sharegpu") {
        this.link.href = "./sharegpu.ico";
      } else if (this.$t("website_name") == "yalecloud") {
        this.link.href = "./yalecloud.ico";
      } else if (this.$t("website_name") == "52lm") {
        // this.link.href = "./panchuangai.ico";
      } else if (this.$t("website_name") == "dimi") {
        this.link.href = "./dimi.ico";
      } else if (this.$t("website_name") == "mayi") {
        this.link.href = "./mayi.ico";
      } else if (this.$t("website_name") == "windywinter") {
        this.link.href = "./windywinter.ico";
      } else if (this.$t("website_name") == "1024lab") {
        this.link.href = "./1024lab.ico";
      } else if (this.$t("website_name") == "litaai") {
        this.link.href = "./litaai.ico";
      } else if (this.$t("website_name") == "ainlp") {
        this.link.href = "./ainlp.ico";
      } else if (this.$t("website_name") == "52cv") {
        this.link.href = "./52cv.ico";
      } else if (this.$t("website_name") == "redstonewill") {
        this.link.href = "./redstonewill.ico";
      } else if (this.$t("website_name") == "alpha-dbchain") {
        this.link.href = "./alpha-dbchain.ico";
      } else if (this.$t("website_name") == "xyzlab") {
        this.link.href = "./xyzlab.ico";
      } else if (this.$t("website_name") == "gpgpu") {
        this.link.href = "./gpgpu.ico";
      } else if (this.$t("website_name") == "rocketai") {
        this.link.href = "./rocketai.ico";
      } else if (this.$t("website_name") == "deepbit") {
        this.link.href = "./deepbit.ico";
      } else if (this.$t("website_name") == "aichriscloud") {
        this.link.href = "./aichriscloud.ico";
      } else if (this.$t("website_name") == "vnxmart") {
        this.link.href = "./vnxmart.ico";
      } else if (this.$t("website_name") == "aiaicloud") {
        this.link.href = "./aiaicloud.ico";
      } else if (this.$t("website_name") == "snbt") {
        this.link.href = "./snbt.ico";
      } else if (this.$t("website_name") == "heekmind") {
        this.link.href = "./heekmind.ico";
      } else if (this.$t("website_name") == "aicv") {
        this.link.href = "./aicv.ico";
      } else if (this.$t("website_name") == "freegpu") {
        this.link.href = "./freegpu.ico";
      } else if (this.$t("website_name") == "boincplanet") {
        this.link.href = "./boincplanet.ico";
      } else if (this.$t("website_name") == "shareaiot") {
        this.link.href = "./shareaiot.ico";
      } else if (this.$t("website_name") == "topgpu") {
        this.link.href = "./topgpu.ico";
      } else if (this.$t("website_name") == "thinkotech") {
        this.link.href = "./thinkotech.ico";
      } else if (this.$t("website_name") == "coolgpu") {
        this.link.href = "./coolgpu.ico";
      } else if (this.$t("website_name") == "scclouds") {
        // this.link.href = "./scclouds.ico";
      } else if (this.$t("website_name") == "nvidiaai") {
        // this.link.href = "./nvidiaai.ico";
      } else if (this.$t("website_name") == "deligpu") {
        // this.link.href = "./deligpu.ico";
      } else if (this.$t("website_name") == "longway") {
        this.link.href = "./longway.ico";
      } else if (this.$t("website_name") == "sharedgpu") {
        this.link.href = "./sharedgpu.ico";
      } else if (this.$t("website_name") == "aipower") {
        this.link.href = "./aipower.ico";
      } else if (this.$t("website_name") == "cvstudy") {
        this.link.href = "./cvstudy.ico";
      } else if (this.$t("website_name") == "gpuhub") {
        this.link.href = "./gpuhub.ico";
      } else if (this.$t("website_name") == "district51") {
        this.link.href = "./district51.ico";
      } else if (this.$t("website_name") == "deepmind") {
        this.link.href = "./deepmind.ico";
      } else if (this.$t("website_name") == "transportation") {
        this.link.href = "./transportation.ico";
      } else if (this.$t("website_name") == "planetc") {
        this.link.href = "./planetc.ico";
      } else if (this.$t("website_name") == "sdnu") {
        this.link.href = "./sdnu.ico";
      } else if (this.$t("website_name") == "freegputop") {
        this.link.href = "./freegputop.ico";
      } else if (this.$t("website_name") == "tensorgpu") {
        this.link.href = "./tensorgpu.ico";
      } else if (this.$t("website_name") == "opengpu") {
        this.link.href = "./opengpu.ico";
      } else if (this.$t("website_name") == "aiyanxishe") {
        this.link.href = "./aiyanxishe.ico";
      } else if (this.$t("website_name") == "codefate") {
        this.link.href = "./codefate.ico";
      } else if (this.$t("website_name") == "changhe") {
        this.link.href = "./changhe.ico";
      } else if (this.$t("website_name") == "changhe") {
        this.link.href = "./changhe.ico";
      }

      document.getElementsByTagName("head")[0].appendChild(this.link);
    },

    set_title() {
      if (this.$t("website_name") == "dbchain") {
        document.title = "DBChain";
      } else if (this.$t("website_name") == "yousanai") {
        document.title = "YouSanAI";
      } else if (this.$t("website_name") == "aionego") {
        document.title = "AIOnego";
      } else if (this.$t("website_name") == "deepshare") {
        document.title = "Deepshare";
      } else if (this.$t("website_name") == "panchuangai") {
        document.title = "PanChuangAI";
      } else if (this.$t("website_name") == "sharegpu") {
        document.title = "ShareGpu";
      } else if (this.$t("website_name") == "yalecloud") {
        document.title = "YaleCloud";
      } else if (this.$t("website_name") == "52lm") {
        document.title = "52LM";
      } else if (this.$t("website_name") == "dimi") {
        document.title = "DIMI";
      } else if (this.$t("website_name") == "mayi") {
        document.title = "MAYI";
      } else if (this.$t("website_name") == "windywinter") {
        document.title = "WindyWinter";
      } else if (this.$t("website_name") == "1024lab") {
        document.title = "1024LAB";
      } else if (this.$t("website_name") == "litaai") {
        document.title = "LITAAI";
      } else if (this.$t("website_name") == "ainlp") {
        document.title = "AINLP";
      } else if (this.$t("website_name") == "52cv") {
        document.title = "52CV";
      } else if (this.$t("website_name") == "redstonewill") {
        document.title = "redstonewill";
      } else if (this.$t("website_name") == "alpha-dbchain") {
        document.title = "alpha-dbchain";
      } else if (this.$t("website_name") == "xyzlab") {
        document.title = "xyzlab";
      } else if (this.$t("website_name") == "gpgpu") {
        document.title = "gpgpu";
      } else if (this.$t("website_name") == "rocketai") {
        document.title = "rocketai";
      } else if (this.$t("website_name") == "deepbit") {
        document.title = "deepbit";
      } else if (this.$t("website_name") == "aichriscloud") {
        document.title = "aichriscloud";
      } else if (this.$t("website_name") == "vnxmart") {
        document.title = "vnxmart";
      } else if (this.$t("website_name") == "aiaicloud") {
        document.title = "aiaicloud";
      } else if (this.$t("website_name") == "snbt") {
        document.title = "snbt";
      } else if (this.$t("website_name") == "heekmind") {
        document.title = "heekmind";
      } else if (this.$t("website_name") == "aicv") {
        document.title = "aicv";
      } else if (this.$t("website_name") == "freegpu") {
        document.title = "freegpu";
      } else if (this.$t("website_name") == "boincplanet") {
        document.title = "boincplanet";
      } else if (this.$t("website_name") == "shareaiot") {
        document.title = "shareaiot";
      } else if (this.$t("website_name") == "topgpu") {
        document.title = "topgpu";
      } else if (this.$t("website_name") == "thinkotech") {
        document.title = "thinkotech";
      } else if (this.$t("website_name") == "coolgpu") {
        document.title = "coolgpu";
      } else if (this.$t("website_name") == "scclouds") {
        document.title = "scclouds";
      } else if (this.$t("website_name") == "nvidiaai") {
        document.title = "nvidiaai";
      } else if (this.$t("website_name") == "deligpu") {
        document.title = "deligpu";
      } else if (this.$t("website_name") == "longway") {
        document.title = "longway";
      } else if (this.$t("website_name") == "sharedgpu") {
        document.title = "sharedgpu";
      } else if (this.$t("website_name") == "aipower") {
        document.title = "aipower";
      } else if (this.$t("website_name") == "cvstudy") {
        document.title = "cvstudy";
      } else if (this.$t("website_name") == "gpuhub") {
        document.title = "gpuhub";
      } else if (this.$t("website_name") == "district51") {
        document.title = "district51";
      } else if (this.$t("website_name") == "deepmind") {
        document.title = "deepmind";
      } else if (this.$t("website_name") == "transportation") {
        document.title = "transportation";
      } else if (this.$t("website_name") == "planetc") {
        document.title = "planetc";
      } else if (this.$t("website_name") == "sdnu") {
        document.title = "sdnu";
      } else if (this.$t("website_name") == "freegputop") {
        document.title = "freegputop";
      } else if (this.$t("website_name") == "tensorgpu") {
        document.title = "tensorgpu";
      } else if (this.$t("website_name") == "opengpu") {
        document.title = "opengpu";
      } else if (this.$t("website_name") == "aiyanxishe") {
        document.title = "aiyanxishe";
      } else if (this.$t("website_name") == "codefate") {
        document.title = "codefate";
      } else if (this.$t("website_name") == "changhe") {
        document.title = "changhe";
      } else if (this.$t("website_name") == "dpool") {
        document.title = "dpool";
      } else if (this.$t("website_name") == "tycloud") {
        document.title = "tycloud";
      } else if (this.$t("website_name") == "Nexuicloud") {
        document.title = "Nexuicloud";
      }
    },
    set_logo() {
      if (this.$t("website_name") == "dbchain") {
        this.logo = require("../../assets/imgs/dbchain@1x.png");
      } else if (this.$t("website_name") == "yousanai") {
        this.logo = require("../../assets/imgs/yousanai@1x.png");
      } else if (this.$t("website_name") == "aionego") {
        this.logo = require("../../assets/imgs/aionego@1x.png");
      } else if (this.$t("website_name") == "deepshare") {
        this.logo = require("../../assets/imgs/deepshare@1x.png");
      } else if (this.$t("website_name") == "sharegpu") {
        this.logo = require("../../assets/imgs/sharegpu@1x.png");
      } else if (this.$t("website_name") == "panchuangai") {
        this.logo = require("../../assets/imgs/panchuangai@1x.png");
      } else if (this.$t("website_name") == "yalecloud") {
        this.logo = require("../../assets/imgs/yalecloud@1x.png");
      } else if (this.$t("website_name") == "52lm") {
        // this.logo = require("../../assets/imgs/sharegpu@1x.png");
      } else if (this.$t("website_name") == "dimi") {
        this.logo = require("../../assets/imgs/dimi@1x.png");
      } else if (this.$t("website_name") == "mayi") {
        this.logo = require("../../assets/imgs/mayi@1x.png");
      } else if (this.$t("website_name") == "windywinter") {
        this.logo = require("../../assets/imgs/windywinter@1x.png");
      } else if (this.$t("website_name") == "1024lab") {
        this.logo = require("../../assets/imgs/1024lab@1x.png");
      } else if (this.$t("website_name") == "litaai") {
        this.logo = require("../../assets/imgs/litaai@1x.png");
      } else if (this.$t("website_name") == "ainlp") {
        this.logo = require("../../assets/imgs/ainlp@1x.png");
      } else if (this.$t("website_name") == "52cv") {
        this.logo = require("../../assets/imgs/52cv@1x.png");
      } else if (this.$t("website_name") == "redstonewill") {
        this.logo = require("../../assets/imgs/redstonewill@1x.png");
      } else if (this.$t("website_name") == "alpha-dbchain") {
        this.logo = require("../../assets/imgs/alpha-dbchain@1x.png");
      } else if (this.$t("website_name") == "xyzlab") {
        this.logo = require("../../assets/imgs/xyzlab@1x.png");
      } else if (this.$t("website_name") == "gpgpu") {
        this.logo = require("../../assets/imgs/gpgpu@1x.png");
      } else if (this.$t("website_name") == "rocketai") {
        this.logo = require("../../assets/imgs/rocketai@1x.png");
      } else if (this.$t("website_name") == "deepbit") {
        this.logo = require("../../assets/imgs/deepbit@1x.png");
      } else if (this.$t("website_name") == "aichriscloud") {
        this.logo = require("../../assets/imgs/aichriscloud@1x.png");
      } else if (this.$t("website_name") == "vnxmart") {
        this.logo = require("../../assets/imgs/vnxmart@1x.png");
      } else if (this.$t("website_name") == "aiaicloud") {
        this.logo = require("../../assets/imgs/aiaicloud@1x.png");
      } else if (this.$t("website_name") == "snbt") {
        this.logo = require("../../assets/imgs/snbt@1x.png");
      } else if (this.$t("website_name") == "heekmind") {
        this.logo = require("../../assets/imgs/heekmind@1x.png");
      } else if (this.$t("website_name") == "aicv") {
        this.logo = require("../../assets/imgs/aicv@1x.png");
      } else if (this.$t("website_name") == "freegpu") {
        this.logo = require("../../assets/imgs/freegpu@1x.png");
      } else if (this.$t("website_name") == "boincplanet") {
        this.logo = require("../../assets/imgs/boincplanet@1x.png");
      } else if (this.$t("website_name") == "shareaiot") {
        this.logo = require("../../assets/imgs/shareaiot@1x.png");
      } else if (this.$t("website_name") == "topgpu") {
        this.logo = require("../../assets/imgs/topgpu@1x.png");
      } else if (this.$t("website_name") == "thinkotech") {
        this.logo = require("../../assets/imgs/thinkotech@1x.png");
      } else if (this.$t("website_name") == "coolgpu") {
        this.logo = require("../../assets/imgs/coolgpu@1x.png");
      } else if (this.$t("website_name") == "scclouds") {
        // this.logo = require("../../assets/imgs/scclouds@1x.png");
      } else if (this.$t("website_name") == "nvidiaai") {
        //this.logo = require("../../assets/imgs/nvidiaai@1x.png");
      } else if (this.$t("website_name") == "deligpu") {
        //this.logo = require("../../assets/imgs/deligpu@1x.png");
      } else if (this.$t("website_name") == "longway") {
        this.logo = require("../../assets/imgs/longway@1x.png");
      } else if (this.$t("website_name") == "sharedgpu") {
        this.logo = require("../../assets/imgs/sharedgpu@1x.png");
      } else if (this.$t("website_name") == "aipower") {
        this.logo = require("../../assets/imgs/aipower@1x.png");
      } else if (this.$t("website_name") == "cvstudy") {
        this.logo = require("../../assets/imgs/cvstudy@1x.png");
      } else if (this.$t("website_name") == "gpuhub") {
        this.logo = require("../../assets/imgs/gpuhub@1x.png");
      } else if (this.$t("website_name") == "district51") {
        this.logo = require("../../assets/imgs/district51@1x.png");
      } else if (this.$t("website_name") == "deepmind") {
        this.logo = require("../../assets/imgs/deepmind@1x.png");
      } else if (this.$t("website_name") == "transportation") {
        this.logo = require("../../assets/imgs/transportation@1x.png");
      } else if (this.$t("website_name") == "planetc") {
        this.logo = require("../../assets/imgs/planetc@1x.png");
      } else if (this.$t("website_name") == "sdnu") {
        this.logo = require("../../assets/imgs/sdnu@1x.png");
      } else if (this.$t("website_name") == "freegputop") {
        this.logo = require("../../assets/imgs/freegputop@1x.png");
      } else if (this.$t("website_name") == "tensorgpu") {
        this.logo = require("../../assets/imgs/tensorgpu@1x.png");
      } else if (this.$t("website_name") == "opengpu") {
        this.logo = require("../../assets/imgs/opengpu@1x.png");
      } else if (this.$t("website_name") == "aiyanxishe") {
        this.logo = require("../../assets/imgs/aiyanxishe@1x.png");
      } else if (this.$t("website_name") == "codefate") {
        this.logo = require("../../assets/imgs/codefate@1x.png");
      } else if (this.$t("website_name") == "changhe") {
        this.logo = require("../../assets/imgs/changhe@1x.png");
      } else if (this.$t("website_name") == "tycloud") {
        this.logo = require("../../assets/imgs/tianyucloud.png");
      } else if (this.$t("website_name") == "Nexuicloud") {
        this.logo = require("../../assets/imgs/Nexuicloud.png");
      }
    },
    pushMenu(name) {
      //  this.menuName = name;
      this.$store.commit("setMenuName", name);
      this.$router.push("/" + name);
    },

    pushToPreview() {
      this.$router.push("/preview");
    },
    drop_home(name) {
      this.$store.commit("setMenuName", 'wholeVirtual');
      this.$router.push({
        path:"/wholeVirtual",
        query: {
          type: name
        }
      });
    },
    drop_home1(name) {
      this.$store.commit("setMenuName", 'signleVirtual');
      this.$router.push({
        path:"/signleVirtual",
        query: {
          type: name
        }
      });
    },
    drop_command(lang) {
      this.$loadLanguageAsync(lang).then(() => {
        this.curLang = lang;
        if (lang === "CN") {
          this.language_name = "简体中文";
        } else if (lang === "EN") {
          this.language_name = "ENGLISH";
        } else if (lang === "VI") {
          this.language_name = "Việt nam";
        } else if (lang === "KO") {
          this.language_name = "한국어";
        } else if (lang === "TH") {
          this.language_name = "ภาษาไทย";
        } else if (lang === "RU") {
          this.language_name = "Ру́сский язы́к";
        } else if (lang === "TR") {
          this.language_name = "Türk Dili";
        } else if (lang === "JA") {
          this.language_name = "日本語";
        } else if (lang === "FR") {
          this.language_name = "Français";
        } else if (lang === "ES") {
          this.language_name = "español";
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.head {
  // padding-top: 112px;
  // padding-bottom: 110px;
  padding-top: 30px;
  padding-bottom: 25px;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    max-width: 120px;
    // margin-top: -30px; //dbchain:10px ,aionego:-30px,yousanai:-30px,deepshare-30px,yalecloud-30px,panchuanga:-30px,,sharegpu:-30px
    //alpha-dbchain:-50px,xyzlab:-20px
    margin-right: 119px; //dbchain: 119px  ,aionego:119px,yousanai:119px,deepshare:119px
  }
  .navlist{
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .item {
      font-size: 16px;
      font-weight: 700;
      margin-right: 40px;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.5);
      // padding-bottom: 5px;
      border-bottom: 2px solid transparent;
      .item {
        margin-right: 0;
        padding-bottom: 5px;
      }
      &:hover {
        color: rgba(255, 255, 255, 0.9);
      }

      &.active {
        border-bottom-color: #fff;
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }

  .drop-lang {
    cursor: pointer;
  }
  .el-dropdown-link {
    .icon-language {
      display: inline-block;
      width: 14px;
      height: 14px;
      vertical-align: middle;
      margin-right: 6px;
      background: url(~@/assets/imgs/language@1x.png) no-repeat;
    }

    span,
    i {
      vertical-align: middle;
    }

    .el-icon-caret-bottom {
      font-size: 8px;
    }
  }

  * {
    /*color: #f7f7fb;*/
    color: rgba(255, 255, 255, 0.9);
  }
}

@media screen and (max-width: 1600px) {
  .head{
    .content{
      width: 1200px;
      .logo{
        max-width: 120px;
        margin-right: 50px;
      }
      .navlist{
        flex: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .item {
          margin-right: 50px;
          .item {
            margin-right: 0;
          }
        }
      }
    }
  }
}

</style>
