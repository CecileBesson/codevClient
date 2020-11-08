<template>
  <div>
    <div class="carousel-view">
      <h5>
        {{ $t("home.category") }}
      </h5>
      <carousel
          :per-page="3"
          :perPageCustom="[[200, 3],[550,4], [1100, 4],[1380, 4]]"
          :navigation-enabled="true"
          :paginationEnabled="false"
          @touchstart.native="onTouchStart"
          @touchend.native="onTouchEnd"
      >
        <slide v-for="category in categories"
               :key="category.idCategory">
          <div class="img-container" >
            <img class="img" :style ="selectCategory(category.idCategory)"
                 :src="category.image"
                 @click="onClickPicture(category)"
                 :alt="category.label">
            <h3>{{ category.label }}</h3>
          </div>

        </slide>
      </carousel>
    </div>
    <h5>
      {{ $t("home.serviceList")}}
    </h5>
    <div>
        <v-btn icon width="48" height="48">
          <v-icon> fas fa-list-ul</v-icon>
        </v-btn>
      <v-btn icon width="48" height="48">
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
      <v-card class = "service" v-for="service in services"
              :key="service.idService"
              elevation="5">
        <v-card-title>
          {{ service.name }}
        </v-card-title>
        <v-card-text>
          {{ service.description}}
        </v-card-text>
        <v-card-actions>
          <v-btn
              color="#1560BD"
              text
          >
          J'ai besoin de toi !
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>


</template>
<script>
import { Carousel, Slide } from 'vue-carousel';
export default {
  name: "Home",
  data(){
    return {
      services : this.$store.getters.servicesByCategory,
      currentSelect : -1,
      currentCategory: {},
      gettingLocation: false,
      errorStr:null,
      perimeter: 0,
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
    Carousel,
    Slide,
  },
  methods: {
    getLatitude(){
      return localStorage.getItem("latitude")
    },
    getLongitude(){
      return localStorage.getItem("longitude")
    },
    onTouchStart() {
      //   if ( document.querySelector('body').style.overflow!=null ) document.querySelector('body').style.overflow = 'hidden';
    },
    onTouchEnd() {
      // if ( document.querySelector('body')!=null )  document.querySelector('body').style.overflow = 'auto';
    },
    onClickPicture(category){
        this.$store.dispatch('getServicesByCategory', category)
            .then(servicesByCategory => {
              this.services=servicesByCategory;
              this.currentSelect=category.idCategory;
              this.currentCategory= category;
            }) .catch(err => {
          console.log(err);
        })
    },
    choosePerimeter(perimeter){
      let category = this.currentCategory;
      let latitude = this.getLatitude();
      let longitude = this.getLongitude();
         this.$store.dispatch('getServicesByCategoryAndLocalisation', {category, latitude, longitude, perimeter} )
          .then(servicesByCategoryAndLocalisation => {
            this.services=servicesByCategoryAndLocalisation;
            this.currentSelect=this.currentCategory.idCategory;
          }) .catch(err => {
        console.log(err);
      })
    },
    selectCategory(id) {
      if (this.currentSelect === id)
        return(" border: inset  5px #1560BD;");
      else return "";

    }

  }
}
</script>
<style scoped>


.VueCarousel-slide .img-container {
  margin-top: 5px;
  margin-left: 5px;
  text-align: center;
}


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


@Media screen and (max-width: 500px) {
  .img {
    width:115px;

  }
  .VueCarousel-slide h3  {
    font-size: 12px;
  }
  .VueCarousel-slide .img-container {
    height: 110px;
  }
  h5{
    font-size: 14px;
  }
  .service{
    width: 300px;
    min-height: 100px;
    margin-left: 25px;
    margin-top: 20px;
  }

}

@Media screen and (min-width: 1500px) {
  .VueCarousel-slide h3 {
    font-size: 20px;
  }
  .VueCarousel-slide .img-container {
    height: 350px;
  }
  .img {
    border: 3px #000000;
  }
  .service{
    width: 450px;
    min-height: 300px;
    margin-left: 20px;
    margin-top: 20px;
  }

}
</style>
