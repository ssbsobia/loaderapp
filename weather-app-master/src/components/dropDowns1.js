import React, { useState } from "react";
import { useQuery } from "react-query";

function Dropdown() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedCity("");
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const fetchWeatherData = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity},${selectedCountry}&appid=2658819d3c178b5d64c69c779144f597&units=metric`
    );
    if (!response.ok) {
      throw new Error("Failed ");
    }
    return response.json();
  };

  const {
    data: weatherData,
    isLoading,
    error,
  } = useQuery(["country", selectedCity, selectedCountry], fetchWeatherData, {
    enabled: Boolean(selectedCity),
  });

  return (
    <div className="dropdown-container">
      <label htmlFor="country">Select a country: </label>
      <select
        id="country"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option value="">Select Country</option>
        <option value="Pakistan">Pakistan</option>
        <option value="INDIA">INDIA</option>
        <option value="CHINA">CHINA</option>
      </select>

      {selectedCountry && (
        <div>
          <label htmlFor="city">Select a city:</label>
          <select id="city" value={selectedCity} onChange={handleCityChange}>
            <option value="">--Select City</option>
            {selectedCountry === "Pakistan" && (
              <>
                <option value="Islamabad">Islamabad</option>
                <option value="Lahore">Lahore</option>
                <option value="Bahawalnagar ">Bahawalnagar </option>
                <option value="Bahawalpur">Bahawalpur</option>
                <option value="Multan">Multan</option>

              </>
            )}
            {selectedCountry === "INDIA" && (
              <>
                <option value="Ajmer ">Ajmer </option>
                <option value="Delhi ">Delhi </option>
                <option value="Chennai ">Chennai </option>
              </>
            )}
            {selectedCountry === "CHINA" && (
              <>
                <option value="Bali">Bali </option>
                <option value="Dali">Dali</option>
                <option value="Beijing"> Beijing</option>

              </>
            )}
          </select>
          {isLoading && (
            <div className="center-loader">
              <div className="loader"></div>
            </div>
          )}
        </div>
      )}

      {weatherData && (
        <div className="weather-table">
          <table>
            <tbody>
              <tr>
                <td>Temperature</td>
                <td>{weatherData.main.temp}C</td>
              </tr>
              <tr>
                <td>Humidity</td>
                <td>{weatherData.main.humidity}%</td>
              </tr>
              <tr>
                <td>Pressure</td>
                <td>{weatherData.main.pressure}hPa</td>
              </tr>
              <tr>
                <td>Wind Speed</td>
                <td>{weatherData.wind.speed}m/s</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Dropdown;
