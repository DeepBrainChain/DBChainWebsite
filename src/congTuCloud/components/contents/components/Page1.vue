<template>
  <div class="wrap">
    <div class="banner1 banner" ref="banner1">
      <div class="container">
        <div class="title">聪图云</div>
        <div class="describe">国内专业提供GPU算力的平台</div>
        <div class="button">
          <div class="button-text">立即体验</div>
        </div>
      </div>
    </div>
    <div class="banner2 banner" ref="banner2">
      <div class="container">
        <div class="title">聪图云</div>
        <div class="describe">国内专业提供GPU算力的平台</div>
        <div class="button">
          <div class="button-text">立即体验</div>
        </div>
      </div>
    </div>
    <div class="banner3 banner" ref="banner3">
      <div class="container">
        <div class="title">聪图云</div>
        <div class="describe">国内专业提供GPU算力的平台</div>
        <div class="button">
          <div class="button-text">立即体验</div>
        </div>
      </div>
    </div>
    <div class="underline">
      <div class="underline-1" ref="underline1"></div>
      <div class="underline-2" ref="underline2"></div>
      <div class="underline-3" ref="underline3"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bannerFlag: 1,
    };
  },
  mounted: function () {
    setInterval(this.bannerSwitching, 5000);
  },
  methods: {
    bannerSwitching: function () {
      this.bannerFlag++;

      if (this.bannerFlag === 1) {
        this.$refs.banner1.style.display = "block";
        this.$refs.banner2.style.display = "none";
        this.$refs.banner3.style.display = "none";

        this.$refs.underline1.style.opacity = 1;
        this.$refs.underline2.style.opacity = 0.25;
        this.$refs.underline3.style.opacity = 0.25;
      } else if (this.bannerFlag === 2) {
        this.$refs.banner1.style.display = "none";
        this.$refs.banner2.style.display = "block";
        this.$refs.banner3.style.display = "none";

        this.$refs.underline1.style.opacity = 0.25;
        this.$refs.underline2.style.opacity = 1;
        this.$refs.underline3.style.opacity = 0.25;
      } else {
        this.$refs.banner1.style.display = "none";
        this.$refs.banner2.style.display = "none";
        this.$refs.banner3.style.display = "block";

        this.$refs.underline1.style.opacity = 0.25;
        this.$refs.underline2.style.opacity = 0.25;
        this.$refs.underline3.style.opacity = 1;
        this.bannerFlag = 0;
      }
    },
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
  position: absolute;
}
.banner1 {
  background: url(../../../assets/imgs/page1/banner01@0x.svg) no-repeat center;
  background-size: cover;
  top: 0;
  left: 0;
  display: block;
}
.banner2 {
  background: url(../../../assets/imgs/page1/banner02@0x.svg) no-repeat center;
  background-size: cover;
  top: 0;
  left: 0;
  display: none;
}
.banner3 {
  background: url(../../../assets/imgs/page1/banner03@0x.svg) no-repeat center;
  background-size: cover;
  top: 0;
  left: 0;
  display: none;
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