<template>
  <div id="app">
    <!-- <Head></Head>
    <router-view></router-view>
    <Footer></Footer>-->

    <!-- dbc首页 -->
    <div v-if="false">
      <Head></Head>
      <router-view></router-view>
      <Footer></Footer>
    </div>
    <!-- 聪图云首页 -->
    <div v-else-if="true">
      <CongTuCloudHome />
    </div>
  </div>
</template>

<script>
import Head from "./components/head";
import Footer from "./components/footer";
import CongTuCloudHome from "./congTuCloud/pages/home";

export default {
  name: "app",
  beforeRouteUpdate(to, from, next) {
    next();
  },
  components: {
    Head,
    Footer,
    CongTuCloudHome,
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
</style>
