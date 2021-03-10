<template>
  <div class="wrap">
    <div class="top">
      <div class="title">{{$t("congTuCloud.page4.title")}}</div>
      <div class="describe">{{$t("congTuCloud.page4.describe")}}</div>
    </div>
    <div class="container">
      <div class="container-top">
        <div class="options" ref="options" @click="handlerClickOption($event)">
          <div class="option-1" index="0" ref="option1">{{$t("congTuCloud.page4.options[0]")}}</div>
          <div class="option-2" index="1" ref="option2">{{$t("congTuCloud.page4.options[1]")}}</div>
          <div class="option-3" index="2" ref="option3">{{$t("congTuCloud.page4.options[2]")}}</div>
          <div class="option-4" index="3" ref="option4">{{$t("congTuCloud.page4.options[3]")}}</div>
        </div>
        <div class="underline" ref="underline"></div>
      </div>
      <div class="dividing-line"></div>
      <div class="container-bottom">
        <div class="rotation-chart">
          <div class="background-icon"></div>
          <div class="chart-1" ref="chart1">
            <div class="chart-title">{{$t("congTuCloud.page4.chart1.title")}}</div>
            <div class="chart-col">
              <ul class="col-1">
                <li>{{$t("congTuCloud.page4.chart1.col1[0]")}}</li>
                <li>{{$t("congTuCloud.page4.chart1.col1[1]")}}</li>
                <li>{{$t("congTuCloud.page4.chart1.col1[2]")}}</li>
              </ul>
              <ul class="col-2">
                <li>{{$t("congTuCloud.page4.chart1.col2[0]")}}</li>
                <li>{{$t("congTuCloud.page4.chart1.col2[1]")}}</li>
                <li>{{$t("congTuCloud.page4.chart1.col2[2]")}}</li>
              </ul>
              <ul class="col-3">
                <li>{{$t("congTuCloud.page4.chart1.col3[0]")}}</li>
                <li>{{$t("congTuCloud.page4.chart1.col3[1]")}}</li>
              </ul>
            </div>
          </div>
          <div class="chart-2" ref="chart2">
            <div class="chart-title">{{$t("congTuCloud.page4.chart2.title")}}</div>
            <div class="chart-col">
              <ul class="col-1">
                <li>{{$t("congTuCloud.page4.chart2.col1[0]")}}</li>
                <li>{{$t("congTuCloud.page4.chart2.col1[1]")}}</li>
                <li>{{$t("congTuCloud.page4.chart2.col1[2]")}}</li>
              </ul>
              <ul class="col-2">
                <li>{{$t("congTuCloud.page4.chart2.col2[0]")}}</li>
                <li>{{$t("congTuCloud.page4.chart2.col2[1]")}}</li>
                <li>{{$t("congTuCloud.page4.chart2.col2[2]")}}</li>
              </ul>
              <ul class="col-3">
                <li>{{$t("congTuCloud.page4.chart2.col3[0]")}}</li>
                <li>{{$t("congTuCloud.page4.chart2.col3[1]")}}</li>
              </ul>
            </div>
          </div>
          <div class="chart-3" ref="chart3">
            <div class="chart-title">{{$t("congTuCloud.page4.chart3.title")}}</div>
            <div class="chart-col">
              <ul class="col-1">
                <li>{{$t("congTuCloud.page4.chart3.col1[0]")}}</li>
                <li>{{$t("congTuCloud.page4.chart3.col1[1]")}}</li>
              </ul>
              <ul class="col-2">
                <li>{{$t("congTuCloud.page4.chart3.col2[0]")}}</li>
                <li>{{$t("congTuCloud.page4.chart3.col2[1]")}}</li>
              </ul>
              <ul class="col-3">
                <li>{{$t("congTuCloud.page4.chart3.col3[0]")}}</li>
                <li>{{$t("congTuCloud.page4.chart3.col3[1]")}}</li>
              </ul>
            </div>
          </div>
          <div class="chart-4" ref="chart4">
            <div class="chart-title">{{$t("congTuCloud.page4.chart4.title")}}</div>
            <div class="chart-col">
              <ul class="col-1">
                <li>{{$t("congTuCloud.page4.chart4.col1[0]")}}</li>
                <li>{{$t("congTuCloud.page4.chart4.col1[1]")}}</li>
                <li>{{$t("congTuCloud.page4.chart4.col1[2]")}}</li>
              </ul>
              <ul class="col-2">
                <li>{{$t("congTuCloud.page4.chart4.col2[0]")}}</li>
                <li>{{$t("congTuCloud.page4.chart4.col2[1]")}}</li>
                <li>{{$t("congTuCloud.page4.chart4.col2[2]")}}</li>
              </ul>
              <ul class="col-3">
                <li>{{$t("congTuCloud.page4.chart4.col3[0]")}}</li>
                <li>{{$t("congTuCloud.page4.chart4.col3[1]")}}</li>
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
  methods: {
    handlerClickOption: function (e) {
      let options = [
        this.$refs.option1,
        this.$refs.option2,
        this.$refs.option3,
        this.$refs.option4,
      ];
      let charts = [
        this.$refs.chart1,
        this.$refs.chart2,
        this.$refs.chart3,
        this.$refs.chart4,
      ];
      let indexMap = {
        index0: "0",
        index1: "1",
        index2: "2",
        index3: "3",
      };
      let optionIndex = e.target.getAttribute("index");
      let underline = this.$refs.underline;
      let width, left;
      switch (optionIndex) {
        case indexMap.index0: {
          width = "92px";
          left = "347px";
          break;
        }
        case indexMap.index1: {
          width = "162px";
          left = "539px";
          break;
        }
        case indexMap.index2: {
          width = "74px";
          left = "799px";
          break;
        }
        case indexMap.index3: {
          width = "45px";
          left = "966px";
          break;
        }
        default: {
          return;
        }
      }
      this.changeUnderlineWidthLeft(underline, width, left);
      this.changeItemcolor(options, optionIndex);
      this.changeRotationChart(charts, optionIndex, indexMap);
    },
    changeItemcolor: function (options, index) {
      for (let i = 0; i < options.length; i++) {
        options[i].style.color = "rgba(255, 255, 255, 0.9)";
      }
      options[index].style.color = "rgba(176, 209, 255, 1)";
    },
    changeUnderlineWidthLeft: function (underline, width, left) {
      underline.style.width = width;
      underline.style.left = left;
    },
    changeRotationChart: function (charts, optionIndex, indexMap) {
      for (let i = 0; i < charts.length; i++) {
        charts[i].style.display = "none";
      }
      let index = parseInt(optionIndex);
      let preIndex, nextIndex;

      index - 1 < 0 ? (preIndex = charts.length - 1) : (preIndex = index - 1);
      index + 1 >= charts.length ? (nextIndex = 0) : (nextIndex = index + 1);

      // 排第1的
      charts[preIndex].style.display = "block";
      charts[preIndex].style.background = "rgba(0, 139, 243, 1)";
      charts[preIndex].style.opacity = "0.4";
      charts[preIndex].style.right = "auto";
      charts[preIndex].style.left = "-377px";

      //要居中的 （排第2的）
      charts[index].style.display = "block";
      charts[index].style.background = "rgba(0, 139, 243, 0)";
      charts[index].style.opacity = "1";
      charts[index].style.right = "0";
      charts[index].style.left = "0";

      // 排第3的
      charts[nextIndex].style.display = "block";
      charts[nextIndex].style.background = "rgba(0, 139, 243, 1)";
      charts[nextIndex].style.opacity = "0.4";
      charts[nextIndex].style.right = "-377px";
      charts[nextIndex].style.left = "auto";
    },
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
  width: 100%;
  height: 84px;
  margin: 0 auto;
  padding-top: 80px;
  box-sizing: content-box;
}
.title {
  width: 700px;
  height: 48px;
  font-size: 34px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 48px;
  text-align: center;
  margin: 0 auto 12px;
}
.describe {
  width: 1000px;
  height: 24px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  line-height: 24px;
  text-align: center;
  margin: 0 auto;
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
  width: 670px;
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
  cursor: pointer;
}
.options div:nth-child(2) {
  // width: 162px;
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
  left: 539px;
}
.dividing-line {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 1);
  opacity: 0.12;
  margin-top: 16px;
}
.rotation-chart {
  width: 100%;
  height: 340px;
  margin-top: 49px;
  position: relative;
}
.background-icon {
  width: 680px;
  height: 340px;
  border-radius: 4px;
  position: absolute;

  display: block;
  background: url(../../../assets/imgs/page4/编组-14@1x.png) no-repeat center;
  background-size: cover;
  opacity: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.chart-1 {
  width: 680px;
  height: 340px;
  border-radius: 4px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;

  display: block;
  background: rgba(0, 139, 243, 1);
  opacity: 0.4;
  right: auto;
  left: -377px;
}
.chart-2 {
  width: 680px;
  height: 340px;
  border-radius: 4px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;

  display: block;
  background: rgba(0, 139, 243, 0);
  opacity: 1;
  right: 0;
  left: 0;
}
.chart-3 {
  width: 680px;
  height: 340px;
  border-radius: 4px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;

  display: block;
  background: rgba(0, 139, 243, 1);
  opacity: 0.4;
  right: -377px;
  left: auto;
}
.chart-4 {
  width: 680px;
  height: 340px;
  border-radius: 4px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;

  display: none;
  background: rgba(0, 139, 243, 1);
  opacity: 0.4;
  right: -377px;
  left: auto;
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
.chart-col {
  width: 564px;
  height: 98px;
  margin: 16px auto 0;
  position: relative;
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
</style>