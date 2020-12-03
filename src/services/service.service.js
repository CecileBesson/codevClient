import axios from 'axios';
import authHeader from "@/services/authHeader";

const API_URL = 'https://codev.tom-befieux.fr/api/v1/';

class ServiceService {
    getCategories() {
        return axios
            .get(API_URL + "category", {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }
    getServiceById(idService) {
        return axios
            .get(API_URL + "services/" + idService, {
                headers: authHeader()
                })
            .then(response => {
                return response.data;
            });
    }
    getServicesByCategory(category) {
        return axios
            .get(API_URL + "services", {
                headers: authHeader(),
                params: {
                    categoryId: category.idCategory
                }})
            .then(response => {
                return response.data;
            });
    }
    getServicesByUser() {
        return axios
            .get(API_URL + "services/owned", {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }
    getServicesByCategoryAndLocalisation(category, latitude, longitude, perimeter) {
        let params = {};
        if(category && category.idCategory) {
            params["categoryId"] = category.idCategory;
        }
        if(latitude) {
            params["lat"] = latitude;
        }
        if(longitude) {
            params["lon"] = longitude;
        }
        if(perimeter) {
            params["perimeter"] = perimeter;
        }

        return axios
            .get(API_URL + "services", { headers: authHeader(), params: params })
            .then(response => {
                return response.data;
            });
    }
    createService(newService) {
        return axios
            .post(API_URL + "services", newService, {
                headers: authHeader()
            })
            .then(response => {
                return response.data
            });
    }
    deleteService(idService){
        return axios
            .delete(API_URL + "services/" + idService,{
                headers: authHeader()
            })
            .then(response =>{
                return response.data
            })
    }
    updateService(payload){
        return axios
            .patch(API_URL + "services/" + payload.idService, payload,{
                headers: authHeader()
            })
            .then(response =>{
                return response.data
            })
    }
    getAll() {
        return axios
            .get(API_URL + "services", { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
}

export default new ServiceService();
