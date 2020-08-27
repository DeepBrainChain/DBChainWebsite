<template>
  <div class="gpu">
    <Header v-if="this.$store.state.webtype" />
    <div class="box">
      <el-container>
        <el-aside class="left-wrap">
          <navi :menus="menus" :index="curNavIndex"></navi>
        </el-aside>
        <el-main class="right-wrap">
          <keep-alive :include="cacheList">
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </div>
    <Footer v-if="this.$store.state.webtype" />
  </div>
</template>

<script>
import Navi from "@/components/naviMenu";
import Header from "@/congTuCloud/components/header/Header.vue";
import Footer from "@/congTuCloud/components/footer/Footer.vue";

export default {
  name: "gpu",
  data() {
    return {
      // 缓存组件列表
      cacheList: [
        "list",
        "highStabilityAITrain",
        "aiInference",
        "hashCompute",
        "superNodeCompute",
      ],
      curNavIndex: 1,
      menus: [
        {
          title: undefined, //this.$t("gpu.myWallet"),
          to: "list",
          index: 0,
          iconClass: "iconwallet",
        },
        {
          title: undefined, //this.$t("gpu.myMachine"),
          to: "highStabilityAITrain",
          index: 1,
          iconClass: "iconmachine",
        },
        {
          title: undefined, //this.$t("gpu.machineList"),
          to: "aiInference",
          index: 2,
          iconClass: "iconmachine",
        },
        {
          title: undefined, //this.$t("gpu.machineList"),
          to: "hashCompute",
          index: 3,
          iconClass: "iconmachine",
        },
        {
          title: undefined, //this.$t("gpu.machineList"),
          to: "superNodeCompute",
          index: 4,
          iconClass: "iconlist",
        },
      ],
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
  watch: {
    "$i18n.locale"() {
      this.inti_menus();
    },
  },
  computed: {
    inti_menus() {
      this.menus[0].title = this.$t("gpu.common");

      this.menus[1].title = this.$t("gpu.highStabilityAITrain");

      this.menus[2].title = this.$t("gpu.aiInference");
      this.menus[3].title = this.$t("gpu.hashCompute");
      this.menus[4].title = this.$t("gpu.superNodeCompute");
    },
  },
  components: {
    Navi,
    Header,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
.gpu {
  margin-bottom: 22px;
}
.right-wrap {
  margin-left: 10px;
}
</style>
