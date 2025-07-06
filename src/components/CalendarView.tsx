
import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, startOfWeek, endOfWeek, addDays } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Clock, MapPin, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Session {
  id: string;
  trainerId: string;
  courseName: string;
  date: Date;
  duration: number;
  location: string;
  participants: number;
  status: string;
}

interface CalendarViewProps {
  currentDate: Date;
  sessions: Session[];
  view: 'month' | 'week';
}

const CalendarView = ({ currentDate, sessions, view }: CalendarViewProps) => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const getCalendarDays = () => {
    if (view === 'week') {
      const weekStart = startOfWeek(currentDate);
      const weekEnd = endOfWeek(currentDate);
      return eachDayOfInterval({ start: weekStart, end: weekEnd });
    } else {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(currentDate);
      const calendarStart = startOfWeek(monthStart);
      const calendarEnd = endOfWeek(monthEnd);
      return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    }
  };

  const getSessionsForDay = (day: Date) => {
    return sessions.filter(session => isSameDay(session.date, day));
  };

  const getDayClasses = (day: Date) => {
    const baseClasses = "min-h-[120px] p-2 border border-gray-100 transition-colors hover:bg-gray-50";
    const todayClasses = isToday(day) ? "bg-blue-50 border-blue-200" : "";
    const otherMonthClasses = day.getMonth() !== currentDate.getMonth() ? "text-gray-400 bg-gray-50/50" : "";
    
    return cn(baseClasses, todayClasses, otherMonthClasses);
  };

  const getSessionColor = (courseName: string) => {
    const colors = [
      'bg-blue-100 text-blue-800 border-blue-200',
      'bg-green-100 text-green-800 border-green-200',
      'bg-purple-100 text-purple-800 border-purple-200',
      'bg-orange-100 text-orange-800 border-orange-200',
      'bg-pink-100 text-pink-800 border-pink-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200'
    ];
    
    const hash = courseName.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return colors[Math.abs(hash) % colors.length];
  };

  const calendarDays = getCalendarDays();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <>
      <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        {daysOfWeek.map(day => (
          <div key={day} className="bg-gray-50 p-3 text-center font-medium text-gray-700 border-b border-gray-200">
            {day}
          </div>
        ))}
        
        {/* Calendar Days */}
        {calendarDays.map((day, index) => {
          const daySessions = getSessionsForDay(day);
          
          return (
            <div key={index} className={getDayClasses(day)}>
              <div className="flex justify-between items-start mb-2">
                <span className={cn(
                  "text-sm font-medium",
                  isToday(day) ? "text-blue-700" : "text-gray-900"
                )}>
                  {format(day, 'd')}
                </span>
                {daySessions.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {daySessions.length}
                  </Badge>
                )}
              </div>
              
              <div className="space-y-1">
                {daySessions.map(session => (
                  <div
                    key={session.id}
                    className={cn(
                      "p-2 rounded text-xs cursor-pointer border transition-all hover:scale-105",
                      getSessionColor(session.courseName)
                    )}
                    onClick={() => setSelectedSession(session)}
                  >
                    <div className="font-medium truncate mb-1">
                      {session.courseName}
                    </div>
                    <div className="flex items-center space-x-1 text-xs opacity-75">
                      <Clock className="w-3 h-3" />
                      <span>{format(session.date, 'h:mm a')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Session Details Modal */}
      <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedSession?.courseName}</DialogTitle>
          </DialogHeader>
          {selectedSession && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">{format(selectedSession.date, 'EEEE, MMMM do')}</p>
                    <p className="text-sm text-gray-600">
                      {format(selectedSession.date, 'h:mm a')} - {format(addDays(selectedSession.date, 0), 'h:mm a')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-gray-600">{selectedSession.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Participants</p>
                    <p className="text-sm text-gray-600">{selectedSession.participants} students</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Duration:</span>
                  <span>{selectedSession.duration} minutes</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Status:</span>
                  <Badge variant="secondary">{selectedSession.status}</Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CalendarView;
