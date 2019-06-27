<template>
  <div class="home">
    <div class="wrap1440 center mb100">
      <img src="~@/assets/imgs/map.png" alt="">
    </div>
    <!--<el-row class="wrap1440 mt100 pb120">
      <el-col :md="6" :sm="12">
        <div class="gpu-data-content">
          <h3>全网GPU在线数</h3>
          <div class="cycle-data">
            84968
          </div>
        </div>
      </el-col>
      <el-col :md="6" :sm="12">
        <div class="gpu-data-content">
          <h3>全网DBC交易数</h3>
          <div class="cycle-data">
            84968
          </div>
        </div>
      </el-col>
      <el-col :md="6" :sm="12">
        <div class="gpu-data-content">
          <h3>全网GPU使用时长</h3>
          <div class="cycle-data">
            84968
          </div>
        </div>
      </el-col>
      <el-col :md="6" :sm="12">
        <div class="gpu-data-content">
          <h3>全网GPU交易次数</h3>
          <div class="cycle-data">
            84968
          </div>
        </div>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
  // @ is an alias to /src
  export default {
    name: 'home',
    data() {
      return {}
    },
    watch: {},
    components: {}
  }
</script>

<style lang="scss" scoped>
  .home {
    margin-top: 135px
  }

  .grid-content {
    height: 20px;
  }

  .bg-purple {
    background-color: crimson;
  }

  .text {
    font-size: 18px;
    line-height: 36px;
    color: #fff;
    font-weight: 400;
    text-align: left;
    p {
      margin: 0;
    }
  }

  .btn-wrap {
    &.flex {
      display: flex;
      justify-content: space-between;
    }
  }

  .vm {
    vertical-align: middle;
  }

  .icon-left {
    margin-right: 10px;
  }

  .w200 {
    width: 200px;
  }

  .content {
    width: 440px;
  }

  .flex {
    display: flex;
    justify-content: center;
  }

  .gpu-data-content {
    h3 {
      font-size: 18px;
      color: #fff;
      text-align: center;
      margin-top: 0;
      margin-bottom: 0;
      padding-bottom: 28px;
    }
    .cycle-data {
      width: 162px;
      height: 162px;
      margin: 0 auto;
      line-height: 162px;
      border: 1px solid #fff;
      border-radius: 50%;
      font-size: 18px;
      color: #fff;
      text-align: center;
    }
  }

  .gpu-info {
    width: 440px;
    img {
      display: block;
      width: 100%;
    }
    .text {
      padding-top: 40px;
      width: 100%;
      font-size: 18px;
      line-height: 36px;
      color: #70737d;
    }
  }

</style>
