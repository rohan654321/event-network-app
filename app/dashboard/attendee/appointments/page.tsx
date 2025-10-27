"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, MapPin } from "lucide-react"

export default function AppointmentsPage() {
  const appointments = [
    {
      id: "1",
      title: "Meeting with Tech Corp",
      contact: "John Smith",
      date: "June 16, 2025",
      time: "10:00 AM",
      location: "Tech Summit - Booth A-12",
      status: "confirmed",
    },
    {
      id: "2",
      title: "Coffee Chat",
      contact: "Sarah Johnson",
      date: "June 17, 2025",
      time: "2:00 PM",
      location: "Tech Summit - Networking Area",
      status: "confirmed",
    },
    {
      id: "3",
      title: "Product Demo",
      contact: "Michael Chen",
      date: "June 18, 2025",
      time: "11:00 AM",
      location: "Tech Summit - Booth B-05",
      status: "pending",
    },
  ]

  return (
    <DashboardShell role="attendee" title="Appointments">
      <div className="space-y-4">
        {appointments.map((apt) => (
          <Card key={apt.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg">{apt.title}</h3>
                    <Badge variant={apt.status === "confirmed" ? "default" : "secondary"}>{apt.status}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <p>{apt.contact}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <p>{apt.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <p>{apt.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <p>{apt.location}</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="bg-transparent">
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
