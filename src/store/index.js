import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {
  getAccount,
  saveCookie,
  initAccount,
  initAccountFromEncryptedKey,
  getBalance,
  getTransfer,
  getTransactions
} from '../utlis'

import {
  get_dbc_price
} from '@/api'
import cookie from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {},
  state: {
    account: undefined,
    balance: 0,
    rpcClient: undefined,
    accountState: undefined,
    privateKey: '',
    publicKey: '',
    address: '',
    transferList: [],
    dbcToUS: 0 // DBC对美金汇率
  },
  mutations: {
    setAccount(state, data) {
      state.account = data
    },
    setBalances(state, data) {
      state.balance = data
    },
    setRPC(state, data) {
      state.rpcClient = data
    },
    setAccountState(state, data) {
      state.accountState = data
    },
    setData(state, {privateKey, address, publicKey}) {
      state.privateKey = privateKey || ''
      state.address = address || ''
      state.publicKey = publicKey || ''
    },
    setTransferList(state, data) {
      state.transferList = data
    },
    setdbcToUS(state, data) {
      state.dbcToUS = data
    }
  },
  actions: {
    getExchangeRate({commit, state}) {
      axios.get('https://api.coinmarketcap.com/v1/ticker/deepbrain-chain/').then(res => {
        // console.log(res.data[0])
        commit('setdbcToUS', res.data[0].price_usd)
      }).catch(err => {

      })
    },
    getTransferList({commit, state}) {
      getTransactions(state.address,1).then(res => {
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
    getAccountState({commit, state}) {
      return new Promise((resolve, reject) => {
        const ac = getAccount()
        if (ac) {
          commit('setData', {
            privateKey: ac.privateKey,
            publicKey: ac.publicKey,
            address: ac.address
          })
          getBalance().then(data => {
            resolve(data)
            commit('setBalances', data.balance)
          }).catch(err => {
            reject('please open wallet')
          })
        } else {
          reject('please open wallet')
        }
      })
    },
    // create account from privateKey
    createAccountFromPrivateKey({commit, state}, privateKey) {
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
    createAccountFromEncryptedKey({commit, state}, {encryptedKey, password}) {
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
