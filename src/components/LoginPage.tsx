
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, User, Lock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LoginPageProps {
  onLogin: (user: { id: string; name: string; email: string }) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Demo trainers for testing
  const demoTrainers = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah@trainingcenter.com', password: 'demo123' },
    { id: '2', name: 'Mike Chen', email: 'mike@trainingcenter.com', password: 'demo123' },
    { id: '3', name: 'Lisa Rodriguez', email: 'lisa@trainingcenter.com', password: 'demo123' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo authentication logic
    const trainer = demoTrainers.find(t => t.email === email && t.password === password);
    
    if (trainer) {
      toast({
        title: "Login Successful",
        description: `Welcome back, ${trainer.name}!`,
      });
      onLogin({ id: trainer.id, name: trainer.name, email: trainer.email });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Try demo credentials.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trainer Portal</h1>
          <p className="text-gray-600">Access your training schedule</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl font-semibold">Sign In</CardTitle>
            <CardDescription>Enter your credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="trainer@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Demo Credentials:</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Sarah:</strong> sarah@trainingcenter.com / demo123</p>
                <p><strong>Mike:</strong> mike@trainingcenter.com / demo123</p>
                <p><strong>Lisa:</strong> lisa@trainingcenter.com / demo123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
