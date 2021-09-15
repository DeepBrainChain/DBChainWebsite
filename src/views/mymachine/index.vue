<template>
  <div class="gpu" ref="gpuBox">
    <Header v-if="this.$store.state.webtype" :underlineStyle="underlineStyle" />
    <div class="box">
      <el-container>
        <el-aside
          class="left-wrap"
          v-if="$t('website_name') === 'congTuCloud'"
          style="min-height: 100vh"
        >
          <navi :menus="menus" :index="curNavIndex"></navi>
        </el-aside>
        <el-aside class="left-wrap" v-else>
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
import Header from "@/congTuCloud/components/header/SubHeader.vue";
import Footer from "@/congTuCloud/components/footer/Footer.vue";

export default {
  name: "mymachine",
  components: {
    Navi,
    Header,
    Footer,
  },
  data() {
    return {
      // 缓存组件列表
      cacheList: [
        "myMachine_unlock",
        "myMachine_unlock_cpu",
        "myMachine_unlock_stopped",
        "myMachine_unlock_gpuVirtual"
      ],
      curNavIndex: 0,
      menus: [
        {
          title: undefined, //this.$t("gpu.myMachine"),
          to: "myMachine",
          index: 0,
          iconClass: "iconmachine",
        },
        {
          title: undefined, //this.$t("gpu.machineList"),
          to: "myMachine_cpu",
          index: 1,
          iconClass: "iconmachine",
        },
        {
          title: undefined, //this.$t("gpu.machineList"),
          to: "myMachine_stopped",
          index: 2,
          iconClass: "iconmachine",
        },
        
        {
          title: undefined, //this.$t("gpu.machineList"),
          to: "myMachine_gpuVirtual",
          index: 3,
          iconClass: "iconmachine",
        },
      ],
      underlineStyle: {
        width: "65px",
        left: "218px",
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
    this.init_menus();
  },
  mounted() {
    if (this.$t("website_name") === "congTuCloud") {
      this.$refs.gpuBox.style.marginBottom = "0px";
    }
  },
  watch: {
    "$i18n.locale"() {
      this.init_menus();
    },
  },
  methods: {
    init_menus() {
      this.menus[0].title = this.$t("gpu.myMachine_gpu");
      this.menus[1].title = this.$t("gpu.myMachine_cpu");
      this.menus[2].title = this.$t("gpu.myMachine_stopped");
      this.menus[3].title = this.$t("gpu.myMachine_gpuVirtual");

      // if (this.$t("website_name") === "congTuCloud") {
      //   this.menus.splice(2, 1);
      // }
    },
  },
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
