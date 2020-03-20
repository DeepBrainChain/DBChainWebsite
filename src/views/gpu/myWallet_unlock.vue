<template>
  <div class>
    <div class="top-tools">
      <div>
        <h3>
          {{$t('gpu.walletAddress')}}：
          <span class="cPrimaryColor">{{address}}</span>
        </h3>
        <p class="notice_1">{{$t('gpu.notice_1')}}</p>
      </div>
      <div>
        <el-button class="closeBtn" size="mini" plain @click="closeWallet">{{$t('closeWallet')}}</el-button>
      </div>
    </div>
    <div class="form-input pt40">
      <label>
        <span>DBC{{$t('gpu.amount')}}：</span>
        <span class="money-input">{{(balance).toFixed(4)}}</span>
      </label>
      <router-link
        class="ml20 f16 cPrimaryColor"
        :to="{path:'/howBuy',query:{address_user:address}}"
        target="_blank"
      >{{$t('gpu.howBuyDBC')}}</router-link>

      <router-link
        class="cRed"
        :to="{path:'/howSell',query:{address_user:address}}"
        target="_blank"
      >&nbsp;&nbsp;{{$t('howsellDBC')}}</router-link>
      <span class="f16">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('gpu.showDeitailDBC')}}</span>
      <a
        href="javascript:"
        class="f16 cPrimaryColor"
        @click="toCoinWeb"
      >{{$t('gpu.clickCoinmarktcap')}}</a>
    </div>
    <div class="pt40 form-input">
      <label>
        <span>{{$t('gpu.exchangeCash')}}：</span>
        <span class="cash-view">{{(dbcPrice * balance).toFixed(4)}}</span>
      </label>
      <label>
        <el-tooltip class="item" effect="dark" :content="$t('dbc_price_wallet_tips')">
          <span>{{$t('dbc_price_wallet')}}：</span>
        </el-tooltip>
        <span class="cash-view">{{Math.round(dbcPrice* 1000000) / 1000000}}{{$t('dbc_price_usd')}}</span>
        <el-tooltip class="item" effect="dark" :content="$t('dbcChange_tips')">
          <span class="cGren" v-if="dbcChange>=0">+{{dbcChange}}%</span>
          <span class="cRed" v-if="dbcChange<0">{{dbcChange}}%</span>
        </el-tooltip>
      </label>
    </div>
    <div class="pt40 pb20">
      <table class="tb-theme small">
        <thead>
          <tr>
            <el-tooltip class="item" effect="dark" :content="$t('transfer_tips')">
              <th width="130" class="tl pl30">{{$t('gpu.transfer')}}?</th>
            </el-tooltip>
            <th class="tr pr15">
              <span class="symbol-text">DBC</span>
              <el-button
                type="primary"
                :loading="sendLoading"
                size="mini"
                @click="send"
              >{{$t('send')}}</el-button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <!--<td class="tl pl30">{{$t('toAddress')}}</td>
        <td class="tl pr15">
          <input class="transfer-input" type="text" v-model="transferAddress">
            </td>-->
            <td class="tl pl30 pr20" colspan="2">
              <mu-text-field
                v-model.trim="transferAddress"
                :label="$t('toAddress')"
                label-float
                :full-width="true"
              ></mu-text-field>
            </td>
          </tr>
          <tr>
            <!--<td class="tl pl30">{{$t('amount')}}</td>
        <td class="tl pr15">
          <input class="transfer-input" type="text" v-model.number="transferAmount" @change="floorNum">
            </td>-->
            <td class="tl pl30 pr20 nobd" colspan="2">
              <mu-text-field
                v-model.number="transferAmount"
                :label="$t('amount')"
                label-float
                @change="floorNum"
                :full-width="true"
                type="number"
              ></mu-text-field>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <trade-list class="mb20"></trade-list>
    <wallet-detail></wallet-detail>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { closeAc, transfer, isAddress } from "@/utlis";
import tradeList from "@/components/wallet/tradeList";
import walletDetail from "@/components/wallet/walletBox";
import { MessageBox } from "element-ui";
export default {
  name: "myWallet-unlock",
  components: {
    tradeList,
    walletDetail
  },
  data() {
    return {
      sendLoading: false,
      symbol: "",
      page: 1,
      transferAddress: "",
      transferAmount: undefined,
      si: undefined,
      dbc_info: undefined,
      exchangeCash: 0,
      dbc_change: 0
    };
  },
  created() {
    this.initData();
    this.si = setInterval(() => {
      //  this.initData();
      //this.exchangeCash = ;
    }, 3000);
  },
  beforeDestroy() {
    if (this.si) {
      clearInterval(this.si);
    }
  },
  methods: {
    ...mapActions([
      "getAccountState",
      "getTransferList",
      "getExchangeRate",
      "getGate"
    ]),
    initData() {
      this.getExchangeRate();
      this.getGate();

      this.getAccountState()
        .then(data => {
          this.symbol = data.symbol;
          this.getTransferList();
        })
        .catch(err => {
          const type = this.$route.path.search("gpu") !== -1 ? "gpu" : "miner";
          this.$router.push(`/openWallet/${type}`);
        });
    },
    // click to send assets to input address
    send() {
      if (!isAddress(this.transferAddress)) {
        this.$message({
          showClose: true,
          message: this.$t("errAddr"),
          type: "error"
        });
      } else if (this.balance < this.transferAmount) {
        this.$message({
          showClose: true,
          message: this.$t("amountNoMore"),
          type: "error"
        });
      } else if (this.transferAmount <= 0 || this.transferAmount === "") {
        this.$message({
          showClose: true,
          message: this.$t("noZero"),
          type: "error"
        });
      } else {
        MessageBox.confirm(
          `
            <h3>${this.$t("confirmTrTitle")}</h3>
            <p>${this.$t("confirmTrMsg", {
              amount: this.transferAmount,
              address: this.transferAddress
            })}</p>
            <p>${this.$t("confirmTrWaring")}</p>
          `,
          this.$t("tips"),
          {
            confirmButtonText: this.$t("confirm"),
            cancelButtonText: this.$t("cancel"),
            // type: 'info',
            // iconClass: '',
            dangerouslyUseHTMLString: true
          }
        )
          .then(() => {
            this.sendLoading = true;
            // start transfer
            return transfer({
              toAddress: this.transferAddress,
              amount: this.transferAmount
            });
          })
          .then(res => {
            if (res.status === 1) {
              MessageBox.alert(this.$t("transferSuccess"), this.$t("tips"), {
                confirmButtonText: this.$t("confirm")
              });
            }
          })
          .catch(err => {
            console.log(err);
            MessageBox.alert(this.$t("transferFail"), this.$t("tips"), {
              confirmButtonText: this.$t("confirm")
            });
          })
          .finally(() => {
            this.sendLoading = false;
          });
      }
    },
    toCoinWeb() {
      if (this.$i18n.locale === "cn" || this.$i18n.locale === "CN") {
        location.href =
          "https://www.feixiaohao.com/currencies/deepbrain-chain/";
      } else {
        location.href = "https://coinmarketcap.com/currencies/deepbrain-chain/";
      }
      window.open(location.href);
    },
    closeWallet() {
      closeAc();
      this.$router.push(`myWallet`);
    },
    floorNum() {
      // this.transferAmount = Math.floor(this.transferAmount)
    }
  },
  computed: {
    ...mapState([
      "address",
      "balance",
      "transferList",
      "dbcToUS",
      "dbcPrice",
      "dbcChange"
    ])
  }
};
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
