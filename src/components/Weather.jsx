import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import WeatherCard from "./WeatherCard";
import WeeklyForecast from "./WeeklyForecast";
import HourlyForecast from "./HourlyForecast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState(null);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");

  const apiKey = import.meta.env.VITE_API_KEY;

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // Update body class based on theme
  useEffect(() => {
    document.body.classList.toggle("light-theme", theme === "light");
    document.body.classList.toggle("dark-theme", theme === "dark");
  }, [theme]);

  const saveToLocalStorage = (city) => {
    let searches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    if (!searches.includes(city)) {
      searches.push(city);
    }
    localStorage.setItem("recentSearches", JSON.stringify(searches));
  };

  const fetchWeather = async (city) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      setError("");
      saveToLocalStorage(city);
      const { coord } = response.data;
      fetchWeeklyForecast(coord.lat, coord.lon);
    } catch (error) {
      setError('City not found. Please check the name.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeeklyForecast = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      setWeeklyForecast(response.data);
    } catch (error) {
      console.error("Error fetching weekly forecast:", error);
    }
  };

  const handleSearch = (city) => {
    setCity(city);
    fetchWeather(city);
  };

  const handleReset = () => {
    setCity("");
    setWeather(null);
    setWeeklyForecast(null);
    setError("");
  };

  // Similar useEffect for geolocation and fetching data

  return (
    <div className={`container mx-auto p-6 ${theme === "light" ? "bg-white text-gray-800" : "bg-gray-900 text-white"} rounded-lg shadow-lg`}>
      <div className="flex-item-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Weather App</h1>
        <button onClick={toggleTheme} className="bg-gray rounded-full p-2 hover:bg-gray-300 transition duration-200">
          <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} size="lg" />
        </button>
      </div>
      <div className="max-w-5xl mx-auto">
        <Search onSearch={handleSearch} onReset={handleReset} theme={theme} />
        {error && <p className="text-red-500 font-bold">{error}</p>}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <WeatherCard weather={weather} theme={theme} apiKey={apiKey} />
        )}
        {weeklyForecast && <WeeklyForecast forecast={weeklyForecast} theme={theme} />}
        
      </div>
    </div>
  );
};

export default Weather;