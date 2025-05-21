import {
  Download,
  ExternalLink,
  Book,
  RefreshCw,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import * as Icons from "lucide-react";

interface FaqGuide {
  id: string;
  icon: string;
  title: string;
  description: string;
  buttonType: string;
  buttonText: string;
  fileUrl?: string;
}

interface FaqGuidesProps {
  guides: FaqGuide[];
  loadingGuides: boolean;
  handleDownload: (guide: FaqGuide) => Promise<void>;
}

const FaqGuides = ({
  guides,
  loadingGuides,
  handleDownload,
}: FaqGuidesProps) => {
  const handleAction = (guide: FaqGuide) => {
    if (guide.buttonType === "download" && guide.fileUrl) {
      handleDownload(guide);
    } else if (guide.buttonType === "link" && guide.fileUrl) {
      window.open(guide.fileUrl, "_blank");
    }
  };

  if (loadingGuides) {
    return (
      <section className="mt-8 md:mt-16 px-4 md:px-6 ">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-8">
          FAQ & Guides
        </h2>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-estates-primary" />
        </div>
      </section>
    );
  }

  return (
    <section
      className="mb-20 animate-fade-in"
      style={{ animationDelay: "0.5s" }}
    >
      <div className="border-l-4 border-estates-primary pl-4 mb-8">
        <h2 className="text-3xl font-bold text-estates-secondary">
          FAQs & Guides
        </h2>
        <p className="text-gray-600 mt-2">
          Helpful resources for current and prospective investors
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {guides.map((guide) => (
          <div
            key={guide.id}
            className="bg-white rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-3 mb-3 md:mb-4">
              <div className="text-estates-primary flex-shrink-0">
                {/* {renderIcon(guide.icon)} */}
                {guide.icon === "book" ? (
                  <Book className="h-6 w-6 text-estates-primary" />
                ) : guide.icon === "refresh" ? (
                  <RefreshCw className="h-6 w-6 text-estates-primary" />
                ) : (
                  <HelpCircle className="h-6 w-6 text-estates-primary" />
                )}
              </div>
              <h3 className="text-base md:text-lg font-medium">
                {guide.title}
              </h3>
            </div>
            <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3">
              {guide.description}
            </p>
            <Button
              variant="outline"
              className="w-full text-sm md:text-base"
              onClick={() => handleAction(guide)}
            >
              {guide.buttonType === "download" ? (
                <Download className="w-4 h-4 mr-2" />
              ) : (
                <ExternalLink className="w-4 h-4 mr-2" />
              )}
              {guide.buttonText}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqGuides;
