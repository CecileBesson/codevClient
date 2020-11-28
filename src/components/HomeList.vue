<template>
  <v-row>
    <v-card class = "service" v-for="service in services"
            :key="service.idService"
            elevation="5">
      <v-card-title>
        <v-row style="font-size: 16px;">
          <v-col class="name">
            {{ service.name }}
          </v-col>
          <v-col class="km">
            {{ getKilometers(service) }} km
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="text">
        {{ service.description}}
      </v-card-text>
      <v-card-actions>
        <v-btn
            color="#1560BD"
            text>
          J'ai besoin de toi !
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>

export default {
  name: "HomeList",
  props: {
    services: {},
  },
  methods: {
    getKilometers(service){
      return this.getDistanceFromLatitudeLongitudeInKm(service.latitude, service.longitude, localStorage.getItem("latitude"), localStorage.getItem("longitude"));
     // return geolocalisation.getDistanceFromLatitudeLongitudeInKm(service.latitude, service.longitude, localStorage.getItem("latitude"), localStorage.getItem("longitude"));
    },
    deg2rad(deg) {
      return deg * (Math.PI/180)
    },
    getDistanceFromLatitudeLongitudeInKm(serviceLatitude, serviceLongitude, userLatitude, userLongitude) {
      let R = 6371; // Radius of the earth in km
      let dLat = this.deg2rad(userLatitude-serviceLatitude);  // deg2rad below
      let dLon = this.deg2rad(userLongitude-serviceLongitude);
      let a =
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(this.deg2rad(serviceLatitude)) * Math.cos(this.deg2rad(userLatitude)) *
          Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      let d = R * c; // Distance in km
      return parseFloat(d.toString()).toFixed(1);
    }
  }
}
</script>

<style scoped>
@Media screen and (max-width: 500px) {
  .service{
    width: 320px;
    height: 270px;
    min-height: 100px;
    margin-left: 25px;
    margin-top: 20px;
  }
  .text{
    font-size: 14px;
    text-align: justify;
  }
  .km{
    text-align: right;
  }
  .name{
    text-align: left;
  }
}

@Media screen and (min-width:500px) {
  .service{
    width: 400px;
    min-height: 100px;
    margin-left: 25px;
    margin-top: 20px;
  }
  .km{
    text-align: right;
  }
  .name{
    text-align: left;
  }
}
</style>
