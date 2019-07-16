<template>
  <div class="navi">
    <ul class="btn-list">
      <li v-for="item in menus">
        <el-button class="lg naviBtn" :class="{active: curNaviIndex === item.index}" v-on:click="pushTo(item)">
          <i class="iconfont" :class="item.iconClass"></i>
          <span>{{item.title}}</span>
        </el-button>
      </li>
      <!--<li>
        <el-button class="lg naviBtn" :class="{active: curNaviIndex === '/gpu/myMachineUnlock'}" v-on:click="pushTo('/gpu/myMachineUnlock')">
          <i class="iconfont iconmachine"></i>
          <span>我的机器</span>
        </el-button>
      </li>
      <li>
        <el-button class="lg naviBtn" :class="{active: curNaviIndex === '/gpu/list'}" v-on:click="pushTo('/gpu/list')">
          <i class="iconfont iconlist"></i>
          <span>机器列表</span>
        </el-button>
      </li>-->
    </ul>
  </div>
</template>

<script>
  export default {
    name: "curNaviIndex",
    props: {
      menus: Array
    },
    created () {
      const curRoute = this.$route.matched.find(item => item.path === this.$route.path)
      this.curNaviIndex = curRoute.meta.menuIndex
    },
    data() {
      // const isMiner = this.$route.path.indexOf('miner') !== -1
      return {
        curNaviIndex: -1,
      }
    },
    methods: {
      pushTo(item) {
        this.$router.push(item.to)
        this.curNaviIndex = item.index
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
