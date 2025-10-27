"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Store, Calendar, Users, TrendingUp, Plus } from "lucide-react"

export default function ExhibitorDashboard() {
  const stats = [
    {
      title: "Active Booths",
      value: "3",
      change: "+1 this month",
      icon: Store,
      color: "text-blue-500",
    },
    {
      title: "Upcoming Events",
      value: "5",
      change: "in next 60 days",
      icon: Calendar,
      color: "text-green-500",
    },
    {
      title: "Total Leads",
      value: "342",
      change: "+45 this month",
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Conversion Rate",
      value: "12.5%",
      change: "+2.3% from last month",
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ]

  const upcomingEvents = [
    {
      id: "1",
      eventName: "Tech Summit 2025",
      date: "June 15-17, 2025",
      boothSize: "10x10",
      leads: 85,
      status: "confirmed",
    },
    {
      id: "2",
      eventName: "Design Conference",
      date: "July 8-10, 2025",
      boothSize: "10x20",
      leads: 0,
      status: "confirmed",
    },
  ]

  return (
    <DashboardShell role="exhibitor" title="Dashboard">
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
        {/* Upcoming Events */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Events</CardTitle>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Book Booth
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-semibold">{event.eventName}</p>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                      <p className="text-xs text-muted-foreground mt-1">Booth: {event.boothSize}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{event.leads}</p>
                      <p className="text-xs text-muted-foreground">leads</p>
                    </div>
                    <div className="ml-4">
                      <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">{event.status}</span>
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
                Book Booth
              </Button>
              <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                <Users className="w-4 h-4" />
                Manage Leads
              </Button>
              <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                <Calendar className="w-4 h-4" />
                View Calendar
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Leads</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">New lead from Tech Summit</span>
                <span className="text-xs">2 min ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Appointment scheduled</span>
                <span className="text-xs">1 hour ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lead converted</span>
                <span className="text-xs">3 hours ago</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
