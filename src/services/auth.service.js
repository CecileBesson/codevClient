import axios from 'axios';

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
            .post(API_URL + "users", user);
    }
}

export default new AuthService();