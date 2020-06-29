<template>
  <div class="gpu">
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
  </div>
</template>

<script>
import Navi from "@/components/naviMenu";

export default {
  name: "index",
  data() {
    return {
      // 缓存组件列表
      cacheList: ["myMinerMachine_unlock"],
      curNavIndex: 0,
      menus: [
        {
          title: undefined, //this.$t("gpu.myMachine"),
          to: "myMinerMachine",
          index: 0,
          iconClass: "iconmachine"
        }
      ]
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
    }
  },
  computed: {},
  methods: {
    init_menus() {
      this.menus[0].title = this.$t("myMachine_gpu_rentout");
    }
  },
  components: {
    Navi
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
