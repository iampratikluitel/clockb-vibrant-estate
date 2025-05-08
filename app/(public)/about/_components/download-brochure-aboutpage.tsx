import { MINIOURL } from "@/lib/constants";
import { FileText } from "lucide-react";
import React, { useState } from "react";

export default function DownloadAboutBrochure() {
  const [brochureUrl, setBrochureUrl] = useState<string | null>(null);
  const handleDownloadBrochure = async () => {
    try {
      const fetchData = await fetch("/api/public/configuration/brochure");
      const data = await fetchData.json();

      if (data?.brochureUrl) {
        setBrochureUrl(data.brochureUrl);

        const fileUrl = `/api/resources/download?filename=${encodeURIComponent(data.brochureUrl)}`;
        window.open(fileUrl, "_blank");
      } else {
        console.error("Brochure URL not found.");
      }
    } catch (error) {
      console.error("Error fetching brochure:", error);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
      <FileText className="h-10 w-10 mx-auto mb-4 text-white" />
      {brochureUrl && (
        <h3
          className="text-xl font-semibold mb-2"
          onClick={handleDownloadBrochure}
        >
          Download Investment Brochure
        </h3>
      )}
      <p className="text-white/80 mb-4">
        Get detailed information about our project and returns.
      </p>
    </div>
  );
}
