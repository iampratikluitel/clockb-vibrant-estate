import ResourceCard from "@/components/ResourceCard";
import { Button } from "@/components/ui/button";
import { Download, FileText, ScrollText, File } from "lucide-react";

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

export default function InvestmentDocuments({
  investmentDocs,
  handleDocumentAction,
}: {
  investmentDocs: InvestmentDoc[];
  handleDocumentAction: (doc: InvestmentDoc) => void;
}) {
  const getIconComponent = (icon: string) => {
    switch (icon) {
      case "file-text":
        return <FileText className="h-6 w-6 text-estates-primary" />;
      case "scroll-text":
        return <ScrollText className="h-6 w-6 text-estates-primary" />;
      case "file":
        return <File className="h-6 w-6 text-estates-primary" />;
      default:
        return <FileText className="h-6 w-6 text-estates-primary" />;
    }
  };

  return (
    <section className="mb-20 animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <div className="border-l-4 border-estates-primary pl-4 mb-8">
        <h2 className="text-3xl font-bold text-estates-secondary">
          Investment Documents & Policies
        </h2>
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
            onClick={() => handleDocumentAction(doc)}
          />
        ))}
      </div>
    </section>
  );
}