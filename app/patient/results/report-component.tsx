import { Card, CardContent } from "@/components/ui/card";
import { Smile } from "lucide-react";

interface ReportProps {
  patientName: string;
  patientId: string;
  analysisDate: string;
  overallScore: number;
  alignmentScore: number;
  colorScore: number;
  widthScore: number;
  gumHealthScore: number;
  primaryRecommendation: {
    type: string;
    description: string;
    pros: string[];
    estimatedCost: string;
  };
  dentalRoutine: string[];
}

export function ReportComponent({
  patientName = "John Doe",
  patientId = `PAT-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`,
  analysisDate = new Date().toLocaleDateString(),
  overallScore = 7.2,
  alignmentScore = 7.2,
  colorScore = 6.8,
  widthScore = 8.5,
  gumHealthScore = 7.0,
  primaryRecommendation = {
    type: "Porcelain Veneers",
    description:
      "Recommended for your teeth alignment and color. Porcelain veneers offer excellent durability and natural appearance.",
    pros: ["Natural appearance", "Stain-resistant", "Durable (10-15 years)"],
    estimatedCost: "$950 - $2,500 per tooth",
  },
  dentalRoutine = [
    "Brush twice daily with a fluoride toothpaste",
    "Floss daily to remove plaque between teeth",
    "Use an antiseptic mouthwash to reduce bacteria",
    "Replace your toothbrush every 3-4 months",
  ],
}: Partial<ReportProps>) {
  return (
    <Card
      className="border-2 print:border-0 print:shadow-none"
      id="report-preview"
    >
      <CardContent className="p-6">
        <div className="border-b pb-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Dental Analysis Report</h3>
              <p className="text-sm text-muted-foreground">
                Generated on {analysisDate}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Smile className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">DentalAI</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium mb-2">Patient Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p>{patientName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ID</p>
                <p>{patientId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Analysis Date</p>
                <p>{analysisDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Score</p>
                <p>{overallScore}/10</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-lg font-medium mb-2">Analysis Summary</h4>
            <p className="text-sm mb-4">
              Based on the AI analysis of your dental images, we have identified
              several key aspects of your dental health and appearance. The
              following summary provides an overview of our findings and
              recommendations.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border rounded-lg p-3">
                <h5 className="font-medium mb-1">Teeth Alignment</h5>
                <div className="flex items-center">
                  <div className="w-full bg-muted rounded-full h-2 mr-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${alignmentScore * 10}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{alignmentScore}</span>
                </div>
              </div>
              <div className="border rounded-lg p-3">
                <h5 className="font-medium mb-1">Teeth Color</h5>
                <div className="flex items-center">
                  <div className="w-full bg-muted rounded-full h-2 mr-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${colorScore * 10}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{colorScore}</span>
                </div>
              </div>
              <div className="border rounded-lg p-3">
                <h5 className="font-medium mb-1">Width & Proportion</h5>
                <div className="flex items-center">
                  <div className="w-full bg-muted rounded-full h-2 mr-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${widthScore * 10}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{widthScore}</span>
                </div>
              </div>
              <div className="border rounded-lg p-3">
                <h5 className="font-medium mb-1">Gum Health</h5>
                <div className="flex items-center">
                  <div className="w-full bg-muted rounded-full h-2 mr-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${gumHealthScore * 10}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{gumHealthScore}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-lg font-medium mb-2">Primary Recommendation</h4>
            <div className="border rounded-lg p-4">
              <h5 className="font-medium">{primaryRecommendation.type}</h5>
              <p className="text-sm mt-1 mb-2">
                {primaryRecommendation.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h6 className="text-sm font-medium mb-1">Pros</h6>
                  <ul className="list-disc list-inside text-xs space-y-1">
                    {primaryRecommendation.pros.map((pro, i) => (
                      <li key={i}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h6 className="text-sm font-medium mb-1">Estimated Cost</h6>
                  <p className="text-xs">
                    {primaryRecommendation.estimatedCost}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-lg font-medium mb-2">Dental Care Routine</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {dentalRoutine.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="border-t pt-4 text-center text-sm text-muted-foreground">
            <p>This report was generated by SmileAI Analysis System.</p>
            <p>
              For professional dental advice, please consult with a qualified
              dentist.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
