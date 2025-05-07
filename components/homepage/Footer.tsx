import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, FacebookIcon } from "lucide-react";
import { useGetPublicConfigFooterQuery } from "@/store/api/Public/publicConfiguration";
import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

const Footer = () => {
  const {data: ConfigData, isLoading: Loading} = useGetPublicConfigFooterQuery("")
  return (
    <footer className="bg-[#1A1F2C] text-white pt-16 pb-6">
      <div className="container mx-auhref px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold mb-6">Project Estates</h3>
            <p className="text-[#9F9EA1] mb-6 leading-relaxed">
              Premium real estate investment opportunities with exceptional returns and long-term growth potential across strategic locations.
            </p>
            <div className="flex space-x-4">
            {ConfigData?.socialHandles.facebook && (
                  <Link href={ConfigData?.socialHandles.facebook}>
                    <FacebookIcon className="text-sm" />
                  </Link>
                )}

                {ConfigData?.socialHandles.twitter && (
                  <Link href={ConfigData.socialHandles.twitter}>
                    <InstagramLogoIcon />
                  </Link>
                )}

                
                {ConfigData?.socialHandles.linkedin && (
                  <Link href={ConfigData.socialHandles.linkedin}>
                    <LinkedInLogoIcon />
                  </Link>
                )}

            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-[#9F9EA1] hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-estates-primary rounded-full mr-2"></span>
                  About
                </Link>
              </li>
              <li>
                <Link href="/projectdescription" className="text-[#9F9EA1] hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-estates-primary rounded-full mr-2"></span>
                  Project Description
                </Link>
              </li>
              <li>
                <Link href="/investorelations" className="text-[#9F9EA1] hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-estates-primary rounded-full mr-2"></span>
                  Investor Relations
                </Link>
              </li>              
              <li>
                <Link href="/newsInsights" className="text-[#9F9EA1] hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-estates-primary rounded-full mr-2"></span>
                  News & Insights
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-[#9F9EA1] hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-estates-primary rounded-full mr-2"></span>
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: More Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">More Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faqs" className="text-[#9F9EA1] hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-estates-primary rounded-full mr-2"></span>
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/conditionsofuse" className="text-[#9F9EA1] hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-estates-primary rounded-full mr-2"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacypolicy" className="text-[#9F9EA1] hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-estates-primary rounded-full mr-2"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#9F9EA1] hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-estates-primary rounded-full mr-2"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#0EA5E9] mt-1 mr-3 flex-shrink-0" />
                <span className="text-[#9F9EA1]">
                  {ConfigData?.address}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-[#0EA5E9] mr-3 flex-shrink-0" />
                <div className="text-[#9F9EA1]">
                  <div>{ConfigData?.phone}</div>
                  {/* <div>+977-9843260542</div> */}
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[#0EA5E9] mr-3 flex-shrink-0" />
                <a href={ConfigData?.email} className="text-[#9F9EA1] hover:text-white transition-colors">
                  {ConfigData?.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[#8E9196] text-sm">
          <p>© 2025 Project Estates Pvt. Ltd.</p>
          <p className="mt-2 md:mt-0">Developed By: <a href="https://clockb.com" target="_blank" rel="noopener noreferrer" className="text-[#0EA5E9] hover:underline">Clock b Business Technology</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
