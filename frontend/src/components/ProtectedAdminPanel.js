import React, { useState, useEffect } from 'react';
import AdminPanel from './AdminPanel';
import AdminLogin from './AdminLogin';
import PasswordManager from './PasswordManager';

const ProtectedAdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPasswordManager, setShowPasswordManager] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('warobserve_admin_auth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  const handleLogout = () => {
    localStorage.removeItem('warobserve_admin_auth');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  // Add logout button to AdminPanel
  return (
    <div>
      <div className="bg-red-600 text-white p-2 text-center">
        <span className="mr-4">🔐 Режим адміністратора</span>
        <button 
          onClick={() => setShowPasswordManager(true)}
          className="bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-sm mr-2"
        >
          Змінити пароль
        </button>
        <button 
          onClick={handleLogout}
          className="bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-sm"
        >
          Вийти
        </button>
      </div>
      <AdminPanel />
      <PasswordManager 
        isOpen={showPasswordManager} 
        onClose={() => setShowPasswordManager(false)} 
      />
    </div>
  );
};

export default ProtectedAdminPanel;