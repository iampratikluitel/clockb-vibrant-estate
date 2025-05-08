"use client";
import { Button } from "@/components/ui/button";
import { MINIOURL } from "@/lib/constants";
import { Download } from "lucide-react";
import React, { useState } from "react";

export default function DownloadInvestmentBrochure() {
  const [brochureUrl, setBrochureUrl] = useState<string | null>(null);

  const handleDownloadBrochure = async () => {
    try {
      const fetchData = await fetch("/api/public/configuration/brochure");
      const data = await fetchData.json();

      if (data?.brochureUrl) {
        setBrochureUrl(data.brochureUrl);

        const fileUrl = `/api/resources/download?filename=${encodeURIComponent(data.brochureUrl)}`;
        window.open(fileUrl, "_blank"); // Opens in new tab
      } else {
        console.error("Brochure URL not found.");
      }
    } catch (error) {
      console.error("Error fetching brochure:", error);
    }
  };

  return (
    <div>
      {brochureUrl && (
        <Button
          variant="cta"
          size="xl"
          onClick={handleDownloadBrochure}
          className="animate-fade-in delay-300"
        >
          <Download className="mr-2 h-5 w-5" />
          Download Investment Brochure
        </Button>
      )}
    </div>
  );
}
