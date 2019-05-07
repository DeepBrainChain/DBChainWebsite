<template>
  <div class="border-box">
    <div class="title">
      <h3>DBCTrade智能合约交易记录：</h3>
      <p>合约交易地址：<a href="javascript:">www.baxxxxxxx</a></p>
    </div>
    <div class="tb-wrap">
      <table class="tb-theme">
        <thead>
          <tr>
            <th>transfer</th>
            <th>from</th>
            <th>to</th>
            <th>value</th>
            <th>assets</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            sdafd34gsghd34567865
          </td>
          <td>sdafd34gsghd34567865复制 5</td>
          <td>sdafd34gsghd3456786</td>
          <td>$ 3456.00</td>
          <td>DBC</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import Head from "../../components/head/index";

  export default {
    name: "trade",
    components: {Head}
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/css/variables.scss";

  .title {
    display: flex;
    justify-content: space-between;
    h3 {
      margin: 0;
      line-height: 20px;
      font-size: 20px;
      color: #47495A;
    }
    p {
      margin: 0;
      color: #666;
      font-size: 16px;
      a {
        color: $primaryColor;
      }
    }
  }
  .tb-wrap {
    margin-top: 30px;
  }
</style>
