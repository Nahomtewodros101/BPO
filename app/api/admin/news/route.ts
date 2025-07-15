import { NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/lib/auth"
import prisma from "@/lib/db"
import { Role } from "@prisma/client" // Updated import
import { uploadFileToBlob } from "@/lib/blob"
import { sendEmail } from "@/lib/email"

// Get all news articles (Admin only)
export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user || user.role !== Role.admin) {
      // Updated enum value
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const articles = await prisma.newsArticle.findMany({
      orderBy: { createdAt: "desc" }, // Updated field name
    })
    return NextResponse.json({ articles }, { status: 200 })
  } catch (error) {
    console.error("Error fetching news articles:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Create a new news article (Admin only)
export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user || user.role !== Role.admin) {
      // Updated enum value
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const excerpt = formData.get("excerpt") as string
    const category = formData.get("category") as string
    const author = formData.get("author") as string // Added author
    const published = formData.get("published") === "true"
    const featured = formData.get("featured") === "true" // Added featured
    const imageFile = formData.get("image") as File | null

    if (!title || !content || !excerpt || !category || !author) {
      // Added author to required fields
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    let imageUrl: string | undefined
    if (imageFile) {
      const filename = `${Date.now()}-${imageFile.name}`
      imageUrl = await uploadFileToBlob(imageFile, `news-images/${filename}`)
    }

    const newArticle = await prisma.newsArticle.create({
      data: {
        title,
        content,
        excerpt,
        category,
        author, // Added author
        published,
        featured, // Added featured
        image: imageUrl,
        userId: user.id, // Updated field name
        publishedAt: published ? new Date() : null, // Set publishedAt if published
      },
    })

    if (published) {
      // Optionally send email to subscribers about new news (more complex, requires subscriber list)
      await sendEmail({
        to: user.email, // Placeholder, ideally to a mailing list
        subject: `New Announcement: ${newArticle.title}`,
        html: `<h1>New Announcement from MJDAT Solutions!</h1><p>${newArticle.excerpt}</p><p>Read more: <a href="/news/${newArticle.id}">${newArticle.title}</a></p>`,
      })
    }

    return NextResponse.json({ message: "News article created successfully", article: newArticle }, { status: 201 })
  } catch (error) {
    console.error("Error creating news article:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Update a news article (Admin only)
export async function PUT(request: Request) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user || user.role !== Role.admin) {
      // Updated enum value
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const id = formData.get("id") as string
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const excerpt = formData.get("excerpt") as string
    const category = formData.get("category") as string
    const author = formData.get("author") as string // Added author
    const published = formData.get("published") === "true"
    const featured = formData.get("featured") === "true" // Added featured
    const imageFile = formData.get("image") as File | null
    const existingImageUrl = formData.get("existingImageUrl") as string | null

    if (!id || !title || !content || !excerpt || !category || !author) {
      // Added author to required fields
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    let imageUrl: string | undefined | null = existingImageUrl

    if (imageFile && imageFile.size > 0) {
      const filename = `${Date.now()}-${imageFile.name}`
      imageUrl = await uploadFileToBlob(imageFile, `news-images/${filename}`)
    } else if (imageFile && imageFile.size === 0 && existingImageUrl === "null") {
      // If an empty file is submitted and no existing image, clear the image
      imageUrl = null
    }

    const updatedArticle = await prisma.newsArticle.update({
      where: { id },
      data: {
        title,
        content,
        excerpt,
        category,
        author, // Added author
        published,
        featured, // Added featured
        image: imageUrl,
        publishedAt: published ? new Date() : null, // Update publishedAt based on published status
      },
    })

    return NextResponse.json({ message: "News article updated successfully", article: updatedArticle }, { status: 200 })
  } catch (error) {
    console.error("Error updating news article:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Delete a news article (Admin only)
export async function DELETE(request: Request) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user || user.role !== Role.admin) {
      // Updated enum value
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ message: "Article ID is required" }, { status: 400 })
    }

    await prisma.newsArticle.delete({ where: { id } })

    return NextResponse.json({ message: "News article deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting news article:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
