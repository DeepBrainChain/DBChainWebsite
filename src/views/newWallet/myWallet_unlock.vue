<template>
  <div class>
    <!-- <h3>新钱包</h3> -->
    <div class="top-tools">
      <div>
        <h3>
          {{ $t('gpu.walletAddress') }}：
          <span class="cPrimaryColor">{{ address }}</span>
        </h3>
        <p class="notice_1">
          {{ $t('gpu.notice_1') }}
        </p>
      </div>
      <div>
        <el-button
          class="closeBtn"
          size="mini"
          plain
          @click="closeWallet"
        >
          {{ $t('closeWallet') }}
        </el-button>
      </div>
    </div>
    <div class="form-input pt40">
      <label>
        <span>DBC{{ $t('gpu.amount') }}：</span>
        <span class="money-input">{{ balance }}</span>
      </label>
      <router-link
        class="ml20 f16 cPrimaryColor"
        :to="{path:'/howBuy',query:{address_user:address}}"
        target="_blank"
      >
        {{ $t('gpu.howBuyDBC') }}
      </router-link>

      <router-link
        class="cRed"
        :to="{path:'/howSell',query:{address_user:address}}"
        target="_blank"
      >
        &nbsp;&nbsp;{{ $t('howsellDBC') }}
      </router-link>
      <span class="f16">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ $t('gpu.showDeitailDBC') }}</span>
      <a
        href="javascript:void(0);"
        class="f16 cPrimaryColor"
        target="_blank"
        @click="toCoinWeb"
      >{{ $t('gpu.clickCoinmarktcap') }}</a>
      <!-- <el-button
        class="f16 cPrimaryColor"
        type="text"
        size="mini"
        @click="toCoinWeb"
      >
        {{ $t('gpu.clickCoinmarktcap') }}
      </el-button> -->
    </div>
    <div class="pt40 form-input">
      <label>
        <span>{{ $t('gpu.exchangeCash') }}：</span>
        <span class="cash-view">{{ (dbcPrice * balanceFree/Math.pow(10,15)).toFixed(4) }}</span>
      </label>
      <label>
        <el-tooltip
          class="item"
          effect="dark"
          :content="$t('dbc_price_wallet_tips')"
        >
          <span>{{ $t('dbc_price_wallet') }}：</span>
        </el-tooltip>
        <span class="cash-view">{{ Math.round(dbcPrice * 1000000) / 1000000 }}{{ $t('dbc_price_usd') }}</span>
        <!-- <el-tooltip
          class="item"
          effect="dark"
          :content="$t('dbcChange_tips')"
        >
          <span
            v-if="dbcChange>=0"
            class="cGren"
          >+{{ dbcChange }}%</span>
          <span
            v-if="dbcChange<0"
            class="cRed"
          >{{ dbcChange }}%</span>
        </el-tooltip> -->
      </label>
    </div>
    <div class="pt40 pb20">
      <table class="tb-theme small">
        <thead>
        <tr>
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('transfer_tips')"
          >
            <th
              width="130"
              class="tl pl30"
            >
              {{ $t('gpu.transfer') }}?
            </th>
          </el-tooltip>
          <th class="tr pr15">
            <span class="symbol-text">DBC</span>
            <el-button
              type="primary"
              :loading="sendLoading"
              size="mini"
              @click="send"
            >
              {{ $t('send') }}
            </el-button>
          </th>
        </tr>
        </thead>
        <tbody id="transfer">
        <tr>
          <td
            class="tl pl30 pr20"
            colspan="2"
          >
            <mu-text-field
              v-model.trim="transferFormData.toAddress"
              :label="$t('toAddress')"
              label-float
              :full-width="true"
            />
          </td>
        </tr>
        <tr>
          <td
            class="tl pl30 pr20 nobd"
            colspan="2"
          >
            <mu-text-field
              v-model="transferFormData.num"
              :label="$t('amount')"
              label-float
              :full-width="true"
              type="number"
              @change="floorNum"
            />
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <tradenew-list class="mb20"></tradenew-list>
    <wallet-detail></wallet-detail>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex"
import tradenewList from "@/components/wallet/tradenewList"
import walletDetail from "./components/walletBox"
import { closeAc } from "@/utlis";
import {
  initFromLocalstorage,
  initNetwork,
  getPairs,
  onGetBalance,
  removePair,
  isAddress,
  onTransferBalance,
  dbcPriceOcw
} from '@/utlis/dot'

export default {
  name: "MyWalletUnlock",
  components: {
    tradenewList,
    walletDetail
  },
  computed: {
    ...mapState([
      "dbcToUS",
      // "dbcChange",
    ])
  },
  data() {
    return {
      sendLoading: false,
      page: 1,
      si: undefined,
      token: '',
      address: '', // 地址
      pair: null, // 账户
      balance: '0', // 余额
      balanceFree: '0', // 余额_未简化版
      decimals: 0, // 小数
      transferFormData: { // 发送货币
        toAddress: '',
        num: ''
      },
      unsubBalance: null, // 余额
      refresh: undefined,
      dbcPrice: 0,
    }
  },
  mounted() {
    this.$store.commit('setNewWallet', 'true')
    this.initData()
    // this.si = setInterval(() => {
      //  this.initData();
      //this.exchangeCash = ;
    // }, 3000)
  },
  beforeDestroy() {
    if (this.si) {
      clearInterval(this.si)
    }
    if(this.refresh){
      clearInterval(this.refresh)
    }
    // if (this.unsubBalance) {
    //   this.unsubBalance()
    // }
  },
  methods: {
    ...mapActions(["getAccountState", "getExchangeRate", "getTransferList1"]),
    async initData() {
      const loadingInstance = this.$loading({target:'.top-tools'})
      if (getPairs().length === 0) {
        initFromLocalstorage()
      }
      const {api, nodeName, nodeVersion, properties} = await initNetwork()
      loadingInstance.close()
      // 获取地址
      if (getPairs().length > 0) {
        this.pair = getPairs()[0]
        this.address = this.pair.address
        this.$store.commit('setData',{address: this.pair.address})
      }
      let DBCprice = await dbcPriceOcw()
      this.dbcPrice = DBCprice/1000000
      // 获取余额
      this.unsubBalance = await onGetBalance(this.pair.address, (num, token, decimals,free) => {
        this.balance = num
        this.token = token
        this.decimals = decimals
        this.balanceFree = free
      })
      this.refresh = setInterval( async () => {
        let DBCprice1 = await dbcPriceOcw()
        this.dbcPrice = DBCprice1/1000000
        onGetBalance(this.pair.address, (num, token, decimals,free) => {
          this.balance = num
          this.token = token
          this.decimals = decimals
          this.balanceFree = free
        })
      }, 30000)
      this.getTransferList1()
    },
    // click to send assets to input address
    send() {
      if (!isAddress(this.transferFormData.toAddress)) {
        this.$message({
          showClose: true,
          message: this.$t("errAddr"),
          type: "error"
        })
      } else if (this.balance * 1 < this.transferFormData.num * 1) {
        this.$message({
          showClose: true,
          message: this.$t("amountNoMore"),
          type: "error"
        })
      } else if (this.transferFormData.num * 1 <= 0 || this.transferFormData.num === "") {
        this.$message({
          showClose: true,
          message: this.$t("noZero"),
          type: "error"
        })
      } else {
        this.$prompt(
          `
            <h3>${this.$t("confirmTrTitle")}</h3>
            <p>${this.$t("confirmTrMsg", {
            amount: this.transferFormData.num,
            address: this.transferFormData.toAddress
          })}</p>
            <p>${this.$t("confirmTrWaring")}</p>
          `,
          this.$t("tips"),
          {
            confirmButtonText: this.$t("confirm"),
            cancelButtonText: this.$t("cancel"),
            inputPlaceholder: '请输入解锁密码',
            inputType:'password',
            // type: 'info',
            // iconClass: '',
            dangerouslyUseHTMLString: true
          }
        ).then(({value: password}) => {
          this.sendLoading = true
          // start transfer
          console.log('[pair.isLocked]:', this.pair.isLocked)
          if (this.pair.isLocked) {
            this.pair.unlock(password)
          }
          const loading = this.$loading({
            target:'#transfer',
            lock: true,
            spinner: 'el-icon-loading',
            text: this.$t("transfer_ing"),
            background: 'rgba(0, 0, 0, 0.7)'
          })
          return new Promise((resolve)=>{
            onTransferBalance(this.pair, this.transferFormData.toAddress, this.transferFormData.num, (hex) => {
              console.log('success transfer');
              loading.close()
              resolve({status: 1})
            })
          })
          // onTransferBalance(this.pair, this.transferFormData.toAddress, this.transferFormData.num, (hex) => {
          //   console.log('success transfer');
          //   loading.close()
          //   return Promise.resolve({status: 1})
          // })
        }).then(res => {
          console.log(res);
          if (res.status === 1) {
            this.$message({
              showClose: true,
              message: this.$t("transferSuccess"),
              type: "success"
            })
          }
        }).catch(err => {
          this.$message({
            showClose: true,
            message: this.$t("transferFail"),
            type: "error"
          })
        }).finally(() => {
          this.sendLoading = false
        })
      }
    },
    toCoinWeb() {
      let herf = ''
      if (this.$i18n.locale === "cn" || this.$i18n.locale === "CN") {
        herf = "https://www.feixiaohao.com/currencies/deepbrain-chain/"
      } else {
        herf = "https://coinmarketcap.com/currencies/deepbrain-chain/"
      }
      window.open(herf, '_blank')
      window.location.href = 'https://www.deepbrainchain.org' 
    },
    closeWallet() {
      closeAc()
      if (this.pair && this.pair.address) {
        removePair(this.pair.address)
      }
      this.$store.commit('setNewWallet', '')
      localStorage.removeItem('isNewWallet')
      this.$router.push(`/mywallet/myWallet`)
    },
    floorNum() {
      // this.transferAmount = Math.floor(this.transferAmount)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";

.top-tools {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 16px;
    color: $textColor_def;
  }

  .notice_1 {
    font-size: 12px;
    color: $textColor_gray;
  }
}

.closeBtn {
  border-color: $primaryColor;
  color: $primaryColor;
}

.form-input {
  color: $textColor_def;

  label {
    font-size: 20px;
    color: $textColor_def;
  }

  .money-input {
    width: 240px;
    padding: 0 10px 8px;
    font-size: 36px;
    line-height: 36px;
  }

  .cash-view {
    display: inline-block;
    width: 360px;
    padding: 0 10px;
    font-size: 36px;
    line-height: 36px;
    color: #6e8299;
  }
}

.transfer-input {
  border: 0 none;
  font-size: 14px;
  width: 100%;
  outline: none;
  color: $textColor_def;
}

.symbol-text {
  color: $primaryColor;
  margin-right: 10px;
}
</style>
