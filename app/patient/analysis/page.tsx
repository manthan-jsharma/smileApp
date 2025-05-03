"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Camera, FileUp, Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AnalysisPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("upload");
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<HTMLVideoElement>(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);

      // Convert files to data URLs
      const newImages: string[] = [];
      Array.from(e.target.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result as string);
            if (newImages.length === e.target.files!.length) {
              setUploadedImages([...uploadedImages, ...newImages]);
              setIsUploading(false);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const activateWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
        setIsWebcamActive(true);
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const captureImage = () => {
    if (webcamRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = webcamRef.current.videoWidth;
      canvas.height = webcamRef.current.videoHeight;
      const ctx = canvas.getContext("2d");

      if (ctx && webcamRef.current) {
        ctx.drawImage(webcamRef.current, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL("image/png");
        setUploadedImages([...uploadedImages, imageDataUrl]);

        const stream = webcamRef.current.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
        setIsWebcamActive(false);
      }
    }
  };

  const startAnalysis = () => {
    if (uploadedImages.length === 0) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      localStorage.setItem("dentalImages", JSON.stringify(uploadedImages));

      router.push("/patient/results");
    }, 3000);
  };

  const removeImage = (index: number) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Smile Analysis</h1>
      <p className="text-muted-foreground mb-8">
        Upload clear photos of your smile to receive personalized veneer
        recommendations and dental care advice.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Upload Your Smile Photos</CardTitle>
          <CardDescription>
            For the most accurate analysis, please upload a front-facing smile
            photo and a close-up of your teeth.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="upload">Upload Photos</TabsTrigger>
              <TabsTrigger value="camera">Use Camera</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileUp className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Images</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop your photos here or click to browse
                </p>
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Select Files
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                />
              </div>
            </TabsContent>

            <TabsContent value="camera" className="space-y-4">
              <div className="border rounded-lg p-4 text-center">
                {isWebcamActive ? (
                  <div className="space-y-4">
                    <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-lg bg-black">
                      <video
                        ref={webcamRef}
                        autoPlay
                        playsInline
                        className="w-full h-auto"
                      />
                    </div>
                    <Button onClick={captureImage}>
                      <Camera className="h-4 w-4 mr-2" />
                      Capture Photo
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Camera className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Use Your Camera
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Take a photo directly using your device camera
                    </p>
                    <Button onClick={activateWebcam}>
                      <Camera className="h-4 w-4 mr-2" />
                      Start Camera
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {isUploading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Uploading...</span>
            </div>
          )}

          {uploadedImages.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">
                Uploaded Photos ({uploadedImages.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Uploaded image ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <button
                      className="absolute top-2 right-2 bg-background/80 text-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={startAnalysis}
            disabled={uploadedImages.length === 0 || isAnalyzing}
            className="w-full md:w-auto"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Start Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Step 1</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Upload clear photos of your smile from different angles for the
              most accurate analysis.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Step 2</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our AI analyzes your teeth alignment, width, color, and overall
              dental health.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Step 3</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Receive personalized veneer recommendations and a complete dental
              care routine.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
