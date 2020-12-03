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
  data() {
    return {
      markers: [],
      map: null
    }
  },
  props:{
    services: {},
  },
  watch: {
    services() {
      this.updateMarkers();
    }
  },
  methods: {
    updateMarkers() {
      for(var i = 0; i < this.markers.length; i++){
        this.map.removeLayer(this.markers[i]);
      }

      if(this.services.length > 0){
        this.services.forEach(service => {
          if(service.active == true){
            const marker = L.marker([service.latitude, service.longitude]);
            this.markers.push(marker);
            marker.addTo(this.map).bindTooltip(service.name).bindPopup(service.description);
          }
        })
      }
    }
  },
  mounted () {
    this.map = L.map(this.$el).setView([45.75, 4.85], 11)
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: ['a','b','c']
    }).addTo(this.map);

    this.updateMarkers();
  }
};
</script>

<style>
.map{
  height: 400px;
  width: 96%;
  margin-top: 25px;
  margin-left: 2%;
  overflow: auto;
  z-index: 1;
  padding: 0;
}
</style>
