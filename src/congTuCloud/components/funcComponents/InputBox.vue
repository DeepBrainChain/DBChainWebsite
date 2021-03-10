<template>
  <input
    class="input"
    :name="boxName"
    :type="type"
    :placeholder="placeholder"
    @focus="handleChange()"
    :style="style"
    :readonly="isReadyonly"
    ref="input"
  />
</template>
<script>
export default {
  props: ["boxName", "type", "placeholder"],
  data() {
    return {
      style: {},
      changeStyle: {
        color: "#081468",
      },
      isReadyonly: false,
    };
  },
  mounted() {
    if (this.boxName === "loginEmail" || this.boxName === "registerEmail") {
      // this.$refs.input.value = "zypsalms@sina.com";
      this.$emit("account", "zypsalms@sina.com");
      this.isReadyonly = false;
    }
  },
  methods: {
    handleChange: function () {
      this.style = this.changeStyle;
    },
  },
};
</script>
<style lang="css" scoped>
.input {
  background-color: #eaeaf2;
  border-radius: 7px;
  border: none;
  font-size: 20px;
  color: #b6b6b6;
  outline: none;
  box-sizing: border-box;
  padding: 0 44px 0 16px;
}
.input::-ms-clear,
.input::-ms-reveal {
  display: none;
}
</style>