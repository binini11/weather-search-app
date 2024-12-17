// HourlyForecast.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const HourlyForecast = ({ city, apiKey }) => {
  const [hourlyWeather, setHourlyWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Only fetch hourly forecast when city is available
    if (city) {
      fetchHourlyForecast();
    }
  }, [city]);

  const fetchHourlyForecast = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      setHourlyWeather(response.data.list); // Getting the hourly data
      
    } catch (error) {
      console.error("Error fetching hourly forecast:", error);
      setHourlyWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full bg-gray-200 p-2 rounded-md mt-2">
      <h2 className="text-xl font-bold mb-2">Hourly Forecast for {city}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : hourlyWeather && hourlyWeather.length > 0 ? (
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-8 gap-2">
          {hourlyWeather.slice(0, 8).map((hour, index) => (
            <div key={index} className="bg-white shadow-md  rounded">
              <div className="text-center font-semibold">
                {new Date(hour.dt * 1000).toLocaleString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </div>
              <img
                src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                alt={hour.weather[0].description}
                className="w-12 h-12 mx-auto my-2"
              />
              <div className="text-center">
                <div>{hour.main.temp} °C</div>
                <div className="text-sm text-gray-500">
                  {hour.weather[0].description}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hourly data available.</p>
      )}
    </div>
  );
};

export default HourlyForecast;