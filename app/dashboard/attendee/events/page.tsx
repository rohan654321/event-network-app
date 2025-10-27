"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Ticket, Heart } from "lucide-react"

export default function MyEventsPage() {
  const events = [
    {
      id: "1",
      title: "Tech Summit 2025",
      date: "June 15-17, 2025",
      location: "San Francisco, CA",
      ticketType: "VIP",
      price: "$299",
      status: "confirmed",
      saved: true,
    },
    {
      id: "2",
      title: "Design Conference",
      date: "July 8-10, 2025",
      location: "New York, NY",
      ticketType: "Standard",
      price: "$199",
      status: "confirmed",
      saved: false,
    },
    {
      id: "3",
      title: "Startup Networking",
      date: "June 22, 2025",
      location: "Austin, TX",
      ticketType: "Standard",
      price: "$99",
      status: "confirmed",
      saved: true,
    },
  ]

  return (
    <DashboardShell role="attendee" title="My Events">
      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg">{event.title}</h3>
                    <Badge>{event.status}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <p>{event.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <p>{event.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ticket className="w-4 h-4" />
                      <p>{event.ticketType}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Price</p>
                      <p>{event.price}</p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Heart className={`w-5 h-5 ${event.saved ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
