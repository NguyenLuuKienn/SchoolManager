import React, { useState, useEffect } from 'react';
import { getCurrentDate, getCurrentTime } from '../../utils/dateUtils';

const DigitalClock = () => {
  const [date, setDate] = useState(getCurrentDate());
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCurrentTime());
      setDate(getCurrentDate());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 text-center transition-all duration-300 hover:shadow-md">
      <div className="text-3xl font-bold text-gray-800">{time}</div>
      <div className="text-sm text-gray-500 mt-1">{date}</div>
    </div>
  );
};

export default DigitalClock;