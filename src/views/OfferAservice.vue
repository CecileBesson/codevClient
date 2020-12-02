<template>
  <v-form class="createService" v-model="isValid" @submit.prevent="offerAService">
    <h1>{{ $t("drawer.offerAservice") }}</h1>
    <v-text-field
        v-model="serviceName"
        name="nom"
        label="Nom du service"
    ></v-text-field>
    <v-autocomplete
        v-model="address"
        label="Adresse du service"
        :items="addressesOptions"
        :loading="loadingAdresses"
        :search-input.sync="search"
        hide-no-data
        clearable
        return-object
        @input="setAddress"
    ></v-autocomplete>
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

import debounce from 'debounce'
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
      keyService: -1,
      addressesOptions: [],
      loadingAdresses: false,
      search: ' '
    }
  },
  created() {
    this.$store.dispatch('getCategories');
  },
  watch: {
    search(value){
      if(!value){
        return
      }
      debounce(this.makeSearch, 200)(value, this)
    }
  },
  methods: {
    setSelectedCategory(value){
      this.selectedCategory = value;
    },
    makeSearch: async (value, self) => {
      // Handle empty value
      if (!value) {
        self.addressesOptions = [];
        self.address = '';
      }
      // Items have already been requested
      if (self.loadingAdresses) {
        return
      }
      self.loadingAdresses = true

      fetch("https://api-adresse.data.gouv.fr/search/?q="+ value + "&autocomplete=1")
          .then(options => options.json())
          .then(response =>
          {
            for(let i=0; i< response['features'].length; i++){
              self.addressesOptions.push(response['features'][i]['properties']['label']);
            }
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => (self.loadingAdresses = false))

    },
     setAddress(value){
       this.address = value;
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
                idCategory: this.selectedCategory.idCategory
              },
              active: true
            }
            this.$store.dispatch('createService', data)
                .then(() => {
                  // todo: push to /mesServicesProposés
                  this.$router.push("/");
                })
                .catch(err => console.log(err));
          })
    }
  },
}
</script>

<style scoped>
@Media screen and (max-width: 500px) {
  .createService {
    width: 90%;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 100px;
    padding: 25px;
    text-align: center;
  }
  h1{
    font-size: 19px;
    margin-bottom: 20px;
  }
}

@Media screen and (min-width:500px) {
  .createService {
    width: 600px;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 200px;
    padding: 25px;
    text-align: center;
  }
}
</style>
