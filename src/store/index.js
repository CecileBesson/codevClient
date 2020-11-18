import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module';
import { messages } from './messages.module';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        auth,
        messages
    }
})
