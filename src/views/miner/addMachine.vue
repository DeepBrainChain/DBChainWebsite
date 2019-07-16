<template>
  <div class="addMc wrap1440">
    <h3 class="title">{{!isEditor ? $t('miner.addMc_Title') : $t('miner.addMc_editTitle')}}</h3>
    <template v-if="!isEditor">
      <div class="label">
        1.{{$t('miner.addMc_setupApp')}}
      </div>
      <div class="text mb30">
        {{$t('miner.addMc_msg_1[0]')}}(<a class="is-link" href="https://www.gateio.co">https://www.gateio.co</a>),{{$t('miner.addMc_msg_1[1]')}}
      </div>
    </template>
    <!--<div class="label">
      2.{{$t('miner.addMc_bind')}}
    </div>
    <div class="text">
      {{$t('miner.addMc_msg_2')}}
    </div>
    <div class="input-wrap">
      <mu-text-field class="mb20" v-model.trim="minerKey" :label="$t('miner.addMc_msg_3')" label-float
                     :full-width="true"></mu-text-field>
    </div>-->
    <div class="label">
      {{!isEditor ? 2 : 1}}.{{$t('miner.addMc_area')}}
    </div>
    <div class="text">
      <label>{{$t('miner.addMc_area')}}：</label>
      <el-select style="width: 420px" v-model="selArea" placeholder="请选择">
        <el-option
          v-for="item in area"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="radio-wrap">
      <el-radio class="period-radio" v-model="period" :label="1">{{$t('miner.period_1')}}</el-radio>
      <el-radio class="period-radio" v-model="period" :label="2">{{$t('miner.period_2')}}</el-radio>
      <template v-if="period === 2">
        <el-button type="primary" size="mini" @click="isDateDlgOpen=true">
          {{$t('miner.addMc_date')}}
        </el-button>
        <el-button type="primary" size="mini">
          {{$t('miner.addMc_week')}}
        </el-button>
      </template>

    </div>
    <div class="label mt20">
      {{!isEditor ? 3 : 2}}.{{$t('miner.addMc_price')}}
    </div>
    <div class="text">
      <span>
        {{$t('miner.addMc_msg_4[0]')}}:
      </span>
      <mu-text-field class="mc-input" v-model.number="cpuPrice" style="width: 162px;" type="number"></mu-text-field>
      $/{{$t('hour')}}
      <span class="ml60">
        {{$t('miner.addMc_msg_4[1]')}}:
      </span>
      <mu-text-field class="mc-input" v-model.number="storePrice" style="width: 162px;" type="number"></mu-text-field>
      $/{{$t('hour')}}
    </div>
    <div class="subText">
      {{$t('miner.addMc_msg_5')}}
    </div>
    <div class="label mt30">
      {{!isEditor ? 4 : 3}}.{{$t('miner.addMc_dbc')}}
    </div>
    <div>
      <mu-text-field class="verityMail-input" v-model="dbcNum" type="number"></mu-text-field>
      <el-button class="ml20" type="primary" size="mini">
        {{$t('miner.addMc_mail')}}
      </el-button>
    </div>

    <div class="btn-wrap mt100">
      <el-button class="addMc-btn" type="primary" size="medium">{{$t('confirm')}}</el-button>
      <el-button class="addMc-btn blue ml20" size="medium">{{$t('back')}}</el-button>
      <span class="info ml60">
        {{$t('miner.addMc_msg_6[0]')}}
        <span class="red">{{$t('miner.addMc_msg_6[1]')}}</span>
      </span>
    </div>
    <!--  choseDate dlg-->
    <el-dialog
      :visible.sync="isDateDlgOpen">
      <div slot="title">{{$t('miner.addMc_date')}}</div>
      <div class="dlg-content">

      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "addMachine",
    data() {
      return {
        isEditor: this.$route.query.isEditor,
        minerKey: '',
        area: [
          {
            name: '北京时区',
            value: '1'
          }
        ],
        selArea: '',
        period: "",
        cpuPrice: undefined,
        storePrice: undefined,
        dbcNum: undefined,
        isDateDlgOpen: false,
        isWeekDlgOpen: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .addMc {
    padding: 30px;
    margin-bottom: 110px;
    background-color: $boxBgColor;

    .title {
      margin-top: 0;
      font-size: 20px;
      line-height: 20px;
      color: #47495A;
    }

    .label {
      margin-bottom: 10px;
      font-size: 18px;
      line-height: 18px;
      color: #47495A;
    }

    .text {
      padding-left: 17px;
      font-size: 16px;
      line-height: 16px;
      color: rgba($color: #47495A, $alpha: 0.85);
    }

    .subText {
      padding-left: 17px;
      font-size: 14px;
      color: #999;
    }

    .input-wrap {
      padding-left: 17px;
      width: 500px;
    }

    .radio-wrap {
      padding: 13px 0 13px 97px;
    }
  }

  .verityMail-input {
    display: inline-block;
  }

  .blue {
    border-color: $primaryColor;
    color: $primaryColor;
  }

  .mc-input {
    margin-bottom: 0;

    /deep/ .mu-text-field-input {
      text-align: center;
      font-size: 26px;
      color: #6E8299;
    }
  }

  .btn-wrap {
    display: flex;
    align-items: center;
    padding-left: 17px;

    .addMc-btn {
      width: 150px;
    }

    .info {
      display: inline-block;
      width: 514px;
      color: #666;
      line-height: 22px;

      .red {
        color: #DD5353;
      }
    }
  }

</style>
<style lang="scss">
  .period-radio {
    font-size: 16px;

    .el-radio__label {
      color: rgba($color: #333, $alpha: 0.85);
    }
  }
</style>
