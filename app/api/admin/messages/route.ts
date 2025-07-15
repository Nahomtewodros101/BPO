import { NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/lib/auth"
import prisma from "@/lib/db"
import { Role } from "@prisma/client" // Updated import

// Get all contact messages (Admin only)
export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user || user.role !== Role.admin) {
      // Updated enum value
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json({ messages }, { status: 200 })
  } catch (error) {
    console.error("Error fetching contact messages:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Update a message status (Admin only)
export async function PUT(request: Request) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user || user.role !== Role.admin) {
      // Updated enum value
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id, status } = await request.json() // Changed isRead to status

    if (!id || !["unread", "read", "replied", "closed"].includes(status)) {
      // Updated status values
      return NextResponse.json({ message: "Message ID and valid status are required" }, { status: 400 })
    }

    const updatedMessage = await prisma.contactMessage.update({
      where: { id },
      data: { status }, // Updated field name
    })

    return NextResponse.json({ message: "Message updated successfully", updatedMessage }, { status: 200 })
  } catch (error) {
    console.error("Error updating message status:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Delete a message (Admin only)
export async function DELETE(request: Request) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user || user.role !== Role.admin) {
      // Updated enum value
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ message: "Message ID is required" }, { status: 400 })
    }

    await prisma.contactMessage.delete({ where: { id } })

    return NextResponse.json({ message: "Message deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting message:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
