<template>
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
             :key="category.text">
        <div class="img-container">
          <img class="img"
              :src="category.img"
               @click="onClickPicture()"
              :alt="category.text">
          <h3>{{ category.text }}</h3>
        </div>
      </slide>
    </carousel>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';
import diy from '../assets/diy.jpeg'
import move from '../assets/move.jpg'
import gardening from '../assets/gardening.jpg'
import babysitting from '../assets/babysitting.jpg'
import cleaning from '../assets/cleaning.jpeg'
import animals from '../assets/animals.jpg'
import it from '../assets/it.jpg'
import personalCare from '../assets/personalCare.jpg'
import privateLesson from '../assets/privateLesson.jpg'


export default {
  name: "Home",
  data: function () {
    return {
      categories: [
        {text: this.$t("carousel.DIY"), img: diy},
        {text: this.$t("carousel.gardening"), img: gardening},
        {text: this.$t("carousel.move"), img: move},
        {text: this.$t("carousel.cleaning"), img: cleaning},
        {text: this.$t("carousel.babySitting"), img: babysitting},
        {text: this.$t("carousel.animals"), img: animals},
        {text: this.$t("carousel.it"), img: it},
        {text: this.$t("carousel.personalCare"), img: personalCare},
        {text: this.$t("carousel.privateLesson"), img: privateLesson},
      ]
    }
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
    onClickPicture(){
      alert("coucou")
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
}


</style>
