<template>
  <div>
    <h1 class="ma-4">{{ $t("drawer.offeredServices") }}</h1>
    <div style="max-width: 96%; margin-left: 2%;">
      <div class="pa-2 mb-2 container" v-for="service in services" :key="service.id" >
        <div v-if="service.active == true">
        <h2>
          {{ service.name }}
        </h2>
        <ul>
          <li><strong>{{ $t("comingServices.category") + ":"}}</strong> {{service.category.label }}</li>
          <li><strong>{{"Description: "}}</strong> {{service.description}}</li>
        </ul>
        <div class="d-flex justify-center mt-2">
          <v-btn
              color="primary"
              @click="goToService(service.idService)"
          >
            {{ $t("comingServices.go") }}
          </v-btn>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OwnServices",
  computed : {
    services: function () {
      return this.$store.getters.servicesByUser;
    }
  },
  methods: {
    goToService(idService) {
      this.$router.push("/consultYourService/" + idService); // todo: check it goes somewhere in the future
    }
  },
  created() {
    this.$store.dispatch('getServicesByUser');
  },
  updated(){
    this.$store.dispatch('getServicesByUser');
  }
}
</script>

<style scoped>
.title {
  font-size: 1.5em !important;
}
.text {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.link {
  color: black;
  text-decoration: none;
}

.servContainer:last-child div {
  border-bottom: 1px solid #dcdcdc;
}
.textContainer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border: none !important;
}
</style>