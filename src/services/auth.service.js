import axios from 'axios';
import authHeader from "@/services/authHeader";

const API_URL = 'http://localhost:9000/api/v1/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + "auth", {
                email: user.email,
                password: user.password
            })
            .then(response => {
                return response.data.token;
            });
    }
    register(user) {
        return axios
            .post(API_URL + "users", user)
            .then(response => {
                return response;
            });
    }
    updateSettings(user) {
        return axios
            .patch(API_URL + "users", user, {
                headers: authHeader()
            })
            .then(response => {
                return response;
            });
    }
    getCurrentUser(){
        return axios
            .get(API_URL + "users", {
                headers: authHeader()
            })
            .then(response => {
                return response;
            });
    }
}

export default new AuthService();
