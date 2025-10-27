"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, Ticket, TrendingUp, Plus, Sparkles, Download, ThumbsUp, MessageSquare, Star } from "lucide-react"
import { AIInsightsDashboard } from "@/components/features/ai-insights-dashboard"
import { AdvancedAnalytics } from "@/components/features/advanced-analytics"
import { PollWidget } from "@/components/features/poll-widget"

// Define the AnalyticsData interface
interface AnalyticsData {
  attendanceByDay: Array<{
    date: string
    attendees: number
    registered: number
  }>
  engagementMetrics: Array<{
    metric: string
    value: number
    change: number
  }>
  sessionPerformance: Array<{
    name: string
    attendance: number
    engagement: number
    rating: number
  }>
  attendanceHeatmap: Array<any>
  conversionFunnel: Array<{
    stage: string
    count: number
    percentage: number
  }>
}

export default function OrganizerDashboard() {
  const stats = [
    {
      title: "Active Events",
      value: "12",
      change: "+2 this month",
      icon: Calendar,
      color: "text-blue-500",
    },
    {
      title: "Total Registrations",
      value: "3,245",
      change: "+450 this week",
      icon: Users,
      color: "text-green-500",
    },
    {
      title: "Tickets Sold",
      value: "2,890",
      change: "+$45,200 revenue",
      icon: Ticket,
      color: "text-purple-500",
    },
    {
      title: "Avg. Attendance Rate",
      value: "87%",
      change: "+5% from last month",
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ]

  const upcomingEvents = [
    {
      id: "1",
      title: "Tech Summit 2025",
      date: "June 15-17, 2025",
      registrations: 1250,
      status: "published",
    },
    {
      id: "2",
      title: "Design Workshop",
      date: "June 22, 2025",
      registrations: 340,
      status: "published",
    },
    {
      id: "3",
      title: "Networking Breakfast",
      date: "July 5, 2025",
      registrations: 0,
      status: "draft",
    },
  ]

  const eventPoll = {
    pollId: "poll-organizer-1",
    question: "Which session format works best for your attendees?",
    options: [
      { id: "opt-1", text: "In-Person Only", votes: 245, percentage: 42, userVoted: false },
      { id: "opt-2", text: "Hybrid (In-Person + Virtual)", votes: 180, percentage: 31, userVoted: false },
      { id: "opt-3", text: "Virtual Only", votes: 95, percentage: 16, userVoted: false },
      { id: "opt-4", text: "No Preference", votes: 65, percentage: 11, userVoted: false },
    ],
    totalVotes: 585,
    isLive: true,
  }

  const mockAnalyticsData: AnalyticsData = {
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
    attendanceHeatmap: [],
    conversionFunnel: [
      { stage: "Visited Page", count: 5000, percentage: 100 },
      { stage: "Registered", count: 2500, percentage: 50 },
      { stage: "Attended", count: 2000, percentage: 40 },
      { stage: "Engaged", count: 1500, percentage: 30 },
      { stage: "Converted", count: 800, percentage: 16 },
    ],
  }

  // Fixed mock data for AI Insights that matches the expected types
  const mockAIMetrics = [
    {
      label: "Engagement Score",
      value: "87%",
      change: 5,
      icon: <ThumbsUp className="w-6 h-6" />
    },
    {
      label: "Satisfaction Rate",
      value: "92%",
      change: 3,
      icon: <Star className="w-6 h-6" />
    },
    {
      label: "Retention Prediction",
      value: "78%",
      change: 8,
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      label: "Net Promoter Score",
      value: "+45",
      change: 12,
      icon: <MessageSquare className="w-6 h-6" />
    }
  ]

  const mockPopularSessions = [
    { name: "AI Workshop", attendees: 150, engagement: 95 },
    { name: "Networking Mixer", attendees: 200, engagement: 88 },
    { name: "Keynote Speech", attendees: 300, engagement: 92 },
    { name: "Cloud Computing", attendees: 120, engagement: 85 },
    { name: "Web3 Technologies", attendees: 180, engagement: 90 },
  ]

  const mockTopicTrends = [
    { name: "Artificial Intelligence", value: 95 },
    { name: "Cloud Computing", value: 87 },
    { name: "Web3 Technologies", value: 78 },
    { name: "Cybersecurity", value: 72 },
    { name: "Machine Learning", value: 68 },
  ]

  const mockSpeakerPerformance = [
    { name: "John Smith", rating: 4.8, sessions: 12 },
    { name: "Sarah Chen", rating: 4.9, sessions: 8 },
    { name: "Mike Johnson", rating: 4.6, sessions: 15 },
    { name: "Emily Davis", rating: 4.7, sessions: 10 },
    { name: "Alex Wong", rating: 4.5, sessions: 14 },
  ]

  return (
    <DashboardShell role="organizer" title="Dashboard">
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
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="polls">Polls</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Events */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Upcoming Events</CardTitle>
                  <Button size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    New Event
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
                          <p className="font-semibold">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{event.registrations}</p>
                          <p className="text-xs text-muted-foreground">registrations</p>
                        </div>
                        <div className="ml-4">
                          <span
                            className={`text-xs px-2 py-1 rounded ${event.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                          >
                            {event.status}
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
                  <Button className="w-full justify-start gap-2" variant="outline">
                    <Plus className="w-4 h-4" />
                    Create Event
                  </Button>
                  <Button className="w-full justify-start gap-2" variant="outline">
                    <Calendar className="w-4 h-4" />
                    View Calendar
                  </Button>
                  <Button className="w-full justify-start gap-2" variant="outline">
                    <Users className="w-4 h-4" />
                    Manage Attendees
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">New registration</span>
                    <span className="text-xs">5 min ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ticket purchased</span>
                    <span className="text-xs">1 hour ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Event published</span>
                    <span className="text-xs">2 hours ago</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">AI-Powered Insights</h2>
            </div>
          </div>
          <AIInsightsDashboard 
            metrics={mockAIMetrics}
            popularSessions={mockPopularSessions}
            topicTrends={mockTopicTrends}
            speakerPerformance={mockSpeakerPerformance}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Event Analytics</h2>
            <Button className="gap-2" variant="outline">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
          <AdvancedAnalytics data={mockAnalyticsData} />
        </TabsContent>

        <TabsContent value="polls" className="space-y-6 mt-6">
          <h2 className="text-2xl font-bold mb-6">Attendee Feedback Polls</h2>
          <PollWidget
            pollId={eventPoll.pollId}
            question={eventPoll.question}
            options={eventPoll.options}
            totalVotes={eventPoll.totalVotes}
            isLive={eventPoll.isLive}
            onVote={(optionId) => console.log(`Voted for ${optionId}`)}
          />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}