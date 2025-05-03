"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "patient";
  const [activeTab, setActiveTab] = useState<string>("login");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      if (userData.role === "patient") {
        router.push("/patient/analysis");
      } else {
        router.push("/doctor/dashboard");
      }
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      // For demo purposes, just store in localStorage
      const user = {
        id: Math.random().toString(36).substring(2, 9),
        email: formData.email,
        role: role,
        name: formData.email.split("@")[0],
      };
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      if (role === "patient") {
        router.push("/patient/analysis");
      } else {
        router.push("/doctor/dashboard");
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      // For demo purposes, just store in localStorage
      const user = {
        id: Math.random().toString(36).substring(2, 9),
        email: formData.email,
        role: role,
        name: formData.name || formData.email.split("@")[0],
      };
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      if (role === "patient") {
        router.push("/patient/analysis");
      } else {
        router.push("/doctor/dashboard");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="flex items-center text-muted-foreground mb-4 hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>
              {role === "patient" ? "Patient" : "Doctor"} Portal
            </CardTitle>
            <CardDescription>
              {role === "patient"
                ? "Access your dental analysis and recommendations"
                : "Manage your professional profile and patient records"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="login"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <Input
                        id="reg-email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Password</Label>
                      <Input
                        id="reg-password"
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </>
                      ) : (
                        "Register"
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              {activeTab === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                className="text-primary hover:underline"
                onClick={() =>
                  setActiveTab(activeTab === "login" ? "register" : "login")
                }
              >
                {activeTab === "login" ? "Register" : "Login"}
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
