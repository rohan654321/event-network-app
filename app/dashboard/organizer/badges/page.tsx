"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Send, Download, BadgeCheck, Users, Mail, AlertCircle } from "lucide-react"
import { useState } from "react"

export default function BadgeManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const badgeStats = [
    { event: "Tech Summit 2025", total: 1245, sent: 1089, failed: 12, rate: "99.2%" },
    { event: "Design Workshop", total: 340, sent: 320, failed: 5, rate: "98.5%" },
    { event: "Networking Breakfast", total: 150, sent: 0, failed: 0, rate: "0%" }
  ]

  const recentBadges = [
    {
      id: "1",
      attendee: "Sarah Johnson",
      email: "sarah@example.com",
      event: "Tech Summit 2025",
      sentAt: "2024-01-20 14:30",
      status: "SENT",
      badgeUrl: "/badges/sarah-johnson.pdf"
    },
    {
      id: "2",
      attendee: "Mike Chen",
      email: "mike@example.com",
      event: "Tech Summit 2025",
      sentAt: "2024-01-20 14:25",
      status: "FAILED",
      badgeUrl: "/badges/mike-chen.pdf"
    },
    {
      id: "3",
      attendee: "Emily Davis",
      email: "emily@example.com",
      event: "Design Workshop",
      sentAt: "2024-01-19 11:15",
      status: "SENT",
      badgeUrl: "/badges/emily-davis.pdf"
    }
  ]

  return (
    <DashboardShell role="organizer" title="Badge Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search badges..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export List
            </Button>
            <Button className="gap-2">
              <Send className="w-4 h-4" />
              Send All Badges
            </Button>
            <Button className="gap-2">
              <BadgeCheck className="w-4 h-4" />
              Generate Badges
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {badgeStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{stat.event}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Total Badges</span>
                  <span className="font-semibold">{stat.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Sent</span>
                  <span className="font-semibold text-green-600">{stat.sent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Failed</span>
                  <span className="font-semibold text-red-600">{stat.failed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Delivery Rate</span>
                  <span className="font-semibold">{stat.rate}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Badge Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Badge Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <BadgeCheck className={`w-8 h-8 ${
                      badge.status === 'SENT' ? 'text-green-500' : 'text-red-500'
                    }`} />
                    <div>
                      <p className="font-semibold">{badge.attendee}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {badge.email}
                        </span>
                        <span>{badge.event}</span>
                        <span>Sent: {badge.sentAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={badge.status === 'SENT' ? 'default' : 'destructive'}>
                      {badge.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                      {badge.status === 'FAILED' && (
                        <Button size="sm">
                          <Send className="w-4 h-4" />
                          Retry
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <Users className="w-8 h-8 text-blue-500 mx-auto" />
                <p className="font-semibold">Preview Design</p>
                <Button size="sm" variant="outline" className="w-full">
                  View Template
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <Mail className="w-8 h-8 text-green-500 mx-auto" />
                <p className="font-semibold">Email Settings</p>
                <Button size="sm" variant="outline" className="w-full">
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <Download className="w-8 h-8 text-purple-500 mx-auto" />
                <p className="font-semibold">Bulk Download</p>
                <Button size="sm" variant="outline" className="w-full">
                  Download All
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-orange-500 mx-auto" />
                <p className="font-semibold">Failed Deliveries</p>
                <Button size="sm" variant="outline" className="w-full">
                  View Issues
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}