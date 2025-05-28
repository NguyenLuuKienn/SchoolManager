import React from 'react';
import Header from '../components/Dashboard/Header';

const DashboardLayout = ({ children, schoolName }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header schoolName={schoolName} />
      <main className="py-6">
        <div className="max-w-screen-xll mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;