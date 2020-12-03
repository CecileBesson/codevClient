<template>
  <v-form class="ma-4 updateservice" v-model="isValid" @submit.prevent="Modify(idService)">
    <h1>{{ "Modifier un service" }}</h1>
    <v-text-field
        v-model="serviceName"
        name="nom"
        label="Nom du service"
    ></v-text-field>
    <v-text-field
        v-model="address"
        name="adress"
        label="Adresse du service"
    ></v-text-field>
    <v-text-field
        v-model="description"
        name="description"
        label="Description du service"
    ></v-text-field>
    <v-btn color="primary" type="submit" :disabled="!isValid">
      {{ $t("Modifier le service") }}
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "Update",
  props: {
    idService: String,
  },
  data() {
    return {
      selectedCategory: {},
      serviceName: null,
      address: null,
      description: null,
      isValid: true,
    }
  },
  methods: {
    Modify(){
      fetch("https://api-adresse.data.gouv.fr/search/?q=" + this.address)
          .then(location => location.json())
          .then(response => {
            let data = {
              idService: this.idService,
              name: this.serviceName,
              description: this.description,
              longitude: response['features'][0]['geometry']['coordinates'][0],
              latitude: response['features'][0]['geometry']['coordinates'][1]
            }
            this.$store.dispatch('updateService', data );
            this.$router.push("/consultYourService/" + this.idService);
          })
          .catch(err => console.log(err));
    }
  },
  computed: {
    currentService: function () {
      return this.$store.getters.currentService;
    }
  },
  created() {
    this.$store.dispatch('getCurrentService', this.idService);
  }
}
</script>

<style scoped>
.updateservice {
  border: 1px solid #CCCCCC;
  padding: 25px;
  text-align: center;
}
</style>