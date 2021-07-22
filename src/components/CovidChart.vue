<template>
  <div>
    <v-sheet>
      <v-toolbar flat class="title-bar">
        <v-subheader
          >COVID-19 CASES IN {{ locationName.toUpperCase() }}</v-subheader
        >
        <v-btn color="primary" :href="dataSourceURL" target="_blank"
          >Data Source</v-btn
        >
        &nbsp;&nbsp;&nbsp;
        <v-btn color="primary" @click="overlay = !overlay"
          >Alternative Graph</v-btn
        >
      </v-toolbar>
      <canvas id="covid-chart"></canvas>
      <v-overlay z-index="1" :value="overlay" absolute opacity="0.9">
        <v-progress-circular
          v-show="!altGraphIsLoaded"
          indeterminate
          color="primary"
          class="mb-16"
        ></v-progress-circular>
        <img
          id="alt=graph"
          :src="altGraphURL"
          @load="altGraphIsLoaded = true"
          style="padding-bottom: 32px"
        />
        <br />
        <v-btn color="primary" @click="overlay = false"> Exit </v-btn>
      </v-overlay>
      <v-toolbar height="175px" flat>
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-select
                :items="chartsAvailable"
                v-model="selectedScope"
                item-text="name"
                item-value="value"
                filled
                label="Scope"
                @change="altGraphIsLoaded = false"
              ></v-select>
            </v-col>
            <v-col cols="8" class="outline-box">
              <div class="graph-options-title">Graph Options</div>
              <b-button-group
                class="d-flex pa-2 justify-space-between align-center"
              >
                <v-checkbox
                  v-model="selectedData"
                  label="New Cases"
                  value="newCases"
                ></v-checkbox>
                <v-checkbox
                  v-model="selectedData"
                  label="New Deaths"
                  value="newDeaths"
                ></v-checkbox>
                <v-checkbox
                  v-model="selectedData"
                  label="Show bar graphs"
                  value="bar"
                ></v-checkbox>
                <v-checkbox
                  v-model="selectedData"
                  label="Logarithmic y-axis"
                  value="logarithmic"
                  style="word-wrap: break-word"
                ></v-checkbox>
              </b-button-group>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-range-slider
              hint="Pick a date range"
              v-model="sliderRange"
              :max="sliderMax"
              :min="sliderMin"
              style="max-width: 800px"
              @input="changeDateRange"
            >
              <template v-slot:prepend>
                <v-text-field
                  label="Start Date"
                  :value="selectedRange[sliderRange[0]]"
                  class="mt-0 pt-0"
                  filled
                ></v-text-field>
              </template>
              <template v-slot:append>
                <v-text-field
                  label="End Date"
                  :value="selectedRange[sliderRange[1]]"
                  class="mt-0 pt-0"
                  filled
                ></v-text-field>
              </template>
            </v-range-slider>
          </v-row>
        </v-container>
      </v-toolbar>
    </v-sheet>
  </div>
</template>

<script>
import Chart from "chart.js"
export default {
  name: "covid-chart",
  data() {
    return {
      selectedRange: [],
      sliderRange: [0, 27],
      sliderMin: 0,
      sliderMax: 27,
      countryData: null,
      stateProvinceData: null,
      countyDistrictData: null,
      selectedScope: "countryData",
      selectedData: ["newCases", "newDeaths"],
      covidChart: null,
      overlay: false,
      altGraphIsLoaded: false,
      chartChoices: [
        { name: "country", value: "countryData", keyName: "country" },
        {
          name: "state or province",
          value: "stateProvinceData",
          keyName: "state_province",
        },
        {
          name: "county or district",
          value: "countyDistrictData",
          keyName: "county_district",
        },
      ],
    }
  },
  props: {
    allStats: {
      type: Object,
      required: false,
    },
  },
  computed: {
    chartsAvailable() {
      const chartChoicesCopy = this.chartChoices
      const allStatValues = Object.keys(this.allStats)
      allStatValues.forEach((scopeKey) => {
        if (this.allStats[scopeKey] === null) {
          const choiceIndex = chartChoicesCopy.findIndex((choice) => {
            choice.keyName === scopeKey
          })
          chartChoicesCopy.splice(choiceIndex, 1)
        }
      })
      return chartChoicesCopy
    },
    dateRanges() {
      return this.selectedRange.slice(
        this.sliderRange[0],
        this.sliderRange[1] + 1
      )
    },
    covidChartData() {
      let covidData = {
        type: "line",
        data: {
          labels: this.dateRanges,
          datasets: [
            {
              label: "New Cases",
              data: this[this.selectedScope].new_cases,
              backgroundColor: "rgba(220,70,70,0.5)",
              borderColor: "#8D0505",
              borderWidth: 2,
              hidden: this.selectedData.includes("newCases") ? false : true,
              linewidth: 2,
            },
            {
              label: "New Deaths",
              data: this[this.selectedScope].new_deaths,
              backgroundColor: "rgba(54,73,93,.5)",
              borderColor: "#000000",
              borderWidth: 2,
              hidden: this.selectedData.includes("newDeaths") ? false : true,
            },
            {
              label: "New Cases",
              type: "bar",
              data: this[this.selectedScope].new_cases,
              backgroundColor: "rgba(220,70,70,.5)",
              borderColor: "#8D0505",
              borderWidth: 2,
              hidden:
                this.selectedData.includes("newCases") &&
                this.selectedData.includes("bar")
                  ? false
                  : true,
            },
            {
              label: "New Deaths",
              type: "bar",
              data: this[this.selectedScope].new_deaths,
              backgroundColor: "rgba(54,73,93,.5)",
              borderColor: "#000000",
              borderWidth: 2,
              hidden:
                this.selectedData.includes("newDeaths") &&
                this.selectedData.includes("bar")
                  ? false
                  : true,
            },
          ],
        },
        options: {
          responsive: true,
          lineTension: 1,
          bezierCurve: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                  maxTicksLimit: 15,
                  callback: (val) => {
                    if (this.selectedData.includes("logarithmic")) {
                      return val.toLocaleString("fullwide", {
                        useGrouping: false,
                      })
                    }
                    return val
                  },
                },
                type: this.selectedData.includes("logarithmic")
                  ? "logarithmic"
                  : "linear",
              },
            ],
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          layout: {
            padding: 30,
          },
          legend: {
            labels: {
              filter: (legendItem) => {
                return (
                  (legendItem.datasetIndex === 0 ||
                    legendItem.datasetIndex === 1) &&
                  !legendItem.hidden
                )
              },
            },
          },
        },
      }
      return covidData
    },
    currentScopeKey() {
      let scope = "country"
      this.chartChoices.forEach((choice) => {
        if (choice.value === this.selectedScope) {
          scope = choice.keyName
        }
      })
      return scope
    },
    dataSourceURL() {
      return this.allStats[this.currentScopeKey].data_source
    },
    altGraphURL() {
      return this.allStats[this.currentScopeKey].chart_url
    },
    locationName() {
      return this.allStats[this.currentScopeKey].location_name
    },
  },
  watch: {
    selectedScope() {
      if (this.covidChart !== null) {
        this.covidChart.destroy()
      }
      this.renderChart()
    },
    selectedData() {
      if (this.covidChart !== null) {
        this.covidChart.destroy()
      }
      this.renderChart()
    },
  },
  mounted() {
    this.renderChart()
  },
  beforeMount() {
    this.getData(this.allStats)
  },
  methods: {
    getData(allStats) {
      if (allStats["country"]) this.countryData = allStats["country"].daily_data
      this.selectedRange = this.countryData.report_date
      if (allStats["state_province"])
        this.stateProvinceData = allStats["state_province"].daily_data
      if (allStats["county_district"])
        this.countyDistrictData = allStats["county_district"].daily_data
    },
    renderChart() {
      let newChart = document.getElementById("covid-chart")
      window.newChart = new Chart(newChart, this.covidChartData)
      this.covidChart = window.newChart
    },
    changeDateRange() {
      if (this.covidChart !== null) {
        this.covidChart.destroy()
      }
      this.renderChart()
    },
  },
}
</script>

<style>
.title-bar {
  padding: 4px;
}

.outline-box {
  border: solid;
  border-width: 2px 2px 2px 2px;
  color: rgb(85, 85, 85);
  border-radius: 12px;
  white-space: nowrap;
  padding: 0;
  margin: 0;
  height: 70px;
}

.graph-options-title {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: left;
  font-size: 13px;
  padding-left: 4px;
  padding-top: 4px;
}

.slider {
  max-width: 700px;
  align-items: center;
}
</style>
