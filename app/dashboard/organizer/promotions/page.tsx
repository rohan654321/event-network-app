"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function PromotionsPage() {
  const promotions = [
    {
      id: "1",
      name: "Early Bird Discount",
      code: "EARLYBIRD20",
      discount: "20%",
      status: "active",
      usageCount: 145,
      maxUses: 500,
    },
    {
      id: "2",
      name: "Group Discount",
      code: "GROUP15",
      discount: "15%",
      status: "active",
      usageCount: 89,
      maxUses: 1000,
    },
    {
      id: "3",
      name: "Student Discount",
      code: "STUDENT10",
      discount: "10%",
      status: "inactive",
      usageCount: 234,
      maxUses: 500,
    },
  ]

  return (
    <DashboardShell role="organizer" title="Promotions">
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Promotion
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {promotions.map((promo) => (
            <Card key={promo.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg">{promo.name}</h3>
                      <Badge variant={promo.status === "active" ? "default" : "secondary"}>{promo.status}</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <p className="text-xs font-semibold">Code</p>
                        <p className="font-mono font-bold text-foreground">{promo.code}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Discount</p>
                        <p className="text-base font-bold text-foreground">{promo.discount}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Usage</p>
                        <p className="text-base font-bold text-foreground">
                          {promo.usageCount}/{promo.maxUses}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Usage Rate</p>
                        <p>{Math.round((promo.usageCount / promo.maxUses) * 100)}%</p>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Edit className="w-4 h-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
