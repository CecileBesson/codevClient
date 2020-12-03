<template>
  <v-form class="createService">
    <h1>{{ serviceTitle }}</h1>

    <p class="textContainer">
      <strong> Futur rendez-vous: </strong> {{numberAppointments}}
    </p>

    <div class="textContainer">
      <p>
        <strong> Description du service: </strong><br/>
        {{serviceDesc}}
      </p>
    </div>
    <div class="buttonContainer">
        <v-btn class="blue white--text" @click="$router.push('/messages/' + idService)"> Conversations</v-btn>
        <v-btn @click="$router.push('/Update/' + idService)">  Modification </v-btn>
        <v-btn class ="red white--text" @click="Delete()"> Suppresion </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  name: "ConsultYourService",
  props: {
    idService: String
  },
  computed : {
    currentService: function () {
      return this.$store.getters.currentService;
    },
    numberAppointments() {
      this.$store.dispatch("loadAppointmentsForCurrentService", this.idService);
      let conv =  this.$store.getters.appointmentsForService;
      if(conv.length == null) {
        return "Nombre de futurs rendez-vous ";
      }

      return conv.length;
    },
    serviceDesc() {
      let conv = this.$store.getters.currentService;
      if(conv === null) {
        return "Description détaillé du service proposé";
      }
      return conv.description;
    },
    serviceTitle() {
      let conv = this.$store.getters.currentService;
      if(conv === null) {
        return "Nom du service";
      }
      return conv.name;
    }
  },
  methods:{
    Delete(){
      this.$store.dispatch('deleteService', this.idService);
      this.$router.push("/ownedServices");
    }
  },
  created() {
    this.$store.dispatch('getCurrentService', this.idService);
    this.$store.dispatch('getConversationsRelated', this.idService);
  }
}
</script>

<style scoped>
.createService {
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

.buttonContainer button {
  width: 200px;
  margin-top: 15px;
}

</style>