<template>
  <div class="wrap">
    <div class="container">
      <div class="left">{{ $t("congTuCloud.page6.iconText") }}</div>
      <div class="right">
        <div class="content">
          <div class="title">{{ $t("congTuCloud.page6.title") }}</div>
          <div class="text">{{ $t("congTuCloud.page6.describe") }}</div>
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
.wrap {
  width: 100%;
  height: 370px;
  background: #f0f2f5;
  position: relative;
}
.container {
  width: 1000px;
  height: 210px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.container .left {
  width: 500px;
  height: 100%;
  background: url(../../../assets/imgs/page6/编组-38@1x.png) no-repeat center;
  background-size: cover;
  float: left;
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  line-height: 210px;
  letter-spacing: 3px;
}
.container .right {
  width: 500px;
  height: 100%;
  background: rgba(245, 246, 249, 1);
  float: left;
  position: relative;
}
.content {
  width: 384px;
  height: 91px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.title {
  width: 100%;
  height: 28px;
  font-size: 20px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(64, 68, 89, 1);
  line-height: 28px;
  text-align: center;
  margin-bottom: 11px;
}
.text {
  width: 100%;
  height: 52px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 26px;
}
</style>