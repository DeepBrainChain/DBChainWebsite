<template>
  <div class="wrap">
    <div class="top">
      <div class="title">五大保障</div>
      <div class="describe">拥有多维度全方位的支持</div>
    </div>
    <div class="container">
      <div class="item-1 item">
        <div class="item-1_icon icon"></div>
        <div class="item-text">高性价比GPU资源</div>
      </div>
      <div class="item-2 item">
        <div class="item-2_icon icon"></div>
        <div class="item-text">高密度低延时</div>
      </div>
      <div class="item-3 item">
        <div class="item-3_icon icon"></div>
        <div class="item-text">在线编程调试</div>
      </div>
      <div class="item-4 item">
        <div class="item-4_icon icon"></div>
        <div class="item-text">丰富的训练数据支持</div>
      </div>
      <div class="item-5 item">
        <div class="item-5_icon icon"></div>
        <div class="item-text">安全稳定可靠</div>
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
  height: 460px;
  background: rgba(243, 245, 249, 1);
}
.top {
  width: 100%;
  height: 78px;
  padding: 60px 0 40px;
  box-sizing: content-box;
  margin: 0 auto;
}
.title {
  width: 500px;
  height: 48px;
  font-size: 34px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(27, 31, 51, 1);
  line-height: 48px;
  text-align: center;
  margin: 0 auto 8px;
}
.describe {
  width: 500px;
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(155, 167, 178, 1);
  line-height: 22px;
  text-align: center;
  margin: 0 auto;
}
.container {
  display: flex;
  width: 1160px;
  height: 210px;
  margin: 0 auto;
}
.item {
  width: 200px;
  height: 210px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 10px 0px rgba(155, 167, 178, 0.12);
  border-radius: 8px;
  margin-right: 40px;
}
.item:last-child {
  margin-right: 0px;
}
.icon {
  width: 62px;
  height: 61px;
  background: rgba(242, 248, 255, 1);
  margin: 48px auto 20px;
}
.item-1_icon {
  background: url(../../../assets/imgs/page2/GPU资源@1x.png) no-repeat center;
  background-size: cover;
}
.item-2_icon {
  background: url(../../../assets/imgs/page2/高速网盘@1x.png) no-repeat center;
  background-size: cover;
}
.item-3_icon {
  background: url(../../../assets/imgs/page2/在线编程@1x.png) no-repeat center;
  background-size: cover;
}
.item-4_icon {
  background: url(../../../assets/imgs/page2/数据支持@1x.png) no-repeat center;
  background-size: cover;
}
.item-5_icon {
  background: url(../../../assets/imgs/page2/安全稳定@1x.png) no-repeat center;
  background-size: cover;
}
.item-text {
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