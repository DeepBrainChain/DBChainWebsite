<template>
    <div class="preview">
      <el-card class="box-card">
        <div style="padding: 10px 0" v-for="(item,index) in pathArray" :key="index">
          <router-link :to="{path: item.path}">{{item.name}}</router-link>
        </div>
      </el-card>
    </div>
</template>

<script>
    export default {
      name: "preview",
      data() {
        return {
          pathArray: [
            {
              name: '首页',
              path: '/home'
            },
            {
              name: '我的钱包-未登录',
              path: '/gpu/myWallet'
            },
            {
              name: '我的钱包-已解锁',
              path: '/gpu/myWalletUnlock'
            },
            {
              name: '我的机器-已解锁',
              path: '/gpu/myMachineUnlock'
            },
            {
              name: '机器列表',
              path: '/gpu/list'
            },
            {
              name: '创建钱包',
              path: '/createWallet'
            },
            {
              name: '打开钱包',
              path: 'openWallet'
            },
            {
              name: '交易-首页',
              path: '/trade/home'
            },
            {
              name: '交易-买1',
              path: '/trade/buy_1'
            },
            {
              name: '交易-买2',
              path: '/trade/buy_2'
            },
            {
              name: '交易-买3',
              path: '/trade/buy_3'
            }
          ]
        }
      },
      created() {

      }
    }
</script>

<style scoped>

</style>
