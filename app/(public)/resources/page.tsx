'use client';
import { useState } from "react";
import { 
  FileText, 
  File, 
  BarChart2, 
  Construction, 
  Home, 
  ScrollText, 
  Building, 
  Lock, 
  Book, 
  RefreshCw, 
  HelpCircle, 
  Phone, 
  CalendarCheck,
  Download,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/homepage/Header";
import Footer from "@/components/homepage/Footer";
import  Link from "next/link";
import { cn } from "@/lib/utils";
import ReportTable from "@/components/report/reporttable";

interface ResourceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
  className?: string;
}

const ResourceCard = ({ icon, title, description, buttonText, onClick, className }: ResourceCardProps) => (
  <div className={cn("bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100", className)}>
    <div className="flex items-start">
      <div className="bg-estates-primary/10 p-3 rounded-lg mr-4">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 hover:bg-estates-primary hover:text-white"
          onClick={onClick}
        >
          {buttonText.includes("Download") ? <Download className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
          {buttonText}
        </Button>
      </div>
    </div>
  </div>
);

const Resources = () => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [selectedTab, setSelectedTab] = useState("quarterly");

  const handleSiteVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit the form data to a backend
    console.log("Site visit form submitted:", {
      name: nameInput,
      email: emailInput,
      phone: phoneInput,
      date: dateInput,
      message: messageInput
    });
    
    // Reset form
    setNameInput("");
    setEmailInput("");
    setPhoneInput("");
    setDateInput("");
    setMessageInput("");
    
    // Show success message (in a real app, use a toast notification)
    alert("Your site visit request has been submitted. We'll contact you shortly to confirm.");
  };

  // Sample data for the reports
  const quarterlyReportsData = [
    { id: 1, title: "Q1 2025 Progress Report", date: "March 31, 2025", type: "PDF", size: "2.4 MB", status: "Completed" },
    { id: 2, title: "Q4 2024 Progress Report", date: "December 31, 2024", type: "PDF", size: "3.1 MB", status: "Completed" },
    { id: 3, title: "Q3 2024 Progress Report", date: "September 30, 2024", type: "PDF", size: "2.8 MB", status: "Completed" },
    { id: 4, title: "Q2 2024 Progress Report", date: "June 30, 2024", type: "PDF", size: "2.6 MB", status: "Completed" },
  ];

  const constructionReportsData = [
    { id: 1, title: "Main Infrastructure Plan", date: "February 15, 2025", type: "PDF", size: "5.7 MB", status: "Approved" },
    { id: 2, title: "Utility Layout", date: "January 20, 2025", type: "DWG", size: "8.3 MB", status: "In Review" },
    { id: 3, title: "Landscape Design", date: "December 10, 2024", type: "PDF", size: "4.2 MB", status: "Approved" },
    { id: 4, title: "Road Network Plan", date: "November 5, 2024", type: "PDF", size: "6.1 MB", status: "Approved" },
  ];

  const landAllocationData = [
    { id: 1, title: "Phase 1 Land Allocation", date: "April 5, 2025", type: "PDF", size: "3.4 MB", status: "Final" },
    { id: 2, title: "Property Valuation Report", date: "March 15, 2025", type: "PDF", size: "2.9 MB", status: "Final" },
    { id: 3, title: "ROI Projection - Land Exit", date: "February 28, 2025", type: "XLSX", size: "1.7 MB", status: "Updated" },
    { id: 4, title: "Plot Distribution Map", date: "January 25, 2025", type: "PDF", size: "4.5 MB", status: "Draft" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-estates-gray-100">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-estates-primary to-estates-primary/80 py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                Investor Resources
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Access all the information, documents, and support you need as an investor in Project Estates
              </p>
              <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Button
                  className="bg-white hover:bg-gray-100 text-estates-primary font-semibold px-6 py-6 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  Download Complete Investor Kit
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          {/* Section 1: Investment Documents & Policies */}
          <section className="mb-20 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="border-l-4 border-estates-primary pl-4 mb-8">
              <h2 className="text-3xl font-bold text-estates-secondary">Investment Documents & Policies</h2>
              <p className="text-gray-600 mt-2">Essential documents for investors</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResourceCard
                icon={<FileText className="h-6 w-6 text-estates-primary" />}
                title="Investment Brochure"
                description="Overview of the project, benefits, and key highlights"
                buttonText="Download PDF"
              />

              <ResourceCard
                icon={<ScrollText className="h-6 w-6 text-estates-primary" />}
                title="Terms & Conditions"
                description="Detailed investment policies, exit options, and taxation"
                buttonText="Download PDF"
              />

              <ResourceCard
                icon={<File className="h-6 w-6 text-estates-primary" />}
                title="Investor Agreement Sample"
                description="A sample of the legal contract between investors and Investment Circle P. Ltd"
                buttonText="Download PDF"
              />
            </div>
          </section>

          {/* Section 2: Project Updates & Reports */}
          <section className="mb-20 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="border-l-4 border-estates-primary pl-4 mb-8">
              <h2 className="text-3xl font-bold text-estates-secondary">Project Updates & Reports</h2>
              <p className="text-gray-600 mt-2">Stay informed about project progress</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="flex border-b">
                <button 
                  className={`py-4 px-6 font-medium flex items-center gap-2 ${selectedTab === 'quarterly' ? 'bg-estates-primary text-white' : 'hover:bg-gray-50'}`}
                  onClick={() => setSelectedTab('quarterly')}
                >
                  <BarChart2 className="h-5 w-5" />
                  Quarterly Progress Reports
                </button>
                <button 
                  className={`py-4 px-6 font-medium flex items-center gap-2 ${selectedTab === 'construction' ? 'bg-estates-primary text-white' : 'hover:bg-gray-50'}`}
                  onClick={() => setSelectedTab('construction')}
                >
                  <Construction className="h-5 w-5" />
                  Construction & Development
                </button>
                <button 
                  className={`py-4 px-6 font-medium flex items-center gap-2 ${selectedTab === 'land' ? 'bg-estates-primary text-white' : 'hover:bg-gray-50'}`}
                  onClick={() => setSelectedTab('land')}
                >
                  <Home className="h-5 w-5" />
                  Land Allocation & Valuation
                </button>
              </div>
              
              <div className="p-6">
                {selectedTab === 'quarterly' && (
                  <div>
                    <p className="text-gray-600 mb-4">Updates on land development, infrastructure progress, and key milestones achieved each quarter.</p>
                    <ReportTable data={quarterlyReportsData} />
                  </div>
                )}
                
                {selectedTab === 'construction' && (
                  <div>
                    <p className="text-gray-600 mb-4">Detailed engineering plans, zoning information, and site maps for the development.</p>
                    <ReportTable data={constructionReportsData} />
                  </div>
                )}
                
                {selectedTab === 'land' && (
                  <div>
                    <p className="text-gray-600 mb-4">Reports and documentation for investors opting for land exit strategy.</p>
                    <ReportTable data={landAllocationData} />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Section 3: Legal & Compliance Documents */}
          <section className="mb-20 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="border-l-4 border-estates-primary pl-4 mb-8">
              <h2 className="text-3xl font-bold text-estates-secondary">Legal & Compliance Documents</h2>
              <p className="text-gray-600 mt-2">Important legal information for your investment</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResourceCard
                icon={<Building className="h-6 w-6 text-estates-primary" />}
                title="Government Approvals & Permits"
                description="Copies of relevant land approvals, licenses, and environmental clearances"
                buttonText="View Documents"
              />

              <ResourceCard
                icon={<FileText className="h-6 w-6 text-estates-primary" />}
                title="Taxation Guidelines"
                description="Breakdown of applicable government taxes and deductions on investment returns"
                buttonText="View Guidelines"
              />

              <ResourceCard
                icon={<Lock className="h-6 w-6 text-estates-primary" />}
                title="Investor Protection & Security"
                description="Information on how investments are safeguarded"
                buttonText="View Documents"
              />
            </div>
          </section>

          {/* Section 4: FAQs & Guides */}
          <section className="mb-20 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="border-l-4 border-estates-primary pl-4 mb-8">
              <h2 className="text-3xl font-bold text-estates-secondary">FAQs & Guides</h2>
              <p className="text-gray-600 mt-2">Helpful resources for current and prospective investors</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100 flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="bg-estates-primary/10 p-3 rounded-lg mr-3">
                    <Book className="h-6 w-6 text-estates-primary" />
                  </div>
                  <h3 className="font-bold text-lg">Investor Guide</h3>
                </div>
                <p className="text-gray-600 text-sm mb-5 flex-grow">A step-by-step guide on how to invest, manage returns, and exit options</p>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2 hover:bg-estates-primary hover:text-white">
                  <Download className="w-4 h-4" />
                  Download Guide
                </Button>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100 flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="bg-estates-primary/10 p-3 rounded-lg mr-3">
                    <RefreshCw className="h-6 w-6 text-estates-primary" />
                  </div>
                  <h3 className="font-bold text-lg">Exit Process Explained</h3>
                </div>
                <p className="text-gray-600 text-sm mb-5 flex-grow">How land and cash exits work, including timelines and procedures</p>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2 hover:bg-estates-primary hover:text-white">
                  <ExternalLink className="w-4 h-4" />
                  View Process
                </Button>
              </div>

              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100 flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="bg-estates-primary/10 p-3 rounded-lg mr-3">
                    <HelpCircle className="h-6 w-6 text-estates-primary" />
                  </div>
                  <h3 className="font-bold text-lg">FAQs Section</h3>
                </div>
                <p className="text-gray-600 text-sm mb-5 flex-grow">Direct links to common questions investors ask</p>
                <Link href="/faqs" className="w-full">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2 hover:bg-estates-primary hover:text-white">
                    <ExternalLink className="w-4 h-4" />
                    View FAQs
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Section 5: Contact & Support */}
          <section className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="border-l-4 border-estates-primary pl-4 mb-8">
              <h2 className="text-3xl font-bold text-estates-secondary">Contact & Support</h2>
              <p className="text-gray-600 mt-2">Get in touch with our investor relations team</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Details */}
              <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
                <h3 className="text-2xl font-bold mb-6 text-estates-secondary">Investor Relations</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-estates-primary/10 p-3 rounded-lg mr-4">
                      <Phone className="h-5 w-5 text-estates-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Contact Details</h4>
                      <p className="text-gray-600 mt-1">+977-9851079636</p>
                      <p className="text-gray-600">+977-9843260542</p>
                      <p className="text-gray-600 mt-1">Info@projestates.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-estates-primary/10 p-3 rounded-lg mr-4">
                      <CalendarCheck className="h-5 w-5 text-estates-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Upcoming Events</h4>
                      <div className="mt-2 space-y-3">
                        <div className="bg-estates-gray-100 rounded-lg p-3 hover:shadow-md transition-shadow">
                          <p className="font-medium">Investor Webinar</p>
                          <p className="text-sm text-gray-600">June 15, 2025 • 2:00 PM NPT</p>
                          <Button variant="link" className="text-estates-primary p-0 mt-1 flex items-center gap-1 text-sm">
                            Register Now <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="bg-estates-gray-100 rounded-lg p-3 hover:shadow-md transition-shadow">
                          <p className="font-medium">Site Visit Day</p>
                          <p className="text-sm text-gray-600">July 5, 2025 • 10:00 AM NPT</p>
                          <Button variant="link" className="text-estates-primary p-0 mt-1 flex items-center gap-1 text-sm">
                            Reserve Spot <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Schedule a Site Visit Form */}
              <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
                <h3 className="text-2xl font-bold mb-6 text-estates-secondary">Schedule a Site Visit</h3>
                
                <form onSubmit={handleSiteVisitSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <Input 
                      id="name" 
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <Input 
                      id="phone" 
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="w-full" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Preferred Visit Date</label>
                    <Input 
                      id="date" 
                      type="date" 
                      value={dateInput}
                      onChange={(e) => setDateInput(e.target.value)}
                      className="w-full" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Any specific requests or questions?</label>
                    <textarea 
                      id="message" 
                      rows={3} 
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" 
                    />
                  </div>
                  
                  <Button 
                    className="w-full py-6 bg-estates-primary hover:bg-estates-primary/90 text-white" 
                    type="submit"
                  >
                    Schedule Visit
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;
