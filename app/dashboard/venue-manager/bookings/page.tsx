"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

export default function BookingsPage() {
  const bookings = [
    {
      id: "1",
      eventName: "Tech Summit 2025",
      venueName: "San Francisco Convention Center",
      date: "June 15-17, 2025",
      organizer: "John Smith",
      capacity: 2000,
      status: "confirmed",
    },
    {
      id: "2",
      eventName: "Design Conference",
      venueName: "The Grand Ballroom",
      date: "July 8-10, 2025",
      organizer: "Sarah Johnson",
      capacity: 1000,
      status: "confirmed",
    },
    {
      id: "3",
      eventName: "Startup Networking",
      venueName: "Tech Hub Austin",
      date: "June 22, 2025",
      organizer: "Michael Chen",
      capacity: 500,
      status: "pending",
    },
  ]

  return (
    <DashboardShell role="venue-manager" title="Bookings">
      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg">{booking.eventName}</h3>
                    <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>{booking.status}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                    <div>
                      <p className="text-xs font-semibold">Venue</p>
                      <p>{booking.venueName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <p>{booking.date}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Organizer</p>
                      <p>{booking.organizer}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Capacity</p>
                      <p className="text-base font-bold text-foreground">{booking.capacity}</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="bg-transparent">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
