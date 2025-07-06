
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';

interface Trainer {
  id: string;
  name: string;
}

interface TrainerSelectorProps {
  trainers: Trainer[];
  selectedTrainer: string;
  onTrainerChange: (trainerId: string) => void;
}

const TrainerSelector = ({ trainers, selectedTrainer, onTrainerChange }: TrainerSelectorProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Filter className="w-4 h-4 text-gray-500" />
      <Select value={selectedTrainer} onValueChange={onTrainerChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select trainer" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Trainers</SelectItem>
          {trainers.map((trainer) => (
            <SelectItem key={trainer.id} value={trainer.id}>
              {trainer.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TrainerSelector;
