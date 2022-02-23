import Vue from 'vue'
import Vuex from 'vuex'

import {
  getAccount,
  getTransactions,
  getTransactions1
} from '../utlis'

import newDbc from './modules/dbcWallet'

import {
  dbc_info,
  dbc_balance,
  getsearch,
  dbc_gas_balance
} from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    newDbc
  },
  state: {
    account: undefined,
    balance: 0,
    gasbalance: 0,
    dbcChange: 0,
    dbcPrice: 0,
    rpcClient: undefined,
    accountState: undefined,
    privateKey: '',
    publicKey: '',
    address: '',
    transferList: [],
    listTotal: 0,
    dbcToUS: 0, // DBC对美金汇率
    passward: sessionStorage.getItem('passward'), // 钱包密码，默认为空，刷新页面需要重新输入
    menuName: sessionStorage.getItem('menuName'),
    webtype: "",
    isNewWallet: localStorage.getItem('isNewWallet') // true: 是新钱包 false或''：不是新钱包
  },
  mutations: {
    setAccount(state, data) {
      state.account = data
    },
    setBalances(state, data) {
      state.balance = data
    },
    setGasBalances(state, data) {
      state.gasbalance = data
    },
    setRPC(state, data) {
      state.rpcClient = data
    },
    setAccountState(state, data) {
      state.accountState = data
    },
    setData(state, {
      privateKey,
      address,
      publicKey
    }) {
      state.privateKey = privateKey || ''
      state.address = address || ''
      state.publicKey = publicKey || ''
    },
    setTransferList(state, data) {
      state.transferList = data
    },
    setListTotal(state, data) {
      state.listTotal = data
    },
    setdbcToUS(state, data) {
      state.dbcToUS = data
    },
    setDbcPrice(state, data) {
      state.dbcPrice = data
    },
    setDbcChange(state, data) {
      state.dbcChange = data
    },
    setMenuName(state, data) {
      state.menuName = data
      sessionStorage.setItem('menuName',data)
    },
    setWebtype(state, data) {
      state.webtype = data
    },
    setNewWallet(state, data) {
      state.isNewWallet = data
      localStorage.setItem('isNewWallet',data)
    },
    setPassWard(state, data){
      state.passward = data
      sessionStorage.setItem('passward',data)
    }
  },
  actions: {
    getExchangeRate({
      commit,
      state
    }) {
      const language = "CN";
      dbc_info({

        language
      }).then(res => {

        commit('setDbcPrice', res.content.dbc_price)
        commit('setDbcChange', res.content.percent_change_24h)

      }).catch(err => {

      })


    },

    getTransferList1({
      commit,
      state
    }) {
      getTransactions1(state.address, 0, 10).then(res => {
        const array = res.data.transfers&&res.data.transfers.map(item => {
          return {
            txHash: item.hash,
            fromAddress: item.from,
            toAddress: item.to,
            time: item.block_timestamp,
            amount: item.amount,
            result: item.success
          }
        })
        commit('setTransferList', array)
        commit('setListTotal', res.data.count)
      })
      /*getTransfer(state.address).then(data => {
        const recArray = data.received.map(item => {
          return {
            txHash: item.tx_hash,
            fromAddress: item.transfer_address,
            toAddress: state.address,
            time: item.timestamp,
            amount: item.amount
          }
        })
        const sendArray = data.sent.map(item => {
          return {
            txHash: item.tx_hash,
            fromAddress:state.address ,
            toAddress: item.transfer_address,
            time: item.timestamp,
            amount: item.amount
          }
        })
        const array = recArray.concat(sendArray).sort((a, b) => {
          return b.time - a.time
        })
        commit('setTransferList', array)
      })*/
    },
    getAccountState({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        const ac = getAccount()
        const language = "CN"
        if (ac) {
          commit('setData', {
            privateKey: ac.privateKey,
            publicKey: ac.publicKey,
            address: ac.address
          })
          if(state.isNewWallet == 'true'){
            getsearch({ key: state.address , page: 0, row: 1 }).then(res => {
  
              commit('setBalances', res.data.account.balance)
  
  
            }).catch(err => {
  
            })
            getTransactions1(state.address, 0, 10).then(res => {
              const array = res.data.transfers&&res.data.transfers.map(item => {
                return {
                  txHash: item.txid,
                  fromAddress: item.address_from,
                  toAddress: item.address_to,
                  time: item.time,
                  amount: item.amount
                }
              })
              commit('setTransferList', array)
              commit('setListTotal', res.data.count)
            })
          }else{
            dbc_balance({
              user_wallet_address: ac.address,
              language
            }).then(res => {
  
              commit('setBalances', res.content)
  
  
            }).catch(err => {
  
            })
  
            dbc_gas_balance({
              user_wallet_address: ac.address,
              language
            }).then(res => {
  
              commit('setGasBalances', res.content)
  
  
            }).catch(err => {
  
            })
          }
          

          getTransactions(state.address, 1).then(res => {
            const array = res.entries.map(item => {
              return {
                txHash: item.txid,
                fromAddress: item.address_from,
                toAddress: item.address_to,
                time: item.time,
                amount: item.amount
              }
            })
            commit('setTransferList', array)
          })


        } else {
          reject('please open wallet')
        }
      })
    },
  }
})
