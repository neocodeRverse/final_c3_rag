/**
 * Main App Component
 * Handles routing and authentication
 */

import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { QueryPage } from './pages/QueryPage';
import { UploadPage } from './pages/UploadPage';
import { Navbar } from './components/Navbar';
import './App.css';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<'query' | 'upload'>('query');

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Page Content */}
      <div className="pt-4 w-full mx-auto">
        {currentPage === 'query' ? <QueryPage /> : <UploadPage />}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
