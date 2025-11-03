"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Mail, Phone, MapPin } from "lucide-react"

export default function TeamPage() {
  const teamMembers = [
    {
      id: "1",
      name: "Sarah Wilson",
      role: "Venue Manager",
      email: "sarah@venue.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      status: "active",
    },
    {
      id: "2",
      name: "Mike Johnson",
      role: "Event Coordinator",
      email: "mike@venue.com",
      phone: "+1 (555) 123-4568",
      location: "New York, NY",
      status: "active",
    },
    {
      id: "3",
      name: "Emily Chen",
      role: "Maintenance Supervisor",
      email: "emily@venue.com",
      phone: "+1 (555) 123-4569",
      location: "Austin, TX",
      status: "on-leave",
    },
  ]

  return (
    <DashboardShell role="venue-manager" title="Team Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search team members..." className="pl-10" />
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Team Member
          </Button>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <Badge variant={member.status === "active" ? "default" : "secondary"} className="mb-3">
                    {member.status}
                  </Badge>
                  
                  <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{member.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-6">
                    <Button variant="outline" size="sm" className="flex-1">
                      Message
                    </Button>
                    <Button size="sm" className="flex-1">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}