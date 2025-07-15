"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image?: string | null;
  createdAt: string;
  category: string;
  author: string;
  published: boolean;
  featured: boolean;
  publishedAt?: string | null;
}

export default function NewsArticlePage() {
  const params = useParams();
  const articleId = params.id as string;
  const router = useRouter();

  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/news/${articleId}`);
      if (response.ok) {
        const data = await response.json();
        setArticle(data.article);
      } else {
        router.push("/news"); // Redirect if article not found
      }
    } catch (error) {
      console.error("Error fetching news article:", error);

      router.push("/news");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-120px)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!article) {
    return null; // Should be handled by router.push("/news")
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)] items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-4xl">
        {article.image && (
          <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-t-lg">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              className="object-center"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-4xl font-bold leading-tight">
            {article.title}
          </CardTitle>
          <CardDescription className="text-md text-gray-600 dark:text-gray-400 mt-2">
            By {article.author} |{" "}
            {new Date(article.createdAt).toLocaleDateString()} |{" "}
            {article.category}
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p className="text-lg font-semibold mb-4">{article.excerpt}</p>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </CardContent>
        <div className="p-6 border-t flex justify-end">
          <Button asChild variant="outline">
            <Link href="/news">Back to News</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
