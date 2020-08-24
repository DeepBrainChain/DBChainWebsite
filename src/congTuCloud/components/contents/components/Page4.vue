<template>
  <div class="wrap">
    <div class="top">
      <div class="title">支持主流数据集</div>
      <div class="describe">常用数据集无需上传，矩池云为用户提供了现成的主流深度学习数据集，供用户快速访问和使用。</div>
    </div>
    <div class="container">
      <div class="container-top">
        <div class="options">
          <div class="option-1">图像数据集</div>
          <div class="option-2">自然语言处理数据集</div>
          <div class="option-3">KAGGLE</div>
          <div class="option-4">天池</div>
        </div>
        <div class="underline"></div>
      </div>
      <div class="dividing-line"></div>
      <div class="container-bottom">
        <div class="rotation-chart">
          <div class="chart-1">
            <div class="chart-title">图像数据集</div>
            <div class="chart-col">
              <ul class="col-1">
                <li>dbpedia</li>
                <li>amazonreviews</li>
                <li>youtube8m</li>
              </ul>
              <ul class="col-2">
                <li>imdb-sentiments</li>
                <li>UCI-spambase</li>
                <li>stanford-question-answering</li>
              </ul>
              <ul class="col-3">
                <li>3D_Segmentation</li>
                <li>ImageNet2012</li>
              </ul>
            </div>
          </div>
          <div class="chart-2">
            <div class="chart-title">自然语言处理数据集</div>
            <div class="chart-col">
              <ul class="col-1">
                <li>dbpedia</li>
                <li>amazonreviews</li>
                <li>youtube8m</li>
              </ul>
              <ul class="col-2">
                <li>imdb-sentiments</li>
                <li>UCI-spambase</li>
                <li>stanford-question-answering</li>
              </ul>
              <ul class="col-3">
                <li>beethoven</li>
                <li>videos_and_music</li>
              </ul>
            </div>
          </div>
          <div class="chart-3">
            <div class="chart-title">KAGGLE</div>
            <div class="chart-col">
              <ul class="col-1">
                <li>MNIST</li>
                <li>VOC2012</li>
              </ul>
              <ul class="col-2">
                <li>imdb-sentiments</li>
                <li>UCI-spambase</li>
              </ul>
              <ul class="col-3">
                <li>beethoven</li>
                <li>videos_and_music</li>
              </ul>
            </div>
          </div>
          <div class="chart-4">
            <div class="chart-title">天池</div>
            <div class="chart-col">
              <ul class="col-1">
                <li>dbpedia</li>
                <li>amazonreviews</li>
                <li>youtube8m</li>
              </ul>
              <ul class="col-2">
                <li>imdb-sentiments</li>
                <li>UCI-spambase</li>
                <li>stanford-question-answering</li>
              </ul>
              <ul class="col-3">
                <li>beethoven</li>
                <li>videos_and_music</li>
              </ul>
            </div>
          </div>
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
  // width: 1366px;
  height: 720px;
  background: rgba(7, 26, 100, 1);
  position: relative;

  overflow: hidden;
}
.top {
  width: 602px;
  height: 84px;
  margin: 0 auto;
  padding-top: 80px;
  box-sizing: content-box;
}
.title {
  width: 238px;
  height: 48px;
  font-size: 34px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 48px;
  margin: 0 auto 12px;
}
.describe {
  width: 602px;
  height: 24px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  line-height: 24px;
}
.container {
  width: 100%;
  height: 432px;
  margin: 40px auto 0;
  position: relative;
}
.container-top,
.container-bottom {
  width: 1366px;
  height: auto;
  margin: 0 auto;
  position: relative;
}
.options {
  width: 662px;
  height: 26px;
  margin: 0 auto;
}
.options > div {
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  line-height: 26px;
  float: left;
  margin-right: 100px;
}
.options div:nth-child(2) {
  width: 162px;
  color: rgba(176, 209, 255, 1);
}
.options div:last-child {
  margin-right: 0;
}
.underline {
  width: 162px;
  height: 3px;
  background: rgba(0, 139, 243, 1);
  border-radius: 2px;
  position: absolute;
  top: 39px;
  left: 543px;
}
.dividing-line {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 1);
  opacity: 0.12;
  margin-top: 16px;
}
.rotation-chart {
  width: 1366px;
  height: 340px;
  margin-top: 49px;
  position: relative;
}
.chart-title {
  height: 26px;
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 26px;
  margin: 41px auto auto 40px;
}
ul {
  position: absolute;
}
ul:nth-child(1) {
  left: 0;
}
ul:nth-child(2) {
  width: 200px;
  left: 0;
  right: 0;
  margin: 0 auto;
}
ul:nth-child(3) {
  right: 0;
}
li {
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 22px;
  list-style-type: disc;
  margin-bottom: 16px;
}
.chart-1 {
  width: 680px;
  height: 340px;
  background: rgba(0, 139, 243, 1);
  border-radius: 4px;
  opacity: 0.4;
  position: absolute;
  left: -377px;
}

.chart-2 {
  width: 680px;
  height: 340px;
  background: url(../../../assets/imgs/page4/编组-14@1x.png) no-repeat center;
  background-size: cover;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.chart-col {
  width: 564px;
  height: 98px;
  margin: 16px auto 0;
  position: relative;
}
.chart-3 {
  width: 680px;
  height: 340px;
  background: rgba(0, 139, 243, 1);
  border-radius: 4px;
  opacity: 0.4;
  position: absolute;
  right: -377px;
}
.chart-4 {
  display: none;
  width: 680px;
  height: 340px;
  background: rgba(0, 139, 243, 1);
  border-radius: 4px;
  opacity: 0.4;
  position: absolute;
  right: -377px;
}
</style>