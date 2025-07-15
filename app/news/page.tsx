"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Search, Filter } from "lucide-react";

// Geometric Components
const GeometricDiamond = ({ className = "", size = "w-16 h-16" }) => (
  <div className={`${size} ${className} relative`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern
          id="diamondPattern"
          x="0"
          y="0"
          width="25"
          height="25"
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points="12.5,0 25,12.5 12.5,25 0,12.5"
            fill="#10b981"
            opacity="0.8"
          />
          <polygon
            points="12.5,0 25,12.5 12.5,25 0,12.5"
            fill="#059669"
            opacity="0.6"
            transform="rotate(45 12.5 12.5)"
          />
        </pattern>
      </defs>
      <polygon
        points="50,10 80,30 70,70 30,70 20,30"
        fill="url(#diamondPattern)"
        transform="rotate(45 50 50)"
      />
      <polygon
        points="50,15 75,35 65,65 35,65 25,35"
        fill="#0d9488"
        opacity="0.7"
        transform="rotate(45 50 50)"
      />
      <polygon
        points="50,20 70,40 60,60 40,60 30,40"
        fill="#134e4a"
        opacity="0.9"
        transform="rotate(45 50 50)"
      />
    </svg>
  </div>
);

const GeometricAccent = ({ className = "" }) => (
  <div className={`${className} absolute`}>
    <div className="w-2 h-20 bg-emerald-500 mb-4"></div>
    <div className="w-2 h-16 bg-emerald-400 mb-4"></div>
    <div className="w-2 h-12 bg-emerald-300"></div>
  </div>
);

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  category: string;
  author: string;
  readTime?: string;
  image?: string;
  featured: boolean;
  admin?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const categories = [
  "All",
  "Company News",
  "Product Update",
  "Achievement",
  "Partnership",
  "Financial",
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchNews();
  }, [currentPage, selectedCategory]);

  const fetchNews = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "9",
        published: "true",
      });

      if (selectedCategory !== "All") {
        params.append("category", selectedCategory);
      }

      const response = await fetch(`/api/admin/news?${params}`);
      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles || []);
        setTotalPages(data.pagination?.pages || 1);
      } else {
        // Fallback to mock data
        setArticles([
          {
            id: "1",
            title: "MJDAT Solutions Expands Operations to Southeast Asia",
            excerpt:
              "We're excited to announce our expansion into new markets, bringing our BPO expertise to more businesses across the region.",
            date: "2024-01-15",
            category: "Company News",
            author: "Sarah Mitchell",
            readTime: "5 min read",
            image: "/placeholder.svg?height=400&width=600",
            featured: true,
          },
          {
            id: "2",
            title: "New AI-Powered Customer Service Solutions Launched",
            excerpt:
              "Introducing our latest AI-driven customer support tools that enhance efficiency and customer satisfaction.",
            date: "2024-01-10",
            category: "Product Update",
            author: "Michael Chen",
            readTime: "4 min read",
            image: "/placeholder.svg?height=400&width=600",
            featured: false,
          },
          {
            id: "3",
            title: "MJDAT Solutions Achieves ISO 27001 Certification",
            excerpt:
              "Our commitment to data security and information management has been recognized with this prestigious certification.",
            date: "2024-01-05",
            category: "Achievement",
            author: "Emily Rodriguez",
            readTime: "3 min read",
            image: "/placeholder.svg?height=400&width=600",
            featured: false,
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      // Fallback to mock data
      setArticles([
        {
          id: "1",
          title: "MJDAT Solutions Expands Operations to Southeast Asia",
          excerpt:
            "We're excited to announce our expansion into new markets, bringing our BPO expertise to more businesses across the region.",
          date: "2024-01-15",
          category: "Company News",
          author: "Sarah Mitchell",
          readTime: "5 min read",
          image: "/placeholder.svg?height=400&width=600",
          featured: true,
        },
        {
          id: "2",
          title: "New AI-Powered Customer Service Solutions Launched",
          excerpt:
            "Introducing our latest AI-driven customer support tools that enhance efficiency and customer satisfaction.",
          date: "2024-01-10",
          category: "Product Update",
          author: "Michael Chen",
          readTime: "4 min read",
          image: "/placeholder.svg?height=400&width=600",
          featured: false,
        },
        {
          id: "3",
          title: "MJDAT Solutions Achieves ISO 27001 Certification",
          excerpt:
            "Our commitment to data security and information management has been recognized with this prestigious certification.",
          date: "2024-01-05",
          category: "Achievement",
          author: "Emily Rodriguez",
          readTime: "3 min read",
          image: "/placeholder.svg?height=400&width=600",
          featured: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredNews = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredNews.find((article) => article.featured);
  const regularArticles = filteredNews.filter((article) => !article.featured);

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Header */}
      <section className="py-20 bg-slate-900 dark:bg-slate-950 text-white relative">
        <GeometricAccent className="left-0 top-20" />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/"
              className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>

            <div className="flex items-center mb-6">
              <div className="w-1 h-12 bg-emerald-500 mr-4"></div>
              <GeometricDiamond size="w-12 h-12" className="mr-4" />
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  News & Updates
                </h1>
                <p className="text-xl text-gray-300">
                  Stay informed with the latest news, updates, and announcements
                  from MJDAT Solutions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-emerald-500 hover:bg-emerald-600"
                        : ""
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && selectedCategory === "All" && !searchTerm && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
                Featured Article
              </Badge>

              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-emerald-500/20">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative">
                    <img
                      src={
                        featuredArticle.image ||
                        "/placeholder.svg?height=400&width=600"
                      }
                      alt={featuredArticle.title}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary">
                        {featuredArticle.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(featuredArticle.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {featuredArticle.admin
                          ? `${featuredArticle.admin.firstName} ${featuredArticle.admin.lastName}`
                          : featuredArticle.author}
                      </div>
                      {featuredArticle.readTime && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {featuredArticle.readTime}
                        </div>
                      )}
                    </div>

                    <h2 className="text-3xl font-bold mb-4">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 text-lg">
                      {featuredArticle.excerpt}
                    </p>

                    <Button className="bg-emerald-500 hover:bg-emerald-600 w-fit">
                      Read Full Article
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <Card className="h-full">
                    <CardContent className="p-0">
                      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700"></div>
                      <div className="p-6">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-500/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={
                            article.image ||
                            "/placeholder.svg?height=200&width=300"
                          }
                          alt={article.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="text-xs">
                            {article.category}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(article.date).toLocaleDateString()}
                          </div>
                          {article.readTime && (
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {article.readTime}
                            </div>
                          )}
                        </div>

                        <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <User className="h-3 w-3 mr-1" />
                            {article.admin
                              ? `${article.admin.firstName} ${article.admin.lastName}`
                              : article.author}
                          </div>
                          <Button variant="outline" size="sm">
                            Read More
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {filteredNews.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No articles found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => setCurrentPage(page)}
                      size="sm"
                      className={
                        currentPage === page
                          ? "bg-emerald-500 hover:bg-emerald-600"
                          : ""
                      }
                    >
                      {page}
                    </Button>
                  )
                )}
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
