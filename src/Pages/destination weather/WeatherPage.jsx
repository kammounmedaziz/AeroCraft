import React, { useState } from "react";

// Mock weather API for demonstration
const weatherApi = {
  getTodayData: async (city) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!city || city.toLowerCase() === 'invalid') {
      throw new Error('City not found');
    }
    
    return {
      temp: Math.round(Math.random() * 30 + 5),
      weatherDescription: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
      weatherIcon: '01d',
      country: 'US',
      timezone: 'America/New_York',
      dateTime: new Date().toISOString(),
      time: new Date().toLocaleTimeString(),
      weekday: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
      city: city
    };
  },
  
  get3HoursData: async (city) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (!city || city.toLowerCase() === 'invalid') {
      throw new Error('Forecast data not available');
    }
    
    return Array.from({ length: 16 }, (_, i) => ({
      time: new Date(Date.now() + i * 3 * 60 * 60 * 1000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      temp: Math.round(Math.random() * 25 + 10),
      weather: ['Clear', 'Clouds', 'Rain'][Math.floor(Math.random() * 3)],
      icon: '01d'
    }));
  }
};

const SearchBar = ({ onSearch, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city name..."
          className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          disabled={loading}
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !searchTerm.trim()}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </div>
  );
};

const TodayData = ({ 
  city, 
  country, 
  temp, 
  time, 
  weekday, 
  weatherDescription, 
  weatherIcon, 
  forecast3hrs, 
  forecastWeekly 
}) => {
  return (
    <div className="space-y-6">
      {/* Current Weather */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          {city}, {country}
        </h2>
        <div className="text-6xl font-bold text-cyan-400 mb-2">
          {temp}°C
        </div>
        <p className="text-gray-300 text-lg capitalize mb-1">
          {weatherDescription}
        </p>
        <p className="text-gray-400">
          {weekday} • {time}
        </p>
      </div>

      {/* 3-Hour Forecast */}
      {forecast3hrs && forecast3hrs.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            24-Hour Forecast
          </h3>
          <div className="grid grid-cols-4 gap-3 overflow-x-auto">
            {forecast3hrs.slice(0, 8).map((item, index) => (
              <div
                key={index}
                className="bg-gray-800/30 rounded-lg p-3 text-center min-w-[80px]"
              >
                <div className="text-xs text-gray-400 mb-1">
                  {item.time}
                </div>
                <div className="text-lg font-semibold text-white">
                  {item.temp}°
                </div>
                <div className="text-xs text-gray-300 capitalize">
                  {item.weather}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Forecast */}
      {forecastWeekly && forecastWeekly.length > 8 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Extended Forecast
          </h3>
          <div className="space-y-2">
            {forecastWeekly.slice(8, 16).map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-800/30 rounded-lg p-3"
              >
                <div className="text-white font-medium">
                  Day {index + 2}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-300 capitalize text-sm">
                    {item.weather}
                  </span>
                  <span className="text-white font-semibold">
                    {item.temp}°C
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

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
    forecastWeekly: [],
    loading: false,
    error: null
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
      city: data.city,
      error: null
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

  // Set error state
  const setError = (error) => {
    setState(prevState => ({
      ...prevState,
      error: error.message || 'An error occurred',
      loading: false,
      firstTime: false
    }));
  };

  // Set loading state
  const setLoading = (loading) => {
    setState(prevState => ({
      ...prevState,
      loading,
      error: loading ? null : prevState.error
    }));
  };

  // Search the weather based on the city
  const search = async (term) => {
    setLoading(true);
    
    try {
      // Get today data
      const todayData = await weatherApi.getTodayData(term);
      updateTodayState(todayData);
      
      // Show the forecast for the next 24 hours, each 3 hours
      const forecastData = await weatherApi.get3HoursData(term);
      updateWeeklyState(forecastData);
      
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  // Error banner component
  const errorBanner = () => {
    if (!state.error) return null;

    return (
      <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-red-400 font-medium">
            {state.error}
          </span>
        </div>
        <p className="text-red-300 text-sm mt-1">
          Please check your spelling and try again.
        </p>
      </div>
    );
  };

  // Loading component
  const loadingIndicator = () => {
    if (!state.loading) return null;

    return (
      <div className="flex items-center justify-center p-12">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
          <span className="text-gray-300">Loading weather data...</span>
        </div>
      </div>
    );
  };

  // Welcome message for first-time users
  const welcomeMessage = () => {
    if (!state.firstTime || state.loading || state.error) return null;

    return (
      <div className="text-center p-12">
        <div className="text-6xl mb-4">🌤️</div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Welcome to Weather Forecast
        </h2>
        <p className="text-gray-400">
          Enter a city name above to get started with current weather and forecasts.
        </p>
        <div className="mt-6 text-sm text-gray-500">
          <p>Try searching for cities like: New York, London, Tokyo, or Paris</p>
          <p className="mt-2">Type "invalid" to see error handling in action</p>
        </div>
      </div>
    );
  };

  // Identify if there is data to display
  const displayResult = () => {
    return !state.firstTime && !state.error && !state.loading && state.city;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
            Weather Forecast
          </h1>
          <p className="text-gray-400">
            Get current weather and forecasts for any city worldwide
          </p>
        </div>
        
        <SearchBar onSearch={search} loading={state.loading} />
        
        {errorBanner()}
        
        {state.loading && loadingIndicator()}
        
        {displayResult() && (
          <div className="p-6 bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-700 shadow-2xl">
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
          </div>
        )}
        
        {welcomeMessage()}
        
        {/* API Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Note: This demo uses mock weather data for demonstration purposes.</p>
          <p>Replace with your OpenWeatherMap API key for live weather data.</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;