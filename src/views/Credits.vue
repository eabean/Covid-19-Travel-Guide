<template>
  <div id="credits">
    <h1 class="text-h2 font-weight-medium">Credits</h1>
    <v-card flat class="pt-4">
      <p class="pl-4 text-left font-weight-light">
        Special thanks to Github users: Shaeyi-lu, tiangela1027 for project
        conception.
      </p>
      <p class="pl-4 text-left font-weight-light">
        This project was created using the Lumo COVID-19 API. You can find it
        <a href="https://covid-developer-docs.thinklumo.com/" target="_blank"
          >here</a
        >.Thanks to Lumo API Support for debugging help.
      </p>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Credits",
  data() {
    return {}
  },
}
</script>

<style>
.credits {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
