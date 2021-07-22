<template>
  <div class="stats" v-if="airportInfo">
    <covid-chart :allStats="stats" />
  </div>
</template>

<script>
import CovidChart from "@/components/CovidChart.vue"

export default {
  name: "stats-info",
  props: ["airportInfo"],
  components: {
    CovidChart,
  },
  computed: {
    stats() {
      return this.airportInfo.covid_stats
    },
  },
}
</script>
