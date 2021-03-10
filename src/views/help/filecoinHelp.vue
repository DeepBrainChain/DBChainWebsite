<template>
  <div class="wrap1200 bg-box mb100">
    <div class="border-box">
      <h3>
        {{$t('rent_machine_filecoin_help')}}：
        <a
          v-if="this.$i18n.locale==='cn' || this.$i18n.locale==='CN'"
          href="https://kdocs.cn/l/si6W8MzPD?f=111"
          target="_blank"
        >https://kdocs.cn/l/si6W8MzPD?f=111</a>
      </h3>

      <h3>
        {{$t('use_machine_filecoin_help')}}：
        <a
          href="https://kdocs.cn/l/sygDgqBm7?f=111"
          target="_blank"
        >https://kdocs.cn/l/sygDgqBm7?f=111</a>
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "filecoinHelp",

  methods: {}
};
</script>

<style lang="scss" scoped>
a {
  color: #008bf3;
}
</style>
