import Vue from "vue"
import Vuetify from "vuetify/lib/framework"
import "@mdi/font/css/materialdesignicons.css"
import "@fortawesome/fontawesome-free/css/all.css"

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    themes: {
      light: {
        primary: "#0071ba",
      },
      dark: {
        primary: "#34495E",
      },
    },
  },
})
