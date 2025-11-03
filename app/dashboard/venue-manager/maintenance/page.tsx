"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Wrench, Clock, CheckCircle, AlertTriangle, Building2 } from "lucide-react"

export default function MaintenancePage() {
  const maintenanceTasks = [
    {
      id: "1",
      title: "HVAC System Check",
      venue: "San Francisco Convention Center",
      priority: "high",
      status: "in-progress",
      assignedTo: "Maintenance Team A",
      dueDate: "2025-06-10",
      progress: 65
    },
    {
      id: "2",
      title: "Lighting System Update",
      venue: "The Grand Ballroom",
      priority: "medium",
      status: "pending",
      assignedTo: "Maintenance Team B",
      dueDate: "2025-06-15",
      progress: 0
    },
    {
      id: "3",
      title: "Seating Inspection",
      venue: "Tech Hub Austin",
      priority: "low",
      status: "completed",
      assignedTo: "Maintenance Team C",
      dueDate: "2025-05-30",
      progress: 100
    },
    {
      id: "4",
      title: "Emergency Exit Signs",
      venue: "San Francisco Convention Center",
      priority: "high",
      status: "pending",
      assignedTo: "Safety Team",
      dueDate: "2025-06-05",
      progress: 0
    }
  ]

  const venues = [
    {
      name: "San Francisco Convention Center",
      maintenanceScore: 85,
      upcomingTasks: 3,
      completedThisMonth: 12
    },
    {
      name: "The Grand Ballroom",
      maintenanceScore: 92,
      upcomingTasks: 1,
      completedThisMonth: 8
    },
    {
      name: "Tech Hub Austin",
      maintenanceScore: 78,
      upcomingTasks: 2,
      completedThisMonth: 5
    }
  ]

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "high": return "destructive"
      case "medium": return "secondary"
      case "low": return "default"
      default: return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-500" />
      case "in-progress": return <Clock className="w-4 h-4 text-blue-500" />
      case "pending": return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <DashboardShell role="venue-manager" title="Maintenance Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Maintenance</h1>
            <p className="text-muted-foreground">Manage venue maintenance and repairs</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Task
          </Button>
        </div>

        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tasks">Maintenance Tasks</TabsTrigger>
            <TabsTrigger value="venues">Venue Status</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4 mt-6">
            {maintenanceTasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <Wrench className="w-5 h-5 text-blue-500" />
                          <h3 className="font-bold text-lg">{task.title}</h3>
                        </div>
                        <Badge variant={getPriorityVariant(task.priority)}>
                          {task.priority}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(task.status)}
                          <span className="text-sm capitalize">{task.status}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                        <div>
                          <p className="text-xs font-semibold">Venue</p>
                          <p>{task.venue}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold">Assigned To</p>
                          <p>{task.assignedTo}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold">Due Date</p>
                          <p>{task.dueDate}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold">Progress</p>
                          <p className="text-base font-bold text-foreground">{task.progress}%</p>
                        </div>
                      </div>
                      
                      <Progress value={task.progress} className="h-2" />
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                      <Button size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="venues" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map((venue, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" />
                      <CardTitle className="text-base">{venue.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Maintenance Score</span>
                        <span className={`font-bold ${
                          venue.maintenanceScore >= 90 ? 'text-green-600' :
                          venue.maintenanceScore >= 80 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {venue.maintenanceScore}%
                        </span>
                      </div>
                      <Progress value={venue.maintenanceScore} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="font-bold text-lg text-foreground">{venue.upcomingTasks}</p>
                        <p className="text-xs text-muted-foreground">Upcoming Tasks</p>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="font-bold text-lg text-foreground">{venue.completedThisMonth}</p>
                        <p className="text-xs text-muted-foreground">Completed This Month</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      View Tasks
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}