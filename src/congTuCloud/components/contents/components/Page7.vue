<template>
  <div class="wrap">
    <div class="top">
      <div class="title">{{$t("congTuCloud.page7.title")}}</div>
      <div class="describe">{{$t("congTuCloud.page7.describe")}}</div>
    </div>
    <div class="container">
      <div class="university">
        <ul class="u-raw-1">
          <li class="u-icon-1"></li>
          <li class="u-icon-1"></li>
          <li class="u-icon-1"></li>
        </ul>
        <ul class="u-raw-2">
          <li class="u-icon-1"></li>
          <li class="u-icon-1"></li>
          <li class="u-icon-1"></li>
        </ul>
        <ul class="u-raw-3">
          <li class="u-icon-1"></li>
          <li class="u-icon-1"></li>
          <li class="u-icon-1"></li>
        </ul>
      </div>
      <div class="company">
        <ul class="com-raw-1">
          <li class="com-icon-1"></li>
          <li class="com-icon-2"></li>
          <li class="com-icon-3"></li>
          <li class="com-icon-4"></li>
        </ul>
        <ul class="com-raw-2">
          <li class="com-icon-5"></li>
          <li class="com-icon-6"></li>
          <li class="com-icon-7"></li>
          <li class="com-icon-13"></li>
          <li class="com-icon-14"></li>
          <li class="com-icon-8"></li>
        </ul>
        <ul class="com-raw-3">
          <li class="com-icon-9"></li>
          <li class="com-icon-10"></li>
          <li class="com-icon-11"></li>
          <li class="com-icon-12"></li>
        </ul>
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
  height: 668px;
  background: rgba(243, 245, 249, 1);
}
.top {
  width: 100%;
  height: 78px;
  padding: 60px 0 40px;
  box-sizing: content-box;
}
.title {
  width: 100%;
  height: 48px;
  font-size: 34px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(27, 31, 51, 1);
  line-height: 48px;
  margin-bottom: 8px;
  text-align: center;
}
.describe {
  width: 100%;
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(155, 167, 178, 1);
  line-height: 22px;
  text-align: center;
}
.container {
  width: 1160px;
  margin: 0 auto;
}
ul {
  width: 100%;
  position: absolute;
}
li {
  position: absolute;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(155, 167, 178, 0.12);
}
.company {
  width: 100%;
  position: relative;
  margin: 0 auto;
}
.com-raw-2 {
  top: 150px;
}
.com-raw-3 {
  top: 300px;
}
.com-icon-1 {
  width: 241px;
  height: 91px;
  background: url(../../../assets/imgs/page7/com-1.png) no-repeat center;
  background-size: cover;
  top: 15px;
  left: 20px;
}
.com-icon-2 {
  width: 207px;
  height: 70px;
  background: url(../../../assets/imgs/page7/com-2.png) no-repeat center;
  background-size: cover;
  top: 20px;
  // left: 370px;
  left: 325px;
}
.com-icon-3 {
  width: 265px;
  height: 65px;
  background: url(../../../assets/imgs/page7/com-3.png) no-repeat center;
  background-size: cover;
  top: 25px;
  right: 20px;
}
.com-icon-4 {
  width: 209px;
  height: 111px;
  background: url(../../../assets/imgs/page7/com-4.png) no-repeat center;
  background-size: cover;
  top: 0;
  // left: 730px;
  left: 605px;
}
.com-icon-5 {
  width: 100px;
  height: 100px;
  background: url(../../../assets/imgs/page7/com-5.png) no-repeat center;
  background-size: cover;
  top: 0;
  left: 0px;
}
.com-icon-6 {
  width: 134px;
  height: 133px;
  background: url(../../../assets/imgs/page7/com-6.png) no-repeat center;
  background-size: cover;
  top: -10px;
  // left: 620px;
  left: 500px;
}
.com-icon-7 {
  width: 121px;
  height: 90px;
  background: url(../../../assets/imgs/page7/com-7.png) no-repeat center;
  background-size: cover;
  top: 0;
  // left: 470px;
  left: 366px;
}
.com-icon-13 {
  width: 245px;
  height: 83px;
  background: url(../../../assets/imgs/page7/com-13.png) no-repeat center;
  background-size: cover;
  top: 10px;
  // left: 170px;
  left: 110px;
}
.com-icon-14 {
  width: 265.5px;
  height: 91px;
  background: url(../../../assets/imgs/page7/com-14.png) no-repeat center;
  background-size: cover;
  top: 10px;
  // left: 800px;
  left: 647px;
}
.com-icon-8 {
  width: 236px;
  height: 61px;
  background: url(../../../assets/imgs/page7/com-8.png) no-repeat center;
  background-size: cover;
  top: 20px;
  right: 0;
}
.com-icon-9 {
  width: 285px;
  height: 111px;
  background: url(../../../assets/imgs/page7/com-9.png) no-repeat center;
  background-size: cover;
  top: 0;
  // left: 370px;
  left: 325px;
}
.com-icon-10 {
  width: 230px;
  height: 68px;
  background: url(../../../assets/imgs/page7/com-10.png) no-repeat center;
  background-size: cover;
  top: 10px;
  left: 668px;
}
.com-icon-11 {
  width: 245px;
  height: 43.5px;
  background: url(../../../assets/imgs/page7/com-11.png) no-repeat center;
  background-size: cover;
  top: 25px;
  left: 20px;
}
.com-icon-12 {
  width: 171px;
  height: 75px;
  background: url(../../../assets/imgs/page7/com-12.png) no-repeat center;
  background-size: cover;
  top: 0;
  right: 25px;
}
</style>