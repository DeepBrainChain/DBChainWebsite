<template>
  <div class="header">
    <div class="mask"></div>
    <div class="wrap content wrap1440">
      <img class="logo" :src="logo" />
      <div class="nav">
        <div class="underline" ref="underline" :style="underlineStyle"></div>
        <a
          class="item"
          :class="{ active: this.$store.state.menuName === 'home' }"
          @click="pushMenu('home')"
          index="0"
          ref="item0"
          >{{ $t("heads.home") }}</a
        >
        <a
          class="item"
          :class="{ active: this.$store.state.menuName === 'gpu' }"
          @click="pushMenu('gpu')"
          index="1"
          ref="item1"
          >{{ $t("heads.gpu") }}</a
        >
        <a
          v-if="getCookie('login') === 'login'"
          class="item"
          :class="{ active: this.$store.state.menuName === 'mymachine' }"
          @click="pushMenu('mymachine')"
          index="2"
          ref="item2"
          >{{ $t("heads.mymachine") }}</a
        >
        <a
          v-else
          class="item"
          :class="{ active: this.$store.state.menuName === 'mymachine' }"
          @click="setMenuInfo('mymachine', 'login')"
          index="2"
          ref="item2"
          >{{ $t("heads.mymachine") }}</a
        >
        <a
          class="item"
          :class="{ active: this.$store.state.menuName === 'help' }"
          @click="pushMenu('help')"
          index="4"
          ref="item4"
          >{{ $t("heads.help") }}</a
        >
      </div>
      <div class="account">
        <el-dropdown v-if="accountIsLogin" trigger="click">
          <span class="el-dropdown-link">
            <span>{{ getCookie("email") }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <span @click="signOut()">
              <el-dropdown-item icon="el-icon-delete">{{
                $t("congTuCloud.header.signOut")
              }}</el-dropdown-item>
            </span>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="account-nav" v-else>
          <span class="login" @click="toLogin()">{{
            $t("congTuCloud.header.login")
          }}</span>
          <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
          <span class="register" @click="toRegister()">{{
            $t("congTuCloud.header.register")
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { getCookie, clearCookie } from "../../../utlis/index";
export default {
  name: "SubHeader",
  props: ["underlineStyle"],
  data() {
    return {
      accountIsLogin: false,
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
    console.log(getCookie("login"));
    if (getCookie("login") === "login") {
      this.accountIsLogin = true;
    }
    console.log(this.accountIsLogin);
  },
  computed: {
    ...mapState([
      "address",
      "balance",
      "transferList",
      "dbcToUS",
    ]),
    set_dbctalk() {
      return "";
    },
  },
  methods: {
    getCookie: function (name) {
      return getCookie(name);
    },
    handlerClickNav: function (e) {
      let items = [
        this.$refs.item0,
        this.$refs.item1,
        this.$refs.item2,
        this.$refs.item3,
        this.$refs.item4,
      ];

      let itemIndex = parseInt(e.target.getAttribute("index"));
      if (
        itemIndex == 0 ||
        itemIndex == 1 ||
        itemIndex == 2 ||
        itemIndex == 3 ||
        itemIndex == 4
      ) {
      } else {
        return;
      }
      this.changeItemcolor(items, itemIndex);
    },
    changeItemcolor: function (items, index) {
      for (let i = 0; i < items.length; i++) {
        items[i].style.color = "rgba(255, 255, 255, .6)";
      }
      items[index].style.color = "rgba(255, 255, 255, 1)";
    },
    ...mapActions([
      "getAccountState",
      "getExchangeRate"
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
        this.link.href = "../../congTuCloudIco.png";
      } else if (this.$t("website_name") == "yousanai") {
        this.link.href = "./yousanai.ico";
      }

      document.getElementsByTagName("head")[0].appendChild(this.link);
    },

    set_title() {
      if (this.$t("website_name") == "congTuCloud") {
        document.title = "聪图云";
      } else if (this.$t("website_name") == "yousanai") {
        document.title = "YouSanAI";
      }
    },
    set_logo() {
      if (this.$t("website_name") == "congTuCloud") {
        // this.logo = require("../../assets/imgs/header/logo.svg");
        this.logo = require("../../assets/imgs/header/logo2.png");
      } else if (this.$t("website_name") == "yousanai") {
        this.logo = require("../../../assets/imgs/yousanai@1x.png");
      }
    },
    pushMenu(name) {
      //  this.menuName = name;
      if (name != "login" || name != "register") {
        this.$store.commit("setMenuName", name);
      }
      if (name === "mymachine") {
        this.$router.push("/" + "myMachine/myMachineUnlock");
      } else {
        this.$router.push("/" + name);
      }
    },
    setMenuInfo(currentName, pushToName) {
      this.$store.commit("setMenuName", currentName);
      this.$router.push("/" + pushToName);
    },

    pushToPreview() {
      this.$router.push("/preview");
    },
    toLogin() {
      this.$router.push("/login");
    },
    toRegister() {
      this.$router.push("/register");
    },
    signOut() {
      clearCookie("login");
      clearCookie("email");
      this.accountIsLogin = false;
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
  opacity: 0.9;
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
  width: 535px;
  height: 22px;
  position: absolute;
  top: 0;
  right: 150px;
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
.active {
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
  // left: 0px;
}
.account {
  height: 22px;
  line-height: 62px;
  float: right;
  margin-right: 20px;
  .account-nav {
    color: #ffffff;
    font-family: PingFangSC-Regular, PingFang SC;
    font-size: 16px;
    .login,
    .register {
      cursor: pointer;
    }
    .login:hover,
    .register:hover {
      color: #cc6666;
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #ffffff;
    font-family: PingFangSC-Regular, PingFang SC;
    font-size: 16px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>