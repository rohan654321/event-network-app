"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Calendar,
  Building2,
  Mic2,
  Store,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  MessageSquare,
  UserPlus,
  BadgeCheck,
  BookOpen,
  FileText,
  Megaphone,
  Plug,
  TrendingUp,
  User,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  role: "superadmin" | "organizer" | "venue-manager" | "speaker" | "exhibitor" | "attendee"
}

const roleMenus = {
  superadmin: [
    { label: "Dashboard", href: "/dashboard/superadmin", icon: LayoutDashboard },
    { label: "Users", href: "/dashboard/superadmin/users", icon: Users },
    { label: "Analytics", href: "/dashboard/superadmin/analytics", icon: BarChart3 },
    { label: "Promotions", href: "/dashboard/superadmin/promotions", icon: Calendar },
    { label: "Settings", href: "/dashboard/superadmin/settings", icon: Settings },
  ],
// In the organizer menu array, add:
organizer: [
  { label: "Dashboard", href: "/dashboard/organizer", icon: LayoutDashboard },
  { label: "Events", href: "/dashboard/organizer/events", icon: Calendar },
  { label: "Registrations", href: "/dashboard/organizer/registrations", icon: Users },
  { label: "Sessions", href: "/dashboard/organizer/sessions", icon: Mic2 },
  { label: "Promotions", href: "/dashboard/organizer/promotions", icon: BarChart3 },
  { label: "Analytics", href: "/dashboard/organizer/analytics", icon: BarChart3 },
  { label: "Connections", href: "/dashboard/organizer/connections", icon: UserPlus },
  { label: "Messages", href: "/dashboard/organizer/messages", icon: MessageSquare },
  { label: "Legal Documents", href: "/dashboard/organizer/legal-documents", icon: FileText }, // New
  { label: "Exhibitor Manuals", href: "/dashboard/organizer/exhibitor-manuals", icon: BookOpen }, // New
  { label: "Badge Management", href: "/dashboard/organizer/badges", icon: BadgeCheck }, // New
],
"venue-manager": [
  { label: "Dashboard", href: "/dashboard/venue-manager", icon: LayoutDashboard },
  { label: "Venues", href: "/dashboard/venue-manager/venues", icon: Building2 },
  { label: "Bookings", href: "/dashboard/venue-manager/bookings", icon: Calendar },
  { label: "Revenue & Payments", href: "/dashboard/venue-manager/payments", icon: BarChart3 },
  { label: "Analytics & Reports", href: "/dashboard/venue-manager/analytics", icon: TrendingUp },
  { label: "Team Management", href: "/dashboard/venue-manager/team", icon: Users },
  { label: "Maintenance", href: "/dashboard/venue-manager/maintenance", icon: Settings },
  { label: "Inquiries", href: "/dashboard/venue-manager/inquiries", icon: MessageSquare },
  { label: "Contracts & Invoices", href: "/dashboard/venue-manager/invoices", icon: FileText },
  { label: "Integrations", href: "/dashboard/venue-manager/integrations", icon: Plug },
  { label: "Promotions", href: "/dashboard/venue-manager/promotions", icon: Megaphone },
  { label: "Connections", href: "/dashboard/venue-manager/connections", icon: UserPlus },
  { label: "Messages", href: "/dashboard/venue-manager/messages", icon: MessageSquare },
  { label: "Settings", href: "/dashboard/venue-manager/settings", icon: Settings },
],
  speaker: [
  { label: "Dashboard", href: "/dashboard/speaker", icon: LayoutDashboard },
  { label: "My Events", href: "/dashboard/speaker/events", icon: Calendar },
  { label: "Sessions", href: "/dashboard/speaker/sessions", icon: Mic2 },
  { label: "Materials", href: "/dashboard/speaker/materials", icon: BookOpen },
  { label: "Media Uploads", href: "/dashboard/speaker/uploads", icon: FileText },
  { label: "Q&A & Polls", href: "/dashboard/speaker/qa", icon: MessageSquare },
  { label: "Analytics", href: "/dashboard/speaker/analytics", icon: TrendingUp },
  { label: "Connections", href: "/dashboard/speaker/connections", icon: UserPlus },
  { label: "Messages", href: "/dashboard/speaker/messages", icon: MessageSquare },
  { label: "Contracts & Invoices", href: "/dashboard/speaker/contracts", icon: FileText },
  { label: "Support", href: "/dashboard/speaker/support", icon: Settings },
  { label: "Profile", href: "/dashboard/speaker/profile", icon: User },
],

  exhibitor: [
    { label: "Dashboard", href: "/dashboard/exhibitor", icon: LayoutDashboard },
    { label: "Booths", href: "/dashboard/exhibitor/booths", icon: Store },
    { label: "Appointments", href: "/dashboard/exhibitor/appointments", icon: Calendar },
    { label: "Connections", href: "/dashboard/exhibitor/connections", icon: UserPlus },
    { label: "Messages", href: "/dashboard/exhibitor/messages", icon: MessageSquare },
  ],
  attendee: [
    { label: "Dashboard", href: "/dashboard/attendee", icon: LayoutDashboard },
    { label: "My Events", href: "/dashboard/attendee/events", icon: Calendar },
    { label: "Connections", href: "/dashboard/attendee/connections", icon: UserPlus },
    { label: "Appointments", href: "/dashboard/attendee/appointments", icon: Calendar },
    { label: "Messages", href: "/dashboard/attendee/messages", icon: MessageSquare },
  ],
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const menu = roleMenus[role]

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-64px)] border-r border-border bg-sidebar transition-all duration-300 z-40",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      <div className="flex flex-col h-full">
        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menu.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm font-medium",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4 space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronDown className={cn("w-4 h-4 transition-transform", isCollapsed && "rotate-180")} />
            {!isCollapsed && <span className="ml-2">Collapse</span>}
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive">
            <LogOut className="w-4 h-4" />
            {!isCollapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  )
}