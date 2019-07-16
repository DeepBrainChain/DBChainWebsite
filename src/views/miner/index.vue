<template>
  <div class="gpu">
    <div class="box">
      <el-container>
        <el-aside class="left-wrap">
          <navi :menus="menus"></navi>
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
    name: "miner",
    data() {
      return {
        menus: [
          {
            title: this.$t('gpu.myWallet'),
            to:  '/miner/myWallet',
            index: 0,
            iconClass: 'iconwallet'
          },
          {
            title: this.$t('gpu.myMachine'),
            to: '/miner/myMachine',
            index: 1,
            iconClass: 'iconmachine'
          },
          {
            title: this.$t('gpu.machineList'),
            to: '/miner/list',
            index: 2,
            iconClass: 'iconlist'
          }
        ]
      }
    },
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
