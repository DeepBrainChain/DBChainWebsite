<template>
  <div id="app">
    <!-- 聪图云首页 -->
    <div v-if="this.$store.state.webtype" id="ct-wrap">
      <!-- <CongTuCloudHome /> -->
      <!-- <CongTuCloudHeader id="ct-header" /> -->
      <router-view></router-view>
      <!-- <CongTuCloudFooter id="ct-footer" /> -->
    </div>
    <!-- dbc首页 -->
    <div v-else>
      <Head/>
      <router-view></router-view>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
// dbc
import Head from "./components/head";
import Footer from "./components/footer";
// 聪图云
// import CongTuCloudHome from "./congTuCloud/pages/home";
// import CongTuCloudHeader from "./congTuCloud/components/header/Header";
// import CongTuCloudFooter from "./congTuCloud/components/footer/Footer";

export default {
  name: "app",
  beforeRouteUpdate(to, from, next) {
    next();
  },
  created() {
    this.$store.commit("setWebtype", this.webtypeSwitch);
  },
  computed: {
    webtypeSwitch: {
      get: function () {
        return this.$t("webtype") === "0" ? true : false;
      },
    },
  },
  components: {
    Head,
    Footer,
    // CongTuCloudHome,
    // CongTuCloudHeader,
    // CongTuCloudFooter,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#ct-wrap {
  min-width: 1366px;
  background-color: #fff;
}
#ct-header {
  width: 100%;
  height: 66px;
  /* position: absolute; */
  position: fixed;
  /* position: relative; */
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  margin: 0 auto;
  z-index: 9;
}
#ct-container {
  width: 100%;
}
#ct-footer {
  width: 100%;
  height: 200px;
}
</style>
