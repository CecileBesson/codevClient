import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '',
        user : {},
        categories: {},
        isLoggedIn: !!localStorage.getItem('token'),
        alertDlg: false
    },
    mutations: {
        auth_success(state, token, user){
            state.token = token
            state.user = user
            state.isLoggedIn = true
        },
        auth_error(state){
            state.alertDlg = true
        },
        logout(state){
            state.token = ''
            state.isLoggedIn = false
        },
        set_categories(state, categories){
            state.categories = categories
        },
        set_servicesByCategory(state, servicesByCategory){
            state.servicesBycategory = servicesByCategory
        }

    },
    actions: {
        auth({commit}, user){
            return new Promise((resolve, reject) => {
                let config = {
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:8081',
                        'Content-Type': 'multipart/form-data',
                    },
                };
                axios({url: 'http://localhost:9000/api/v1/auth', data: user, method: 'POST', config})
                    .then(resp => {
                        const token = resp.data.token
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                        commit('auth_success', token, user)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                       // this.message = "Mail ou mot de passe invalide"
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        register({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: 'http://localhost:9000/api/v1/users', data: user, method: 'POST' })
                    .then(resp => {
                        const token = resp.data.token
                        const user = resp.data.user
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                        commit('auth_success', token, user)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        logout({commit}){
            return new Promise((resolve) => {
                commit('logout')
                localStorage.removeItem('token')
                console.log('deconnexion')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
        getCategories({commit}){
            return new Promise((resolve, reject) => {
                axios({url: 'http://localhost:9000/api/v1/category', method: 'GET' })
                    .then(resp => {
                        commit('set_categories', resp.data)
                      //  console.log(JSON.stringify(resp.data))
                        resolve(resp)
                    })
                    .catch(err => {
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        getServicesByCategory({commit}, category){
            return new Promise((resolve, reject) => {
             //   console.log(JSON.stringify(category));
             //   console.log(category.idCategory);
                axios({url: 'http://localhost:9000/api/v1/services', method: 'GET', params: { categoryId: category.idCategory} })
                    .then(resp => {
                        console.log(JSON.stringify(resp.data));
                        commit('set_servicesByCategory', resp.data)
                        resolve(resp)
                        return resp.data;
                    })
                    .catch(err => {
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
    },
    getters : {
        isLoggedIn: state => {
            return state.isLoggedIn
        },
        alertDlg: state => {
            return state.alertDlg
        },
        servicesByCategory:state => {
            return state.servicesBycategory;
        },
    }
})
