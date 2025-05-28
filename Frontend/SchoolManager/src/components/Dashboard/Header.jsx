import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { School, User, Settings, LogOut, UserCircle } from 'lucide-react';
import { navigationItems } from '../../data/mockData';

const Header = ({ schoolName }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and School Name */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <School className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900"><a href='/'>{schoolName}</a></h1>
            </div>
            
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  location.pathname === item.href
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-900 hover:border-b-2 hover:border-gray-300'
                } px-3 py-2 text-sm font-medium transition-colors duration-200`}
                aria-current={location.pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Avatar with Dropdown */}
          <div className="flex items-center">
            <div className="ml-3 relative">
              <div className="flex items-center">
                <button
                  type="button"
                  className="bg-gray-100 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:ring-2 hover:ring-blue-300"
                  id="user-menu-button"
                  aria-expanded={isMenuOpen}
                  aria-haspopup="true"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <User className="h-5 w-5" />
                  </div>
                </button>
              </div>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none z-50">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserCircle className="h-4 w-4 mr-3" />
                    Thông tin cá nhân
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Cài đặt tài khoản
                  </Link>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                    onClick={() => {
                      setIsMenuOpen(false);
                      // Add logout logic here
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;