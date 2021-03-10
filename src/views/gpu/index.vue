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
          <navi :menus="menus" :index="curNavIndex"></navi>
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
      underlineStyle: {
        width: "65px",
        left: "92px",
      },
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
    },
  },
  methods: {
    inti_menus() {
      this.menus[0].title = this.$t("gpu.common");

      this.menus[1].title = this.$t("gpu.highStabilityAITrain");

      this.menus[2].title = this.$t("gpu.aiInference");
      this.menus[3].title = this.$t("gpu.hashCompute");
      this.menus[4].title = this.$t("gpu.superNodeCompute");

      // 在聪图云官网模式下，不显示超级节点算力区
      if (this.$t("website_name") === "congTuCloud") {
        this.menus = this.menus.slice(0, 4);
      }
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
