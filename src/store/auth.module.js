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
        logout(state){
            state.isLoggedIn = false;
        },
    },
    actions: {
        auth({commit}, user){
            return AuthService.login(user).then(
                token => {
                    localStorage.setItem('token', token);
                    commit('auth_success', token, user);
                    return Promise.resolve(token);
                },
                error => {
                    commit('auth_error');
                    localStorage.removeItem('token');
                    return Promise.reject(error);
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
        logout({commit}){
            localStorage.removeItem('token');
            commit('logout');
        }
    },
    getters : {
        isLoggedIn: state => {
            return state.isLoggedIn;
        }
    }
};