"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';
import NewsInsightSidebar from './_components/NewsInsightSidebar';
import { useGetPublicNewsInsightsQuery } from '@/store/api/Public/publicNewsInsight';
import { NEWSINSIGHT } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import { MINIOURL } from '@/lib/constants';
import { paths } from '@/lib/paths';

const NewsInsight = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState(tab || "All")
  const [filteredNews, setFilteredNews] = useState<NEWSINSIGHT[]>([])
  const NewsInsightPerPage = 10;

  const {data: NewsInsight, isLoading: NewsInsightLoading} = useGetPublicNewsInsightsQuery("");

  useEffect(() => {
    if (NewsInsight && NewsInsight.length) {
      filterNews(NewsInsight, currentTab);
    }
  }, [NewsInsight, currentTab])

  useEffect (() => {
    if(NewsInsight && NewsInsight.length) {
      filterNews(NewsInsight, currentTab)
    }
  }, [searchTerm, currentTab])
  
  const filterNews = (newsinsight: NEWSINSIGHT[], currentTab: string) => {
    const filtered = newsinsight.filter((newsinsight) => {
      const matchesSearchTerm = newsinsight.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearchTerm;
    });
    setFilteredNews(filtered);
  }

  const indexOfLastNewsInsight = currentPage * NewsInsightPerPage;
  const indexOfFirstNewsInsight = indexOfLastNewsInsight - NewsInsightPerPage;
  const currentNewsInsight = filteredNews.slice(indexOfFirstNewsInsight, indexOfLastNewsInsight);
  
  const totalPages = Math.ceil(filteredNews.length / NewsInsightPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    
    pageNumbers.push(
      <PaginationItem key={1}>
        <PaginationLink
          onClick={() => handlePageChange(1)}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    if (totalPages > 3 && currentPage > 2) {
      pageNumbers.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageNumbers.push(
        <PaginationItem key={currentPage}>
          <PaginationLink
            onClick={() => handlePageChange(currentPage)}
            isActive={true}
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    if (totalPages > 3 && currentPage < totalPages - 1) {
      pageNumbers.push(
        <PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    if (totalPages > 1) {
      pageNumbers.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return pageNumbers;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 py-16 mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            News & Insight
          </h1>
          <p className="mt-4 text-slate-300 text-center max-w-2xl mx-auto">
            Stay updated with the latest insights, market trends, and expert analyses in the world of real estate investment.
          </p>
        </div>
      </div>

      {/* NewsInsight and Sidebar Layout */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-2/3">
            <div className="grid grid-cols-1 gap-8">
              {currentNewsInsight.map((newsinsight) => (
                <Card key={newsinsight._id} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-[200px] md:h-auto">
                      <img 
                        src={`${MINIOURL}${newsinsight.image}`} 
                        alt={newsinsight.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {new Date(newsinsight.addedDate).toLocaleDateString()}
                          </span>
                        <span className="flex items-center">
                          <User className="mr-1 h-4 w-4" />
                          {newsinsight.author}
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold mb-3">
                        <Link 
                          href={`${paths.public.newsInsight}/${newsinsight.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {newsinsight.title}
                        </Link>
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        {newsinsight.description}
                      </p>
                      <div className="mt-auto">
                        <Button variant="outline" asChild>
                          <Link href={`${paths.public.newsInsight}/${newsinsight.slug}`}>
                            Read More
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Separator className="my-4" />
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {getPageNumbers()}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="md:w-1/3">
            <NewsInsightSidebar />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsInsight;
