"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Header from "@/components/homepage/Header";
import Footer from "@/components/homepage/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  useGetPublicFaqCategoryQuery,
  useGetPublicFaqQuery,
} from "@/store/api/Public/publicFaq";

const Faqs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: faqData, isLoading: isFaqLoading } = useGetPublicFaqQuery("");
  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetPublicFaqCategoryQuery("");

  const faqCategories = [
    { id: "all", name: "All Questions" },
    ...(categoryData?.map((category) => ({
      id: category._id.toString(),
      name: category.name,
    })) || []),
  ];

  // Filter FAQs based on search query and active category
  const filteredFAQs =
    faqData?.filter((item) => {
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        activeCategory === "all" ||
        item.categoryId.toString() === activeCategory;

      return matchesSearch && matchesCategory;
    }) || [];

  // Loading state UI
  // if (isFaqLoading || isCategoryLoading) {
  //   return (
  //     <div className="min-h-screen bg-estates-gray-100">
  //       <Header />
  //       <div className="container mx-auto px-4 pt-32 pb-20 flex justify-center items-center">
  //         <div className="text-center">
  //           <div className="w-16 h-16 border-4 border-estates-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
  //           <p className="text-lg text-gray-600">Loading FAQs...</p>
  //         </div>
  //       </div>
  //       <Footer />
  //     </div>
  //   );
  // }

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
            We understand that investing in real estate is a big decision. Here
            are some of the most common questions investors ask. If you need
            more information, feel free to contact us.
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
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
                  ${
                    activeCategory === category.id
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
              {filteredFAQs.map((faq) => (
                <AccordionItem
                  key={faq._id}
                  value={faq._id.toString()}
                  className="px-6"
                >
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
              <p className="text-lg text-gray-600">
                No questions found matching &quot;{searchQuery}&quot;
              </p>
              <p className="mt-2 text-estates-primary">
                Try a different search term or browse all questions by clearing
                the search.
              </p>
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
            Get in touch with us today! Our team is ready to assist you with any
            inquiries you might have.
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
