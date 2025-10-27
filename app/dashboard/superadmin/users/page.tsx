"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { UsersTable } from "@/components/tables/users-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"

export default function UsersPage() {
  const users = [
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      role: "organizer",
      status: "active" as const,
      joinDate: "Jan 15, 2025",
      events: 5,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "venue-manager",
      status: "active" as const,
      joinDate: "Feb 20, 2025",
      events: 3,
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "michael@example.com",
      role: "speaker",
      status: "active" as const,
      joinDate: "Mar 10, 2025",
      events: 8,
    },
    {
      id: "4",
      name: "Emma Davis",
      email: "emma@example.com",
      role: "attendee",
      status: "inactive" as const,
      joinDate: "Apr 5, 2025",
      events: 2,
    },
    {
      id: "5",
      name: "David Wilson",
      email: "david@example.com",
      role: "exhibitor",
      status: "suspended" as const,
      joinDate: "May 12, 2025",
      events: 1,
    },
  ]

  return (
    <DashboardShell role="superadmin" title="Users Management">
      <div className="space-y-6">
        {/* Header with Search and Add Button */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-10" />
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add User
          </Button>
        </div>

        {/* Users Table */}
        <UsersTable users={users} />
      </div>
    </DashboardShell>
  )
}
