import axios from 'axios';
import authHeader from "@/services/authHeader";

const API_URL = 'http://localhost:9000/api/v1/';
class ServiceService {
    getCategories() {
        console.log("Service.service")
        console.log("authheader" + authHeader().Authorization)
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
}

export default new ServiceService();
