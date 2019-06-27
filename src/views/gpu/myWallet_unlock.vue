<template>
  <div class="">
    <div class="top-tools">
      <div>
        <h3>{{$t('gpu.walletAddress')}}：<span class=" cPrimaryColor">{{address}}</span></h3>
        <p class="notice_1">{{$t('gpu.notice_1')}}</p>
      </div>
      <div>
        <el-button class="closeBtn" size="mini" plain @click="closeWallet">{{$t('closeWallet')}}</el-button>
      </div>
    </div>
    <div class="form-input pt40">
      <label>
        <span>{{symbol + $t('gpu.amount')}}：</span>
        <span class="money-input">{{balance}}</span>
      </label>
      <router-link class="ml20 f16 cPrimaryColor" to="/howBuy">{{$t('gpu.howBuyDBC')}}</router-link>
    </div>
    <div class="mt30 form-input">
      <label>
        <span>{{$t('gpu.exchangeCash')}}：</span>
        <span class="cash-view">{{(balance * dbcToUS).toFixed(3)}}</span>
      </label>
      <span class="f16">{{$t('gpu.showDeitailDBC')}}</span><a href="javascript:" class="f16 cPrimaryColor"
                                                              @click="toCoinWeb">{{$t('gpu.clickCoinmarktcap')}}</a>
    </div>
    <div class="pt40 pb20">
      <table class="tb-theme small">
        <thead>
        <tr>
          <th width="130" class="tl pl30">{{$t('gpu.transfer')}}</th>
          <th class="tr pr15">
            <span class="symbol-text">{{symbol}}</span>
            <el-button type="primary" :loading="sendLoading" size="mini" @click="send">{{$t('send')}}</el-button>
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
            <mu-text-field v-model="transferAddress" :label="$t('toAddress')" label-float :full-width="true"></mu-text-field>
          </td>
        </tr>
        <tr>

          <!--<td class="tl pl30">{{$t('amount')}}</td>
          <td class="tl pr15">
            <input class="transfer-input" type="text" v-model.number="transferAmount" @change="floorNum">
          </td>-->
          <td class="tl pl30 pr20 nobd" colspan="2">
            <mu-text-field v-model.number="transferAmount" :label="$t('amount')" label-float @change="floorNum" :full-width="true" type="number"></mu-text-field>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <trade-list></trade-list>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import {closeAc, transfer, isAddress} from '@/utlis'
  import tradeList from '@/components/wallet/tradeList'
  import { MessageBox } from 'element-ui';

  export default {
    name: "myWallet-unlock",

    data() {
      return {
        sendLoading: false,
        decimals: 0,
        symbol: '',
        page: 1,
        transferAddress: '',
        transferAmount: undefined,
        si: undefined
      }
    },
    created() {
      this.initData()
      this.si = setInterval(() => {
        this.initData()
      }, 5000)
    },
    beforeDestroy() {
      if (this.si) {
        clearInterval(this.si)
      }
    },
    methods: {
      ...mapActions([
        'getAccountState',
        'getTransferList',
        'getExchangeRate'
      ]),
      initData() {
        this.getExchangeRate()
        this.getAccountState().then(data => {
          this.symbol = data.symbol
          this.decimals = data.decimals
          this.getTransferList()
        }).catch(err => {
          this.$router.push('/openWallet')
        })
      },
      // click to send assets to input address
      send() {
        if (!isAddress(this.transferAddress)) {
          this.$message({
            showClose: true,
            message: this.$t('errAddr'),
            type: 'error'
          })
        } else if (this.balance < this.transferAmount) {
          this.$message({
            showClose: true,
            message: this.$t('amountNoMore'),
            type: 'error'
          })
        } else if (this.transferAmount <= 0 || this.transferAmount === '') {
          this.$message({
            showClose: true,
            message: this.$t('noZero'),
            type: 'error'
          })
        } else {
          MessageBox.confirm(`
            <h3>${this.$t('confirmTrTitle')}</h3>
            <p>${this.$t('confirmTrMsg', {amount: this.transferAmount,address: this.transferAddress})}</p>
            <p>${this.$t('confirmTrWaring')}</p>
          `, this.$t('tips'), {
            confirmButtonText: this.$t('confirm') ,
            cancelButtonText: this.$t('cancel'),
            // type: 'info',
            // iconClass: '',
            dangerouslyUseHTMLString: true
          }).then(() => {
            this.sendLoading = true
            // start transfer
            transfer({
              toAddress: this.transferAddress,
              amount: this.transferAmount
            }).then(res => {
              console.log(res)
              if (res.response.result) {
                MessageBox.alert(this.$t('transferSuccess'), this.$t('tips'), {
                  confirmButtonText: this.$t('confirm')
                });
              }
            }).catch(err => {
              console.log(err)
              MessageBox.alert(this.$t('transferFail'), this.$t('tips'), {
                confirmButtonText: this.$t('confirm')
              });
            }).finally(() => {
              this.sendLoading = false
            })
          }).catch(() => {

          });

        }
      },
      toCoinWeb() {
        if (this.$i18n.locale === 'CN') {
          location.href = 'https://www.feixiaohao.com/currencies/deepbrain-chain/'
        } else {
          location.href = 'https://coinmarketcap.com/currencies/deepbrain-chain/'
        }
      },
      closeWallet() {
        closeAc()
        this.$router.push('/gpu/myMachine')
      },
      floorNum() {
        this.transferAmount = Math.floor(this.transferAmount)
      }
    },
    computed: {
      ...mapState([
        'address',
        'balance',
        'transferList',
        'dbcToUS'
      ])
    },
    components: {
      tradeList
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
      width: 240px;
      padding: 0 10px;
      font-size: 36px;
      line-height: 36px;
      color: #6E8299;
    }
  }

  .transfer-input {
    border: 0 none;
    font-size: 14px;
    width: 100%;
    outline: none;
    color: $textColor_def
  }
  .symbol-text {
    color: $primaryColor;
    margin-right: 10px;
  }

</style>
