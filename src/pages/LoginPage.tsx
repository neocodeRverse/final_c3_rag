/**
 * Login Page
 * Handles authentication with default credentials
 */

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Brain } from 'lucide-react';
import toast from 'react-hot-toast';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!username.trim()) {
      toast.error('Username is required');
      return;
    }

    if (!password.trim()) {
      toast.error('Password is required');
      return;
    }

    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const success = login(username, password);
      
      if (success) {
        toast.success('Login successful!');
        window.location.reload();
      } else {
        toast.error('Invalid credentials');
        setPassword('');
      }
      
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Brain size={28} className="sm:w-8 sm:h-8" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              RAG System
            </h1>
            <p className="text-gray-300 text-sm">Sign in to access the knowledge base</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">Demo: Admin123</p>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">Demo: Password@12345</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-6 p-4 rounded-lg bg-blue-500/20 border border-blue-500/30">
            <p className="text-xs text-blue-200">
              <span className="font-semibold">Demo Credentials:</span> Use the credentials shown above to test the application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
