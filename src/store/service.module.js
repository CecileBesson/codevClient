import ServiceService from '../services/service.service';
export const service = {
    state: {
        categories: {},
        servicesByCategory: {},
        servicesByCategoryAndLocalisation: {},
        serviceCreationError: false
    },
    mutations: {
        set_categories(state, categories){
            state.categories = categories;
        },
        set_servicesByCategory(state, servicesByCategory){
            state.servicesByCategory = servicesByCategory;
        },
        set_servicesByCategoryAndLocalisation(state, servicesByCategoryAndLocalisation){
            state.set_servicesByCategoryAndLocalisation = servicesByCategoryAndLocalisation;
        },
        createService_error(state){
            state.serviceCreationError= true;
        }
    },
    actions: {
        getCategories({commit}){
            return ServiceService.getCategories().then(
                response => {
                    commit('set_categories', response);
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
        },
        getServicesByCategoryAndLocalisation({commit}, payload){
            return ServiceService.getServicesByCategoryAndLocalisation(payload.category,payload.latitude, payload.longitude, payload.perimeter).then(
                response => {
                    commit('set_servicesByCategoryAndLocalisation', response);
                    return Promise.resolve(response);
                },
                error => {
                    return Promise.reject(error);
                }
            )
        },
        createService({commit}, newService){
            console.log("=========" + JSON.stringify(newService))
            return ServiceService.createService(newService).then(
                () => {
                    // ???
                },
                error => {
                    commit('createService_error');
                    return Promise.reject(error);
                }
            );
        }
    },
    getters : {
        servicesByCategory:state => {
            return state.servicesByCategory;
        },
        categories:state => {
            return state.categories;
        },
    }
};
