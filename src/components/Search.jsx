import React, { useState } from "react";

const Search = ({ onSearch, onReset, theme }) => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please enter city name");
      return;
    }
    setError("");
    onSearch(city.trim());
    setCity("");
  };

  const handleReset = () => {
    setCity("");
    setError("");
    onReset();
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSearch}
        className="mb-4 flex flex-col sm:flex-row items-center max-w-sm mx-auto"
      >
        <input
          type="text"
          aria-label="City name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City name"
          className={`p-2 mb-2 sm:mb-0 sm:mr-2 flex-grow hover:border-2 ${
            theme === "light"
              ? "bg-white text-black border-gray-300"
              : "bg-gray-800 text-white border-gray-600"
          }`}
        />

        <button
          aria-label="Search"
          type="submit"
          className="sm:inline-block bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-2xl mr-2 mb-2"
        >
          Search
        </button>
        <button
          aria-label="Clear"
          type="button"
          onClick={handleReset}
          className="sm:inline-block mb-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-2xl"
        >
          Clear
        </button>
      </form>
      {error && <p className="block text-red-700 font-sm mt-0">{error}</p>}
    </div>
  );
};

export default Search;
