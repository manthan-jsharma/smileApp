"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, DollarSign, FileText, Users } from "lucide-react";

// Mock data for the dashboard
const mockStats = {
  patients: 48,
  appointments: 12,
  revenue: 2850,
  reports: 36,
};

const mockAppointments = [
  {
    id: 1,
    patientName: "John Smith",
    time: "9:00 AM",
    date: "Today",
    type: "Consultation",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    patientName: "Emily Johnson",
    time: "11:30 AM",
    date: "Today",
    type: "Follow-up",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    patientName: "Michael Brown",
    time: "2:15 PM",
    date: "Today",
    type: "Veneer Consultation",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    patientName: "Sarah Davis",
    time: "10:00 AM",
    date: "Tomorrow",
    type: "Initial Consultation",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    patientName: "Robert Wilson",
    time: "3:45 PM",
    date: "Tomorrow",
    type: "Follow-up",
    image: "/placeholder.svg?height=40&width=40",
  },
];

const mockRecentPatients = [
  {
    id: 1,
    name: "Jennifer Lee",
    date: "Yesterday",
    status: "Veneer Recommendation",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "David Miller",
    date: "2 days ago",
    status: "Awaiting Consultation",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Lisa Garcia",
    date: "3 days ago",
    status: "Report Generated",
    image: "/placeholder.svg?height=40&width=40",
  },
];

export default function DoctorDashboard() {
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }

    // Format current time
    const now = new Date();
    setCurrentTime(
      now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{greeting}, Doctor</h1>
          <p className="text-muted-foreground">{currentTime}</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Patients</CardDescription>
            <CardTitle className="text-3xl">{mockStats.patients}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              <span>+4 this week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Upcoming Appointments</CardDescription>
            <CardTitle className="text-3xl">{mockStats.appointments}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Next: Today at 9:00 AM</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Monthly Revenue</CardDescription>
            <CardTitle className="text-3xl">${mockStats.revenue}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-1" />
              <span>+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Analysis Reports</CardDescription>
            <CardTitle className="text-3xl">{mockStats.reports}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <FileText className="h-4 w-4 mr-1" />
              <span>8 pending reviews</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>
              You have {mockAppointments.length} appointments scheduled
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="today">
              <TabsList className="mb-4">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
              </TabsList>

              <TabsContent value="today" className="space-y-4">
                {mockAppointments
                  .filter((appointment) => appointment.date === "Today")
                  .map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage
                            src={appointment.image}
                            alt={appointment.patientName}
                          />
                          <AvatarFallback>
                            {appointment.patientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">
                            {appointment.patientName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {appointment.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center text-sm">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{appointment.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {appointment.date}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="tomorrow" className="space-y-4">
                {mockAppointments
                  .filter((appointment) => appointment.date === "Tomorrow")
                  .map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage
                            src={appointment.image}
                            alt={appointment.patientName}
                          />
                          <AvatarFallback>
                            {appointment.patientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">
                            {appointment.patientName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {appointment.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center text-sm">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{appointment.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {appointment.date}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="week" className="space-y-4">
                {mockAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={appointment.image}
                          alt={appointment.patientName}
                        />
                        <AvatarFallback>
                          {appointment.patientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">
                          {appointment.patientName}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {appointment.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center text-sm">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{appointment.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {appointment.date}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
            <CardDescription>Latest patient activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockRecentPatients.map((patient) => (
                <div key={patient.id} className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={patient.image} alt={patient.name} />
                    <AvatarFallback>
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{patient.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {patient.status}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {patient.date}
                      </p>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button size="sm">View Report</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Completion</CardTitle>
            <CardDescription>
              Complete your profile to improve visibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">
                    Profile Information
                  </span>
                  <span className="text-sm text-muted-foreground">80%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Services Listed</span>
                  <span className="text-sm text-muted-foreground">60%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">
                    Availability Schedule
                  </span>
                  <span className="text-sm text-muted-foreground">100%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Complete Your Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center"
              >
                <Users className="h-5 w-5 mb-2" />
                <span>Add Patient</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center"
              >
                <Calendar className="h-5 w-5 mb-2" />
                <span>Schedule</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center"
              >
                <FileText className="h-5 w-5 mb-2" />
                <span>View Reports</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center"
              >
                <DollarSign className="h-5 w-5 mb-2" />
                <span>Billing</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
