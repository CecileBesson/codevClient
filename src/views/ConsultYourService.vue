<template>
  <v-form class="createService">
    <h1>{{ serviceTitle }}</h1>
    <div><strong> futur rendez-vous: </strong> {{numberAppointments}} <br></div>
    <div class="textContainer">
      <p><strong> Description du service: </strong> {{serviceDesc}}</p>
    </div>
    <div>
        <v-btn @click="$router.push('/Messages/' + idService)"> Conversations</v-btn>

        <v-btn  class ="blue white--text" @click="$router.push('/Update/' + idService)">  Modification </v-btn>

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
      let conv = this.$store.getters.conversations_Service;
      if(conv === null) {
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