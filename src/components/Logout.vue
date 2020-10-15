<template>
<div>
  deconnexion
</div>
</template>

<script>
export default {
  name: "Logout",
  created() {
    this.$store.dispatch('logout').then(() => this.$router.push("/auth"));
  }
}

</script>

<style scoped>

</style>
