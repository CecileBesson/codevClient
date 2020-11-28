<template>
  <div>
    <h1 class="ma-4">{{ $t("drawer.comingServices") }}</h1>
    <div style="max-width: 96%; margin-left: 2%;">
      <div class="pa-2 mb-2 container" v-for="appointment in appointments" :key="appointment.id" :class="[
                appointment.toDo ? 'toDo' : '',
              ]">
        <h2>
          {{ appointment.service.name }}
          <span v-show="appointment.toDo">
            {{ $t("comingServices.toDo") }}
          </span>
        </h2>
        <ul>
          <li>{{ $t("comingServices.category") + " : " + appointment.service.category.label }}</li>
          <li>
            {{ $t("comingServices.date") }} : <strong> {{ formatDate(appointment.date) }}</strong>
            {{ $t("comingServices.at") }}  <strong>{{ appointment.startHour.substr(0, 5) }}</strong>
          </li>
        </ul>
        <div class="d-flex justify-center mt-2">
          <v-btn
            color="primary"
            @click="goToService(appointment.service.idService)"
          >
            {{ $t("comingServices.go") }}
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppointmentsService from '../services/appointments.service';

export default {
  name: "ComingServices",
  data: function () {
    return {
      appointments: []
    }
  },
  methods: {
    syncAppointments() {
      AppointmentsService.appointmentsToCome().then(
          appointments => {
            this.appointments = appointments;
          }
      );
    },
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    goToService(idService) {
      this.$router.push("/service/" + idService); // todo: check it goes somewhere in the future
    }
  },
  created() {
    this.syncAppointments();
  }
}
</script>

<style scoped>
  h2 span {
    font-size: 0.8em;
  }
  div.container {
    border: 2px solid #dadbde;
    border-radius: 5px;
  }
  .toDo {
    border-color: #1976D2 !important;
  }
</style>