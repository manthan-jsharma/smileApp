"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  FileText,
  Home,
  LogOut,
  Settings,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.role !== "doctor") {
        router.push("/login?role=doctor");
        return;
      }
      setUser(userData);
    } else {
      router.push("/login?role=doctor");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  if (!mounted || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-primary/20 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-primary/20 rounded mb-2"></div>
          <div className="h-3 w-32 bg-primary/10 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar>
          <SidebarHeader className="border-b border-border">
            <div className="flex items-center gap-2 px-4 py-2">
              <User className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-medium">DentalAI</h3>
                <p className="text-xs text-muted-foreground">Doctor Portal</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/doctor/dashboard">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/doctor/patients">
                    <Users className="h-4 w-4" />
                    <span>Patients</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/doctor/appointments">
                    <Calendar className="h-4 w-4" />
                    <span>Appointments</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/doctor/reports">
                    <FileText className="h-4 w-4" />
                    <span>Reports</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/doctor/profile">
                    <Settings className="h-4 w-4" />
                    <span>Profile Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Dr. {user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <header className="border-b border-border p-4 flex items-center justify-between bg-background/95 backdrop-blur sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Doctor Portal</h1>
            </div>
          </header>
          <main className="p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
