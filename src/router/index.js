import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Login.vue'
import Register from '../views/Register.vue'
import OfferAservice from "@/views/OfferAservice";

import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth
  },
  {
    path: '/offerAService',
    name: 'offerAService',
    component: OfferAservice
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/auth', '/register'];
  const authRequired = !publicPages.includes(to.path);

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !store.getters.isLoggedIn) {
    next('/auth');
  }
  else if (!authRequired && store.getters.isLoggedIn) {
    next('/');
  }
  else {
    next();
  }
})

export default router
