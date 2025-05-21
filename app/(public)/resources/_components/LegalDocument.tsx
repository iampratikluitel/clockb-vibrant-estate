import { Button } from "@/components/ui/button";
import { FileText, Eye } from "lucide-react";

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

export default function LegalDocuments({
  legalDocuments,
  handleDocumentAction,
}: {
  legalDocuments: LegalDocument[];
  handleDocumentAction: (doc: LegalDocument) => void;
}) {
  return (
    <section className="mb-20 animate-fade-in" style={{ animationDelay: "0.4s" }}>
      <div className="border-l-4 border-estates-primary pl-4 mb-8">
        <h2 className="text-3xl font-bold text-estates-secondary">
          Legal & Compliance Documents
        </h2>
        <p className="text-gray-600 mt-2">
          Important legal information for your investment
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {legalDocuments.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
          >
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
  );
}