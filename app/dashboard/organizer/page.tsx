"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar, Users, Ticket, TrendingUp, Plus, Sparkles, Download, 
  ThumbsUp, MessageSquare, Star, BookOpen, Megaphone, Zap, Target, 
  Clock, Award, BarChart3, Video, Globe, Mail, Bell, Settings, 
  UserCheck, QrCode, Shield, Cloud, Wifi, Mic, Camera, Building,
  FileText, Gift, BadgeCheck, MapPin, CreditCard, FileSearch,
  ShieldCheck, Upload, Download as DownloadIcon, Send
} from "lucide-react"
import { AIInsightsDashboard } from "@/components/features/ai-insights-dashboard"
import { AdvancedAnalytics } from "@/components/features/advanced-analytics"
import { PollWidget } from "@/components/features/poll-widget"
import { useState } from "react"

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
  const [activeTab, setActiveTab] = useState("overview")

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

  const businessStats = [
    {
      title: "Total Revenue",
      value: "$124,580",
      change: "+18% this quarter",
      icon: CreditCard,
      color: "text-emerald-500",
    },
    {
      title: "Active Promotions",
      value: "8",
      change: "3 campaigns running",
      icon: Megaphone,
      color: "text-pink-500",
    },
    {
      title: "Venue Bookings",
      value: "15",
      change: "+3 this month",
      icon: Building,
      color: "text-indigo-500",
    },
  ]

  const upcomingEvents = [
    {
      id: "1",
      title: "Tech Summit 2025",
      date: "June 15-17, 2025",
      registrations: 1250,
      status: "published",
      revenue: "$85,200"
    },
    {
      id: "2",
      title: "Design Workshop",
      date: "June 22, 2025",
      registrations: 340,
      status: "published",
      revenue: "$12,450"
    },
    {
      id: "3",
      title: "Networking Breakfast",
      date: "July 5, 2025",
      registrations: 0,
      status: "draft",
      revenue: "$0"
    },
  ]

  const recentActivities = [
    {
      type: "registration",
      message: "New registration for Tech Summit",
      time: "5 min ago",
      icon: UserCheck
    },
    {
      type: "payment",
      message: "Payment received from Sarah Johnson",
      time: "1 hour ago",
      icon: CreditCard
    },
    {
      type: "event",
      message: "Design Workshop published",
      time: "2 hours ago",
      icon: Calendar
    },
    {
      type: "promotion",
      message: "New promotion campaign started",
      time: "3 hours ago",
      icon: Megaphone
    }
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

  const legalDocuments = [
    {
      name: "Event Contract Template",
      type: "EVENT_CONTRACT",
      status: "ACTIVE",
      downloads: 45,
      lastUpdated: "2024-01-15"
    },
    {
      name: "Venue Safety Compliance",
      type: "COMPLIANCE_CERTIFICATE",
      status: "VALID",
      downloads: 23,
      lastUpdated: "2024-01-10"
    },
    {
      name: "Terms & Conditions",
      type: "STANDARD_DOCUMENT",
      status: "ACTIVE",
      downloads: 89,
      lastUpdated: "2024-01-05"
    }
  ]

  const exhibitorManuals = [
    {
      event: "Tech Summit 2025",
      fileName: "Exhibitor_Manual_TechSummit2025.pdf",
      version: "2.1",
      uploadDate: "2024-01-18",
      downloads: 67
    },
    {
      event: "Design Workshop",
      fileName: "Design_Workshop_Setup_Guide.pdf",
      version: "1.0",
      uploadDate: "2024-01-12",
      downloads: 34
    }
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

      {/* Business Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {businessStats.map((stat, index) => {
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
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="polls">Polls</TabsTrigger>
          <TabsTrigger value="legal">Legal Docs</TabsTrigger>
          <TabsTrigger value="manuals">Exhibitor Manuals</TabsTrigger>
          <TabsTrigger value="badges">Badge Management</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
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
                          <p className="font-bold">{event.registrations} registrations</p>
                          <p className="text-sm text-muted-foreground">{event.revenue}</p>
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

            {/* Quick Actions & Recent Activity */}
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
                  <Button className="w-full justify-start gap-2" variant="outline">
                    <FileText className="w-4 h-4" />
                    Legal Documents
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {recentActivities.map((activity, index) => {
                    const Icon = activity.icon
                    return (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{activity.message}</span>
                        </div>
                        <span className="text-xs">{activity.time}</span>
                      </div>
                    )
                  })}
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

        <TabsContent value="legal" className="space-y-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Legal Documents Management</h2>
            <Button className="gap-2">
              <Upload className="w-4 h-4" />
              Upload Document
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Legal Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {legalDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-semibold">{doc.name}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">{doc.type}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            doc.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                            doc.status === 'VALID' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {doc.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{doc.downloads} downloads</p>
                        <p className="text-xs text-muted-foreground">Updated {doc.lastUpdated}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <DownloadIcon className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manuals" className="space-y-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Exhibitor Manuals</h2>
            <Button className="gap-2">
              <Upload className="w-4 h-4" />
              Upload Manual
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Event Manuals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exhibitorManuals.map((manual, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-purple-500" />
                      <div>
                        <p className="font-semibold">{manual.fileName}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{manual.event}</span>
                          <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded">
                            v{manual.version}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{manual.downloads} downloads</p>
                        <p className="text-xs text-muted-foreground">Uploaded {manual.uploadDate}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <DownloadIcon className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="space-y-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Badge Management</h2>
            <Button className="gap-2">
              <BadgeCheck className="w-4 h-4" />
              Generate Badges
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Badge Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Badges Generated</span>
                  <span className="font-bold">1,245</span>
                </div>
                <div className="flex justify-between">
                  <span>Badges Sent</span>
                  <span className="font-bold">1,089</span>
                </div>
                <div className="flex justify-between">
                  <span>Failed Deliveries</span>
                  <span className="font-bold text-red-600">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Rate</span>
                  <span className="font-bold text-green-600">99.2%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Send className="w-4 h-4" />
                  Send All Badges
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <DownloadIcon className="w-4 h-4" />
                  Export Badge List
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <BadgeCheck className="w-4 h-4" />
                  Preview Badge Design
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Platform Settings</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates about your events</p>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">SMS Alerts</p>
                        <p className="text-sm text-muted-foreground">Important event alerts via SMS</p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Auto-backup</p>
                        <p className="text-sm text-muted-foreground">Automatically backup event data</p>
                      </div>
                      <Button variant="outline">Schedule</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Account Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Plan Type</span>
                    <span className="font-bold">Professional</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Events This Month</span>
                    <span className="font-bold">3/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Storage Used</span>
                    <span className="font-bold">2.4GB/10GB</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    Upgrade Plan
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}