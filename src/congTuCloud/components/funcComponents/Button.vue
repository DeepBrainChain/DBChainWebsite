<template>
  <input class="button" type="button" :value="text" />
</template>
<script>
export default {
  props: ["text"],
  data() {
    return {};
  },
};
</script>
<style lang="css" scoped>
.button {
  width: 360px;
  height: 50px;
  background-color: #061267;
  border: none;
  outline: none;
  border-radius: 7px;
  font-size: 20px;
  color: #ffffff;
}
.button:hover {
  cursor: pointer;
  background-color: #091153;
}
</style>