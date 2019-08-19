<template>
  <div id="app">
    <Head></Head>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Head from './views/trade_io/components/head'
import Footer from './views/trade_io/components/footer'

export default {
  name: 'app',
  beforeRouteUpdate(to, from, next) {
    next()
  },
  components: {
    Head,
    Footer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
