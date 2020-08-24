<template>
  <div class="header">
    <div class="mask"></div>
    <div class="wrap">
      <div class="logo"></div>
      <div class="container">
        <ul class="nav">
          <li>{{$t("congTuCloud.header.home")}}</li>
          <li>{{$t("congTuCloud.header.rentingGPU")}}</li>
          <li>{{$t("congTuCloud.header.help")}}</li>
        </ul>
        <div class="underline"></div>
        <div class="dividing-line"></div>
        <div class="lang">
          <div class="lang-icon"></div>
          <div class="lang-option">{{$t("congTuCloud.header.cn")}}</div>
          <div class="triangle-icon"></div>
        </div>
        <div class="button">
          <div class="button-text">{{$t("congTuCloud.header.login")}}</div>
        </div>
      </div>
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
.header {
  width: 100%;
  height: 66px;
  position: relative;
}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(6, 23, 101, 1);
  box-shadow: 0px 2px 10px 0px rgba(102, 102, 102, 0.12);
  opacity: 0.3;
  position: absolute;
}
.wrap {
  width: 100%;
  height: 100%;
  position: absolute;
}
.logo {
  width: 36px;
  height: 36px;
  background: url(../../assets/imgs/header/WechatIMG19@0x.svg) no-repeat center;
  position: absolute;
  top: 15px;
  left: 83px;
  cursor: pointer;
}
.container {
  width: 644px;
  height: 100%;
  position: absolute;
  right: 96px;
}
.nav {
  width: 310px;
  height: 22px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto auto auto 0;
}
.nav > li {
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  line-height: 22px;
  float: left;
  margin-right: 60px;
  cursor: pointer;
}
li:nth-child(1) {
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.underline {
  width: 28px;
  height: 3px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  position: absolute;
  top: 52px;
  left: 2px;
}
.dividing-line {
  width: 1px;
  height: 30px;
  background: rgba(216, 216, 216, 1);
  opacity: 0.3;
  position: absolute;
  top: 18px;
  left: 310px;
}
.lang {
  width: 104px;
  position: absolute;
  top: 22px;
  left: 361px;
  cursor: pointer;
}
.lang > div {
  float: left;
}
.lang-icon {
  width: 16.5px;
  height: 22px;
  margin-right: 8.5px;
  background: url(../../assets/imgs/header/lang6@0x.svg) no-repeat center;
}
.lang-option {
  width: 64px;
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  line-height: 22px;
  margin-right: 6px;
}
.triangle-icon {
  width: 9px;
  height: 6px;
  margin-top: 10px;
  background: url(../../assets/imgs/header/Triangle8787@0x.svg) no-repeat center;
}
.button {
  width: 128px;
  height: 36px;
  background: rgba(0, 139, 243, 1);
  border-radius: 4px;
  position: absolute;
  top: 15px;
  right: 0;
  cursor: pointer;
}
.button-text {
  width: 80px;
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  line-height: 22px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto auto;
}
</style>