import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Vote, LogOut, User, Shield, Users } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="relative bg-gradient-to-r from-primary-50 to-success-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100 sticky top-0 z-50">
      <div className="absolute inset-x-0 bottom-0 h-1 gradient-strip" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Vote className="h-8 w-8 text-primary-600 mr-3 drop-shadow-sm" />
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Digital Voting System</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                {user?.role === 'admin' ? (
                  <Shield className="h-4 w-4 text-primary-600" />
                ) : (
                  <User className="h-4 w-4 text-primary-600" />
                )}
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center space-x-2 bg-danger-500 text-white px-4 py-2 rounded-lg hover:bg-danger-600 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
