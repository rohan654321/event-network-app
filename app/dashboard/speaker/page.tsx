"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic2, Calendar, Star, Users, Plus } from "lucide-react"

export default function SpeakerDashboard() {
  const stats = [
    {
      title: "Total Sessions",
      value: "8",
      change: "+2 this month",
      icon: Mic2,
      color: "text-blue-500",
    },
    {
      title: "Upcoming Events",
      value: "3",
      change: "in next 30 days",
      icon: Calendar,
      color: "text-green-500",
    },
    {
      title: "Avg. Rating",
      value: "4.8",
      change: "out of 5.0",
      icon: Star,
      color: "text-yellow-500",
    },
    {
      title: "Total Attendees",
      value: "2,450",
      change: "+320 this month",
      icon: Users,
      color: "text-purple-500",
    },
  ]

  const upcomingSessions = [
    {
      id: "1",
      title: "AI & Machine Learning Workshop",
      event: "Tech Summit 2025",
      date: "June 16, 2025",
      time: "11:00 AM - 12:30 PM",
      attendees: 280,
    },
    {
      id: "2",
      title: "Future of Web Development",
      event: "Design Conference",
      date: "July 9, 2025",
      time: "2:00 PM - 3:30 PM",
      attendees: 150,
    },
  ]

  return (
    <DashboardShell role="speaker" title="Dashboard">
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
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-semibold">{session.title}</p>
                      <p className="text-sm text-muted-foreground">{session.event}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {session.date} • {session.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{session.attendees}</p>
                      <p className="text-xs text-muted-foreground">attendees</p>
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
                Add Session
              </Button>
              <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                <Mic2 className="w-4 h-4" />
                My Sessions
              </Button>
              <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                <Star className="w-4 h-4" />
                View Feedback
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">Excellent presentation!</p>
                  <p className="text-xs text-muted-foreground">From Tech Summit</p>
                </div>
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">Very informative</p>
                  <p className="text-xs text-muted-foreground">From Design Conf</p>
                </div>
                <span className="text-yellow-500">★★★★★</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
