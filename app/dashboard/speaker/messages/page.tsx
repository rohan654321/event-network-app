"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MoreHorizontal,
  Send,
  Paperclip,
  Smile,
  Clock,
  CheckCheck,
  Filter,
  Archive,
  Trash2,
  Reply,
  Forward,
  Check,
  MessageCircle,
} from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"

interface Message {
  id: string
  from: {
    id: string
    name: string
    avatar?: string
    role: string
    organization: string
  }
  to: string
  subject: string
  content: string
  timestamp: Date
  read: boolean
  type: 'inquiry' | 'booking' | 'general' | 'feedback'
  attachments?: string[]
}

interface Conversation {
  id: string
  participant: {
    id: string
    name: string
    avatar?: string
    role: string
    organization: string
  }
  lastMessage: string
  timestamp: Date
  unread: number
  type: 'inquiry' | 'booking' | 'general'
}

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")

  const conversations: Conversation[] = [
    {
      id: "1",
      participant: {
        id: "1",
        name: "Sarah Johnson",
        role: "organizer",
        organization: "Tech Summit 2025"
      },
      lastMessage: "Looking forward to having you speak at our event!",
      timestamp: new Date("2024-01-15T10:30:00"),
      unread: 0,
      type: "booking"
    },
    {
      id: "2",
      participant: {
        id: "2",
        name: "Mike Chen",
        role: "organizer",
        organization: "Developer Conference"
      },
      lastMessage: "Could you send me your presentation slides?",
      timestamp: new Date("2024-01-14T15:20:00"),
      unread: 2,
      type: "inquiry"
    },
    {
      id: "3",
      participant: {
        id: "3",
        name: "Dr. Emily Roberts",
        role: "speaker",
        organization: "Stanford University"
      },
      lastMessage: "Let's collaborate on the AI workshop",
      timestamp: new Date("2024-01-13T09:15:00"),
      unread: 0,
      type: "general"
    }
  ]

  const messages: Message[] = [
    {
      id: "1",
      from: {
        id: "2",
        name: "Mike Chen",
        role: "organizer",
        organization: "Developer Conference"
      },
      to: "me",
      subject: "Presentation Materials Request",
      content: "Hi! Could you please share your presentation slides for the upcoming conference? We'd like to review them before the event.",
      timestamp: new Date("2024-01-14T15:20:00"),
      read: true,
      type: "inquiry"
    },
    {
      id: "2",
      from: {
        id: "me",
        name: "You",
        role: "speaker",
        organization: ""
      },
      to: "Mike Chen",
      subject: "Re: Presentation Materials Request",
      content: "Sure! I'll send over the slides by tomorrow. They include the latest updates on the project.",
      timestamp: new Date("2024-01-14T16:45:00"),
      read: true,
      type: "inquiry"
    },
    {
      id: "3",
      from: {
        id: "2",
        name: "Mike Chen",
        role: "organizer",
        organization: "Developer Conference"
      },
      to: "me",
      subject: "Re: Presentation Materials Request",
      content: "Great, thank you! Looking forward to receiving them.",
      timestamp: new Date("2024-01-15T09:30:00"),
      read: false,
      type: "inquiry"
    }
  ]

  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = conversation.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (activeTab === "all") return matchesSearch
    return matchesSearch && conversation.type === activeTab
  })

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      inquiry: { label: "Inquiry", variant: "secondary" as const },
      booking: { label: "Booking", variant: "default" as const },
      general: { label: "General", variant: "outline" as const }
    }
    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.general
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  return (
    <DashboardShell role="speaker" title="Messages">
      <div className="h-[calc(100vh-200px)] flex gap-6">
        {/* Conversations List */}
        <Card className="w-1/3 flex flex-col">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Conversations</CardTitle>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="px-6">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="booking">Booking</TabsTrigger>
                <TabsTrigger value="inquiry">Inquiry</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={activeTab} className="flex-1 mt-0">
              <CardContent className="p-0">
                <div className="space-y-1">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedConversation === conversation.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={conversation.participant.avatar} />
                          <AvatarFallback>
                            {conversation.participant.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm truncate">
                              {conversation.participant.name}
                            </h4>
                            {conversation.unread > 0 && (
                              <Badge variant="destructive" className="h-5 px-1 min-w-5">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground truncate mb-1">
                            {conversation.lastMessage}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getTypeBadge(conversation.type)}
                              <span className="text-xs text-muted-foreground">
                                {conversation.participant.role}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {conversation.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Message View */}
        <Card className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={conversations.find(c => c.id === selectedConversation)?.participant.avatar} />
                      <AvatarFallback>
                        {conversations.find(c => c.id === selectedConversation)?.participant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">
                        {conversations.find(c => c.id === selectedConversation)?.participant.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {conversations.find(c => c.id === selectedConversation)?.participant.role} • 
                        {conversations.find(c => c.id === selectedConversation)?.participant.organization}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Reply className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Forward className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Archive className="w-4 h-4 mr-2" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto py-4">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.from.id === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-4 ${
                          message.from.id === 'me'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-sm">
                            {message.from.id === 'me' ? 'You' : message.from.name}
                          </span>
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {message.from.id === 'me' && (
                            message.read ? (
                              <CheckCheck className="w-3 h-3" />
                            ) : (
                              <Check className="w-3 h-3" />
                            )
                          )}
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-[60px] resize-none"
                  />
                  <Button size="sm" onClick={handleSendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No conversation selected</h3>
                <p className="text-muted-foreground">
                  Select a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </DashboardShell>
  )
}