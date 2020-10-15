<template>
<div>
  <h1>{{ $t("home.welcome") }}</h1>
</div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    getToken(){
      return localStorage.getItem("token")
    }
  }
}
</script>

<style scoped>

</style>
