<template>
  <div class="wrap1200 bg-box mb100">
    <div class="border-box">
      <h3>
        {{$t('rent_machine_dbc_help')}}：
        <a
          v-if="this.$i18n.locale==='cn' || this.$i18n.locale==='CN'"
          href="https://kdocs.cn/l/smIIr7jvGLD0"
          target="_blank"
        >https://kdocs.cn/l/smIIr7jvGLD0</a>

        <a
          v-else
          href="https://github.com/DeepBrainChain/DeepBrainChain-MainChain/blob/master/docs/How_to_rent_supernode.md"
          target="_blank"
        >https://github.com/DeepBrainChain/DeepBrainChain-MainChain/blob/master/docs/How_to_rent_supernode.md</a>
      </h3>

      <h3>
        {{$t('use_machine_dbc_help')}}：
        <a
          v-if="this.$i18n.locale==='cn' || this.$i18n.locale==='CN'"
          href="https://github.com/DeepBrainChain/DeepBrainChain-MainChain/blob/master/docs/join_dbc_testnet.md"
          target="_blank"
        >https://github.com/DeepBrainChain/DeepBrainChain-MainChain/blob/master/docs/join_dbc_testnet.md</a>
        <a
          v-else
          href="https://github.com/DeepBrainChain/DeepBrainChain-MainChain/blob/master/docs/join_dbc_testnet_EN.md"
          target="_blank"
        >https://github.com/DeepBrainChain/DeepBrainChain-MainChain/blob/master/docs/join_dbc_testnet_EN.md</a>
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "supernodeHelp",

  methods: {}
};
</script>

<style lang="scss" scoped>
a {
  color: #008bf3;
}
</style>
