<template>
  <div class="wrap">
    <Header class="header" />
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
.header {
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