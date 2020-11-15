<template>
  <div>
    <div class="carousel-view">
      <h5>
        {{ $t("home.category") }}
      </h5>
      <CategoryCarousel v-if="categories.length>0" :categories="categories" @selectedCategory="onSelectedCategory"/>
    </div>
    <h5>
      {{ $t("home.serviceList")}}
    </h5>
    <div>
        <v-btn icon width="48" height="48" @click="showList = true">
          <v-icon> fas fa-list-ul</v-icon>
        </v-btn>
      <v-btn icon width="48" height="48" @click="showList = false">
        <v-icon>fas fa-map-marker-alt</v-icon>
        </v-btn>
    </div>

      <div>
      <h5>
        {{ $t("home.km")}}
      </h5>
            <v-slider class="km"
                      inverse-label
                      label="km"
                      thumb-label="always"
                      max="50"
                      v-model="perimeter"
                      @change="choosePerimeter(perimeter)"
            ></v-slider>

    </div>
    <v-row style="padding-left:20px">
      <HomeList v-if="showList" :services="services"/>
    </v-row>
    <div v-if="!showList">
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
      perimeter: 0,
      showList: true,
      mapKey: 1
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
          }) .catch(err => {
        console.log(err);
      })
    },
    onSelectedCategory(category, service){
      this.category = category;
      this.services = service;
      this.mapKey ++;
    }

  }
}
</script>
<style scoped>
h5{
  padding-top: 10px;
  margin-left: 5px;

}

.km{
  width:400px;
  padding-top:40px;
  padding-left: 15px;
  padding-right: 15px;
}
</style>
