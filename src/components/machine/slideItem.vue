<template>
  <div class="slide-item">
    <h3>国家</h3>
    <div class="slide-wrap">
      <el-slider
        :disabled="disabled"
        :show-tooltip="false"
        class="mini-slide"
        v-model="curVal"
        v-on:change="slideChange"
      ></el-slider>
    </div>
    <span class="remark">1h 51min</span>
  </div>
</template>

<script>
  export default {
    name: "slideItem",
    props: {
      value: {
        type: Number,
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        curVal: 50
      }
    },
    methods: {
      slideChange (value) {
        this.$emit('input', value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/css/variables.scss";
  .slide-item {
    text-align: left;
    width: 155px;
    h3 {
      margin-top: 0;
      margin-bottom: 0;
      font-size: 16px;
      color: #666;
    }
    .slide-wrap {
      width: 100px;
    }
  }
  .remark {
    font-size: 12px;
    color: $textColor_gray;
  }

</style>
