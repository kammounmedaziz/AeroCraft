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
  Cloud
} from 'lucide-react';

// WeatherPage component - self-contained for the dashboard
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

  // Simple weather API call using fetch
  const fetchWeatherData = async (city) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Using OpenWeatherMap API (you'll need to replace YOUR_API_KEY with an actual key)
      const API_KEY = 'demo_key'; // Replace with your actual API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      
      const data = await response.json();
      
      setState(prev => ({
        ...prev,
        firstTime: false,
        city: data.name,
        country: data.sys.country,
        temp: Math.round(data.main.temp),
        weatherDescription: data.weather[0].description,
        weatherIcon: data.weather[0].icon,
        loading: false
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

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const city = formData.get('city');
    if (city.trim()) {
      fetchWeatherData(city.trim());
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
          Weather Forecast
        </h1>
        <p className="text-gray-400">Get current weather information for any city</p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            name="city"
            placeholder="Enter city name..."
            className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm"
          />
          <button
            type="submit"
            disabled={state.loading}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state.loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Weather Display */}
      {state.error && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg backdrop-blur-sm">
          <p className="text-red-400">⚠️ {state.error}</p>
          <p className="text-sm text-gray-400 mt-1">
            Note: This demo uses a placeholder API key. Replace with your OpenWeatherMap API key for full functionality.
          </p>
        </div>
      )}

      {!state.firstTime && !state.error && state.city && (
        <div className="p-6 bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Weather */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {state.city}, {state.country}
                </h2>
                <p className="text-gray-400 capitalize">{state.weatherDescription}</p>
              </div>
              
              <div className="flex items-center gap-4">
                {state.weatherIcon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${state.weatherIcon}@2x.png`}
                    alt={state.weatherDescription}
                    className="w-16 h-16"
                  />
                )}
                <div>
                  <span className="text-4xl font-bold text-white">{state.temp}°C</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Weather Details</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-400">Temperature</p>
                  <p className="text-white font-semibold">{state.temp}°C</p>
                </div>
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-400">Condition</p>
                  <p className="text-white font-semibold capitalize">{state.weatherDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {state.firstTime && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌤️</div>
          <h3 className="text-xl font-semibold text-white mb-2">Search for Weather</h3>
          <p className="text-gray-400">Enter a city name to get current weather information</p>
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
          
          {/* Navigation Menu - Fixed to be inside sidebar */}
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