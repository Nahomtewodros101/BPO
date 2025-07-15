"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Send, X, Loader2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
  ])
  const [input, setInput] = useState("")
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === "") return

    const newMessage: Message = { id: messages.length + 1, text: input, sender: "user" }
    setMessages((prev) => [...prev, newMessage])
    setInput("")
    setIsSending(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      })

      if (response.ok) {
        const data = await response.json()
        const botResponse: Message = { id: messages.length + 2, text: data.response, sender: "bot" }
        setMessages((prev) => [...prev, botResponse])
      } else {
        setMessages((prev) => [
          ...prev,
          { id: messages.length + 2, text: "Error: Could not get a response.", sender: "bot" },
        ])
      }
    } catch (error) {
      console.error("Chatbot communication error:", error)
      setMessages((prev) => [
        ...prev,
        { id: messages.length + 2, text: "Error: Network issue or server error.", sender: "bot" },
      ])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg bg-emerald-500 hover:bg-emerald-600 z-50"
          size="icon"
          aria-label="Open Chatbot"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-[450px] flex flex-col shadow-xl z-50 bg-background text-foreground border-emerald-500/30 border-2">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b bg-emerald-500 text-white rounded-t-lg">
            <CardTitle className="text-lg font-semibold">MJDAT Chatbot</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-emerald-600"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close Chatbot</span>
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn("flex items-end gap-2", msg.sender === "user" ? "justify-end" : "justify-start")}
                  >
                    {msg.sender === "bot" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt="Bot Avatar" />
                        <AvatarFallback className="bg-emerald-500 text-white">AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-[70%] rounded-lg p-3 text-sm",
                        msg.sender === "user"
                          ? "bg-emerald-500 text-white rounded-br-none"
                          : "bg-muted text-muted-foreground rounded-bl-none",
                      )}
                    >
                      {msg.text}
                    </div>
                    {msg.sender === "user" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt="User Avatar" />
                        <AvatarFallback className="bg-gray-200 dark:bg-gray-700">You</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isSending && (
                  <div className="flex items-end gap-2 justify-start">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="Bot Avatar" />
                      <AvatarFallback className="bg-emerald-500 text-white">AI</AvatarFallback>
                    </Avatar>
                    <div className="max-w-[70%] rounded-lg p-3 text-sm bg-muted text-muted-foreground rounded-bl-none flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" /> Typing...
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
          <form onSubmit={handleSendMessage} className="flex p-4 border-t">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 mr-2"
              disabled={isSending}
            />
            <Button type="submit" size="icon" disabled={isSending} className="bg-emerald-500 hover:bg-emerald-600">
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </Card>
      )}
    </>
  )
}
