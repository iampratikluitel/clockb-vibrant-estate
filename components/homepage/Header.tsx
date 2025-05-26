"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Menu from "./MobileMenu";
import { toast } from "sonner";

interface Brochure {
  title: string;
  description: string;
  fileUrl: string;
}

const Header = () => {
  const [brochure, setBrochure] = useState<Brochure | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownload = async () => {
    if (!brochure) {
      toast.error("Brochure not available");
      return;
    }

    setIsLoading(true);
    try {
      if (!brochure.fileUrl) {
        throw new Error("File URL not available");
      }
      window.open(
        `/api/view?fileUrl=${encodeURIComponent(brochure.fileUrl)}`,
        "_blank"
      );
      toast.success("Opening brochure in new window");
    } catch (error) {
      console.error("Error opening file:", error);
      toast.error("Failed to open file");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleDownload = async () => {
  //   if (!brochure) {
  //     toast.error("Brochure not available");
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(
  //       `/api/download?fileUrl=${encodeURIComponent(
  //         brochure.fileUrl
  //       )}&downloadAs=${encodeURIComponent(brochure.title)}`,
  //       {
  //         credentials: "include",
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to download file");
  //     }

  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = brochure.title;
  //     document.body.appendChild(link);
  //     link.click();
  //     window.URL.revokeObjectURL(url);
  //     document.body.removeChild(link);
  //     toast.success("Download started successfully");
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //     toast.error("Failed to download file");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg py-3" : "bg-white py-6"
      }`}
    >
      <nav
        className="container mx-auto flex items-center justify-between px-4"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center space-x-3 text-estates-primary hover:opacity-80 transition-all duration-300 group"
          aria-label="Project Estates Home"
        >
          <img
            className="w-12 h-12 group-hover:scale-110 transition-transform duration-300"
            src="/logo/project-estate.png"
            alt="Project Estates logo"
          />
          <span className="text-xl font-bold tracking-tight">
            Project Estates
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-10">
          <NavLink href="/" isActive={pathname === "/"}>
            Home
          </NavLink>
          <NavLink href="/about" isActive={pathname === "/about"}>
            About
          </NavLink>
          <NavLink
            href="/projectdescription"
            isActive={pathname === "/projectdescription"}
          >
            Project Description
          </NavLink>
          <NavLink
            href="/investorelations"
            isActive={pathname === "/investorelations"}
          >
            Investor Relations
          </NavLink>
          <NavLink href="/contact" isActive={pathname === "/contact"}>
            Contact
          </NavLink>
        </div>

        <Button
          onClick={handleDownload}
          disabled={isLoading || !brochure}
          className="hidden lg:flex items-center bg-estates-primary hover:bg-estates-primary/90 text-white font-semibold px-6 py-5 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md"
          aria-label={
            isLoading ? "Downloading brochure..." : "Download brochure"
          }
        >
          <Download className={`w-4 h-4 mr-2`} />
          {isLoading ? "Downloading..." : "Download Brochure"}
        </Button>

        <div className="md:hidden">
          <Menu />
        </div>
      </nav>
    </header>
  );
};

// Navigation Link Component
const NavLink = ({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}) => (
  <Link
    href={href}
    className={`text-estates-secondary hover:text-estates-primary transition-colors duration-300 relative group text-[15px] font-medium ${
      isActive ? "text-estates-primary" : ""
    }`}
  >
    {children}
    <span
      className={`absolute left-0 bottom-[-4px] w-full h-[2px] bg-estates-primary transform transition-transform duration-300 origin-left ${
        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      }`}
    />
  </Link>
);

export default Header;
