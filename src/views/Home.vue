<template>
  <div>
    <div class="carousel-view">
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
            <h3   >{{ category.label }}</h3>
          </div>

        </slide>
      </carousel>
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
    }
  },
  computed:{
    categories(){
      return this.$store.getters.categories
    },

  },
  created() {
    this.$store.dispatch('getCategories');
  },
  components: {
    Carousel,
    Slide,
  },
  methods: {
    getToken(){
      return localStorage.getItem("token")
    },
    onTouchStart() {
      //   if ( document.querySelector('body').style.overflow!=null ) document.querySelector('body').style.overflow = 'hidden';
    },
    onTouchEnd() {
      // if ( document.querySelector('body')!=null )  document.querySelector('body').style.overflow = 'auto';
    },
    onClickPicture(category){
      this.$store.dispatch('getServicesByCategory', category).then(servicesByCategory => {
         this.services=servicesByCategory;
         this.currentSelect=category.idCategory;

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
.VueCarousel-slide {
  height: 400px;
  text-align: center;
}

.VueCarousel-slide .img-container {
  margin-top: 20px;
  margin-left: 5px;
}

.service{
  width: 450px;
  min-height: 300px;
  margin: 10px;
}

@Media screen and (max-width: 500px) {
  .img {
    width:115px;

  }
  .VueCarousel-slide h3 {
    font-size: 12px;
  }
}

@Media screen and (min-width: 1500px) {
  .VueCarousel-slide h3 {
    font-size: 20px;
  }
  .img {
    border: 3px #000000;
  }
}
</style>
