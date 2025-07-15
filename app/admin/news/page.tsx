"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { PlusCircle, Edit, Trash2, Loader2, X } from "lucide-react";
import Image from "next/image";

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image?: string | null;
  createdAt: string; // Changed from date
  category: string;
  author: string; // Added author
  published: boolean;
  featured: boolean; // Added featured
  publishedAt?: string | null; // Added publishedAt
}

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<NewsArticle | null>(
    null
  );
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    author: "", // Added author
    published: false,
    featured: false, // Added featured
    image: null as File | null,
    existingImageUrl: null as string | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/news");
      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles);
      } else {
      console.error("Failed to fetch articles");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
     
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const target = e.target as HTMLInputElement; // Cast to HTMLInputElement for file access

    if (target.type === "file" && target.files) {
      setFormState((prev) => ({ ...prev, [name]: target.files?[0]: null }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormState((prev) => ({ ...prev, [name]: checked }));
  };

  const handleOpenDialog = (article?: NewsArticle) => {
    setCurrentArticle(article || null);
    if (article) {
      setFormState({
        title: article.title,
        content: article.content,
        excerpt: article.excerpt,
        category: article.category,
        author: article.author, // Added author
        published: article.published,
        featured: article.featured, // Added featured
        image: null, // Clear file input when editing
        existingImageUrl: article.image || null,
      });
    } else {
      setFormState({
        title: "",
        content: "",
        excerpt: "",
        category: "",
        author: "",
        published: false,
        featured: false,
        image: null,
        existingImageUrl: null,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    if (currentArticle) {
      formData.append("id", currentArticle.id);
    }
    formData.append("title", formState.title);
    formData.append("content", formState.content);
    formData.append("excerpt", formState.excerpt);
    formData.append("category", formState.category);
    formData.append("author", formState.author); // Added author
    formData.append("published", String(formState.published));
    formData.append("featured", String(formState.featured)); // Added featured
    if (formState.image) {
      formData.append("image", formState.image);
    } else if (currentArticle && formState.existingImageUrl) {
      formData.append("existingImageUrl", formState.existingImageUrl);
    } else if (
      currentArticle &&
      !formState.existingImageUrl &&
      !formState.image
    ) {
      // If an empty file is submitted and no existing image, explicitly set to null
      formData.append("existingImageUrl", "null");
    }

    const method = currentArticle ? "PUT" : "POST";
    const url = "/api/admin/news";

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
       
        fetchArticles();
        setIsDialogOpen(false);
      } else {
        const errorData = await response.json();
       
      }
    } catch (error) {
      console.error("Submission error:", error);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news article?")) return;

    try {
      const response = await fetch("/api/admin/news", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
       
        fetchArticles();
      } else {
        const errorData = await response.json();
       
      }
    } catch (error) {
      console.error("Deletion error:", error);
     
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manage News & Announcements</CardTitle>
        <Button onClick={() => handleOpenDialog()}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Article
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          </div>
        ) : articles.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No news articles found.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead> {/* Added Author */}
                <TableHead>Category</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Featured</TableHead> {/* Added Featured */}
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.author}</TableCell> {/* Display Author */}
                  <TableCell>{article.category}</TableCell>
                  <TableCell>{article.published ? "Yes" : "No"}</TableCell>
                  <TableCell>{article.featured ? "Yes" : "No"}</TableCell>{" "}
                  {/* Display Featured */}
                  <TableCell>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </TableCell>{" "}
                  {/* Changed to createdAt */}
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenDialog(article)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(article.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>
              {currentArticle ? "Edit News Article" : "Add New News Article"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formState.title}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right">
                Author
              </Label>
              <Input
                id="author"
                name="author"
                value={formState.author}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="excerpt" className="text-right">
                Excerpt
              </Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formState.excerpt}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Textarea
                id="content"
                name="content"
                value={formState.content}
                onChange={handleInputChange}
                className="col-span-3 min-h-[150px]"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                name="category"
                value={formState.category}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <div className="col-span-3 flex flex-col gap-2">
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                />
                {formState.existingImageUrl && (
                  <div className="relative w-32 h-20 border rounded-md overflow-hidden">
                    <Image
                      src={formState.existingImageUrl || "/placeholder.svg"}
                      alt="Current Image"
                      layout="fill"
                      objectFit="cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0"
                      onClick={() =>
                        setFormState((prev) => ({
                          ...prev,
                          existingImageUrl: null,
                          image: null,
                        }))
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                {!formState.existingImageUrl && !formState.image && (
                  <p className="text-sm text-muted-foreground">
                    No image selected.
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="published" className="text-right">
                Published
              </Label>
              <Checkbox
                id="published"
                name="published"
                checked={formState.published}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("published", Boolean(checked))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="featured" className="text-right">
                Featured
              </Label>
              <Checkbox
                id="featured"
                name="featured"
                checked={formState.featured}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("featured", Boolean(checked))
                }
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {currentArticle ? "Save Changes" : "Create Article"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
