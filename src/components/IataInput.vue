<template>
  <div class="iataInput">
    <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-2"
          depressed
          fab
          dark
          x-small
          color="#6c757d"
          style="margin-top: 4px; color: white"
          v-bind="attrs"
          v-on="on"
          href="https://www.nationsonline.org/oneworld/IATA_Codes/airport_code_list.htm"
          target="_blank"
        >
          <v-icon> mdi-airplane </v-icon>
        </v-btn>
      </template>
      <span> List of IATA Codes </span>
    </v-tooltip>
    <v-responsive class="textInput">
      <v-text-field
        v-model="userInput"
        dense
        flat
        hide-details
        rounded
        solo-inverted
        placeholder="Enter IATA code"
      ></v-text-field>
    </v-responsive>
    <v-spacer></v-spacer>
    <b-btn @click="getAirportData" :to="'/airportinfo'" style="color: white"
      >Get Airport Info</b-btn
    >
  </div>
</template>

<script>
import AxiosService from "@/services/AxiosService"

export default {
  name: "iata-input",
  data() {
    return {
      userInput: "",
      info: {},
    }
  },
  watch: {
    info(info) {
      this.$emit("newInfo", info)
    },
  },
  created() {
    this.$eventHub.$on("refresh", this.clearInput)
  },
  methods: {
    async getAirportData() {
      try {
        this.validateUserInput()
        const getService = new AxiosService()
        this.info = await getService.getAirportData(this.userInput)
      } catch (error) {
        console.log(error)
        this.$emit("error", "No valid response for this IATA input.")
      }
    },
    validateUserInput() {
      if (this.userInput.length !== 3) {
        throw "Error: IATA codes must be 3 letters."
      }
    },
    clearInput() {
      this.userInput = ""
    },
  },
}
</script>

<style scoped>
.iataInput {
  display: flex;
}

.textInput {
  margin-right: 1em;
}
</style>
