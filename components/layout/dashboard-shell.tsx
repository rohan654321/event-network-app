"use client"

import type React from "react"

import { Navbar } from "./navbar"
import { Sidebar } from "./sidebar"
import { Bell, MessageSquare, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DashboardShellProps {
  children: React.ReactNode
  role: "superadmin" | "organizer" | "venue-manager" | "speaker" | "exhibitor" | "attendee"
  title?: string
}

export function DashboardShell({ children, role, title }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar role={role} />
        <main className="flex-1 ml-64 pt-4">
          {/* Top Bar */}
          <div className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="px-8 py-4 flex items-center justify-between">
              <div>{title && <h1 className="text-2xl font-bold">{title}</h1>}</div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="bg-transparent border-0 outline-none w-48 text-sm" />
                </div>
                <Button variant="ghost" size="icon">
                  <Bell className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageSquare className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
