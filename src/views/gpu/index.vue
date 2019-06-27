<template>
  <div class="gpu">
    <div class="box">
      <el-container>
        <el-aside class="left-wrap">
          <navi></navi>
        </el-aside>
        <el-main class="right-wrap">
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
  import Navi from '@/components/naviMenu'

  export default {
    name: "gpu",
    components: {
      Navi
    }
  }
</script>

<style lang="scss" scoped>
  .gpu {
    margin-bottom: 42px;
  }
  .right-wrap {
    margin-left: 20px;
  }
</style>
