<template>
    <span class="input-box">
        <input class="dbc-input" v-bind:type="isView ? 'text': 'password'" placeholder="Enter Password" value="1234">
        <i class="iconfont" :class="!isView ? 'iconview':'iconnoview'" v-on:click="switchView"></i>
    </span>
</template>

<script>
  export default {
    name: "inputPassword",
    data() {
      return {
        isView: true
      }
    },
    methods: {
      switchView () {
        this.isView = !this.isView
      }
    }
  }
</script>

<style lang="scss" scoped>
  .input-box {
    position: relative;
    display: inline-block;
    width: 600px;
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
