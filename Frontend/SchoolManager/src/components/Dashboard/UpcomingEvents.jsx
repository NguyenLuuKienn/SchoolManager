import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { eventsData } from '../../data/mockData';

const getEventTypeStyles = (type) => {
  switch (type) {
    case 'academic':
      return 'bg-blue-100 text-blue-800';
    case 'sports':
      return 'bg-green-100 text-green-800';
    case 'cultural':
      return 'bg-purple-100 text-purple-800';
    case 'holiday':
      return 'bg-red-100 text-red-800';
    case 'meeting':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const UpcomingEvents = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Sự Kiện Sắp Tới</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
          View All
        </button>
      </div>
      
      <div className="space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100% - 3rem)' }}>
        {eventsData.map((event) => (
          <div 
            key={event.id}
            className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${getEventTypeStyles(event.type)}`}>
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </span>
            </div>
            
            <div className="mt-3 space-y-2">
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-2" />
                <span>{event.date}</span>
              </div>
              
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-2" />
                <span>{event.time}</span>
              </div>
              
              <div className="flex items-center text-xs text-gray-500">
                <MapPin className="h-3 w-3 mr-2" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;