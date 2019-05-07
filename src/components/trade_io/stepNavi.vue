<template>
    <div class="step">
      <div class="item active">
        <span class="cycle">1</span>
        <div class="step-name">
          购买金额
        </div>
        <div class="icon-wrap">
          <i class="el-icon-caret-top"></i>
        </div>
      </div>
      <div class="line"></div>
      <div class="item">
        <span class="cycle">1</span>
        <div class="step-name">
          购买金额
        </div>
        <div class="icon-wrap">
          <i class="el-icon-caret-top"></i>
        </div>
      </div>
      <div class="line"></div>
      <div class="item">
        <span class="cycle">1</span>
        <div class="step-name">
          购买金额
        </div>
        <div class="icon-wrap">
          <i class="el-icon-caret-top"></i>
        </div>
      </div>
      <div class="line"></div>
      <div class="item">
        <span class="cycle">1</span>
        <div class="step-name">
          购买金额
        </div>
        <div class="icon-wrap">
          <i class="el-icon-caret-top"></i>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "stepNavi"
    }
</script>

<style lang="scss" scoped>
  @import "~@/assets/css/variables.scss";

  .step {
    display: flex;
    justify-content: space-around;
    padding: 0 140px;
    border-bottom: 1px solid #E1E6EC;
  }
  .item {
    text-align: center;
    .cycle {
      display: inline-block;
      width: 30px;
      height: 30px;
      background-color: #E1E6EC;
      border-radius: 50%;
      text-align: center;
      line-height: 30px;
      font-size: 20px;
      color: #8B9BAD;
    }
    .step-name{
      padding-top: 8px;
      font-size: 14px;
      color: #6E8299;
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
        color: #E1E6EC;
      }
    }
  }
  .line {
    width: 198px;
    height: 1px;
    margin-top: 15px;
    background-color: #C6D0E2;
  }

</style>
