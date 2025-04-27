
'use client'

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

const articles: NewsArticle[] = [
  {
    id: 1,
    title: "Market Trends: Commercial Real Estate in 2023",
    excerpt: "Exploring the latest trends in commercial real estate markets and what investors should watch for.",
    category: "Market Analysis",
    date: "June 12, 2023",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "The Rise of Sustainable Property Investments",
    excerpt: "How eco-friendly properties are becoming the most sought-after assets in today's investment landscape.",
    category: "Investment Strategy",
    date: "July 23, 2023",
    image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Property Tax Changes: What Investors Need to Know",
    excerpt: "Recent legislative changes affecting property taxes and how they impact your investment portfolio.",
    category: "Regulations",
    date: "August 8, 2023",
    image: "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "Diversifying Your Real Estate Portfolio",
    excerpt: "Strategies for building a resilient property portfolio across different market segments and locations.",
    category: "Portfolio Management",
    date: "September 15, 2023",
    image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=600&auto=format&fit=crop&q=80"
  }
];

const NewsInsights = () => {
  return (
    <section className="py-16 bg-estates-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            News & Updates
          </h2>
          <div className="w-20 h-1 bg-estates-primary mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Stay informed with the latest insights and developments in real estate investment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <div 
              key={article.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-medium text-estates-primary bg-blue-50 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">{article.date}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <Button variant="ghost" className="text-estates-primary p-0 h-auto">
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button 
            className="bg-estates-primary hover:bg-estates-primary/90 text-white px-6" 
            size="lg"
          >
            View More Articles
            <ArrowRight className="ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsInsights;
