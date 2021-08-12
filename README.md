
# Covid-19 Travel Guide (Travel-19)

This is a continuation of the [COVID-19 Travel Statistics (Travel-19)](https://devpost.com/software/covid-19-travel-statistics-travel-19 "COVID-19 Travel Statistics (Travel-19)") project from the TOHacks 2021 hackathon. 

This web app allows users to look up travel information using airport IATA codes. Location data, COVID-19 statistics, advisories and warnings will be shown to help users plan their travels.

## Project setup
This project uses the [Lumo COVID-19 API](https://covid-developer-docs.thinklumo.com/#tag/airports "Lumo COVID-19 API") as its data source. To access the API, you must request an API key [here](https://www.thinklumo.com/the-free-lumo-covid-19-api). This API key is free and is required for this project.

The project also uses the [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/get-api-key "Maps JavaScript API") to display a map image. You can follow the link for more information and to request an API key. This API key is **not** required.

1. To start, clone the repo and run
```
npm install
```
in the root directory.

2. Then, create a `.env` file in the root directory and add these lines:
```
VUE_APP_LUMO_API_KEY=<YOUR_LUMO_API_KEY>
VUE_APP_GMS_API_KEY=<YOUR_GOOGLE_MAPS_SERVICES_API_KEY>

```
where `<YOUR_LUMO_API_KEY>` is replaced with your API key recieved from the Lumo COVID-19 API and `<YOUR_GOOGLE_MAPS_SERVICES_API_KEY>` is the API key from the Maps Javascript API, if you requested one. Do not use quotes.
If you did not request a Maps Javascript API key, you may omit the second line.


3. Once you have completed the above steps, you may run the project in the root directory using this command:
```
npm run serve
```
and should be able to open the app on `http://localhost:8080/`.
## Lints and fixes files
```
npm run lint
```
## Video Demo
https://user-images.githubusercontent.com/34692466/129131052-94ce9acb-ead6-4c4f-93b5-66ed9a1bf50b.mp4
