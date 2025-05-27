"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Brochure {
  title: string;
  description: string;
  fileUrl: string;
}

const Hero = () => {
  const [brochure, setBrochure] = useState<Brochure | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBrochure = async () => {
      try {
        const response = await fetch("/api/public/configuration/brochure");
        if (response.ok) {
          const data = await response.json();
          setBrochure(data);
        }
      } catch (error) {
        console.error("Error fetching brochure:", error);
        toast.error("Failed to load brochure information");
      }
    };
    fetchBrochure();
  }, []);

  // const handleDownload = async () => {
  //   if (!brochure) {
  //     toast.error("Brochure not available");
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     if (!brochure.fileUrl) {
  //       throw new Error("File URL not available");
  //     }
  //     window.open(`/api/view?fileUrl=${encodeURIComponent(brochure.fileUrl)}`, '_blank');
  //     toast.success("Opening brochure in new window");
  //   } catch (error) {
  //     console.error("Error opening file:", error);
  //     toast.error("Failed to open file");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleDownload = async () => {
    if (!brochure) {
      toast.error("Brochure not available");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/download?fileUrl=${encodeURIComponent(
          brochure.fileUrl
        )}&downloadAs=${encodeURIComponent(brochure.title)}`,
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
      link.download = brochure.title;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      toast.success("Download started successfully");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download file");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bannerimage/homepage.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-estates-secondary/80 to-estates-primary/70" />{" "}
        {/* Gradient overlay */}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 mt-10 md:mt-0">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Transforming Real Estate into Value-Driven Investments
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
            Sustainable, Functional, and Profitable Developments for Investors
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="bg-estates-primary hover:bg-estates-primary/90 text-white font-semibold px-8 py-6 text-lg rounded-lg 
      transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 
      shadow-lg hover:shadow-estates-primary/20 group w-full sm:w-auto"
              onClick={handleDownload}
            >
              <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Download Brochure
            </Button>

            <Link href="/projectdescription" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="border-2 border-white text-estates-primary/90 hover:bg-white/20 font-semibold px-8 py-6 text-lg rounded-lg 
        transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 
        shadow-lg hover:shadow-estates-primary/20 w-full sm:w-auto"
              >
                Project Description
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Feature Boxes */}
      <div className="absolute bottom-[-30px] left-0 right-0 px-4 hidden md:block">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-6">
            {/*Card1*/}
            <div
              key="card1"
              className="bg-white p-6 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
            >
              <h3 className="text-estates-primary font-bold text-xl mb-2">
                Premium Locations
              </h3>
              <p className="text-gray-600">
                Strategic properties in high-growth areas
              </p>
            </div>

            {/* Card 2 */}
            <div
              key="card2"
              className="bg-white p-6 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
            >
              <h3 className="text-estates-primary font-bold text-xl mb-2">
                Sustainable Design
              </h3>
              <p className="text-gray-600">
                Eco-friendly construction with modern amenities
              </p>
            </div>

            {/* Card 3 */}
            <div
              key="card3"
              className="bg-white p-6 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
            >
              <h3 className="text-estates-primary font-bold text-xl mb-2">
                High ROI
              </h3>
              <p className="text-gray-600">
                Consistent returns on investment portfolios
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
       <div className="w-[2px] h-8 bg-white/50 rounded-full" />
      </div> */}
    </div>
  );
};

export default Hero;
