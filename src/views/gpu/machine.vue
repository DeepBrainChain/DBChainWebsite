<template>
  <div class="machine">
    <div class="machineData-wrap">
      <drop-item></drop-item>
      <slide-item v-model="curVal"></slide-item>
    </div>
    <div class="info-wrap">

    </div>
  </div>
</template>

<script>
  import DropItem from '@/components/machine/dropItem'
  import SlideItem from '@/components/machine/slideItem'

  export default {
    name: "index",
    data () {
      return {
        curVal: 0
      }
    },
    watch: {
      curVal(newVal) {

      }
    },
    components: {
      DropItem,
      SlideItem
    }
  }
</script>

<style lang="scss" scoped>
  .machineData-wrap {
    display: flex;
  }
  .info-wrap {
    padding-top: 20px;
    border: 1px solid #979797;
  }
</style>
