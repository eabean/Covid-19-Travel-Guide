<template>
  <div class="travel">
    <template>
      <v-subheader>COUNTRY ENTRY EXIT INFO</v-subheader>
      <v-sheet>
        <v-tabs style="padding-top: 12px">
          <v-tab v-for="(title, i) in entryExitTitles" :key="i">
            {{ title }}
          </v-tab>
          <v-tab> Metadata </v-tab>

          <v-tab-item v-for="(key, i) in entryExitKeys" :key="i">
            <v-card class="tab-box" flat>
              <v-card-text class="text--darken-5">
                <p class="info-label">
                  {{
                    hasNoSummary(entryExitData[key])
                      ? "No summary available - please follow the link under the metadata tab to learn more."
                      : entryExitData[key]
                  }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card class="metadata-box" style="height: 170px" flat>
              <v-list class="vertical-box">
                <v-list-item>
                  For location: {{ entryExitData.location_name }}
                </v-list-item>
                <v-list-item>
                  Last Updated:
                  {{ entryExitData.last_updated.split("T")[0] }}
                </v-list-item>
                <v-list-item>
                  <v-btn
                    depressed
                    color="primary"
                    elevation="2"
                    :href="entryExitData.source"
                    target="_blank"
                    >GO TO INFO SOURCE</v-btn
                  >
                </v-list-item>
              </v-list>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-sheet>
      <v-subheader>ADVISORIES</v-subheader>
      <v-carousel height="425px" show-arrows-on-hover>
        <v-carousel-item
          v-for="(advisoryData, index) in advisories"
          :key="index"
        >
          <v-sheet tile>
            <v-row
              class="fill-height"
              align="center"
              justify="center"
              style="margin-top: 30px"
            >
              <v-col cols="3">
                <v-sheet class="vertical-box">
                  <i
                    class="fas fa-exclamation-triangle fa-7x"
                    :style="{
                      color: getWarningColour(advisoryData.advisory),
                    }"
                  ></i>

                  <v-subheader style="margin: 2px"
                    >Advisory {{ index + 1 }}</v-subheader
                  >
                  <v-btn
                    depressed
                    color="primary"
                    elevation="2"
                    style="margin: 2px"
                    :href="advisoryData.url"
                    target="_blank"
                    >READ MORE</v-btn
                  >
                </v-sheet>
              </v-col>
              <v-col cols="7">
                <v-sheet>
                  <v-list disabled>
                    <v-list-item-group>
                      <v-list-item
                        v-for="(advisory, i) in getAdvisory(advisoryData)"
                        :key="i"
                      >
                        <v-list-item-icon>
                          <v-icon v-text="advisory.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-subtitle v-text="advisory.text">
                          </v-list-item-subtitle>
                          {{ advisory.data }}
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-sheet>
              </v-col>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </template>
  </div>
</template>

<script>
export default {
  name: "travel-info",
  props: ["airportInfo"],
  data() {
    return {
      warnings: [
        {
          warning: ["Level 1", "Avoid non-essential travel"],
          colour: "yellow",
        },
        { warning: ["Level 2"], colour: "orange" },
        { warning: ["Level 3", "Do not travel"], colour: "red" },
      ],
      entryExitKeys: ["quarantine", "testing", "travel_restrictions"],
      entryExitTitles: [
        "Quarantine Info",
        "Covid-19 Testing",
        "Travel Restrictions",
      ],
    }
  },
  computed: {
    advisories() {
      return this.airportInfo.travel_advisories
    },
    entryExitData() {
      return this.airportInfo.covid_info.entry_exit_info[0]
    },
  },
  methods: {
    getAdvisory(advisory) {
      const data = [
        {
          text: "Issuer",
          icon: "mdi-account-group",
          data: advisory.issued_by,
        },
        {
          text: "Advisory",
          icon: "mdi-book-information-variant",
          data: advisory.advisory,
        },
        {
          text: "Scope",
          icon: "mdi-bullseye",
          data: advisory.scope,
        },
        {
          text: "Last Updated",
          icon: "mdi-clock-time-four",
          data: advisory.last_updated.split("T")[0],
        },
      ]
      return data
    },
    getWarningColour(advisoryText) {
      let colour = "inherit"
      this.warnings.forEach((warningColour) => {
        if (warningColour.warning.some((text) => advisoryText.includes(text))) {
          colour = warningColour.colour
        }
      })
      return colour
    },
    hasNoSummary(text) {
      return (
        text === "No summary available - please follow the link to learn more."
      )
    },
  },
}
</script>

<style scoped lang="scss">
.tab-box {
  border: solid;
  border-width: 2px 2px 2px 2px;
  color: rgb(85, 85, 85);
  border-radius: 12px;
  margin: 8px 8px 8px 8px;
  height: 170px;
}

.metadata-box {
  border: solid;
  border-width: 2px 2px 2px 2px;
  color: rgb(85, 85, 85);
  border-radius: 12px;
  margin: 8px 8px 8px 8px;
}

.info-label {
  text-align: left;
}

.exit-entry-info {
  text-align: left;
  margin-top: 20px;
  width: 100%;
}

.vertical-box {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.fa-exclamation-triangle {
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: black;
}
</style>
