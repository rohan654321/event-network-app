"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Upload, Download, Send, FileText, ShieldCheck, Calendar, Users } from "lucide-react"
import { useState } from "react"

export default function LegalDocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const legalDocuments = [
    {
      id: "1",
      name: "Event Contract Template",
      type: "EVENT_CONTRACT",
      category: "CONTRACT_TEMPLATE",
      status: "ACTIVE",
      version: "2.1",
      downloads: 45,
      lastUpdated: "2024-01-15",
      fileSize: "2.4 MB",
      event: "All Events"
    },
    {
      id: "2",
      name: "Venue Safety Compliance Certificate",
      type: "COMPLIANCE_CERTIFICATE",
      category: "FIRE_SAFETY",
      status: "VALID",
      version: "1.0",
      downloads: 23,
      lastUpdated: "2024-01-10",
      fileSize: "1.8 MB",
      event: "Tech Summit 2025"
    },
    {
      id: "3",
      name: "Terms & Conditions",
      type: "STANDARD_DOCUMENT",
      category: "TERMS_CONDITIONS",
      status: "ACTIVE",
      version: "3.2",
      downloads: 89,
      lastUpdated: "2024-01-05",
      fileSize: "1.2 MB",
      event: "All Events"
    },
    {
      id: "4",
      name: "Insurance Policy Document",
      type: "STANDARD_DOCUMENT",
      category: "INSURANCE",
      status: "VALID",
      version: "1.1",
      downloads: 34,
      lastUpdated: "2024-01-08",
      fileSize: "3.1 MB",
      event: "Design Workshop"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800'
      case 'VALID': return 'bg-blue-100 text-blue-800'
      case 'DRAFT': return 'bg-yellow-100 text-yellow-800'
      case 'EXPIRED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'EVENT_CONTRACT': return <FileText className="w-5 h-5 text-blue-500" />
      case 'COMPLIANCE_CERTIFICATE': return <ShieldCheck className="w-5 h-5 text-green-500" />
      default: return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  const filteredDocuments = legalDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.event.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardShell role="organizer" title="Legal Documents">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search legal documents..."
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
              Upload Document
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Total Documents</p>
                  <p className="text-2xl font-bold">{legalDocuments.length}</p>
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
                  <p className="text-2xl font-bold">3</p>
                </div>
                <ShieldCheck className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Total Downloads</p>
                  <p className="text-2xl font-bold">191</p>
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

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle>Legal Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {getTypeIcon(doc.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{doc.name}</p>
                        <Badge variant="outline" className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Type: {doc.type.replace('_', ' ')}</span>
                        <span>Category: {doc.category.replace('_', ' ')}</span>
                        <span>Version: {doc.version}</span>
                        <span>Event: {doc.event}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{doc.downloads} downloads</p>
                      <p className="text-xs text-muted-foreground">{doc.fileSize} • Updated {doc.lastUpdated}</p>
                    </div>
                    <div className="flex gap-2">
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