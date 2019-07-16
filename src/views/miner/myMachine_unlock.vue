<template>
  <div>
    <div class="title">
      <span>{{$t('gpu.myMachineTitle')}}：{{$t('gpu.pcs')}} <i class="iconfont iconwenhao ml15"></i></span>
      <div>
        <div v-if="true" class="bind">
          <el-button size="small" plain @click="openDlgMail(true)">{{$t('gpu.bindMail')}}</el-button>
          <span class="bindInfo ml10" v-html="$t('gpu.bindMailInfo')"></span>
        </div>
        <div v-else class="binding">
          <span class="bindingInfo">绑定的邮箱：xxxxx@xxxxx</span>
          <el-button class="ml10" size="mini" plain @click="openDlgMail(false)">{{$t('gpu.modifyMail')}}</el-button>
        </div>
        <div class="bind mt20">
          <el-button size="small" plain @click="pushAddMachine()">{{$t('miner.rent')}}</el-button>
          <span class="bindInfo ml10" v-html="$t('miner.mc_msg_1')"></span>
        </div>
      </div>

    </div>
    <div class="border-content">
      <div class="tools-head">
        <div class="l-wrap">
          <span class="tools-title">{{$t('gpu.mcStatusTitle')}}：<b>{{$t('gpu.machineOnLine')}}</b></span>
          <span class="fs14 cGray">{{$t('gpu.remainingTime')}}：xxx{{$t('day')}}xxx{{$t('hour')}}</span>
        </div>
        <div class="r-wrap">
        </div>
      </div>
      <div class="pay-wrap">
        <div class="rate-head">
          <div></div>
          <div class="flex right vCenter">
            <el-rate v-model="rateValue"></el-rate>
            <span>7.7{{$t('scores')}}</span>
          </div>
        </div>
        <div>

        </div>
        <div>
          <span class="td">{{$t('gpu.payDBCs')}}：2345</span>
          <span class="td">{{$t('gpu.userTime')}}：120 h 32 m</span>
          <span class="td">{{$t('gpu.storeSpace')}}： xxx G</span>
        </div>
        <div>
<!--          <span class="td">{{$t('gpu.gpuRemainTime')}}（DBC）：422</span>-->
          <span class="td">{{$t('gpu.payPrice')}}：$ 0.9</span>
          <span class="td">{{$t('gpu.gpuBilling')}}：45 DBC/hr</span>
          <span class="td">{{$t('gpu.storeBilling')}}：45 DBC/hr</span>
        </div>
        <div>
          <span class="td">{{$t('gpu.actualPrice')}}：123 DBC</span>
          <span class="td">{{$t('gpu.gpuCost')}}：122 DBC</span>
          <span class="td">{{$t('gpu.storeCost')}}：120 H 32 M</span>
<!--          <span class="td">{{$t('gpu.storeBilling')}}（DBC）：45/hr</span>-->
        </div>
        <div>
<!--          <span class="td">{{$t('gpu.storeRemainTime')}}（DBC）：422</span>-->
          <span class="td">{{$t('gpu.currentRemaining')}}：123 DBC</span>
        </div>
      </div>
      <div class="status-wrap">
        <div class="flex status-title">
          <span class="fs16">3THJDJDHJK2080 Ti</span>
          <span class="cPrimaryColor">ID : <a class="is-link" href="javascript:" @click="pushDetail">SDSDFFGDFGERDVCXGFDGRSDG</a></span>
        </div>
        <div class="flex">
          <div class="td">
            <div>z10pe: </div>
            <div class="c333">pcie 3.0 ; 18x ; 5.5Gb/S</div>
          </div>
          <div class="td">
            <div>
              <span class="upSpeed">
                <i class="iconfont iconjiantou"></i>
              </span>
              <span>23.8 Mbps</span>
            </div>
            <div>
              <span class="downSpeed">
                <i class="iconfont iconjiantou"></i>
              </span>
              <span>23.8 Mbps</span>
            </div>
          </div>
          <div class="td">
            <div>
              max duration :
            </div>
            <div class="c333">
              1mon ; 28d
            </div>
          </div>
          <div class="td">
            <div></div>
            <div class="c333">1mon ; 28d</div>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <div>36.8TFLOPS: </div>
            <div class="c333">MAX CUDA:100</div>
          </div>
          <div class="td">
            <div>
              11.0gb
            </div>
            <div class="c333">
              532gb/S
            </div>
          </div>
          <div class="td">
            <div>
              max XEON E52620 V3 :
            </div>
            <div class="c333">
              12.0/24 CORES 64 / 128GB
            </div>
          </div>
          <div class="td">
            <div>STORAGE : </div>
            <div class="c333">2106 MB/S 678GB</div>
          </div>
        </div>
        <div class="flex">
          <div class="td">
            <div>36.8 DLPERF: </div>
            <div class="c333">36.8 DLPERF:</div>
          </div>
          <div class="td">
            <div></div>
            <div class="c333">10/11</div>
          </div>
          <div class="td"></div>
          <div class="td"></div>
        </div>

      </div>
      <div class="tools-head">
        <div class="l-wrap">
          <span class="tools-title small">{{$t('gpu.machineLoginInfo')}}：ssh -p 20049 root@116.85.24.172，{{$t('password')}}：xxxxx</span>
        </div>
        <div class="r-wrap">
<!--          <el-button style="width: 86px" class="tool-btn blue" size="mini" @click="dlgReload_open = true">{{$t('gpu.reload')}}</el-button>-->
<!--          <el-button class="tool-btn blue" size="mini" @click="dlgHD_open = true">{{$t('gpu.increaseHD')}}</el-button>-->
<!--          <el-button class="tool-btn blue" style="width: 86px" size="mini" @click="dlgUnsubscribe_open=true">{{$t('unsubscribe')}}</el-button>-->
          <el-button class="tool-btn blue" size="mini" style="width: 86px" @click="pushAddMachine(true)">{{$t('reEdit')}}</el-button>
        </div>
      </div>
    </div>
<!--    reload-dlg-->
    <dlg-reload :open.sync="dlgReload_open"></dlg-reload>
<!--    increaseHD-dlg-->
    <dlg-hd :open.sync="dlgHD_open"></dlg-hd>
<!--    bindMail-dlg-->
    <dlg-mail :open.sync="dlgMail_open" :is-new-mail="isNewMail"></dlg-mail>
<!--    Unsubscribe-->
    <dlg-unsubscribe :open.sync="dlgUnsubscribe_open"></dlg-unsubscribe>
    <dlg-rate :open.sync="dlgRate_open"></dlg-rate>
  </div>
</template>

<script>
  import DlgReload from '@/components/machine/dlg_reload'
  import DlgHd from '@/components/machine/dlg_increaseHD'
  import DlgMail from '@/components/machine/dlg_bindMail'
  import DlgUnsubscribe from '@/components/machine/dlg_unsubscribe'
  import DlgRate from '@/components/machine/dlg_rate'

  export default {
    name: "myMachine",
    data () {
      return {
        rateValue: undefined,
        dlgReload_open: false,
        dlgHD_open: false,
        dlgMail_open: false,
        dlgUnsubscribe_open: false,
        dlgRate_open: false,
        isNewMail: false
      }
    },
    methods:{
      pushAddMachine(isEditor) {
        this.$router.push({
          path:'/addMc',
          query: {
            isEditor
          }
        })
      },
      pushDetail() {
        this.$router.push('/machineDetail')
      },
      openDlgMail(isNewMail) {
        this.isNewMail = isNewMail
        this.dlgMail_open = true
      }
    },
    components: {
      DlgReload,
      DlgHd,
      DlgMail,
      DlgUnsubscribe,
      DlgRate
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/css/variables.scss";

  .title {
    display: flex;
    justify-content: space-between;
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 20px;
    line-height: 20px;
    .bindInfo {
      display: inline-block;
      font-size: 12px;
      color: $textColor_def;
      vertical-align: middle;
    }
    .bindingInfo {
      font-size: 12px;
      color: $textColor_def;
      vertical-align: middle;
    }
    .iconwenhao {
      color: $primaryColor;
    }
  }

  .border-content {
    border: 1px solid #979797;
  }

  .rate-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tools-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;

    .tools-title {
      font-size: 16px;
      color: #050D68;
      &.small {
        font-size: 14px;
        color: #333;
      }
    }
    .tool-btn{
      font-size: 14px;
      &.blue {
        border-color: $primaryColor;
        color: $primaryColor;
      }
    }
    .cGray {
      padding-left: 44px;
    }
  }

  .pay-wrap {
    padding: 10px 20px;
    border-top: 1px solid #E1E6EC;
    font-size: 14px;
    line-height: 28px;
    color: #666;
    background-color: #F6F9FC;

    .td {
      display: inline-block;
      width: 33.3%;
    }
  }
  .status-wrap{
    padding: 15px 20px 12px;
    border-top: 1px solid #E1E6EC;
    border-bottom: 1px solid #E1E6EC;
    color: #666;
    font-size: 14px;
    .status-title {
      padding-bottom: 17px;
    }
    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
      .td {
        width: 25%;
        line-height: 24px;
        .upSpeed,.downSpeed {
          display: inline-block;
          height: 16px;
          line-height: 16px;
          margin-right: 8px;
          border: 1px dashed #666;
          font-size: 14px;
        }
        .downSpeed {
          transform: rotateZ(180deg);
        }
        div{
          height: 24px;
        }
      }
    }
  }
</style>
