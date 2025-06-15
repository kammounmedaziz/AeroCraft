import React, { useState } from "react";
import "./WeatherPage.css";
import weatherApi from "../../utils/weatherApi";
import SearchBar from "../../Components/SearchBar/SearchBar";
import TodayData from "../../Components/TodayData/TodayData";

const WeatherPage = () => {
  const [state, setState] = useState({
    firstTime: true,
    city: "",
    weekday: "",
    temp: "",
    weatherDescription: "",
    weatherIcon: "",
    country: "",
    timezone: "",
    time: "",
    forecast3hrs: [],
    forecastWeekly: []
  });

  // Update today data
  const updateTodayState = (data) => {
    setState(prevState => ({
      ...prevState,
      firstTime: false,
      temp: data.temp,
      weatherDescription: data.weatherDescription,
      weatherIcon: data.weatherIcon,
      country: data.country,
      timezone: data.timezone,
      dateTime: data.dateTime,
      time: data.time,
      weekday: data.weekday,
      city: data.city
    }));
  };

  // Update weekly data
  const updateWeeklyState = (data) => {
    setState(prevState => ({
      ...prevState,
      forecastWeekly: data,
      forecast3hrs: data.slice(0, 8)
    }));
  };

  // Search the weather based on the city
  const search = (term) => {
    // Get today data
    weatherApi.getTodayData(term).then(data => updateTodayState(data));
    // Show the forecast for the next 24 hours, each 3 hours
    weatherApi.get3HoursData(term).then(data => updateWeeklyState(data));
  };

  const warningBanner = () => {
    if (state.firstTime) {
      return null;
    }

    return (
      <div className="warningBanner">
        We couldn't find any results. Try checking your spelling.
      </div>
    );
  };

  // Identify if there is data to display
  const displayResult = () => {
    if ((typeof state.city === "undefined") || (state.city === "")) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="main">
      <div className="navbar-main">
        <h1>Weather</h1>
      </div>
      <SearchBar onSearch={search} />
      {displayResult() ? (
        <TodayData
          city={state.city}
          country={state.country}
          temp={state.temp}
          time={state.time}
          weekday={state.weekday}
          weatherDescription={state.weatherDescription}
          weatherIcon={state.weatherIcon}
          forecast3hrs={state.forecast3hrs}
          forecastWeekly={state.forecastWeekly}
        />
      ) : (
        warningBanner()
      )}
    </div>
  );
};

export default WeatherPage;