"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Ticket, Percent } from "lucide-react"

interface TicketOption {
  id: string
  name: string
  price: number
  quantity: number
  available: number
}

interface TicketCheckoutProps {
  eventName: string
  eventDate: string
  tickets: TicketOption[]
  onCheckout?: (items: Array<{ ticketId: string; quantity: number }>) => void
}

export function TicketCheckout({ eventName, eventDate, tickets, onCheckout }: TicketCheckoutProps) {
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({})
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const subtotal = Object.entries(selectedTickets).reduce((sum, [ticketId, qty]) => {
    const ticket = tickets.find((t) => t.id === ticketId)
    return sum + (ticket?.price || 0) * qty
  }, 0)

  const total = subtotal - discount

  const handleQuantityChange = (ticketId: string, quantity: number) => {
    if (quantity === 0) {
      const { [ticketId]: _, ...rest } = selectedTickets
      setSelectedTickets(rest)
    } else {
      setSelectedTickets({ ...selectedTickets, [ticketId]: quantity })
    }
  }

  const handleApplyPromo = () => {
    if (promoCode === "SAVE20") {
      setDiscount(subtotal * 0.2)
    } else if (promoCode === "SAVE10") {
      setDiscount(subtotal * 0.1)
    }
  }

  const handleCheckout = () => {
    const items = Object.entries(selectedTickets).map(([ticketId, quantity]) => ({
      ticketId,
      quantity,
    }))
    onCheckout?.(items)
  }

  const itemCount = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{eventName}</CardTitle>
            <CardDescription>{eventDate}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Ticket className="w-4 h-4 text-primary" />
                    <p className="font-semibold">{ticket.name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{ticket.available} available</p>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-bold text-lg">${ticket.price}</p>
                  <Select
                    value={(selectedTickets[ticket.id] || 0).toString()}
                    onValueChange={(value) => handleQuantityChange(ticket.id, Number.parseInt(value))}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Promo Code</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              />
              <Button onClick={handleApplyPromo} className="gap-2">
                <Percent className="w-4 h-4" />
                Apply
              </Button>
            </div>
            {discount > 0 && (
              <Badge variant="secondary" className="gap-1">
                Discount applied: ${discount.toFixed(2)}
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="sticky top-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Order Summary
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items ({itemCount})</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full gap-2" disabled={itemCount === 0} onClick={handleCheckout}>
              <ShoppingCart className="w-4 h-4" />
              Proceed to Checkout
            </Button>

            <p className="text-xs text-muted-foreground text-center">Secure payment powered by Stripe</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
