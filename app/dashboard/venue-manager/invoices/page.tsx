"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Filter, Plus, Eye, Send, FileText } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function InvoicesPage() {
  const invoices = [
    {
      id: "INV-001",
      eventName: "Tech Summit 2025",
      client: "John Smith",
      amount: "$15,000",
      issuedDate: "2025-05-01",
      dueDate: "2025-06-01",
      status: "paid",
      type: "Booking Fee"
    },
    {
      id: "INV-002",
      eventName: "Design Conference",
      client: "Sarah Johnson",
      amount: "$8,500",
      issuedDate: "2025-05-15",
      dueDate: "2025-06-15",
      status: "pending",
      type: "Deposit"
    },
    {
      id: "INV-003",
      eventName: "Startup Networking",
      client: "Michael Chen",
      amount: "$3,200",
      issuedDate: "2025-05-10",
      dueDate: "2025-05-25",
      status: "overdue",
      type: "Full Payment"
    },
    {
      id: "INV-004",
      eventName: "Marketing Expo",
      client: "Lisa Wang",
      amount: "$12,000",
      issuedDate: "2025-05-20",
      dueDate: "2025-06-20",
      status: "draft",
      type: "Booking Fee"
    }
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "paid": return "default"
      case "pending": return "secondary"
      case "overdue": return "destructive"
      case "draft": return "outline"
      default: return "secondary"
    }
  }

  return (
    <DashboardShell role="venue-manager" title="Contracts & Invoices">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search invoices..." className="pl-10" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Invoice
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {invoices.map((invoice) => (
              <Card key={invoice.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-blue-500" />
                          <h3 className="font-bold text-lg">{invoice.id}</h3>
                        </div>
                        <Badge variant={getStatusVariant(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-muted-foreground">
                        <div>
                          <p className="text-xs font-semibold">Event</p>
                          <p>{invoice.eventName}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold">Client</p>
                          <p>{invoice.client}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold">Amount</p>
                          <p className="text-base font-bold text-foreground">{invoice.amount}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold">Issued</p>
                          <p>{invoice.issuedDate}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold">Due Date</p>
                          <p className={invoice.status === 'overdue' ? 'text-red-600 font-semibold' : ''}>
                            {invoice.dueDate}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Send className="w-4 h-4" />
                            Send to Client
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Download className="w-4 h-4" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <FileText className="w-4 h-4" />
                            Duplicate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}