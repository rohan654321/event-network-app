"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Calendar, MapPin, Users, MessageSquare, Clock, CheckCircle, XCircle, Eye, Reply } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"

export default function InquiriesPage() {
  const [selectedInquiry, setSelectedInquiry] = useState(0)

  const inquiries = [
    {
      id: "INQ-001",
      name: "Alex Johnson",
      company: "Tech Innovators Inc.",
      email: "alex@techinnovators.com",
      phone: "+1 (555) 123-4567",
      eventType: "Tech Conference",
      attendees: 500,
      date: "2025-08-15",
      budget: "$15,000 - $20,000",
      venue: "San Francisco Convention Center",
      message: "We're interested in hosting our annual tech conference at your venue. Could you please share availability and pricing for August 2025?",
      status: "new",
      priority: "high",
      received: "2 hours ago",
      attachments: 2
    },
    {
      id: "INQ-002",
      name: "Sarah Miller",
      company: "Design Summit Co.",
      email: "sarah@designsummit.com",
      phone: "+1 (555) 123-4568",
      eventType: "Design Workshop",
      attendees: 150,
      date: "2025-07-22",
      budget: "$5,000 - $7,000",
      venue: "The Grand Ballroom",
      message: "Looking for a elegant space for our design workshop. Need AV equipment and catering options.",
      status: "in-progress",
      priority: "medium",
      received: "1 day ago",
      attachments: 1
    },
    {
      id: "INQ-003",
      name: "Michael Brown",
      company: "Startup Connect",
      email: "michael@startupconnect.com",
      phone: "+1 (555) 123-4569",
      eventType: "Networking Event",
      attendees: 300,
      date: "2025-09-10",
      budget: "$8,000 - $12,000",
      venue: "Tech Hub Austin",
      message: "Planning a startup networking event. Interested in your tech-friendly spaces and would like to schedule a tour.",
      status: "responded",
      priority: "medium",
      received: "2 days ago",
      attachments: 0
    },
    {
      id: "INQ-004",
      name: "Lisa Chen",
      company: "Corporate Solutions Ltd.",
      email: "lisa@corporatesolutions.com",
      phone: "+1 (555) 123-4570",
      eventType: "Corporate Retreat",
      attendees: 80,
      date: "2025-10-05",
      budget: "$10,000 - $15,000",
      venue: "All Venues",
      message: "Need a venue for our annual corporate retreat. Prefer spaces with breakout rooms and outdoor areas.",
      status: "closed",
      priority: "low",
      received: "1 week ago",
      attachments: 3
    }
  ]

  const stats = [
    { label: "New Inquiries", value: "12", change: "+3", color: "text-blue-600" },
    { label: "In Progress", value: "8", change: "+1", color: "text-yellow-600" },
    { label: "Responded", value: "15", change: "+4", color: "text-green-600" },
    { label: "Conversion Rate", value: "24%", change: "+3%", color: "text-purple-600" },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "new": return "default"
      case "in-progress": return "secondary"
      case "responded": return "outline"
      case "closed": return "destructive"
      default: return "secondary"
    }
  }

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "high": return "destructive"
      case "medium": return "default"
      case "low": return "outline"
      default: return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new": return <Clock className="w-4 h-4 text-blue-500" />
      case "in-progress": return <MessageSquare className="w-4 h-4 text-yellow-500" />
      case "responded": return <CheckCircle className="w-4 h-4 text-green-500" />
      case "closed": return <XCircle className="w-4 h-4 text-red-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const messages = [
    {
      id: 1,
      sender: "Alex Johnson",
      content: "We're interested in hosting our annual tech conference at your venue. Could you please share availability and pricing for August 2025?",
      timestamp: "2 hours ago",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      content: "Thank you for your inquiry! I'd be happy to help with your tech conference. August 15th is available at our San Francisco Convention Center.",
      timestamp: "1 hour ago",
      isOwn: true
    },
    {
      id: 3,
      sender: "Alex Johnson",
      content: "That's great news! Could you send me the floor plans and AV equipment list?",
      timestamp: "30 minutes ago",
      isOwn: false
    }
  ]

  return (
    <DashboardShell role="venue-manager" title="Inquiries Management">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.color}`}>{stat.change} from last week</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inquiries List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search inquiries..." className="pl-10" />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="responded">Responded</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-3 mt-4">
                {inquiries.map((inquiry, index) => (
                  <Card 
                    key={inquiry.id}
                    className={`cursor-pointer hover:shadow-md transition-all ${
                      selectedInquiry === index ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedInquiry(index)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={`/avatars/${inquiry.name.toLowerCase().replace(' ', '-')}.jpg`} />
                          <AvatarFallback>
                            {inquiry.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm truncate">{inquiry.name}</h4>
                            <Badge variant={getPriorityVariant(inquiry.priority)} className="text-xs">
                              {inquiry.priority}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{inquiry.company}</p>
                          <p className="text-xs text-muted-foreground mt-1 truncate">{inquiry.eventType}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1">
                              {getStatusIcon(inquiry.status)}
                              <span className="text-xs capitalize">{inquiry.status}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{inquiry.received}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Inquiry Details */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {inquiries[selectedInquiry].id}
                      <Badge variant={getStatusVariant(inquiries[selectedInquiry].status)}>
                        {inquiries[selectedInquiry].status}
                      </Badge>
                      <Badge variant={getPriorityVariant(inquiries[selectedInquiry].priority)}>
                        {inquiries[selectedInquiry].priority} priority
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Received {inquiries[selectedInquiry].received}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      View Full
                    </Button>
                    <Button size="sm" className="gap-2">
                      <Reply className="w-4 h-4" />
                      Respond
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {/* Client Information */}
                <div>
                  <h3 className="font-semibold mb-3">Client Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Contact Person</p>
                      <p className="text-lg font-bold">{inquiries[selectedInquiry].name}</p>
                      <p className="text-sm text-muted-foreground">{inquiries[selectedInquiry].company}</p>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm">{inquiries[selectedInquiry].email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm">{inquiries[selectedInquiry].phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div>
                  <h3 className="font-semibold mb-3">Event Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 p-3 border rounded-lg">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="text-xs font-medium">Date</p>
                        <p className="text-sm">{inquiries[selectedInquiry].date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 border rounded-lg">
                      <Users className="w-4 h-4 text-green-500" />
                      <div>
                        <p className="text-xs font-medium">Attendees</p>
                        <p className="text-sm">{inquiries[selectedInquiry].attendees}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 border rounded-lg">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <div>
                        <p className="text-xs font-medium">Venue</p>
                        <p className="text-sm">{inquiries[selectedInquiry].venue}</p>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-xs font-medium">Budget</p>
                      <p className="text-sm font-bold">{inquiries[selectedInquiry].budget}</p>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <h3 className="font-semibold mb-3">Inquiry Message</h3>
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <p className="text-sm whitespace-pre-line">{inquiries[selectedInquiry].message}</p>
                  </div>
                  {inquiries[selectedInquiry].attachments > 0 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      {inquiries[selectedInquiry].attachments} attachment(s)
                    </p>
                  )}
                </div>

                {/* Communication History */}
                <div>
                  <h3 className="font-semibold mb-3">Communication History</h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.isOwn
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">{message.sender}</span>
                            <span className={`text-xs ${
                              message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}>
                              {message.timestamp}
                            </span>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" className="flex-1">
                    Request More Info
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Schedule Tour
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        Change Status
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Mark as In Progress</DropdownMenuItem>
                      <DropdownMenuItem>Mark as Responded</DropdownMenuItem>
                      <DropdownMenuItem>Mark as Closed</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}