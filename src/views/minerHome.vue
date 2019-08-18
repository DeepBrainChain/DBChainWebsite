<template>
  <div class="home">
    <el-row class="wrap1440 mb100">
      <el-col class="flex" :md="12">
        <div class="content">
          <div class="text">
            {{$t('home.intr_1')}}
          </div>
          <div class="btn-wrap mt60">
            <el-button class="lg fs18 long" type="primary" @click="pushToWallet">
              {{$t('home.startMiner')}}<i class="el-icon-back r"></i>
            </el-button>
          </div>
          <div class="btn-wrap flex mt40">
            <!--<el-button class="white w200 lg fs18 transparent">
              <svg class="icon-left icon vm" width="16px" height="16.00px" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M950.857143 512q0 143.428571-83.714286 258T650.857143 928.571429q-15.428571 2.857143-22.571429-4t-7.142857-17.142858v-120.571428q0-55.428571-29.714286-81.142857 32.571429-3.428571 58.571429-10.285715t53.714286-22.285714 46.285714-38 30.285714-60T792 489.142857q0-69.142857-45.142857-117.714286 21.142857-52-4.571429-116.571428-16-5.142857-46.285714 6.285714t-52.571429 25.142857l-21.714285 13.714286q-53.142857-14.857143-109.714286-14.857143t-109.714286 14.857143q-9.142857-6.285714-24.285714-15.428571T330.285714 262.571429 281.142857 254.857143q-25.142857 64.571429-4 116.571428-45.142857 48.571429-45.142857 117.714286 0 48.571429 11.714286 85.714286t30 60 46 38.285714 53.714285 22.285714 58.571429 10.285715q-22.857143 20.571429-28 58.857143-12 5.714286-25.714286 8.571428t-32.571428 2.857143-37.428572-12.285714T276.571429 728q-10.857143-18.285714-27.714286-29.714286t-28.285714-13.714285l-11.428572-1.714286q-12 0-16.571428 2.571428t-2.857143 6.571429 5.142857 8 7.428571 6.857143l4 2.857143q12.571429 5.714286 24.857143 21.714285t18 29.142858l5.714286 13.142857q7.428571 21.714286 25.142857 35.142857t38.285714 17.142857 39.714286 4 31.714286-2l13.142857-2.285714q0 21.714286 0.285714 50.857143t0.285714 30.857142q0 10.285714-7.428571 17.142858t-22.857143 4q-132.571429-44-216.285714-158.571429T73.142857 512q0-119.428571 58.857143-220.285714T291.714286 132 512 73.142857t220.285714 58.857143T892 291.714286 950.857143 512z"
                  fill="#ffffff"/>
              </svg>
              <span class="vm">{{$t('home.github')}}</span>
            </el-button>
            <el-button class="white w200 lg fs18 transparent">
              <svg class="icon-left icon vm" width="16px" height="16.00px" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M512 896C299.922286 896 128 724.077714 128 512S299.922286 128 512 128 896 299.922286 896 512 724.077714 896 512 896z m0-36.571429a347.428571 347.428571 0 1 0 0-694.857142 347.428571 347.428571 0 0 0 0 694.857142z m155.428571-331.593142l-219.428571 126.683428a18.285714 18.285714 0 0 1-27.428571-15.835428v-253.366858a18.285714 18.285714 0 0 1 27.428571-15.835428l219.428571 126.683428a18.285714 18.285714 0 0 1 0 31.670858z"
                  fill="#ffffff"/>
              </svg>
              <span class="vm">{{$t('home.video')}}</span>
            </el-button>-->
          </div>
        </div>
      </el-col>
      <el-col class="center" :md="12">
        <img src="~@/assets/imgs/building_2@1x.png" alt="">
      </el-col>
    </el-row>
    <!--<el-row class="wrap1440 pb120">
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
    <div class="pt80 pb80 bg-white">
      <el-row class="wrap1440">
        <el-col class="flex" :sm="12">
          <div class="gpu-info">
            <img src="~@/assets/imgs/gpu_img_3.png" alt="">
            <div class="text">
              <p>
                {{$t('home.intr_7')}}
              </p>
            </div>
          </div>
        </el-col>
        <el-col class="flex" :sm="12">
          <div class="gpu-info">
            <img src="~@/assets/imgs/gpu_img_4.png" alt="">
            <div class="text">
              <p>
                {{$t('home.intr_8')}}
              </p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  export default {
    name: 'home',
    data() {
      return {}
    },
    methods: {
      pushToWallet() {
        this.$router.push('/miner/myWallet')
      }
    }
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
