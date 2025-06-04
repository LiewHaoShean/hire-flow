
import { Link } from "react-router-dom";
import { CheckCircle, Briefcase, Users, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-hr-blue">HireFlow</Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-hr-blue">Home</Link>
            <Link to="/" className="text-gray-700 hover:text-hr-blue">Features</Link>
            <Link to="/" className="text-gray-700 hover:text-hr-blue">About</Link>
            <Link to="/" className="text-gray-700 hover:text-hr-blue">Contact</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link to="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-hr-blue-light to-hr-blue">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Transforming Hiring with AI
          </h1>
          <p className="text-xl md:text-2xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
            Streamline your recruitment process with our AI-powered platform that helps you identify the best talent for your organization.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register?role=recruiter">
              <Button size="lg" className="bg-white text-hr-blue hover:bg-gray-100">
                I'm a Recruiter
              </Button>
            </Link>
            <Link to="/register?role=applicant">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800 border-black">
                I'm a Job Seeker
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How HireFlow Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="bg-hr-blue/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-hr-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Job Matching</h3>
              <p className="text-gray-600">
                Our AI analyzes job descriptions and applicant profiles to find the perfect match for every position.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="bg-hr-blue/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-hr-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Skill Assessment</h3>
              <p className="text-gray-600">
                Automatically evaluate technical skills and soft skills through AI-powered assessments and interviews.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="bg-hr-blue/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BarChart className="h-8 w-8 text-hr-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Intelligent Rankings</h3>
              <p className="text-gray-600">
                Get ranked recommendations of candidates based on skills, experience, and cultural fit.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits of Using HireFlow</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-hr-blue mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Save Time and Resources</h3>
                <p className="text-gray-600">
                  Reduce the time spent on resume screening by up to 75% with our AI-powered matching system.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-hr-blue mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Increase Hiring Quality</h3>
                <p className="text-gray-600">
                  Make data-driven decisions to ensure you're hiring the best candidates for each position.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-hr-blue mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Eliminate Bias</h3>
                <p className="text-gray-600">
                  Our AI focuses on skills and qualifications, helping to reduce unconscious bias in the hiring process.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-hr-blue mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Improve Candidate Experience</h3>
                <p className="text-gray-600">
                  Provide a seamless application process and timely feedback to all candidates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-hr-navy text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Hiring Process?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of companies that are already using HireFlow to find their perfect candidates.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-hr-blue hover:bg-gray-100">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="text-2xl font-bold text-white">HireFlow</Link>
              <p className="mt-2 max-w-xs">
                AI-powered hiring platform that connects the right talent with the right opportunities.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Platform</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="hover:text-white transition-colors">Features</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">Demo</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="hover:text-white transition-colors">Documentation</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">Guides</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="hover:text-white transition-colors">About</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">Careers</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 HireFlow. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Link to="/" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/" className="hover:text-white transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
