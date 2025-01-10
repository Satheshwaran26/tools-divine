import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "df75d9631e277d0ad71ecb5454602b70";

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );

      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data.list.slice(0, 5)); // Get the first 5 forecasts
    } catch (err) {
      setWeather(null);
      setForecast([]);
      setError("City not found or an error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center drop-shadow-md">
        Advanced Weather App
      </h1>
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-xl border-t-8 border-blue-600">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="w-full p-4 text-xl border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchWeather}
          className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
        >
          {loading ? "Loading..." : "Get Weather"}
        </button>
      </div>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {weather && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Weather in {weather.name}, {weather.sys.country}
          </h2>
          <div className="flex items-center justify-between space-x-6">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="w-24 h-24"
            />
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-800">Temperature: {weather.main.temp}°C</p>
              <p className="text-lg text-gray-600">Humidity: {weather.main.humidity}%</p>
              <p className="text-lg text-gray-600 capitalize">Condition: {weather.weather[0].description}</p>
            </div>
          </div>
        </div>
      )}
      {forecast.length > 0 && (
        <div className="mt-6 w-full max-w-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">5-Day Forecast</h3>
          <div className="space-y-4">
            {forecast.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg transform transition-all hover:scale-105 hover:shadow-xl"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {new Date(item.dt_txt).toLocaleDateString("en-US", {
                      weekday: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-gray-600 capitalize">{item.weather[0].description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-gray-800">{item.main.temp}°C</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt={item.weather[0].description}
                    className="w-12 h-12"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
