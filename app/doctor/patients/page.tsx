"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  FileText,
  Filter,
  Search,
  User,
  UserPlus,
} from "lucide-react";

// Mock data for patients
const mockPatients = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    age: 34,
    lastVisit: "2 days ago",
    nextAppointment: "Tomorrow, 10:00 AM",
    status: "Active",
    reports: 3,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    age: 28,
    lastVisit: "1 week ago",
    nextAppointment: "Next Monday, 2:15 PM",
    status: "Active",
    reports: 2,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    age: 45,
    lastVisit: "3 weeks ago",
    nextAppointment: "Not scheduled",
    status: "Inactive",
    reports: 1,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    age: 31,
    lastVisit: "Yesterday",
    nextAppointment: "Friday, 11:30 AM",
    status: "Active",
    reports: 4,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    age: 52,
    lastVisit: "1 month ago",
    nextAppointment: "Not scheduled",
    status: "Inactive",
    reports: 2,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    age: 29,
    lastVisit: "4 days ago",
    nextAppointment: "Next Wednesday, 9:00 AM",
    status: "Active",
    reports: 1,
    image: "/placeholder.svg?height=40&width=40",
  },
];

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  // Filter patients based on search term and status
  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? patient.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold">Patients</h1>
        <div className="mt-4 md:mt-0">
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add New Patient
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search patients by name or email"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(null)}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "Active" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("Active")}
          >
            Active
          </Button>
          <Button
            variant={statusFilter === "Inactive" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("Inactive")}
          >
            Inactive
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient List</CardTitle>
          <CardDescription>
            Manage your patients and their dental records
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPatients.length === 0 ? (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No patients found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find more results.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Patient</th>
                    <th className="text-left py-3 px-4 font-medium">Age</th>
                    <th className="text-left py-3 px-4 font-medium">
                      Last Visit
                    </th>
                    <th className="text-left py-3 px-4 font-medium">
                      Next Appointment
                    </th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Reports</th>
                    <th className="text-right py-3 px-4 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={patient.image}
                              alt={patient.name}
                            />
                            <AvatarFallback>
                              {patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {patient.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{patient.age}</td>
                      <td className="py-3 px-4">{patient.lastVisit}</td>
                      <td className="py-3 px-4">{patient.nextAppointment}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            patient.status === "Active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {patient.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{patient.reports}</td>
                      <td className="py-3 px-4 text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedPatient(patient)}
                            >
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Patient Details</DialogTitle>
                              <DialogDescription>
                                View detailed information about this patient
                              </DialogDescription>
                            </DialogHeader>
                            {selectedPatient && (
                              <div className="mt-4">
                                <div className="flex flex-col md:flex-row gap-6">
                                  <div className="flex flex-col items-center">
                                    <Avatar className="h-32 w-32">
                                      <AvatarImage
                                        src={selectedPatient.image}
                                        alt={selectedPatient.name}
                                      />
                                      <AvatarFallback>
                                        {selectedPatient.name
                                          .split(" ")
                                          .map((n: string) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <h3 className="text-xl font-bold mt-4">
                                      {selectedPatient.name}
                                    </h3>
                                    <p className="text-muted-foreground">
                                      {selectedPatient.email}
                                    </p>
                                    <Badge
                                      className="mt-2"
                                      variant={
                                        selectedPatient.status === "Active"
                                          ? "default"
                                          : "secondary"
                                      }
                                    >
                                      {selectedPatient.status}
                                    </Badge>
                                    <div className="mt-4 space-y-2 w-full">
                                      <Button
                                        variant="outline"
                                        className="w-full"
                                      >
                                        <Calendar className="h-4 w-4 mr-2" />
                                        Schedule Appointment
                                      </Button>
                                      <Button
                                        variant="outline"
                                        className="w-full"
                                      >
                                        <FileText className="h-4 w-4 mr-2" />
                                        View Reports
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <Tabs defaultValue="info">
                                      <TabsList className="w-full">
                                        <TabsTrigger
                                          value="info"
                                          className="flex-1"
                                        >
                                          Information
                                        </TabsTrigger>
                                        <TabsTrigger
                                          value="history"
                                          className="flex-1"
                                        >
                                          Dental History
                                        </TabsTrigger>
                                        <TabsTrigger
                                          value="analysis"
                                          className="flex-1"
                                        >
                                          AI Analysis
                                        </TabsTrigger>
                                      </TabsList>
                                      <TabsContent
                                        value="info"
                                        className="space-y-4 mt-4"
                                      >
                                        <div className="grid grid-cols-2 gap-4">
                                          <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">
                                              Age
                                            </p>
                                            <p className="font-medium">
                                              {selectedPatient.age} years
                                            </p>
                                          </div>
                                          <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">
                                              Last Visit
                                            </p>
                                            <p className="font-medium">
                                              {selectedPatient.lastVisit}
                                            </p>
                                          </div>
                                          <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">
                                              Next Appointment
                                            </p>
                                            <p className="font-medium">
                                              {selectedPatient.nextAppointment}
                                            </p>
                                          </div>
                                          <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">
                                              Reports
                                            </p>
                                            <p className="font-medium">
                                              {selectedPatient.reports} reports
                                            </p>
                                          </div>
                                        </div>
                                        <div className="border-t pt-4 mt-4">
                                          <h4 className="font-medium mb-2">
                                            Contact Information
                                          </h4>
                                          <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                              <p className="text-sm text-muted-foreground">
                                                Email
                                              </p>
                                              <p className="font-medium">
                                                {selectedPatient.email}
                                              </p>
                                            </div>
                                            <div className="space-y-1">
                                              <p className="text-sm text-muted-foreground">
                                                Phone
                                              </p>
                                              <p className="font-medium">
                                                (555) 123-4567
                                              </p>
                                            </div>
                                            <div className="space-y-1">
                                              <p className="text-sm text-muted-foreground">
                                                Address
                                              </p>
                                              <p className="font-medium">
                                                123 Main St, Anytown, CA 12345
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </TabsContent>
                                      <TabsContent
                                        value="history"
                                        className="mt-4"
                                      >
                                        <div className="space-y-4">
                                          <div className="border rounded-lg p-4">
                                            <div className="flex justify-between items-start">
                                              <div>
                                                <h4 className="font-medium">
                                                  Initial Consultation
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                  2 weeks ago
                                                </p>
                                              </div>
                                              <Badge>Completed</Badge>
                                            </div>
                                            <p className="text-sm mt-2">
                                              Patient came in for initial smile
                                              analysis. Discussed veneer options
                                              and took dental impressions.
                                            </p>
                                          </div>
                                          <div className="border rounded-lg p-4">
                                            <div className="flex justify-between items-start">
                                              <div>
                                                <h4 className="font-medium">
                                                  Dental Cleaning
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                  1 month ago
                                                </p>
                                              </div>
                                              <Badge>Completed</Badge>
                                            </div>
                                            <p className="text-sm mt-2">
                                              Routine cleaning and examination.
                                              Noted slight gum recession on
                                              upper right canine.
                                            </p>
                                          </div>
                                          <div className="border rounded-lg p-4">
                                            <div className="flex justify-between items-start">
                                              <div>
                                                <h4 className="font-medium">
                                                  X-Ray Examination
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                  3 months ago
                                                </p>
                                              </div>
                                              <Badge>Completed</Badge>
                                            </div>
                                            <p className="text-sm mt-2">
                                              Full mouth X-rays taken. No
                                              significant issues detected.
                                            </p>
                                          </div>
                                        </div>
                                      </TabsContent>
                                      <TabsContent
                                        value="analysis"
                                        className="mt-4"
                                      >
                                        <div className="space-y-4">
                                          <div className="border rounded-lg p-4">
                                            <h4 className="font-medium mb-2">
                                              Latest AI Analysis
                                            </h4>
                                            <p className="text-sm text-muted-foreground mb-4">
                                              Performed 2 days ago
                                            </p>
                                            <div className="grid grid-cols-2 gap-4">
                                              <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">
                                                  Teeth Alignment
                                                </p>
                                                <div className="flex items-center">
                                                  <div className="w-full bg-muted rounded-full h-2 mr-2">
                                                    <div
                                                      className="bg-primary h-2 rounded-full"
                                                      style={{ width: "72%" }}
                                                    ></div>
                                                  </div>
                                                  <span className="text-sm font-medium">
                                                    7.2
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">
                                                  Teeth Color
                                                </p>
                                                <div className="flex items-center">
                                                  <div className="w-full bg-muted rounded-full h-2 mr-2">
                                                    <div
                                                      className="bg-primary h-2 rounded-full"
                                                      style={{ width: "68%" }}
                                                    ></div>
                                                  </div>
                                                  <span className="text-sm font-medium">
                                                    6.8
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">
                                                  Gum Health
                                                </p>
                                                <div className="flex items-center">
                                                  <div className="w-full bg-muted rounded-full h-2 mr-2">
                                                    <div
                                                      className="bg-primary h-2 rounded-full"
                                                      style={{ width: "70%" }}
                                                    ></div>
                                                  </div>
                                                  <span className="text-sm font-medium">
                                                    7.0
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">
                                                  Overall Score
                                                </p>
                                                <div className="flex items-center">
                                                  <div className="w-full bg-muted rounded-full h-2 mr-2">
                                                    <div
                                                      className="bg-primary h-2 rounded-full"
                                                      style={{ width: "73%" }}
                                                    ></div>
                                                  </div>
                                                  <span className="text-sm font-medium">
                                                    7.3
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                            <Button
                                              className="mt-4"
                                              variant="outline"
                                              size="sm"
                                            >
                                              <FileText className="h-4 w-4 mr-2" />
                                              View Full Report
                                            </Button>
                                          </div>
                                          <div className="border rounded-lg p-4">
                                            <h4 className="font-medium mb-2">
                                              Recommended Treatment
                                            </h4>
                                            <div className="space-y-2">
                                              <div className="flex items-start">
                                                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-0.5">
                                                  1
                                                </div>
                                                <span>
                                                  Porcelain Veneers for upper
                                                  front teeth
                                                </span>
                                              </div>
                                              <div className="flex items-start">
                                                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-0.5">
                                                  2
                                                </div>
                                                <span>
                                                  Professional whitening before
                                                  veneer placement
                                                </span>
                                              </div>
                                              <div className="flex items-start">
                                                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-0.5">
                                                  3
                                                </div>
                                                <span>
                                                  Improved gum care routine to
                                                  address recession
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </TabsContent>
                                    </Tabs>
                                  </div>
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <Button>Edit Patient</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
