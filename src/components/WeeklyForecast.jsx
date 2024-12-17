import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureHigh,
  faThermometerHalf,
  faHandHoldingHeart,
  faTint,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

const WeeklyForecast = ({ forecast, theme }) => {
  const dailyForecasts = forecast.list.filter((_, index) => index % 8 === 0);

  return (
    <div className="weekly-forecast mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center">5-Day Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dailyForecasts.map((day, index) => (
          <div
            key={index}
            className={`max-w-md mx-auto p-6 border-2 rounded-lg shadow-xl transform transition-all hover:scale-105 duration-300 ${
              theme === "light"
                ? "bg-green-100 border-green-300"
                : "bg-green-900 border-green-700"
            }`}
          >
            <h3 className="font-bold mb-2">
              {new Date(day.dt * 1000).toLocaleDateString()}
            </h3>
            <div
              className={`text-lg space-y-2 ${
                theme === "light" ? "text-gray-700" : "text-gray-300"
              }`}
            >
              <p>
                <FontAwesomeIcon icon={faTemperatureHigh} /> High:{" "}
                {day.main.temp_max} °C
              </p>
              <p>
                <FontAwesomeIcon icon={faThermometerHalf} /> Low:{" "}
                {day.main.temp_min} °C
              </p>
              <p>
                <FontAwesomeIcon icon={faHandHoldingHeart} /> Feels Like:{" "}
                {day.main.feels_like} °C
              </p>
              <p>
                <FontAwesomeIcon icon={faTint} /> Humidity: {day.main.humidity}{" "}
                %
              </p>
              <p>
                <FontAwesomeIcon icon={faWind} /> Wind: {day.wind.speed} km/h
              </p>
              <p>{day.weather[0].description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
