<template>
  <div class="my-wallet">
    <div class="wallet-btns">
      <el-button
        type="primary"
        v-on:click="openCreateWallet('/createWallet')"
      >{{$t('mywallet_create')}}</el-button>
      <el-button type="primary" v-on:click="openWallet">{{$t('mywallet_open')}}</el-button>
    </div>
    <div class="center-box">
      <div plain>{{$t('mywallet_open_create')}}</div>
    </div>
    <div class="center-box">
      <div class="btn lg" plain>
        {{$t('mywallet_transfer_record')}}
        <br />
        {{$t('mywallet_display')}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getAccount } from "@/utlis";

export default {
  name: "myWallet",
  created() {
    this.initData();
  },
  methods: {
    ...mapActions(["getAccountState", "getTransferList"]),
    initData() {
      if (getAccount()) {
        this.$router.push("myWalletUnlock");
      }
    },
    openCreateWallet() {
      const type = this.$route.path.search("gpu") !== -1 ? "gpu" : "miner";
      this.$router.push(`/createWallet/${type}`);
    },
    openWallet() {
      this.getAccountState()
        .then(data => {
          this.$router.push("myWalletUnlock");
        })
        .catch(err => {
          const type = this.$route.path.search("gpu") !== -1 ? "gpu" : "miner";
          this.$router.push(`/openWallet/${type}`);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.wallet-btns {
  margin-bottom: 30px;
  text-align: left;
}

.center-box {
  padding: 55px 0;
  border: 1px solid #7a8ca1;
  border-radius: 2px;
  margin-bottom: 30px;
  text-align: center;

  .btn {
    line-height: 22px;
  }
}
</style>
