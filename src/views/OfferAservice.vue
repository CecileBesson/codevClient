<template>
  <v-form class="createService" v-model="isValid" @submit.prevent="offerAService">
    <h1>{{ $t("drawer.offerAservice") }}</h1>
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
        <v-select
          v-model="categories"
          :items="categories"
          item-text="label"
          label="Type de service"
          return-object
          @input="setSelectedCategory"
        >
        </v-select>
    <v-text-field
        v-model="description"
        name="description"
        label="Description du service"
    ></v-text-field>
    <v-btn type="submit" :disabled="!isValid">
      {{ $t("drawer.offerAservice") }}
    </v-btn>
  </v-form>
</template>

<script>


export default {
  name: "OfferAservice",
  computed: {
    categories() {
      return this.$store.getters.categories
    }
  },
  data(){
    return {
      selectedCategory: "",
      serviceName : "",
      address: "",
      description : "",
      isValid: true,
    }
  },
 created() {
    this.$store.dispatch('getCategories');
  },
  methods: {
    setSelectedCategory(value){
      this.selectedCategory = value;
    },
    offerAService: function () {
      fetch("https://api-adresse.data.gouv.fr/search/?q="+ this.address)
          .then(location => location.json())
          .then(response => {
            let data = {
              name: this.serviceName,
              description: this.description,
              longitude: response['features'][0]['geometry']['coordinates'][0],
              latitude: response['features'][0]['geometry']['coordinates'][1],
              category: {
                idCategory :this.selectedCategory.idCategory
              },
            }
            this.$store.dispatch('createService', data)
          })
          .catch(err => console.log(err));
    },
  }
  }
</script>

<style scoped>
.createService {
  width: 600px;
  border: 1px solid #CCCCCC;
  background-color: #FFFFFF;
  margin: auto;
  margin-top: 200px;
  padding: 25px;
  text-align: center;
}
</style>
