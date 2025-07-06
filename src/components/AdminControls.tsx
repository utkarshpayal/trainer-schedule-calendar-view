
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import TrainerSelector from './TrainerSelector';

interface Trainer {
  id: string;
  name: string;
}

interface AdminControlsProps {
  trainers: Trainer[];
  selectedTrainer: string;
  onTrainerChange: (trainerId: string) => void;
  onAddSession: () => void;
  view: 'month' | 'week';
  onViewChange: (view: 'month' | 'week') => void;
  dateRangeText: string;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const AdminControls = ({
  trainers,
  selectedTrainer,
  onTrainerChange,
  onAddSession,
  view,
  onViewChange,
  dateRangeText,
  onNavigate
}: AdminControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold text-gray-900">Training Schedule</h2>
        <TrainerSelector
          trainers={trainers}
          selectedTrainer={selectedTrainer}
          onTrainerChange={onTrainerChange}
        />
      </div>
      
      <div className="flex items-center space-x-3">
        <Button
          onClick={onAddSession}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Session</span>
        </Button>
        
        <div className="flex items-center space-x-2 bg-white rounded-lg border p-1">
          <Button
            variant={view === 'month' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('month')}
            className="text-xs"
          >
            Month
          </Button>
          <Button
            variant={view === 'week' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('week')}
            className="text-xs"
          >
            Week
          </Button>
        </div>
        
        <div className="flex items-center space-x-2 bg-white rounded-lg border px-3 py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('prev')}
            className="p-1 h-8 w-8"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium min-w-[140px] text-center">
            {dateRangeText}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('next')}
            className="p-1 h-8 w-8"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminControls;
