import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false

window.$ = window.jQuery = require('jquery')
window.Popper = require('popper.js')
require('../node_modules/bootstrap/dist/js/bootstrap.js')
window.moment = require('moment')
require('moment/locale/de');
var ImageTools = require('@/assets/ImageTools.js').default;
window.ImageTools = ImageTools;
// $.ajaxSetup({
//   timeout: 3000
// });

import vueHeadful from 'vue-headful';
Vue.component('vue-headful', vueHeadful);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
