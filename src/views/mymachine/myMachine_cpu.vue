<!--
 * @Author: your name
 * @Date: 2020-08-24 14:49:16
 * @LastEditTime: 2020-12-30 20:25:09
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \DBChainWebsite\src\views\mymachine\myMachine_cpu.vue
-->
<template>
  <div class="my-wallet">
    <h3></h3>
    <div class="wallet-btns">
      <el-button
        type="primary"
        v-on:click="openCreateWallet('/createWallet')"
        >{{ $t("gpu.createWallet") }}</el-button
      >
      <el-button type="primary" v-on:click="openWallet">{{
        $t("gpu.openWallet")
      }}</el-button>
    </div>
    <div class="center-box">
      <div>{{ $t("gpu.rentMachine") }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getAccount } from "@/utlis";

export default {
  name: "myWallet",
  created() {
    console.log(this.$route);
    this.initData();
  },
  methods: {
    ...mapActions(["getAccountState", "getTransferList"]),
    initData() {
      if (this.$t("website_name") == "congTuCloud") {
        this.$router.replace("myMachineUnlockCPU");
      } else {
        if (getAccount()) {
          this.$router.replace("myMachineUnlockCPU");
        }
      }
    },
    openCreateWallet() {
      const type = this.$route.path.search("gpu") !== -1 ? "gpu" : "miner";
      this.$store.commit("setMenuName", "mywallet");
      this.$router.push(`/createWallet/${type}`);
    },
    openWallet() {
      this.getAccountState()
        .then((data) => {
          this.$router.push("/gpu/myMachine_unlock_cpu");
        })
        .catch((err) => {
          const type = this.$route.path.search("gpu") !== -1 ? "gpu" : "miner";
          this.$store.commit("setMenuName", "mywallet");
          this.$router.push(`/openWallet/${type}`);
        });
    },
  },
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
