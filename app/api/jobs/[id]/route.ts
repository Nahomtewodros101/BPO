import { NextResponse } from "next/server"
import prisma from "@/lib/db"

// Get a single job opening by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ message: "Job ID is required" }, { status: 400 })
    }

    const job = await prisma.jobOpening.findUnique({
      where: { id },
    })

    if (!job) {
      return NextResponse.json({ message: "Job opening not found" }, { status: 404 })
    }

    return NextResponse.json({ job }, { status: 200 })
  } catch (error) {
    console.error("Error fetching job opening:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
