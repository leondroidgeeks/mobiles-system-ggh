import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Logout from '@/views/Logout.vue'
import Start from '@/views/Start.vue'
import ChooseEvent from '@/views/ChooseEvent.vue'
import Content from '@/views/Content.vue'
import CreateEvent from '@/views/CreateEvent.vue'
import Help from '@/views/Help.vue'
import QRExhibit from '@/views/QRExhibit.vue'
import QRScan from '@/views/QRScan.vue'
import Impressum from '@/views/Impressum.vue'
import Datenschutz from '@/views/Datenschutz.vue'

Vue.use(Router)
import store from './store.js'

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: { scrollToTop: true }
    },
    {
      path: '/abmelden',
      name: 'Logout',
      component: Logout,
      meta: { scrollToTop: true }
    },
    {
      path: '/start',
      name: 'Start',
      component: Start,
      meta: { scrollToTop: true }
    },
    {
      path: '/erstellen/ereignis',
      name: 'EreignisAuswählen',
      component: ChooseEvent,
      meta: { scrollToTop: true }
    },
    {
      path: '/erstellen/inhalt',
      name: 'Inhalt',
      component: Content,
      meta: { scrollToTop: true }
    },
    {
      path: '/erstellen/ereignis/neu',
      name: 'EreignisErstellen',
      component: CreateEvent,
      meta: { scrollToTop: true }
    },
    {
      path: '/erstellen/qr/exhibit',
      name: 'QRExhibit',
      component: QRExhibit,
      meta: { scrollToTop: true }
    },
    {
      path: '/erstellen/qr/scan',
      name: 'QRScan',
      component: QRScan,
      meta: { scrollToTop: true }
    },
    {
      path: '/hilfe/:name?',
      name: 'Hilfe',
      component: Help,
      meta: { scrollToTop: true }
    },
    {
      path: '/impressum',
      name: 'Impressum',
      component: Impressum,
      meta: { scrollToTop: true }
    },
    {
      path: '/datenschutzerklaerung',
      name: 'Datenschutzerklaerung',
      component: Datenschutz,
      meta: { scrollToTop: true }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
      if (to.hash) {
        const position = {}
        position.selector = to.hash
        position.offset = { y: 120 }

        if (document.querySelector(to.hash)) {
          return position
        }

        return { x: 0, y: 0 }
      }

      return { x: 0, y: 0 }
  }
});

router.beforeEach((to, from, next) => {
  if (to.name == "EreignisAuswählen" || to.name == "Inhalt" || to.name == "EreignisErstellen" || to.name == "QRExhibit" || to.name == "QRScan"  || to.name == "Start") {
    var loggedinStatus;
    if (store.state.started) {
      loggedinStatus = store.state.loggedinStatus;
    } else {
      loggedinStatus = JSON.parse(localStorage.getItem('loggedinStatus'));
    }
    if(loggedinStatus) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});

export default router;
