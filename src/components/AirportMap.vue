<template>
  <div class="map">
    <GmapMap :center="center" :zoom="12" style="width: 100%; height: 400px">
      <GmapMarker :position="center"></GmapMarker>
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "AirportMap",
  props: {
    mapLat: {
      type: Number,
      required: false,
    },
    mapLon: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    center() {
      let locationObject = {
        lat: this.latitude,
        lng: this.longitude,
      }
      return locationObject
    },
    latitude() {
      return parseFloat(this.mapLat.toFixed(3))
    },
    longitude() {
      return parseFloat(this.mapLon.toFixed(3))
    },
  },
}
</script>

<style scoped>
#map {
  height: 100%;
}
</style>
