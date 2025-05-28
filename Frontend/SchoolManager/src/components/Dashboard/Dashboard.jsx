import React from 'react';
import Calendar from './Calendar';
import NotificationsPanel from './NotificationsPanel';
import UpcomingEvents from './UpcomingEvents';
import DigitalClock from './DigitalClock';
import StatisticsWidget from './StatisticsWidget';
import { statisticsData } from '../../data/mockData';

const Dashboard = () => {
  return (
    <>
      {/* Statistics Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {statisticsData.map((stat) => (
          <StatisticsWidget key={stat.id} stat={stat} />
        ))}
      </div>

      {/* Main Content Area - 3 Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="h-[400px]">
          <Calendar />
        </div>
        <div className="h-[400px]">
          <NotificationsPanel />
        </div>
        <div className="h-[400px]">
          <UpcomingEvents />
        </div>
      </div>

      {/* Digital Clock */}
      <div className="max-w-xs mx-auto">
        <DigitalClock />
      </div>
    </>
  );
};

export default Dashboard;
