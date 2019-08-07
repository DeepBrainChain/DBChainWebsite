<template>
  <div class="slide-item">
    <h3>{{title}}</h3>
    <div class="slide-wrap">
      <el-slider
        :disabled="disabled"
        :show-tooltip="false"
        class="mini-slide"
        v-model="curVal"
        @input="slideInput"
        @change="slideChange"
        :step="step"
        :min="min"
        :max="max"
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
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 0
      },
      step: {
        type: Number,
        default: 10
      },
      value: {
        type: Number,
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    create() {
      this.curVal = this.value
    },
    data() {
      return {
        curVal: this.value
      }
    },
    methods: {
      slideInput(value) {
        this.$emit('input', value)
      },
      slideChange(value) {
        this.$emit('change', value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/css/variables.scss";

  .slide-item {
    text-align: left;
    width: 162px;

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
