<template>
  <div class="createService">
    <h1>{{ currentService.name }}</h1>
    <div CLASS="textContainer">
      <p><strong> Description du service: </strong> {{currentService.description}}</p>
    </div>
    <div>
      <HomeMap :services="[currentService]" />
    </div>
    <v-btn
        color="#1560BD"
        text
        @click="$router.push('/conversation/' + currentService.idService)"
    >
      J'ai besoin de toi !
    </v-btn>
  </div>

</template>

<script>
export default {
  name: "ConsultAservice",
  props: {
    idService: String
  },
  data(){
    return {
      mapKey: 2
    }
  },
  computed : {
    currentService: function () {
      return this.$store.getters.currentService;
    },

    numberAppointments() {
      let conv = this.$store.getters.currentService;
      if(conv === null) {
        return "Nombre de futurs rendez-vous ";
      }

      return conv.length;
    }
  },
  created() {
    this.$store.dispatch('getCurrentService', this.idService);

  }
}
</script>

<style scoped>
.createService {
  width: 1600px;
  height: 600px;
  border: 1px solid #CCCCCC;
  background-color: #FFFFFF;
  margin: auto;
  margin-top: 50px;
  padding: 25px;
  text-align: center;
}

.textContainer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border: none !important;
}

</style>