
import { useState } from 'react';
import { format, addMonths, subMonths, startOfWeek, addDays } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import CalendarView from './CalendarView';
import AdminHeader from './AdminHeader';
import AdminStats from './AdminStats';
import AdminControls from './AdminControls';
import AddSessionDialog from './AddSessionDialog';

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
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Mock data for all trainers' sessions
  const [allSessions, setAllSessions] = useState<Session[]>([
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
  ]);

  const trainers = [
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Mike Chen' },
    { id: '3', name: 'Lisa Rodriguez' }
  ];

  // Filter sessions based on selected trainer
  const filteredSessions = selectedTrainer === 'all' 
    ? allSessions 
    : allSessions.filter(session => session.trainerId === selectedTrainer);

  const handleAddSession = (newSession: Omit<Session, 'id'>) => {
    const sessionWithId = {
      ...newSession,
      id: Date.now().toString()
    };
    setAllSessions(prev => [...prev, sessionWithId]);
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AdminHeader user={user} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <AdminStats 
          sessions={filteredSessions} 
          trainers={trainers} 
          selectedTrainer={selectedTrainer} 
        />

        {/* Controls */}
        <AdminControls
          trainers={trainers}
          selectedTrainer={selectedTrainer}
          onTrainerChange={setSelectedTrainer}
          onAddSession={() => setShowAddDialog(true)}
          view={view}
          onViewChange={setView}
          dateRangeText={getDateRangeText()}
          onNavigate={handleNavigation}
        />

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

      <AddSessionDialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAddSession={handleAddSession}
      />
    </div>
  );
};

export default AdminDashboard;
