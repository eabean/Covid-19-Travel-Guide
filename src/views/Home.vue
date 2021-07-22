<template>
  <div id="home" v-if="hasInfo">
    <v-banner
      :value="hasInfo"
      app
      rounded="xl"
      color="#6c757d"
      class="white--text"
      style="text-align: left"
      single-line
    >
      <img :src="countryFlagURL" />
      <span style="padding-left: 16px"> {{ airportName }}</span>
    </v-banner>
    <router-view :airportInfo="airportInfo" v-if="airportInfo"></router-view>
  </div>
</template>

<script>
export default {
  name: "home",
  props: {
    airportInfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    hasInfo() {
      return Object.keys(this.airportInfo).length > 0
    },
    countryFlagURL() {
      let code = this.airportInfo.airport.country_code
      return "https://www.countryflags.io/" + code + "/flat/64.png"
    },
    airportName() {
      let airportName = this.airportInfo.airport.name
      if (!airportName.includes("Airport")) {
        airportName = airportName + " Airport"
      }
      if (airportName.includes("Intl")) {
        airportName = airportName.replace("Intl", "International")
      }
      return airportName
    },
  },
}
</script>

<style>
.home {
  font-family: Helvetica, Arial, sans-serif;
}
</style>
