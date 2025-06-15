import { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  BarChart3, 
  Users, 
  Settings, 
  FileText, 
  Calendar,
  Mail,
  Activity,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  Thermometer,
  Droplets,
  Wind,
  Eye
} from 'lucide-react';

// Enhanced WeatherPage component with forecasts
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
    error: null,
    humidity: "",
    windSpeed: "",
    visibility: "",
    feelsLike: ""
  });

  const [searchInput, setSearchInput] = useState('');

  // Generate mock hourly forecast data
  const generateHourlyForecast = () => {
    const hours = [];
    const now = new Date();
    const conditions = ['sunny', 'cloudy', 'partly cloudy', 'light rain', 'clear sky'];
    const icons = ['☀️', '☁️', '⛅', '🌦️', '🌤️'];
    
    for (let i = 0; i < 24; i++) {
      const time = new Date(now.getTime() + i * 60 * 60 * 1000);
      const conditionIndex = Math.floor(Math.random() * conditions.length);
      
      hours.push({
        time: time.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
        temp: Math.round(Math.random() * 15 + 10), // 10-25°C range
        condition: conditions[conditionIndex],
        icon: icons[conditionIndex],
        humidity: Math.round(Math.random() * 40 + 40), // 40-80%
        windSpeed: Math.round(Math.random() * 20 + 5) // 5-25 km/h
      });
    }
    return hours;
  };

  // Generate mock weekly forecast data
  const generateWeeklyForecast = () => {
    const days = [];
    const now = new Date();
    const conditions = ['sunny', 'cloudy', 'partly cloudy', 'light rain', 'clear sky', 'thunderstorm', 'snow'];
    const icons = ['☀️', '☁️', '⛅', '🌦️', '🌤️', '⛈️', '❄️'];
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
      const conditionIndex = Math.floor(Math.random() * conditions.length);
      
      days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        condition: conditions[conditionIndex],
        icon: icons[conditionIndex],
        highTemp: Math.round(Math.random() * 15 + 15), // 15-30°C
        lowTemp: Math.round(Math.random() * 10 + 5), // 5-15°C
        humidity: Math.round(Math.random() * 40 + 40),
        windSpeed: Math.round(Math.random() * 25 + 5)
      });
    }
    return days;
  };

  // Enhanced mock weather data function
  const fetchWeatherData = async (city) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for demo purposes
      if (city.toLowerCase() === 'invalid' || city.trim().length === 0) {
        throw new Error('City not found. Please check the spelling and try again.');
      }

      // Generate mock weather data with forecasts
      const mockData = {
        name: city.charAt(0).toUpperCase() + city.slice(1).toLowerCase(),
        sys: { country: ['US', 'UK', 'CA', 'FR', 'DE', 'JP', 'AU', 'IT', 'ES'][Math.floor(Math.random() * 9)] },
        main: { 
          temp: Math.round(Math.random() * 30 + 5),
          feels_like: Math.round(Math.random() * 30 + 5),
          humidity: Math.round(Math.random() * 40 + 40)
        },
        weather: [{
          description: ['sunny', 'cloudy', 'partly cloudy', 'light rain', 'clear sky'][Math.floor(Math.random() * 5)],
          icon: ['01d', '02d', '03d', '10d', '04d'][Math.floor(Math.random() * 5)]
        }],
        wind: { speed: Math.round(Math.random() * 20 + 5) },
        visibility: Math.round(Math.random() * 5 + 5)
      };
      
      setState(prev => ({
        ...prev,
        firstTime: false,
        city: mockData.name,
        country: mockData.sys.country,
        temp: mockData.main.temp,
        feelsLike: mockData.main.feels_like,
        humidity: mockData.main.humidity,
        windSpeed: mockData.wind.speed,
        visibility: mockData.visibility,
        weatherDescription: mockData.weather[0].description,
        weatherIcon: mockData.weather[0].icon,
        loading: false,
        time: new Date().toLocaleTimeString(),
        weekday: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
        forecast3hrs: generateHourlyForecast(),
        forecastWeekly: generateWeeklyForecast()
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message,
        firstTime: false
      }));
    }
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      fetchWeatherData(searchInput.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'sunny': '☀️',
      'clear sky': '🌤️',
      'partly cloudy': '⛅',
      'cloudy': '☁️',
      'light rain': '🌦️',
      'rain': '🌧️',
      'thunderstorm': '⛈️',
      'snow': '❄️'
    };
    return iconMap[condition] || '🌤️';
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
          Weather Forecast
        </h1>
        <p className="text-gray-400">Get current weather information and forecasts for any city</p>
      </div>

      {/* Search Input */}
      <div className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter city name..."
            className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm"
            disabled={state.loading}
          />
          <button
            onClick={handleSearch}
            disabled={state.loading || !searchInput.trim()}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state.loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {state.error && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg backdrop-blur-sm">
          <p className="text-red-400">⚠️ {state.error}</p>
          <p className="text-sm text-gray-400 mt-1">
            Try searching for cities like: London, Paris, Tokyo, New York, Sydney
          </p>
        </div>
      )}

      {/* Weather Display */}
      {!state.firstTime && !state.error && state.city && (
        <div className="space-y-6">
          {/* Current Weather */}
          <div className="p-6 bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Weather Info */}
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {state.city}, {state.country}
                  </h2>
                  <p className="text-gray-400 capitalize">{state.weatherDescription}</p>
                  <p className="text-sm text-gray-500">{state.weekday} • {state.time}</p>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-6xl">
                    {getWeatherIcon(state.weatherDescription)}
                  </div>
                  <div>
                    <span className="text-5xl font-bold text-white">{state.temp}°C</span>
                    <p className="text-gray-400">Feels like {state.feelsLike}°C</p>
                  </div>
                </div>
              </div>

              {/* Weather Details */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Details</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-gray-800/50 rounded-lg flex items-center gap-2">
                    <Droplets size={16} className="text-cyan-400" />
                    <div>
                      <p className="text-gray-400">Humidity</p>
                      <p className="text-white font-semibold">{state.humidity}%</p>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg flex items-center gap-2">
                    <Wind size={16} className="text-green-400" />
                    <div>
                      <p className="text-gray-400">Wind</p>
                      <p className="text-white font-semibold">{state.windSpeed} km/h</p>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg flex items-center gap-2">
                    <Eye size={16} className="text-purple-400" />
                    <div>
                      <p className="text-gray-400">Visibility</p>
                      <p className="text-white font-semibold">{state.visibility} km</p>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg flex items-center gap-2">
                    <Thermometer size={16} className="text-orange-400" />
                    <div>
                      <p className="text-gray-400">Feels Like</p>
                      <p className="text-white font-semibold">{state.feelsLike}°C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 24-Hour Forecast */}
          <div className="p-6 bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">24-Hour Forecast</h3>
            <div className="overflow-x-auto">
              <div className="flex gap-4 pb-2" style={{ minWidth: '1200px' }}>
                {state.forecast3hrs.slice(0, 24).map((hour, index) => (
                  <div key={index} className="flex-shrink-0 text-center p-3 bg-gray-800/30 rounded-lg border border-gray-600/50 hover:bg-gray-800/50 transition-all duration-300">
                    <p className="text-sm text-gray-400 mb-2">{hour.time}</p>
                    <div className="text-2xl mb-2">{hour.icon}</div>
                    <p className="text-white font-semibold text-sm">{hour.temp}°C</p>
                    <p className="text-xs text-gray-500 mt-1 capitalize">{hour.condition}</p>
                    <div className="mt-2 text-xs text-gray-400">
                      <p>🌡️ {hour.humidity}%</p>
                      <p>💨 {hour.windSpeed}km/h</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="p-6 bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">7-Day Forecast</h3>
            <div className="space-y-3">
              {state.forecastWeekly.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-600/50 hover:bg-gray-800/50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{day.icon}</div>
                    <div>
                      <p className="text-white font-semibold">{day.day}</p>
                      <p className="text-sm text-gray-400">{day.date}</p>
                    </div>
                    <p className="text-sm text-gray-300 capitalize ml-4">{day.condition}</p>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-white font-semibold">{day.highTemp}°C</p>
                      <p className="text-sm text-gray-400">{day.lowTemp}°C</p>
                    </div>
                    <div className="text-right text-xs text-gray-400">
                      <p>💧 {day.humidity}%</p>
                      <p>💨 {day.windSpeed}km/h</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* First Time Display */}
      {state.firstTime && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌤️</div>
          <h3 className="text-xl font-semibold text-white mb-2">Search for Weather</h3>
          <p className="text-gray-400 mb-4">Enter a city name to get current weather information and forecasts</p>
          <div className="text-sm text-gray-500">
            <p>Try: London, Paris, Tokyo, New York, Sydney, Mumbai, Cairo</p>
            <p className="mt-2">Note: This demo uses mock weather data for demonstration</p>
          </div>
        </div>
      )}

      {/* Loading Display */}
      {state.loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-300">Loading weather data...</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Animated Background Component
const AnimatedBackground = () => {
  const blobRefs = useRef([])
  const initialPositions = [
    { x: -4, y: 0 },
    { x: -4, y: 0 },
    { x: 20, y: -8 },
    { x: 20, y: -8 },
  ]

  useEffect(() => {
    let requestId

    const handleScroll = () => {
      const newScroll = window.pageYOffset

      blobRefs.current.forEach((blob, index) => {
        const initialPos = initialPositions[index]

        // Calculating movement in both X and Y direction
        const xOffset = Math.sin(newScroll / 100 + index * 0.5) * 340 // Horizontal movement
        const yOffset = Math.cos(newScroll / 100 + index * 0.5) * 40 // Vertical movement

        const x = initialPos.x + xOffset
        const y = initialPos.y + yOffset

        // Apply transformation with smooth transition
        if (blob) {
          blob.style.transform = `translate(${x}px, ${y}px)`
          blob.style.transition = "transform 1.4s ease-out"
        }
      })

      requestId = requestAnimationFrame(handleScroll)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (requestId) cancelAnimationFrame(requestId)
    }
  }, [])

  return (
    <div className="fixed inset-0 animated-bg">
      <div className="absolute inset-0">
        <div
          ref={(ref) => (blobRefs.current[0] = ref)}
          className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 "></div>
        <div
          ref={(ref) => (blobRefs.current[1] = ref)}
          className="absolute top-0 -right-4 w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 hidden sm:block"></div>
        <div
          ref={(ref) => (blobRefs.current[2] = ref)}
          className="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 "></div>
          <div
          ref={(ref) => (blobRefs.current[3] = ref)}
          className="absolute -bottom-10 right-20 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 md:opacity-10 hidden sm:block"></div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    </div>
  )
}

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Define your menu items
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'weather', label: 'Weather', icon: Cloud },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: Mail },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Render the selected page component
  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f1636f] to-[#a855f7] mb-4">
              Dashboard Overview
            </h2>
            <p className="text-gray-300 text-lg">Welcome to your dashboard</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
              Analytics
            </h2>
            <p className="text-gray-300 text-lg">Analytics Page Component</p>
          </div>
        );
      case 'users':
        return (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400 mb-4">
              Users
            </h2>
            <p className="text-gray-300 text-lg">Users Page Component</p>
          </div>
        );
      case 'weather':
        return (
          <WeatherPage />
        );
      case 'reports':
        return (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-4">
              Reports
            </h2>
            <p className="text-gray-300 text-lg">Reports Page Component</p>
          </div>
        );
      case 'calendar':
        return (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-4">
              Calendar
            </h2>
            <p className="text-gray-300 text-lg">Calendar Page Component</p>
          </div>
        );
      case 'messages':
        return (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-400 mb-4">
              Messages
            </h2>
            <p className="text-gray-300 text-lg">Messages Page Component</p>
          </div>
        );
      case 'activity':
        return (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
              Activity
            </h2>
            <p className="text-gray-300 text-lg">Activity Page Component</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 mb-4">
              Settings
            </h2>
            <p className="text-gray-300 text-lg">Settings Page Component</p>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f1636f] to-[#a855f7] mb-4">
              Dashboard Overview
            </h2>
            <p className="text-gray-300 text-lg">Welcome to your dashboard</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      <div className="flex h-screen relative z-10">
        {/* Sidebar */}
        <div className={`backdrop-blur-md bg-black/20 border-r border-white/10 shadow-2xl transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <h1 className="text-xl font-bold text-white bg-gradient-to-r from-[#f1636f] to-[#a855f7] bg-clip-text text-transparent">
                  Dashboard
                </h1>
              )}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 text-white hover:scale-105"
              >
                {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </button>
            </div>
          </div>
          
          {/* Navigation Menu */}
          <nav className="mt-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left transition-all duration-300 hover:scale-105 ${
                    currentPage === item.id 
                      ? 'bg-gradient-to-r from-[#f1636f]/20 to-[#a855f7]/20 border-r-2 border-[#f1636f] text-white shadow-lg' 
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="ml-3 font-medium">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-8 relative z-10">
            <div className="backdrop-blur-lg bg-gray-900/30 rounded-2xl border border-gray-700 shadow-xl min-h-[calc(100vh-4rem)] p-4 md:p-8">
              {renderPage()}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slower {
          to { transform: rotate(360deg); }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;