import axios from "axios";
import React, { useState } from "react";
import "./weather.module.css";
const API_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "a86cdf3e4c1b672202cbaf9eb4d7d941";
interface IWeatherData {
  name: string;
  sys: {
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
}

const WeatherApp = () => {
  const [weather, setWeather] = useState<IWeatherData>("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [search, setSearch] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  const searchLocation = async () => {
    try {
      const response = await axios.get(
        `${API_URL}weather?q=${search}&appid=${API_KEY}`
      );
      setWeather(response.data);
      // setErrorMessage("");
    } catch (error) {
      // setErrorMessage("Error fetching weather data. Please try again.");
      console.error(error);
    }
  };
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const getWeatherIconUrl = (iconCode: any) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="container  ">
      <div className="content-wrap flex-col justify-items-cente items-center ">
        <div className="header">
          <h1 className="text-5xl pb-3">
            <strong>Weather</strong>
          </h1>
          <h3 className="date mb-2">
            {" "}
            <strong>{currentDate.toLocaleDateString()}</strong>
          </h3>
          {/* {weather.weather && (
            <p>
              Weather conditions:
              <strong> {weather.weather[0].description}</strong>{" "}
            </p>
          )} */}
          <div className="search-location flex justify-between items-stretch  gap-1">
            <label htmlFor="location" className=" flex items-center ">
              <strong>City: </strong>
            </label>
            <input
              className="border-2 rounded-2xl"
              id="location"
              type="text"
              placeholder="Enter address here!"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="border-2 rounded-2xl btn-search"
              onClick={searchLocation}
            >
              Search
            </button>
          </div>
          {/* <div>
            {weather.weather && (
              <p>
                Weather conditions:
                <strong> {weather.weather[0].description}</strong>{" "}
              </p>
            )}
          </div> */}
        </div>
        <h2 className="p-2 text-2xl">
          <strong>{weather.name}</strong>
        </h2>
        <div className="main-content">
          {" "}
          {weather.weather && (
            <p>
              Weather conditions:
              <strong> {weather.weather[0].description}</strong>{" "}
            </p>
          )}
          {weather.name && (
            <p>
              Sunrise - Sunset:{" "}
              <strong>
                {formatTime(weather.sys.sunrise)} -{" "}
                {formatTime(weather.sys.sunset)}
              </strong>
            </p>
          )}
          {weather.main && (
            <div className="weather-details">
              <p>
                Temperature:{" "}
                <strong>
                  {String(weather.main.temp).slice(0, 2)}
                  °C
                </strong>
              </p>
              <p>
                Wind Speed: <strong>{weather.wind.speed} m/s </strong>
              </p>
              <p>
                Humidity: <strong>{weather.main.humidity} %</strong>
              </p>
            </div>
          )}
        </div>
        <div className="weather-img justify-center flex">
          {weather.weather && (
            <img
              src={getWeatherIconUrl(weather.weather[0].icon)}
              alt="Weather"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
