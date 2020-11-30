import axios from 'axios';

import authHeader from "@/services/authHeader";

const API_URL = 'https://codev.tom-befieux.fr/api/v1/';

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
    newAppointment(date, startHour, idService) {
        return axios.post(API_URL + "appointments", {
            date: date,
            startHour: startHour + ":00",
            idService: idService
        }, { headers: authHeader() }).then(
            () => {
                return Promise.resolve();
            }
        )
    }
    appointmentsToCome() {
        return axios
            .get(API_URL + "appointments/coming", { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
}

export default new AppointmentsService();
