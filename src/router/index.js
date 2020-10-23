import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Auth from '../components/Login.vue'
import Register from '../components/Register.vue'
import store from '../store/index.js'
import Logout from "@/components/Logout";

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
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/auth')
  } else {
    next()
  }
})

export default router
