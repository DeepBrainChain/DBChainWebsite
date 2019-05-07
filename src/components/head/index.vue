<template>
  <div class="head">
    <div class="content wrap1200">
      <img class="logo" src="~@/assets/imgs/logo@1x.png" alt="">
      <router-link class="item" to="/">{{$t('heads.home')}}</router-link>
      <router-link class="item" to="/gpu">{{$t('heads.gpu')}}</router-link>
      <router-link class="item" to="/trade">{{$t('heads.network')}}</router-link>
      <router-link class="item" to="/home">{{$t('heads.miner')}}</router-link>
      <router-link class="item" to="/home">{{$t('heads.talk')}}</router-link>
      <router-link class="item" to="/home">{{$t('heads.api')}}</router-link>
      <router-link class="item" to="/home">{{$t('heads.help')}}</router-link>
      <el-dropdown class="drop-lang" trigger="click" v-on:command="drop_command">
        <span class="el-dropdown-link">
          <i class="icon-language"></i><span>{{curLang}}</span><i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="EN">EN</el-dropdown-item>
          <el-dropdown-item command="CN">CN</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Head",
    data() {
      return {
        curLang: "CN"
      }
    },
    methods: {
      drop_command(lang) {
        this.$loadLanguageAsync(lang).then(() => {
          this.curLang = lang
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .head {
    padding-top: 112px;
    padding-bottom: 110px;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      margin-right: 169px;
    }
    .item {
      height: 20px;
      line-height: 20px;
      font-size: 16px;
      font-weight: 700;
      &:hover {
        color: #fff;
      }
    }
    .drop-lang {
      cursor: pointer;
    }
    .el-dropdown-link {
      .icon-language {
        display: inline-block;
        width: 14px;
        height: 14px;
        vertical-align: middle;
        margin-right: 6px;
        background: url(~@/assets/imgs/language@1x.png) no-repeat;
      }
      span, i {
        vertical-align: middle;
      }
      .el-icon-caret-bottom {
        font-size: 8px;
      }
    }
    * {
      /*color: #f7f7fb;*/
      color:rgba(255,255,255,0.90);
    }
  }
</style>
