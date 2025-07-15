import { NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/lib/auth"
import prisma from "@/lib/db"
import { Role } from "@prisma/client" // Updated import
import { sendEmail } from "@/lib/email"

// Get all job openings (Admin only)
export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user || user.role !== Role.admin) {
      // Updated enum value
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const jobs = await prisma.job.findMany({
      // Renamed model
      orderBy: { createdAt: "desc" }, // Updated field name
    })
    return NextResponse.json({ jobs }, { status: 200 })
  } catch (error) {
    console.error("Error fetching job openings:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Create a new job opening (Admin only)
export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user || user.role !== Role.admin) {
      // Updated enum value
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const {
      title,
      department,
      location,
      type,
      experience,
      salary,
      description,
      requirements,
      responsibilities,
      benefits,
      published,
      featured,
    } = await request.json()

    if (
      !title ||
      !department ||
      !location ||
      !type ||
      !experience ||
      !description ||
      !requirements ||
      !responsibilities ||
      !benefits
    ) {
      return NextResponse.json({ message: "All required fields are missing" }, { status: 400 })
    }

    const newJob = await prisma.job.create({
      // Renamed model
      data: {
        title,
        department,
        location,
        type,
        experience,
        salary,
        description,
        requirements,
        responsibilities,
        benefits,
        published,
        featured,
        userId: user.id, // Updated field name
      },
    })

    // Send email notification for new job posting
    if (published) {
      await sendEmail({
        to: user.email, // Or a dedicated admin email
        subject: `New Job Posted: ${newJob.title}`,
        html: `<h1>A new job opening has been posted!</h1><p>Title: ${newJob.title}</p><p>Department: ${newJob.department}</p><p>Location: ${newJob.location}</p><p>Don't miss out on this opportunity!</p>`,
      })
    }

    return NextResponse.json({ message: "Job opening created successfully", job: newJob }, { status: 201 })
  } catch (error) {
    console.error("Error creating job opening:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Update a job opening (Admin only)
export async function PUT(request: Request) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user || user.role !== Role.admin) {
      // Updated enum value
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const {
      id,
      title,
      department,
      location,
      type,
      experience,
      salary,
      description,
      requirements,
      responsibilities,
      benefits,
      published,
      featured,
    } = await request.json()

    if (
      !id ||
      !title ||
      !department ||
      !location ||
      !type ||
      !experience ||
      !description ||
      !requirements ||
      !responsibilities ||
      !benefits
    ) {
      return NextResponse.json({ message: "All required fields are missing" }, { status: 400 })
    }

    const updatedJob = await prisma.job.update({
      // Renamed model
      where: { id },
      data: {
        title,
        department,
        location,
        type,
        experience,
        salary,
        description,
        requirements,
        responsibilities,
        benefits,
        published,
        featured,
      },
    })

    return NextResponse.json({ message: "Job opening updated successfully", job: updatedJob }, { status: 200 })
  } catch (error) {
    console.error("Error updating job opening:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Delete a job opening (Admin only)
export async function DELETE(request: Request) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user || user.role !== Role.admin) {
      // Updated enum value
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ message: "Job ID is required" }, { status: 400 })
    }

    await prisma.job.delete({ where: { id } }) // Renamed model

    return NextResponse.json({ message: "Job opening deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting job opening:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
