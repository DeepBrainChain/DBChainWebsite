import Neon, {
  rpc,
  wallet,
  nep5,
  api,
  sc,
  u,
  tx
} from "@cityofzion/neon-js";
import cookie from "js-cookie";
import {
  get_address_abstracts,
  get_address_abstracts1
} from "@/api/index";
import { getCurrentPair } from './dot'
import {
  dbc_balance,
  getsearch,
  dbc_gas_balance
} from "@/api";
import store  from '@/store'

import {
  initNetwork,
  getPairs,
  onTransferBalance
} from '@/utlis/dot'

//const netType = 'https://api.neoscan.io'
const netType = "https://neocli.dbchain.ai";
//const netType = 'http://seed2.aphelion-neo.com:10332'
const DBCHash = "b951ecbbc5fe37a9c280a76cb0ce0014827294cf"; // DBC assetId
const DBC_NAME = "DEEPBRAIN COIN";
const testAddress = "AKMqDy51FuMnc4poiGBczQvPh6819hQuLH";
// const testNewAddress = "5GGu2iQBLXuys61zbSnzfBsVMYzwaM3FfMbpMAmsAiExSWcN";
const testNewAddress = '5GEji5DojzpeNjKZnsjh3paKR2t1qgLEBnRRpZKLc5ntGNoz';

export let account = undefined;

export const client = new rpc.RPCClient(netType);

export function saveCookie(account, encryptedKey) {
  if (wallet.isAddress(account.address)) {
    cookie.set("address", account.address); // save address
  }
  if (wallet.isWIF(account.WIF) || wallet.isPrivateKey(account.privateKey)) {
    cookie.set("privateKey", account.privateKey);
    cookie.set("WIF", account.WIF);
  }
  if (wallet.isPublicKey(account.publicKey)) {
    cookie.set("publicKey", account.publicKey);
  }
  if (wallet.isNEP2(encryptedKey)) {
    cookie.set("encryptedKey", encryptedKey);
  }
}

export function closeAc() {
  cookie.remove("privateKey");
  cookie.remove("address");
  cookie.remove("mail");
  cookie.remove("encryptedKey");
  account = undefined;
}

export function initAccount(privateKey) {
  if (wallet.isPrivateKey(privateKey) || wallet.isWIF(privateKey)) {
    account = new wallet.Account(privateKey);
    return account;
  } else {
    return undefined;
  }
}

export function initAccountFromEncryptedKey(encryptedKey, password) {
  return new Promise((resolve, reject) => {
    if (wallet.isNEP2(encryptedKey)) {
      account = new wallet.Account(encryptedKey);
      account
        .decrypt(password)
        .then(account => {
          resolve(account);
        })
        .catch(e => {
          reject(e);
        });
    } else {
      reject("the key is wrong~!");
    }
  });
}

export function getBalance_old() {
  return new Promise((resolve, reject) => {
    if (account) {
      const scriptHash = DBCHash;
      //const apiProvider = new api.neoscan.instance('MainNet')
      //  const apiProvider = new api.neoscan.instance(
      //    "https://api.neoscan.io/api/main_net"
      //   ); //
      const apiProvider = new api.neoCli.instance("https://neocli.dbchain.ai"); //or "http://seed5.ngd.network:20332" for TestNet );

      apiProvider
        .getBalance(account.address)
        .then(res => {
          // console.log(res)
          const nep5AssetsArray = [];
          res.tokenSymbols.forEach(symbol => {
            const fixed8 = res.tokens[symbol];
            const balance = fixed8.toNumber();
            nep5AssetsArray.push({
              symbol,
              balance
            });
          });
          const dbc_info = nep5AssetsArray.find(
            item => item.symbol === DBC_NAME
          );
          if (dbc_info) {
            console.log(dbc_info);
            resolve(dbc_info);
          } else {
            resolve({
              balance: 0
            });
          }
        })
        .catch(err => {
          console.log(err);
          reject("please open wallet");
        });

      /*nep5.getToken(netType, scriptHash, account.address).then(res => {
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
      })*/
    } else {
      reject("please open wallet");
    }
  });
}

export function getBalance() {
  
  if(!account && store.state.isNewWallet == 'true'){
    account = getCurrentPair();
  }
  return new Promise((resolve, reject) => {
    if (account) {
      if(store.state.isNewWallet == 'true'){
        getsearch({ key: account.address , page: 0, row: 1 }).then(res => {
          resolve({
            symbol: DBC_NAME,
            balance: res.data?res.data.account.balance:0
          });
        }).catch(err => {
          console.log(err, 'getsearch_Err');
        })
      }else{
        dbc_balance({
          user_wallet_address: account.address,
          language: "CN"
        }).then(res => {
  
          resolve({
            symbol: DBC_NAME,
            balance: res.content
          });
  
        }).catch(err => {
  
        })
      }      
    } else {
      reject("please open wallet");
    }
  });
}

export function getGasBalance() {
  return new Promise((resolve, reject) => {
    if (account) {
      dbc_gas_balance({
        user_wallet_address: account.address,
        language: "CN"
      }).then(res => {

        resolve({
          symbol: DBC_NAME,
          gas_balance: res.content
        });

      }).catch(err => {

      })
    } else {
      reject("please open wallet");
    }
  });
}

// new Account
export function createAccount(password) {
  return new Promise((resole, reject) => {
    const privateKey = wallet.generatePrivateKey();
    const ac = new wallet.Account(privateKey);
    wallet
      .encrypt(ac.WIF, password)
      .then(nep2Key => {
        account = ac;
        resole({
          nep2Key,
          privateKey
        });
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function getWIFFromPrivateKey(privateKey) {
  return wallet.getWIFFromPrivateKey(privateKey);
}

export function isAddress(address) {
  return wallet.isAddress(address);
}

export function getAccount() {
  if (account) {
    // console.log(account)
    return account;
  } else {
    return initAccount(cookie.get("privateKey"));
  }
}

export async function getEncryptedKey(WIF, password) {
  const nep2Key = await wallet.encrypt(WIF, password);
  return nep2Key;
}

export function getTransfer(address) {
  const rpcClient = new rpc.RPCClient(netType);
  const query = Neon.create.query({
    method: "getnep5transfers",
    params: [address, 0]
  });
  return new Promise((resolve, reject) => {
    rpcClient
      .execute(query)
      .then(data => {
        resolve(data.result);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

export function getTransactions(address, page, assetsHash = DBCHash) {
  return get_address_abstracts({
    address,
    page
  }).then(res => {
    return Promise.resolve(res);
  });
}
export function getTransactions1(address, page, row,assetsHash = DBCHash) {
  return get_address_abstracts1({
    address,
    page,
    row
  }).then(res => {
    return Promise.resolve(res);
  });
}
// send assets to address
export function transfer({
  toAddress = testAddress,
  amount,
  passward
}) {
  if(store.state.isNewWallet == 'true'){
    let pair;
    return getsearch({ key: account.address , page: 0, row: 1 })
    .then( async (res) => {
      if (res.data.account.balance > amount) {
        await initNetwork();
        // 获取地址
        if (getPairs().length > 0) {
          pair = getPairs()[0]
        }
        console.log('[pair.isLocked]:', pair.isLocked)
        if (pair.isLocked) {
          console.log(passward)
          pair.unlock(passward)
        }
        console.log(testNewAddress, amount, 'toAddress,amount');
        return new Promise((resolve)=>{
          onTransferBalance(pair, testNewAddress, String(amount), (hex) => {
            console.log('success transfer');
            console.log(hex, 'callback hash');
            resolve({
              status: 1,
              txid: hex
            })
          })
        })
      } else {
        return Promise.resolve({
          status: -1
        });
      }
    })
    .catch(err => {
      console.log(err,'err-2');
      return Promise.resolve({
        status: -2
      });
    });
  }else{
    return dbc_balance({
      user_wallet_address: account.address,
      language: "CN"
    })
    .then(res => {
      if (res.content > amount) {

        const apiCli = new api.neoCli.instance("https://neocli.dbchain.ai");
        //https://neocli.dbchain.ai
        //https://seed11.ngd.network:10331
        //const apiProvider = new api.neoscan.instance('https://api.neoscan.io/api/main_net')
        //  const apiProvider = new api.neoscan.instance('https://neocli.dbchain.ai')
        // console.log(apiProvider)
        const generator = nep5.abi.transfer(
          DBCHash,
          account.address,
          toAddress ? toAddress : testAddress,
          amount
        );
        // console.log(generator)
        const script = generator().str;
        // console.log(script)
        const config = {
          api: apiCli, // The API Provider that we rely on for balance and rpc information

          url: "https://neocli.dbchain.ai",

          account: account, // The sending Account
          // intents: undefined, // Additional intents to move assets
          script: script, // The Smart Contract invocation script
          gas: 0, //,
          fees: 0.001

        };
        // console.log(res.balance)
        return Neon.doInvoke(config).then(res => {
          if (res.response && res.response.result) {
            return Promise.resolve({
              status: 1,
              ...res
            });
          } else {
            return Promise.resolve({
              status: -2
            });
          }
        });
      } else {
        return Promise.resolve({
          status: -1
        });
      }
    })
    .catch(err => {
      return Promise.resolve({
        status: -2
      });
    });
  }
  
}

export function transfer12({
  toAddress = testAddress,
  amount

}) {
  return dbc_balance({
      user_wallet_address: account.address,
      language: "CN"
    })
    .then(res => {
      if (res.content > amount) {
        const param_sending_address = sc.ContractParam.byteArray(
          account.address,
          "address"
        );
        const param_receiving_address = sc.ContractParam.byteArray(
          toAddress,
          "address"
        );
        const param_amount = Neon.create.contractParam("Integer", amount * 1e8);
        // Build contract script
        const props = {
          scriptHash: DBCHash,
          operation: "transfer",
          args: [param_sending_address, param_receiving_address, param_amount]
        };
        const script = Neon.create.script(props);
        // Create transaction object
        let rawTransaction = new tx.InvocationTransaction({
          script: script,
          gas: 0
        });
        // Build input objects and output objects.
        rawTransaction.addAttribute(
          tx.TxAttrUsage.Script,
          u.reverseHex(wallet.getScriptHashFromAddress(account.address))
        );
        // Sign transaction with sender's private key
        const signature = wallet.sign(
          rawTransaction.serialize(false),
          account.privateKey
        );
        // Add witness
        rawTransaction.addWitness(
          tx.Witness.fromSignature(signature, account.publicKey)
        );
        // Send raw transactionconst
        // client = new rpc.RPCClient("https://neocli.dbchain.ai");
        //client = new rpc.RPCClient("http://117.51.149.193:10332");
        //  client = new rpc.RPCClient("http://117.51.149.193:10332");

        client.sendRawTransaction(rawTransaction).then(res => {
          if (res.response && res.response.result) {
            return Promise.resolve({
              status: 1
            });
          } else {
            return Promise.resolve({
              status: -2
            });
          }
        });
      } else {
        return Promise.resolve({
          status: -1
        });
      }
    })
    .catch(err => {
      return Promise.resolve({
        status: -2
      });
    });
}

export function transfer_other({
  toAddress = testAddress,
  amount,
  gas = 0
}) {
  return getBalance()
    .then(res => {
      if (res.balance > amount) {
        const apiProvider = new api.neoscan.instance(
          "https://api.neoscan.io/api/main_net"
        );
        // console.log(apiProvider)
        const generator = nep5.abi.transfer(
          DBCHash,
          account.address,
          toAddress ? toAddress : testAddress,
          amount
        );
        // console.log(generator)
        const script = generator().str;
        // console.log(script)
        const config = {
          api: apiProvider, // The API Provider that we rely on for balance and rpc information
          url: "https://seed2.cityofzion.io/",
          //  url: 'https://neocli.dbchain.ai',
          account: account, // The sending Account
          // intents: undefined, // Additional intents to move assets
          script: script, // The Smart Contract invocation script
          gas // Additional GAS for invocation.
        };
        // console.log(res.balance)
        return Neon.doInvoke(config);
      } else {
        this.$message({
          showClose: true,
          message: this.$t("dbc_lack_of_balance"),
          type: "error"
        });
        return Promise.reject({
          status: -1,
          msg: "DBC余额不足"
        });
      }
    })
    .then(res => {
      if (res.response && res.response.result) {
        console.log(res);
        return Promise.resolve({
          status: 1,
          msg: `you paied ${amount}DBC to ${toAddress}, txid is ${res.response.txid}`,
          ...res
        });
      } else {
        return Promise.reject({
          status: -2,
          msg: "dbc transfer fail~!"
        });
      }
    });
}
// initAccount()

// 设置cookie
export function setCookie(cname,cvalue,exdays)
{
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
// 获取cookie
export function getCookie(cname){
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
  }
  return "";
}
// 删除cookie
export function clearCookie(cname)
{
  // setCookie(cname, "", -1);
  document.cookie = cname + "=" + "; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
}
// 检查cookie
export function checkCookie(){
  var user=getCookie("username");
  if (user!=""){
      alert("欢迎 " + user + " 再次访问");
  }
  else {
      user = prompt("请输入你的名字:","");
        if (user!="" && user!=null){
          setCookie("username",user,30);
      }
  }
}
// 获取美元兑人民币价格
export function getUsdToRmb(){
  // 暂时固定
  return 6.6;
}
// 获取GPU订单前缀
export function getCongtuGpuOrderIdPrefix(){
  return "gpu";
}
// 获取CPU订单前缀
export function getCongtuCpuOrderIdPrefix(){
  return "cpu";
}
// 获取续租GPU订单前缀
export function getCongtuGpuRenewalOrderIdPrefix(){
  return "renewalGpu";
}
// 获取续租CPU订单前缀
export function getCongtuCpuRenewalOrderIdPrefix(){
  return "renewalCpu";
}
// 获取GPU支付宝商户订单号前缀
export function getCongtuGpuTradeNoPrefix(){
  // 5位数
  return "21101";
}
// 获取CPU支付宝商户订单号前缀
export function getCongtuCpuTradeNoPrefix(){
  // 5位数
  return "21102";
}
// 获取续租GPU支付宝商户订单号前缀
export function getCongtuGpuRenewalTradeNoPrefix(){
  // 5位数
  return "21103";
}
// 获取续租CPU支付宝商户订单号前缀
export function getCongtuCpuRenewalTradeNoPrefix(){
  // 5位数
  return "21104";
}

// 路由裁剪判断
export function getHref(url){
  const urlstr = url.toLocaleLowerCase()
  if (urlstr.indexOf('gpu') != -1) { // gpu
    return 'gpu'
  }else if (urlstr.indexOf('virtual') != -1) { // miner
    return 'virtual'
  }else if (urlstr.indexOf('miner') != -1) { // miner
    return 'miner'
  } else if (urlstr.indexOf('machine') != -1) { // mymachine
    return 'mymachine'
  } else if (urlstr.indexOf('wallet') != -1) { // mywallet
    return 'mywallet'
  } else if (urlstr.indexOf('help') != -1) { // help
    return 'help'
  } else if (urlstr.indexOf('audit') != -1) { // audit
    return 'audit'
  } 
}

import { getBlockTime } from './dot/api'


/**
 * getdate 返回时间格式 MM/DD HH:SS
 * @param time 时间戳
 */

function getdate(time) {
  let now = new Date(time),
    m = now.getMonth() + 1,
    d = now.getDate(),
    h = now.getHours(),
    s = now.getMinutes();
  return (m < 10 ? "0" + m : m) + "/" + (d < 10 ? "0" + d : d) + " " + (h < 10 ? "0" + h : h) +':'+(s < 10 ? "0" + s : s)
}

/**
 * getBlockchainTime 区块验证时间换算，返回派单验证时间段  以6S一个块计算
 * @param arr 开始时间时间块数组
 */
export const getBlockchainTime = async (BlockchainTime, arr) => {
  // let BlockchainTime = await getBlockTime().then( (res) => { return parseFloat(res.replace(/,/g, '')) }) // 获取链上块时间
  let nowDate = Date.parse(new Date()) // 获取当前时间的秒数
  let newarr = arr.map(el => {
    let timestart = (el - BlockchainTime)*30000 + nowDate
    let timeend = timestart+14400000
    return { 
      startTimestamp: timestart,
      endTimestamp: timeend,
      timestart: getdate(timestart), 
      timeend: getdate(timeend) 
    }
  })
  return newarr
}

/**
 * getHashCountDown 获取链上时间，返回抢单倒计时  以30S一个块计算
 * @param type 对应时间戳类型 1：hash倒计时 2：订单结束倒计时 3：提交原始结果倒计时
 * @param srt 抢单的时间块高
 */
export const getCountDown = async ( type, srt, BlockchainTime) => {
  // let BlockchainTime = await getBlockTime().then( (res) => { return parseFloat(res.replace(/,/g, '')) }) // 获取链上块时间
  let str1 = parseFloat(srt.replace(/,/g, ''))
  // let nowDate = Date.parse(new Date()) // 获取当前时间的秒数
  let timeend // 获取结束时间的块高
  if( type === 1 ){
    timeend = str1+115
  }else if(type === 2){
    timeend = str1+360
  }else{
    timeend = str1
  }
  let endTime = (timeend - BlockchainTime)*30 // 获取秒数倒计时
  return endTime
}


/**
 * GetRTime 时间戳倒计时 天 时分秒
 * @param t 差值时间戳
 */
export const GetRTime = (t) => {
  let iner;
  clearInterval(iner)
  iner = setInterval( ()=> {
    let d = 0, h = 0, m = 0, s = 0
    let time_str = ''
    if(t>=0){
      d=Math.floor(t/60/60/24);
      h=Math.floor(t/60/60%24);
      m=Math.floor(t/60%60);
      s=Math.floor(t%60);
      --t
      time_str = (d>0?d + 'Day ' : "") + (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s)
    }else{
      time_str = '00:00:00'
      clearInterval(iner)
    }
    return time_str
  }, 1000)
}


/**
 * getComputing_Power 时间戳倒计时 天 时分秒
 * 整机算力值=50*√（卡数）+内存/3.5+(√(cuda数量)*√（显存/10））*卡数
 * @param Gpu_Num 卡数
 * @param Mem 内存
 * @param Cuda cuda数量
 * @param M_value 显存
 */
 
export const getComputing_Power = (Gpu_Num, Mem, Cuda, M_value) => {
  var num = (Math.sqrt(Gpu_Num)*50+ Mem/3.5 + Math.sqrt(Cuda) * Math.sqrt(M_value/10)*Gpu_Num).toFixed(2)
  return num
}