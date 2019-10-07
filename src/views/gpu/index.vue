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
  name: "gpu",
  data() {
    return {
      // 缓存组件列表
      cacheList: ["myMachine_unlock", "list"],
      curNavIndex: 0,
      menus: [
        {
          title: undefined, //this.$t("gpu.myWallet"),
          to: "myWallet",
          index: 0,
          iconClass: "iconwallet"
        },
        {
          title: undefined, //this.$t("gpu.myMachine"),
          to: "myMachine",
          index: 1,
          iconClass: "iconmachine"
        },
        {
          title: undefined, //this.$t("gpu.machineList"),
          to: "list",
          index: 2,
          iconClass: "iconlist"
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
    this.inti_menus();
  },
  watch: {
    "$i18n.locale"() {
      this.inti_menus();
    }
  },
  computed: {
    inti_menus() {
      this.menus[0].title = this.$t("gpu.myWallet");

      this.menus[1].title = this.$t("gpu.myMachine");

      this.menus[2].title = this.$t("gpu.machineList");
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
