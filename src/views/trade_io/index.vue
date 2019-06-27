<template>
  <div class="home wrap1440">
    <div class="tab">
      <a :class="{active: tabIndex === 0}" href="javascript:" @click="pushTo('home')">DBCTrade</a>
      <a :class="{active: tabIndex === 1}" href="javascript:" @click="pushTo('buy_1')">购买DBC</a>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "tradeHome",
    data() {
      return {

      }
    },
    computed: {
      tabIndex() {
        return this.$route.path === '/trade/home'? 0:1
      }
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

  .home {
    margin-bottom: 42px;
    padding: 40px 20px 100px;
    background-color: $boxBgColor;
  }

  .tab {
    display: flex;
    a {
      display: block;
      padding-bottom: 30px;
      border-bottom: 3px solid $boxBgColor;
      font-size: 18px;
      color: $textColor_gray;
      margin-right: 120px;
      &:last-child {
        margin-right: 0;
      }
      &.active {
        color: $primaryColor;
        border-bottom-color: $primaryColor;
      }
    }
  }

</style>
