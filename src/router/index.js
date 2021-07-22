import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import AirportInfo from "../views/Info/Airport.vue"
import TravelInfo from "../views/Info/Travel.vue"
import StatsInfo from "../views/Info/Stats.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "/airportinfo",
        name: "AirportInfo",
        props: true,
        component: AirportInfo,
      },
      {
        path: "/traveladvisories",
        name: "TravelInfo",
        props: true,
        component: TravelInfo,
      },
      {
        path: "/statistics",
        name: "StatsInfo",
        props: true,
        component: StatsInfo,
      },
    ],
  },
  {
    path: "/help",
    name: "Help",
    component: () => import("../views/Help.vue"),
  },
  {
    path: "/credits",
    name: "Credits",
    component: () => import("../views/Credits.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
