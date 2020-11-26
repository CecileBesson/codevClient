import AuthService from '../services/auth.service';

const token = localStorage.getItem('token');
const initialState = token
    ? { isLoggedIn: true, user: null } // todo: load user
    : { isLoggedIn: false, user: null };

export const auth = {
    state: initialState,
    mutations: {
        auth_success(state, user){
            state.user = user;
            state.isLoggedIn = true;
        },
        auth_error(state){
            state.isLoggedIn = false;
        },
       set_currentUser(state, user){
            state.currentUser = user;
       },
        logout(state){
            state.isLoggedIn = false;
        },
    },
    actions: {
        auth({dispatch, commit}, user){
            return AuthService.login(user).then(
                token => {
                    localStorage.setItem('token', token);
                    commit('auth_success', user, token);
                },
                error => {
                    commit('auth_error');
                    localStorage.removeItem('token');
                    return Promise.reject(error);
                }
            ).then(
                () => {
                    // load conversations
                    dispatch('getConversations', null, {root: true});
                    // subscribe to new messages
                    dispatch('subscribeToNewMessage', null, {root: true});
                }
            );
        },
        register({commit}, user){
            return AuthService.register(user).then(
                () => {
                    // go through validation system
                },
                error => {
                    commit('auth_error');
                    localStorage.removeItem('token');
                    return Promise.reject(error);
                }
            );
        },
        updateSettings({commit}, user){
            return AuthService.updateSettings(user).then(
                () => {
                },
                error => {
                    commit('auth_error');
                    localStorage.removeItem('token');
                    return Promise.reject(error);
                }
            );
        },
        getCurrentUser({commit}){
            return AuthService.getCurrentUser().then(
                response => {
                    commit('set_currentUser', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    return Promise.reject(error);
                }
            )
        },
        logout({commit}){
            localStorage.removeItem('token');
            commit('logout');
        }
    },
    getters : {
        isLoggedIn: state => {
            return state.isLoggedIn;
        },
        getCurrentUser: state => {
            return state.currentUser;
        }
    }
};
