"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Heart, MessageSquare, Plus } from "lucide-react"

export default function AttendeeDashboard() {
  const stats = [
    {
      title: "Registered Events",
      value: "5",
      change: "+2 this month",
      icon: Calendar,
      color: "text-blue-500",
    },
    {
      title: "Connections",
      value: "127",
      change: "+15 this month",
      icon: Users,
      color: "text-green-500",
    },
    {
      title: "Saved Events",
      value: "12",
      change: "for later",
      icon: Heart,
      color: "text-red-500",
    },
    {
      title: "Messages",
      value: "8",
      change: "unread",
      icon: MessageSquare,
      color: "text-purple-500",
    },
  ]

  const registeredEvents = [
    {
      id: "1",
      title: "Tech Summit 2025",
      date: "June 15-17, 2025",
      location: "San Francisco, CA",
      ticketType: "VIP",
      status: "confirmed",
    },
    {
      id: "2",
      title: "Design Conference",
      date: "July 8-10, 2025",
      location: "New York, NY",
      ticketType: "Standard",
      status: "confirmed",
    },
  ]

  return (
    <DashboardShell role="attendee" title="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Registered Events */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Events</CardTitle>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Browse Events
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {registeredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-semibold">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                      <p className="text-xs text-muted-foreground mt-1">{event.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-muted-foreground">{event.ticketType}</p>
                      <p className="text-xs text-green-600 font-semibold mt-1">{event.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                <Calendar className="w-4 h-4" />
                Browse Events
              </Button>
              <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                <Users className="w-4 h-4" />
                My Connections
              </Button>
              <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                <MessageSquare className="w-4 h-4" />
                Messages
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recommended Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">AI Summit 2025</p>
                  <p className="text-xs text-muted-foreground">July 20-22</p>
                </div>
                <Button size="sm" variant="outline" className="bg-transparent">
                  Save
                </Button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">Web Dev Workshop</p>
                  <p className="text-xs text-muted-foreground">July 25</p>
                </div>
                <Button size="sm" variant="outline" className="bg-transparent">
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
