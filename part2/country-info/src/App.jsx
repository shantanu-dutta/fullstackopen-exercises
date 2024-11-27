import { useEffect, useState } from "react";
import countriesService from "./services/countries";
import CountryInfo from "./components/CountryInfo";

function App() {
  const [countries, setCountries] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filteredCountries = searchTerm
    ? countries.filter(
        (c) =>
          c.name.common
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase()) ||
          c.name.official
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase())
      )
    : null;

  useEffect(() => {
    if (filteredCountries && filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0]);
    }
  }, [filteredCountries]);

  useEffect(() => {
    if (window.localStorage.getItem("countries")) {
      let sessionCountries = JSON.parse(
        window.localStorage.getItem("countries")
      );
      setCountries(sessionCountries);
      return;
    }
    countriesService.getAll().then((countries) => {
      window.localStorage.setItem("countries", JSON.stringify(countries));
      setCountries(countries);
    });
  }, []);

  if (!countries) {
    return null;
  }

  const handleSearchTermChange = (event) => {
    setSelectedCountry(null);
    setSearchTerm(event.target.value);
  };

  const showCountryDetails = (country) => {
    setSelectedCountry(country);
  };

  return (
    <>
      <div className="search">
        <strong>Find countries:</strong>{" "}
        <input
          type="text"
          name="country"
          id="input-country"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      <div className="results">
        <div className="matches">
          {filteredCountries &&
            (filteredCountries.length > 10 ? (
              <p>Too many matches, specify another filter.</p>
            ) : (
              filteredCountries.map((c) => {
                return (
                  <p key={c.cca3}>
                    <span
                      className={
                        selectedCountry && c.cca3 === selectedCountry.cca3
                          ? "selected"
                          : null
                      }
                    >
                      {c.name.common}
                    </span>{" "}
                    <button onClick={() => showCountryDetails(c)}>Show</button>
                  </p>
                );
              })
            ))}
        </div>
        <div className="country-details">
          {selectedCountry && <CountryInfo country={selectedCountry} />}
        </div>
      </div>
    </>
  );
}

export default App;
