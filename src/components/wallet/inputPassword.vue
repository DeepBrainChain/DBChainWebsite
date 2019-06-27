<template>
    <span class="input-box">
        <input v-model.trim="text"
               class="dbc-input"
               v-bind:type="isView || !isPassword ? 'text': 'password'"
               :placeholder="placeholder">
        <i v-if="isPassword" class="iconfont" :class="!isView ? 'iconview':'iconnoview'" v-on:click="switchView"></i>
    </span>
</template>

<script>
  export default {
    name: "inputPassword",
    props: {
      placeholder: {
        type: String,
        default: ''
      },
      isPassword: {
        type: Boolean,
        default: false
      },
      value: {
        type: String,
        default: ''
      }
    },
    watch: {
      value(newVal) {
        this.text = newVal
      },
      text(newVal) {
        this.$emit('input', newVal)
      }
    },
    data() {
      return {
        isView: !this.isPassword,
        text: ''
      }
    },
    methods: {
      switchView() {
        this.isView = !this.isView
      }
    }
  }
</script>

<style lang="scss" scoped>
  .input-box {
    position: relative;
    display: inline-block;
    width: 60%;

    .dbc-input {
      width: 100%;
    }

    .iconfont {
      position: absolute;
      right: 0;
      font-size: 32px;
      color: #70839A;
    }
  }

</style>
