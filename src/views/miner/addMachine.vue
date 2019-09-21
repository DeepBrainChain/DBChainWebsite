<template>
  <div class="addMc wrap1440">
    <h3 class="title">{{!isEditor ? $t('miner.addMc_Title') : $t('miner.addMc_editTitle')}}</h3>
    <template v-if="!isEditor">
      <div class="label">1.{{$t('miner.addMc_setupApp')}}</div>
      <div class="text mb30">
        {{$t('miner.addMc_msg_1[0]')}}(
        <a
          class="is-link"
          href="/DBC_install.docx"
          target="_blank"
        >{{$t('add_machine_download')}}</a>
        ),{{$t('miner.addMc_msg_1[1]')}}
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
    <!--<div class="label">
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

    </div>-->
    <div class="label mt20">{{isEditor ? 1:2}} .{{$t('add_machine_input_time')}}</div>
    <div class="text">
      <span>{{$t('add_machine_from')}}:</span>
      <mu-text-field
        class="mc-input"
        v-model.number="can_rent_start_time_later"
        style="width: 162px;"
        type="number"
      ></mu-text-field>
      {{$t('add_machine_from_time')}}
    </div>
    <div class="text">
      <span>{{$t('add_machine_to')}}:</span>
      <mu-text-field
        class="mc-input"
        v-model.number="end_rent_out_time_later"
        style="width: 162px;"
        type="number"
      ></mu-text-field>
      {{$t('add_machine_to_time')}}
    </div>
    <div class="label mt20">{{isEditor ? 2:3}}.{{$t('add_machine_input_id')}}</div>
    <div class="text">
      <span>{{$t('add_machine_machine_id')}}:</span>
      <mu-text-field
        :disabled="isEditor"
        class="mc-input"
        v-model.trim="machine_id"
        type="text"
        style="width: 700px;"
      ></mu-text-field>
    </div>
    <div class="label mt20">{{isEditor ? 3:4}}.{{$t('miner.addMc_price')}}</div>
    <div class="text">
      <span>{{$t('miner.addMc_msg_4[0]')}}:</span>
      <mu-text-field
        class="mc-input"
        v-model.number="gpu_price_dollar"
        style="width: 162px;"
        type="number"
      ></mu-text-field>
      $/{{$t('hour')}}
      <!--<span class="ml60">
        {{$t('miner.addMc_msg_4[1]')}}:
      </span>
      <mu-text-field class="mc-input" v-model.number="storePrice" style="width: 162px;" type="number"></mu-text-field>
      $/{{$t('hour')}}-->
    </div>
    <div class="subText">{{$t('add_machine_msg_tips')}}</div>
    <div class="label mt30">{{isEditor ? 4:5}}.{{$t('miner.addMc_dbc')}}</div>
    <div>
      <mu-text-field class="verityMail-input" v-model="code" type="number"></mu-text-field>
      <el-button
        class="ml20"
        type="primary"
        size="mini"
        :loading="isCoding"
        @click="getCode"
      >{{$t('miner.addMc_mail')}}</el-button>
    </div>

    <div class="btn-wrap mt100">
      <el-button
        :loading="isLoading"
        class="addMc-btn"
        type="primary"
        size="medium"
        @click="confirm"
      >{{$t('confirm')}}</el-button>
      <el-button class="addMc-btn blue ml20" size="medium" @click="back">{{$t('back')}}</el-button>
      <span class="info ml60">
        {{$t('miner.addMc_msg_6[0]')}}
        <span class="red">{{$t('miner.addMc_msg_6[1]')}}</span>
      </span>
    </div>
    <!--  choseDate dlg-->
    <el-dialog :visible.sync="isDateDlgOpen">
      <div slot="title">{{$t('miner.addMc_date')}}</div>
      <div class="dlg-content">
        <el-calendar v-model="curDate"></el-calendar>
        <div class="tools">
          <el-time-picker
            is-range
            value-format="HH:mm:ss"
            v-model="curDT.timeArea"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            :picker-options="{
              format: 'HH:mm'
            }"
          ></el-time-picker>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { add_or_modify, get_rentout_code } from "@/api";

import { getAccount } from "@/utlis";

export default {
  name: "addMachine",
  data() {
    return {
      isCoding: false,
      isLoading: false,
      curDate: new Date(),
      curDT: {
        date: "",
        timeArea: ""
      },
      minerKey: "",
      area: [
        {
          name: "北京时区",
          value: "1"
        }
      ],
      isDateDlgOpen: false,
      isWeekDlgOpen: false,
      selArea: "",
      period: "",

      gpu_price_dollar: "",
      code: "",
      can_rent_start_time_later: "",
      end_rent_out_time_later: "",
      machine_id: ""
    };
  },
  created() {
    this.gpu_price_dollar = (this.$route.query.gpu_price_dollar / 11) * 10;
    this.can_rent_start_time_later =
      this.$route.query.can_rent_start_time_later > 0
        ? 0
        : Math.floor(-this.$route.query.can_rent_start_time_later / 60);
    this.end_rent_out_time_later = Math.floor(
      this.$route.query.end_rent_out_time_later / 60
    );
    this.machine_id = this.$route.query.machine_id;
  },
  computed: {
    isEditor() {
      return this.$route.query.machine_id ? true : false;
    }
  },
  methods: {
    getCode() {
      if (!getAccount()) {
        this.$router.push(`/openWallet/${type}`);
        return;
      }
      if (this.machine_id.trim().length === 0) {
        this.$message({
          showClose: true,
          message: this.$t("add_machine_input_id"),
          type: "error"
        });
        return;
      }
      const address = getAccount().address;
      this.isCoding = true;
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      get_rentout_code({
        wallet_address: address,
        machine_id: this.machine_id,
        user_name_platform,
        language
      })
        .then(res => {
          if (res.status === 1) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
        })
        .finally(() => {
          this.isCoding = false;
        });
    },
    confirm() {
      this.isLoading = true;
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      add_or_modify({
        wallet_address: getAccount().address,
        machine_id: this.machine_id,
        gpu_price_dollar: this.gpu_price_dollar,
        can_rent_start_time_later: this.can_rent_start_time_later,
        end_rent_out_time_later: this.end_rent_out_time_later,
        code: this.code,
        user_name_platform,
        language
      })
        .then(res => {
          if (res.status === 1) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success"
            });
            this.$router.back();
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    back() {
      this.$router.back();
    }
  }
};
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
    color: #47495a;
  }

  .label {
    margin-bottom: 10px;
    font-size: 18px;
    line-height: 18px;
    color: #47495a;
  }

  .text {
    padding-left: 17px;
    font-size: 16px;
    line-height: 16px;
    color: rgba($color: #47495a, $alpha: 0.85);
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
    color: #6e8299;
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
      color: #dd5353;
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

.tools {
  text-align: center;
}
</style>
