"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send, Paperclip, MoreHorizontal } from "lucide-react"
import { useState } from "react"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(0)
  
  const conversations = [
    {
      id: 1,
      name: "John Smith",
      role: "Event Organizer",
      lastMessage: "Looking forward to the venue tour tomorrow!",
      timestamp: "2 hours ago",
      unread: 2,
      avatar: "/avatars/john-smith.jpg"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Conference Manager",
      lastMessage: "Can we discuss the catering options?",
      timestamp: "5 hours ago",
      unread: 0,
      avatar: "/avatars/sarah-johnson.jpg"
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Startup Founder",
      lastMessage: "Thanks for the quick response!",
      timestamp: "1 day ago",
      unread: 0,
      avatar: "/avatars/michael-chen.jpg"
    },
    {
      id: 4,
      name: "Maintenance Team",
      role: "Internal",
      lastMessage: "HVAC maintenance completed",
      timestamp: "2 days ago",
      unread: 1,
      avatar: "/avatars/maintenance-team.jpg"
    }
  ]

  const messages = [
    {
      id: 1,
      sender: "John Smith",
      content: "Hi! I'm interested in booking your venue for our tech summit.",
      timestamp: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      content: "Great! I'd be happy to help. What dates are you considering?",
      timestamp: "10:32 AM",
      isOwn: true
    },
    {
      id: 3,
      sender: "John Smith",
      content: "We're looking at June 15-17, 2025. What's your availability?",
      timestamp: "10:35 AM",
      isOwn: false
    },
    {
      id: 4,
      sender: "You",
      content: "Those dates are available! Would you like to schedule a venue tour?",
      timestamp: "10:40 AM",
      isOwn: true
    },
    {
      id: 5,
      sender: "John Smith",
      content: "Looking forward to the venue tour tomorrow!",
      timestamp: "11:00 AM",
      isOwn: false
    }
  ]

  return (
    <DashboardShell role="venue-manager" title="Messages">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map((conversation, index) => (
                <div
                  key={conversation.id}
                  className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedConversation === index ? 'bg-muted' : ''
                  }`}
                  onClick={() => setSelectedConversation(index)}
                >
                  <Avatar>
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback>
                      {conversation.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm truncate">{conversation.name}</h4>
                      <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-blue-600">{conversation.role}</span>
                      {conversation.unread > 0 && (
                        <Badge variant="default" className="h-5 px-1.5 text-xs">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={conversations[selectedConversation].avatar} />
                  <AvatarFallback>
                    {conversations[selectedConversation].name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{conversations[selectedConversation].name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{conversations[selectedConversation].role}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.isOwn
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Input
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardShell>
  )
}