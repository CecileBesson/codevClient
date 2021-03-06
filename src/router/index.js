import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Login.vue'
import Register from '../views/Register.vue'
import OfferAservice from "@/views/OfferAservice";
import AllMessages from '../views/AllMessages.vue'
import Conversation from '../views/Conversation.vue'
import ComingServices from '../views/ComingServices.vue'
import OwnedServices from '../views/OwnedServices.vue'
import createConversation from '../views/createConversation.vue'

import store from '../store/index'

import Settings from "@/views/Settings";
import ConsultYourService from "@/views/ConsultYourService";
import ConsultAservice from "@/views/ConsultAservice";
import Update from "@/views/Update";
import MessagesRelated from "@/views/MessagesRelated";


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
  },
  {
    path: '/messages',
    name: 'messages',
    component: AllMessages
  },
  {
    path: '/messages/:idService',
    name: 'messages',
    component: MessagesRelated,
    props: true
  },
  {
    path: '/comingServices',
    name: 'comingServices',
    component: ComingServices
  },
  {
    path: "/conversation/:idConversation",
    name: "conversation",
    component: Conversation,
    props: true
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings
  },
  {
    path: "/ownedServices",
    name: "ownedServices",
    component: OwnedServices
  },
  {
    path: "/service/:idService",
    name: "consultAService",
    component: ConsultAservice,
    props: true
  },
  {
    path: "/consultYourService/:idService",
    name: "consultYourService",
    component: ConsultYourService,
    props: true
  },
  {
    path: "/Update/:idService",
    name: "Update",
    component: Update,
    props: true
  },
  {
    path: "/createConversation/:idService",
    name: "createConversation",
    component: createConversation,
    props: true
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
