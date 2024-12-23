import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_SERVICE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const getForLocation = ([lat, lon]) =>
  axios
    .get(`${BASE_URL}&lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then((res) => res.data);

const getWeatherIconUrl = (icon) =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`;

export default { getForLocation, getWeatherIconUrl };
