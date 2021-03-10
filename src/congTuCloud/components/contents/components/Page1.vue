<template>
  <div class="wrap">
    <div class="banner1 banner" ref="banner1">
      <div class="container">
        <div class="title">{{ $t("congTuCloud.page1.title[0]") }}</div>
        <div class="describe">{{ $t("congTuCloud.page1.describe[0]") }}</div>
        <div class="button" @click="pushMenu('gpu')">
          <div class="button-text">
            {{ $t("congTuCloud.page1.buttonText[0]") }}
          </div>
        </div>
      </div>
    </div>
    <div class="banner2 banner" ref="banner2">
      <div class="container">
        <div class="title">{{ $t("congTuCloud.page1.title[1]") }}</div>
        <div class="describe">{{ $t("congTuCloud.page1.describe[1]") }}</div>
        <div class="button" @click="pushMenu('gpu')">
          <div class="button-text">
            {{ $t("congTuCloud.page1.buttonText[1]") }}
          </div>
        </div>
      </div>
    </div>
    <div class="banner3 banner" ref="banner3">
      <div class="container">
        <div class="title">{{ $t("congTuCloud.page1.title[2]") }}</div>
        <div class="describe">{{ $t("congTuCloud.page1.describe[2]") }}</div>
        <div class="button" @click="pushMenu('gpu')">
          <div class="button-text">
            {{ $t("congTuCloud.page1.buttonText[2]") }}
          </div>
        </div>
      </div>
    </div>
    <div class="underline" @click="handlerClickUnderline($event)">
      <div class="underline-1" index="0" ref="underline1"></div>
      <div class="underline-2" index="1" ref="underline2"></div>
      <div class="underline-3" index="2" ref="underline3"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      banners: [],
      bannerIndex: 0,
      underlines: [],
      timerFlag: {},
      bannersChangeTime: 3500,
    };
  },
  mounted: function () {
    this.banners = [this.$refs.banner1, this.$refs.banner2, this.$refs.banner3];
    this.underlines = [
      this.$refs.underline1,
      this.$refs.underline2,
      this.$refs.underline3,
    ];
    this.timerFlag = setInterval(this.bannerSwitching, this.bannersChangeTime);
  },
  methods: {
    bannerSwitching: function () {
      this.bannerIndex++;
      this.changeBannerShow(this.bannerIndex);
      if (this.bannerIndex >= 2) {
        this.bannerIndex = -1;
      }
    },
    changeBannerShow: function (bannerIndex) {
      for (let i = 0; i < this.banners.length; i++) {
        this.banners[i].style.display = "none";
        this.underlines[i].style.opacity = 0.25;
      }
      this.banners[bannerIndex].style.display = "block";
      this.underlines[bannerIndex].style.opacity = 1;
    },
    handlerClickUnderline: function (e) {
      let underlineIndex = e.target.getAttribute("index");
      if (underlineIndex > 2 || underlineIndex < 0 || underlineIndex == null) {
        return;
      }
      clearInterval(this.timerFlag);
      this.bannerIndex = underlineIndex - 1;
      this.bannerSwitching();
      this.timerFlag = setInterval(
        this.bannerSwitching,
        this.bannersChangeTime
      );
    },
    pushMenu(name) {
      //  this.menuName = name;
      this.$store.commit("setMenuName", name);
      this.$router.push("/" + name);
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
  background: url(../../../assets/imgs/page1/banner01@2x.png) no-repeat center;
  background-size: cover;
  top: 0;
  left: 0;
  z-index: 1;
}
.banner2 {
  background: url(../../../assets/imgs/page1/banner02@2x.png) no-repeat center;
  background-size: cover;
  top: 0;
  left: 0;
}
.banner3 {
  background: url(../../../assets/imgs/page1/banner03@2x.png) no-repeat center;
  background-size: cover;
  top: 0;
  left: 0;
}
.container {
  width: 400px;
  height: 172px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto auto auto 12%;
}
.title {
  width: 100%;
  height: 48px;
  font-size: 34px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 48px;
  margin-bottom: 14px;
}
.describe {
  width: 100%;
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
  cursor: pointer;
}
.button:hover {
  background: rgba(0, 139, 243, 0.7);
}
.button-text {
  width: 100%;
  height: 24px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 46px;
  text-align: center;
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
  z-index: 10;
}
.underline > div {
  width: 20px;
  height: 4px;
  margin-right: 12px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  opacity: 0.25;
  float: left;
  cursor: pointer;
}
div.underline-1 {
  opacity: 1;
}
</style>