<template>
  <div>
    <div class="carousel-view">
      <CategoryCarousel  v-if="categories.length>0" :categories="categories"  @selectedCategory="onSelectedCategory"/>
    </div>
    <div>
      <v-bottom-navigation
          v-model="showList"
          background-color="#164A84"
          dark
          shift>
        <v-btn icon @click="showList = true">
          <span>Liste</span>
          <v-icon>fas fa-stream fa-10x</v-icon>
        </v-btn>
        <v-btn icon  @click="showList = false">
          <span>Carte</span>
          <v-icon>fas fa-map-marker-alt</v-icon>
        </v-btn>
        <v-slider class="km"
                  inverse-label
                  label="km"
                  thumb-label="always"
                  thumb-size="0"
                  max="50"
                  v-model="perimeter"
                  @change="choosePerimeter(perimeter)"
        ></v-slider>
      </v-bottom-navigation>
    </div>
    <v-row style="padding-left:20px">
      <HomeList v-if="!showList" :services="services"/>
    </v-row>
    <div v-if="showList">
      <HomeMap :key="mapKey" :services="services"/>
    </div>
  </div>


</template>
<script>

import HomeList from "@/components/HomeList";
import CategoryCarousel from "@/components/CategoryCarousel";
import HomeMap from "@/components/HomeMap";

export default {
  name: "Home",
  data(){
    return {
      services : this.$store.getters.servicesByCategory,
      currentCategory: {},
      gettingLocation: false,
      errorStr:null,
      perimeter: 20,
      showList: true,
      mapKey: 1,
      isSelectedCategory: false,
    }
  },
  computed:{
    categories(){
      return this.$store.getters.categories
    },
  },
  created() {

    if(!("geolocation" in navigator)) {
      this.errorStr = 'Geolocation is not available.';
      return;
    }

    this.gettingLocation = true;
    // get position
   navigator.geolocation.getCurrentPosition(pos => {
          this.gettingLocation = false;
          localStorage.setItem("latitude", pos.coords.latitude)
          localStorage.setItem("longitude", pos.coords.longitude)
        },
        err => {
          this.gettingLocation = false;
          this.errorStr = err.message;
        })
    this.$store.dispatch('getCategories');
  },
  /* updated(){
    let category = this.currentCategory;
    let latitude = this.getLatitude();
    let longitude = this.getLongitude();
    let perimeter = this.perimeter
    this.$store.dispatch('getServicesByCategoryAndLocalisation', {category, latitude, longitude, perimeter} )
        .then(servicesByCategoryAndLocalisation => {
          this.services=servicesByCategoryAndLocalisation;
          this.mapKey++;
        }).catch(err => {
      console.log(err);
    })
  },

   */
  components: {
    CategoryCarousel,
    HomeList,
    HomeMap
  },
  methods: {
    getLatitude(){
      return localStorage.getItem("latitude")
    },
    getLongitude(){
      return localStorage.getItem("longitude")
    },
    choosePerimeter(perimeter){
      let category = this.currentCategory;
      let latitude = this.getLatitude();
      let longitude = this.getLongitude();
      this.$store.dispatch('getServicesByCategoryAndLocalisation', {category, latitude, longitude, perimeter} )
          .then(servicesByCategoryAndLocalisation => {
            this.services=servicesByCategoryAndLocalisation;
            this.mapKey++;
          }) .catch(err => {
        console.log(err);
      })
    },
    onSelectedCategory(category, service){
      this.isSelectedCategory = true;
      this.currentCategory = category;
      this.services = service;
      this.mapKey ++;
    }

  }
}
</script>
<style scoped>
@Media screen and (max-width: 500px) {
  h5{
    padding-top: 10px;
    margin-left: 5px;
    font-size: 12px;
  }
}

@Media screen and (min-width:500px) {
  h5{
    padding-top: 10px;
    margin-left: 5px;
    font-size: 25px;
  }
}

.km{
  width:50px;
  padding-top:15px;
  padding-left: 15px;
  padding-right: 15px;
}
</style>
