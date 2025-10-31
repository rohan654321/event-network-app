"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SessionsPage() {
  const sessions = [
    {
      id: "1",
      title: "AI & Machine Learning Workshop",
      event: "Tech Summit 2025",
      date: "June 16, 2025",
      time: "11:00 AM - 12:30 PM",
      attendees: 280,
      rating: 4.9,
      status: "scheduled",
    },
    {
      id: "2",
      title: "Future of Web Development",
      event: "Design Conference",
      date: "July 9, 2025",
      time: "2:00 PM - 3:30 PM",
      attendees: 150,
      rating: 4.8,
      status: "scheduled",
    },
    {
      id: "3",
      title: "Cloud Architecture Deep Dive",
      event: "Tech Summit 2024",
      date: "May 20, 2024",
      time: "10:00 AM - 11:30 AM",
      attendees: 200,
      rating: 4.7,
      status: "completed",
    },
  ]

  return (
    <DashboardShell role="speaker" title="My Sessions">
      <div className="space-y-6">
        {/* Header with Search and Add Button */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search sessions..." className="pl-10" />
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Session
          </Button>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {sessions.map((session) => (
            <Card key={session.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg">{session.title}</h3>
                      <Badge variant={session.status === "completed" ? "secondary" : "default"}>{session.status}</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-muted-foreground">
                      <div>
                        <p className="text-xs font-semibold">Event</p>
                        <p>{session.event}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Date</p>
                        <p>{session.date}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Time</p>
                        <p>{session.time}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Attendees</p>
                        <p className="text-base font-bold text-foreground">{session.attendees}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Rating</p>
                        <p className="text-base font-bold text-yellow-500">{session.rating}★</p>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Edit className="w-4 h-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
