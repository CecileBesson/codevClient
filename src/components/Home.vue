<template>
<div>
  <h1>{{ $t("home.welcome") }}</h1>
  <div>
    <search-bar />
  </div>


</div>
</template>

<script>
import searchBar from "@/components/SearchBar";

export default {
  name: "Home",
  components: {searchBar},
  methods: {
    getToken(){
      return localStorage.getItem("token")
    }
  }
}
</script>

<style scoped>

</style>
