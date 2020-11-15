<template>
  <div class="map">
    <div class="map">
    </div>
  </div>
</template>
<script>
import L from "leaflet"
export default {
  name: "HomeMap",
  props:{
    services: {},
  },
  mounted () {
    let map = L.map(this.$el).setView([45.75, 4.85], 11);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: ['a','b','c']
    }).addTo(map);
    if(this.services.length > 0){
      this.services.forEach(service => {
        L.marker([service.latitude, service.longitude]).addTo(map)
            .bindTooltip(service.name)
            .bindPopup(service.description)})
    }
  },
};
</script>

<style>
.map{
  height: 500px;
  width: 90%;
  margin-left: 20px;
  overflow: auto;
}
</style>
