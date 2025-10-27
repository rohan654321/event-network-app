"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, TrendingUp, AlertCircle, Plus, Download } from "lucide-react"
import { AdvancedAnalytics } from "@/components/features/advanced-analytics"
import { AttendanceHeatmap } from "@/components/features/attendance-heatmap"
import { Leaderboard } from "@/components/features/leaderboard"

// Define mock data for analytics
const mockAnalyticsData = {
  attendanceByDay: [
    { date: "2025-06-01", attendees: 150, registered: 200 },
    { date: "2025-06-02", attendees: 180, registered: 220 },
    { date: "2025-06-03", attendees: 200, registered: 250 },
    { date: "2025-06-04", attendees: 220, registered: 280 },
    { date: "2025-06-05", attendees: 240, registered: 300 },
  ],
  engagementMetrics: [
    { metric: "Clicks", value: 500, change: 10 },
    { metric: "Views", value: 3000, change: -5 },
    { metric: "Shares", value: 150, change: 15 },
    { metric: "Comments", value: 89, change: 8 },
  ],
  sessionPerformance: [
    { name: "Session A", attendance: 120, engagement: 85, rating: 4.5 },
    { name: "Session B", attendance: 90, engagement: 70, rating: 4.2 },
    { name: "Session C", attendance: 150, engagement: 92, rating: 4.8 },
    { name: "Session D", attendance: 80, engagement: 65, rating: 4.0 },
  ],
  attendanceHeatmap: [
    { time: "9:00", day: "Mon", value: 65 },
    { time: "10:00", day: "Mon", value: 120 },
    { time: "11:00", day: "Mon", value: 180 },
    { time: "12:00", day: "Mon", value: 90 },
    { time: "13:00", day: "Mon", value: 150 },
  ],
  conversionFunnel: [
    { stage: "Visited Page", count: 5000, percentage: 100 },
    { stage: "Registered", count: 2500, percentage: 50 },
    { stage: "Attended", count: 2000, percentage: 40 },
    { stage: "Engaged", count: 1500, percentage: 30 },
    { stage: "Converted", count: 800, percentage: 16 },
  ],
}

// Define mock data for leaderboard that matches the LeaderboardProps interface
const mockLeaderboardEntries = [
  {
    rank: 1,
    name: "Sarah Johnson",
    avatar: "/professional-woman.png",
    points: 2450,
    badges: 12,
    eventsAttended: 8,
    trend: "up" as const,
  },
  {
    rank: 2,
    name: "Mike Chen",
    avatar: "/man.jpg",
    points: 2180,
    badges: 10,
    eventsAttended: 7,
    trend: "up" as const,
  },
  {
    rank: 3,
    name: "Emily Davis",
    avatar: "/professional-woman.png",
    points: 1950,
    badges: 8,
    eventsAttended: 6,
    trend: "stable" as const,
  },
  {
    rank: 4,
    name: "Alex Rodriguez",
    avatar: "/man.jpg",
    points: 1820,
    badges: 7,
    eventsAttended: 5,
    trend: "down" as const,
  },
  {
    rank: 5,
    name: "Jessica Wilson",
    avatar: "/professional-woman.png",
    points: 1650,
    badges: 6,
    eventsAttended: 4,
    trend: "up" as const,
  },
]

// Define mock data for heatmap
const mockHeatmapData = [
  { time: "9:00", day: "Mon", value: 65 },
  { time: "10:00", day: "Mon", value: 120 },
  { time: "11:00", day: "Mon", value: 180 },
  { time: "12:00", day: "Mon", value: 90 },
  { time: "13:00", day: "Mon", value: 150 },
  { time: "14:00", day: "Mon", value: 200 },
  { time: "15:00", day: "Mon", value: 175 },
  { time: "16:00", day: "Mon", value: 140 },
]

export default function SuperadminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "12,543",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Active Events",
      value: "342",
      change: "+8.2%",
      icon: Calendar,
      color: "text-green-500",
    },
    {
      title: "Total Revenue",
      value: "$245,680",
      change: "+23.1%",
      icon: TrendingUp,
      color: "text-purple-500",
    },
    {
      title: "Pending Approvals",
      value: "28",
      change: "-5.4%",
      icon: AlertCircle,
      color: "text-orange-500",
    },
  ]

  return (
    <DashboardShell role="superadmin" title="Dashboard">
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
                <p className="text-xs text-muted-foreground mt-1">{stat.change} from last month</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Tabs for Advanced Features */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Plus className="w-4 h-4" />
                  Create User
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Plus className="w-4 h-4" />
                  Approve Event
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Plus className="w-4 h-4" />
                  View Reports
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Status</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cache</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">New user signup</span>
                  <span className="text-xs">2 min ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Event approved</span>
                  <span className="text-xs">15 min ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment received</span>
                  <span className="text-xs">1 hour ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Platform Analytics</h2>
            <Button className="gap-2" variant="outline">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
          <AdvancedAnalytics data={mockAnalyticsData} />
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">Attendance Heatmap</h2>
          <AttendanceHeatmap data={mockHeatmapData} />
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">Top Performers Leaderboard</h2>
          <Leaderboard entries={mockLeaderboardEntries} period="month" />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}