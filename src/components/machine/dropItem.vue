<template>
    <div class="drop-item">
      <h3>国家</h3>
      <el-dropdown trigger="click">
        <el-button size="mini" plain>
          <span class="drop-title">国家</span><i class="el-icon-caret-bottom"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>第一项</el-dropdown-item>
          <el-dropdown-item>第二项</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: "dropItem"
    }
</script>

<style lang="scss" scoped>
  .drop-item {
    text-align: left;
    width: 155px;
    h3 {
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 16px;
      color: #666;
    }
    .drop-title {
      font-size: 14px;
    }
  }
</style>
