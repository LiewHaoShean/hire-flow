
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";

interface InterviewSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
  applicantName: string;
  interviewRound: string;
  onSchedule: (scheduleData: any) => void;
}

export default function InterviewScheduler({ 
  isOpen, 
  onClose, 
  applicantName, 
  interviewRound, 
  onSchedule 
}: InterviewSchedulerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [duration, setDuration] = useState("60");
  const [meetingLink, setMeetingLink] = useState("");

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time");
      return;
    }

    const scheduleData = {
      applicantName,
      interviewRound,
      date: selectedDate,
      time: selectedTime,
      duration: parseInt(duration),
      meetingLink: meetingLink || "https://meet.google.com/new"
    };

    onSchedule(scheduleData);
    toast.success(`Interview scheduled for ${applicantName}`);
    onClose();
    
    // Reset form
    setSelectedDate(new Date());
    setSelectedTime("");
    setDuration("60");
    setMeetingLink("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Schedule Interview
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Applicant</Label>
            <p className="text-sm text-muted-foreground">{applicantName}</p>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Interview Round</Label>
            <p className="text-sm text-muted-foreground">{interviewRound}</p>
          </div>
          
          <div>
            <Label className="text-sm font-medium mb-2 block">Select Date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium">Time</Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Duration (minutes)</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
                <SelectItem value="90">90 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Meeting Link (Optional)</Label>
            <Input
              placeholder="https://meet.google.com/..."
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-2 pt-4">
          <Button onClick={handleSchedule} className="flex-1">
            <Clock className="h-4 w-4 mr-2" />
            Schedule Interview
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
