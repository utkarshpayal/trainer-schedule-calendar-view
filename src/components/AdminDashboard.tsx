
import { useState } from 'react';
import { format, addMonths, subMonths, startOfWeek, addDays } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  Users, 
  BookOpen, 
  Clock,
  Shield,
  Eye,
  Filter
} from 'lucide-react';
import CalendarView from './CalendarView';
import AdminStatsCard from './AdminStatsCard';
import TrainerSelector from './TrainerSelector';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'trainer' | 'admin';
}

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

interface Session {
  id: string;
  trainerId: string;
  trainerName: string;
  courseName: string;
  date: Date;
  duration: number;
  location: string;
  participants: number;
  status: string;
}

const AdminDashboard = ({ user, onLogout }: AdminDashboardProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');
  const [selectedTrainer, setSelectedTrainer] = useState<string>('all');

  // Mock data for all trainers' sessions
  const allSessions: Session[] = [
    {
      id: '1',
      trainerId: '1',
      trainerName: 'Sarah Johnson',
      courseName: 'React Fundamentals',
      date: new Date(2024, 11, 15, 9, 0),
      duration: 120,
      location: 'Room A-101',
      participants: 25,
      status: 'Confirmed'
    },
    {
      id: '2',
      trainerId: '1',
      trainerName: 'Sarah Johnson',
      courseName: 'Advanced JavaScript',
      date: new Date(2024, 11, 18, 14, 0),
      duration: 90,
      location: 'Room B-203',
      participants: 18,
      status: 'Confirmed'
    },
    {
      id: '3',
      trainerId: '2',
      trainerName: 'Mike Chen',
      courseName: 'Python Basics',
      date: new Date(2024, 11, 16, 10, 30),
      duration: 150,
      location: 'Room C-105',
      participants: 22,
      status: 'Confirmed'
    },
    {
      id: '4',
      trainerId: '2',
      trainerName: 'Mike Chen',
      courseName: 'Data Structures',
      date: new Date(2024, 11, 20, 13, 0),
      duration: 180,
      location: 'Room A-102',
      participants: 20,
      status: 'Pending'
    },
    {
      id: '5',
      trainerId: '3',
      trainerName: 'Lisa Rodriguez',
      courseName: 'UI/UX Design',
      date: new Date(2024, 11, 17, 11, 0),
      duration: 120,
      location: 'Design Studio',
      participants: 15,
      status: 'Confirmed'
    },
    {
      id: '6',
      trainerId: '3',
      trainerName: 'Lisa Rodriguez',
      courseName: 'Design Thinking',
      date: new Date(2024, 11, 19, 15, 30),
      duration: 90,
      location: 'Room D-301',
      participants: 12,
      status: 'Confirmed'
    }
  ];

  const trainers = [
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Mike Chen' },
    { id: '3', name: 'Lisa Rodriguez' }
  ];

  // Filter sessions based on selected trainer
  const filteredSessions = selectedTrainer === 'all' 
    ? allSessions 
    : allSessions.filter(session => session.trainerId === selectedTrainer);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => 
      direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1)
    );
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => 
      direction === 'prev' ? addDays(prev, -7) : addDays(prev, 7)
    );
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (view === 'month') {
      navigateMonth(direction);
    } else {
      navigateWeek(direction);
    }
  };

  const getDateRangeText = () => {
    if (view === 'month') {
      return format(currentDate, 'MMMM yyyy');
    } else {
      const weekStart = startOfWeek(currentDate);
      const weekEnd = addDays(weekStart, 6);
      return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
    }
  };

  const totalSessions = filteredSessions.length;
  const confirmedSessions = filteredSessions.filter(s => s.status === 'Confirmed').length;
  const totalParticipants = filteredSessions.reduce((sum, s) => sum + s.participants, 0);
  const uniqueTrainers = selectedTrainer === 'all' ? trainers.length : 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-purple-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Admin Portal</h1>
                  <p className="text-sm text-gray-500">Training Center Management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AdminStatsCard
            title="Total Sessions"
            value={totalSessions}
            icon={BookOpen}
            color="blue"
          />
          <AdminStatsCard
            title="Confirmed Sessions"
            value={confirmedSessions}
            icon={Calendar}
            color="green"
          />
          <AdminStatsCard
            title="Total Participants"
            value={totalParticipants}
            icon={Users}
            color="purple"
          />
          <AdminStatsCard
            title="Active Trainers"
            value={uniqueTrainers}
            icon={Eye}
            color="orange"
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900">Training Schedule</h2>
            <TrainerSelector
              trainers={trainers}
              selectedTrainer={selectedTrainer}
              onTrainerChange={setSelectedTrainer}
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-white rounded-lg border p-1">
              <Button
                variant={view === 'month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('month')}
                className="text-xs"
              >
                Month
              </Button>
              <Button
                variant={view === 'week' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('week')}
                className="text-xs"
              >
                Week
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 bg-white rounded-lg border px-3 py-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation('prev')}
                className="p-1 h-8 w-8"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium min-w-[140px] text-center">
                {getDateRangeText()}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation('next')}
                className="p-1 h-8 w-8"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>
                {selectedTrainer === 'all' 
                  ? 'All Trainers Schedule' 
                  : `${trainers.find(t => t.id === selectedTrainer)?.name}'s Schedule`
                }
              </span>
            </CardTitle>
            <CardDescription>
              {view === 'month' ? 'Monthly' : 'Weekly'} view of training sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarView
              currentDate={currentDate}
              sessions={filteredSessions}
              view={view}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
