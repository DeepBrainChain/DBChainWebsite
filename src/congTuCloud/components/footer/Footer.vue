<template>
  <div class="wrap">
    <div class="container">
      <div class="col-1">
        <div class="title">{{$t("congTuCloud.footer.aboutUs")}}</div>
        <div class="text">{{$t("congTuCloud.footer.company")}}</div>
        <div class="text">{{$t("congTuCloud.footer.copyright")}}</div>
        <div class="text record">{{$t("congTuCloud.footer.record")}}</div>
      </div>
      <div class="col-2">
        <div class="title">{{$t("congTuCloud.footer.recruit")}}</div>
        <div class="text">{{$t("congTuCloud.footer.HREmail")}}</div>
      </div>
      <div class="col-3">
        <div class="title">{{$t("congTuCloud.footer.contactUs")}}</div>
        <div class="text">{{$t("congTuCloud.footer.comEmail")}}</div>
        <div class="text">{{$t("congTuCloud.footer.comWechat")}}</div>
      </div>
      <div class="col-4">
        <div class="QR-code"></div>
        <div class="text wechat">{{$t("congTuCloud.footer.wechat")}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 200px;
  background: rgba(255, 255, 255, 1);
  // background: red;
  // border: 1px solid red;
  position: relative;
}
.container {
  width: 1197px;
  height: 141px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.col-1 {
  width: 224px;
  float: left;
  margin-right: 200px;
}
.col-2 {
  width: 300px;
  float: left;
  margin-right: 56px;
}
.col-3 {
  width: 300px;
  float: left;
  margin-right: 23px;
}
.col-4 {
  width: 94px;
  float: left;
}
.title {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 900;
  color: rgba(71, 73, 90, 1);
  line-height: 22px;
  margin-bottom: 10px;
}
.text {
  width: 100%;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(109, 129, 152, 1);
  line-height: 20px;
  margin-bottom: 8px;
  text-align: left;
}
.record {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0;
}
.QR-code {
  width: 94px;
  height: 94px;
  background: url(../../assets/imgs/footer/QR-code.jpg) no-repeat center;
  background-size: cover;
  margin: 0 0 7px;
}
.wechat {
  text-align: center;
}
</style>
