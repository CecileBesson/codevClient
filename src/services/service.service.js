import axios from 'axios';
import authHeader from "@/services/authHeader";

const API_URL = 'http://localhost:9000/api/v1/';
//const API_URL = 'http://82.64.132.220:9000/api/v1/';

class ServiceService {
    getCategories() {
        return axios
            .get(API_URL + "category", {headers: authHeader()})
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
    getServicesByCategoryAndLocalisation(category,latitude, longitude, perimeter){
        return axios
            .get(API_URL + "services", {
                headers: authHeader(),
                params: {
                    categoryId: category.idCategory,
                    lat: latitude,
                    lon: longitude,
                    perimeter: perimeter
                }})
            .then(response => {
                return response.data;
            });
    }
    createService(newService){
        return axios
            .post(API_URL + "services", newService, {
                headers: authHeader()
            })
            .then(response => {
            return response.data
        });
    }
}

export default new ServiceService();
