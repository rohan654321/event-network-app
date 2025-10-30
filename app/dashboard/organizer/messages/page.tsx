"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send, Paperclip, Smile, MoreVertical, Clock, CheckCheck, MessageSquare } from "lucide-react"
import { useState } from "react"

interface Message {
  id: string
  sender: string
  avatar: string
  content: string
  timestamp: string
  unread: boolean
  isOwn: boolean
}

interface Conversation {
  id: string
  name: string
  avatar: string
  role: string
  lastMessage: string
  timestamp: string
  unread: number
  online: boolean
  messages: Message[]
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string>("1")
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const conversations: Conversation[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "/avatars/sarah.jpg",
      role: "Event Speaker",
      lastMessage: "Looking forward to the keynote!",
      timestamp: "2 min ago",
      unread: 0,
      online: true,
      messages: [
        {
          id: "1",
          sender: "Sarah Johnson",
          avatar: "/avatars/sarah.jpg",
          content: "Hi! I'm excited about the upcoming event",
          timestamp: "10:30 AM",
          unread: false,
          isOwn: false,
        },
        {
          id: "2",
          sender: "You",
          avatar: "",
          content: "Great to have you on board! The schedule is almost ready.",
          timestamp: "10:32 AM",
          unread: false,
          isOwn: true,
        },
        {
          id: "3",
          sender: "Sarah Johnson",
          avatar: "/avatars/sarah.jpg",
          content: "Looking forward to the keynote!",
          timestamp: "10:33 AM",
          unread: false,
          isOwn: false,
        },
      ],
    },
    {
      id: "2",
      name: "Mike Chen",
      avatar: "/avatars/mike.jpg",
      role: "Venue Manager",
      lastMessage: "The venue will be ready by 8 AM",
      timestamp: "1 hour ago",
      unread: 2,
      online: false,
      messages: [
        {
          id: "1",
          sender: "Mike Chen",
          avatar: "/avatars/mike.jpg",
          content: "The venue setup is progressing well",
          timestamp: "9:15 AM",
          unread: false,
          isOwn: false,
        },
        {
          id: "2",
          sender: "You",
          avatar: "",
          content: "That's great news! Any issues with the AV equipment?",
          timestamp: "9:20 AM",
          unread: false,
          isOwn: true,
        },
        {
          id: "3",
          sender: "Mike Chen",
          avatar: "/avatars/mike.jpg",
          content: "The venue will be ready by 8 AM",
          timestamp: "9:25 AM",
          unread: true,
          isOwn: false,
        },
      ],
    },
    {
      id: "3",
      name: "Emily Davis",
      avatar: "/avatars/emily.jpg",
      role: "Sponsor",
      lastMessage: "Can we discuss the booth placement?",
      timestamp: "3 hours ago",
      unread: 1,
      online: true,
      messages: [],
    },
    {
      id: "4",
      name: "Tech Team",
      avatar: "/avatars/tech-team.jpg",
      role: "Group",
      lastMessage: "Alex: Live stream setup complete",
      timestamp: "5 hours ago",
      unread: 0,
      online: false,
      messages: [],
    },
  ]

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const currentConversation = conversations.find(conv => conv.id === selectedConversation)

  const handleSendMessage = () => {
    if (!newMessage.trim() || !currentConversation) return

    // In a real app, you would send this to your backend
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "You",
      avatar: "",
      content: newMessage,
      timestamp: "Just now",
      unread: false,
      isOwn: true,
    }

    // Update the conversation with new message
    currentConversation.messages.push(newMsg)
    setNewMessage("")
  }

  return (
    <DashboardShell role="organizer" title="Messages">
      <div className="grid grid-cols-1 lg:grid-cols-3 h-[calc(100vh-200px)] gap-6">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Conversations</CardTitle>
              <Badge variant="secondary">{conversations.length}</Badge>
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
                    selectedConversation === conversation.id
                      ? "bg-muted"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm truncate">{conversation.name}</p>
                      <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                      {conversation.unread > 0 && (
                        <Badge variant="destructive" className="h-5 w-5 p-0 text-xs flex items-center justify-center">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-primary mt-1">{conversation.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col">
          {currentConversation ? (
            <>
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentConversation.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{currentConversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{currentConversation.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{currentConversation.role}</span>
                        {currentConversation.online && (
                          <span className="text-xs text-green-600 flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-600 rounded-full" />
                            Online
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.isOwn ? "flex-row-reverse" : ""}`}
                  >
                    {!message.isOwn && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`max-w-[70%] ${message.isOwn ? "text-right" : ""}`}>
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.isOwn
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        {message.isOwn && <CheckCheck className="w-3 h-3" />}
                        <span>{message.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Button onClick={handleSendMessage} size="icon" disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a conversation to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </DashboardShell>
  )
}