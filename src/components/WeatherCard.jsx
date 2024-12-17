import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureHigh,
  faThermometerHalf,
  faHandHoldingHeart,
  faTint,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import HourlyForecast from "./HourlyForecast";

const WeatherCard = ({ weather, theme, apiKey }) => {
  if (!weather) return null;

  // Assuming the city name comes from the weather data
  const city = weather.name;

  return (
    <div
      className={`max-w-6xl mx-auto border-2 rounded-lg text-center overflow-hidden shadow-xl transform transition-all hover:scale-105 duration-300 ${
        theme === "light"
          ? "bg-blue-100 border-blue-300"
          : "bg-blue-900 border-blue-700"
      }`}
    >
      <div className="p-6">
        <h2
          className={`text-2xl font-bold mb-2 sm:text-3xl md:text-4xl ${
            theme === "light" ? "text-gray-900" : "text-white"
          }`}
        >
          {weather.name}
        </h2>
        <h3
          className={`text-lg mb-4 ${
            theme === "light" ? "text-gray-700" : "text-gray-300"
          }`}
        >
          {weather.weather[0].description}
        </h3>
        <div
          className={`text-lg space-y-2 ${
            theme === "light" ? "text-gray-700" : "text-gray-300"
          }`}
        >
          <p>
            <FontAwesomeIcon icon={faTemperatureHigh} /> Temperature:{" "}
            {weather.main.temp} °C
          </p>
          <p>
            <FontAwesomeIcon icon={faThermometerHalf} />{" "}
            <FontAwesomeIcon icon={faHandHoldingHeart} /> Feels Like:{" "}
            {weather.main.feels_like} °C
          </p>
          <p>
            <FontAwesomeIcon icon={faTint} /> Humidity: {weather.main.humidity}{" "}
            %
          </p>
          <p>
            <FontAwesomeIcon icon={faWind} /> Wind: {weather.wind.speed} km/h
          </p>
        </div>
      </div>
      
      {/* Integrating the HourlyForecast component */}
      <HourlyForecast city={city} apiKey={apiKey} />
    </div>
  );
};

export default WeatherCard;