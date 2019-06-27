import Neon, {rpc, wallet, nep5, api} from "@cityofzion/neon-js";
import cookie from "js-cookie";

const netType = 'https://seed12.ngd.network:10331'
// const netType = 'http://seed2.aphelion-neo.com:10332'
const DBCHash = 'b951ecbbc5fe37a9c280a76cb0ce0014827294cf'  // DBC assetId

export let account = undefined

export const client = new rpc.RPCClient(netType)

export function saveCookie(account) {
  if (wallet.isAddress(account.address)) {
    cookie.set('address', account.address) // save address
  }
  if (wallet.isWIF(account.WIF) || wallet.isPrivateKey(account.privateKey)) {
    cookie.set('privateKey', account.privateKey)
    cookie.set('WIF', account.WIF)
  }
  if (wallet.isPublicKey(account.publicKey)) {
    cookie.set('publicKey', account.publicKey)
  }
}

export function closeAc() {
  cookie.remove('privateKey')
  account = undefined
}

export function initAccount(privateKey) {
  if (wallet.isPrivateKey(privateKey) || wallet.isWIF(privateKey)) {
    account = new wallet.Account(privateKey)
    return account
  } else {
    return undefined
  }
}

export function initAccountFromEncryptedKey(encryptedKey, password) {
  return new Promise((resolve, reject) => {
    if (wallet.isNEP2(encryptedKey)) {
      account = new wallet.Account(encryptedKey)
      account.decrypt(password).then(account => {
        resolve(account)
      }).catch(e => {
        reject(e)
      })
    } else {
      reject('the key is wrong~!')
    }
  })
}

export function getBalance() {
  return new Promise((resolve, reject) => {
    if (account) {
      const scriptHash = DBCHash
      nep5.getToken(netType, scriptHash, account.address).then(res => {
        console.log(res)
        resolve({
          name: res.name,
          symbol: res.symbol,
          balance: res.balance.c[0],
          decimals: res.decimals
        })
      }).catch(err => {
        console.log(err)
        reject('please open wallet')
      })
    } else {
      reject('please open wallet')
    }
  })
}

// new Account
export function createAccount(password) {
  return new Promise((resole, reject) => {
    const privateKey = wallet.generatePrivateKey()
    const ac = new wallet.Account(privateKey)
    wallet.encrypt(ac.WIF, password).then(nep2Key => {
      account = ac
      resole({
        nep2Key,
        privateKey
      })
    }).catch(err => {
      reject(err)
    })
  })
}

export function getWIFFromPrivateKey(privateKey) {
  return wallet.getWIFFromPrivateKey(privateKey)
}

export function isAddress(address) {
  return wallet.isAddress(address)
}

export function getAccount() {
  if (account) {
    return account
  } else {
    return initAccount(cookie.get('privateKey'))
  }
}

export function getTransfer(address) {
  const rpcClient = new rpc.RPCClient(netType)
  const query = Neon.create.query({
    method: 'getnep5transfers',
    params: [address, 0]
  })
  return new Promise((resolve, reject) => {
    rpcClient.execute(query).then(data => {
      resolve(data.result)
    }).catch(err=>{
      console.log(err)
      reject(err)
    })
  })

}

// send assets to address
export function transfer({toAddress,amount, gas=0 }) {
  const apiProvider = new api.neoscan.instance('MainNet')
  // console.log(apiProvider)
  const generator = nep5.abi.transfer(DBCHash,account.address,toAddress,amount)
  // console.log(generator)
  const script = generator().str
  // console.log(script)
  const config = {
    api: apiProvider, // The API Provider that we rely on for balance and rpc information
    account: account, // The sending Account
    // intents: undefined, // Additional intents to move assets
    script: script, // The Smart Contract invocation script
    gas // Additional GAS for invocation.
  };
  return Neon.doInvoke(config)
}

// initAccount()
