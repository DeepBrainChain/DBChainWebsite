<template>
  <div class="wrap">
    <div class="top">
      <div class="title">{{ $t("congTuCloud.page7.title") }}</div>
      <div class="describe">{{ $t("congTuCloud.page7.describe") }}</div>
    </div>
    <div class="container">
      <div class="university"></div>

      <ul class="company">
        <!-- raw-1 -->
        <li class="com-icon-1"></li>
        <li class="com-icon-2"></li>
        <li class="com-icon-3"></li>
        <!-- <li class="com-icon-4"></li> -->
        <!-- <li class="com-icon-5"></li> -->

        <!-- raw-2 -->
        <li class="com-icon-6"></li>
        <!-- <li class="com-icon-7"></li> -->
        <li class="com-icon-8"></li>
        <li class="com-icon-9"></li>
        <li class="com-icon-10"></li>

        <!-- raw-3 -->
        <li class="com-icon-11"></li>
        <li class="com-icon-12"></li>
        <li class="com-icon-13"></li>
        <!-- 南加利福尼亚大学 -->
        <li class="com-icon-14"></li>
        <!-- 华中科技大学 -->
        <li class="com-icon-15"></li>

        <!-- raw-4 -->
        <!-- 东南大学 -->
        <li class="com-icon-16"></li>
        <!-- 哈尔滨工程大学 -->
        <li class="com-icon-17"></li>
        <!-- 武汉大学 -->
        <li class="com-icon-18"></li>
        <!-- 北京航空航天大学 -->
        <li class="com-icon-19"></li>
        <!-- 南京航空航天大学 -->
        <li class="com-icon-20"></li>

        <!-- raw-5 -->
        <!-- 西安交通大学 -->
        <li class="com-icon-21"></li>
        <!-- 南开大学 -->
        <li class="com-icon-22"></li>
        <!-- 吉林大学 -->
        <li class="com-icon-23"></li>
        <!-- 中国农业大学 -->
        <li class="com-icon-24"></li>
        <!-- 西安电子科技大学 -->
        <li class="com-icon-25"></li>
      </ul>
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
$logoHeight: 55px;

.wrap {
  width: 100%;
  height: 668px;
  background: rgba(243, 245, 249, 1);
}
.top {
  width: 100%;
  height: 78px;
  padding: 60px 0 0px;
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
  height: 430px;
  margin: 40px auto 60px;
}

li {
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(155, 167, 178, 0.12);
}
.company {
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
}

// raw-1
.com-icon-1 {
  width: 240px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-1.png) no-repeat center;
  background-size: cover;
}
.com-icon-2 {
  width: 220px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-2.png) no-repeat center;
  background-size: cover;
}
.com-icon-3 {
  width: 260px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-3.png) no-repeat center;
  background-size: cover;
}
.com-icon-4 {
  width: 320px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-4.png) no-repeat center;
  background-size: cover;
}
.com-icon-5 {
  width: 185px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-5.png) no-repeat center;
  background-size: cover;
}

// raw-2
.com-icon-6 {
  width: 165px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-6.png) no-repeat center;
  background-size: cover;
}
.com-icon-7 {
  width: 185px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-7.png) no-repeat center;
  background-size: cover;
}
.com-icon-8 {
  width: 115px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-8.png) no-repeat center;
  background-size: cover;
}
.com-icon-9 {
  width: 455px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-9.png) no-repeat center;
  background-size: cover;
}
.com-icon-10 {
  width: 420px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-10.png) no-repeat center;
  background-size: cover;
}

// raw-3
.com-icon-11 {
  width: 225px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-11.png) no-repeat center;
  background-size: cover;
}
.com-icon-12 {
  width: 345px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-12.png) no-repeat center;
  background-size: cover;
}
.com-icon-13 {
  width: 200px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-13.png) no-repeat center;
  background-size: cover;
}
.com-icon-14 {
  width: 260px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-14.png) no-repeat center;
  background-size: cover;
}
.com-icon-15 {
  width: 270px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-15.png) no-repeat center;
  background-size: cover;
}

// raw-4
.com-icon-16 {
  width: 185px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-16.png) no-repeat center;
  background-size: cover;
}
.com-icon-17 {
  width: 230px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-17.png) no-repeat center;
  background-size: cover;
}
.com-icon-18 {
  width: 175px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-18.png) no-repeat center;
  background-size: cover;
}
.com-icon-19 {
  width: 235px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-19.png) no-repeat center;
  background-size: cover;
}
.com-icon-20 {
  width: 220px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-20.png) no-repeat center;
  background-size: cover;
}

// raw-5
.com-icon-21 {
  width: 215px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-21.png) no-repeat center;
  background-size: cover;
}
.com-icon-22 {
  width: 235px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-22.png) no-repeat center;
  background-size: cover;
}
.com-icon-23 {
  width: 180px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-23.png) no-repeat center;
  background-size: cover;
}
.com-icon-24 {
  width: 185px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-24.png) no-repeat center;
  background-size: cover;
}
.com-icon-25 {
  width: 245px;
  height: $logoHeight;
  background: url(../../../assets/imgs/page7/com-25.png) no-repeat center;
  background-size: cover;
}
</style>