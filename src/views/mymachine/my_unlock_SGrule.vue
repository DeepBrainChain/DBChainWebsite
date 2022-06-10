<template>
  <div class="gpuVirtual">
    <div class="title">
      <div>{{ SecurityName }} <span class="fs14">{{$t("security.desc", {rule_num: rulenum, vm_num: vmnum})}}</span></div>
      <el-button plain size="mini" @click="addRule" >{{ $t("security.addrule") }}</el-button>
    </div>
    <div class="table">
      <div class="tableli">
        <el-table
          :data="tableData"
          header-align="center"
          style="width: 100%">
          <el-table-column
            align="center"
            :label="$t('security.label1')">
            <template slot-scope="scope">
              <div>{{scope.row.direction == 'out'? $t('security.option1') : $t('security.option2')}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="protocol"
            align="center"
            :label="$t('security.label2')">
          </el-table-column>
          <el-table-column
            prop="port"
            align="center"
            :label="$t('security.label3')">
          </el-table-column>
          <el-table-column
            prop="object"
            align="center"
            :label="$t('security.label4')">
          </el-table-column>
          <el-table-column
            align="center"
            :label="$t('security.label6')">
            <template slot-scope="scope">
              <div>{{scope.row.strategy == 'accept'? $t('security.status1') : $t('security.status2')}}</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            :label="$t('security.label5')">
            <template slot-scope="scope">
              <div>{{scope.row.action == 'allow'? $t('security.status3') : $t('security.status4')}}</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            :label="$t('security.table5')">
            <template slot-scope="scope">
              <el-button
                plain
                size="mini"
                @click="edit(scope.$index, scope.row)">{{$t('security.operate1')}}</el-button>
              <el-button
                size="mini"
                plain
                @click="delect(scope.$index, scope.row)">{{$t('security.operate2')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- <div class="paging">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleChangepageSize"
        @current-change="handleCurrentChang"
      />
    </div> -->
    <!-- 续费 -->
    <el-dialog width='30%' :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item :label="$t('security.label1')" :label-width="formLabelWidth" prop="direction">
          <el-select v-model="form.direction" :placeholder="$t('security.label1')">
            <el-option :label="$t('security.option1')" value="out"></el-option>
            <el-option :label="$t('security.option2')" value="in"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('security.label2')" :label-width="formLabelWidth" prop="protocol">
          <el-select v-model="form.protocol" :placeholder="$t('security.label2')">
            <el-option :label="$t('security.option3')" value="tcp"></el-option>
            <el-option :label="$t('security.option4')" value="udp"></el-option>
            <el-option :label="$t('security.option5')" value="icmp"></el-option>
            <el-option label="ALL" value="all"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('security.label3')" :label-width="formLabelWidth" prop="port">
          <el-input :disabled='form.protocol == "all"' style="width: 221px" v-model="form.port"></el-input>
          <div style="font-size: 12px;line-height: 25px;">{{$t('security.addtip')}}</div>
        </el-form-item>
        <el-form-item :label="$t('security.label4')" :label-width="formLabelWidth" prop="object">
          <el-select v-model="form.object" :placeholder="$t('security.label4')">
            <el-option label="0.0.0.0/0" value="0.0.0.0/0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('security.label6')" :label-width="formLabelWidth" prop="object">
          <el-select v-model="form.strategy" :placeholder="$t('security.label6')">
            <el-option :label="$t('security.status1')" value="accept"></el-option>
            <el-option :label="$t('security.status2')" value="drop"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="batch" size="mini" plain :loading='btnloading'  @click="confirm">{{$t('confirm')}}</el-button>
        <el-button class="batch" size="mini" plain  @click="dialogFormVisible = false">{{$t('cancel')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getSecurity,
  createSecurity,
  deleteSGRule,
  editSGRule
} from "@/api";

import { getAccount } from "@/utlis";
import { getCurrentPair } from "@/utlis/dot"
import { mapState, mapMutations } from "vuex"
export default {
  name: "my_unlock_SecurityGroup",
  data() {
    return {
      wallet_address: (getAccount() && getAccount().address) || (getCurrentPair() && getCurrentPair().address),

      SGId: '',
      rulenum: 0,
      vmnum: 0,
      SecurityName: '',
      tableData: [],
      dialogFormVisible: false,
      btnloading: false,
      isEdit: false,
      title: '',
      form: {
        direction: 'in',
        protocol: 'tcp',
        port: '',
        object: '0.0.0.0/0',
        strategy: 'accept'
      },
      rules: {
        // direction: [
        //   { required: true, message: this.$t('security.addtip1'), trigger: 'change' }
        // ],
        // protocol: [
        //   { required: true, message: this.$t('security.addtip2'), trigger: 'change' }
        // ],
        // port: [
        //   { required: true, message: this.$t('security.addtip3'), trigger: 'blur' }
        // ],
        // object: [
        //   { required: true, message: this.$t('security.addtip4'), trigger: 'change' }
        // ]
      },
      formLabelWidth: '80px',
      editRuleId: ''
    };
  },
  watch: {
    "$i18n.locale"() {
      
    },
  },
  beforeMount() {
    
  },
  activated() {
    this.SGId = this.$route.query.SGId
    if (this.SGId) {
      this.getDate()
    } else {
      this.tableData = []
      this.SecurityName = 'SG'
      this.rulenum = 0
      this.vmnum = 0
    }
  },
  deactivated() {
    
  },
  computed: {
    ...mapState(["isNewWallet", "passward"]),
  },
  methods: {
    ...mapMutations(['setPassWard']),
    getDate() {
      getSecurity({ wallet: this.wallet_address, SGId: this.SGId }).then(res => {
        if (res.success) {
          let data = res.content
          this.tableData = data.rule
          this.SecurityName = data.SGname
          this.rulenum = data.rule.length
          this.vmnum = data.bindVM
        }
      })
    },
    addRule() {
      this.form.direction = 'in'
      this.form.protocol = 'tcp'
      this.form.port = ''
      this.form.strategy = 'accept'
      this.title = this.$t('security.addrule')
      this.dialogFormVisible = true
      this.isEdit = false
    },
    confirm() {
      this.btnloading = true
      if (this.isEdit) {
        let data = {
          SGId: this.$route.query.SGId,
          ruleId: this.editRuleId, 
          direction: this.form.direction,
          protocol: this.form.protocol,
          port: this.form.port == '' ? 'all': this.form.port,
          object: this.form.object,
          strategy: this.form.strategy
        }
        editSGRule(data).then(res => {
          if (res.success) {
            this.getDate()
          } else {
            this.$message.error(this.$t('security.err_reason5'))
          }
          this.btnloading = false
          this.dialogFormVisible = false
        })
      } else {
        let data = {
          SGId: this.SGId,
          wallet: this.wallet_address,
          direction: this.form.direction,
          protocol: this.form.protocol,
          port: this.form.port == '' ? 'all': this.form.port,
          object: this.form.object,
          strategy: this.form.strategy
        }
        createSecurity(data).then(res => {
          if (res.success) {
            this.$message.success(this.$t('security.addtip5'))
            if (this.SGId) {
              this.getDate()
            } else {
              setTimeout(() => {
                this.$router.replace({path: "myUnlockSecurityGroup"});
              }, 1000)
            }
          } else {
            this.$message.error(this.$t('security.addtip6'))
          }
          this.btnloading = false
          this.dialogFormVisible = false
        })
      }
    },
    edit(index, item) {
      this.title = this.$t('security.editrule')
      this.form = {...item}
      this.editRuleId = item._id
      this.dialogFormVisible = true
      this.isEdit = true
    },
    delect(index, item) {
      this.$confirm(this.$t('security.deconfirm1'), this.$t('security.deleteSec1'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        let data = {
          SGId: this.$route.query.SGId,
          ruleId: item._id
        }
        deleteSGRule(data).then( res => {
          if (res.success) {
            this.getDate()
          } else {
            this.$message.error(this.$t('security.err_reason4'))
          }
          item.btnloading1 = false
        })
      }).catch(() => {
        item.btnloading1 = false
        this.$message({
          type: 'info',
          message: this.$t('cancel')
        });          
      });
    }
  },
};
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
  .fs14{
    font-size: 14px;
  }
  .bindInfo {
    display: inline-block;
    font-size: 12px;
    min-height: 40px;
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

.bold{
  font-weight: bold;
}

.table{
  width: 100%;
  margin: 0 0 20px;
  .checkAll{
    width: 100%;
    padding: 10px;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    .batch{
      margin-left: 20px;
    }
  }
  .tableli{
    width: 100%;
    // padding: 10px 0;
    font-size: 14px;
    box-sizing: border-box;
    border: 1px solid #999;
    margin-bottom: 15px;
    .li_list1{
      padding: 0 10px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 10px;
      &:first-child{
        justify-content: space-between;
      }
      span{
        word-break: break-all;
        display: inline-block;
        &.Machine_id {
          padding: 10px 5px;
          box-sizing: border-box;
          border: 1px solid #999;
        }
        &.time_left {
          margin-left: 20px;
        }
        i{
          font-style: normal;
          color: #195d91;
        }
      }
      .countTime{
        span{
          margin: 0;
        }
      }
    }
    .pay-wrap{
      padding: 10px 20px;
      border-top: 1px solid #e1e6ec;
      font-size: 14px;
      line-height: 28px;
      color: #666;
      background-color: #f6f9fc;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      div{
        width: 33%;
        font-size: 14px;
      }
    }
    .li_list2{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 12px 10px 0;
      border-top: 1px solid #e1e6ec;
      border-bottom: 1px solid #e1e6ec;
      span{
        width: 20%;
        margin-bottom: 12px;
        word-break: break-all;
        &.width50{
          width: 50%;
        }
        &.width40{
          width: 40%;
        }
        &.width30{
          width: 30%;
        }
        &.bold{
          font-size: 18px;
          font-weight: bold;
        }
        .color{
          color: #f56c6c;
        }
        i{
          font-style: normal;
          color: #195d91;
        }
        &.operators{
          display: flex;
          align-items: center;
          .opera{
            flex: 1;
            display: flex;
            margin: 0 0 0 5px;
            flex-direction: column;
          }
        }
      }
    }
    .virtual{
      padding: 10px 20px;
      border-bottom: 1px solid #e1e6ec;
      .v-list{
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #e1e6ec;
        &:last-child{
          margin: 0;
        }
        .li-top{
          display: flex;
          align-items: center;
          padding-bottom: 5px;
          justify-content: space-between;
          border-bottom: 1px solid #e1e6ec;
          .left{
            width: 300px;
          }
        }
        .li-bottom{
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding-top: 10px;
          span{
            width: 25%;
            margin-bottom: 6px;
            word-break: break-all;
            &.width50{
              width: 50%;
            }
            &.width40{
              width: 40%;
            }
            &.width30{
              width: 30%;
            }
            &.bold{
              font-size: 18px;
              font-weight: bold;
            }
            .color{
              color: #f56c6c;
            }
            i{
              font-style: normal;
              color: #195d91;
            }
          }
        }
      }
    }
    .tools-head{
      padding: 10px 10px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
.paging {
  .el-pagination {
    display: flex;
    justify-content: center;
  }
}

.useTime{
  width: 100%;
  display: flex;
  margin-bottom: 5px;
  align-items: center;
  justify-content: space-between;
  .el-input{
    margin: 0 10px;
    width: 80px;
  }
  span{
    &.width12{
      display: inline-block;
      width: 120px;
    }
    &.color{
      color: #f56c6c;
    }
  }
}
.ruleForm{
  .ruleForm_input{
    width: 300px;
  }
}

.order_list{
  width: 100%;
  padding: 10px;
  .order_li{
    display: flex;
    padding: 5px 10px;
    margin-bottom: 10px;
    align-items: center;
    border: 1px solid #999;
    justify-content: space-between;
    background-color: #f6f9fc;
    &:last-child{
      margin: 0;
    }
    .li-left{
      padding: 10px 20px;
      font-size: 14px;
      line-height: 28px;
      color: #666;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      div{
        width: 33%;
        font-size: 14px;
        span{
          font-weight: bold;
        }
      }
    }
  }
}


@media screen and (max-width: 1600px) {
  .table{
    .tableli{
      font-size: 12px;
      .li_list2{
        span{
          &.bold{
            font-size: 14px;
          }
        }
      }
    }
  }
}

</style>
