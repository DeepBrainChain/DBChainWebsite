<template>
  <div class="wrap">
    <div class="mask"></div>
    <div class="container">
      <div class="icon-1"></div>
      <div class="icon-2"></div>
      <div class="icon-3"></div>
      <div class="icon-4"></div>
      <div class="icon-5"></div>
      <div class="icon-6"></div>
      <div class="icon-7"></div>
      <div class="icon-8"></div>
      <div class="icon-9"></div>
      <div class="icon-10"></div>
      <div class="icon-11"></div>
      <div class="icon-12"></div>
      <div class="text">
        <span class="text-1">{{$t("congTuCloud.page3.text[0]")}}&nbsp;</span>
        <span class="text-2">{{$t("congTuCloud.page3.text[1]")}}&nbsp;</span>
        <span class="text-3">{{$t("congTuCloud.page3.text[2]")}}</span>
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
  height: 525px;
  background-color: #f0f2f5;
  position: relative;
}
.mask {
  width: 100%;
  height: 525px;
}
.container {
  width: 1245px;
  height: 422px;
  //   background-color: chocolate;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.container > div {
  position: absolute;
}
.icon-1 {
  width: 240px;
  height: 45px;
  background: url(../../../assets/imgs/page3/YrvMKrWMh@1x.png) no-repeat center;
  background-size: cover;
  top: -4px;
  left: 0;
}
.icon-2 {
  width: 240px;
  height: 47px;
  background: url(../../../assets/imgs/page3/chainer_red_h@1x.png) no-repeat
    center;
  background-size: cover;
  top: -2px;
  left: 348px;
}
.icon-3 {
  width: 260px;
  height: 48px;
  background: url(../../../assets/imgs/page3/c694ec6e@1x.png) no-repeat center;
  background-size: cover;
  top: -2px;
  left: 697px;
}
.icon-4 {
  width: 180px;
  height: 52px;
  background: url(../../../assets/imgs/page3/og_image@1x.png) no-repeat center;
  background-size: cover;
  top: 0;
  right: 0;
}
.icon-5 {
  width: 180px;
  height: 62px;
  background: url(../../../assets/imgs/page3/mxnet@1x.png) no-repeat center;
  background-size: cover;
  top: 115px;
  right: 0;
}
.icon-6 {
  width: 186px;
  height: 57px;
  background: url(../../../assets/imgs/page3/logo@1x.png) no-repeat center;
  background-size: cover;
  top: 238px;
  right: 3px;
}
.icon-7 {
  width: 160px;
  height: 51px;
  background: url(../../../assets/imgs/page3/u29@1x.png) no-repeat center;
  background-size: cover;
  top: 360px;
  right: 10px;
}
.icon-8 {
  width: 94px;
  height: 76px;
  background: url(../../../assets/imgs/page3/mindspor@1x.png) no-repeat center;
  background-size: cover;
  top: 348px;
  left: 780px;
}
.icon-9 {
  width: 240px;
  height: 58px;
  background: url(../../../assets/imgs/page3/CGxW9@1x.png) no-repeat center;
  background-size: cover;
  top: 357px;
  left: 348px;
}
.icon-10 {
  width: 110px;
  height: 74px;
  background: url(../../../assets/imgs/page3/Julia_pro@1x.png) no-repeat center;
  background-size: cover;
  bottom: 0;
  left: 65px;
}
.icon-11 {
  width: 178px;
  height: 62px;
  background: url(../../../assets/imgs/page3/天元@1x.png) no-repeat center;
  background-size: cover;
  top: 235px;
  left: 31px;
}
.icon-12 {
  width: 210px;
  height: 52px;
  background: url(../../../assets/imgs/page3/Pytorch@1x.png) no-repeat center;
  background-size: cover;
  top: 120px;
  left: 15px;
}
.text {
  width: 354px;
  height: 48px;
  font-size: 34px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(32, 52, 89, 1);
  line-height: 48px;
  top: 182px;
  left: 454px;
}
.text-1 {
  width: 68px;
}
.text-2 {
  width: 76px;
  height: 44px;
  font-size: 38px;
  font-family: FZLTZCHK--GBK1-0, FZLTZCHK--GBK1;
  font-weight: normal;
  color: rgba(0, 139, 243, 1);
  line-height: 44px;
  position: relative;
  top: 2px;
}
.text-3 {
  width: 170px;
}
</style>