import axios from "axios"
import "core-js"
const API_KEY = process.env.VUE_APP_LUMO_API_KEY

class AxiosService {
  getAirportData(iataCode) {
    try {
      const info = axios.get("https://covid-api.thinklumo.com/data", {
        params: {
          airport: iataCode,
        },
        headers: {
          "x-api-key": API_KEY,
        },
      })
      const airportData = info.then((response) => response.data)
      return airportData
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

export default AxiosService
