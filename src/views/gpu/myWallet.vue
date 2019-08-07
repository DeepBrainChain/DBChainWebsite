<template>
  <div class="my-wallet">
    <div class="wallet-btns">
      <el-button type="primary" v-on:click="openCreateWallet('/createWallet')">创建钱包账号</el-button>
      <el-button type="primary" v-on:click="openWallet">打开钱包账号</el-button>
    </div>
    <div class="center-box">
      <el-button plain>打开或者创建钱包租用机器</el-button>
    </div>
    <div class="center-box">
      <el-button class="btn lg" plain>
        转账记录
        <br />打开或者创建钱包查看转账记录
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "myWallet",
  created() {},
  methods: {
    ...mapActions(["getAccountState", "getTransferList"]),
    openCreateWallet() {
      this.$router.push("/createWallet");
    },
    openWallet() {
      this.getAccountState()
        .then(data => {
          this.$router.push("/gpu/myWalletUnlock");
        })
        .catch(err => {
          this.$router.push("/openWallet");
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
