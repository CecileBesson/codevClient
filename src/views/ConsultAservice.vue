<template>
  <div class="createService mt-4 mb-6">
    <h1>{{ currentService.name }}</h1>
    <div class="textContainer">
      <p>
        <strong>Description du service: </strong><br/>
        {{currentService.description}}
      </p>
    </div>
    <v-btn
        color="#1560BD"
        text
        @click="$router.push('/createConversation/' + currentService.idService)"
        v-if="numberAppointments == 0"
    >
      J'ai besoin de toi !
    </v-btn>

    <v-btn
        color="#1560BD"
        text
        @click="$router.push('/comingServices')"
        v-if="numberAppointments > 0"
    >
      Allez au Rendez-vous !
    </v-btn>

    <div>
      <HomeMap :services="serviceToPass" />
    </div>

 </div>

</template>

<script>
import HomeMap from "@/components/HomeMap"

export default {
  name: "ConsultAservice",
  props: {
    idService: String
  },
  components: {
    HomeMap
  },
  computed : {
    currentService: function () {
      return this.$store.getters.currentService;
    },
    serviceToPass() {
      return [this.currentService];
    },
    numberAppointments() {
      this.$store.dispatch("loadAppointmentsForCurrentService", this.idService);
      let conv =  this.$store.getters.appointmentsForService;
      if(conv.length == null) {
        return "Nombre de futurs rendez-vous ";
      }

      return conv.length;
    }
  },
  mounted() {
    this.$store.dispatch('getCurrentService', this.idService);
  }
}
</script>

<style scoped>
.createService {
  height: 600px;
  border: 1px solid #CCCCCC;
  background-color: #FFFFFF;
  margin: auto;
  margin-top: 50px;
  padding: 25px;
  text-align: center;
}

.textContainer {
  width: 100%;
  text-align: justify;
}

</style>