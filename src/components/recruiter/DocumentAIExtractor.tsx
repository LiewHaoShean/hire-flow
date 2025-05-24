
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, FileText, Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface DocumentAIExtractorProps {
  form: UseFormReturn<any>;
  setSkills: (skills: Array<{ name: string; level: "beginner" | "intermediate" | "expert" }>) => void;
}

export default function DocumentAIExtractor({ form, setSkills }: DocumentAIExtractorProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const extractJobDetailsFromText = (text: string) => {
    // Simulate AI extraction - in real implementation, this would call an AI service
    const mockExtraction = {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      employmentType: "full-time",
      salary: "$120,000 - $150,000",
      description: "We are looking for a Senior Software Engineer to join our dynamic team. You will be responsible for developing high-quality software solutions and mentoring junior developers.",
      responsibilities: "• Design and develop scalable web applications\n• Collaborate with cross-functional teams\n• Code review and mentoring\n• Participate in technical discussions and architecture decisions",
      qualifications: "• Bachelor's degree in Computer Science or related field\n• 5+ years of software development experience\n• Strong knowledge of React, Node.js, and TypeScript\n• Experience with cloud platforms (AWS, GCP)",
      benefits: "• Competitive salary and equity\n• Health, dental, and vision insurance\n• Flexible work arrangements\n• Professional development opportunities"
    };

    const mockSkills = [
      { name: "React", level: "expert" as const },
      { name: "TypeScript", level: "intermediate" as const },
      { name: "Node.js", level: "expert" as const },
      { name: "AWS", level: "intermediate" as const }
    ];

    return { extraction: mockExtraction, skills: mockSkills };
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('pdf') && !file.type.includes('document') && !file.type.includes('text')) {
      toast.error("Please upload a PDF, DOC, DOCX, or TXT file");
      return;
    }

    setUploadedFile(file);
    setIsProcessing(true);

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate reading file content
      const text = await file.text().catch(() => "Sample job description content");
      
      // Extract job details using AI (mocked)
      const { extraction, skills } = extractJobDetailsFromText(text);
      
      // Auto-fill form fields
      form.setValue("title", extraction.title);
      form.setValue("department", extraction.department);
      form.setValue("location", extraction.location);
      form.setValue("employmentType", extraction.employmentType);
      form.setValue("salary", extraction.salary);
      form.setValue("description", extraction.description);
      form.setValue("responsibilities", extraction.responsibilities);
      form.setValue("qualifications", extraction.qualifications);
      form.setValue("benefits", extraction.benefits);
      
      // Set skills
      setSkills(skills);
      
      toast.success("Job details extracted and filled successfully!");
    } catch (error) {
      console.error("Error processing document:", error);
      toast.error("Failed to process document. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleFileUpload}
        className="hidden"
        id="document-ai-upload"
        disabled={isProcessing}
      />
      <label htmlFor="document-ai-upload">
        <Button
          type="button"
          variant="outline"
          className="gap-2"
          disabled={isProcessing}
          asChild
        >
          <div className="cursor-pointer">
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload Document
              </>
            )}
          </div>
        </Button>
      </label>
      
      {uploadedFile && (
        <div className="absolute top-full mt-2 right-0 bg-white border rounded-lg p-2 shadow-lg min-w-[200px] z-10">
          <div className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4 text-blue-500" />
            <span className="truncate">{uploadedFile.name}</span>
          </div>
        </div>
      )}
    </div>
  );
}
