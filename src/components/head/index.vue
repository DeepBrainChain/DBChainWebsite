<template>
  <div class="head">
    <div class="content wrap1440">
      <img class="logo" :src="logo" />
      <el-dropdown
        class="item"
        :class="{active: menuName === 'home' || menuName === 'minerHome'}"
        trigger="click"
        v-on:command="drop_home"
      >
        <span class="el-dropdown-link">
          <span>{{$t('heads.home')}}</span>
          <i class="el-icon-caret-bottom ml5"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="home">{{$t('heads.gpu')}}</el-dropdown-item>
          <el-dropdown-item command="minerHome">{{$t('heads.miner')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!--      <a class="item" :class="{active: menuName === 'home'}" @click="pushMenu('home')">{{$t('heads.home')}}</a>-->
      <a
        class="item"
        :class="{active: menuName === 'gpu'}"
        @click="pushMenu('gpu')"
      >{{$t('heads.gpu')}}</a>
      <!--      <router-link class="item" to="/network">{{$t('heads.network')}}</router-link>-->
      <a
        class="item"
        :class="{active: menuName === 'miner'}"
        @click="pushMenu('miner')"
      >{{$t('heads.miner')}}</a>
      <a
        class="item"
        v-if="this.curLang==='cn' ||this.curLang==='CN' "
        href="http://www.dbctalk.ai"
        target="_blank"
      >{{set_dbctalk}}</a>
      <a class="item" v-else href="https://t.me/deepbrainchain" target="_blank">Join Telegram</a>
      <!--      <router-link class="item" to="/home">{{$t('heads.api')}}</router-link>-->
      <!--  <router-link class="item" to="/home">{{$t('heads.help')}}</router-link>-->
      <el-dropdown class="drop-lang" trigger="click" v-on:command="drop_command">
        <span class="el-dropdown-link">
          <i class="icon-language"></i>
          <span>{{language_name}}</span>
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="CN">简体中文</el-dropdown-item>
          <el-dropdown-item command="EN">ENGLISH</el-dropdown-item>
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
import { mapState } from "vuex";

export default {
  name: "Head",
  data() {
    return {
      curLang: undefined, //this.$i18n.locale,
      menuName: "",
      link: undefined,
      title: undefined,
      logo: undefined,
      language_name: "简体中文"
    };
  },
  created() {
    this.set_ico();
    this.set_title();
    this.set_logo();
    this.setLanguageCode();
  },
  computed: {
    set_dbctalk() {
      if (this.$t("website_name") == "dbchain") {
        return this.$t("heads.talk");
      } else if (this.$t("website_name") == "yousanai") {
        return "";
      } else if (this.$t("website_name") == "aionego") {
        return "";
      } else if (this.$t("website_name") == "deepshare") {
        return "";
      } else if (this.$t("website_name") == "sharegpu") {
        return "";
      } else if (this.$t("website_name") == "panchuangai") {
        return "";
      } else if (this.$t("website_name") == "yalecloud") {
        return "";
      }

      return this.$t("heads.talk");
    }
  },
  methods: {
    setLanguageCode() {
      let type = navigator.appName;
      let lang = "";
      if (type == "Netscape") {
        lang = navigator.language;
      } else {
        lang = navigator.userLanguage;
      }
      lang = lang.substr(0, 2);
      if (lang === "cn") {
        lang = "CN";
      } else if (lang === "en") {
        lang = "EN";
      } else {
        lang = "EN";
      }
      // else if (lang === "vi") {
      //  lang = "VI";
      // } else if (lang === "ko") {
      //   lang = "KO";
      // } else if (lang === "th") {
      //   lang = "TH";
      // } else if (lang === "ru") {
      //   lang = "RU";
      //} else if (lang === "tr") {
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
        }
        //else if (lang === "VI") {
        //   this.language_name = "Việt nam";
        // } else if (lang === "KO") {
        //   this.language_name = "한국어";
        //} else if (lang === "TH") {
        //   this.language_name = "ภาษาไทย";
        // } else if (lang === "RU") {
        //  this.language_name = "Ру́сский язы́к";
        //} else if (lang === "TR") {
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
      }
    },
    pushMenu(name) {
      this.menuName = name;
      this.$router.push("/" + name);
    },
    pushToPreview() {
      this.$router.push("/preview");
    },
    drop_home(name) {
      this.menuName = name;
      this.$router.push("/" + name);
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
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.head {
  padding-top: 112px;
  padding-bottom: 110px;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .logo {
    margin-top: 10px; //dbchain:10px ,aionego:-30px,yousanai:-30px,deepshare-30px,yalecloud-30px,panchuanga:-30px
    margin-right: 119px; //dbchain: 119px  ,aionego:119px,yousanai:119px,deepshare:119px
  }

  .item {
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.5);
    padding-bottom: 10px;
    border-bottom: 2px solid transparent;

    &:hover {
      color: rgba(255, 255, 255, 0.9);
    }

    &.active {
      border-bottom-color: #fff;
      color: rgba(255, 255, 255, 0.9);
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
</style>
