import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MINIOURL } from "@/lib/constants";

const Header = () => {
  const [brochureUrl, setBrochureUrl] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownloadBrochure = async () => {
    try {
      const fetchData = await fetch("/api/public/configuration/brochure");
      const data = await fetchData.json();

      if (data?.brochureUrl) {
        const fileUrl = `${MINIOURL}${data.brochureUrl}`;
        // Open the file in a new tab
        window.open(fileUrl, "_blank");
      } else {
        console.error("Brochure URL not found.");
      }
    } catch (error) {
      console.error("Error fetching brochure:", error);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg py-3" : "bg-white py-6"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3 text-estates-primary hover:opacity-80 transition-all duration-300 group"
        >
          <img
            className="w-12 h-12 group-hover:scale-110 transition-transform duration-30"
            src="logo/project-estate.png"
            alt="nss-logo-png"
          />
          <span className="text-xl font-bold tracking-tight">
            Project Estates
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-10">
          <NavLink href="/" isActive={pathname === "/"}>Home</NavLink>
          <NavLink href="/about" isActive={pathname === "/about"}>About</NavLink>
          <NavLink href="/project-description" isActive={pathname === "/project-description"}>Project Description</NavLink>
          <NavLink href="/faqs" isActive={pathname === "/faqs"}>FAQs</NavLink>
          <NavLink href="/investor-relations" isActive={pathname === "/investor-relations"}>Investor Relations</NavLink>
          <NavLink href="/contact" isActive={pathname === "/contact"}>Contact</NavLink>
        </div>

        {/* CTA Button */}
        <Button
          onClick={handleDownloadBrochure}
          className="hidden md:flex items-center bg-estates-primary hover:bg-estates-primary/90 text-white font-semibold px-6 py-5 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md"
        >
          <Download className="w-4 h-4 mr-2 animate-bounce" />
          Download Brochure
        </Button>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <svg
            className="w-6 h-6 text-estates-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
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
    className={`text-estates-secondary hover:text-estates-primary transition-colors duration-300 relative group text-[15px] font-medium ${isActive ? "text-estates-primary" : ""}`}
  >
    {children}
    <span
      className={`absolute left-0 bottom-[-4px] w-full h-[2px] bg-estates-primary transform transition-transform duration-300 origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
    />
  </Link>
);

export default Header;
