<template>
  <div class="wrap1200 bg-box mb100">
    <div class="border-box">
      <h3 v-if="$t('website_name')!=='congTuCloud'">
        {{$t('rent_machine_ai_help')}}：
        <a
          v-if="this.$i18n.locale==='cn' || this.$i18n.locale==='CN'"
          href="https://kdocs.cn/l/sbLFjoYuy?f=111"
          target="_blank"
        >https://kdocs.cn/l/sbLFjoYuy?f=111</a>
      </h3>

      <h3>
        {{$t('use_machine_ai_help')}}：
        <a
          href=" https://kdocs.cn/l/sEORHSIag?f=111"
          target="_blank"
        >https://kdocs.cn/l/sEORHSIag?f=111</a>
      </h3>

      <h3>
        {{$t('question_machine_ai_help')}}：
        <a
          href="https://kdocs.cn/l/sLuyBksnz?f=111"
          target="_blank"
        >https://kdocs.cn/l/sLuyBksnz?f=111</a>
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "aiHelp",

  methods: {}
};
</script>

<style lang="scss" scoped>
a {
  color: #008bf3;
}
</style>
