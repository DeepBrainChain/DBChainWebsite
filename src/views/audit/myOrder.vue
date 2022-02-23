<template>
  <div class="my-wallet">
    <h3></h3>
    <div class="wallet-btns">
      <el-button
        type="primary"
        @click="openCreateWalletNew('/createWallet')"
      >
        {{ $t('mywallet_create') }}
      </el-button>
      <el-button
        v-if="contain_new_wallet"
        type="primary"
        @click="openWallet_new"
      >
        {{ $t('mywallet_open_new') }}
      </el-button>
    </div>
    <div class="center-box">
      <div>{{ $t("gpu.rentMachine") }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { initFromLocalstorage } from "@/utlis/dot"

export default {
  name: "myWallet",
  created() {
    if (this.$t("contain_new_wallet") === "1") {
      this.contain_new_wallet = true;
    }
    console.log(this.$route);
    this.initData();
  },
  data(){
    return{
      contain_new_wallet: false
    }
  },
  computed: {
    ...mapState(['isNewWallet'])
  },
  methods: {
    ...mapActions(["getAccountState"]),
    initData() {
      if (this.$t("website_name") == "congTuCloud") {
        this.$router.replace("myOrder_unlock");
      } else {
        if (this.isNewWallet == 'true' || this.isNewWallet == 'false') {
          this.$router.push("myOrder_unlock");
        }
      }
    },
    openCreateWalletNew () {
      this.$router.push(`/newWallet/createWallet`)
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
    },
    openWallet_new() {
      const pair = initFromLocalstorage()
      if (pair) {
        console.log('pair->', pair)
        this.$router.push('/newWallet/myWalletUnlock')
      } else {
        this.$router.push(`/newWallet/openWallet`)
      }
    }
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
