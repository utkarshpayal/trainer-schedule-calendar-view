
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, LogOut, Clock, MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarView from '@/components/CalendarView';
import { format, startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns';

interface User {
  id: string;
  name: string;
  email: string;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

// Demo session data
const generateDemoSessions = (trainerId: string) => {
  const sessions = [
    {
      id: '1',
      trainerId: '1',
      courseName: 'Advanced JavaScript',
      date: new Date(2025, 0, 8, 9, 0), // Jan 8, 2025, 9:00 AM
      duration: 120,
      location: 'Room A-101',
      participants: 15,
      status: 'scheduled'
    },
    {
      id: '2',
      trainerId: '1',
      courseName: 'React Fundamentals',
      date: new Date(2025, 0, 10, 14, 0), // Jan 10, 2025, 2:00 PM
      duration: 180,
      location: 'Room B-205',
      participants: 12,
      status: 'scheduled'
    },
    {
      id: '3',
      trainerId: '2',
      courseName: 'Python for Beginners',
      date: new Date(2025, 0, 9, 10, 0), // Jan 9, 2025, 10:00 AM
      duration: 150,
      location: 'Room C-301',
      participants: 20,
      status: 'scheduled'
    },
    {
      id: '4',
      trainerId: '2',
      courseName: 'Data Analysis',
      date: new Date(2025, 0, 12, 11, 0), // Jan 12, 2025, 11:00 AM  
      duration: 240,
      location: 'Lab D-102',
      participants: 8,
      status: 'scheduled'
    },
    {
      id: '5',
      trainerId: '3',
      courseName: 'UI/UX Design Workshop',
      date: new Date(2025, 0, 11, 13, 0), // Jan 11, 2025, 1:00 PM
      duration: 180,
      location: 'Design Studio',
      participants: 10,
      status: 'scheduled'
    },
    {
      id: '6',
      trainerId: '1',
      courseName: 'Node.js Backend',
      date: new Date(2025, 0, 15, 16, 0), // Jan 15, 2025, 4:00 PM
      duration: 120,
      location: 'Room A-101',
      participants: 14,
      status: 'scheduled'
    }
  ];

  return sessions.filter(session => session.trainerId === trainerId);
};

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');
  
  const userSessions = generateDemoSessions(user.id);
  
  // Get today's sessions
  const today = new Date();
  const todaySessions = userSessions.filter(session => 
    session.date.toDateString() === today.toDateString()
  );

  // Get upcoming sessions (next 7 days)
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  const upcomingSessions = userSessions.filter(session => 
    session.date > today && session.date <= nextWeek
  ).slice(0, 3);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => 
      direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1)
    );
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-8 h-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Trainer Portal</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Today's Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span>Today's Sessions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {todaySessions.length > 0 ? (
                  <div className="space-y-3">
                    {todaySessions.map(session => (
                      <div key={session.id} className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900">{session.courseName}</h4>
                        <div className="text-sm text-blue-700 mt-1 space-y-1">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{format(session.date, 'h:mm a')}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{session.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No sessions scheduled for today</p>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span>Upcoming</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingSessions.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingSessions.map(session => (
                      <div key={session.id} className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-900">{session.courseName}</h4>
                        <div className="text-sm text-green-700 mt-1 space-y-1">
                          <div>{format(session.date, 'MMM dd, h:mm a')}</div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{session.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No upcoming sessions</p>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Sessions</span>
                    <Badge variant="secondary">{userSessions.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Hours</span>
                    <Badge variant="secondary">
                      {Math.round(userSessions.reduce((acc, session) => acc + session.duration, 0) / 60)}h
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Students</span>
                    <Badge variant="secondary">
                      {userSessions.reduce((acc, session) => acc + session.participants, 0)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Calendar */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('prev')}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <h2 className="text-xl font-semibold">
                      {format(currentDate, 'MMMM yyyy')}
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('next')}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant={view === 'month' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setView('month')}
                    >
                      Month
                    </Button>
                    <Button
                      variant={view === 'week' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setView('week')}
                    >
                      Week
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CalendarView
                  currentDate={currentDate}
                  sessions={userSessions}
                  view={view}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
