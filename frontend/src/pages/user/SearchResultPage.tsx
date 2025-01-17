import React, { useState, useEffect } from 'react';
import SearchResults from '../../components/user/search/SearchResult';
import { MapPin, Calendar, Search, SlidersHorizontal, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { browseBusesByLocation } from '../../api/userApi';

interface Bus {
  bus: {
    name: string;
    seatsAvailable: string;
    type: string;
  };
  startTime: string;
  endTime: string;
  price: string;
  isActive: boolean;
  scheduleId: string;
}

interface SearchParams {
  fromCity: string;
  toCity: string;
  date: string;
}

type SortOption = 'price_low' | 'price_high' | 'departure_early' | 'departure_late';

interface Filters {
  busType: {
    sleeper: boolean;
    seater: boolean;
  };
  amenities: {
    ac: boolean;
    nonAc: boolean;
  };
  departureTime: string[];
  arrivalTime: string[];
  pickupPoints: string[];
  dropPoints: string[];
}

const timeSlots = ['6 AM - 11 AM', '11 AM - 6 PM', '6 PM - 11 PM'];

const SearchResultsPage: React.FC = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('departure_early');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    busType: { sleeper: false, seater: false },
    amenities: { ac: false, nonAc: false },
    departureTime: [],
    arrivalTime: [],
    pickupPoints: [],
    dropPoints: []
  });
  const [searchParams, setSearchParams] = useState<SearchParams>({
    fromCity: '',
    toCity: '',
    date: new Date().toISOString().split('T')[0],
  });

  const location = useLocation();
  const { from, to } = location.state || {};

  useEffect(() => {
    if (from && to) {
      setSearchParams(prev => ({
        ...prev,
        fromCity: from,
        toCity: to
      }));
    }
  }, [from, to]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      if (searchParams.fromCity && searchParams.toCity) {
        const busData = await browseBusesByLocation(searchParams.fromCity, searchParams.toCity);
        if (busData?.schedules) {
          setBuses(busData.schedules);
        } else {
          setBuses([]);
        }
      }
    } catch (error) {
      console.error('Error fetching bus data:', error);
      setBuses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const toggleFilter = (category: keyof Filters['busType'] | keyof Filters['amenities']) => {
    if (category in filters.busType) {
      setFilters(prev => ({
        ...prev,
        busType: {
          ...prev.busType,
          [category]: !prev.busType[category as keyof Filters['busType']]
        }
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          [category]: !prev.amenities[category as keyof Filters['amenities']]
        }
      }));
    }
  };

  const toggleTimeFilter = (time: string, type: 'departureTime' | 'arrivalTime') => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(time)
        ? prev[type].filter(t => t !== time)
        : [...prev[type], time]
    }));
  };

  const filteredBuses = buses.filter(bus => {
    // Bus Type Filter
    if (filters.busType.sleeper || filters.busType.seater) {
      const type = bus.bus.type.toLowerCase();
      if (
        (filters.busType.sleeper && !type.includes('sleeper')) ||
        (filters.busType.seater && !type.includes('seater'))
      ) {
        return false;
      }
    }

    // AC/Non-AC Filter
    if (filters.amenities.ac || filters.amenities.nonAc) {
      const isAC = bus.bus.type.toLowerCase().includes('ac');
      if (
        (filters.amenities.ac && !isAC) ||
        (filters.amenities.nonAc && isAC)
      ) {
        return false;
      }
    }

    // Time filters can be implemented here if needed
    return true;
  });

  const sortedBuses = [...filteredBuses].sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return parseInt(a.price) - parseInt(b.price);
      case 'price_high':
        return parseInt(b.price) - parseInt(a.price);
      case 'departure_early':
        return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
      case 'departure_late':
        return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchParams.fromCity}
                onChange={(e) => setSearchParams({ ...searchParams, fromCity: e.target.value })}
                placeholder="From"
                className="pl-12 w-full rounded-lg border border-gray-200 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50"
              />
            </div>

            <div className="relative flex-1 min-w-[200px]">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchParams.toCity}
                onChange={(e) => setSearchParams({ ...searchParams, toCity: e.target.value })}
                placeholder="To"
                className="pl-12 w-full rounded-lg border border-gray-200 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50"
              />
            </div>

            <div className="relative min-w-[200px]">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={searchParams.date}
                onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                className="pl-12 w-full rounded-lg border border-gray-200 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden bg-white px-4 py-2 rounded-lg border shadow-sm flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            <p className="text-gray-600">
              <span className="font-semibold">{sortedBuses.length}</span> buses found
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-white border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="departure_early">Departure: Earliest</option>
              <option value="departure_late">Departure: Latest</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`
              md:w-64 bg-white rounded-lg shadow-md p-6 space-y-6
              fixed md:relative top-0 left-0 h-full md:h-auto w-full md:w-64
              transform ${showFilters ? 'translate-x-0' : '-translate-x-full'} 
              md:transform-none transition-transform duration-200 ease-in-out
              z-30 overflow-y-auto
            `}
          >
            <div className="flex justify-between items-center md:hidden">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Bus Type */}
            <div>
              <h3 className="font-semibold mb-3">Bus Type</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.busType.sleeper}
                    onChange={() => toggleFilter('sleeper')}
                    className="rounded text-blue-600"
                  />
                  Sleeper
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.busType.seater}
                    onChange={() => toggleFilter('seater')}
                    className="rounded text-blue-600"
                  />
                  Seater
                </label>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="font-semibold mb-3">Amenities</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.amenities.ac}
                    onChange={() => toggleFilter('ac')}
                    className="rounded text-blue-600"
                  />
                  AC
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.amenities.nonAc}
                    onChange={() => toggleFilter('nonAc')}
                    className="rounded text-blue-600"
                  />
                  Non-AC
                </label>
              </div>
            </div>

            {/* Departure Time */}
            <div>
              <h3 className="font-semibold mb-3">Departure Time</h3>
              <div className="space-y-2">
                {timeSlots.map((time) => (
                  <label key={time} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.departureTime.includes(time)}
                      onChange={() => toggleTimeFilter(time, 'departureTime')}
                      className="rounded text-blue-600"
                    />
                    {time}
                  </label>
                ))}
              </div>
            </div>

            {/* Arrival Time */}
            <div>
              <h3 className="font-semibold mb-3">Arrival Time</h3>
              <div className="space-y-2">
                {timeSlots.map((time) => (
                  <label key={time} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.arrivalTime.includes(time)}
                      onChange={() => toggleTimeFilter(time, 'arrivalTime')}
                      className="rounded text-blue-600"
                    />
                    {time}
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={() => setFilters({
                busType: { sleeper: false, seater: false },
                amenities: { ac: false, nonAc: false },
                departureTime: [],
                arrivalTime: [],
                pickupPoints: [],
                dropPoints: []
              })}
              className="w-full mt-4 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>

          {/* Results List */}
          <div className="flex-1">
            <SearchResults buses={sortedBuses} onBookNow={(id) => console.log('Booking:', id)} />
          </div>
        </div>
      </div>

      {/* Overlay for mobile filters */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};

export default SearchResultsPage;