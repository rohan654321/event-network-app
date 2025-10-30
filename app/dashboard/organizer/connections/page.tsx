"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, UserPlus, Check, X, MoreVertical, Mail, MapPin, Calendar } from "lucide-react"
import { useState } from "react"

interface User {
  id: string
  name: string
  avatar: string
  role: string
  company: string
  location: string
  mutualConnections: number
  eventsAttended: number
  status: "connected" | "pending" | "received" | "suggested"
  connectedSince?: string
  requestedAt?: string
}

export default function ConnectionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const users: User[] = [
    // Connected Users
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "/avatars/sarah.jpg",
      role: "Event Speaker",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      mutualConnections: 12,
      eventsAttended: 8,
      status: "connected",
      connectedSince: "2024-01-15"
    },
    {
      id: "2",
      name: "Mike Chen",
      avatar: "/avatars/mike.jpg",
      role: "Venue Manager",
      company: "Premier Events Venue",
      location: "New York, NY",
      mutualConnections: 8,
      eventsAttended: 15,
      status: "connected",
      connectedSince: "2024-02-01"
    },
    // Pending Requests (Sent by you)
    {
      id: "3",
      name: "Emily Davis",
      avatar: "/avatars/emily.jpg",
      role: "Marketing Director",
      company: "Global Brands Co.",
      location: "Chicago, IL",
      mutualConnections: 5,
      eventsAttended: 3,
      status: "pending",
      requestedAt: "2 hours ago"
    },
    {
      id: "4",
      name: "David Wilson",
      avatar: "/avatars/david.jpg",
      role: "AV Specialist",
      company: "Pro Audio Visual",
      location: "Austin, TX",
      mutualConnections: 3,
      eventsAttended: 12,
      status: "pending",
      requestedAt: "1 day ago"
    },
    // Received Requests (Waiting for your approval)
    {
      id: "5",
      name: "Lisa Rodriguez",
      avatar: "/avatars/lisa.jpg",
      role: "Event Planner",
      company: "Creative Events LLC",
      location: "Miami, FL",
      mutualConnections: 7,
      eventsAttended: 6,
      status: "received",
      requestedAt: "30 minutes ago"
    },
    {
      id: "6",
      name: "Alex Thompson",
      avatar: "/avatars/alex.jpg",
      role: "Sponsor Relations",
      company: "Startup Foundation",
      location: "Boston, MA",
      mutualConnections: 4,
      eventsAttended: 4,
      status: "received",
      requestedAt: "5 hours ago"
    },
    // Suggested Connections
    {
      id: "7",
      name: "Maria Garcia",
      avatar: "/avatars/maria.jpg",
      role: "Catering Manager",
      company: "Gourmet Events Catering",
      location: "Los Angeles, CA",
      mutualConnections: 6,
      eventsAttended: 10,
      status: "suggested"
    },
    {
      id: "8",
      name: "James Brown",
      avatar: "/avatars/james.jpg",
      role: "Security Coordinator",
      company: "Safe Events Security",
      location: "Seattle, WA",
      mutualConnections: 3,
      eventsAttended: 7,
      status: "suggested"
    }
  ]

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.company.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const connectedUsers = filteredUsers.filter(user => user.status === "connected")
  const pendingUsers = filteredUsers.filter(user => user.status === "pending")
  const receivedUsers = filteredUsers.filter(user => user.status === "received")
  const suggestedUsers = filteredUsers.filter(user => user.status === "suggested")

  const handleSendRequest = (userId: string) => {
    // In real app, this would call an API
    console.log(`Connection request sent to user ${userId}`)
    // Update user status to "pending"
  }

  const handleAcceptRequest = (userId: string) => {
    // In real app, this would call an API
    console.log(`Connection request accepted from user ${userId}`)
    // Update user status to "connected"
  }

  const handleRejectRequest = (userId: string) => {
    // In real app, this would call an API
    console.log(`Connection request rejected from user ${userId}`)
    // Remove user from list or update status
  }

  const handleCancelRequest = (userId: string) => {
    // In real app, this would call an API
    console.log(`Connection request cancelled for user ${userId}`)
    // Remove user from pending list
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge variant="default">Connected</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "received":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Request Received</Badge>
      case "suggested":
        return <Badge variant="outline">Suggested</Badge>
      default:
        return null
    }
  }

  const getActionButtons = (user: User) => {
    switch (user.status) {
      case "connected":
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Mail className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        )
      case "pending":
        return (
          <Button size="sm" variant="outline" onClick={() => handleCancelRequest(user.id)}>
            <X className="w-4 h-4" />
            Cancel
          </Button>
        )
      case "received":
        return (
          <div className="flex gap-2">
            <Button size="sm" onClick={() => handleAcceptRequest(user.id)}>
              <Check className="w-4 h-4" />
              Accept
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleRejectRequest(user.id)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        )
      case "suggested":
        return (
          <Button size="sm" onClick={() => handleSendRequest(user.id)}>
            <UserPlus className="w-4 h-4" />
            Connect
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <DashboardShell role="organizer" title="Connections">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search connections..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <UserPlus className="w-4 h-4" />
              Find People
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All Connections
              <Badge variant="secondary" className="ml-2">{filteredUsers.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="connected">
              Connected
              <Badge variant="secondary" className="ml-2">{connectedUsers.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="requests">
              Requests
              <Badge variant="secondary" className="ml-2">{receivedUsers.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="suggested">
              Suggested
              <Badge variant="secondary" className="ml-2">{suggestedUsers.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} getActionButtons={getActionButtons} getStatusBadge={getStatusBadge} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="connected" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {connectedUsers.map((user) => (
                <UserCard key={user.id} user={user} getActionButtons={getActionButtons} getStatusBadge={getStatusBadge} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {receivedUsers.map((user) => (
                <UserCard key={user.id} user={user} getActionButtons={getActionButtons} getStatusBadge={getStatusBadge} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="suggested" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedUsers.map((user) => (
                <UserCard key={user.id} user={user} getActionButtons={getActionButtons} getStatusBadge={getStatusBadge} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

interface UserCardProps {
  user: User
  getActionButtons: (user: User) => React.ReactNode
  getStatusBadge: (status: string) => React.ReactNode
}

function UserCard({ user, getActionButtons, getStatusBadge }: UserCardProps) {
  return (
    <Card key={user.id} className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Avatar and Basic Info */}
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar || "/placeholder.svg"} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.role}</p>
            <p className="text-xs text-muted-foreground">{user.company}</p>
          </div>

          {/* Status Badge */}
          {getStatusBadge(user.status)}

          {/* Additional Info */}
          <div className="space-y-2 text-sm w-full">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Location
              </span>
              <span className="font-medium">{user.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Mutual Connections</span>
              <span className="font-medium">{user.mutualConnections}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Events Attended
              </span>
              <span className="font-medium">{user.eventsAttended}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full pt-2">
            {getActionButtons(user)}
          </div>

          {/* Connection Date */}
          {user.connectedSince && (
            <p className="text-xs text-muted-foreground">
              Connected since {new Date(user.connectedSince).toLocaleDateString()}
            </p>
          )}
          {user.requestedAt && (
            <p className="text-xs text-muted-foreground">
              Request {user.status === "pending" ? "sent" : "received"} {user.requestedAt}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}