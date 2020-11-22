import axios from 'axios';

import authHeader from "@/services/authHeader";

const API_URL = 'http://localhost:9000/api/v1/';

class AppointmentsService {
    getAppointmentsForConversation(idService, idUser) {
        return axios
            .get(API_URL + "appointments/service/" + idService + "/user/" + idUser, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
    deleteAppointment(idAppointment) {
        return axios
            .delete(API_URL + "appointments/" + idAppointment, { headers: authHeader() });
    }
    acceptAppointment(idAppointment) {
        return axios
            .post(API_URL + "appointments/" + idAppointment + "/accepted", null,{ headers: authHeader() });
    }
}

export default new AppointmentsService();