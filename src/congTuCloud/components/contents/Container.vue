<template>
  <div class="wrap">
    <Page1 class="page1" />
    <Page2 class="page2" />
    <Page3 class="page3" />
    <Page4 class="page4" />
    <Page5 class="page5" />
    <Page6 class="page6" />
    <Page7 class="page7" />
  </div>
</template>
<script>
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";
import Page4 from "./components/Page4";
import Page5 from "./components/Page5";
import Page6 from "./components/Page6";
import Page7 from "./components/Page7";

export default {
  data() {
    return {};
  },
  components: {
    Page1,
    Page2,
    Page3,
    Page4,
    Page5,
    Page6,
    Page7,
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
}
.page1 {
  width: 100%;
  height: 721px;
}
.page2 {
  width: 100%;
  height: 460px;
}
.page3 {
  width: 100%;
  height: 525px;
}
.page4 {
  width: 100%;
  height: 720px;
}
.page5 {
  width: 100%;
  height: 678px;
}
.page6 {
  width: 100%;
  height: 370px;
}
.page7 {
  width: 100%;
  height: 668px;
}
</style>