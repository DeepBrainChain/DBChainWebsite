<template>
  <div class="wrap1200 bg-box mb100">
    <div class="border-box">
      <h2>{{tip}}</h2>
      <div class="macInfo">
        <h3>{{$t('signleVir.createVmInfo')}}</h3>
        <ul>
          <li>{{$t('virtual.Machine_ID')}}: {{ defaultdata.machine_id }}</li>
          <li>{{$t('myvirtual.operation')}}: {{ defaultdata.operation_system }}</li>
          <li>{{$t('myvirtual.mirror_name')}}: {{ defaultdata.image_name }}</li>
          <li>{{$t('myvirtual.vir_gpu_num')}}: {{ defaultdata.gpu_count }}</li>
          <li>{{$t('virtual.useTime')}}: {{ defaultdata.time }} {{$t('hour')}}</li>
          <li>{{$t('myvirtual.vir_mem')}}: {{ defaultdata.mem_rate }} G</li>
          <li>{{$t('myvirtual.vir_cpu_num')}}: {{ defaultdata.cpu_cores }}</li>
          <li>{{$t('myvirtual.vir_data')}}: {{ defaultdata.disk_size }} G</li>
          <li>{{$t('virtual.equivalent')}}: {{ defaultdata.dbc }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  createSignleVirOrder,
  createSignleVir,
  changeSignleVirStatus
} from "@/api"
export default {
  name: "howBuy",
  data(){
    return{
      tip: this.$t('signleVir.loading'),
      defaultdata: {
        account: "",
        bios_mode: "",
        cpu_cores: 0,
        dbc: "",
        disk_size: 0,
        gpu_count: 0,
        image_name: "",
        language: "",
        machine_id: "",
        mem_rate: 0,
        network_name: "",
        operation_system: "",
        port_max: 0,
        port_min: 0,
        rdp_port: "",
        ssh_port: 0,
        time: 1,
        vnc_port: 0,
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 获取路由传参
    getData() {
      this.defaultdata = this.$route.params
      console.log(this.defaultdata);
      createSignleVirOrder(this.defaultdata).then(res => {
        if (res.success) {
          let data = {
            virOrderId: res.content,
            machine_id: this.defaultdata.machine_id,
            account: this.defaultdata.account
          }
          this.createSignleVirmthods(data)
        } else {
          let msg = ''
          if (res.code == -2) {
            msg = this.$t('signleVir.tip5')
          } else {
            msg = this.$t('signleVir.tip4') 
          }
          this.$message({
            showClose: true,
            message: msg,
            type: "error",
          });
          setTimeout(() => {
            this.$router.back()
          }, 2000);
        }
      })
    },
    createSignleVirmthods(data){
      createSignleVir(data).then( res=> {
        if (res.success) {
          setTimeout(() => {
            this.$router.push('mymachine/mySignleUnlockGpuVirtual')
          }, 1000);
        } else {
          if (res.code == -5 || res.code == -6) {
            this.createSignleVirmthods(data)
          } else {
            this.$message.error(res.msg)
            changeSignleVirStatus({virOrderId: data.virOrderId, status: 5}).then(res => {
              this.$message({
                showClose: true,
                message: this.$t('signleVir.tip6') ,
                type: "error",
              });
              setTimeout(() => {
                this.$router.back()
              }, 2000);
            })
          }
        }
      })
      .catch(() => {
        this.createSignleVirmthods(data)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.border-box {
  h2 {
    text-align: center;
  }
  .macInfo {
    width: 100%;
    h3 {
      margin: 5px 0;
    }
    ul li {
      margin: 3px 0;
    }
  }
}
</style>
