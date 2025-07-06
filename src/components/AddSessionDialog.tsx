
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, MapPin, Users, BookOpen } from 'lucide-react';

interface AddSessionDialogProps {
  open: boolean;
  onClose: () => void;
  onAddSession: (session: {
    trainerId: string;
    trainerName: string;
    courseName: string;
    date: Date;
    duration: number;
    location: string;
    participants: number;
    status: string;
  }) => void;
}

const AddSessionDialog = ({ open, onClose, onAddSession }: AddSessionDialogProps) => {
  const [formData, setFormData] = useState({
    trainerId: '',
    courseName: '',
    date: '',
    time: '',
    duration: '',
    location: '',
    participants: '',
    status: 'Confirmed'
  });

  const trainers = [
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Mike Chen' },
    { id: '3', name: 'Lisa Rodriguez' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const [hours, minutes] = formData.time.split(':').map(Number);
    const sessionDate = new Date(formData.date);
    sessionDate.setHours(hours, minutes);

    const selectedTrainer = trainers.find(t => t.id === formData.trainerId);
    
    const newSession = {
      trainerId: formData.trainerId,
      trainerName: selectedTrainer?.name || '',
      courseName: formData.courseName,
      date: sessionDate,
      duration: parseInt(formData.duration),
      location: formData.location,
      participants: parseInt(formData.participants),
      status: formData.status
    };

    onAddSession(newSession);
    
    // Reset form
    setFormData({
      trainerId: '',
      courseName: '',
      date: '',
      time: '',
      duration: '',
      location: '',
      participants: '',
      status: 'Confirmed'
    });
    
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Add New Training Session</span>
          </DialogTitle>
          <DialogDescription>
            Create a new training session for a trainer.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="trainer">Trainer</Label>
              <Select value={formData.trainerId} onValueChange={(value) => handleInputChange('trainerId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select trainer" />
                </SelectTrigger>
                <SelectContent>
                  {trainers.map((trainer) => (
                    <SelectItem key={trainer.id} value={trainer.id}>
                      {trainer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseName">Course Name</Label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="courseName"
                  value={formData.courseName}
                  onChange={(e) => handleInputChange('courseName', e.target.value)}
                  placeholder="e.g., React Fundamentals"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder="e.g., 120"
                min="30"
                step="15"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="participants">Participants</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="participants"
                  type="number"
                  value={formData.participants}
                  onChange={(e) => handleInputChange('participants', e.target.value)}
                  placeholder="e.g., 25"
                  className="pl-10"
                  min="1"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., Room A-101"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Session
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSessionDialog;
