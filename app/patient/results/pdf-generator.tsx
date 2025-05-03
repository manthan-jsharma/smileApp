import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function generatePDF(
  elementId: string,
  filename = "dental-analysis-report.pdf"
): Promise<Blob> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Element not found");
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    // Calculate dimensions to maintain aspect ratio
    const imgWidth = 210; // A4 width in mm (210mm)
    const pageHeight = 297; // A4 height in mm (297mm)
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF instance
    const pdf = new jsPDF("p", "mm", "a4");
    let position = 0;

    // Add image to PDF (first page)
    pdf.addImage(
      canvas.toDataURL("image/jpeg", 1.0),
      "JPEG",
      0,
      position,
      imgWidth,
      imgHeight
    );

    // If content spans multiple pages
    let heightLeft = imgHeight - pageHeight;
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL("image/jpeg", 1.0),
        "JPEG",
        0,
        position,
        imgWidth,
        imgHeight
      );
      heightLeft -= pageHeight;
    }

    // Return as blob for both download and email attachment
    return pdf.output("blob");
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}

export function downloadPDF(
  blob: Blob,
  filename = "dental-analysis-report.pdf"
): void {
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  // Append to the document, click it, and remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up the URL object
  setTimeout(() => URL.revokeObjectURL(url), 100);
}
