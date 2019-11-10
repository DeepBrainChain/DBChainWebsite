<template>
  <div class="head">
    <div class="content wrap1440">
      <!--    <img class="logo" src="~@/assets/imgs/logo@1x.png"/>-->
      <el-dropdown
        class="item"
        :class="{active: menuName === 'home' || menuName === 'minerHome'}"
        trigger="click"
        v-on:command="drop_home"
      >
        <span class="el-dropdown-link">
          <span>{{$t('heads.home')}}</span>
          <i class="el-icon-caret-bottom ml5"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="home">租用GPU</el-dropdown-item>
          <el-dropdown-item command="minerHome">出租GPU</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!--      <a class="item" :class="{active: menuName === 'home'}" @click="pushMenu('home')">{{$t('heads.home')}}</a>-->
      <a
        class="item"
        :class="{active: menuName === 'gpu'}"
        @click="pushMenu('gpu')"
      >{{$t('heads.gpu')}}</a>
      <!--      <router-link class="item" to="/network">{{$t('heads.network')}}</router-link>-->
      <a
        class="item"
        :class="{active: menuName === 'miner'}"
        @click="pushMenu('miner')"
      >{{$t('heads.miner')}}</a>
      <a class="item" href="http://www.dbctalk.ai" target="_blank">{{$t('heads.talk')}}</a>
      <!--      <router-link class="item" to="/home">{{$t('heads.api')}}</router-link>-->
      <!--  <router-link class="item" to="/home">{{$t('heads.help')}}</router-link>-->
      <!--<el-dropdown class="drop-lang" trigger="click" v-on:command="drop_command">
      <span class="el-dropdown-link">
        <i class="icon-language"></i>
        <span>{{curLang.toUpperCase()}}</span>
        <i class="el-icon-caret-bottom"></i>
      </span>
          <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="EN">EN</el-dropdown-item>
        <el-dropdown-item command="CN">CN</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>-->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Head",
  data() {
    return {
      curLang: this.$i18n.locale,
      menuName: ""
    };
  },
  methods: {
    pushMenu(name) {
      this.menuName = name;
      this.$router.push("/" + name);
    },
    pushToPreview() {
      this.$router.push("/preview");
    },
    drop_home(name) {
      this.menuName = name;
      this.$router.push("/" + name);
    },
    drop_command(lang) {
      this.$loadLanguageAsync(lang).then(() => {
        this.curLang = lang;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.head {
  padding-top: 112px;
  padding-bottom: 110px;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .logo {
    margin-top: 5px;
    margin-right: 169px;
  }

  .item {
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.5);
    padding-bottom: 10px;
    border-bottom: 2px solid transparent;

    &:hover {
      color: rgba(255, 255, 255, 0.9);
    }

    &.active {
      border-bottom-color: #fff;
      color: rgba(255, 255, 255, 0.9);
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

    span,
    i {
      vertical-align: middle;
    }

    .el-icon-caret-bottom {
      font-size: 8px;
    }
  }

  * {
    /*color: #f7f7fb;*/
    color: rgba(255, 255, 255, 0.9);
  }
}
</style>
