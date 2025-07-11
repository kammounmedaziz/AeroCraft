import AirportWeatherData from './Airport Weather Data';
import AirportPage from './AirportPage';
import Overview from './Overview';
import WeatherApp from '../Components/App/weather app';
import { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  BarChart3, 
  Users, 
  Settings, 
  PlaneLanding,
  Calendar,
  Mail,
  Activity,
  ChevronLeft,
  ChevronRight,
  Cloud,

  Plane
} from 'lucide-react';

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
    { id: 'AirportWeatherData', label: 'Airport Weather Data', icon: PlaneLanding },
    { id: 'weather', label: 'Destination Weather', icon: Cloud },
    { id: 'Statistics', label: 'Statistics', icon: BarChart3 },
    { id: 'AirportPage', label: 'Airport', icon: Plane },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: Mail },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return (
          <Overview/>
        );
      case 'AirportWeatherData':
        return (
          <AirportWeatherData/>
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
          <WeatherApp />
        );
      case 'AirportPage':
        return (
          <AirportPage/>
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