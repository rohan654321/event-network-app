"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, MoreHorizontal, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function EventsPage() {
  const events = [
    {
      id: "1",
      title: "Tech Summit 2025",
      date: "June 15-17, 2025",
      location: "San Francisco, CA",
      registrations: 1250,
      capacity: 2000,
      status: "published",
    },
    {
      id: "2",
      title: "Design Workshop",
      date: "June 22, 2025",
      location: "New York, NY",
      registrations: 340,
      capacity: 500,
      status: "published",
    },
    {
      id: "3",
      title: "Networking Breakfast",
      date: "July 5, 2025",
      location: "Austin, TX",
      registrations: 0,
      capacity: 200,
      status: "draft",
    },
  ]

  return (
    <DashboardShell role="organizer" title="Events Management">
      <div className="space-y-6">
        {/* Header with Search and Add Button */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search events..." className="pl-10" />
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Event
          </Button>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg">{event.title}</h3>
                      <Badge variant={event.status === "published" ? "default" : "secondary"}>{event.status}</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <p className="text-xs font-semibold">Date</p>
                        <p>{event.date}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Location</p>
                        <p>{event.location}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Registrations</p>
                        <p className="text-base font-bold text-foreground">
                          {event.registrations}/{event.capacity}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Capacity</p>
                        <p>{Math.round((event.registrations / event.capacity) * 100)}% full</p>
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
                        <Eye className="w-4 h-4" />
                        View
                      </DropdownMenuItem>
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
