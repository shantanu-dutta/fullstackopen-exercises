import { useEffect, useState } from "react";
import weatherService from "../services/weather";
import WeatherInfo from "./WeatherInfo";

const CountryInfo = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    setWeatherData(null);
    if (!country) {
      return;
    }
    weatherService
      .getForLocation(country.capitalInfo.latlng)
      .then((response) => {
        setWeatherData(response);
      });
  }, [country]);

  if (!weatherData) {
    return null;
  }

  return (
    <div className="country">
      <h1>{country.name.common}</h1>
      <p>
        <strong>Capital:</strong>{" "}
        {country.capital?.length > 0 && country.capital[0]}
      </p>
      <p>
        <strong>Area:</strong> {country.area} km<sup>2</sup>
      </p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={country.flags.alt}
        className="country-flag"
      />
      <WeatherInfo placeName={country.capital[0]} weatherData={weatherData} />
    </div>
  );
};

export default CountryInfo;
