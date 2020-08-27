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
  name: "mymachine",
  data() {
    return {
      // 缓存组件列表
      cacheList: [
        "myMachine_unlock",
        "myMachine_unlock_cpu",
        "myMachine_unlock_stopped",
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
    this.init_menus();
  },
  watch: {
    "$i18n.locale"() {
      this.init_menus();
    },
  },
  computed: {},
  methods: {
    init_menus() {
      this.menus[0].title = this.$t("gpu.myMachine_gpu");

      this.menus[1].title = this.$t("gpu.myMachine_cpu");
      this.menus[2].title = this.$t("gpu.myMachine_stopped");
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
  margin-bottom: 42px;
}
.right-wrap {
  margin-left: 20px;
}
</style>
