<template>
  <div class="wrap">
    <Header class="header" :underlineStyle="underlineStyle" />
    <background-img class="background-img" />
    <login class="login" />
  </div>
</template>
<script>
import Header from "../components/header/SubHeader";
import BackgroundImg from "../components/BackgroundImg";
import Login from "../components/Login";
export default {
  data() {
    return {
      msg: "login",
      underlineStyle: {
        width: "65px",
        left: "343px",
      },
    };
  },
  components: {
    Header,
    BackgroundImg,
    Login,
  },
};
</script>
<style lang="css" scoped>
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
.wrap {
  width: 100%;
  height: 100%;
  position: fixed;
}
.login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 8% auto auto;
}
</style>