<template>
  <div class="airport">
    <v-container>
      <v-sheet>
        <v-row class="info-box">
          <v-col cols="5">
            <v-list disabled>
              <v-subheader>AIRPORT INFO</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item v-for="(item, i) in items" :key="i">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle v-text="item.text">
                    </v-list-item-subtitle>
                    {{ item.data }}
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
          <v-col cols="7">
            <airport-map
              :mapLat="airportData.latitude"
              :mapLon="airportData.longitude"
            ></airport-map>
          </v-col>
        </v-row>
        &nbsp;
        <v-row height="300px" class="info-box">
          <v-col cols="3">
            <v-subheader>LOCATION INFO</v-subheader>
            <v-select
              :items="scopesAvailable"
              v-model="selectedScope"
              item-text="name"
              item-value="keyName"
              filled
              label="Scope"
            ></v-select>
          </v-col>
          <v-col cols="5">
            <v-list disabled>
              <v-list-item-group>
                <v-list-item>
                  <v-list-item-content style="white-space: nowrap">
                    <v-list-item-subtitle> Location </v-list-item-subtitle>
                    {{ scopeData.location_name }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle> Population </v-list-item-subtitle>
                    {{ scopeData.population }}
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
          <v-col>
            <v-tooltip left>
              <div>
                Warning <br />
                Colours
              </div>
              <template v-slot:activator="{ on, attrs }">
                <v-card
                  class="mx-auto"
                  height="150px"
                  width="200px"
                  style="float: right"
                >
                  <v-sheet
                    height="70%"
                    :color="riskColour"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <div class="risk-rating">
                      {{ scopeData.risk_rating.risk_index }}
                    </div>
                  </v-sheet>
                  <div class="text-overline mb-4">
                    RISK LEVEL: {{ scopeData.risk_rating.risk_level }}
                  </div>
                </v-card>
              </template>
              <span>
                <v-container
                  v-for="(m, outerIndex) in 3"
                  :key="outerIndex"
                  class="ma-0 pa-0"
                >
                  <v-row no-gutters>
                    <v-col no-gutters v-for="(n, index) in 3" :key="index">
                      <v-card
                        outlined
                        tile
                        style="width: 30px"
                        :color="getColourFromIndices(m, n)"
                      >
                        {{ getWarningIndex(m, n) }}
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
                <v-row class="ma-0 pa-0">
                  <v-card
                    outlined
                    tile
                    style="width: 90px; height: 20px"
                    color="purple"
                  >
                    10
                  </v-card>
                </v-row>
              </span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-sheet>
    </v-container>
  </div>
</template>
<script>
import AirportMap from "@/components/AirportMap.vue"

export default {
  name: "airport-info",
  components: {
    AirportMap,
  },
  props: ["airportInfo"],
  data() {
    return {
      riskColours: [
        "green",
        "green",
        "yellow",
        "yellow",
        "orange",
        "orange",
        "red",
        "red",
        "red darken-4",
      ],
      selectedScope: "country",
      scopeChoices: [
        { name: "country", keyName: "country" },
        {
          name: "state or province",
          keyName: "state_province",
        },
        {
          name: "county or district",
          keyName: "county_district",
        },
      ],
    }
  },
  computed: {
    airportData() {
      return this.airportInfo.airport
    },
    covidStats() {
      return this.airportInfo.covid_stats
    },
    scopeData() {
      return this.covidStats[this.selectedScope]
    },
    scopeName() {
      return (
        this.scopeData.location_type.charAt(0).toUpperCase() +
        this.scopeData.location_type.slice(1)
      )
    },
    scopesAvailable() {
      const scopeChoicesCopy = this.scopeChoices
      const allStatValues = Object.keys(this.covidStats)
      allStatValues.forEach((scopeKey) => {
        if (this.covidStats[scopeKey] === null) {
          const choiceIndex = scopeChoicesCopy.findIndex((choice) => {
            choice.keyName === scopeKey
          })
          scopeChoicesCopy.splice(choiceIndex, 1)
        }
      })
      return scopeChoicesCopy
    },
    riskColour() {
      return this.riskColours[this.scopeData.risk_rating.risk_index - 1]
    },
    items() {
      if (this.airportData) {
        const items = [
          {
            text: "Airport Name",
            icon: "mdi-airplane",
            data: this.airportData.name,
          },
          {
            text: "IATA Code",
            icon: "mdi-barcode",
            data: this.airportData.iata_code,
          },
          {
            text: "ICAO Code",
            icon: "mdi-barcode-scan",
            data: this.airportData.icao_code,
          },
          {
            text: "Country",
            icon: "mdi-flag",
            data: this.airportData.country_name,
          },
          {
            text: "City",
            icon: "mdi-city-variant-outline",
            data: this.airportData.city,
          },
        ]
        return items
      }
      return {}
    },
  },
  methods: {
    getColourFromIndices(row, col) {
      let colourIndex = 0
      switch (row) {
        case 1:
          colourIndex = col - 1
          break
        case 2:
          colourIndex = row + col
          break
        case 3:
          colourIndex = row + col + 2
          break
        default:
          colourIndex = 9
      }
      return this.riskColours[colourIndex]
    },
    getWarningIndex(row, col) {
      let warningNumber = 0
      switch (row) {
        case 1:
          warningNumber = col
          break
        case 2:
          warningNumber = row + col + 1
          break
        case 3:
          warningNumber = row + col + 3
          break
        default:
          warningNumber = 10
      }
      return warningNumber
    },
  },
}
</script>

<style scoped>
.info-box {
  border: solid;
  border-width: 2px 2px 2px 2px;
  color: rgb(85, 85, 85);
  border-radius: 12px;
}

.v-list-item-group {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.v-list-item {
  float: left;
  text-align: left;
}

.risk-rating {
  font-size: 56px;
  text-align: center;
  padding-top: 12px;
}
</style>
