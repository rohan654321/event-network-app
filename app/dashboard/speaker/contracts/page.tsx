// app/dashboard/speaker/contracts/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Clock, CheckCircle, AlertCircle, Eye } from "lucide-react"

interface Contract {
  id: string
  event: string
  organizer: string
  status: "draft" | "sent" | "signed" | "expired"
  amount: string
  date: string
  deadline: string
}

interface Invoice {
  id: string
  event: string
  amount: string
  status: "draft" | "sent" | "paid" | "overdue"
  issueDate: string
  dueDate: string
}

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: "CT-001",
      event: "Tech Conference 2024",
      organizer: "Tech Events Inc.",
      status: "signed",
      amount: "$2,500",
      date: "2024-01-10",
      deadline: "2024-01-20"
    },
    {
      id: "CT-002",
      event: "AI Summit",
      organizer: "AI Foundation",
      status: "sent",
      amount: "$3,000",
      date: "2024-01-15",
      deadline: "2024-01-25"
    }
  ])

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "INV-001",
      event: "Tech Conference 2024",
      amount: "$2,500",
      status: "paid",
      issueDate: "2024-01-05",
      dueDate: "2024-01-25"
    },
    {
      id: "INV-002",
      event: "AI Summit",
      amount: "$3,000",
      status: "sent",
      issueDate: "2024-01-15",
      dueDate: "2024-02-05"
    }
  ])

  const getStatusBadge = (status: string, type: "contract" | "invoice") => {
    const statusConfig = {
      contract: {
        draft: { label: "Draft", variant: "secondary" as const },
        sent: { label: "Sent", variant: "default" as const },
        signed: { label: "Signed", variant: "default" as const },
        expired: { label: "Expired", variant: "destructive" as const }
      },
      invoice: {
        draft: { label: "Draft", variant: "secondary" as const },
        sent: { label: "Sent", variant: "default" as const },
        paid: { label: "Paid", variant: "default" as const },
        overdue: { label: "Overdue", variant: "destructive" as const }
      }
    }

    const config = statusConfig[type][status as keyof typeof statusConfig.contract]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "signed":
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "sent":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "expired":
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contracts & Invoices</h1>
          <p className="text-muted-foreground">Manage your speaking agreements and payments</p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          New Contract
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contracts Section */}
        <Card>
          <CardHeader>
            <CardTitle>Contracts</CardTitle>
            <CardDescription>Your speaking agreements and contracts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contracts.map((contract) => (
                <Card key={contract.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(contract.status)}
                        <div>
                          <p className="font-medium">{contract.event}</p>
                          <p className="text-sm text-muted-foreground">{contract.organizer}</p>
                        </div>
                      </div>
                      {getStatusBadge(contract.status, "contract")}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-medium">{contract.amount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Deadline</p>
                        <p className="font-medium">{contract.deadline}</p>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="text-xs text-muted-foreground">
                        Contract ID: {contract.id}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Invoices Section */}
        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
            <CardDescription>Payment requests and invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <Card key={invoice.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(invoice.status)}
                        <div>
                          <p className="font-medium">{invoice.event}</p>
                          <p className="text-sm text-muted-foreground">Invoice {invoice.id}</p>
                        </div>
                      </div>
                      {getStatusBadge(invoice.status, "invoice")}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-medium">{invoice.amount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Due Date</p>
                        <p className="font-medium">{invoice.dueDate}</p>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="text-xs text-muted-foreground">
                        Issued: {invoice.issueDate}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contracts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Signatures</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Need your attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Payments</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,500</div>
            <p className="text-xs text-muted-foreground">Across 2 invoices</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}