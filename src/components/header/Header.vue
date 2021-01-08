<template>
  <div class="header">
    <div class="mask"></div>
    <div class="wrap content">
      <div class="logo"></div>
      <div class="nav">
        <div class="underline" ref="underline"></div>
        <a class="item" index="0" ref="item0">首页</a>
        <a class="item" index="1" ref="item1">出租GPU</a>
        <a class="item" index="2" ref="item2">我的机器</a>
        <a class="item" index="4" ref="item4">帮助文档</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
    handlerClickNav: function (e) {
      let items = [
        this.$refs.item0,
        this.$refs.item1,
        this.$refs.item2,
        this.$refs.item3,
        this.$refs.item4,
      ];

      let itemIndex = parseInt(e.target.getAttribute("index"));
      let width, left; //没有实际作用，仅用来做索引位置参考
      if (itemIndex == 0) {
        width = "32px";
        left = "0px";
      } else if (itemIndex == 1) {
        width = "65px";
        left = "92px";
      } else if (itemIndex == 2) {
        width = "65px";
        left = "218px";
      } else if (itemIndex == 3) {
        width = "65px";
        left = "343px";
      } else if (itemIndex == 4) {
        width = "65px";
        left = "467px";
      } else {
        return;
      }
      this.changeItemcolor(items, itemIndex);
    },
    changeItemcolor: function (items, index) {
      for (let i = 0; i < items.length; i++) {
        items[i].style.color = "rgba(255, 255, 255, .6)";
      }
      items[index].style.color = "rgba(255, 255, 255, 1)";
    },
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
  position: relative;
}
.logo {
  display: block;
  width: 36px;
  height: 36px;
  background: url(../../assets/imgs/header/logo2.png) no-repeat center;
  background-size: cover;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 83px;
  margin: auto 0;
}
.logo:hover {
  cursor: pointer;
}
.nav {
  width: 535px;
  height: 22px;
  position: absolute;
  top: 0;
  right: 150px;
  bottom: 0;
  left: auto;
  margin: auto 0;
}
.item {
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  line-height: 22px;
  float: left;
  margin-right: 60px;
}
.item:hover {
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
.item:nth-child(2) {
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.item:last-child {
  margin: 0;
}
.underline {
  width: 32px;
  height: 3px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  position: absolute;
  top: 32px;
  left: 0px;
}
</style>
