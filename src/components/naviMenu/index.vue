<template>
  <div class="navi">
    <ul class="btn-list">
      <li v-for="item in menus">
        <el-button
          class="lg naviBtn"
          :class="{active: index === item.index}"
          v-on:click="pushTo(item)"
        >
          <i class="iconfont" :class="item.iconClass"></i>
          <span>{{item.title}}</span>
        </el-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "naviMenu",
  props: {
    menus: Array,
    index: Number
  },
  data() {
    return {};
  },
  methods: {
    pushTo(item) {
      this.$router.push(item.to);
    }
  }
};
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
      &.active,
      &:hover {
        background-color: #008bf3; ////dbchain:#008BF3, yousanai:rgb(243, 186, 0),aionego:#c5c325,deepshare:rgb(25, 93,145)
        color: #fff;
        border-color: #008bf3; ////dbchain:#008BF3, yousanai:rgb(243, 186, 0);aionego:#b4b645,deepshare:rgb(25, 93,145)
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
