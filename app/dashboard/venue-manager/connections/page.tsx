"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, UserPlus, MessageCircle, MapPin, Calendar } from "lucide-react"

export default function ConnectionsPage() {
  const connections = [
    {
      id: "1",
      name: "John Smith",
      role: "Event Organizer",
      company: "Tech Events Inc.",
      location: "San Francisco, CA",
      events: 12,
      mutual: 5,
      status: "connected",
      avatar: "/avatars/john-smith.jpg"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "Conference Manager",
      company: "Global Conferences",
      location: "New York, NY",
      events: 8,
      mutual: 3,
      status: "pending",
      avatar: "/avatars/sarah-johnson.jpg"
    },
    {
      id: "3",
      name: "Michael Chen",
      role: "Startup Founder",
      company: "Innovate Labs",
      location: "Austin, TX",
      events: 3,
      mutual: 2,
      status: "connected",
      avatar: "/avatars/michael-chen.jpg"
    },
    {
      id: "4",
      name: "Lisa Wang",
      role: "Marketing Director",
      company: "Brand Builders",
      location: "Los Angeles, CA",
      events: 6,
      mutual: 4,
      status: "connected",
      avatar: "/avatars/lisa-wang.jpg"
    }
  ]

  const suggested = [
    {
      id: "5",
      name: "David Brown",
      role: "Corporate Event Planner",
      company: "Enterprise Solutions",
      mutual: 8,
      avatar: "/avatars/david-brown.jpg"
    },
    {
      id: "6",
      name: "Maria Garcia",
      role: "Wedding Coordinator",
      company: "Elegant Events",
      mutual: 3,
      avatar: "/avatars/maria-garcia.jpg"
    }
  ]

  return (
    <DashboardShell role="venue-manager" title="Connections">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search connections..." className="pl-10" />
          </div>
          <Button className="gap-2">
            <UserPlus className="w-4 h-4" />
            Find Connections
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Connections */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold">Your Connections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connections.map((connection) => (
                <Card key={connection.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Avatar className="w-16 h-16 mx-auto mb-4">
                        <AvatarImage src={connection.avatar} />
                        <AvatarFallback>
                          {connection.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <h3 className="font-bold text-lg mb-1">{connection.name}</h3>
                      <Badge variant={connection.status === "connected" ? "default" : "secondary"} className="mb-2">
                        {connection.status}
                      </Badge>
                      
                      <p className="text-sm text-muted-foreground mb-3">{connection.role} • {connection.company}</p>
                      
                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2 justify-center">
                          <MapPin className="w-4 h-4" />
                          <span>{connection.location}</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                          <Calendar className="w-4 h-4" />
                          <span>{connection.events} events together</span>
                        </div>
                        <div className="text-center">
                          <span className="text-blue-600">{connection.mutual} mutual connections</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 gap-2">
                          <MessageCircle className="w-4 h-4" />
                          Message
                        </Button>
                        <Button size="sm" className="flex-1">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Suggested Connections */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Suggested for You</h2>
            <div className="space-y-4">
              {suggested.map((person) => (
                <Card key={person.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={person.avatar} />
                        <AvatarFallback>
                          {person.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{person.name}</h4>
                        <p className="text-sm text-muted-foreground">{person.role}</p>
                        <p className="text-xs text-blue-600">{person.mutual} mutual connections</p>
                      </div>
                      <Button size="sm" className="gap-2">
                        <UserPlus className="w-4 h-4" />
                        Connect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stats Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Connections</span>
                    <span className="font-bold text-lg">147</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">This Month</span>
                    <span className="font-bold text-green-600">+12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending Requests</span>
                    <span className="font-bold text-yellow-600">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}