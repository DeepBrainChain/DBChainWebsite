<!--
 * @Author: your name
 * @Date: 2020-08-24 14:49:16
 * @LastEditTime: 2021-01-06 16:05:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \DBChainWebsite\src\views\help\index.vue
-->
<template>
  <div class="gpu" ref="gpuBox">
    <Header v-if="this.$store.state.webtype" :underlineStyle="underlineStyle" />
    <div class="box">
      <el-container>
        <el-aside
          v-if="$t('website_name') === 'congTuCloud'"
          class="left-wrap"
          style="min-height: 100vh"
        >
          <navi :menus="menus" :index="curNavIndex"></navi>
        </el-aside>
        <el-aside v-else class="left-wrap">
          <navi :menus="menus_chain" :index="curNavIndex"></navi>
        </el-aside>
        <el-main class="right-wrap">
          <keep-alive :include="cacheList">
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </div>
    <Footer class="footer" v-if="this.$store.state.webtype" />
  </div>
</template>

<script>
import Navi from "@/components/naviMenu";
import Header from "@/congTuCloud/components/header/SubHeader.vue";
import Footer from "@/congTuCloud/components/footer/Footer.vue";

export default {
  name: "help",
  data() {
    return {
      // 缓存组件列表
      cacheList: ["aiHelp", "filecoinHelp", "supernodeHelp"],
      curNavIndex: 0,
      menus: [
        {
          title: undefined, //this.$t("gpu.myWallet"),
          to: "aiHelp",
          index: 0,

          iconClass: "iconwallet"
        }
      ],

      menus_chain: [
        {
          title: undefined, //this.$t("gpu.myWallet"),
          to: "aiHelp",
          index: 0,

          iconClass: "iconwallet"
        },
        //  {
        //   title: undefined, //this.$t("gpu.myMachine"),
        //   to: "filecoinHelp",
        //   index: 1,
        //   iconClass: "iconmachine"
        // },
        {
          title: undefined, //this.$t("gpu.machineList"),
          to: "supernodeHelp",
          index: 1,
          iconClass: "iconlist"
        }
      ],
      underlineStyle: {
        width: "65px",
        left: "343px"
      }
    };
  },
  beforeRouteUpdate(to, from, next) {
    // const curRoute = to.matched.find(item => item.path === to.path)
    this.curNavIndex = to.meta.menuIndex;
    next();
  },
  created() {
    // const curRoute = this.$route.matched.find(item => item.path === this.$route.path)
    this.curNavIndex = this.$route.meta.menuIndex;
    this.inti_menus();
  },
  mounted() {
    if (this.$t("website_name") === "congTuCloud") {
      this.$refs.gpuBox.style.marginBottom = "0px";
    }
  },
  watch: {
    "$i18n.locale"() {
      this.inti_menus();
    }
  },
  computed: {
    inti_menus() {
      if (this.$t("website_name") !== "congTuCloud") {
        this.menus_chain[0].title = this.$t("ai_help");

        // this.menus[1].title = this.$t("filecoin_help");

        this.menus_chain[1].title = this.$t("supernode_help");
      } else {
        this.menus[0].title = this.$t("ai_help");
      }
    }
  },
  components: {
    Navi,
    Header,
    Footer
  }
};
</script>

<style lang="scss" scoped>
.gpu {
  margin-bottom: 42px;
}
.right-wrap {
  margin-left: 20px;
}
</style>
