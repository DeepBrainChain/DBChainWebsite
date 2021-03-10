import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import {
  getAccount,
  saveCookie,
  initAccount,
  initAccountFromEncryptedKey,
  getBalance,
  getGasBalance,
  getTransfer,
  getTransactions
} from '../utlis'

import {
  get_dbc_price,
  dbc_info,
  dbc_balance,
  dbc_gas_balance
} from '@/api'
import cookie from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {},
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
    dbcToUS: 0, // DBC对美金汇率
    menuName: '',
    webtype: ""
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
    },
    setWebtype(state, data) {
      state.webtype = data
    }
  },
  actions: {
    /*getExchangeRate({
      commit,
      state
    }) {
      // axios.get('https://api.coinmarketcap.com/v1/ticker/deepbrain-chain/').then(res => {
      axios.get('http://gateio.life/api2/1/ticker/dbc_usdt/').then(res => {
        // console.log(res.data[0])
        //   commit('setdbcToUS', res.data[0].price_usd)
        commit('setDbcPrice', res.data[0].price_usd)
        //     commit('setDbc_change', res.data[0].percent_change_24h)
       // commit('setDbcPrice', res.last)
      }).catch(err => {
       // commit('setdbcToUS', res.last)
      })
    },*/

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

    getGate({
      commit,
      state
    }) {
      //  axios.get('https://gateio.life/api2/1/ticker/dbc_usdt/').then(res => {
      axios.get('https://api.coinmarketcap.com/v1/ticker/deepbrain-chain/').then(res => {
        // commit('setDbc_price', res.last)
        // commit('setDbcChange', res.data[0].percent_change_24h)
      }).catch(err => {
        // commit('setdbcToUS', res.last)
      })
    },

    getTransferList({
      commit,
      state
    }) {
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
    // create account from privateKey
    createAccountFromPrivateKey({
      commit,
      state
    }, privateKey) {
      return new Promise((resolve, reject) => {
        const account = initAccount(privateKey)
        if (account) {
          saveCookie(account)
          commit('setData', {
            privateKey: account.privateKey,
            publicKey: account.publicKey,
            address: account.address
          })
          resolve(account)


        } else {
          reject('createAccount is fail')
        }
      })
    },
    // create account from encryptedKey
    createAccountFromEncryptedKey({
      commit,
      state
    }, {
      encryptedKey,
      password
    }) {
      return initAccountFromEncryptedKey(encryptedKey, password).then(account => {
        saveCookie(account, encryptedKey)
        commit('setData', {
          privateKey: account.privateKey,
          publicKey: account.publicKey,
          address: account.address
        })
        return Promise.resolve()
      })
    }
  }
})
