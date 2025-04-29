
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Clock, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';
import BlogSidebar from './BlogSidebar';

const BlogPost = () => {
  const location = useLocation();
  const { blog } = location.state || {
    blog: {
      title: "Blog Post Not Found",
      author: "Unknown",
      date: "Unknown",
      readTime: "0 min",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=1200&auto=format&fit=crop&q=80",
      content: "This blog post could not be found. Please go back to the blog list.",
    }
  };

  // Function to render content paragraphs
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-6 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[60vh] bg-slate-900 mt-20">
        <div className="absolute inset-0">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <span className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                {blog.author}
              </span>
              <span className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {blog.date}
              </span>
              <span className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                {blog.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-2/3">
            <article className="prose prose-sm sm:prose lg:prose-lg max-w-none">
              {renderContent(blog.content)}
              
              {/* Extended content for better reading experience */}
              {renderContent("The real estate market continues to evolve rapidly in response to broader economic trends, technological advancements, and shifting consumer preferences. Understanding these dynamics is crucial for investors seeking to optimize their portfolios and capitalize on emerging opportunities.\n\nOne key trend worth noting is the increased emphasis on sustainable building practices and energy efficiency. Properties with green certifications are not only attracting environmentally conscious tenants but also commanding premium valuations in the market. This shift reflects a growing recognition that sustainable buildings often deliver superior operational performance while aligning with broader environmental, social, and governance (ESG) objectives.\n\nAnother significant development is the continued transformation of commercial spaces in response to changing work patterns. The pandemic has accelerated the adoption of hybrid work models, prompting businesses to reevaluate their office space requirements. This has led to increased demand for flexible, collaborative environments that support a mix of in-person and remote work arrangements.\n\nIn the residential sector, preferences are evolving as well. The desire for larger living spaces with dedicated work areas remains strong, particularly in suburban and exurban locations. This trend is reshaping development priorities and creating new opportunities in previously overlooked markets.")}
            </article>
            
            {/* Social Sharing */}
            <div className="mt-8 p-6 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Share this article</h3>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm">Facebook</Button>
                <Button variant="outline" size="sm">Twitter</Button>
                <Button variant="outline" size="sm">LinkedIn</Button>
                <Button variant="outline" size="sm">Email</Button>
              </div>
            </div>
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

export default BlogPost;
