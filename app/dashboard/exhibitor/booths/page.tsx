"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function BoothsPage() {
  const booths = [
    {
      id: "1",
      eventName: "Tech Summit 2025",
      boothNumber: "A-12",
      size: "10x10",
      price: "$2,500",
      status: "active",
      leads: 85,
    },
    {
      id: "2",
      eventName: "Design Conference",
      boothNumber: "B-05",
      size: "10x20",
      price: "$4,500",
      status: "active",
      leads: 0,
    },
    {
      id: "3",
      eventName: "Startup Networking",
      boothNumber: "C-08",
      size: "8x8",
      price: "$1,500",
      status: "pending",
      leads: 0,
    },
  ]

  return (
    <DashboardShell role="exhibitor" title="My Booths">
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Book New Booth
          </Button>
        </div>

        <div className="space-y-4">
          {booths.map((booth) => (
            <Card key={booth.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg">{booth.eventName}</h3>
                      <Badge variant={booth.status === "active" ? "default" : "secondary"}>{booth.status}</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-muted-foreground">
                      <div>
                        <p className="text-xs font-semibold">Booth #</p>
                        <p className="font-bold text-foreground">{booth.boothNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Size</p>
                        <p>{booth.size}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Price</p>
                        <p className="font-bold text-foreground">{booth.price}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Leads</p>
                        <p className="font-bold text-foreground">{booth.leads}</p>
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
                        Cancel
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
