<template>
  <div class="gpu" ref="gpuBox">
    <Header v-if="this.$store.state.webtype" :underlineStyle="underlineStyle" />
    <div class="box">
      <el-container>
        <el-aside
          class="left-wrap"
          v-if="$t('website_name') === 'congTuCloud'"
          style="min-height: 100vh"
        >
          <navi :menus="menus" :index="curNavIndex"></navi>
        </el-aside>
        <el-aside class="left-wrap" v-else>
          <navi :menus="menus" :index="curNavIndex"></navi>
        </el-aside>
        <el-main class="right-wrap">
          <keep-alive :include="cacheList">
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </div>
    <Footer v-if="this.$store.state.webtype" />
  </div>
</template>

<script>
import Navi from "@/components/naviMenu";
import Header from "@/congTuCloud/components/header/SubHeader.vue";
import Footer from "@/congTuCloud/components/footer/Footer.vue";
import { getAccount } from "@/utlis";
import { getCommitteeList } from '@/utlis/dot/api';
import { getCurrentPair } from "@/utlis/dot"
export default {
  name: "mymachine",
  components: {
    Navi,
    Header,
    Footer,
  },
  data() {
    return {
      wallet_address: (getAccount() && getAccount().address) || (getCurrentPair() && getCurrentPair().address),
      // 缓存组件列表
      cacheList: [
        "myMachine_unlock",
        "myMachine_unlock_cpu",
        "myMachine_unlock_stopped",
        "myMachine_unlock_gpuVirtual",
        "mySignle_unlock_GpuVirtual",
        "my_unlock_SecurityGroup"
      ],
      curNavIndex: 3,
      menus: [
        {
          title: undefined, //this.$t("gpu.machineList"),
          to: "myMachine_gpuVirtual",
          index: 3,
          iconClass: "iconmachine",
        },
        {
          title: undefined, //this.$t("gpu.machineList"),
          to: "mySignle_gpuVirtual",
          index: 5,
          iconClass: "iconmachine",
        },
        {
          title: undefined, //this.$t("gpu.machineList"),
          to: "mySecurityGroup",
          index: 6,
          iconClass: "iconmachine",
        }
      ],
      underlineStyle: {
        width: "65px",
        left: "218px",
      },
    };
  },
  beforeRouteUpdate(to, from, next) {
    // const curRoute = to.matched.find(item => item.path === to.path)
    console.log(to.meta, 'to.meta');
    this.curNavIndex = to.meta.menuIndex;
    next();
  },
  created() {
    // const curRoute = this.$route.matched.find(item => item.path === this.$route.path)
    // getCommitteeList(this.wallet_address).then(res => {
    //   if (res) {
    //     this.menus.push({
    //       title: undefined, //this.$t("gpu.machineList"),
    //       to: "myVerify_gpuVirtual",
    //       index: 4,
    //       iconClass: "iconmachine",
    //     })
    //   }
    //   this.curNavIndex = this.$route.meta.menuIndex;
    //   this.init_menus();
    // })
      this.curNavIndex = this.$route.meta.menuIndex;
      this.init_menus();
  },
  mounted() {
    if (this.$t("website_name") === "congTuCloud") {
      this.$refs.gpuBox.style.marginBottom = "0px";
    }
  },
  watch: {
    "$i18n.locale"() {
      this.init_menus();
    },
  },
  methods: {
    init_menus() {
      this.menus[0].title = this.$t("gpu.myMachine_gpuVirtual");
      this.menus[1].title = this.$t("gpu.myMachine_gpuVirtual1");
      this.menus[2].title = this.$t("gpu.mySecurityGroup");
      // if (this.menus[3]) {
      //   this.menus[3].title = this.$t("gpu.myVerify_gpuVirtual");
      // }
      // if (this.$t("website_name") === "congTuCloud") {
      //   this.menus.splice(2, 1);
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.gpu {
  margin-bottom: 42px;
}
.right-wrap {
  margin-left: 20px;
}
</style>
