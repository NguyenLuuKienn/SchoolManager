import React, { useState } from 'react';
import { Plus, Search, Calendar, MapPin, Users, Clock, Tag } from 'lucide-react';

const EventList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockEvents = [
    {
      id: 1,
      title: 'Lễ Khai Giảng',
      date: '2024-09-05',
      time: '07:30 - 11:00',
      location: 'Sân Trường',
      type: 'Học Tập',
      attendees: 1200,
      description: 'Lễ khai giảng năm học mới 2024-2025'
    },
    {
      id: 2,
      title: 'Hội Thao Thể Thao',
      date: '2024-09-15',
      time: '08:00 - 17:00',
      location: 'Sân Vận Động',
      type: 'Thể Thao',
      attendees: 500,
      description: 'Giải đấu thể thao giữa các lớp'
    }
  ];

  const getEventTypeColor = (type) => {
    const colors = {
      'Học Tập': 'bg-blue-100 text-blue-800',
      'Thể Thao': 'bg-green-100 text-green-800',
      'Văn Hoá': 'bg-purple-100 text-purple-800',
      'Khác': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || colors['Khác'];
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản Lý Sự Kiện</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Thêm Sự Kiện
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Tìm kiếm sự kiện..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Tất Cả Loại</option>
          <option value="academic">Học Tập</option>
          <option value="sports">Thể Thao</option>
          <option value="cultural">Văn Hoá</option>
        </select>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                {event.type}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{event.date}</span>
              </div>

              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span>{event.time}</span>
              </div>

              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{event.location}</span>
              </div>

              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-2" />
                <span>{event.attendees} người tham dự</span>
              </div>

              <p className="text-gray-600 text-sm">{event.description}</p>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Chỉnh Sửa
              </button>
              <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                Xoá
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar View Toggle */}
      <div className="mt-6 flex justify-center">
        <button className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <Calendar className="w-5 h-5 mr-2" />
          Xem Lịch
        </button>
      </div>
    </div>
  );
};

export default EventList;