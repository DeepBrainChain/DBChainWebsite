<template>
  <div class="addMc wrap1440">
    <h3 class="title">{{!isEditor ? $t('miner.addMc_Title') : $t('miner.addMc_editTitle')}}</h3>
    <template v-if="!isEditor">
      <div class="label">1.{{$t('miner.addMc_setupApp')}}</div>
      <div class="text mb30">
        {{$t('miner.addMc_msg_1[0]')}}(
        <a
          class="is-link"
          href="https://kdocs.cn/l/sCsGPLlCl?f=111"
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
    </div>
    <div class="subText">&nbsp;&nbsp;</div>
    <div class="text">
      <span>{{$t('month_discount')}}：</span>

      <el-select class="time-select ml10" v-model="digital90" style="width: 360px" size="small">
        <el-option
          v-for="item in digitalOptions"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="subText">&nbsp;&nbsp;</div>
    <div class="text">
      <span>{{$t('quarter_discount')}}：</span>

      <el-select class="time-select ml10" v-model="digital85" style="width: 360px" size="small">
        <el-option
          v-for="item in digitalOptions"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="subText">&nbsp;&nbsp;</div>
    <div class="text">
      <span>{{$t('year_discount')}}：</span>
      <el-select class="time-select ml10" v-model="digital80" style="width: 360px" size="small">
        <el-option
          v-for="item in digitalOptions"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="subText">{{$t('add_machine_msg_tips')}}</div>
    <div class="label mt20" v-if="display_select_rent_platform">
      <span>{{$t('rentout_machine_ai_platform_select')}}:</span>
      <el-select
        class="time-select ml10"
        v-model="rentout_machine_platform_select"
        style="width: 360px"
        size="small"
        @change="get_dbc_count"
      >
        <el-option
          v-for="item in rentout_machine_platformOptions"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
      <span class="subText">&nbsp;&nbsp;{{$t('rentout_machine_ai_platform_select_info')}}</span>
    </div>
    <div class="label mt20">
      <span>{{isEditor ? 4:5}}.{{$t('rentout_machine_classification')}}:</span>
      <span
        class="time-select ml10"
        v-if="this.$route.query.success_pay_deposite && this.$route.query.machine_mode===1 "
      >{{$t('rentout_machine_high')}}</span>
      <el-select
        class="time-select ml10"
        v-model="rentout_machine_classification"
        style="width: 360px"
        size="small"
        v-else-if="this.$route.query.error_rent_count===0 &&this.$route.query.total_time_be_used>=8640 "
      >
        <el-option
          v-for="item in rentout_machine_classificationOptions"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
      <span class="time-select ml10" v-else>{{$t('rentout_machine_normal')}}</span>
    </div>
    <div class="subText">{{$t('high_stability_conditions0')}}</div>
    <div class="subText">{{$t('high_stability_conditions1')}}</div>
    <div class="subText">{{$t('high_stability_conditions2')}}</div>
    <div class="subText">{{$t('high_stability_conditions3',{dbc_count: dbc_deposite_count})}}</div>
    <div class="subText">{{$t('high_stability_conditions4')}}</div>
    <div
      class="label mt30"
      v-if="rentout_machine_classification===1&&this.$route.query.rentout_deposite_dbc_count===0 "
    >
      <span>&nbsp;&nbsp;{{$t('input_deposite_dbc_count')}}:&nbsp;&nbsp;</span>
      <mu-text-field class="mc-input" v-model="dbc_count" style="width: 162px;" type="number"></mu-text-field>
      <span
        class="time-select ml10"
        v-if="this.$route.query.gpu_count!=0"
      >{{$t('deposite_dbc_count_total')}}：{{dbc_count*this.$route.query.gpu_count}}</span>
      <span
        class="subText"
      >&nbsp;&nbsp;{{$t('dlg_lease_wallet_balance')}}: {{(this.$store.state.balance).toFixed(4)}}</span>
    </div>
    <div
      class="label mt30"
      v-if="rentout_machine_classification===1&&this.$route.query.rentout_deposite_dbc_count!==0 "
    >
      <span>&nbsp;&nbsp;{{$t('deposite_dbc_count')}}:&nbsp;&nbsp;{{dbc_count}}</span>

      <span
        class="time-select ml10"
        v-if="this.$route.query.gpu_count!=0"
      >{{$t('deposite_dbc_count_total')}}：{{dbc_count*this.$route.query.gpu_count}}</span>
      <span
        class="subText"
      >&nbsp;&nbsp;{{$t('dlg_lease_wallet_balance')}}: {{(this.$store.state.balance).toFixed(4)}}</span>
    </div>

    <div class="label mt20">
      <span>{{isEditor ? 5:6}}.{{$t('rentout_machine_type')}}:</span>
      <el-select
        class="time-select ml10"
        v-model="rentout_machine_type"
        style="width: 360px"
        size="small"
        @change="get_dbc_count "
      >
        <el-option
          v-for="item in rentout_machine_typeOptions"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
      <span class="subText">&nbsp;&nbsp;{{$t('rentout_machine_type_info')}}</span>
    </div>
    <div
      class="label mt30"
      v-if="rentout_machine_classification===0&&this.$route.query.rentout_deposite_dbc_count===0 && rentout_machine_type===1"
    >
      <span>&nbsp;&nbsp;{{$t('input_deposite_dbc_count')}}:&nbsp;&nbsp;</span>
      <mu-text-field class="mc-input" v-model="dbc_count" style="width: 162px;" type="number"></mu-text-field>
      <span
        class="time-select ml10"
        v-if="this.$route.query.gpu_count!=0"
      >{{$t('deposite_dbc_count_total')}}：{{dbc_count*this.$route.query.gpu_count}}</span>
      <span
        class="subText"
      >&nbsp;&nbsp;{{$t('dlg_lease_wallet_balance')}}: {{(this.$store.state.balance).toFixed(4)}}</span>
    </div>

    <div
      class="label mt30"
      v-if="rentout_machine_classification===0&&this.$route.query.rentout_deposite_dbc_count!==0 && rentout_machine_type===1"
    >
      <span>&nbsp;&nbsp;{{$t('deposite_dbc_count')}}:&nbsp;&nbsp;{{dbc_count}}</span>

      <span
        class="time-select ml10"
        v-if="this.$route.query.gpu_count!=0"
      >{{$t('deposite_dbc_count_total')}}：{{dbc_count*this.$route.query.gpu_count}}</span>
      <span
        class="subText"
      >&nbsp;&nbsp;{{$t('dlg_lease_wallet_balance')}}: {{(this.$store.state.balance).toFixed(4)}}</span>
    </div>

    <div class="label mt20">{{isEditor ? 6:7}}.{{$t('your_country')}}</div>
    <div class="subText">&nbsp;&nbsp;</div>
    <div class="form">
      <el-select class="time-select ml10" v-model="country_code" style="width: 240px" size="small">
        <el-option
          v-for="item in countrysOptions"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>

    <div class="label mt30">{{isEditor ? 7:8}}.{{$t('miner.addMc_dbc')}}</div>

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
import {
  add_or_modify,
  add_or_modify_new2,
  get_rentout_code,
  get_country_list,
  dbc_deposite_count_new
} from "@/api";

import { getAccount } from "@/utlis";
import { mapState } from "vuex";
export default {
  name: "addMachine",
  open: Boolean,
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

      gpu_price_dollar: 0.1,
      code: "",
      can_rent_start_time_later: "",
      end_rent_out_time_later: "",
      machine_id: "",
      country_code: "CN",
      country: this.$t("my_machine_china"),
      digital90: "90",
      digital85: "85",
      digital80: "80",
      rentout_machine_type: 0,
      rentout_machine_classification: 0,

      dbc_count: "0",

      rentout_deposite_dbc_count_every_gpu: 0,
      dbc_deposite_count: 0,
      rentout_machine_platform_select: 0, //0:代表所有云平台，1:只在当前平台
      display_select_rent_platform: false
    };
  },

  created() {
    this.gpu_price_dollar = (this.$route.query.gpu_price_dollar / 11) * 10;
    if (this.gpu_price_dollar <= 0) {
      this.gpu_price_dollar = 0.1;
    }
    if (this.$route.query.gpu_rentout_whole) {
      this.rentout_machine_type = 1;
    }

    this.can_rent_start_time_later =
      this.$route.query.can_rent_start_time_later > 0
        ? 0
        : Math.floor(-this.$route.query.can_rent_start_time_later / 60);
    this.end_rent_out_time_later = Math.floor(
      this.$route.query.end_rent_out_time_later / 60
    );
    this.machine_id = this.$route.query.machine_id;
    this.country_code = this.$route.query.country_code;
    if (
      !this.$route.query.discount_month ||
      this.$route.query.discount_month === 0
    ) {
      this.digital90 = "100";
    } else {
      this.digital90 = this.$route.query.discount_month + "";
    }
    if (
      !this.$route.query.discount_quarter ||
      this.$route.query.discount_quarter === 0
    ) {
      this.digital85 = "100";
    } else {
      this.digital85 = this.$route.query.discount_quarter + "";
    }
    if (
      !this.$route.query.discount_year ||
      this.$route.query.discount_year === 0
    ) {
      this.digital80 = "100";
    } else {
      this.digital80 = this.$route.query.discount_year + "";
    }

    if (this.$route.query.machine_mode === 1) {
      this.rentout_machine_classification = 1;
    }
    if (this.$t("display_select_rent_platform") === "1") {
      this.display_select_rent_platform = true;
    }
    this.get_dbc_count();
  },
  computed: {
    isEditor() {
      return this.$route.query.machine_id ? true : false;
    },
    countrysOptions() {
      let opts = [];
      let countrys = [];
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      get_country_list({
        user_name_platform,
        language
      }).then(res => {
        if (res.status === 1) {
          countrys = res.content;
          this.$forceUpdate();
          for (let i = 0; i <= countrys.length; i++) {
            if (language === "CN") {
              opts.push({
                name: countrys[i].chineseName,
                value: countrys[i].simpleNameString
              });

              if (this.country_code === countrys[i].simpleNameString) {
                this.country = countrys[i].chineseName;
              }
            } else {
              opts.push({
                name: countrys[i].englishName,
                value: countrys[i].simpleNameString
              });
              if (this.country_code === countrys[i].simpleNameString) {
                this.country = countrys[i].englishName;
              }
            }
          }
        }
      });

      return opts;
    },
    digitalOptions() {
      let opts = [];
      var tags = [];
      var value = [];
      let digital_tag = "100%@95%@90%@85%@80%@75%@70%@65%@60%@55%@50%";
      let value_tag = "100@95@90@85@80@75@70@65@60@55@50";
      tags = digital_tag.split("@");
      value = value_tag.split("@");
      for (let i = 0; i < tags.length; i++) {
        opts.push({
          name: tags[i],
          value: value[i]
        });
      }

      return opts;
    },
    rentout_machine_typeOptions() {
      let opts = [];
      var tags = [];

      let rentout_machine_tag = this.$t("rentout_machine_tag");

      tags = rentout_machine_tag.split("@");

      for (let i = 0; i < tags.length; i++) {
        opts.push({
          name: tags[i],
          value: i
        });
      }

      return opts;
    },

    rentout_machine_platformOptions() {
      let opts = [];
      var tags = [];

      let rentout_machine_platform_tag = this.$t(
        "rentout_machine_platform_tag"
      );

      tags = rentout_machine_platform_tag.split("@");

      for (let i = 0; i < tags.length; i++) {
        opts.push({
          name: tags[i],
          value: i
        });
      }

      return opts;
    },
    rentout_machine_classificationOptions() {
      let opts = [];
      var tags = [];

      let rentout_machine_classification_tag = this.$t(
        "rentout_machine_classification_tag"
      );

      tags = rentout_machine_classification_tag.split("@");

      for (let i = 0; i < tags.length; i++) {
        opts.push({
          name: tags[i],
          value: i
        });
      }

      return opts;
    }
  },
  methods: {
    get_dbc_count() {
      let whole = false;
      if (this.rentout_machine_type === 1) {
        whole = true;
      }

      let only_pool_display = false;
      if (this.rentout_machine_platform_select === 1) {
        only_pool_display = true;
      }

      dbc_deposite_count_new({
        gpu_rentout_whole: whole,
        only_pool_display: only_pool_display
      }).then(res => {
        if (res.status === 1) {
          this.dbc_deposite_count = res.content;
          this.dbc_count = this.$route.query.rentout_deposite_dbc_count;
          if (this.dbc_count == 0) {
            this.dbc_count = this.dbc_deposite_count;
          }
        }
      });
    },

    getCode() {
      if (!getAccount()) {
        //  this.$router.push(`/openWallet/${type}`);
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

      if (
        this.rentout_machine_classification === 0 &&
        this.rentout_machine_type === 0
      ) {
        this.rentout_deposite_dbc_count_every_gpu = 0;
      } else {
        this.rentout_deposite_dbc_count_every_gpu = this.dbc_count;
      }

      if (this.country_code === "") {
        this.country_code = "CN";
      }
      let rentout_machine_type_local = false;
      if (this.rentout_machine_type === 0) {
        rentout_machine_type_local = false;
      } else {
        rentout_machine_type_local = true;
      }

      let only_pool_display = false;
      if (this.rentout_machine_platform_select === 1) {
        only_pool_display = true;
      }

      add_or_modify_new2({
        wallet_address: getAccount().address,
        machine_id: this.machine_id,
        gpu_price_dollar: this.gpu_price_dollar,
        can_rent_start_time_later: this.can_rent_start_time_later,
        end_rent_out_time_later: this.end_rent_out_time_later,
        code: this.code,
        user_name_platform,
        language,
        country_code: this.country_code,

        discount_month: this.digital90,
        discount_quarter: this.digital85,
        discount_year: this.digital80,
        gpu_rentout_whole: rentout_machine_type_local,
        machine_mode: this.rentout_machine_classification,
        rentout_deposite_dbc_count_every_gpu: this
          .rentout_deposite_dbc_count_every_gpu,
        only_pool_display: only_pool_display
      })
        .then(res => {
          if (res.status === 1) {
            // var tip = res.msg + String(res.content) + "h";
            //    this.$message({
            //     showClose: true,
            //     message: res.msg,
            //     type: "success"
            //   });
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
    }
    // back() {
    // this.$router.back();
    // }
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

  ::v-deep(.mu-text-field-input) {
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
