import ServiceService from '../services/service.service';

export const service = {
    state: {
        categories: {},
    },
    mutations: {
        set_categories(state, categories){
            state.categories = categories;
        },
        set_servicesByCategory(state, servicesByCategory){
            state.servicesBycategory = servicesByCategory;
        }
    },
    actions: {
        getCategories({commit}){
            console.log("je suis là")
            return ServiceService.getCategories().then(
                response => {
                    commit('set_categories', response);
                   // console.log(JSON.stringify(response))
                    return Promise.resolve(response);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
        getServicesByCategory({commit}, category){
            return ServiceService.getServicesByCategory(category).then(
                response => {
                    commit('set_servicesByCategory', response);
                    return Promise.resolve(response);
                },
                error => {
                    return Promise.reject(error);
                }
            )
        }
    },
    getters : {
        servicesByCategory:state => {
            return state.servicesBycategory;
        },
        categories:state => {
            return state.categories;
        },
    }
};
