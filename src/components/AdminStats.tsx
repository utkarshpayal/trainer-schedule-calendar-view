
import { BookOpen, Calendar, Users, Eye } from 'lucide-react';
import AdminStatsCard from './AdminStatsCard';

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

interface Trainer {
  id: string;
  name: string;
}

interface AdminStatsProps {
  sessions: Session[];
  trainers: Trainer[];
  selectedTrainer: string;
}

const AdminStats = ({ sessions, trainers, selectedTrainer }: AdminStatsProps) => {
  const totalSessions = sessions.length;
  const confirmedSessions = sessions.filter(s => s.status === 'Confirmed').length;
  const totalParticipants = sessions.reduce((sum, s) => sum + s.participants, 0);
  const uniqueTrainers = selectedTrainer === 'all' ? trainers.length : 1;

  return (
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
  );
};

export default AdminStats;
