"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Building2, Calendar, Users, TrendingUp, Plus, MapPin, Download } from "lucide-react"
import { CalendarIntegration } from "@/components/features/calendar-integration"
import { AttendanceHeatmap } from "@/components/features/attendance-heatmap"

export default function VenueManagerDashboard() {
  const stats = [
    {
      title: "Total Venues",
      value: "8",
      change: "+1 this month",
      icon: Building2,
      color: "text-blue-500",
    },
    {
      title: "Active Bookings",
      value: "24",
      change: "+6 this week",
      icon: Calendar,
      color: "text-green-500",
    },
    {
      title: "Total Capacity",
      value: "12,500",
      change: "seats available",
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Revenue",
      value: "$89,450",
      change: "+18% from last month",
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ]

  const upcomingBookings = [
    {
      id: "1",
      venueName: "San Francisco Convention Center",
      eventName: "Tech Summit 2025",
      date: "June 15-17, 2025",
      capacity: 2000,
      status: "confirmed",
    },
    {
      id: "2",
      venueName: "The Grand Ballroom",
      eventName: "Design Conference",
      date: "July 8-10, 2025",
      capacity: 1000,
      status: "confirmed",
    },
    {
      id: "3",
      venueName: "Tech Hub Austin",
      eventName: "Startup Networking",
      date: "June 22, 2025",
      capacity: 500,
      status: "pending",
    },
  ]

  const venues = [
    {
      name: "San Francisco Convention Center",
      occupancy: 85,
      capacity: 5000,
      bookings: 12,
    },
    {
      name: "The Grand Ballroom",
      occupancy: 72,
      capacity: 1000,
      bookings: 8,
    },
    {
      name: "Tech Hub Austin",
      occupancy: 60,
      capacity: 500,
      bookings: 4,
    },
  ]

  const calendarEvents = [
    { id: "1", title: "Tech Summit 2025", date: "June 15-17", occupancy: 85 },
    { id: "2", title: "Design Conference", date: "July 8-10", occupancy: 72 },
    { id: "3", title: "Startup Networking", date: "June 22", occupancy: 60 },
  ]

  return (
    <DashboardShell role="venue-manager" title="Dashboard">
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

      {/* Tabs for Advanced Features */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="map">Venue Map</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Bookings */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Upcoming Bookings</CardTitle>
                  <Button size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    New Booking
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-semibold">{booking.venueName}</p>
                          <p className="text-sm text-muted-foreground">{booking.eventName}</p>
                          <p className="text-xs text-muted-foreground mt-1">{booking.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{booking.capacity}</p>
                          <p className="text-xs text-muted-foreground">capacity</p>
                        </div>
                        <div className="ml-4">
                          <span
                            className={`text-xs px-2 py-1 rounded ${booking.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                          >
                            {booking.status}
                          </span>
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
                    <Plus className="w-4 h-4" />
                    Add Venue
                  </Button>
                  <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                    <Calendar className="w-4 h-4" />
                    View Calendar
                  </Button>
                  <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                    <Building2 className="w-4 h-4" />
                    Manage Venues
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Occupancy Rate</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">This Month</span>
                      <span className="font-bold">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Next Month</span>
                      <span className="font-bold">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="map" className="space-y-6 mt-6">
          <h2 className="text-2xl font-bold mb-6">Venue Locations & Occupancy</h2>
          <div className="space-y-6">
            {venues.map((venue, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <CardTitle>{venue.name}</CardTitle>
                    </div>
                    <span className="text-sm font-semibold">{venue.bookings} bookings</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Current Occupancy</span>
                      <span className="font-semibold">{venue.occupancy}%</span>
                    </div>
                    <Progress value={venue.occupancy} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      {Math.round((venue.occupancy / 100) * venue.capacity)} of {venue.capacity} seats occupied
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Booking Calendar</h2>
            <Button className="gap-2 bg-transparent" variant="outline">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
          <CalendarIntegration events={calendarEvents} />
        </TabsContent>

        <TabsContent value="occupancy" className="space-y-6 mt-6">
          <h2 className="text-2xl font-bold mb-6">Occupancy Heatmap</h2>
          <AttendanceHeatmap data={[]} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
