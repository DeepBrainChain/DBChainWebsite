<template>
  <div class="step">
    <div class="item" :class="{active: stepIndex >= 1}">
      <span class="cycle">1</span>
      <div class="step-name">钱包地址</div>
      <div class="icon-wrap">
        <i class="el-icon-caret-top"></i>
      </div>
    </div>
    <div class="line" :class="{active: stepIndex >= 2}"></div>
    <div class="item" :class="{active: stepIndex >= 2}">
      <span class="cycle">2</span>
      <div class="step-name">购买金额</div>
      <div class="icon-wrap">
        <i class="el-icon-caret-top"></i>
      </div>
    </div>
    <div class="line" :class="{active: stepIndex >= 3}"></div>
    <div class="item" :class="{active: stepIndex >= 3}">
      <span class="cycle">3</span>
      <div class="step-name">支付方式</div>
      <div class="icon-wrap">
        <i class="el-icon-caret-top"></i>
      </div>
    </div>
    <div class="line" :class="{active: stepIndex >= 4}"></div>
    <div class="item" :class="{active: stepIndex >= 4}">
      <span class="cycle">4</span>
      <div class="step-name">完成购买</div>
      <div class="icon-wrap">
        <i class="el-icon-caret-top"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "stepNavi",
  props: {
    stepIndex: Number
  },
  data() {
    return {
      naviSteps: [
        {
          title: ""
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";

.step {
  display: flex;
  justify-content: space-around;
  padding: 0 140px;
  border-bottom: 1px solid #e1e6ec;
}

.item {
  text-align: center;

  .cycle {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: #e1e6ec;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    font-size: 20px;
    color: #8b9bad;
  }

  .step-name {
    padding-top: 8px;
    font-size: 14px;
    color: #6e8299;
  }

  .icon-wrap {
    margin-top: 5px;
    margin-bottom: -6px;

    i {
      color: transparent;
    }
  }

  &.active {
    .cycle {
      background-color: $primaryColor;
      color: #fff;
    }

    .step-name {
      color: $primaryColor;
    }

    .icon-wrap i {
      color: #e1e6ec;
    }
  }
}

.line {
  width: 198px;
  height: 1px;
  margin-top: 15px;
  background-color: #c6d0e2;
  &.active {
    background-color: $primaryColor;
  }
}
</style>
