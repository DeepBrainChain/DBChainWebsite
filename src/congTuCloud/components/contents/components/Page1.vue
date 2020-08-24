<template>
  <div class="wrap">
    <div class="banner">
      <div class="container">
        <div class="title">聪图云</div>
        <div class="describe">国内专业提供GPU算力的平台</div>
        <div class="button">
          <div class="button-text">立即体验</div>
        </div>
      </div>
    </div>
    <div class="underline">
      <div class="underline-1"></div>
      <div class="underline-2"></div>
      <div class="underline-3"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  position: relative;
}
.banner {
  width: 100%;
  height: 100%;
  background: url(../../../assets/imgs/page1/banner01@0x.svg) no-repeat center;
  background-size: cover;
  position: relative;
}
.container {
  width: 265px;
  height: 172px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto auto auto 12%;
}
.title {
  width: 102px;
  height: 48px;
  font-size: 34px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 48px;
  margin-bottom: 14px;
}
.describe {
  width: 263px;
  height: 24px;
  font-size: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  line-height: 24px;
  margin-bottom: 40px;
}
.button {
  width: 180px;
  height: 46px;
  background: rgba(0, 139, 243, 1);
  border-radius: 4px;
  position: relative;
}
.button-text {
  width: 72px;
  height: 24px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto auto;
}
.underline {
  width: 96px;
  height: 4px;
  position: absolute;
  // top: 536px;
  // left: 641px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto auto 30px;
}
.underline > div {
  width: 20px;
  height: 4px;
  margin-right: 12px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  opacity: 0.25;
  float: left;
}
div.underline-1 {
  opacity: 1;
}
</style>