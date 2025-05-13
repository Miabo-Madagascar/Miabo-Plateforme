import React from 'react';
import { Bell, Menu, MessageSquare, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
  onMenuClick: () => void;
  user: {
    id: string;
    name: string;
    email: string;
    role: string | null;
    profileImage?: string;
  };
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick, user }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0">
      <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="text-gray-500 hover:text-gray-700 focus:outline-none md:hidden"
          >
            <Menu size={24} />
          </button>
          
          {/* Search - only visible on medium screens and up */}
          <div className="hidden md:flex items-center ml-6">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                className="form-input pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 w-64"
              />
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Search icon for mobile */}
          <button className="md:hidden p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
            <Search size={20} />
          </button>
          
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none">
              <Bell size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-accent-500 ring-2 ring-white"></span>
            </button>
          </div>
          
          {/* Messages */}
          <div className="relative">
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none">
              <MessageSquare size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary-500 ring-2 ring-white"></span>
            </button>
          </div>
          
          {/* User menu */}
          <div className="relative border-l pl-4 flex items-center">
            <Link to="/profile" className="flex items-center space-x-2 group">
              <img
                src={user?.profileImage || 'https://i.pravatar.cc/150?img=1'}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-700 group-hover:text-primary-600">{user.name}</div>
                <div className="text-xs text-gray-500 capitalize">{user.role}</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;