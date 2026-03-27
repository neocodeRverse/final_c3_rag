/**
 * Navbar Component
 * Navigation bar with logo and logout button
 */

import { useAuth } from '../context/AuthContext';
import { LogOut, Brain } from 'lucide-react';

interface NavbarProps {
  currentPage: 'query' | 'upload';
  onNavigate: (page: 'query' | 'upload') => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <nav className="w-full backdrop-blur-md bg-slate-900/30 border-b border-white/10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-2">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Brain size={20} className="sm:w-6 sm:h-6" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              RAG System
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-6">
            <button
              onClick={() => onNavigate('query')}
              className={`px-3 py-2 sm:px-4 rounded-lg transition-all duration-300 text-sm sm:text-base ${
                currentPage === 'query'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Query
            </button>
            <button
              onClick={() => onNavigate('upload')}
              className={`px-3 py-2 sm:px-4 rounded-lg transition-all duration-300 text-sm sm:text-base ${
                currentPage === 'upload'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Upload KB
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 rounded-lg text-gray-300 hover:text-white hover:bg-red-500/20 transition-all duration-300 border border-transparent hover:border-red-500/30 text-sm sm:text-base"
            >
              <LogOut size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
