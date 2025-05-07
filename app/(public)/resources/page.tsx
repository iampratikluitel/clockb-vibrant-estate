'use client';
import { useState, useEffect, useRef } from "react";
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
  ChevronRight,
  Mail,
  MapPin,
  Facebook, 
  Instagram, 
  Linkedin, 
  Send, 
  ArrowRight, 
  Phone as PhoneIcon,
  Eye,


  Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/homepage/Header";
import Footer from "@/components/homepage/Footer";
import  Link from "next/link";
import ReportTable from "@/components/report/reporttable";
import { toast } from "sonner";
import ResourceCard from '@/components/ResourceCard';



import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";


interface ResourceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
  className?: string;
  fileUrl?: string;
  onUpload?: (file: File) => Promise<void>;
  isUpload?: boolean;
}

const DOCUMENT_TYPES = [
  { value: 'agreement', label: 'Agreement', icon: <ScrollText className="h-5 w-5" /> },
  { value: 'report', label: 'Report', icon: <FileText className="h-5 w-5" /> },
  { value: 'certificate', label: 'Certificate', icon: <File className="h-5 w-5" /> },
];

interface InvestmentDoc {
  id: string;
  icon: 'file-text' | 'scroll-text' | 'file';
  title: string;
  description: string;
  buttonText: string;
  fileUrl?: string;
  actionType: 'download' | 'view';
  date: string;
  type: string;
  size: string;
}

interface LegalDocument {
  id: string;
  title: string;
  date: string;
  type: string;
  size: string;
  description: string;
  fileUrl: string;
  actionType: 'download' | 'view';
}

interface ContactDetail {
  id: string;
  type: 'phone' | 'email';
  value: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  registrationLink: string;
}

interface InvestorRelations {
  id: string;
  contactDetails: ContactDetail[];
  events: Event[];
}

const Resources = () => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [selectedTab, setSelectedTab] = useState("quarterly");
  const [reports, setReports] = useState<{
    id: string;
    title: string;
    date: string;
    type: string;
    size: string;
    status: string;
    category: string;
    fileUrl: string;
  }[]>([]);
  const [legalDocuments, setLegalDocuments] = useState<LegalDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [guides, setGuides] = useState<{
    id: string;
    icon: string;
    title: string;
    description: string;
    buttonType: string;
    buttonText: string;
    fileUrl?: string;
  }[]>([]);
  const [loadingGuides, setLoadingGuides] = useState(true);
  const [investmentDocs, setInvestmentDocs] = useState<InvestmentDoc[]>([]);
  const [investorKit, setInvestorKit] = useState<{
    title: string;
    description: string;
    fileUrl: string;
  } | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<LegalDocument | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<LegalDocument | null>(null);
  const [investorRelations, setInvestorRelations] = useState<InvestorRelations | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/resources');
        if (!response.ok) {
          const errorData = await response.json();
          console.error('API Error:', errorData);
          throw new Error(errorData.error || 'Failed to fetch resources');
        }
        const data = await response.json();
        console.log('Fetched resources:', data);
        
        // Separate reports and legal documents based on category
        const reportsData = data.filter((item: any) => item.category !== 'legal');
        const legalDocsData = data.filter((item: any) => item.category === 'legal');
        
        console.log('Reports data:', reportsData);
        console.log('Legal documents data:', legalDocsData);
        
        setReports(reportsData);
        setLegalDocuments(legalDocsData);
      } catch (error) {
        console.error('Error fetching resources:', error);
        toast.error('Failed to load resources. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch('/api/guides');
        if (!response.ok) throw new Error('Failed to fetch guides');
        const data = await response.json();
        setGuides(data);
      } catch (error) {
        console.error('Error fetching guides:', error);
        toast.error('Failed to load guides');
      } finally {
        setLoadingGuides(false);
      }
    };

    fetchGuides();
  }, []);

  useEffect(() => {
    const fetchInvestmentDocs = async () => {
      try {
        const response = await fetch('/api/investment-docs');
        if (!response.ok) throw new Error('Failed to fetch investment documents');
        const data = await response.json();
        setInvestmentDocs(data);
      } catch (error) {
        console.error('Error fetching investment documents:', error);
        toast.error('Failed to load investment documents');
      }
    };

    fetchInvestmentDocs();
  }, []);

  useEffect(() => {
    const fetchInvestorKit = async () => {
      try {
        const response = await fetch('/api/admin/investor-kit');
        if (response.ok) {
          const data = await response.json();
          setInvestorKit(data);
        }
      } catch (error) {
        console.error('Error fetching investor kit:', error);
      }
    };

    fetchInvestorKit();
  }, []);

  useEffect(() => {
    const fetchInvestorRelations = async () => {
      try {
        const response = await fetch('/api/investor-relations');
        if (response.ok) {
          const data = await response.json();
          setInvestorRelations(data);
        }
      } catch (error) {
        console.error('Error fetching investor relations:', error);
      }
    };

    fetchInvestorRelations();
  }, []);

  // Filter reports based on selected tab
  const filteredReports = reports.filter(report => {
    switch (selectedTab) {
      case 'quarterly':
        return report.category === 'quarterly';
      case 'construction':
        return report.category === 'construction';
      case 'land':
        return report.category === 'land';
      default:
        return false;
    }
  });

  const handleSiteVisitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/site-visits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameInput,
          email: emailInput,
          phone: phoneInput,
          preferredDate: dateInput,
          message: messageInput,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit site visit request');

      toast.success('Site visit request submitted successfully');
      setNameInput('');
      setEmailInput('');
      setPhoneInput('');
      setDateInput('');
      setMessageInput('');
    } catch (error) {
      console.error('Error submitting site visit request:', error);
      toast.error('Failed to submit site visit request');
    }
  };

  const handleFileUpload = async (file: File, category: string) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);
      formData.append('title', file.name);
      formData.append('description', `Uploaded ${file.name}`);

      const response = await fetch('/api/resources/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      // Update the appropriate state based on category
      if (category === 'legal') {
        setLegalDocuments(prev => [...prev, data]);
      } else {
        setReports(prev => [...prev, data]);
      }

      toast.success('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (doc: LegalDocument | InvestmentDoc) => {
    try {
      const response = await fetch(`/api/download?fileUrl=${encodeURIComponent(doc.fileUrl || '')}`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to download file');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = doc.title;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download file');
    }
  };

  const getIconComponent = (icon: string) => {
    switch (icon) {
      case 'file-text':
        return <FileText className="h-6 w-6 text-estates-primary" />;
      case 'scroll-text':
        return <ScrollText className="h-6 w-6 text-estates-primary" />;
      case 'file':
        return <File className="h-6 w-6 text-estates-primary" />;
      default:
        return <FileText className="h-6 w-6 text-estates-primary" />;
    }
  };

  const handleDocumentAction = async (doc: LegalDocument) => {
    setSelectedDoc(doc);
    setIsDocumentDialogOpen(true);
  };

  // Add this helper function near other utility functions
  const isImageFile = (filename: string) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  return (
    <div className="min-h-screen flex flex-col bg-estates-gray-100">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-estates-primary to-estates-primary/80 py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                {investorKit?.title || 'Investor Resources'}
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                {investorKit?.description || 'Access all the information, documents, and support you need as an investor in Project Estates'}
              </p>
              <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
                {investorKit?.fileUrl && (
                  <Button
                    className="bg-white hover:bg-gray-100 text-estates-primary font-semibold px-6 py-6 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:scale-105"
                    onClick={() => window.open(`/api/resources/download?filename=${encodeURIComponent(investorKit.fileUrl)}`, '_blank')}
                  >
                    <Download className="w-5 h-5" />
                    Download Complete Investor Kit
                  </Button>
                )}
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
              {investmentDocs.map((doc) => (
                <ResourceCard
                  key={doc.id}
                  icon={getIconComponent(doc.icon)}
                  title={doc.title}
                  description={doc.description}
                  buttonText={doc.buttonText}
                  onClick={() => handleDownload(doc)}
                />
              ))}
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
                {loading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-estates-primary"></div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-4">
                      {selectedTab === 'quarterly' && "Updates on land development, infrastructure progress, and key milestones achieved each quarter."}
                      {selectedTab === 'construction' && "Detailed engineering plans, zoning information, and site maps for the development."}
                      {selectedTab === 'land' && "Reports and documentation for investors opting for land exit strategy."}
                    </p>
                    <ReportTable data={filteredReports} />
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
              {legalDocuments.map((doc) => (
                <div key={doc.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="bg-estates-primary/10 p-3 rounded-lg mr-3">
                        <FileText className="h-6 w-6 text-estates-primary" />
                      </div>
                      <h3 className="font-bold text-lg">{doc.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-5">{doc.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2 hover:bg-estates-primary hover:text-white"
                    onClick={() => handleDocumentAction(doc)}
                  >
                    <Eye className="w-4 h-4" />
                    View Document/Download Document
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: FAQs & Guides */}
          <section className="mb-20 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="border-l-4 border-estates-primary pl-4 mb-8">
              <h2 className="text-3xl font-bold text-estates-secondary">FAQs & Guides</h2>
              <p className="text-gray-600 mt-2">Helpful resources for current and prospective investors</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loadingGuides ? (
                <div className="col-span-3 flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-estates-primary"></div>
                </div>
              ) : (
                guides.map((guide) => (
                  <div key={guide.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100 flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="bg-estates-primary/10 p-3 rounded-lg mr-3">
                        {guide.icon === 'book' ? (
                          <Book className="h-6 w-6 text-estates-primary" />
                        ) : guide.icon === 'refresh' ? (
                          <RefreshCw className="h-6 w-6 text-estates-primary" />
                        ) : (
                          <HelpCircle className="h-6 w-6 text-estates-primary" />
                        )}
                      </div>
                      <h3 className="font-bold text-lg">{guide.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-5 flex-grow">{guide.description}</p>
                    {guide.buttonType === 'download' ? (
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center gap-2 hover:bg-estates-primary hover:text-white"
                        onClick={() => {
                          if (guide.fileUrl) {
                            window.open(`/api/resources/download?filename=${encodeURIComponent(guide.fileUrl)}`, '_blank');
                          }
                        }}
                      >
                        <Download className="w-4 h-4" />
                        {guide.buttonText}
                      </Button>
                    ) : guide.buttonType === 'faq' ? (
                      <Link href="/faqs" className="w-full">
                        <Button variant="outline" className="w-full flex items-center justify-center gap-2 hover:bg-estates-primary hover:text-white">
                          <ExternalLink className="w-4 h-4" />
                          {guide.buttonText}
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="outline" className="w-full flex items-center justify-center gap-2 hover:bg-estates-primary hover:text-white">
                        <ExternalLink className="w-4 h-4" />
                        {guide.buttonText}
                      </Button>
                    )}
                  </div>
                ))
              )}
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
                      {investorRelations?.contactDetails.map((contact) => (
                        <p key={contact.id} className="text-gray-600 mt-1">{contact.value}</p>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-estates-primary/10 p-3 rounded-lg mr-4">
                      <CalendarCheck className="h-5 w-5 text-estates-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Upcoming Events</h4>
                      <div className="mt-2 space-y-3">
                        {investorRelations?.events.map((event) => (
                          <div key={event.id} className="bg-estates-gray-100 rounded-lg p-3 hover:shadow-md transition-shadow">
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-gray-600">{event.date} • {event.time} NPT</p>
                            <Button variant="link" className="text-estates-primary p-0 mt-1 flex items-center gap-1 text-sm" asChild>
                              <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                                Register Now <ChevronRight className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        ))}
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

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{selectedDocument?.title}</DialogTitle>
          </DialogHeader>
          {selectedDocument && (
            <div className="flex-1 overflow-hidden">
              <iframe
                src={`/api/view?fileUrl=${encodeURIComponent(selectedDocument.fileUrl)}`}
                className="w-full h-full border-0"
                title={selectedDocument.title}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDocumentDialogOpen} onOpenChange={setIsDocumentDialogOpen}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader className="flex-none">
            <DialogTitle>{selectedDoc?.title}</DialogTitle>
          </DialogHeader>
          {selectedDoc && (
            <div className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 overflow-auto">
                {selectedDoc.fileUrl?.toLowerCase().endsWith('.pdf') ? (
                  <object
                    data={`/api/view?fileUrl=${encodeURIComponent(selectedDoc.fileUrl)}`}
                    type="application/pdf"
                    className="w-full h-full"
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <p className="text-gray-500 mb-4">Unable to display PDF directly</p>
                      <Button
                        variant="outline"
                        onClick={() => window.open(`/api/view?fileUrl=${encodeURIComponent(selectedDoc.fileUrl)}`, '_blank')}
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open PDF in New Tab
                      </Button>
                    </div>
                  </object>
                ) : isImageFile(selectedDoc.fileUrl || '') ? (
                  <div className="relative w-full h-full">
                    <img
                      src={`/api/view?fileUrl=${encodeURIComponent(selectedDoc.fileUrl)}`}
                      alt={selectedDoc.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-gray-500 mb-4">Preview not available for this file type</p>
                    <Button
                      variant="outline"
                      onClick={() => handleDownload(selectedDoc)}
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download to View
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => handleDownload(selectedDoc)}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Document
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDocumentDialogOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resources;
