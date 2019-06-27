<template>
  <div class="drop-item">
    <h3>{{title}}</h3>
    <el-dropdown trigger="click" @command="select">
      <el-button class="dropBtn" size="mini" plain>
        <span class="drop-title">{{selected.name}}</span><i class="el-icon-caret-bottom"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item,index) in dropList" :command="item.value" :key="index">{{item.name}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  export default {
    name: "dropItem",
    props: {
      title: String,
      dropList: {
        type: Array,
        default: () => [
          {
            name: '中国',
            value: 1
          },
          {
            name: '美国',
            value: 2
          },
          {
            name: '俄罗斯',
            value: 3
          },
        ]
      }
    },
    data() {
      return{
        selected: this.dropList[0]
      }
    },
    methods: {
      select(command) {
        this.selected = this.dropList.find(item => item.value === command)
        this.$emit('selected', this.selected)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .drop-item {
    text-align: left;
    width: 168px;

    h3 {
      font-weight: 400;
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 16px;
      color: #666;
    }

    .drop-title {
      font-size: 14px;
    }
    .dropBtn {
      width: 100px;
    }
  }
</style>
