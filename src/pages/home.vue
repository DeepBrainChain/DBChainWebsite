<!--
 * @Author: your name
 * @Date: 2021-01-08 10:50:37
 * @LastEditTime: 2021-01-08 12:16:08
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \home-page\src\pages\home.vue
-->
<template>
  <div class="wrap">
    <Header id="header" />
    <Container id="container" />
    <Footer class="footer" />
  </div>
</template>
<script>
import Header from "../components/header/Header";
import Container from "../components/contents/Container";
import Footer from "../components/footer/Footer";

export default {
  data() {
    return {};
  },
  components: {
    Header,
    Container,
    Footer,
  },
};
</script>
<style scoped>
.wrap {
  /* width: 100%; */
  min-width: 1366px;
  background-color: #fff;
}
#header {
  width: 100%;
  height: 66px;
  /* position: absolute; */
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  margin: 0 auto;
  z-index: 9;
}
#container {
  width: 100%;
}
.footer {
  width: 100%;
  height: 200px;
}
</style>