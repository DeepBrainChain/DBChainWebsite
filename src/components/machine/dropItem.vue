<template>
  <div class="drop-item">
    <h3>{{title}}</h3>
    <!--<el-dropdown trigger="click" @command="select">
      <el-button class="dropBtn" size="mini" plain>
        <span class="drop-title">{{selected.name}}</span><i class="el-icon-caret-bottom"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item,index) in dropList" :command="item.value" :key="index">{{item.name}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>-->
    <el-select
      class="dropBtn"
      size="small"
      v-model="selectedVal"
      filterable
      :placeholder="$t('drop_item_select')"
      @change="select"
    >
      <el-option v-for="item in dropList" :key="item.value" :label="item.name" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "dropItem",
  props: {
    title: String,
    value: [Number, String],
    dropList: {
      type: Array,
      default: () => [{ name: this.$t("drop_item_no_data"), value: -1 }]
    }
  },
  data() {
    return {
      selectedVal: this.value
    };
  },
  methods: {
    select(val) {
      this.$emit("input", val);
      this.$emit("selected", val);
    }
  }
};
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
    width: 120px;
  }
}
</style>
