
import { useState } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Calendar, CheckCircle, Clock, XCircle, Video } from "lucide-react";
import { toast } from "sonner";

// Mock notification data
const mockNotifications = [
  {
    id: "1",
    type: "interview_scheduled",
    title: "Interview Scheduled",
    message: "Your initial screening interview for Senior Frontend Developer at TechCorp has been scheduled",
    date: "2025-06-05",
    time: "10:00 AM",
    company: "TechCorp",
    position: "Senior Frontend Developer",
    status: "pending",
    meetingLink: "https://meet.google.com/abc-def-ghi",
    interviewer: "HR Team",
    venue: "Conference Room A"
  },
  {
    id: "2",
    type: "application_approved",
    title: "Application Approved",
    message: "Congratulations! Your application for Backend Engineer at InnovateLabs has been approved",
    company: "InnovateLabs",
    position: "Backend Engineer",
    status: "approved",
    timestamp: "2 hours ago"
  },
  {
    id: "3",
    type: "interview_request",
    title: "Interview Request",
    message: "TechCorp would like to schedule a technical assessment for the Senior Frontend Developer position",
    company: "TechCorp",
    position: "Senior Frontend Developer",
    status: "pending_response",
    proposedDates: ["2025-06-06 2:00 PM", "2025-06-07 10:00 AM", "2025-06-08 3:00 PM"]
  },
  {
    id: "4",
    type: "application_rejected",
    title: "Application Update",
    message: "Thank you for your interest in the Data Scientist position at DataFlow Inc. We have decided to move forward with other candidates",
    company: "DataFlow Inc",
    position: "Data Scientist",
    status: "rejected",
    timestamp: "1 day ago"
  }
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState("all");

  const handleAcceptInterview = (notificationId: string, proposedDate: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId 
        ? { ...notif, status: "accepted", selectedDate: proposedDate }
        : notif
    ));
    toast.success("Interview time confirmed!");
  };

  const handleDeclineInterview = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId 
        ? { ...notif, status: "declined" }
        : notif
    ));
    toast.success("Interview declined. HR will be notified to reschedule.");
  };

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "interviews":
        return notifications.filter(n => n.type.includes("interview"));
      case "applications":
        return notifications.filter(n => n.type.includes("application"));
      default:
        return notifications;
    }
  };

  const getNotificationIcon = (type: string, status: string) => {
    switch (type) {
      case "interview_scheduled":
      case "interview_request":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case "application_approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "application_rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pending", class: "bg-yellow-100 text-yellow-800" },
      approved: { label: "Approved", class: "bg-green-100 text-green-800" },
      rejected: { label: "Rejected", class: "bg-red-100 text-red-800" },
      accepted: { label: "Accepted", class: "bg-blue-100 text-blue-800" },
      declined: { label: "Declined", class: "bg-gray-100 text-gray-800" },
      pending_response: { label: "Response Required", class: "bg-orange-100 text-orange-800" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.class}>{config.label}</Badge>;
  };

  return (
    <MainLayout userType="applicant">
      <div className="page-container">
        <div className="mb-8">
          <h1 className="mb-2">Notifications</h1>
          <p className="text-muted-foreground">Stay updated on your job applications and interviews</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Notifications</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="space-y-4">
              {getFilteredNotifications().map((notification) => (
                <Card key={notification.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getNotificationIcon(notification.type, notification.status)}
                        <div>
                          <CardTitle className="text-lg">{notification.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {notification.company} • {notification.position}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(notification.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{notification.message}</p>
                    
                    {notification.type === "interview_scheduled" && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Interview Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{notification.date} at {notification.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Interviewer: {notification.interviewer}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Video className="h-4 w-4" />
                            <span>Venue: {notification.venue}</span>
                          </div>
                        </div>
                        {notification.meetingLink && (
                          <Button className="mt-3" size="sm">
                            <Video className="h-4 w-4 mr-2" />
                            Join Meeting
                          </Button>
                        )}
                      </div>
                    )}

                    {notification.type === "interview_request" && notification.status === "pending_response" && (
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Available Time Slots</h4>
                        <div className="space-y-2">
                          {notification.proposedDates?.map((date, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                              <span className="text-sm">{date}</span>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  onClick={() => handleAcceptInterview(notification.id, date)}
                                >
                                  Accept
                                </Button>
                              </div>
                            </div>
                          ))}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeclineInterview(notification.id)}
                            className="w-full mt-2"
                          >
                            None of these times work for me
                          </Button>
                        </div>
                      </div>
                    )}

                    {notification.timestamp && (
                      <p className="text-xs text-muted-foreground mt-4">{notification.timestamp}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
