
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, Share2, ThumbsUp, MessageSquare, Facebook, Twitter, Linkedin, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { blogs } from "@/data/blogs";

const BlogSingle = () => {
  const { slug } = useParams();
  
  // Find the blog with the matching slug
  const blog = blogs.find((blog) => blog.slug === slug);
  
  // If no blog is found with the given slug, show a message
  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-red-500">Blog post not found</h1>
        <p className="mt-4">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link href="/resources">
          <Button className="mt-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resources
          </Button>
        </Link>
      </div>
    );
  }

  // Function to copy the current URL to clipboard
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  // Function to handle social sharing
  const shareOnSocial = (platform: string) => {
    let shareUrl = "";
    const postUrl = encodeURIComponent(window.location.href);
    const postTitle = encodeURIComponent(blog.title);

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${postUrl}&text=${postTitle}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  // Get related blog posts (excluding the current one) based on category match
  const relatedPosts = blogs
    .filter((post) => post.id !== blog.id && post.category === blog.category)
    .slice(0, 3);

  // If we have fewer than 3 related posts based on category, add some random ones
  if (relatedPosts.length < 3) {
    const additionalPosts = blogs
      .filter((post) => post.id !== blog.id && !relatedPosts.includes(post))
      .slice(0, 3 - relatedPosts.length);
    
    relatedPosts.push(...additionalPosts);
  }

  return (
    <main className="pt-24 pb-16 bg-gray-50">
      {/* Hero Section with Featured Image */}
      <div 
        className="w-full h-[40vh] bg-cover bg-center relative" 
        style={{ backgroundImage: `url(${blog.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="container mx-auto px-4 pb-10">
            <Link href="/resources" className="inline-flex items-center text-white hover:text-blue-200 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Resources
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl animate-fade-in">
              {blog.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Post Metadata */}
            <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mb-8">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {blog.date}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {blog.author}
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                <Badge variant="outline">{blog.category}</Badge>
              </div>
            </div>

            {/* Post Excerpt */}
            <div className="text-lg text-gray-700 font-medium mb-6 italic border-l-4 border-estates-primary pl-4 py-2">
              {blog.excerpt}
            </div>

            {/* Post Content */}
            <div className="prose prose-lg max-w-none">
              <p>{blog.content}</p>
              <p>
                Real estate investments in emerging markets present unique opportunities and challenges. The key to success lies in understanding local market dynamics, regulatory frameworks, and economic trends.
              </p>
              <h2>Understanding Market Cycles</h2>
              <p>
                Property markets typically follow predictable cycles of growth, stabilization, decline, and recovery. Astute investors identify where a market sits within this cycle to make informed decisions.
              </p>
              <p>
                Looking at historical data from the Kathmandu Valley region, we can observe clear patterns of appreciation in areas adjacent to infrastructure development projects.
              </p>
              <h2>Key Considerations for Investors</h2>
              <ul>
                <li>Proximity to existing and planned infrastructure</li>
                <li>Regulatory environment and approval processes</li>
                <li>Population growth and demographic shifts</li>
                <li>Economic indicators and employment trends</li>
                <li>Environmental considerations and sustainability</li>
              </ul>
              <blockquote>
                "The best investment on earth is earth." - Louis Glickman
              </blockquote>
              <p>
                As we move forward, sustainability and technological integration will play increasingly important roles in determining property values and investment returns.
              </p>
            </div>

            {/* Tags Section */}
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {["Investment", "Real Estate", "Market Analysis", "Property Development", "ROI"].map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Social Sharing */}
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-2">Share this article</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => shareOnSocial("facebook")}>
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => shareOnSocial("twitter")}>
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => shareOnSocial("linkedin")}>
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={copyLinkToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 bg-gray-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" alt={blog.author} />
                  <AvatarFallback>{blog.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg">{blog.author}</h3>
                  <p className="text-sm text-gray-600">Investment Analyst</p>
                </div>
              </div>
              <p className="text-gray-700">
                With over 15 years of experience in real estate investment and market analysis, 
                our analyst provides insights into emerging property trends and investment opportunities 
                across various markets in Nepal and beyond.
              </p>
            </div>

            {/* Comments Section (Placeholder) */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" /> Comments (5)
              </h3>
              <div className="space-y-6">
                {Array(5).fill(0).map((_, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback>
                          {["JD", "MM", "SK", "RB", "LP"][index]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-sm">
                          {["John Doe", "Mary Miller", "Sujan Karki", "Rajesh Bhattarai", "Lisa Pradhan"][index]}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {["2 days ago", "1 week ago", "2 weeks ago", "1 month ago", "1 month ago"][index]}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">
                      {[
                        "Great analysis! I've been looking at investing in this area for some time.",
                        "I appreciate the insights on market cycles. Very helpful for new investors.",
                        "How does this compare to investments in the Pokhara region?",
                        "The infrastructure development point is key. It's transformed my previous investments.",
                        "Would love to see more analysis on commercial vs residential properties in Kathmandu."
                      ][index]}
                    </p>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <ThumbsUp className="h-3 w-3 mr-1" /> 
                        {[12, 8, 5, 3, 1][index]}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-4 w-full bg-estates-primary hover:bg-estates-primary/90">
                Load More Comments
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            {/* Search */}
            <Card className="mb-8">
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-4">Search Articles</h3>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-estates-primary"
                  />
                  <Button className="rounded-l-none bg-estates-primary hover:bg-estates-primary/90">
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Related Posts */}
            <Card className="mb-8">
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                      <div className="flex gap-3">
                        <div className="w-20 h-20 flex-shrink-0">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm group-hover:text-estates-primary transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="mb-8">
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                  {["Market Analysis", "Investment Strategy", "Property Development", 
                     "Real Estate News", "Regulations"].map((category) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-gray-700 hover:text-estates-primary cursor-pointer">
                        {category}
                      </span>
                      <Badge variant="outline">
                        {Math.floor(Math.random() * 20) + 1}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="mb-8 bg-estates-primary text-white">
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">Subscribe to Newsletter</h3>
                <p className="text-sm mb-4 text-white/80">
                  Stay updated with our latest news, investment opportunities, and market insights.
                </p>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-2 rounded-md mb-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <Button className="w-full bg-white text-estates-primary hover:bg-white/90">
                  Subscribe
                </Button>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-3">Ready to Invest?</h3>
                <p className="mb-4 text-white/90">
                  Explore our current investment opportunities and secure your financial future.
                </p>
                <Link href="/investment-relations">
                  <Button className="w-full bg-white text-blue-700 hover:bg-white/90">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogSingle;
