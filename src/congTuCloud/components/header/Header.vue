<template>
  <div class="header">
    <div class="mask"></div>
    <div class="wrap content wrap1440">
      <img class="logo" :src="logo" />
      <div class="nav" @click="handlerClickNav($event)">
        <div class="underline" ref="underline"></div>
        <a
          class="item"
          :class="{active: this.$store.state.menuName === 'home'}"
          @click="pushMenu('home')"
          index="0"
          ref="item0"
        >{{$t('heads.home')}}</a>
        <a
          class="item"
          :class="{active: this.$store.state.menuName === 'gpu'}"
          @click="pushMenu('gpu')"
          index="1"
          ref="item1"
        >{{$t('heads.gpu')}}</a>
        <a
          class="item"
          :class="{active: this.$store.state.menuName === 'mymachine'}"
          @click="pushMenu('mymachine')"
          index="2"
          ref="item2"
        >{{$t('heads.mymachine')}}</a>
        <a
          class="item"
          :class="{active: this.$store.state.menuName === 'mywallet'}"
          @click="pushMenu('mywallet')"
          index="3"
          ref="item3"
        >{{$t('heads.mywallet')}}</a>
        <a
          class="item"
          :class="{active: this.$store.state.menuName === 'help'}"
          @click="pushMenu('help')"
          index="4"
          ref="item4"
        >{{$t('heads.help')}}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      curLang: undefined, //this.$i18n.locale,
      //  menuName: "",
      link: undefined,
      title: undefined,
      logo: undefined,
      language_name: "简体中文",
    };
  },
  created() {
    this.set_ico();
    this.set_title();
    this.set_logo();
    this.setLanguageCode();
    this.initData();
  },
  computed: {
    ...mapState([
      "address",
      "balance",
      "transferList",
      "dbcToUS",
      "dbcPrice",
      "dbcChange",
    ]),
    set_dbctalk() {
      return "";
    },
  },
  methods: {
    handlerClickNav: function (e) {
      let items = [
        this.$refs.item0,
        this.$refs.item1,
        this.$refs.item2,
        this.$refs.item3,
        this.$refs.item4,
      ];

      let itemIndex = parseInt(e.target.getAttribute("index"));
      let underline = this.$refs.underline;
      let width, left;
      if (itemIndex == 0) {
        width = "32px";
        left = "0px";
      } else if (itemIndex == 1) {
        width = "65px";
        left = "92px";
      } else if (itemIndex == 2) {
        width = "65px";
        left = "218px";
      } else if (itemIndex == 3) {
        width = "65px";
        left = "343px";
      } else if (itemIndex == 4) {
        width = "65px";
        left = "467px";
      } else {
        return;
      }
      // this.changeUnderlineWidthLeft(underline, width, left);
      this.changeItemcolor(items, itemIndex);
    },
    changeItemcolor: function (items, index) {
      for (let i = 0; i < items.length; i++) {
        items[i].style.color = "rgba(255, 255, 255, .6)";
      }
      items[index].style.color = "rgba(255, 255, 255, 1)";
    },
    changeUnderlineWidthLeft: function (underline, width, left) {
      underline.style.width = width;
      underline.style.left = left;
    },
    ...mapActions([
      "getAccountState",
      "getTransferList",
      "getExchangeRate",
      "getGate",
    ]),
    initData() {
      this.getExchangeRate();
      this.getAccountState()
        .then((data) => {})
        .catch((err) => {});
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
      if (this.$t("website_name") == "congTuCloud") {
        this.link.href = "./WechatIMG19@0x.svg";
      } else if (this.$t("website_name") == "yousanai") {
        this.link.href = "./yousanai.ico";
      }

      document.getElementsByTagName("head")[0].appendChild(this.link);
    },

    set_title() {
      if (this.$t("website_name") == "congTuCloud") {
        document.title = "congTuCloud";
      } else if (this.$t("website_name") == "yousanai") {
        document.title = "YouSanAI";
      }
    },
    set_logo() {
      if (this.$t("website_name") == "congTuCloud") {
        this.logo = require("../../assets/imgs/header/WechatIMG19@0x.svg");
      } else if (this.$t("website_name") == "yousanai") {
        this.logo = require("../../../assets/imgs/yousanai@1x.png");
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
      // this.menuName = name;
      this.$store.commit("setMenuName", name);
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
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 66px;
  position: relative;
}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(6, 23, 101, 1);
  box-shadow: 0px 2px 10px 0px rgba(102, 102, 102, 0.12);
  opacity: 0.3;
  position: absolute;
}
.wrap {
  width: 100%;
  height: 100%;
  position: relative;
}
.logo {
  display: block;
  width: 36px;
  height: 36px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 83px;
  margin: auto 0;
}
.logo:hover {
  cursor: pointer;
}
.nav {
  width: 530px;
  height: 22px;
  position: absolute;
  top: 0;
  right: 200px;
  bottom: 0;
  left: auto;
  margin: auto 0;
}
.item {
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  line-height: 22px;
  float: left;
  margin-right: 60px;
}
.item:hover {
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
.item:nth-child(2) {
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.item:last-child {
  margin: 0;
}
.underline {
  width: 32px;
  height: 3px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  position: absolute;
  top: 32px;
  left: 0px;
}
</style>
