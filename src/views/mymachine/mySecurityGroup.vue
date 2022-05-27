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
import { mapActions, mapState, mapMutations } from "vuex";
import { initFromLocalstorage, getRand_str, CreateSignature } from '@/utlis/dot'
export default {
  name: "mySecurityGroup",
  data(){
    return{
      contain_new_wallet: false
    }
  },
  created() {
    if (this.$t("contain_new_wallet") === "1") {
      this.contain_new_wallet = true;
    }
    console.log(this.$route);
    this.initData();
  },
  computed: {
    ...mapState(['isNewWallet', "passward"])
  },
  methods: {
    ...mapMutations(['setPassWard']),
    ...mapActions(["getAccountState"]),
    initData() {
      if (this.$t("website_name") == "congTuCloud") {
        this.$router.replace("myUnlockSecurityGroup");
      } else {
        // if (getAccount()) {
        //   this.$router.replace("myMachineUnlockCPU");
        // }
        if (this.isNewWallet  == 'true' || this.isNewWallet  == 'false') {
          this.$router.push("myUnlockSecurityGroup");
        }
      }
    },
    getSign() {
      this.$prompt(this.$t('verifyPassward'), this.$t('tips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText:  this.$t('cancel'),
        inputType:'password',
        inputValue: this.passward
      })
      .then( async ({ value }) => {
        try {
          let nonce = await getRand_str()
          let sign = await CreateSignature(nonce, value)
          console.log(sign, 'sign');
          this.setPassWard(value)
          if (this.$t("website_name") == "congTuCloud") {
            this.$router.replace("myUnlockSecurityGroup");
          } else {
            if (this.isNewWallet  == 'true' || this.isNewWallet  == 'false') {
              this.$router.push("myUnlockSecurityGroup");
            }
          }
        } catch (err) {
          this.$message({
            showClose: true,
            message: err.message,
            type: "error",
          });
          this.getSign()
        }
      })
      .catch( err => {
        console.log(err, 'err');
        this.getSign()
        return false
      })
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
