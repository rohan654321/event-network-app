"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit2, Trash2, BarChart3, Send } from "lucide-react"

interface Promotion {
  id: string
  title: string
  description: string
  discount: number
  code: string
  status: "active" | "expired" | "draft"
  startDate: string
  endDate: string
  views: number
  clicks: number
  conversions: number
}

interface PromotionsManagerProps {
  promotions: Promotion[]
  onAdd?: (promotion: Omit<Promotion, "id" | "views" | "clicks" | "conversions">) => void
  onDelete?: (id: string) => void
  onSendNotification?: (id: string) => void
}

export function PromotionsManager({ promotions, onAdd, onDelete, onSendNotification }: PromotionsManagerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount: 0,
    code: "",
    startDate: "",
    endDate: "",
  })

  const handleAdd = () => {
    if (formData.title && formData.code) {
      onAdd?.({
        ...formData,
        status: "draft",
      })
      setFormData({
        title: "",
        description: "",
        discount: 0,
        code: "",
        startDate: "",
        endDate: "",
      })
      setIsOpen(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-900"
      case "expired":
        return "bg-red-100 text-red-900"
      case "draft":
        return "bg-gray-100 text-gray-900"
      default:
        return "bg-gray-100 text-gray-900"
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Promotions Manager</CardTitle>
              <CardDescription>Create and manage promotional campaigns</CardDescription>
            </div>
            <Button size="sm" className="gap-2" onClick={() => setIsOpen(!isOpen)}>
              <Plus className="w-4 h-4" />
              New Promotion
            </Button>
          </div>
        </CardHeader>

        {isOpen && (
          <CardContent className="space-y-4 border-t pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="Promotion title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Promotion description..."
                value={formData.description}
                onChange={(e: { target: { value: any } }) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Discount %</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: Number.parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Promo Code</label>
                <Input
                  placeholder="PROMO20"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={handleAdd}>
                Create Promotion
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      <div className="space-y-3">
        {promotions.map((promo) => (
          <Card key={promo.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{promo.title}</h3>
                    <Badge className={getStatusColor(promo.status)} variant="outline">
                      {promo.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{promo.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{promo.discount}%</p>
                  <p className="text-xs text-muted-foreground font-mono">{promo.code}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 py-3 border-y text-center text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Views</p>
                  <p className="font-semibold">{promo.views}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Clicks</p>
                  <p className="font-semibold">{promo.clicks}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Conversions</p>
                  <p className="font-semibold">{promo.conversions}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="flex-1 gap-2 bg-transparent">
                  <BarChart3 className="w-4 h-4" />
                  Analytics
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 gap-2 bg-transparent"
                  onClick={() => onSendNotification?.(promo.id)}
                >
                  <Send className="w-4 h-4" />
                  Notify
                </Button>
                <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 bg-transparent text-destructive"
                  onClick={() => onDelete?.(promo.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
