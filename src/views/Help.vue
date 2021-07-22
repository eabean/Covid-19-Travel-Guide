<template>
  <v-stepper v-model="e1">
    <v-subheader> HOW-TO GUIDE </v-subheader>
    <v-stepper-header>
      <v-stepper-step step="1">Searching for info</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2">IATA code look up</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">Navigation</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="4">Extras</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-12" color="grey lighten-1" height="520px">
          <v-img src="@/assets/1.png"></v-img>
        </v-card>
        <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12" color="grey lighten-1" height="520px">
          <v-img src="@/assets/2.png"></v-img>
        </v-card>
        <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-12" color="grey lighten-1" height="520px">
          <v-img src="@/assets/3.png"></v-img>
        </v-card>
        <v-btn color="primary" @click="e1 = 4"> Continue </v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card class="mb-12" color="grey lighten-1" height="520px">
          <v-img src="@/assets/4.png"></v-img>
        </v-card>
        <v-btn color="primary" @click="e1 = 1"> Continue </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
  name: "Help",
  data() {
    return {
      e1: 1,
    }
  },
}
</script>
