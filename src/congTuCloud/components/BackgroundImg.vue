<template>
  <div class="bg-img"></div>
</template>
<script>
export default {
  data() {
    return {
      msg: "背景",
    };
  },
};
</script>
<style lang="css" scoped>
.bg-img {
  width: 100%;
  height: 100%;
  background: #aaaaaa url("../assets/imgs/public/Grrdfgeg@2x.png") center
    no-repeat;
  background-size: cover;
}
</style>