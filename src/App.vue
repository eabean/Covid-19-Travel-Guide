<template>
  <v-app id="app">
    <v-app-bar app flat :color="appBarColour">
      <v-container class="py-0 fill-height">
        <img src="./assets/plane.png" class="img" />
        <v-app-bar-title class="title">Covid-19 Travel Guide</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn
          v-for="link in appLinks"
          :key="`${link.label}-header-link`"
          text
          rounded
          :to="link.url"
          class="mx-1"
        >
          {{ link.label }}
        </v-btn>
        <v-spacer></v-spacer>
        <iata-input @newInfo="setInfo" @error="errorAlert" />
      </v-container>
    </v-app-bar>
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list
                v-for="link in infoLinks"
                :key="`${link.label}-header-link`"
              >
                <v-btn text :to="link.url">
                  {{ link.label }}
                </v-btn>
              </v-list>
              <v-divider></v-divider>
              <v-list>
                <v-btn class="mt-n1 mb-2" @click="refresh" text>
                  Refresh
                </v-btn>
                <v-btn class="mb-2" @click="toggleTheme" text>
                  Toggle Theme
                </v-btn>
              </v-list>
            </v-sheet>
          </v-col>
          <v-col cols="10">
            <v-sheet min-height="80vh" rounded="xl">
              <v-main style="padding: 1em">
                <v-alert
                  :value="showAlert"
                  border="right"
                  colored-border
                  type="error"
                  elevation="2"
                  dismissible
                  @input="resetError"
                >
                  {{ error }}
                </v-alert>
                <router-view :airportInfo="airportInfo"></router-view>
              </v-main>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import IataInput from "./components/IataInput.vue"

export default {
  name: "App",
  components: {
    IataInput,
  },
  data() {
    return {
      airportInfo: {},
      error: null,
      showAlert: false,
      appLinks: [
        {
          label: "Home",
          url: "/home",
        },
        {
          label: "Help",
          url: "/help",
        },
        {
          label: "Credits",
          url: "/credits",
        },
      ],
      infoLinks: [
        {
          label: "Info",
          url: "/airportinfo",
        },
        {
          label: "Advisories",
          url: "/traveladvisories",
        },
        {
          label: "Statistics",
          url: "/statistics",
        },
      ],
    }
  },
  computed: {
    appBarColour() {
      return this.$vuetify.theme.dark ? "#1e1e1e" : "white"
    },
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.themes.dark.anchor = "#41B883"
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    setInfo(info) {
      this.airportInfo = info
    },
    errorAlert(error) {
      this.error = error
      this.showAlert = true
      this.airportInfo = {}
    },
    resetError() {
      this.error = null
      this.showAlert = false
    },
    refresh() {
      this.airportInfo = {}
      this.$eventHub.$emit("refresh")
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.img {
  width: 5%;
  margin-right: 1em;
}

.app-bar {
  color: white;
}
</style>
