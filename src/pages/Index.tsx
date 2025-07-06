
import { useState } from 'react';
import LoginPage from '@/components/LoginPage';
import Dashboard from '@/components/Dashboard';
import AdminDashboard from '@/components/AdminDashboard';

const Index = () => {
  const [user, setUser] = useState<{ id: string; name: string; email: string; role: 'trainer' | 'admin' } | null>(null);

  const handleLogin = (userData: { id: string; name: string; email: string; role: 'trainer' | 'admin' }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!user ? (
        <LoginPage onLogin={handleLogin} />
      ) : user.role === 'admin' ? (
        <AdminDashboard user={user} onLogout={handleLogout} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
