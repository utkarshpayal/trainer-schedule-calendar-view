
import { useState } from 'react';
import LoginPage from '@/components/LoginPage';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);

  const handleLogin = (userData: { id: string; name: string; email: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!user ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
