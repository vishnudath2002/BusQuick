import React from 'react';
import { Clock, Users, Bus } from 'lucide-react';

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

interface SearchResultsProps {
  buses: Bus[];
  onBookNow: (busId: string) => void;
}

// Utility function to format time
const formatTime = (isoTime: string): string => {
  const date = new Date(isoTime);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};

// Utility function to calculate duration
const calculateDuration = (start: string, end: string): string => {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const durationMs = endTime - startTime;

  if (durationMs < 0) return 'Invalid time range';

  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
};

const SearchResults: React.FC<SearchResultsProps> = ({ buses, onBookNow }) => {
  if (!Array.isArray(buses)) {
    return <div>No buses available or invalid data format.</div>;
  }

  return (
    <div className="space-y-4">
      {buses.map((bus) => (
        <div
          key={bus.scheduleId}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            {/* Operator Info */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800">{bus.bus.name}</h3>
              <p className="text-sm text-gray-500">{bus.bus.type}</p>
            </div>

            {/* Time Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4">
                {/* Departure Time */}
                <div className="text-center">
                  <p className="text-lg font-semibold">{formatTime(bus.startTime)}</p>
                  <p className="text-sm text-gray-500">Departure</p>
                </div>

                {/* Duration Line */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full border-t-2 border-dashed border-gray-300 relative">
                    <Clock className="w-4 h-4 text-gray-400 absolute -top-2 left-1/2 -translate-x-1/2" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{calculateDuration(bus.startTime, bus.endTime)}</p>
                </div>

                {/* Arrival Time */}
                <div className="text-center">
                  <p className="text-lg font-semibold">{formatTime(bus.endTime)}</p>
                  <p className="text-sm text-gray-500">Arrival</p>
                </div>
              </div>
            </div>

            {/* Seats Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">{bus.bus.seatsAvailable} seats available</span>
              </div>
            </div>

            {/* Price and Book */}
            <div className="flex-1 text-right">
              <p className="text-2xl font-bold text-blue-600">₹{bus.price}</p>
              <button
                onClick={() => onBookNow(bus.scheduleId)}
                className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 ml-auto"
              >
                <Bus className="w-4 h-4" />
                Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;