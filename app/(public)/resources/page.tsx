"use client";
import { useState, useEffect } from "react";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetPublicConfigFooterQuery } from "@/store/api/Public/publicConfiguration";
import InvestmentDocuments from "./_components/InvestmentDocument";
import ProjectUpdates from "./_components/ProjectUpdates";
import LegalDocuments from "./_components/LegalDocument";
import FaqGuides from "./_components/FaqGuides";
import ContactSupport from "./_components/ContactSupport";
import InvestmentKit from "./_components/InvestmentKit";

interface InvestmentDoc {
  id: string;
  icon: "file-text" | "scroll-text" | "file";
  title: string;
  description: string;
  buttonText: string;
  fileUrl?: string;
  actionType: "download" | "view";
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
  actionType: "download" | "view";
}

interface FaqGuide {
  id: string;
  icon: string;
  title: string;
  description: string;
  buttonType: string;
  buttonText: string;
  fileUrl?: string;
}
interface ContactDetail {
  id: string;
  type: "phone" | "email";
  value: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  registrationLink: string;
}

interface Report {
  id: string;
  title: string;
  date: string;
  type: string;
  size: string;
  status: string;
  category: string;
  fileUrl: string;
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
  const { data: ConfigData, isLoading: Loading } =
    useGetPublicConfigFooterQuery("");
  const [reports, setReports] = useState<Report[]>([]);
  const [legalDocuments, setLegalDocuments] = useState<LegalDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingGuides, setLoadingGuides] = useState(true);
  const [guides, setGuides] = useState<FaqGuide[]>([]);
  const [investmentDocs, setInvestmentDocs] = useState<InvestmentDoc[]>([]);
  const [investorKit, setInvestorKit] = useState<{
    title: string;
    description: string;
    fileUrl: string;
  } | null>(null);
  const [selectedDocument, setSelectedDocument] =
    useState<LegalDocument | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<LegalDocument | null>(null);
  const [investorRelations, setInvestorRelations] =
    useState<InvestorRelations | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/resources");
        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error:", errorData);
          throw new Error(errorData.error || "Failed to fetch resources");
        }
        const data = await response.json();

        // Separate reports and legal documents based on category
        const reportsData = data.filter(
          (item: any) => item.category !== "legal"
        );
        const legalDocsData = data.filter(
          (item: any) => item.category === "legal"
        );
        setReports(reportsData);
        setLegalDocuments(legalDocsData);
      } catch (error) {
        console.error("Error fetching resources:", error);
        toast.error("Failed to load resources. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch("/api/guides");
        if (!response.ok) throw new Error("Failed to fetch guides");
        const data = await response.json();
        setGuides(data);
      } catch (error) {
        console.error("Error fetching guides:", error);
        toast.error("Failed to load guides");
      } finally {
        setLoadingGuides(false);
      }
    };

    fetchGuides();
  }, []);

  useEffect(() => {
    const fetchInvestmentDocs = async () => {
      try {
        const response = await fetch("/api/investment-docs");
        if (!response.ok)
          throw new Error("Failed to fetch investment documents");
        const data = await response.json();
        setInvestmentDocs(data);
      } catch (error) {
        console.error("Error fetching investment documents:", error);
        toast.error("Failed to load investment documents");
      }
    };
    fetchInvestmentDocs();
  }, []);

  useEffect(() => {
    const fetchInvestorKit = async () => {
      try {
        const response = await fetch("/api/public/investor-kit");
        if (response.ok) {
          const data = await response.json();
          setInvestorKit(data);
        }
      } catch (error) {
        console.error("Error fetching investor kit:", error);
      }
    };
    fetchInvestorKit();
  }, []);

  useEffect(() => {
    const fetchInvestorRelations = async () => {
      try {
        const response = await fetch("/api/investor-relations");
        if (response.ok) {
          const data = await response.json();
          setInvestorRelations(data);
        }
      } catch (error) {
        console.error("Error fetching investor relations:", error);
      }
    };

    fetchInvestorRelations();
  }, []);

  // Filter reports based on selected tab
  const filteredReports = reports.filter((report) => {
    switch (selectedTab) {
      case "quarterly":
        return report.category === "quarterly";
      case "construction":
        return report.category === "construction";
      case "land":
        return report.category === "land";
      default:
        return false;
    }
  });

  const handleSiteVisitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/site-visits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameInput,
          email: emailInput,
          phone: phoneInput,
          preferredDate: dateInput,
          message: messageInput,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit site visit request");

      toast.success("Site visit request submitted successfully");
      setNameInput("");
      setEmailInput("");
      setPhoneInput("");
      setDateInput("");
      setMessageInput("");
    } catch (error) {
      console.error("Error submitting site visit request:", error);
      toast.error("Failed to submit site visit request");
    }
  };

  const handleDownload = async (doc: LegalDocument | InvestmentDoc | FaqGuide) => {
    try {
      if (!doc.fileUrl) {
        toast.error("No file available for download");
        return;
      }

      const response = await fetch(
        `/api/download?fileUrl=${encodeURIComponent(
          doc.fileUrl
        )}&downloadAs=${encodeURIComponent(doc.title)}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = doc.title;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download file");
    }
  };

  const handleDocumentAction = async (doc: LegalDocument) => {
    setSelectedDoc(doc);
    setIsDocumentDialogOpen(true);
  };

  // Add this helper function near other utility functions
  const isImageFile = (filename: string) => {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    return imageExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
  };

  return (
    <div className="min-h-screen flex flex-col bg-estates-gray-100">
      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <InvestmentKit investorKit={investorKit}/>

        <div className="container mx-auto px-4 py-16">
          <InvestmentDocuments
            investmentDocs={investmentDocs}
            handleDownload={handleDownload}
          />
          <ProjectUpdates
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            filteredReports={filteredReports}
            loading={loading}
          />
          <LegalDocuments
            legalDocuments={legalDocuments}
            handleDocumentAction={handleDocumentAction}
          />
          <FaqGuides 
            guides={guides} 
            loadingGuides={loadingGuides} 
            handleDownload={handleDownload}
          />
          <ContactSupport
            ConfigData={ConfigData}
            investorRelations={investorRelations}
            nameInput={nameInput}
            setNameInput={setNameInput}
            emailInput={emailInput}
            setEmailInput={setEmailInput}
            phoneInput={phoneInput}
            setPhoneInput={setPhoneInput}
            dateInput={dateInput}
            setDateInput={setDateInput}
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            handleSiteVisitSubmit={handleSiteVisitSubmit}
          />
        </div>
      </main>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{selectedDocument?.title}</DialogTitle>
          </DialogHeader>
          {selectedDocument && (
            <div className="flex-1 overflow-hidden">
              <iframe
                src={`/api/view?fileUrl=${encodeURIComponent(
                  selectedDocument.fileUrl
                )}`}
                className="w-full h-full border-0"
                title={selectedDocument.title}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDocumentDialogOpen}
        onOpenChange={setIsDocumentDialogOpen}
      >
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader className="flex-none">
            <DialogTitle>{selectedDoc?.title}</DialogTitle>
          </DialogHeader>
          {selectedDoc && (
            <div className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 overflow-auto">
                {selectedDoc.fileUrl?.toLowerCase().endsWith(".pdf") ? (
                  <object
                    data={`/api/view?fileUrl=${encodeURIComponent(
                      selectedDoc.fileUrl
                    )}`}
                    type="application/pdf"
                    className="w-full h-full"
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <p className="text-gray-500 mb-4">
                        Unable to display PDF directly
                      </p>
                      <Button
                        variant="outline"
                        onClick={() =>
                          window.open(
                            `/api/view?fileUrl=${encodeURIComponent(
                              selectedDoc.fileUrl
                            )}`,
                            "_blank"
                          )
                        }
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open PDF in New Tab
                      </Button>
                    </div>
                  </object>
                ) : isImageFile(selectedDoc.fileUrl || "") ? (
                  <div className="relative w-full h-full">
                    <img
                      src={`/api/view?fileUrl=${encodeURIComponent(
                        selectedDoc.fileUrl
                      )}`}
                      alt={selectedDoc.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-gray-500 mb-4">
                      Preview not available for this file type
                    </p>
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
