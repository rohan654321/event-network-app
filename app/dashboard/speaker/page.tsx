"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Mic2, 
  Calendar, 
  Star, 
  Users, 
  Plus, 
  Download, 
  Upload, 
  Eye, 
  Edit, 
  Trash2,
  MessageSquare,
  BarChart3,
  Clock,
  MapPin,
  FileText,
  Video,
  Image,
  Link,
  Share2,
  QrCode,
  Bell,
  Settings,
  Award,
  TrendingUp,
  DollarSign,
  CheckCircle,
  XCircle,
  MoreHorizontal
} from "lucide-react"
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SpeakerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [notifications, setNotifications] = useState([
    { id: 1, type: "session", message: "New session request: AI Conference 2025", time: "2 hours ago", read: false },
    { id: 2, type: "feedback", message: "New feedback received for your workshop", time: "5 hours ago", read: false },
    { id: 3, type: "event", message: "Event reminder: Tech Summit starts in 3 days", time: "1 day ago", read: true },
  ])

  const stats = [
    {
      title: "Total Sessions",
      value: "24",
      change: "+8 this year",
      icon: Mic2,
      color: "text-blue-500",
      trend: "up"
    },
    {
      title: "Upcoming Events",
      value: "5",
      change: "in next 30 days",
      icon: Calendar,
      color: "text-green-500",
      trend: "stable"
    },
    {
      title: "Avg. Rating",
      value: "4.8",
      change: "out of 5.0",
      icon: Star,
      color: "text-yellow-500",
      trend: "up"
    },
    {
      title: "Total Reach",
      value: "12.4K",
      change: "+2.1K this quarter",
      icon: Users,
      color: "text-purple-500",
      trend: "up"
    },
    {
      title: "Earnings",
      value: "$8,750",
      change: "+$1,200 this month",
      icon: DollarSign,
      color: "text-emerald-500",
      trend: "up"
    },
    {
      title: "Engagement Rate",
      value: "78%",
      change: "+12% from last month",
      icon: TrendingUp,
      color: "text-orange-500",
      trend: "up"
    }
  ]

  const upcomingSessions = [
    {
      id: "1",
      title: "AI & Machine Learning Workshop",
      event: "Tech Summit 2025",
      date: "June 16, 2025",
      time: "11:00 AM - 12:30 PM",
      attendees: 280,
      status: "confirmed",
      type: "workshop",
      preparation: 85,
      materials: 3
    },
    {
      id: "2",
      title: "Future of Web Development",
      event: "Design Conference",
      date: "July 9, 2025",
      time: "2:00 PM - 3:30 PM",
      attendees: 150,
      status: "confirmed",
      type: "keynote",
      preparation: 60,
      materials: 2
    },
    {
      id: "3",
      title: "Cloud Architecture Deep Dive",
      event: "Cloud Expo 2025",
      date: "August 12, 2025",
      time: "10:00 AM - 11:30 AM",
      attendees: 200,
      status: "pending",
      type: "presentation",
      preparation: 30,
      materials: 1
    }
  ]

  const recentMaterials = [
    {
      id: "1",
      name: "AI Workshop Slides",
      type: "presentation",
      session: "AI & Machine Learning Workshop",
      downloads: 142,
      lastUpdated: "2 days ago",
      size: "45 MB"
    },
    {
      id: "2",
      name: "Code Examples",
      type: "document",
      session: "Future of Web Development",
      downloads: 89,
      lastUpdated: "1 week ago",
      size: "12 MB"
    },
    {
      id: "3",
      name: "Workshop Recording",
      type: "video",
      session: "Cloud Architecture Deep Dive",
      downloads: 256,
      lastUpdated: "3 weeks ago",
      size: "1.2 GB"
    }
  ]

  const performanceMetrics = [
    { metric: "Session Attendance", value: 92, target: 85, trend: "up" },
    { metric: "Audience Engagement", value: 88, target: 80, trend: "up" },
    { metric: "Content Quality", value: 95, target: 90, trend: "stable" },
    { metric: "Speaker Rating", value: 4.8, target: 4.5, trend: "up" }
  ]

  return (
    <DashboardShell role="speaker" title="Speaker Dashboard">
      {/* Header with Quick Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Dr. Sarah!</h1>
          <p className="text-muted-foreground">Here's your speaking engagement overview</p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Session
          </Button>
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Upload Materials
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2">
                <Share2 className="w-4 h-4" />
                Share Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <QrCode className="w-4 h-4" />
                Generate QR Code
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
              {stat.trend === "up" && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500"></div>
              )}
            </Card>
          )
        })}
      </div>

      {/* Main Content with Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="notifications">
            Notifications
            {notifications.filter(n => !n.read).length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                {notifications.filter(n => !n.read).length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Sessions */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Upcoming Sessions</CardTitle>
                    <CardDescription>Your scheduled speaking engagements</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={
                              session.status === "confirmed" ? "default" :
                              session.status === "pending" ? "secondary" : "destructive"
                            }>
                              {session.status}
                            </Badge>
                            <Badge variant="outline">{session.type}</Badge>
                          </div>
                          <p className="font-semibold">{session.title}</p>
                          <p className="text-sm text-muted-foreground">{session.event}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {session.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {session.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {session.attendees} attendees
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span>Preparation Progress</span>
                              <span>{session.preparation}%</span>
                            </div>
                            <Progress value={session.preparation} className="h-2" />
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Share Session</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                Cancel Session
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats & Actions */}
            <div className="space-y-6">
              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{metric.metric}</span>
                        <span className="font-semibold">{metric.value}{typeof metric.value === 'number' && metric.metric !== 'Speaker Rating' ? '%' : ''}</span>
                      </div>
                      <Progress value={typeof metric.value === 'number' ? metric.value : metric.value * 20} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Target: {metric.target}{typeof metric.target === 'number' && metric.metric !== 'Speaker Rating' ? '%' : ''}</span>
                        <span className={`flex items-center gap-1 ${
                          metric.trend === 'up' ? 'text-green-500' : 
                          metric.trend === 'down' ? 'text-red-500' : 'text-yellow-500'
                        }`}>
                          <TrendingUp className="w-3 h-3" />
                          {metric.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Materials */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Materials</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentMaterials.map((material) => (
                    <div key={material.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded ${
                          material.type === 'presentation' ? 'bg-blue-100 text-blue-600' :
                          material.type === 'video' ? 'bg-red-100 text-red-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {material.type === 'presentation' && <FileText className="w-4 h-4" />}
                          {material.type === 'video' && <Video className="w-4 h-4" />}
                          {material.type === 'document' && <Download className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{material.name}</p>
                          <p className="text-xs text-muted-foreground">{material.session}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Sessions Tab */}
        <TabsContent value="sessions">
          <SessionsManagement />
        </TabsContent>

        {/* Materials Tab */}
        <TabsContent value="materials">
          <MaterialsManagement />
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <NotificationsPanel 
            notifications={notifications} 
            onMarkAsRead={(id: number) => setNotifications(notifications.map(n => n.id === id ? {...n, read: true} : n))}
          />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

// Enhanced Sessions Management Component
function SessionsManagement() {
  const [sessions, setSessions] = useState([
    {
      id: "1",
      title: "AI & Machine Learning Workshop",
      event: "Tech Summit 2025",
      date: "June 16, 2025",
      time: "11:00 AM - 12:30 PM",
      duration: 90,
      type: "workshop",
      status: "confirmed",
      attendees: 280,
      rating: 4.9,
      preparation: 85,
      materials: 3,
      location: "Main Hall A",
      description: "Deep dive into AI and ML technologies with hands-on examples."
    },
    {
      id: "2",
      title: "Future of Web Development",
      event: "Design Conference",
      date: "July 9, 2025",
      time: "2:00 PM - 3:30 PM",
      duration: 90,
      type: "keynote",
      status: "confirmed",
      attendees: 150,
      rating: 4.8,
      preparation: 60,
      materials: 2,
      location: "Keynote Stage",
      description: "Exploring the latest trends and technologies in web development."
    }
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Session Management</h2>
          <p className="text-muted-foreground">Manage your speaking engagements and sessions</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add New Session
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>All Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div key={session.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={
                            session.status === "confirmed" ? "default" : "secondary"
                          }>
                            {session.status}
                          </Badge>
                          <Badge variant="outline">{session.type}</Badge>
                          <Badge variant="outline">{session.duration}min</Badge>
                        </div>
                        <h3 className="font-bold text-lg mb-1">{session.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{session.event}</p>
                        <p className="text-sm mb-3">{session.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{session.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{session.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{session.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{session.attendees} attendees</span>
                          </div>
                        </div>

                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Preparation Progress</span>
                            <span>{session.preparation}%</span>
                          </div>
                          <Progress value={session.preparation} className="h-2" />
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate Session</DropdownMenuItem>
                            <DropdownMenuItem>Share Session</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Cancel Session
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Session Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{sessions.length}</div>
                <div className="text-sm text-muted-foreground">Total Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {sessions.filter(s => s.status === 'confirmed').length}
                </div>
                <div className="text-sm text-muted-foreground">Confirmed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">
                  {sessions.reduce((acc, session) => acc + session.rating, 0) / sessions.length}
                </div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Plus className="w-4 h-4" />
                Add Session
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Calendar className="w-4 h-4" />
                Schedule
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="w-4 h-4" />
                Templates
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Enhanced Materials Management Component
function MaterialsManagement() {
  const [materials, setMaterials] = useState([
    {
      id: "1",
      name: "AI Workshop Slides",
      type: "presentation",
      session: "AI & Machine Learning Workshop",
      downloads: 142,
      views: 320,
      lastUpdated: "2024-01-15",
      size: "45 MB",
      status: "published",
      access: "public"
    },
    {
      id: "2",
      name: "Code Examples",
      type: "document",
      session: "Future of Web Development",
      downloads: 89,
      views: 210,
      lastUpdated: "2024-01-10",
      size: "12 MB",
      status: "published",
      access: "private"
    },
    {
      id: "3",
      name: "Workshop Recording",
      type: "video",
      session: "Cloud Architecture Deep Dive",
      downloads: 256,
      views: 890,
      lastUpdated: "2024-01-05",
      size: "1.2 GB",
      status: "draft",
      access: "public"
    }
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Session Materials</h2>
          <p className="text-muted-foreground">Manage and share your presentation materials</p>
        </div>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Upload New Material
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>All Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {materials.map((material) => (
                  <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`p-3 rounded-lg ${
                        material.type === 'presentation' ? 'bg-blue-100 text-blue-600' :
                        material.type === 'video' ? 'bg-red-100 text-red-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {material.type === 'presentation' && <FileText className="w-6 h-6" />}
                        {material.type === 'video' && <Video className="w-6 h-6" />}
                        {material.type === 'document' && <Download className="w-6 h-6" />}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{material.name}</h3>
                          <Badge variant={
                            material.status === 'published' ? 'default' : 'secondary'
                          }>
                            {material.status}
                          </Badge>
                          <Badge variant="outline">{material.access}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {material.session} • {material.size}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{material.downloads} downloads</span>
                          <span>{material.views} views</span>
                          <span>Updated {material.lastUpdated}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          <DropdownMenuItem>Share Link</DropdownMenuItem>
                          <DropdownMenuItem>Generate QR Code</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Storage Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold">2.3 GB</div>
                <div className="text-sm text-muted-foreground">of 10 GB used</div>
              </div>
              <Progress value={23} className="h-2" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Presentations</span>
                  <span>1.1 GB</span>
                </div>
                <div className="flex justify-between">
                  <span>Videos</span>
                  <span>0.9 GB</span>
                </div>
                <div className="flex justify-between">
                  <span>Documents</span>
                  <span>0.3 GB</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upload New</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium mb-1">Drop files here</p>
                <p className="text-xs text-muted-foreground">or click to browse</p>
                <Input type="file" className="hidden" id="file-upload" />
                <Button variant="outline" size="sm" className="mt-2">
                  Select Files
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Session</Label>
                <select className="w-full p-2 border rounded-md">
                  <option>AI & Machine Learning Workshop</option>
                  <option>Future of Web Development</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Access</Label>
                <select className="w-full p-2 border rounded-md">
                  <option>Public</option>
                  <option>Private</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Enhanced Analytics Dashboard Component
function AnalyticsDashboard() {
  const analyticsData = {
    overview: {
      totalSessions: 24,
      averageRating: 4.8,
      totalAttendees: 12450,
      engagementRate: 78
    },
    trends: [
      { month: 'Jan', sessions: 4, attendees: 1200, rating: 4.7 },
      { month: 'Feb', sessions: 3, attendees: 980, rating: 4.8 },
      { month: 'Mar', sessions: 5, attendees: 1500, rating: 4.9 },
      { month: 'Apr', sessions: 4, attendees: 1300, rating: 4.8 },
      { month: 'May', sessions: 6, attendees: 1800, rating: 4.9 },
      { month: 'Jun', sessions: 2, attendees: 750, rating: 4.8 }
    ],
    topSessions: [
      { name: 'AI Workshop', attendees: 280, rating: 4.9, engagement: 92 },
      { name: 'Cloud Architecture', attendees: 200, rating: 4.8, engagement: 88 },
      { name: 'Web Development', attendees: 150, rating: 4.8, engagement: 85 }
    ]
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Performance Analytics</h2>
        <p className="text-muted-foreground">Track your speaking engagement metrics and growth</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overview Cards */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Total Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analyticsData.overview.totalSessions}</div>
            <p className="text-sm text-muted-foreground">+8 this year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">{analyticsData.overview.averageRating}</div>
            <div className="flex gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(analyticsData.overview.averageRating) 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Total Reach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analyticsData.overview.totalAttendees.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">+2.1K this quarter</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Session Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Session Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.trends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{trend.month}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">{trend.sessions} sessions</span>
                    <span className="text-sm">{trend.attendees} attendees</span>
                    <span className="text-sm text-yellow-500">{trend.rating}★</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-semibold">{session.name}</p>
                    <p className="text-sm text-muted-foreground">{session.attendees} attendees</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <span className="text-yellow-500">{session.rating}</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <p className="text-sm text-muted-foreground">{session.engagement}% engagement</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Audience Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Developers</span>
                <span className="font-semibold">45%</span>
              </div>
              <Progress value={45} className="h-2" />
              <div className="flex justify-between">
                <span>Managers</span>
                <span className="font-semibold">30%</span>
              </div>
              <Progress value={30} className="h-2" />
              <div className="flex justify-between">
                <span>Students</span>
                <span className="font-semibold">15%</span>
              </div>
              <Progress value={15} className="h-2" />
              <div className="flex justify-between">
                <span>Others</span>
                <span className="font-semibold">10%</span>
              </div>
              <Progress value={10} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Workshops</span>
                <span className="font-semibold">40%</span>
              </div>
              <Progress value={40} className="h-2" />
              <div className="flex justify-between">
                <span>Keynotes</span>
                <span className="font-semibold">25%</span>
              </div>
              <Progress value={25} className="h-2" />
              <div className="flex justify-between">
                <span>Presentations</span>
                <span className="font-semibold">20%</span>
              </div>
              <Progress value={20} className="h-2" />
              <div className="flex justify-between">
                <span>Panels</span>
                <span className="font-semibold">15%</span>
              </div>
              <Progress value={15} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Notifications Panel Component
function NotificationsPanel({ notifications, onMarkAsRead }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Notifications</h2>
          <p className="text-muted-foreground">Stay updated with your speaking engagements</p>
        </div>
        <Button variant="outline">
          <Bell className="w-4 h-4 mr-2" />
          Notification Settings
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {notifications.map((notification: { id: Key | null | undefined; read: any; message: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; time: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-muted/50 transition-colors ${
                  !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{notification.message}</p>
                    <p className="text-sm text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {!notification.read && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onMarkAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Archive</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="session-requests">Session Requests</Label>
              <p className="text-sm text-muted-foreground">Get notified when you receive new session requests</p>
            </div>
            <Switch id="session-requests" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="feedback">Feedback & Ratings</Label>
              <p className="text-sm text-muted-foreground">Receive notifications for new feedback</p>
            </div>
            <Switch id="feedback" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="event-reminders">Event Reminders</Label>
              <p className="text-sm text-muted-foreground">Get reminders for upcoming events</p>
            </div>
            <Switch id="event-reminders" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="material-downloads">Material Downloads</Label>
              <p className="text-sm text-muted-foreground">Notifications when someone downloads your materials</p>
            </div>
            <Switch id="material-downloads" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}