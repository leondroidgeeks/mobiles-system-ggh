<template>
<div id="app">
  <navbar></navbar>
  <div class="container">
    <router-view/>
  </div>
  <historytelling-footer></historytelling-footer>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import HistorytellingFooter from '@/components/Footer.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    HistorytellingFooter
  },
  created() {
    if (JSON.parse(localStorage.getItem('loggedinStatus'))) {
      this.$store.commit('login', {
        username: localStorage.getItem('username'),
        id: localStorage.getItem('id')
      });
      this.$store.commit('started', true);
    }
  }
}
</script>

<style lang="scss">
@import "assets/historytelling-styleguide/src/index.scss";
$fa-font-path: "../node_modules/font-awesome/fonts";
@import "../node_modules/font-awesome/scss/font-awesome.scss";

// #app,
// .container,
// body,
// html {
//     height: 100%;
// }

html {
    height: 100%;
    box-sizing: border-box;
}

#app,
.container {
    height: 100%;
    min-height: 100%;
}

body {
    padding-top: 7rem;
    padding-bottom: 15rem;
    position: relative;
    min-height: 100%;
}
</style>
