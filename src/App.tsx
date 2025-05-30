
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ApplicantDashboard from "./pages/applicant/Dashboard";
import ApplicantProfile from "./pages/applicant/Profile";
import JobListings from "./pages/applicant/JobListings";
import JobDetails from "./pages/applicant/JobDetails";
import SkillAssessment from "./pages/applicant/SkillAssessment";
import VideoInterview from "./pages/applicant/VideoInterview";
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import JobPost from "./pages/recruiter/JobPost";
import ApplicantReview from "./pages/recruiter/ApplicantReview";
import RecommendedCandidates from "./pages/recruiter/RecommendedCandidates";
import YourPosts from "./pages/recruiter/YourPosts";
import CompanyProfile from "./pages/recruiter/CompanyProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Applicant Routes */}
          <Route path="/applicant/dashboard" element={<ApplicantDashboard />} />
          <Route path="/applicant/profile" element={<ApplicantProfile />} />
          <Route path="/applicant/jobs" element={<JobListings />} />
          <Route path="/applicant/jobs/:id" element={<JobDetails />} />
          <Route path="/applicant/assessment" element={<SkillAssessment />} />
          <Route path="/applicant/interview" element={<VideoInterview />} />
          
          {/* Recruiter Routes */}
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter/post-job" element={<JobPost />} />
          <Route path="/recruiter/your-posts" element={<YourPosts />} />
          <Route path="/recruiter/company-profile" element={<CompanyProfile />} />
          <Route path="/recruiter/applicants/:id" element={<ApplicantReview />} />
          <Route path="/recruiter/recommendations" element={<RecommendedCandidates />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
