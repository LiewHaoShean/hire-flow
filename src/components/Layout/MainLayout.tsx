import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  User, LogOut, FileText, BarChart, Briefcase, 
  Users, Plus, Menu, X, List, Building, Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MainLayoutProps {
  children: ReactNode;
  userType: "applicant" | "recruiter";
}

export default function MainLayout({ children, userType }: MainLayoutProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const applicantLinks = [
    { name: "Dashboard", path: "/applicant/dashboard", icon: <BarChart className="w-5 h-5 mr-2" /> },
    { name: "My Profile", path: "/applicant/profile", icon: <User className="w-5 h-5 mr-2" /> },
    { name: "Job Listings", path: "/applicant/jobs", icon: <Briefcase className="w-5 h-5 mr-2" /> },
    { name: "Skill Assessment", path: "/applicant/assessment", icon: <FileText className="w-5 h-5 mr-2" /> },
    { name: "Notifications", path: "/applicant/notifications", icon: <Bell className="w-5 h-5 mr-2" /> },
  ];
  
  const recruiterLinks = [
    { name: "Dashboard", path: "/recruiter/dashboard", icon: <BarChart className="w-5 h-5 mr-2" /> },
    { name: "Post a Job", path: "/recruiter/post-job", icon: <Plus className="w-5 h-5 mr-2" /> },
    { name: "Your Posts", path: "/recruiter/your-posts", icon: <List className="w-5 h-5 mr-2" /> },
    { name: "Company Profile", path: "/recruiter/company-profile", icon: <Building className="w-5 h-5 mr-2" /> },
    { name: "Recommendations", path: "/recruiter/recommendations", icon: <Users className="w-5 h-5 mr-2" /> },
    { name: "Notifications", path: "/recruiter/notifications", icon: <Bell className="w-5 h-5 mr-2" /> },
  ];
  
  const links = userType === "applicant" ? applicantLinks : recruiterLinks;
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-hr-blue">HireFlow</span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-hr-blue-light hover:text-white transition-colors ${
                    location.pathname === link.path ? "bg-hr-blue text-white" : ""
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <Link to="/login" className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-hr-gray-light transition-colors">
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Link>
        </div>
      </aside>
      
      {/* Mobile Header */}
      <div className="flex flex-col w-full">
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 md:hidden">
          <div className="flex items-center justify-between p-4">
            <Link to="/" className="text-xl font-bold text-hr-blue">
              HireFlow
            </Link>
            
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <nav className="flex-1 py-4">
                    <ul className="space-y-1">
                      {links.map((link) => (
                        <li key={link.path}>
                          <Link
                            to={link.path}
                            className={`flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-hr-blue-light hover:text-white transition-colors ${
                              location.pathname === link.path ? "bg-hr-blue text-white" : ""
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link.icon}
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  
                  <div className="pt-4 border-t">
                    <Link 
                      to="/login" 
                      className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-hr-gray-light transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Logout
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
