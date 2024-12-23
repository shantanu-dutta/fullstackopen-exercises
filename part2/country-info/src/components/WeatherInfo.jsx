import weatherService from "../services/weather";

const WeatherInfo = ({ placeName, weatherData }) => {
  const weather = weatherData.weather[0];
  return (
    <>
      <h2>Weather in {placeName}</h2>
      <p>
        <strong>Temperature:</strong> {weatherData.main.temp} °C
      </p>
      <img
        src={weatherService.getWeatherIconUrl(weather.icon)}
        alt={weather.description}
        title={weather.description}
      />
      <p>
        <strong>Wind: </strong> {weatherData.wind.speed} m/s
      </p>
    </>
  );
};

export default WeatherInfo;
