 export default  class Geolocalisation {
     deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    static getDistanceFromLatitudeLongitudeInKm(serviceLatitude, serviceLongitude, userLatitude, userLongitude) {
        let R = 6371; // Radius of the earth in km
        let dLat = this.deg2rad(userLatitude-serviceLatitude);  // deg2rad below
        let dLon = this.deg2rad(userLongitude-serviceLongitude);
        let a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(serviceLatitude)) * Math.cos(this.deg2rad(userLatitude)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let d = R * c; // Distance in km
        return d;
    }

 }



