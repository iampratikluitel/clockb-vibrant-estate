"use client"

import { useState } from "react";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

const Faqs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  const faqCategories = [
    { id: "all", name: "All Questions" },
    { id: "investment", name: "Investment & Returns" },
    { id: "land", name: "Land & Location" },
    { id: "exit", name: "Exit Options & Taxation" },
    { id: "project", name: "Project Development" },
    { id: "getting-started", name: "Getting Started" },
  ];
  
  const faqItems = [
    // Investment & Returns
    {
      id: "item-1",
      category: "investment",
      question: "What is the minimum investment amount?",
      answer: "The minimum investment is NPR 5 Lakhs per investor. For those opting for land exit, the minimum investment required is NPR 48 Lakhs."
    },
    {
      id: "item-2",
      category: "investment",
      question: "How long is the lock-in period for investments?",
      answer: "The lock-in period is 2 years from the date of investment."
    },
    {
      id: "item-3",
      category: "investment",
      question: "What kind of returns can I expect on my investment?",
      answer: "The returns depend on market appreciation, project development, and demand. Based on past trends in similar projects, land value appreciation has been over 2X within a few years."
    },
    {
      id: "item-4",
      category: "investment",
      question: "How and when will I receive my returns?",
      answer: "Investors opting for cash exit will receive their investment amount plus returns after applicable fees and government taxes. Investors choosing land exit will be able to select land equal to their investment + returns, after deductions."
    },
    {
      id: "item-5",
      category: "investment",
      question: "Is my investment secure?",
      answer: "Yes, the investment is legally structured and managed by Investment Circle P. Ltd. All transactions are conducted with complete transparency and legal documentation."
    },
    
    // Land & Location
    {
      id: "item-6",
      category: "land",
      question: "Where is the project located?",
      answer: "The Saukhel Real Estate Project is located 8 KM from Ekantakuna Ring Road and 4.5 KM from Bhaisipati, near the Kathmandu-Terai Fast Track Road and the upcoming Bagmati Bridge."
    },
    {
      id: "item-7",
      category: "land",
      question: "What makes this location ideal for investment?",
      answer: "The site is positioned near major infrastructure projects, including:\n✔️ Kathmandu-Terai Fast Track – Connecting Kathmandu to Nijgadh International Airport.\n✔️ Bagmati Bridge – Connecting Dakshinkali and Lalitpur.\n✔️ Lalitpur Smart City – A planned urban expansion project.\n✔️ Dry Port & Fast Track Bus Stop – Making it a strategic location for residential & commercial use."
    },
    {
      id: "item-8",
      category: "land",
      question: "How much of the project land will be used for infrastructure development?",
      answer: "Approximately 30% of the land will be allocated for roads, open spaces, and amenities in compliance with urban planning regulations (±5% variation expected)."
    },
    {
      id: "item-9",
      category: "land",
      question: "Can I visit the project site?",
      answer: "Yes! We encourage investors to schedule a site visit to see the development firsthand."
    },
    
    // Exit Options & Taxation
    {
      id: "item-10",
      category: "exit",
      question: "What exit options are available for investors?",
      answer: "🔹 Cash Exit: Receive your investment + returns in cash after deductions.\n🔹 Land Exit: Select land matching your investment + returns after applicable fees."
    },
    {
      id: "item-11",
      category: "exit",
      question: "How is land selection priority determined?",
      answer: "Priority is based on investment amount and date of investment completion. Investors with larger and earlier investments will have first choice."
    },
    {
      id: "item-12",
      category: "exit",
      question: "Are there any additional costs I need to pay?",
      answer: "No additional charges for development. However, standard government taxes and management fees will be deducted before returns are disbursed."
    },
    {
      id: "item-13",
      category: "exit",
      question: "Will I be taxed on my investment returns?",
      answer: "Yes, all applicable government taxes will be deducted at source before investors receive their returns."
    },
    
    // Project Development & Management
    {
      id: "item-14",
      category: "project",
      question: "Who is managing the project?",
      answer: "The project is managed by Investment Circle P. Ltd., with key personnels and an experienced Engineering & Planning Partner overseeing all development activities."
    },
    {
      id: "item-15",
      category: "project",
      question: "Can institutional investors participate?",
      answer: "Yes! We facilitate large-scale investments and parallel projects under an institution's name."
    },
    {
      id: "item-16",
      category: "project",
      question: "How do I stay updated on the project's progress?",
      answer: "Investors receive regular progress reports, and we also host annual investor meetings to provide updates on milestones, financials, and future plans."
    },
    
    // Getting Started
    {
      id: "item-17",
      category: "getting-started",
      question: "How do I start investing?",
      answer: "📌 Step 1: Contact our investment team for detailed guidance.\n📌 Step 2: Review the investment agreement & complete legal formalities.\n📌 Step 3: Transfer funds securely via an official banking channel.\n📌 Step 4: Receive investment confirmation & start tracking your returns."
    },
    {
      id: "item-18",
      category: "getting-started",
      question: "Who can I contact for more details?",
      answer: "For more information, reach out to us via:\n📧 Email: info@projestates.com\n📞 Phone: 01-4526267/8\n📍 Office: Furtiman Marg-5, Bishalnagar, Kathmandu, Nepal"
    },
  ];

  // Filter FAQs based on search query and active category
  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-estates-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-estates-secondary mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We understand that investing in real estate is a big decision. Here are some of the most common questions investors ask. If you need more information, feel free to contact us.
          </p>
        </div>
        
        {/* Enhanced Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-estates-primary/20 rounded-xl blur-md transition-all duration-300 group-hover:blur-xl opacity-70"></div>
            <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl">
              <div className="flex items-center px-4 py-3">
                <Search className="text-estates-primary mr-3" size={22} />
                <Input
                  type="text"
                  placeholder="Search for questions or keywords..."
                  className="border-0 shadow-none text-base w-full py-2 px-0 focus-visible:ring-0 focus-visible:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="text-gray-400 hover:text-estates-primary p-1 rounded-full transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Category Tabs */}
        <div className="max-w-3xl mx-auto mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                  ${activeCategory === category.id 
                    ? "bg-estates-primary text-white shadow-md transform scale-105" 
                    : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {filteredFAQs.length > 0 ? (
            <Accordion type="single" collapsible className="divide-y">
              {filteredFAQs.map(faq => (
                <AccordionItem key={faq.id} value={faq.id} className="px-6">
                  <AccordionTrigger className="text-lg font-medium py-5 text-estates-secondary hover:text-estates-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-6 leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-600">No questions found matching &quot;{searchQuery}</p>
              <p className="mt-2 text-estates-primary">Try a different search term or browse all questions by clearing the search.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-4 px-4 py-2 bg-estates-primary text-white rounded-md hover:bg-estates-primary/90 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
        
        {/* Contact Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-estates-secondary mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Get in touch with us today! Our team is ready to assist you with any inquiries you might have.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="mailto:info@projestates.com" 
              className="inline-flex items-center bg-estates-primary hover:bg-estates-primary/90 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl"
            >
              Contact Support
            </a>
            <a 
              href="tel:+9779851079636" 
              className="inline-flex items-center bg-white border border-estates-primary text-estates-primary hover:bg-estates-primary/10 font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Faqs;
