"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Save, Upload } from "lucide-react";

export default function DoctorProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    specialty: "Cosmetic Dentistry",
    bio: "Board-certified dentist specializing in cosmetic procedures with over 10 years of experience.",
    education:
      "DDS, University of California\nResidency in Prosthodontics, UCLA",
    location: "Los Angeles, CA",
    phone: "(555) 123-4567",
    consultationFee: "150",
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
    services: [
      { name: "Veneers", price: "950", enabled: true },
      { name: "Teeth Whitening", price: "350", enabled: true },
      { name: "Dental Implants", price: "1800", enabled: true },
      { name: "Smile Makeover", price: "2500", enabled: true },
    ],
  });

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setProfileData((prev) => ({
        ...prev,
        name: userData.name || prev.name,
        email: userData.email || prev.email,
      }));
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvailabilityChange = (day: string, checked: boolean) => {
    setProfileData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: checked,
      },
    }));
  };

  const handleServiceChange = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    setProfileData((prev) => {
      const updatedServices = [...prev.services];
      updatedServices[index] = {
        ...updatedServices[index],
        [field]: value,
      };
      return {
        ...prev,
        services: updatedServices,
      };
    });
  };

  const handleAddService = () => {
    setProfileData((prev) => ({
      ...prev,
      services: [...prev.services, { name: "", price: "", enabled: true }],
    }));
  };

  const handleRemoveService = (index: number) => {
    setProfileData((prev) => {
      const updatedServices = [...prev.services];
      updatedServices.splice(index, 1);
      return {
        ...prev,
        services: updatedServices,
      };
    });
  };

  const handleSaveProfile = () => {
    setIsSaving(true);

    // Simulate saving profile
    setTimeout(() => {
      // Update user in localStorage
      if (user) {
        const updatedUser = {
          ...user,
          name: profileData.name,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      setIsSaving(false);
      alert("Profile saved successfully!");
    }, 1500);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h3 className="text-lg font-medium">Loading profile...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and profile picture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage
                      src="/placeholder.svg?height=128&width=128"
                      alt={profileData.name}
                    />
                    <AvatarFallback>
                      {profileData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={profileData.location}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      value={profileData.bio}
                      onChange={handleInputChange}
                    />
                    <p className="text-sm text-muted-foreground">
                      Brief description that will be displayed on your public
                      profile
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveProfile} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="professional">
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>
                Update your professional details and qualifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select
                    value={profileData.specialty}
                    onValueChange={(value) =>
                      handleSelectChange("specialty", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cosmetic Dentistry">
                        Cosmetic Dentistry
                      </SelectItem>
                      <SelectItem value="Orthodontics">Orthodontics</SelectItem>
                      <SelectItem value="Periodontics">Periodontics</SelectItem>
                      <SelectItem value="Endodontics">Endodontics</SelectItem>
                      <SelectItem value="Prosthodontics">
                        Prosthodontics
                      </SelectItem>
                      <SelectItem value="General Dentistry">
                        General Dentistry
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consultationFee">Consultation Fee ($)</Label>
                  <Input
                    id="consultationFee"
                    name="consultationFee"
                    type="number"
                    value={profileData.consultationFee}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="education">Education & Qualifications</Label>
                <Textarea
                  id="education"
                  name="education"
                  rows={4}
                  value={profileData.education}
                  onChange={handleInputChange}
                />
                <p className="text-sm text-muted-foreground">
                  Enter each qualification on a new line
                </p>
              </div>
              <div className="space-y-2">
                <Label>Certifications</Label>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Upload Certifications</h4>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    No certifications uploaded yet. Upload your professional
                    certifications to enhance your profile.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveProfile} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Services Offered</CardTitle>
              <CardDescription>
                Manage the services you offer and their pricing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {profileData.services.map((service, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Service #{index + 1}</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveService(index)}
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`service-name-${index}`}>
                          Service Name
                        </Label>
                        <Input
                          id={`service-name-${index}`}
                          value={service.name}
                          onChange={(e) =>
                            handleServiceChange(index, "name", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`service-price-${index}`}>
                          Price ($)
                        </Label>
                        <Input
                          id={`service-price-${index}`}
                          type="number"
                          value={service.price}
                          onChange={(e) =>
                            handleServiceChange(index, "price", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2 flex items-end">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`service-enabled-${index}`}
                            checked={service.enabled as boolean}
                            onCheckedChange={(checked) =>
                              handleServiceChange(index, "enabled", checked)
                            }
                          />
                          <Label htmlFor={`service-enabled-${index}`}>
                            Active
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={handleAddService}>
                  Add Service
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveProfile} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle>Availability Schedule</CardTitle>
              <CardDescription>
                Set your working hours and availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Working Days</h4>
                    <div className="space-y-2">
                      {Object.entries(profileData.availability).map(
                        ([day, enabled]) => (
                          <div
                            key={day}
                            className="flex items-center justify-between border rounded-md p-3"
                          >
                            <Label
                              htmlFor={`day-${day}`}
                              className="capitalize"
                            >
                              {day}
                            </Label>
                            <Switch
                              id={`day-${day}`}
                              checked={enabled as boolean}
                              onCheckedChange={(checked) =>
                                handleAvailabilityChange(day, checked)
                              }
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Working Hours</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Time</Label>
                          <Select defaultValue="09:00">
                            <SelectTrigger>
                              <SelectValue placeholder="Start time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="08:00">8:00 AM</SelectItem>
                              <SelectItem value="09:00">9:00 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>End Time</Label>
                          <Select defaultValue="17:00">
                            <SelectTrigger>
                              <SelectValue placeholder="End time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="16:00">4:00 PM</SelectItem>
                              <SelectItem value="17:00">5:00 PM</SelectItem>
                              <SelectItem value="18:00">6:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Appointment Duration</Label>
                        <Select defaultValue="30">
                          <SelectTrigger>
                            <SelectValue placeholder="Duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                            <SelectItem value="60">60 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Break Time</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <Select defaultValue="12:00">
                            <SelectTrigger>
                              <SelectValue placeholder="Start time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12:00">12:00 PM</SelectItem>
                              <SelectItem value="13:00">1:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select defaultValue="13:00">
                            <SelectTrigger>
                              <SelectValue placeholder="End time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="13:00">1:00 PM</SelectItem>
                              <SelectItem value="14:00">2:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4 bg-muted/20">
                  <h4 className="font-medium mb-2">Time Off & Vacation</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Set your upcoming time off or vacation days
                  </p>
                  <Button variant="outline">Schedule Time Off</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveProfile} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
