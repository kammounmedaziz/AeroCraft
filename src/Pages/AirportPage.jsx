import { useState, useEffect } from 'react';

const AirportPage = () => {
  const [activeTab, setActiveTab] = useState('departures');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAirport, setSelectedAirport] = useState('JFK');

  // Mock airport data
  const airports = [
    { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'USA' },
    { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'USA' },
    { code: 'LHR', name: 'London Heathrow', city: 'London', country: 'UK' },
    { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'France' },
    { code: 'NRT', name: 'Narita International', city: 'Tokyo', country: 'Japan' },
    { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE' },
    { code: 'SIN', name: 'Singapore Changi', city: 'Singapore', country: 'Singapore' },
    { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' }
  ];

  // Generate mock flight data
  const generateFlightData = (type) => {
    const airlines = ['American Airlines', 'Delta Air Lines', 'United Airlines', 'Emirates', 'Lufthansa', 'British Airways', 'Air France', 'Singapore Airlines'];
    const aircraftTypes = ['Boeing 737', 'Airbus A320', 'Boeing 777', 'Airbus A350', 'Boeing 787', 'Airbus A380', 'Boeing 747', 'Embraer E190'];
    const gates = ['A1', 'A2', 'B3', 'B4', 'C5', 'C6', 'D7', 'D8', 'E9', 'E10'];
    const statuses = ['On Time', 'Delayed', 'Boarding', 'Departed', 'Arrived', 'Cancelled'];
    const statusColors = {
      'On Time': 'text-green-400',
      'Delayed': 'text-yellow-400',
      'Boarding': 'text-blue-400',
      'Departed': 'text-gray-400',
      'Arrived': 'text-green-400',
      'Cancelled': 'text-red-400'
    };

    const flightData = [];
    const now = new Date();
    
    for (let i = 0; i < 20; i++) {
      const airline = airlines[Math.floor(Math.random() * airlines.length)];
      const flightNumber = `${airline.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 9000) + 1000}`;
      const destination = airports[Math.floor(Math.random() * airports.length)];
      const scheduledTime = new Date(now.getTime() + (Math.random() * 24 * 60 * 60 * 1000));
      const actualTime = new Date(scheduledTime.getTime() + (Math.random() - 0.5) * 60 * 60 * 1000);
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      flightData.push({
        id: i + 1,
        flightNumber,
        airline,
        destination: type === 'departures' ? destination : airports.find(a => a.code === selectedAirport),
        origin: type === 'arrivals' ? destination : airports.find(a => a.code === selectedAirport),
        scheduledTime: scheduledTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        actualTime: actualTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status,
        statusColor: statusColors[status],
        gate: gates[Math.floor(Math.random() * gates.length)],
        aircraft: aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)],
        terminal: Math.floor(Math.random() * 3) + 1,
        delay: status === 'Delayed' ? Math.floor(Math.random() * 120) + 15 : 0
      });
    }
    
    return flightData.sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));
  };

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setFlights(generateFlightData(activeTab));
      setLoading(false);
    }, 1000);
  }, [activeTab, selectedAirport]);

  const filteredFlights = flights.filter(flight => 
    flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (activeTab === 'departures' ? flight.destination.city : flight.origin.city).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    const icons = {
      'On Time': '✅',
      'Delayed': '⏰',
      'Boarding': '🚪',
      'Departed': '✈️',
      'Arrived': '🛬',
      'Cancelled': '❌'
    };
    return icons[status] || '📋';
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
          ✈️ Airport Dashboard
        </h1>
        <p className="text-gray-400">Real-time flight information and airport operations</p>
      </div>

      {/* Airport Selector */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-gray-300 font-medium">Airport:</span>
            <select
              value={selectedAirport}
              onChange={(e) => setSelectedAirport(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {airports.map(airport => (
                <option key={airport.code} value={airport.code}>
                  {airport.code} - {airport.name}
                </option>
              ))}
            </select>
          </div>
          <div className="text-sm text-gray-400">
            {airports.find(a => a.code === selectedAirport)?.city}, {airports.find(a => a.code === selectedAirport)?.country}
          </div>
        </div>
      </div>

      {/* Search and Tabs */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search flights by number, airline, or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="absolute right-3 top-3 text-gray-400">🔍</div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-gray-800/30 rounded-lg">
          <button
            onClick={() => setActiveTab('departures')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'departures'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            🛫 Departures
          </button>
          <button
            onClick={() => setActiveTab('arrivals')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'arrivals'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            🛬 Arrivals
          </button>
        </div>
      </div>

      {/* Flight Information Board */}
      <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-700 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-300">Loading flight information...</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Flight</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Airline</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    {activeTab === 'departures' ? 'Destination' : 'Origin'}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Scheduled</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actual</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Gate</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Aircraft</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredFlights.map((flight) => (
                  <tr key={flight.id} className="hover:bg-gray-800/30 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{flight.flightNumber}</div>
                      <div className="text-sm text-gray-400">Terminal {flight.terminal}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white">{flight.airline}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">
                        {activeTab === 'departures' ? flight.destination.code : flight.origin.code}
                      </div>
                      <div className="text-sm text-gray-400">
                        {activeTab === 'departures' ? flight.destination.city : flight.origin.city}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white">{flight.scheduledTime}</td>
                    <td className="px-6 py-4">
                      <div className="text-white">{flight.actualTime}</div>
                      {flight.delay > 0 && (
                        <div className="text-xs text-yellow-400">+{flight.delay} min</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-2 ${flight.statusColor}`}>
                        <span>{getStatusIcon(flight.status)}</span>
                        <span className="font-medium">{flight.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{flight.gate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white">{flight.aircraft}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Flight Statistics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
          <div className="text-2xl font-bold text-green-400">{filteredFlights.filter(f => f.status === 'On Time').length}</div>
          <div className="text-sm text-gray-400">On Time</div>
        </div>
        <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
          <div className="text-2xl font-bold text-yellow-400">{filteredFlights.filter(f => f.status === 'Delayed').length}</div>
          <div className="text-sm text-gray-400">Delayed</div>
        </div>
        <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
          <div className="text-2xl font-bold text-blue-400">{filteredFlights.filter(f => f.status === 'Boarding').length}</div>
          <div className="text-sm text-gray-400">Boarding</div>
        </div>
        <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
          <div className="text-2xl font-bold text-red-400">{filteredFlights.filter(f => f.status === 'Cancelled').length}</div>
          <div className="text-sm text-gray-400">Cancelled</div>
        </div>
      </div>

      {/* Live Updates Indicator */}
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span>Live updates • Last updated: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default AirportPage;