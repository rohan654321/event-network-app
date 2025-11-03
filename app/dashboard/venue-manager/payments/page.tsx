"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Filter, Plus } from "lucide-react"

export default function PaymentsPage() {
  const payments = [
    {
      id: "1",
      eventName: "Tech Summit 2025",
      organizer: "John Smith",
      amount: "$15,000",
      date: "2025-06-15",
      status: "paid",
      type: "Booking Fee",
    },
    {
      id: "2",
      eventName: "Design Conference",
      organizer: "Sarah Johnson",
      amount: "$8,500",
      date: "2025-07-08",
      status: "pending",
      type: "Deposit",
    },
    {
      id: "3",
      eventName: "Startup Networking",
      organizer: "Michael Chen",
      amount: "$3,200",
      date: "2025-06-22",
      status: "overdue",
      type: "Full Payment",
    },
  ]

  const revenueStats = [
    { label: "Total Revenue", value: "$89,450", change: "+18%" },
    { label: "Pending Payments", value: "$11,700", change: "-5%" },
    { label: "Overdue", value: "$3,200", change: "+2%" },
    { label: "This Month", value: "$24,500", change: "+12%" },
  ]

  return (
    <DashboardShell role="venue-manager" title="Revenue & Payments">
      <div className="space-y-6">
        {/* Revenue Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {revenueStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all">All Payments</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Create Invoice
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            {payments.map(payment => (
              <Card key={payment.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg">{payment.eventName}</h3>
                        <Badge variant={
                          payment.status === "paid" ? "default" :
                          payment.status === "pending" ? "secondary" : "destructive"
                        }>
                          {payment.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>
                          <p className="text-xs font-semibold">Organizer</p>
                          <p>{payment.organizer}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold">Amount</p>
                          <p className="text-base font-bold text-foreground">{payment.amount}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold">Due Date</p>
                          <p>{payment.date}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold">Type</p>
                          <p>{payment.type}</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="bg-transparent">
                      View Details
                    </Button>
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