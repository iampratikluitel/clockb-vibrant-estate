"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { blogs } from '@/data/blogs';
import { Card, CardContent } from '@/components/ui/card';
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
import BlogSidebar from './components/BlogSidebar';

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;
  
  // Get current blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  
  // Calculate total pages
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
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
    
    // Show ellipsis if there are more than 3 pages and current page is > 2
    if (totalPages > 3 && currentPage > 2) {
      pageNumbers.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Current page (if not 1 or last)
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
    
    // Show ellipsis if there are more than 3 pages and current page is < totalPages - 1
    if (totalPages > 3 && currentPage < totalPages - 1) {
      pageNumbers.push(
        <PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always show last page if more than 1 page
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
            Blog & News
          </h1>
          <p className="mt-4 text-slate-300 text-center max-w-2xl mx-auto">
            Stay updated with the latest insights, market trends, and expert analyses in the world of real estate investment.
          </p>
        </div>
      </div>

      {/* Blog and Sidebar Layout */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-2/3">
            <div className="grid grid-cols-1 gap-8">
              {currentBlogs.map((blog) => (
                <Card key={blog.id} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-[200px] md:h-auto">
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {blog.date}
                        </span>
                        <span className="flex items-center">
                          <User className="mr-1 h-4 w-4" />
                          {blog.author}
                        </span>
                        <span className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {blog.readTime}
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold mb-3">
                        <Link 
                          href='/blog/BlogPost'
                        //   state={{ blog }}
                          className="hover:text-primary transition-colors"
                        >
                          {blog.title}
                        </Link>
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        {blog.excerpt}
                      </p>
                      <div className="mt-auto">
                        <Button variant="outline" asChild>
                          <Link href='/blog/BlogPost'>
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
            <BlogSidebar />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;
