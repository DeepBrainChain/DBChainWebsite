<template>
  <div class="my-wallet">
    <div class="wallet-btns">
      <el-button
        v-if="contain_new_wallet"
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
      <div plain>
        {{ $t('mywallet_open_create') }}
      </div>
    </div>
    <div class="center-box">
      <div
        class="btn lg"
        plain
      >
        {{ $t('mywallet_transfer_record') }}
        <br>
        {{ $t('mywallet_display') }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getAccount } from "@/utlis";
import { getCurrentPair } from "@/utlis/dot"
import {
  initFromLocalstorage
} from '@/utlis/dot'

export default {
  name: "MyWallet",
  data() {
    return {
      gas_balance: 0,
      contain_new_wallet: false
    };
  },
  created() {
    if (this.$t("contain_new_wallet") === "1") {
      this.contain_new_wallet = true;
    }
    this.initData();
  },
  computed:{
    ...mapState(['isNewWallet'])
  },
  methods: {
    ...mapActions(["getAccountState"]),
    initData() {
      console.log(String(this.isNewWallet), 'this.isNewWallet');
      if(String(this.isNewWallet) == 'false'){
        this.$router.push("myWalletUnlock");
      }else if(String(this.isNewWallet) == 'true'){
        this.$router.push('/newWallet/myWalletUnlock')
      }
      // if (getAccount()) {
      //   this.$router.push("myWalletUnlock");
      // } else if (getCurrentPair()) {
      //   this.$router.push('/newWallet/myWalletUnlock')
      // }
    },
    // openCreateWallet() {
    //   const type = this.$route.path.search("gpu") !== -1 ? "gpu" : "miner";
    //   this.$router.push(`/createWallet/${type}`);
    // },
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
