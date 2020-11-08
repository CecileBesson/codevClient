import axios from 'axios';

import authHeader from "@/services/authHeader";

const API_URL = 'http://localhost:9000/api/v1/';

class MessagesService {
    getConversations() {
        return axios
            .get(API_URL + "conversations", { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
    getNewMessage() {
        return axios
            .get(API_URL + "messages/new", { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
}

export default new MessagesService();