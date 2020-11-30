import axios from 'axios';

import authHeader from "@/services/authHeader";

const API_URL = 'https://codev.tom-befieux.fr/api/v1/';

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
    getCurrentConversation(idService, idUser1, idUser2) {
        return axios
            .get(API_URL + "conversations/" + idService + "/with/"+ idUser1 +"/and/" + idUser2,
                { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
    sendNewMessage(text, idService, idReceiver) {
        return axios
            .post(API_URL + "messages", {
                text: text,
                idService: idService,
                idReceiver: idReceiver
            }, { headers: authHeader() }).then(
                () => {
                    return Promise.resolve();
                }
            )
    }
}

export default new MessagesService();
