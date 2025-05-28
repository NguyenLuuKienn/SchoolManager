import React from 'react';
import { Bell } from 'lucide-react';
import { formatTimeAgo } from '../../utils/dateUtils';
import { notificationsData } from '../../data/mockData';

const NotificationsPanel = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Thông Báo</h2>
        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
          {notificationsData.filter(notification => !notification.read).length}
        </span>
      </div>
      
      <div className="space-y-3 overflow-y-auto" style={{ maxHeight: 'calc(100% - 3rem)' }}>
        {notificationsData.map((notification) => (
          <div 
            key={notification.id}
            className={`p-3 rounded-lg border-l-4 ${
              notification.read ? 'border-gray-300 bg-gray-50' : 'border-blue-500 bg-blue-50'
            } transition-all duration-200 hover:shadow-sm`}
          >
            <div className="flex items-start">
              <div className={`p-2 rounded-full ${notification.read ? 'bg-gray-200' : 'bg-blue-100'} mr-3`}>
                <Bell className={`h-4 w-4 ${notification.read ? 'text-gray-500' : 'text-blue-600'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                  {notification.title}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {notification.message}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {formatTimeAgo(notification.time)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        
      </div>
    </div>
  );
};

export default NotificationsPanel;