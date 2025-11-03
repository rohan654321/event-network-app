"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  UserPlus,
  MessageCircle,
  MoreHorizontal,
  Users,
  UserCheck,
  Clock,
  Building2,
  MapPin,
  Filter,
  X,
  Check,
} from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Connection {
  id: string
  name: string
  email: string
  role: 'organizer' | 'speaker' | 'attendee'
  organization: string
  position: string
  location: string
  avatar?: string
  connectedSince?: string
  mutualInterests: string[]
  status: 'connected' | 'pending' | 'requested'
  lastInteraction?: string
}

export default function ConnectionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const connections: Connection[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@techconf.com",
      role: "organizer",
      organization: "Tech Summit 2025",
      position: "Event Director",
      location: "San Francisco, CA",
      connectedSince: "2024-01-15",
      mutualInterests: ["AI", "Machine Learning", "Web3"],
      status: "connected",
      lastInteraction: "2 days ago"
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike@devconf.org",
      role: "organizer",
      organization: "Developer Conference",
      position: "Program Manager",
      location: "New York, NY",
      mutualInterests: ["Web Development", "Cloud Computing"],
      status: "pending"
    },
    {
      id: "3",
      name: "Dr. Emily Roberts",
      email: "emily@ai-research.edu",
      role: "speaker",
      organization: "Stanford University",
      position: "Professor of Computer Science",
      location: "Palo Alto, CA",
      connectedSince: "2024-01-10",
      mutualInterests: ["Artificial Intelligence", "Research"],
      status: "connected",
      lastInteraction: "1 week ago"
    },
    {
      id: "4",
      name: "Alex Thompson",
      email: "alex@startup.com",
      role: "attendee",
      organization: "Tech Startup Inc.",
      position: "CTO",
      location: "Austin, TX",
      mutualInterests: ["Startups", "Innovation"],
      status: "requested"
    }
  ]

  const filteredConnections = connections.filter(connection => {
    const matchesSearch = connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.mutualInterests.some(interest => 
                           interest.toLowerCase().includes(searchTerm.toLowerCase())
                         )
    
    if (activeTab === "all") return matchesSearch
    if (activeTab === "connected") return matchesSearch && connection.status === "connected"
    if (activeTab === "pending") return matchesSearch && connection.status === "pending"
    if (activeTab === "requests") return matchesSearch && connection.status === "requested"
    
    return matchesSearch
  })

  const handleConnect = (id: string) => {
    console.log("Connect with:", id)
    // Implement connection logic
  }

  const handleMessage = (id: string) => {
    console.log("Message:", id)
    // Implement messaging logic
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'organizer': return 'default'
      case 'speaker': return 'secondary'
      case 'attendee': return 'outline'
      default: return 'outline'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <UserCheck className="w-4 h-4 text-green-500" />
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'requested': return <UserPlus className="w-4 h-4 text-blue-500" />
      default: return null
    }
  }

  return (
    <DashboardShell role="speaker" title="Connections">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Connections</h1>
            <p className="text-muted-foreground">Network with organizers, speakers, and attendees</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button className="gap-2">
              <UserPlus className="w-4 h-4" />
              Find Connections
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{connections.filter(c => c.status === 'connected').length}</p>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{connections.filter(c => c.status === 'pending').length}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UserPlus className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{connections.filter(c => c.status === 'requested').length}</p>
                  <p className="text-sm text-muted-foreground">Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{new Set(connections.map(c => c.organization)).size}</p>
                  <p className="text-sm text-muted-foreground">Organizations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Tabs */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <div className="flex-1 relative max-w-md">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search connections..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="connected">Connected</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="requests">Requests</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Connections List */}
            <div className="space-y-4">
              {filteredConnections.map((connection) => (
                <div key={connection.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={connection.avatar} />
                      <AvatarFallback>
                        {connection.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{connection.name}</h3>
                        {getStatusIcon(connection.status)}
                        <Badge variant={getRoleBadgeVariant(connection.role)}>
                          {connection.role}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          <span>{connection.organization}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{connection.location}</span>
                        </div>
                        {connection.position && (
                          <span>{connection.position}</span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {connection.mutualInterests.map((interest, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>

                      {connection.connectedSince && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Connected since {new Date(connection.connectedSince).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {connection.status === 'requested' && (
                      <>
                        <Button size="sm" variant="outline">
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    
                    {connection.status === 'pending' && (
                      <Button size="sm" variant="outline" disabled>
                        <Clock className="w-4 h-4" />
                        Pending
                      </Button>
                    )}

                    {connection.status === 'connected' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleMessage(connection.id)}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    )}

                    {connection.status !== 'connected' && connection.status !== 'pending' && (
                      <Button 
                        size="sm"
                        onClick={() => handleConnect(connection.id)}
                      >
                        <UserPlus className="w-4 h-4" />
                      </Button>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Share Contact</DropdownMenuItem>
                        <DropdownMenuItem>Set Reminder</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Remove Connection
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}

              {filteredConnections.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No connections found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ? "Try adjusting your search terms" : "Start building your network"}
                  </p>
                  <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Find Connections
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}