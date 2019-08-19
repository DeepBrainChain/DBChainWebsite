<template>
  <div class="my-wallet">
    <h3></h3>
    <div class="wallet-btns">
      <el-button type="primary" v-on:click="openCreateWallet('/createWallet')">{{$t('gpu.createWallet')}}</el-button>
      <el-button type="primary" v-on:click="openWallet">{{$t('gpu.openWallet')}}</el-button>
    </div>
    <div class="center-box">
      <el-button plain>{{$t('gpu.rentMachine')}}</el-button>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import {getAccount} from '@/utlis'

  export default {
    name: "myWallet",
    created() {
      console.log(this.$route)
      this.initData()
    },
    methods: {
      ...mapActions([
        'getAccountState',
        'getTransferList'
      ]),
      initData() {
        if(getAccount()) {
          this.$router.replace('myMachineUnlock')
        }
      },
      openCreateWallet() {
        const type = this.$route.path.search('gpu') !== -1 ? 'gpu' : 'miner'
        this.$router.push(`/createWallet/${type}`)
      },
      openWallet() {
        this.getAccountState().then(data => {
          this.$router.push('/gpu/myMachine_unlock')
        }).catch(err => {
          const type = this.$route.path.search('gpu') !== -1 ? 'gpu' : 'miner'
          this.$router.push(`/openWallet/${type}`)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wallet-btns {
    margin-bottom: 30px;
    text-align: left;
  }

  .center-box {
    padding: 55px 0;
    border: 1px solid #7A8CA1;
    border-radius: 2px;
    margin-bottom: 30px;
    text-align: center;

    .btn {
      line-height: 22px;
    }
  }
</style>
