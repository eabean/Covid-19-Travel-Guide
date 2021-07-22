import Vue from "vue"
import App from "./App.vue"
import "./plugins/vuetify"
import vuetify from "./plugins/vuetify"
import router from "./router"
import * as VueGoogleMaps from "vue2-google-maps"
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.prototype.$eventHub = new Vue()
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GMS_API_KEY,
    libraries: "places",
  },
})
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app")
