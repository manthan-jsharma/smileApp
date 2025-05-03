"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  Search,
  Star,
  User,
} from "lucide-react";

const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cosmetic Dentistry",
    rating: 4.9,
    reviews: 127,
    location: "New York, NY",
    distance: "2.3 miles",
    availability: "Next available: Tomorrow",
    consultationFee: "$150",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Dr. Johnson specializes in cosmetic dentistry with over 15 years of experience. She is known for her expertise in veneers and smile makeovers.",
    education: ["DDS, Columbia University", "Residency in Prosthodontics, NYU"],
    services: [
      "Veneers",
      "Teeth Whitening",
      "Smile Makeovers",
      "Dental Implants",
    ],
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Orthodontics",
    rating: 4.7,
    reviews: 98,
    location: "San Francisco, CA",
    distance: "3.5 miles",
    availability: "Next available: Friday",
    consultationFee: "$125",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Dr. Chen is a board-certified orthodontist specializing in clear aligners and traditional braces for patients of all ages.",
    education: ["DMD, Harvard University", "Orthodontic Specialty, UCSF"],
    services: [
      "Invisalign",
      "Traditional Braces",
      "Retainers",
      "Jaw Alignment",
    ],
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "General Dentistry",
    rating: 4.8,
    reviews: 156,
    location: "Chicago, IL",
    distance: "1.8 miles",
    availability: "Next available: Today",
    consultationFee: "$100",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Dr. Rodriguez provides comprehensive dental care with a focus on preventive dentistry and patient education.",
    education: [
      "DDS, University of Illinois",
      "General Practice Residency, Rush University",
    ],
    services: ["Cleanings", "Fillings", "Crowns", "Root Canals"],
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Periodontics",
    rating: 4.6,
    reviews: 87,
    location: "Boston, MA",
    distance: "4.2 miles",
    availability: "Next available: Monday",
    consultationFee: "$175",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Dr. Wilson specializes in the treatment of gum disease and placement of dental implants with a focus on minimally invasive techniques.",
    education: [
      "DMD, Tufts University",
      "Periodontal Specialty, Boston University",
    ],
    services: [
      "Gum Disease Treatment",
      "Dental Implants",
      "Gum Grafting",
      "Bone Regeneration",
    ],
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    specialty: "Endodontics",
    rating: 4.8,
    reviews: 112,
    location: "Seattle, WA",
    distance: "2.7 miles",
    availability: "Next available: Wednesday",
    consultationFee: "$160",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Dr. Thompson is an endodontist specializing in root canal therapy and treatment of dental trauma with a gentle approach.",
    education: [
      "DDS, University of Washington",
      "Endodontic Specialty, Oregon Health Sciences University",
    ],
    services: [
      "Root Canal Therapy",
      "Endodontic Retreatment",
      "Apicoectomy",
      "Dental Trauma",
    ],
  },
  {
    id: 6,
    name: "Dr. Robert Kim",
    specialty: "Prosthodontics",
    rating: 4.9,
    reviews: 94,
    location: "Los Angeles, CA",
    distance: "3.1 miles",
    availability: "Next available: Thursday",
    consultationFee: "$180",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Dr. Kim specializes in complex dental restorations and full mouth rehabilitation with a focus on aesthetics and function.",
    education: ["DDS, UCLA", "Prosthodontic Specialty, USC"],
    services: ["Crowns", "Bridges", "Dentures", "Full Mouth Reconstruction"],
  },
];

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null
  );
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

  // Filter doctors based on search term and specialty
  const filteredDoctors = mockDoctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty = selectedSpecialty
      ? doctor.specialty === selectedSpecialty
      : true;

    return matchesSearch && matchesSpecialty;
  });

  // Get unique specialties for filter
  const specialties = Array.from(
    new Set(mockDoctors.map((doctor) => doctor.specialty))
  );

  return (
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Find a Dentist</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, specialty, or location"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedSpecialty === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedSpecialty(null)}
          >
            All
          </Button>
          {specialties.map((specialty) => (
            <Button
              key={specialty}
              variant={selectedSpecialty === specialty ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSpecialty(specialty)}
            >
              {specialty}
            </Button>
          ))}
        </div>
      </div>

      {filteredDoctors.length === 0 ? (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No doctors found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find more results.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="p-6 flex flex-col md:flex-row items-center md:items-start gap-4 flex-1">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={doctor.image} alt={doctor.name} />
                    <AvatarFallback>
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold">{doctor.name}</h3>
                    <p className="text-muted-foreground">{doctor.specialty}</p>
                    <div className="flex items-center justify-center md:justify-start mt-2 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 font-medium">
                          {doctor.rating}
                        </span>
                      </div>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        {doctor.reviews} reviews
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-sm">
                      <div className="flex items-center justify-center md:justify-start">
                        <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{doctor.location}</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{doctor.availability}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t md:border-t-0 md:border-l flex flex-col justify-between items-center bg-muted/20">
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground mb-1">
                      Consultation Fee
                    </p>
                    <p className="text-xl font-bold">
                      {doctor.consultationFee}
                    </p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedDoctor(doctor)}>
                        View Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Doctor Profile</DialogTitle>
                        <DialogDescription>
                          View detailed information about this doctor
                        </DialogDescription>
                      </DialogHeader>
                      {selectedDoctor && (
                        <div className="mt-4">
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex flex-col items-center">
                              <Avatar className="h-32 w-32">
                                <AvatarImage
                                  src={selectedDoctor.image}
                                  alt={selectedDoctor.name}
                                />
                                <AvatarFallback>
                                  {selectedDoctor.name
                                    .split(" ")
                                    .map((n: string) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <h3 className="text-xl font-bold mt-4">
                                {selectedDoctor.name}
                              </h3>
                              <p className="text-muted-foreground">
                                {selectedDoctor.specialty}
                              </p>
                              <div className="flex items-center mt-2">
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                <span className="ml-1 font-medium">
                                  {selectedDoctor.rating}
                                </span>
                                <span className="ml-1 text-sm text-muted-foreground">
                                  ({selectedDoctor.reviews} reviews)
                                </span>
                              </div>
                              <div className="flex items-center mt-2">
                                <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span>{selectedDoctor.location}</span>
                              </div>
                              <div className="mt-4 space-y-2">
                                <Button variant="outline" className="w-full">
                                  <Phone className="h-4 w-4 mr-2" />
                                  Contact
                                </Button>
                                <Button variant="outline" className="w-full">
                                  <Mail className="h-4 w-4 mr-2" />
                                  Message
                                </Button>
                              </div>
                            </div>
                            <div className="flex-1">
                              <Tabs defaultValue="about">
                                <TabsList className="w-full">
                                  <TabsTrigger value="about" className="flex-1">
                                    About
                                  </TabsTrigger>
                                  <TabsTrigger
                                    value="services"
                                    className="flex-1"
                                  >
                                    Services
                                  </TabsTrigger>
                                  <TabsTrigger
                                    value="reviews"
                                    className="flex-1"
                                  >
                                    Reviews
                                  </TabsTrigger>
                                </TabsList>
                                <TabsContent
                                  value="about"
                                  className="space-y-4 mt-4"
                                >
                                  <div>
                                    <h4 className="font-medium mb-2">
                                      Biography
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedDoctor.bio}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">
                                      Education
                                    </h4>
                                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                                      {selectedDoctor.education.map(
                                        (edu: string, index: number) => (
                                          <li key={index}>{edu}</li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">
                                      Availability
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedDoctor.availability}
                                    </p>
                                    <div className="grid grid-cols-7 gap-2 mt-2">
                                      {[
                                        "Mon",
                                        "Tue",
                                        "Wed",
                                        "Thu",
                                        "Fri",
                                        "Sat",
                                        "Sun",
                                      ].map((day, index) => (
                                        <div
                                          key={index}
                                          className={`text-center p-2 rounded-md ${
                                            index < 5
                                              ? "bg-primary/10"
                                              : "bg-muted"
                                          }`}
                                        >
                                          <p className="text-xs font-medium">
                                            {day}
                                          </p>
                                          <p className="text-xs mt-1">
                                            {index < 5 ? "9-5" : "—"}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </TabsContent>
                                <TabsContent value="services" className="mt-4">
                                  <h4 className="font-medium mb-2">
                                    Services Offered
                                  </h4>
                                  <div className="grid grid-cols-2 gap-2">
                                    {selectedDoctor.services.map(
                                      (service: string, index: number) => (
                                        <div
                                          key={index}
                                          className="flex items-center p-2 border rounded-md"
                                        >
                                          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                                          <span className="text-sm">
                                            {service}
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                  <div className="mt-4">
                                    <h4 className="font-medium mb-2">
                                      Consultation Fee
                                    </h4>
                                    <p className="text-xl font-bold">
                                      {selectedDoctor.consultationFee}
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      Initial consultation, approximately 30
                                      minutes
                                    </p>
                                  </div>
                                </TabsContent>
                                <TabsContent value="reviews" className="mt-4">
                                  <div className="flex items-center justify-between mb-4">
                                    <div>
                                      <h4 className="font-medium">
                                        Patient Reviews
                                      </h4>
                                      <p className="text-sm text-muted-foreground">
                                        {selectedDoctor.reviews} verified
                                        reviews
                                      </p>
                                    </div>
                                    <div className="flex items-center">
                                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                      <span className="ml-1 font-bold text-lg">
                                        {selectedDoctor.rating}
                                      </span>
                                      <span className="text-sm text-muted-foreground ml-1">
                                        / 5
                                      </span>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    {/* Mock reviews */}
                                    {[1, 2, 3].map((_, index) => (
                                      <div
                                        key={index}
                                        className="border rounded-lg p-4"
                                      >
                                        <div className="flex justify-between mb-2">
                                          <div className="flex items-center">
                                            <Avatar className="h-8 w-8 mr-2">
                                              <AvatarFallback>
                                                {["JD", "SM", "AK"][index]}
                                              </AvatarFallback>
                                            </Avatar>
                                            <div>
                                              <p className="font-medium text-sm">
                                                {
                                                  [
                                                    "Jane D.",
                                                    "Sam M.",
                                                    "Alex K.",
                                                  ][index]
                                                }
                                              </p>
                                              <p className="text-xs text-muted-foreground">
                                                {
                                                  [
                                                    "2 weeks ago",
                                                    "1 month ago",
                                                    "3 months ago",
                                                  ][index]
                                                }
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex">
                                            {Array(5)
                                              .fill(0)
                                              .map((_, i) => (
                                                <Star
                                                  key={i}
                                                  className={`h-4 w-4 ${
                                                    i < [5, 4, 5][index]
                                                      ? "text-yellow-500 fill-yellow-500"
                                                      : "text-muted"
                                                  }`}
                                                />
                                              ))}
                                          </div>
                                        </div>
                                        <p className="text-sm">
                                          {
                                            [
                                              "Dr. Johnson was extremely professional and made me feel comfortable throughout my veneer consultation. She explained all my options clearly and answered all my questions.",
                                              "Great experience with this doctor. Very knowledgeable and took the time to explain the procedure in detail. Would recommend to anyone looking for quality dental care.",
                                              "Excellent service and care. The doctor was thorough in the examination and provided detailed recommendations for my dental issues.",
                                            ][index]
                                          }
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </div>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button>Book Appointment</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
