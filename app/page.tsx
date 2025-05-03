import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Smile, User, UserCog } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <Smile className="h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            SmileAI Analysis
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Advanced AI-powered Smile and Teeth analysis for personalized veneer
            recommendations and dental care routines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Patient Portal
              </CardTitle>
              <CardDescription>
                Upload your smile photos and get personalized dental
                recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Veneer style recommendations</li>
                  <li>Personalized dental care routine</li>
                  <li>Product recommendations</li>
                  <li>Comprehensive dental analysis</li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/login?role=patient">
                    Continue as Patient <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCog className="h-5 w-5" />
                Doctor Portal
              </CardTitle>
              <CardDescription>
                Access patient analyses and manage your professional profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>View patient analyses</li>
                  <li>Manage consultation fees</li>
                  <li>Update professional profile</li>
                  <li>Connect with patients</li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/login?role=doctor">
                    Continue as Doctor <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
