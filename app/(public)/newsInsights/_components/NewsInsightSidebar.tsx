"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import {
  useGetPublicNewsInsightBySlugQuery,
  useGetPublicNewsInsightsCategoryQuery,
  useGetPublicNewsInsightsQuery,
} from "@/store/api/Public/publicNewsInsight";
import { paths } from "@/lib/paths";

const NewsInsightsSidebar = () => {
  const { slug } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: NewsInsight } = useGetPublicNewsInsightsQuery("");
  const { data: NewsInsightBySlug } = useGetPublicNewsInsightBySlugQuery(
    slug as string
  );
  const { data: NewsInsightCategories } =
    useGetPublicNewsInsightsCategoryQuery("");

  const recentPosts = NewsInsight
    ? NewsInsight.filter(
        (newsinsight) => newsinsight._id !== NewsInsightBySlug?._id
      ).slice(0, 5)
    : [];

  const filteredPosts = NewsInsight
    ? NewsInsight.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-8">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <Button
              className="absolute right-0 top-0 h-full px-3 py-2 rounded-l-none"
              variant="outline"
              onClick={() => {}}
            >
              Search
            </Button>
          </div>

          {/* Optional: Show search results */}
          {searchTerm && (
            <div className="mt-4 space-y-3">
              {filteredPosts.slice(0, 5).map((post) => (
                <div key={post._id} className="text-sm">
                  <Link
                    href={`${paths.public.newsInsight}/${post.slug}`}
                    className="hover:text-primary transition-colors block"
                  >
                    {post.title}
                  </Link>
                  <Separator />
                </div>
              ))}
              {filteredPosts.length === 0 && (
                <p className="text-sm text-muted-foreground">No results found.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {NewsInsightCategories &&
              NewsInsightCategories.length > 0 &&
              NewsInsightCategories.slice(0, 5).map((category, index) => (
                <li key={index}>
                  <Link
                    href={`${paths.public.categorizedNews}?category=${category.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    {category.name}
                  </Link>
                  <Separator className="mt-2" />
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post._id} className="flex gap-3">
                <img
                  src={`/api/resources/download?filename=${encodeURIComponent(
                    post.image
                  )}`}
                  alt={post.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="font-medium line-clamp-2 text-sm">
                    <Link
                      href={`${paths.public.newsInsight}/${post.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h4>
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(post?.addedDate || "").toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsInsightsSidebar;
