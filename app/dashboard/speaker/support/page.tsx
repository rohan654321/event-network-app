// app/dashboard/speaker/support/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Clock, CheckCircle, AlertCircle, Plus, Search } from "lucide-react"

interface SupportTicket {
  id: string
  subject: string
  category: string
  status: "open" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  createdAt: string
  updatedAt: string
  lastMessage: string
}

export default function SupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "TKT-001",
      subject: "Audio issues during live session",
      category: "Technical",
      status: "resolved",
      priority: "high",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-12",
      lastMessage: "Issue has been resolved with audio settings adjustment"
    },
    {
      id: "TKT-002",
      subject: "Presentation upload failed",
      category: "Technical",
      status: "in-progress",
      priority: "medium",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-16",
      lastMessage: "Our team is investigating the upload issue"
    }
  ])

  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "",
    priority: "medium",
    message: ""
  })

  const getStatusBadge = (status: string) => {
    const statusMap = {
      open: { label: "Open", variant: "default" as const },
      "in-progress": { label: "In Progress", variant: "secondary" as const },
      resolved: { label: "Resolved", variant: "default" as const },
      closed: { label: "Closed", variant: "outline" as const }
    }
    const statusInfo = statusMap[status as keyof typeof statusMap]
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const priorityMap = {
      low: { label: "Low", variant: "outline" as const },
      medium: { label: "Medium", variant: "secondary" as const },
      high: { label: "High", variant: "default" as const },
      urgent: { label: "Urgent", variant: "destructive" as const }
    }
    const priorityInfo = priorityMap[priority as keyof typeof priorityMap]
    return <Badge variant={priorityInfo.variant}>{priorityInfo.label}</Badge>
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "closed":
        return <CheckCircle className="h-4 w-4 text-gray-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-orange-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Support</h1>
          <p className="text-muted-foreground">Get help with technical issues and platform questions</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Ticket
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Create New Ticket */}
        <Card>
          <CardHeader>
            <CardTitle>Create Support Ticket</CardTitle>
            <CardDescription>Need help? Create a new support ticket and our team will assist you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Brief description of your issue..."
                value={newTicket.subject}
                onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newTicket.category}
                  onValueChange={(value) => setNewTicket(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="account">Account</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newTicket.priority}
                  onValueChange={(value) => setNewTicket(prev => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Description</Label>
              <Textarea
                id="message"
                placeholder="Please provide detailed information about your issue..."
                rows={5}
                value={newTicket.message}
                onChange={(e) => setNewTicket(prev => ({ ...prev, message: e.target.value }))}
              />
            </div>

            <Button className="w-full">Submit Ticket</Button>
          </CardContent>
        </Card>

        {/* Support Tickets */}
        <Card>
          <CardHeader>
            <CardTitle>Your Support Tickets</CardTitle>
            <CardDescription>Track the status of your support requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Search and Filter */}
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search tickets..." className="pl-8" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tickets List */}
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <Card key={ticket.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(ticket.status)}
                          <div>
                            <p className="font-medium">{ticket.subject}</p>
                            <p className="text-sm text-muted-foreground">#{ticket.id} • {ticket.category}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {ticket.lastMessage}
                      </p>

                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">
                          Created: {ticket.createdAt}
                        </span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Help Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Help Resources</CardTitle>
          <CardDescription>Find answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Technical Setup",
                description: "Audio, video, and presentation setup guides",
                count: "12 articles"
              },
              {
                title: "Session Management",
                description: "Managing your sessions and materials",
                count: "8 articles"
              },
              {
                title: "Payment & Billing",
                description: "Contracts, invoices, and payment information",
                count: "6 articles"
              },
              {
                title: "Platform Guide",
                description: "How to use speaker dashboard features",
                count: "15 articles"
              }
            ].map((resource, index) => (
              <Card key={index} className="cursor-pointer hover:bg-accent">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                  <p className="text-xs text-blue-600">{resource.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Support Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 hours</div>
            <p className="text-xs text-muted-foreground">Faster than average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Requiring attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Of tickets resolved</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}