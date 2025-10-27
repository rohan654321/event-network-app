"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"

export default function AppointmentsPage() {
  const appointments = [
    {
      id: "1",
      visitorName: "John Smith",
      company: "Tech Corp",
      date: "June 16, 2025",
      time: "10:00 AM",
      duration: "30 min",
      status: "confirmed",
      booth: "A-12",
    },
    {
      id: "2",
      visitorName: "Sarah Johnson",
      company: "Innovation Labs",
      date: "June 16, 2025",
      time: "11:00 AM",
      duration: "30 min",
      status: "confirmed",
      booth: "A-12",
    },
    {
      id: "3",
      visitorName: "Michael Chen",
      company: "StartupXYZ",
      date: "June 17, 2025",
      time: "2:00 PM",
      duration: "45 min",
      status: "pending",
      booth: "A-12",
    },
  ]

  return (
    <DashboardShell role="exhibitor" title="Appointments">
      <div className="space-y-4">
        {appointments.map((apt) => (
          <Card key={apt.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg">{apt.visitorName}</h3>
                    <Badge variant={apt.status === "confirmed" ? "default" : "secondary"}>{apt.status}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <p>{apt.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <p>{apt.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <p>{apt.time}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Duration</p>
                      <p>{apt.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Booth</p>
                      <p className="font-bold">{apt.booth}</p>
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
