"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import React from "react";

interface InvestmentKitProps {
  title: string;
  description: string;
  fileUrl: string;
}

export default function InvestmenrKit({
  investmentKit,
  handleDownload,
}: {
  investmentKit: InvestmentKitProps;
  handleDownload: (doc: InvestmentKitProps) => void;
}) {
  return (
    <section className="bg-gradient-to-r from-estates-primary to-estates-primary/80 py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            {investmentKit?.title || "Investor Resources"}
          </h1>
          <p
            className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            {investmentKit?.description ||
              "Access all the information, documents, and support you need as an investor in Project Estates"}
          </p>
          <div
            className="flex justify-center animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            {investmentKit?.fileUrl && (
              <Button
                className="bg-white hover:bg-gray-100 text-estates-primary font-semibold px-6 py-6 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:scale-105"
                onClick={() => handleDownload(investmentKit)}
              >
                <Download className="w-5 h-5" />
                Download Complete Investor Kit
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
