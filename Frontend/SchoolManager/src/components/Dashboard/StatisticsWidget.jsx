import React from 'react';
import { Users, GraduationCap, BookOpen, CalendarDays, Calendar, ClipboardList } from 'lucide-react';

const StatisticsWidget = ({ stat }) => {
  // Map string icon names to Lucide icon components
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Users':
        return <Users className="h-8 w-8" />;
      case 'GraduationCap':
        return <GraduationCap className="h-8 w-8" />;
      case 'BookOpen':
        return <BookOpen className="h-8 w-8" />;
      case 'CalendarDays':
        return <CalendarDays className="h-8 w-8" />;
      case 'Calendar':
        return <Calendar className="h-8 w-8" />;
      case 'ClipboardList':
        return <ClipboardList className="h-8 w-8" />;
      default:
        return <Users className="h-8 w-8" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 flex items-center justify-between overflow-hidden relative">
      <div className="z-10">
        <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
        <p className="text-2xl font-bold mt-1 text-gray-900">{stat.value.toLocaleString()}</p>
      </div>
      <div className={`${stat.color} p-3 rounded-full`}>
        {getIcon(stat.icon)}
      </div>
      <div className={`absolute right-0 top-0 h-full w-24 ${stat.color.split(' ')[0]} opacity-10 rounded-l-full`}></div>
    </div>
  );
};

export default StatisticsWidget;