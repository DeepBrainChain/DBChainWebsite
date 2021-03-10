<!--
 * @Author: your name
 * @Date: 2021-01-05 20:00:12
 * @LastEditTime: 2021-01-06 14:34:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \DBChainWebsite\src\congTuCloud\pages\register.vue
-->
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
        left: "218px",
      },
    };
  },
  mounted() {
    if (this.$store.state.menuName === "gpu") {
      this.underlineStyle.width = "65px";
      this.underlineStyle.left = "92px";
    }
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