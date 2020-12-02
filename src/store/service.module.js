import ServiceService from '../services/service.service';
export const service = {
    state: {
        categories: {},
        servicesByCategory: {},
        servicesByUser: {},
        servicesByCategoryAndLocalisation: {},
        currentService: {},
        serviceCreationError: false
    },
    mutations: {
        set_categories(state, categories){
            state.categories = categories;
        },
        set_servicesByCategory(state, servicesByCategory){
            state.servicesByCategory = servicesByCategory;
        },
        set_servicesByUser(state, servicesByUser){
            state.servicesByUser = servicesByUser;
        },
        set_servicesByCategoryAndLocalisation(state, servicesByCategoryAndLocalisation){
            state.set_servicesByCategoryAndLocalisation = servicesByCategoryAndLocalisation;
        },
        set_currentService(state, currentService){
            state.currentService = currentService;
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
        getServicesByUser({commit}){
            return ServiceService.getServicesByUser().then(
                response => {
                    commit('set_servicesByUser', response);
                    return Promise.resolve(response);
                },
                error => {
                    return Promise.reject(error);
                }
            )
        },
        getCurrentService({commit}, idService){
            return ServiceService.getServiceById(idService).then(
                response => {
                    commit('set_currentService', response);
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
            return ServiceService.createService(newService).then(
                () => {
                    // ???
                },
                error => {
                    commit('createService_error');
                    return Promise.reject(error);
                }
            );
        },
        deleteService({commit}, idService){
            return ServiceService.deleteService(idService).then(
                () => {
                    return Promise.resolve();
                },
                error => {
                    commit('createService_error');
                    return Promise.reject(error);
                }
            );
        },
        updateService({commit},payload){
            return ServiceService.updateService(payload).then(
                () => {
                    return Promise.resolve();
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
        servicesByUser:state => {
            return state.servicesByUser;
        },
        currentService:state =>{
            return state.currentService;
        },
        categories:state => {
            return state.categories;
        },
    }
};
