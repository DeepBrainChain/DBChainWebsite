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
  name: "mywallet",
  data() {
    return {
      // 缓存组件列表
      cacheList: ["myWallet_unlock"],
      curNavIndex: 0,
      menus: [
        {
          title: undefined, //this.$t("gpu.myMachine"),
          to: "myWallet",
          index: 0,
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
    this.inti_menus();
  },
  watch: {
    "$i18n.locale"() {
      this.inti_menus();
    },
  },
  computed: {
    inti_menus() {
      this.menus[0].title = this.$t("gpu.myWallet");
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
