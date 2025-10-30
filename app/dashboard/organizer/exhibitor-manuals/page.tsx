"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Upload, Download, Send, FileText, Calendar, Users, Eye } from "lucide-react"
import { useState } from "react"

export default function ExhibitorManualsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const exhibitorManuals = [
    {
      id: "1",
      event: "Tech Summit 2025",
      fileName: "Exhibitor_Manual_TechSummit2025.pdf",
      description: "Complete guide for exhibitors including setup instructions, timelines, and contact information",
      version: "2.1",
      uploadDate: "2024-01-18",
      downloads: 67,
      fileSize: "4.2 MB",
      status: "ACTIVE",
      uploadedBy: "John Doe"
    },
    {
      id: "2",
      event: "Design Workshop",
      fileName: "Design_Workshop_Setup_Guide.pdf",
      description: "Setup requirements and guidelines for design workshop exhibitors",
      version: "1.0",
      uploadDate: "2024-01-12",
      downloads: 34,
      fileSize: "2.8 MB",
      status: "ACTIVE",
      uploadedBy: "Jane Smith"
    },
    {
      id: "3",
      event: "Networking Breakfast",
      fileName: "Networking_Breakfast_Exhibitor_Info.pdf",
      description: "Information packet for networking breakfast exhibitors",
      version: "1.2",
      uploadDate: "2024-01-20",
      downloads: 23,
      fileSize: "1.5 MB",
      status: "DRAFT",
      uploadedBy: "Mike Johnson"
    }
  ]

  const filteredManuals = exhibitorManuals.filter(manual =>
    manual.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
    manual.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    manual.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardShell role="organizer" title="Exhibitor Manuals">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search exhibitor manuals..."
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
              <Upload className="w-4 h-4" />
              Upload Manual
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Total Manuals</p>
                  <p className="text-2xl font-bold">{exhibitorManuals.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Active</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <Eye className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Total Downloads</p>
                  <p className="text-2xl font-bold">124</p>
                </div>
                <Download className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Events Covered</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Manuals List */}
        <Card>
          <CardHeader>
            <CardTitle>Exhibitor Manuals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredManuals.map((manual) => (
                <div
                  key={manual.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <FileText className="w-8 h-8 text-blue-500" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{manual.fileName}</p>
                        <Badge variant="outline" className={
                          manual.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }>
                          {manual.status}
                        </Badge>
                        <Badge variant="secondary">v{manual.version}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{manual.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {manual.event}
                        </span>
                        <span>Uploaded by: {manual.uploadedBy}</span>
                        <span>Size: {manual.fileSize}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{manual.downloads} downloads</p>
                      <p className="text-xs text-muted-foreground">Uploaded {manual.uploadDate}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}