<template>
<div>
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
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';


export default {
name: "CategoryCarousel",
  data(){
    return{
      currentSelect: -1
    }
  },
  props:{
    categories: Array,
  },
  components:{
    Carousel,
    Slide,
  },
  methods:{
    created(){

    },
    selectCategory(id) {
      if (this.currentSelect === id)
        return(" border: inset  5px #1560BD;");
      else return "";
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
            this.currentSelect=category.idCategory;
            this.$emit('selectedCategory', category, servicesByCategory);
          }) .catch(err => {
        console.log(err);
      })
    },
  }
}
</script>

<style scoped>
.VueCarousel-slide .img-container {
  margin-top: 5px;
  margin-left: 5px;
  text-align: center;
}
@Media screen and (max-width: 500px) {
  .img {
    width:115px;
  }
  .VueCarousel-slide h3  {
    font-size: 14px;
    color: #164A84;
  }
  .VueCarousel-slide .img-container {
    height: 110px;
  }
  h5{
    font-size: 14px;
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
}
</style>
