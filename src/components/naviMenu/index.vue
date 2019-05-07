<template>
  <div class="navi">
    <ul class="btn-list">
      <li>
        <el-button class="lg naviBtn active" v-on:click="pushTo('/gpu/myWallet')">
          <i class="iconfont iconwallet"></i>
          <span>我的钱包</span>
        </el-button>
      </li>
      <li>
        <el-button class="lg naviBtn" v-on:click="pushTo('/gpu/list')">
          <i class="iconfont iconmachine"></i>
          <span>我的机器</span>
        </el-button>
      </li>
      <li>
        <el-button class="lg naviBtn" v-on:click="pushTo('/gpu/machine')">
          <i class="iconfont iconlist"></i>
          <span>机器列表</span>
        </el-button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "index",
    created () {
    },
    methods: {
      pushTo(to) {
        this.$router.push(to)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/css/variables.scss";

  .btn-list {
    padding-top: 30px;
    li {
      margin-bottom: 40px;
      text-align: center;
      .naviBtn {
        width: 240px;
        color: $textColor_gray;
        border-color: $textColor_gray;
        &.active, &:hover {
          background-color: #008BF3;
          color: #fff;
          border-color: #008BF3;
        }
        i {
          margin-right: 20px;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
    }
  }
</style>
