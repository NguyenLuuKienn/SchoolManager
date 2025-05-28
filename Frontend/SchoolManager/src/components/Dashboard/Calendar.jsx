import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const months = [
    'Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu',
    'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Thang Mười Hai'
  ];

  const renderCalendarDays = () => {
    const days = [];
    const today = new Date();
    const isCurrentMonth = currentDate.getMonth() === today.getMonth() && 
                          currentDate.getFullYear() === today.getFullYear();
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && day === today.getDate();
      days.push(
        <div
          key={day}
          className={`h-10 w-10 flex items-center justify-center rounded-full cursor-pointer
            ${isToday 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'hover:bg-gray-100'
            }`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          &lt;
        </button>
        <h2 className="text-lg font-semibold">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button 
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="h-10 w-10 flex items-center justify-center font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>

     <div className="mt-4 border-t pt-3">
     <div className="flex items-center text-xs">
       <span className="h-3 w-3 rounded-full bg-blue-600 mr-2"></span>
       <span className="text-gray-600">School Events</span>
     </div>
     <div className="flex items-center text-xs mt-1">
       <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
       <span className="text-gray-600">Classes</span>
     </div>
     <div className="flex items-center text-xs mt-1">
       <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
       <span className="text-gray-600">Exams</span>
     </div>
   </div>
 </div>
  );
};

export default Calendar;