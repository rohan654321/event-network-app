"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, UserPlus, MessageSquare } from "lucide-react"
import Image from "next/image"

export default function ConnectionsPage() {
  const connections = [
    {
      id: "1",
      name: "John Smith",
      title: "Product Manager at Tech Corp",
      image: "/man.jpg",
      status: "connected",
      mutualConnections: 5,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      title: "Designer at Innovation Labs",
      image: "/professional-woman.png",
      status: "connected",
      mutualConnections: 3,
    },
    {
      id: "3",
      name: "Michael Chen",
      title: "Founder at StartupXYZ",
      image: "/man.jpg",
      status: "pending",
      mutualConnections: 2,
    },
  ]

  return (
    <DashboardShell role="attendee" title="Connections">
      <div className="space-y-6">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search connections..." className="pl-10" />
        </div>

        {/* Connections List */}
        <div className="space-y-4">
          {connections.map((connection) => (
            <Card key={connection.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <Image
                      src={connection.image || "/placeholder.svg"}
                      alt={connection.name}
                      width={56}
                      height={56}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{connection.name}</p>
                      <p className="text-sm text-muted-foreground">{connection.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {connection.mutualConnections} mutual connections
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {connection.status === "connected" ? (
                      <>
                        <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                          <MessageSquare className="w-4 h-4" />
                          Message
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" className="gap-2">
                        <UserPlus className="w-4 h-4" />
                        Accept
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
