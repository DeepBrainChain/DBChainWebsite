<template>
  <div class="wrap">
    <div class="title">{{$t("congTuCloud.page5.title")}}</div>
    <div class="container">
      <div class="item">
        <div id="icon-1"></div>
        <div id="text">{{$t("congTuCloud.page5.iconText[0]")}}</div>
      </div>
      <div class="item">
        <div id="icon-2"></div>
        <div id="text">{{$t("congTuCloud.page5.iconText[1]")}}</div>
      </div>
      <div class="item">
        <div id="icon-3"></div>
        <div id="text">{{$t("congTuCloud.page5.iconText[2]")}}</div>
      </div>
      <div class="item">
        <div id="icon-4"></div>
        <div id="text">{{$t("congTuCloud.page5.iconText[3]")}}</div>
      </div>
      <div class="item">
        <div id="icon-5"></div>
        <div id="text">{{$t("congTuCloud.page5.iconText[4]")}}</div>
      </div>
      <div class="item">
        <div id="icon-6"></div>
        <div id="text">{{$t("congTuCloud.page5.iconText[5]")}}</div>
      </div>
      <div class="item">
        <div id="icon-7"></div>
        <div id="text">{{$t("congTuCloud.page5.iconText[6]")}}</div>
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
.wrap {
  width: 100%;
  height: 678px;
  background: rgba(243, 245, 249, 1);
}
.title {
  width: 238px;
  height: 48px;
  font-size: 34px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(27, 31, 51, 1);
  line-height: 48px;
  margin: 0 auto;
  padding-top: 80px;
  padding-bottom: 50px;
}
.container {
  width: 1080px;
  height: 420px;
  margin: 50px auto 0;
}
.item {
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 10px 0px rgba(155, 167, 178, 0.12);
  border-radius: 8px;
  float: left;
  margin: 0 20px 20px 0;
}
.item:nth-child(5) {
  margin-right: 0;
}

#icon-1 {
  width: 65.6px;
  height: 77.13px;
  background: url(../../../assets/imgs/page5/Jupyter@1x.png) no-repeat center;
  background-size: cover;
  margin: 47px auto 25px;
}
#icon-2 {
  width: 80px;
  height: 80px;
  background: url(../../../assets/imgs/page5/PyCharm@1x.png) no-repeat center;
  background-size: cover;
  margin: 46px auto 24px;
}
#icon-3 {
  width: 86px;
  height: 69.46px;
  background: url(../../../assets/imgs/page5/Xshell@1x.png) no-repeat center;
  background-size: cover;
  margin: 51px auto 29px;
}
#icon-4 {
  width: 79.6px;
  height: 80px;
  background: url(../../../assets/imgs/page5/VS-Code@1x.png) no-repeat center;
  background-size: cover;
  margin: 46px auto 24px;
}
#icon-5 {
  width: 80px;
  height: 78.12px;
  background: url(../../../assets/imgs/page5/Spyder@1x.png) no-repeat center;
  background-size: cover;
  margin: 47px auto 24px;
}
#icon-6 {
  width: 82px;
  height: 82px;
  background: url(../../../assets/imgs/page5/PuTTY@1x.png) no-repeat center;
  background-size: cover;
  margin: 46px auto 22px;
}
#icon-7 {
  width: 88px;
  height: 77.16px;
  background: url(../../../assets/imgs/page5/VNC@1x.png) no-repeat center;
  background-size: cover;
  margin: 48px auto 24px;
}
#text {
  width: 100%;
  height: 24px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(42, 45, 64, 1);
  line-height: 24px;
  text-align: center;
}
</style>