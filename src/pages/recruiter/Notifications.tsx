
import { useState } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Calendar, Clock, UserCheck, UserX, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import InterviewScheduler from "@/components/recruiter/InterviewScheduler";

// Mock notification data for recruiters
const mockRecruiterNotifications = [
  {
    id: "1",
    type: "interview_declined",
    title: "Interview Rescheduling Required",
    message: "Jessica Miller has declined the proposed interview times for Senior Frontend Developer position",
    applicantName: "Jessica Miller",
    position: "Senior Frontend Developer",
    status: "needs_reschedule",
    timestamp: "30 minutes ago",
    reason: "None of the proposed times work"
  },
  {
    id: "2",
    type: "interview_confirmed",
    title: "Interview Confirmed",
    message: "Michael Chen has confirmed the interview for Backend Engineer position",
    applicantName: "Michael Chen",
    position: "Backend Engineer",
    status: "confirmed",
    scheduledTime: "2025-06-07 10:00 AM",
    timestamp: "2 hours ago"
  },
  {
    id: "3",
    type: "application_submitted",
    title: "New Application Received",
    message: "A new application has been submitted for Digital Marketing Specialist position",
    applicantName: "Emma Thompson",
    position: "Digital Marketing Specialist",
    status: "new",
    matchScore: 87,
    timestamp: "4 hours ago"
  },
  {
    id: "4",
    type: "interview_completed",
    title: "Interview Completed",
    message: "Technical assessment completed by David Wilson for Senior Frontend Developer",
    applicantName: "David Wilson",
    position: "Senior Frontend Developer",
    status: "completed",
    assessmentScore: 85,
    timestamp: "1 day ago"
  }
];

export default function RecruiterNotifications() {
  const [notifications, setNotifications] = useState(mockRecruiterNotifications);
  const [activeTab, setActiveTab] = useState("all");
  const [schedulerOpen, setSchedulerOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);

  const handleReschedule = (notification: any) => {
    setSelectedNotification(notification);
    setSchedulerOpen(true);
  };

  const handleScheduleInterview = (scheduleData: any) => {
    if (selectedNotification) {
      setNotifications(prev => prev.map(notif => 
        notif.id === selectedNotification.id 
          ? { ...notif, status: "rescheduled" }
          : notif
      ));
      toast.success(`Interview rescheduled for ${scheduleData.applicantName}`);
      setSelectedNotification(null);
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId 
        ? { ...notif, status: "read" }
        : notif
    ));
  };

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "interviews":
        return notifications.filter(n => n.type.includes("interview"));
      case "applications":
        return notifications.filter(n => n.type.includes("application"));
      case "urgent":
        return notifications.filter(n => n.status === "needs_reschedule" || n.status === "new");
      default:
        return notifications;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "interview_declined":
      case "interview_confirmed":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case "application_submitted":
        return <UserCheck className="h-5 w-5 text-green-500" />;
      case "interview_completed":
        return <Clock className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      needs_reschedule: { label: "Action Required", class: "bg-red-100 text-red-800" },
      confirmed: { label: "Confirmed", class: "bg-green-100 text-green-800" },
      new: { label: "New", class: "bg-blue-100 text-blue-800" },
      completed: { label: "Completed", class: "bg-gray-100 text-gray-800" },
      rescheduled: { label: "Rescheduled", class: "bg-yellow-100 text-yellow-800" },
      read: { label: "Read", class: "bg-gray-50 text-gray-600" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
    return <Badge className={config.class}>{config.label}</Badge>;
  };

  return (
    <MainLayout userType="recruiter">
      <div className="page-container">
        <div className="mb-8">
          <h1 className="mb-2">Notifications</h1>
          <p className="text-muted-foreground">Manage interview schedules and application updates</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Notifications</TabsTrigger>
            <TabsTrigger value="urgent">Urgent</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="space-y-4">
              {getFilteredNotifications().map((notification) => (
                <Card key={notification.id} className={notification.status === "needs_reschedule" ? "border-red-200" : ""}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getNotificationIcon(notification.type)}
                        <div>
                          <CardTitle className="text-lg">{notification.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {notification.applicantName} • {notification.position}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(notification.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{notification.message}</p>
                    
                    {notification.type === "interview_declined" && notification.status === "needs_reschedule" && (
                      <div className="bg-red-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-red-800">Rescheduling Required</h4>
                            <p className="text-sm text-red-600">Reason: {notification.reason}</p>
                          </div>
                          <Button 
                            onClick={() => handleReschedule(notification)}
                            size="sm"
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    )}

                    {notification.type === "interview_confirmed" && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-800">Interview Confirmed</h4>
                        <p className="text-sm text-green-600">Scheduled for: {notification.scheduledTime}</p>
                      </div>
                    )}

                    {notification.type === "application_submitted" && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-blue-800">New Application</h4>
                            <p className="text-sm text-blue-600">Match Score: {notification.matchScore}%</p>
                          </div>
                          <Button size="sm" variant="outline">
                            Review Application
                          </Button>
                        </div>
                      </div>
                    )}

                    {notification.type === "interview_completed" && (
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-medium text-purple-800">Assessment Completed</h4>
                        <p className="text-sm text-purple-600">Score: {notification.assessmentScore}%</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-4">
                      <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                      {notification.status !== "read" && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {schedulerOpen && selectedNotification && (
          <InterviewScheduler
            isOpen={schedulerOpen}
            onClose={() => {
              setSchedulerOpen(false);
              setSelectedNotification(null);
            }}
            applicantName={selectedNotification.applicantName}
            interviewRound="Rescheduled Interview"
            onSchedule={handleScheduleInterview}
          />
        )}
      </div>
    </MainLayout>
  );
}
