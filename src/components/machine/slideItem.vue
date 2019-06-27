<template>
  <div class="slide-item">
    <h3>{{title}}</h3>
    <div class="slide-wrap">
      <el-slider
        :disabled="disabled"
        :show-tooltip="false"
        class="mini-slide"
        v-model="curVal"
        v-on:change="slideChange"
      ></el-slider>
    </div>
    <span class="remark">
      <slot></slot>
    </span>
  </div>
</template>

<script>
  export default {
    name: "slideItem",
    props: {
      title: String,
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
    width: 168px;
    h3 {
      font-weight: 400;
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
