"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function VenuesPage() {
  const venues = [
    {
      id: "1",
      name: "San Francisco Convention Center",
      location: "San Francisco, CA",
      capacity: 5000,
      bookings: 12,
      rating: 4.9,
      status: "active",
    },
    {
      id: "2",
      name: "The Grand Ballroom",
      location: "New York, NY",
      capacity: 1000,
      bookings: 8,
      rating: 4.8,
      status: "active",
    },
    {
      id: "3",
      name: "Tech Hub Austin",
      location: "Austin, TX",
      capacity: 500,
      bookings: 4,
      rating: 4.7,
      status: "active",
    },
  ]

  return (
    <DashboardShell role="venue-manager" title="Venues Management">
      <div className="space-y-6">
        {/* Header with Search and Add Button */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search venues..." className="pl-10" />
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Venue
          </Button>
        </div>

        {/* Venues List */}
        <div className="space-y-4">
          {venues.map((venue) => (
            <Card key={venue.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg">{venue.name}</h3>
                      <Badge>{venue.status}</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <p className="text-xs font-semibold">Location</p>
                        <p>{venue.location}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Capacity</p>
                        <p className="text-base font-bold text-foreground">{venue.capacity}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Bookings</p>
                        <p className="text-base font-bold text-foreground">{venue.bookings}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Rating</p>
                        <p className="text-base font-bold text-foreground">{venue.rating}</p>
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
