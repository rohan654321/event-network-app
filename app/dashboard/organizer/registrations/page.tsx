"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Filter } from "lucide-react"

export default function RegistrationsPage() {
  const registrations = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      event: "Tech Summit 2025",
      ticketType: "VIP",
      status: "confirmed",
      registeredDate: "June 1, 2025",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      event: "Tech Summit 2025",
      ticketType: "Standard",
      status: "confirmed",
      registeredDate: "June 2, 2025",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      event: "Design Workshop",
      ticketType: "Standard",
      status: "pending",
      registeredDate: "June 3, 2025",
    },
  ]

  return (
    <DashboardShell role="organizer" title="Registrations">
      <div className="space-y-6">
        {/* Header with Search and Export */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search registrations..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Registrations Table */}
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Event</th>
                    <th className="text-left py-3 px-4 font-semibold">Ticket Type</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg) => (
                    <tr key={reg.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-medium">{reg.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{reg.email}</td>
                      <td className="py-3 px-4">{reg.event}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{reg.ticketType}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            reg.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {reg.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{reg.registeredDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
