<template>
  <div class="gpu">
    <Header
      v-if="this.$store.state.webtype"
      :underline-style="underlineStyle"
    />
    <div class="box">
      <el-container>
        <el-aside class="left-wrap">
          <navi
            :menus="menus"
            :index="curNavIndex"
          />
        </el-aside>
        <el-main class="right-wrap">
          <keep-alive :include="cacheList">
            <router-view />
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
  name: "MyWallet",
  components: {
    Navi,
    Header,
    Footer,
  },
  data () {
    return {
      // 缓存组件列表
      cacheList: ["myWallet_unlock"],
      curNavIndex: 0,
      menus: [
        {
          title: undefined, //this.$t("gpu.myMachine"),
          to: "/mywallet/myWallet",
          index: 0,
          iconClass: "iconmachine",
        },
      ],
      underlineStyle: {
        width: "65px",
        left: "343px",
      },
    };
  },
  beforeRouteUpdate(to, from, next) {
    // const curRoute = to.matched.find(item => item.path === to.path)
    this.curNavIndex = to.meta.menuIndex;
    next();
  },
  watch: {
    "$i18n.locale"() {
      this.inti_menus();
    },
  },
  created() {
    // const curRoute = this.$route.matched.find(item => item.path === this.$route.path)
    this.curNavIndex = this.$route.meta.menuIndex;
    this.inti_menus();
  },
  methods: {
    inti_menus() {
      this.menus[0].title = this.$t("gpu.myWallet");
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
