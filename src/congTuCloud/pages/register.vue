<template>
  <div class="wrap">
    <Header class="header" :underlineStyle="underlineStyle" />
    <background-img class="background-img" />
    <register class="register" />
  </div>
</template>
<script>
import Header from "../components/header/SubHeader";
import BackgroundImg from "../components/BackgroundImg";
import Register from "../components/Register";
export default {
  data() {
    return {
      msg: "register",
      underlineStyle: {
        width: "65px",
        left: "343px",
      },
    };
  },
  components: {
    Header,
    BackgroundImg,
    Register,
  },
};
</script>
<style lang="css" scoped>
.wrap {
  width: 100%;
  height: 100%;
  position: fixed;
}
.register {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 8% auto auto;
}
</style>