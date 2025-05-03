"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Download, FileText, Mail, Printer, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { generatePDF, downloadPDF } from "./pdf-generator";

import { ReportComponent } from "./report-component";

const mockVeneerRecommendations = [
  {
    type: "Porcelain Veneers",
    description:
      "Recommended for your teeth alignment and color. Porcelain veneers offer excellent durability and natural appearance.",
    pros: ["Natural appearance", "Stain-resistant", "Durable (10-15 years)"],
    cons: ["Higher cost", "Requires removal of tooth enamel"],
    estimatedCost: "$950 - $2,500 per tooth",
  },
  {
    type: "Composite Veneers",
    description:
      "An alternative option that requires less tooth preparation but offers less durability.",
    pros: ["Lower cost", "Less invasive", "Can be repaired easily"],
    cons: ["Less durable (5-7 years)", "May stain over time"],
    estimatedCost: "$250 - $1,500 per tooth",
  },
];

const mockDentalCare = {
  routine: [
    "Brush twice daily with a fluoride toothpaste",
    "Floss daily to remove plaque between teeth",
    "Use an antiseptic mouthwash to reduce bacteria",
    "Replace your toothbrush every 3-4 months",
  ],
  products: [
    {
      name: "Sensodyne ProNamel Toothpaste",
      description:
        "Recommended for your enamel strength and sensitivity issues",
    },
    {
      name: "Oral-B Pro 5000 Electric Toothbrush",
      description: "Provides optimal cleaning for your teeth alignment",
    },
    {
      name: "Listerine Total Care Mouthwash",
      description: "Helps with bacterial control and gum health",
    },
  ],
  warnings: [
    "Moderate gum recession detected - gentle brushing recommended",
    "Slight enamel erosion on upper front teeth - avoid acidic foods",
    "Minor plaque buildup between molars - focus on thorough flossing",
  ],
};

const mockTeethAnalysis = {
  alignment: {
    score: 7.2,
    description:
      "Slight misalignment detected in upper incisors. Minor crowding in lower teeth.",
  },
  color: {
    score: 6.8,
    description:
      "Moderate staining detected. Current shade approximately A3 on the VITA scale.",
  },
  width: {
    score: 8.5,
    description:
      "Good proportional width. Slight asymmetry between central incisors.",
  },
  gumHealth: {
    score: 7.0,
    description: "Mild gum recession detected. Some inflammation present.",
  },
  bacterialTendencies: {
    score: 6.5,
    description:
      "Moderate bacterial buildup detected, particularly between molars.",
  },
};

export default function ResultsPage() {
  const router = useRouter();
  const [dentalImages, setDentalImages] = useState<string[]>([]);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [emailFormData, setEmailFormData] = useState({
    doctorEmail: "",
    message:
      "I'd like to discuss my dental analysis results with you. Please see the attached report.",
  });
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedImages = localStorage.getItem("dentalImages");
    if (storedImages) {
      setDentalImages(JSON.parse(storedImages));
    } else if (typeof window !== "undefined") {
      router.push("/patient/analysis");
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const handleEmailFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmailFormData({
      ...emailFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGeneratePdf = async () => {
    setIsGeneratingPdf(true);

    try {
      const blob = await generatePDF(
        "report-preview",
        "dental-analysis-report.pdf"
      );

      setPdfBlob(blob);

      downloadPDF(blob);

      setIsGeneratingPdf(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setIsGeneratingPdf(false);
      alert("There was an error generating the PDF. Please try again.");
    }
  };

  const handleSendEmail = () => {
    if (!pdfBlob) {
      alert("Please generate the report first before sending the email.");
      return;
    }

    // In a real application, you would upload the blob to your server
    // and send it as an attachment via your email service

    // Simulate sending email with attachment
    setTimeout(() => {
      alert(
        `Email with attached report would be sent to: ${emailFormData.doctorEmail}`
      );
    }, 1000);
  };

  if (dentalImages.length === 0) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h3 className="text-lg font-medium">Loading analysis results...</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Please wait while we retrieve your data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Your Smile Analysis Results</h1>
          <p className="text-muted-foreground">
            Analysis completed on {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGeneratePdf}
            disabled={isGeneratingPdf}
          >
            {isGeneratingPdf ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Download Report
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Email to Doctor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Results to Your Doctor</DialogTitle>
                <DialogDescription>
                  Share your dental analysis with a dental professional for
                  consultation.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {!pdfBlob && (
                  <div className="bg-amber-50 text-amber-800 p-3 rounded-md text-sm">
                    <p className="font-medium">No report generated yet</p>
                    <p>
                      Please generate a report first to attach it to this email.
                    </p>
                  </div>
                )}
                {pdfBlob && (
                  <div className="bg-green-50 text-green-800 p-3 rounded-md text-sm flex items-center justify-between">
                    <div>
                      <p className="font-medium">Report ready to attach</p>
                      <p>
                        dental-analysis-report.pdf (
                        {Math.round(pdfBlob.size / 1024)} KB)
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleGeneratePdf}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="doctorEmail">Doctor's Email</Label>
                  <Input
                    id="doctorEmail"
                    name="doctorEmail"
                    placeholder="doctor@example.com"
                    value={emailFormData.doctorEmail}
                    onChange={handleEmailFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={emailFormData.message}
                    onChange={handleEmailFormChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSendEmail}>Send Email</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Overall Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="relative h-32 w-32">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold">7.2</span>
                </div>
                <svg
                  className="h-32 w-32 transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset="79"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">
              Good dental health with room for improvement
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Uploaded Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {dentalImages.map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`Dental image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recommendations" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="dental-care">Dental Care</TabsTrigger>
          <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="preview">Report Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="recommendations" className="space-y-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">Veneer Recommendations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockVeneerRecommendations.map((veneer, index) => (
              <Card key={index} className={index === 0 ? "border-primary" : ""}>
                {index === 0 && (
                  <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                    Recommended Option
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{veneer.type}</CardTitle>
                  <CardDescription>{veneer.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Pros:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {veneer.pros.map((pro, i) => (
                        <li key={i}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Cons:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {veneer.cons.map((con, i) => (
                        <li key={i}>{con}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">Estimated Cost:</h4>
                    <p className="text-sm">{veneer.estimatedCost}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Additional Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Teeth Whitening</h4>
                <p className="text-sm">
                  Professional whitening recommended before veneer placement to
                  achieve optimal results. Current shade: A3 (VITA scale).
                  Recommended target shade: A1.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Orthodontic Consideration</h4>
                <p className="text-sm">
                  Minor alignment issues could be addressed with clear aligners
                  before veneer placement for optimal results. Estimated
                  treatment time: 3-6 months.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="dental-care" className="space-y-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">Personalized Dental Care</h2>

          <Card>
            <CardHeader>
              <CardTitle>Daily Routine</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mockDentalCare.routine.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDentalCare.products.map((product, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {product.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Health Warnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockDentalCare.warnings.map((warning, index) => (
                  <div key={index} className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mr-3 mt-0.5">
                      !
                    </div>
                    <span>{warning}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analysis" className="space-y-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">Detailed Analysis</h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="alignment">
              <AccordionTrigger>
                <div className="flex items-center">
                  <span>Teeth Alignment</span>
                  <span className="ml-auto mr-4 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                    {mockTeethAnalysis.alignment.score}/10
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p>{mockTeethAnalysis.alignment.description}</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Findings</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Slight rotation of upper right lateral incisor</li>
                      <li>Minor crowding in lower anterior teeth</li>
                      <li>Midline shift of approximately 1mm to the right</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Recommendations</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Consider clear aligners for 3-6 months</li>
                      <li>Veneers can mask minor alignment issues</li>
                      <li>Regular retainer use after treatment</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="color">
              <AccordionTrigger>
                <div className="flex items-center">
                  <span>Teeth Color</span>
                  <span className="ml-auto mr-4 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                    {mockTeethAnalysis.color.score}/10
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p>{mockTeethAnalysis.color.description}</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Findings</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Current shade: A3 on VITA scale</li>
                      <li>Moderate staining on upper incisors</li>
                      <li>Uneven coloration across dental arch</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Recommendations</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Professional whitening before veneer placement</li>
                      <li>Target shade: A1 for natural appearance</li>
                      <li>Reduce consumption of staining foods/beverages</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="width">
              <AccordionTrigger>
                <div className="flex items-center">
                  <span>Teeth Width & Proportion</span>
                  <span className="ml-auto mr-4 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                    {mockTeethAnalysis.width.score}/10
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p>{mockTeethAnalysis.width.description}</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Findings</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Good overall width-to-height ratio</li>
                      <li>Slight asymmetry between central incisors</li>
                      <li>Proportional smile line</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Recommendations</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Veneers can correct minor asymmetry</li>
                      <li>Maintain current width proportions</li>
                      <li>Consider golden proportion for optimal aesthetics</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="gum-health">
              <AccordionTrigger>
                <div className="flex items-center">
                  <span>Gum Health</span>
                  <span className="ml-auto mr-4 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                    {mockTeethAnalysis.gumHealth.score}/10
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p>{mockTeethAnalysis.gumHealth.description}</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Findings</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Mild gum recession on upper canines</li>
                      <li>Some inflammation in posterior regions</li>
                      <li>Healthy gingival contours overall</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Recommendations</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Use soft-bristled toothbrush</li>
                      <li>Consider anti-inflammatory mouthwash</li>
                      <li>Professional cleaning recommended</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="bacterial">
              <AccordionTrigger>
                <div className="flex items-center">
                  <span>Bacterial Tendencies</span>
                  <span className="ml-auto mr-4 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                    {mockTeethAnalysis.bacterialTendencies.score}/10
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p>{mockTeethAnalysis.bacterialTendencies.description}</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Findings</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Moderate plaque buildup between molars</li>
                      <li>Early signs of calculus formation</li>
                      <li>Potential for cavity development if untreated</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Recommendations</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Improve interdental cleaning with floss</li>
                      <li>Use antibacterial mouthwash daily</li>
                      <li>Professional cleaning every 6 months</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        // Replace the Card in the preview tab with our ReportComponent // Find
        this section in the preview TabsContent:
        <TabsContent value="preview" className="space-y-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Report Preview</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                size="sm"
                onClick={handleGeneratePdf}
                disabled={isGeneratingPdf}
              >
                {isGeneratingPdf ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                ) : (
                  <FileText className="h-4 w-4 mr-2" />
                )}
                Download PDF
              </Button>
            </div>
          </div>

          <ReportComponent
            patientName={user?.name || "John Doe"}
            analysisDate={new Date().toLocaleDateString()}
            overallScore={7.2}
            alignmentScore={mockTeethAnalysis.alignment.score}
            colorScore={mockTeethAnalysis.color.score}
            widthScore={mockTeethAnalysis.width.score}
            gumHealthScore={mockTeethAnalysis.gumHealth.score}
            primaryRecommendation={mockVeneerRecommendations[0]}
            dentalRoutine={mockDentalCare.routine}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
