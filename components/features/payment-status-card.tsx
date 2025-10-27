"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, CheckCircle2, Clock, AlertCircle, Download } from "lucide-react"

interface PaymentStatusCardProps {
  ticketId: string
  eventName: string
  amount: number
  currency: string
  status: "pending" | "completed" | "failed" | "refunded"
  paymentMethod?: string
  transactionId?: string
  purchaseDate?: string
  onDownloadReceipt?: () => void
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    badge: "warning",
    label: "Pending",
  },
  completed: {
    icon: CheckCircle2,
    color: "text-green-600",
    bgColor: "bg-green-50",
    badge: "success",
    label: "Completed",
  },
  failed: {
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    badge: "destructive",
    label: "Failed",
  },
  refunded: {
    icon: AlertCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    badge: "secondary",
    label: "Refunded",
  },
}

export function PaymentStatusCard({
  ticketId,
  eventName,
  amount,
  currency,
  status,
  paymentMethod,
  transactionId,
  purchaseDate,
  onDownloadReceipt,
}: PaymentStatusCardProps) {
  const config = statusConfig[status]
  const StatusIcon = config.icon

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{eventName}</CardTitle>
            <CardDescription>Ticket #{ticketId}</CardDescription>
          </div>
          <Badge variant={config.badge as any}>{config.label}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className={`p-4 rounded-lg ${config.bgColor} flex items-center gap-3`}>
          <StatusIcon className={`w-6 h-6 ${config.color}`} />
          <div>
            <p className="font-semibold text-sm">
              {currency} {amount.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">{config.label}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          {paymentMethod && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Payment Method
              </span>
              <span className="font-medium">{paymentMethod}</span>
            </div>
          )}

          {transactionId && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="font-mono text-xs">{transactionId}</span>
            </div>
          )}

          {purchaseDate && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Purchase Date</span>
              <span className="font-medium">{purchaseDate}</span>
            </div>
          )}
        </div>

        {status === "completed" && (
          <Button className="w-full gap-2 bg-transparent" variant="outline" onClick={onDownloadReceipt}>
            <Download className="w-4 h-4" />
            Download Receipt
          </Button>
        )}

        {status === "failed" && <Button className="w-full">Retry Payment</Button>}

        {status === "refunded" && (
          <p className="text-xs text-muted-foreground text-center py-2">
            Your refund has been processed and should appear in your account within 3-5 business days.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
