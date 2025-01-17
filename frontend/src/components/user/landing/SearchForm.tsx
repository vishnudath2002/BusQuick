import React, { useState } from 'react';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate  } from 'react-router-dom';
const SearchForm: React.FC = () => {
  const [fromCity, setFromCity] = useState('kozhikkode');
  const [toCity, setToCity] = useState('palakkad');
  const [date, setDate] = useState('');
  const [searchType, setSearchType] = useState('basic');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ searchType, fromCity, toCity, date });

    navigate('/searchresult',{state: {from:fromCity,to:toCity}})
  };

  return (
    <div className="max-w-4xl mx-auto -mt-16 relative z-10 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-white/90">
        {/* Search Type Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl p-1 bg-gray-50 border border-gray-100">
            <button
              type="button"
              onClick={() => setSearchType('basic')}
              className={`px-8 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                searchType === 'basic'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Basic
            </button>
            <button
              type="button"
              onClick={() => setSearchType('planner')}
              className={`px-8 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                searchType === 'planner'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Trip Planner
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group">
              <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  id="from"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="pl-12 w-full rounded-xl border border-gray-200 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50 hover:bg-gray-50/80"
                  placeholder="Enter departure city"
                  required
                />
              </div>
            </div>

            <div className="relative group">
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  id="to"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="pl-12 w-full rounded-xl border border-gray-200 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50 hover:bg-gray-50/80"
                  placeholder="Enter destination city"
                  required
                />
              </div>
            </div>

            <div className="relative group">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Travel Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-12 w-full rounded-xl border border-gray-200 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50 hover:bg-gray-50/80"
                  // required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-12 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 flex items-center gap-2 group"
            >
              Search Buses
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;