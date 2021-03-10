<template>
  <div class="title">
    {{ text }}
  </div>
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
.title {
  font-weight: 900;
  font-family: Arial, Helvetica, "微软雅黑", sans-serif;
  font-size: 20px;
  color: #050f67;
  letter-spacing: 1px;
}
</style>