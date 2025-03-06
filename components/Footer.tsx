import React from "react";
import Link from "next/link"; // Import Next.js Link
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
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
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-estates-primary/10 hover:bg-estates-primary/20 p-2 rounded-full transition-colors"
              >
                <Linkedin className="h-5 w-5 text-[#0EA5E9]" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-estates-primary/10 hover:bg-estates-primary/20 p-2 rounded-full transition-colors"
              >
                <Facebook className="h-5 w-5 text-[#0EA5E9]" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-estates-primary/10 hover:bg-estates-primary/20 p-2 rounded-full transition-colors"
              >
                <Instagram className="h-5 w-5 text-[#0EA5E9]" />
              </a>
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
                <Link href="/projects" className="text-[#9F9EA1] hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-estates-primary rounded-full mr-2"></span>
                  Project Description
                </Link>
              </li>
              <li>
                <Link href="/inveshrefr-relations" className="text-[#9F9EA1] hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-estates-primary rounded-full mr-2"></span>
                  Inveshrefr Relations
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#9F9EA1] hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-estates-primary rounded-full mr-2"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-[#9F9EA1] hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-estates-primary rounded-full mr-2"></span>
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-[#9F9EA1] hover:text-white transition-colors flex items-center">
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
                <Link href="/terms" className="text-[#9F9EA1] hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-estates-primary rounded-full mr-2"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[#9F9EA1] hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-estates-primary rounded-full mr-2"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/career" className="text-[#9F9EA1] hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-estates-primary rounded-full mr-2"></span>
                  Careers
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
                  Kathmandu, Nepal
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-[#0EA5E9] mr-3 flex-shrink-0" />
                <div className="text-[#9F9EA1]">
                  <div>+977-9851079636</div>
                  <div>+977-9843260542</div>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[#0EA5E9] mr-3 flex-shrink-0" />
                <a href="mailhref:Info@projestates.com" className="text-[#9F9EA1] hover:text-white transition-colors">
                  Info@projestates.com
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
