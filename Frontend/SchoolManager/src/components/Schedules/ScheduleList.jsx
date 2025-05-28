import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const ScheduleList = () => {
  const [selectedClass, setSelectedClass] = useState('10A1');
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const timeSlots = [
    '07:00 - 07:45',
    '07:50 - 08:35',
    '08:45 - 09:30',
    '09:35 - 10:20',
    '10:30 - 11:15',
  ];

  const weekDays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

  const mockSchedule = {
    '10A1': {
      'Thứ 2': ['Toán', 'Văn', 'Lý', 'Hóa', 'Anh'],
      'Thứ 3': ['Sinh', 'Sử', 'Địa', 'GDCD', 'Thể dục'],
      'Thứ 4': ['Toán', 'Văn', 'Lý', 'Tin', 'Công nghệ'],
      'Thứ 5': ['Anh', 'Văn', 'Hóa', 'Sinh', 'Địa'],
      'Thứ 6': ['Toán', 'Lý', 'Hóa', 'Sử', 'GDCD'],
      'Thứ 7': ['Thể dục', 'Sinh', 'Văn', 'Anh', 'Toán']
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Thời Khoá Biểu</h1>
        <div className="flex items-center gap-4">
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="10A1">Lớp 10A1</option>
            <option value="10A2">Lớp 10A2</option>
            <option value="10A3">Lớp 10A3</option>
          </select>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Tuần 1 (15/05 - 20/05)</span>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                <Clock className="w-4 h-4 inline-block mr-2" />
                Tiết
              </th>
              {weekDays.map((day) => (
                <th key={day} className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time, timeIndex) => (
              <tr key={time} className="hover:bg-gray-50">
                <td className="py-4 px-6 text-sm text-gray-500 border">
                  <div className="font-medium">Tiết {timeIndex + 1}</div>
                  <div className="text-xs">{time}</div>
                </td>
                {weekDays.map((day) => (
                  <td key={`${day}-${time}`} className="py-4 px-6 text-sm border">
                    {mockSchedule[selectedClass]?.[day]?.[timeIndex] && (
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <div className="font-medium text-blue-700">
                          {mockSchedule[selectedClass][day][timeIndex]}
                        </div>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 flex gap-4">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded bg-blue-50 border border-blue-200 mr-2"></div>
          <span className="text-sm text-gray-600">Tiết học</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded bg-gray-50 border border-gray-200 mr-2"></div>
          <span className="text-sm text-gray-600">Trống</span>
        </div>
      </div>
    </div>
  );
};

export default ScheduleList;