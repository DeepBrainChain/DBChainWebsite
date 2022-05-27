<template>
  <div class="gpuVirtual">
    <div class="title">
      <span>{{$t("security.number")}}：{{ SecurityNumber }}</span>
      <el-button plain size="mini" @click="addSecuity" >{{ $t("security.add") }}</el-button>
    </div>
    <div class="table">
      <div class="tableli">
        <el-table
          :data="tableData"
          header-align="center"
          style="width: 100%">
          <el-table-column
            align="center"
            width="300"
            :label="$t('security.table1')">
            <template slot-scope="scope">
              <div v-if='!scope.row.openEdit'>{{scope.row.SGname}}</div>
              <div v-else>
                <el-input style="width: 200px;margin-right: 10px" size="mini" v-model="scope.row.changeSGname" placeholder=""></el-input>
                <el-button plain size="mini" @click.prevent="cancel(scope.row)">{{$t('cancel')}}</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            align="center"
            width="160"
            :label="$t('security.table2')">
          </el-table-column>
          <el-table-column
            prop="bindVM"
            align="center"
            :label="$t('security.table3')">
          </el-table-column>
          <el-table-column
            align="center"
            :label="$t('security.table4')">
            <template slot-scope="scope">
              <div>{{scope.row.rule.length}}</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="420"
            :label="$t('security.table5')">
            <template slot-scope="scope">
              <el-button
                plain
                size="mini"
                :loading='scope.row.btnloading'
                @click="cloneSecuity(scope.$index, scope.row)">{{$t('security.clone')}}</el-button>
              <el-button 
                plain
                size="mini"
                @click="securityRule(scope.$index, scope.row)">{{$t('security.rule')}}</el-button>
              <el-button
                plain
                size="mini"
                :loading='scope.row.btnloading1'
                @click="deleteSec(scope.$index, scope.row)">{{$t('security.deleteSec')}}</el-button>
              <el-button
                plain
                v-show="!scope.row.openEdit"
                size="mini"
                @click="editName(scope.$index, scope.row)">{{$t('security.editName')}}</el-button>
              <el-button
                plain
                v-show="scope.row.openEdit"
                size="mini"
                @click="confirmName(scope.$index, scope.row)">{{$t('security.confirmName')}}</el-button>
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
  </div>
</template>

<script>
import {
  getSecurity,
  changeName,
  deleteSG,
  cloneSG
} from "@/api";

import { getAccount, getdate1 } from "@/utlis";
import { getCurrentPair } from "@/utlis/dot"
import { mapState, mapMutations } from "vuex"
export default {
  name: "my_unlock_SecurityGroup",
  data() {
    return {
      wallet_address: (getAccount() && getAccount().address) || (getCurrentPair() && getCurrentPair().address),

      tableData: [],
      SecurityNumber: 0,
      btnloading: false,
    };
  },
  watch: {
    "$i18n.locale"() {
      
    },
  },
  beforeMount() {
  },
  activated() {
    this.getDate()
  },
  deactivated() {
    
  },
  computed: {
    ...mapState(["isNewWallet", "passward"]),
  },
  methods: {
    ...mapMutations(['setPassWard']),
    getDate() {
      getSecurity({ wallet: this.wallet_address }).then(res => {
        res.success&&res.content.map(el => {
          el.createTime = getdate1(el.createTime)
          el.openEdit = false
          el.changeSGname = ''
          el.btnloading = false
          el.btnloading1 = false
        })
        this.tableData = res.success ? res.content : []
        this.SecurityNumber = this.tableData.length
      })
    },
    addSecuity() {
      this.$router.replace({path: "myUnlockSGrule"});
    },
    editName(index, item) {
      item.openEdit = true
      item.changeSGname = item.SGname
    },
    cancel(el) {
      el.openEdit = false
      el.changeSGname = ''
    },
    confirmName(index, item) {
      if (item.changeSGname) {
        let data = {
          SGId: item._id,
          wallet: this.wallet_address,
          oldname: item.SGname,
          name: item.changeSGname
        }
        changeName(data).then(res => {
          if (res.success) {
            this.getDate()
          } else {
            if (res.code == -3) {
              this.$message.error(this.$t('security.cName_err1'))
            } else {
              this.$message.error(this.$t('security.cName_err'))
            }
          }
          item.openEdit = false
        })
      } else {
        item.openEdit = false
      }
    },
    cloneSecuity(index, item) {
      item.btnloading = true
      let data = {
        SGId: item._id,
        wallet: this.wallet_address
      }
      cloneSG(data).then( res => {
        if (res.success) {
          this.getDate()
          item.btnloading = false
        } else {
          if (res.code == -3) {
            this.$message.error(this.$t('security.err_reason1'))
          } else {
            this.$message.error(this.$t('security.err_reason2'))
          }
          item.btnloading = false
        }
      })
    },
    securityRule(index, item) {
      this.$router.replace({path: "myUnlockSGrule", query: {SGId: item._id}});
    },
    deleteSec(index, item) {
      if (item.bindVM > 0) {
        this.$message.error(this.$t('security.err_reason3'))
        return
      }
      item.btnloading1 = true
      this.$confirm(this.$t('security.deconfirm'), this.$t('security.deleteSec'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        let data = {
          SGId: item._id
        }
        deleteSG(data).then( res => {
          if (res.success) {
            this.getDate()
            item.btnloading1 = false
          } else {
            if (res.code == -3) {
              this.$message.error(this.$t('security.err_reason1'))
            } else if (res.code == -4) {
              this.$message.error(this.$t('security.err_reason3'))
            } else {
              this.$message.error(this.$t('security.err_reason4'))
            }
            item.btnloading1 = false
          }
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
