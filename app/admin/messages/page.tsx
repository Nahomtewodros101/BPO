"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Trash2, Loader2 } from "lucide-react" // Added icons
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Added Select

interface ContactMessage {
  id: string
  firstName: string // Changed from name
  lastName: string // Changed from name
  email: string
  subject?: string | null // Optional
  message: string
  createdAt: string
  status: "unread" | "read" | "replied" | "closed" // Changed from isRead
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState<string | null>(null) // Stores ID of message being updated

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/messages")
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages)
      } else {
       
      }
    } catch (error) {
      console.error("Error fetching messages:", error)
     
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (messageId: string, newStatus: ContactMessage["status"]) => {
    // Changed function name and status type
    setIsUpdating(messageId)
    try {
      const response = await fetch("/api/admin/messages", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: messageId, status: newStatus }), // Updated field name
      })

      if (response.ok) {
       
        fetchMessages()
      } else {
        const errorData = await response.json()
       
      }
    } catch (error) {
      console.error("Status update error:", error)
     
    } finally {
      setIsUpdating(null)
    }
  }

  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return

    try {
      const response = await fetch("/api/admin/messages", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: messageId }),
      })

      if (response.ok) {
        
        fetchMessages()
      } else {
        const errorData = await response.json()
        
      }
    } catch (error) {
      console.error("Message deletion error:", error)
      
    }
  }

  const getStatusBadgeVariant = (status: ContactMessage["status"]) => {
    switch (status) {
      case "unread":
        return "default"
      case "read":
        return "secondary"
      case "replied":
        return "success" // Assuming a 'success' variant exists or can be added
      case "closed":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Contact Messages</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          </div>
        ) : messages.length === 0 ? (
          <p className="text-center text-muted-foreground">No contact messages found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Received On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message) => (
                <TableRow
                  key={message.id}
                  className={
                    message.status === "read" || message.status === "replied" || message.status === "closed"
                      ? "text-muted-foreground"
                      : "font-semibold"
                  }
                >
                  <TableCell>
                  </TableCell>
                  <TableCell>
                    {message.firstName} {message.lastName}
                  </TableCell>{" "}
                  {/* Updated */}
                  <TableCell>{message.email}</TableCell>
                  <TableCell>{message.subject || "N/A"}</TableCell> {/* Optional subject */}
                  <TableCell className="max-w-[200px] truncate">{message.message}</TableCell>
                  <TableCell>{new Date(message.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Select
                      value={message.status}
                      onValueChange={(newStatus: ContactMessage["status"]) => handleUpdateStatus(message.id, newStatus)}
                      disabled={isUpdating === message.id}
                    >
                      <SelectTrigger className="w-[120px] mr-2">
                        <SelectValue placeholder="Change Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unread">Unread</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                        <SelectItem value="replied">Replied</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteMessage(message.id)}
                      disabled={isUpdating === message.id}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete Message</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
