"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Plus, Megaphone, Eye, Calendar, Users, TrendingUp } from "lucide-react"

export default function PromotionsPage() {
  const promotions = [
    {
      id: "1",
      title: "Summer Venue Discount",
      description: "15% off for events booked in June & July",
      status: "active",
      type: "Discount",
      venues: ["All Venues"],
      budget: "$2,000",
      spent: "$1,250",
      impressions: "45.2K",
      clicks: "1.2K",
      startDate: "2025-05-01",
      endDate: "2025-07-31"
    },
    {
      id: "2",
      title: "Corporate Package",
      description: "Special rates for corporate events",
      status: "active",
      type: "Package",
      venues: ["SF Convention", "Grand Ballroom"],
      budget: "$5,000",
      spent: "$3,800",
      impressions: "78.5K",
      clicks: "2.1K",
      startDate: "2025-04-15",
      endDate: "2025-12-31"
    },
    {
      id: "3",
      title: "Weekday Special",
      description: "20% discount for Monday-Thursday bookings",
      status: "paused",
      type: "Discount",
      venues: ["Tech Hub Austin"],
      budget: "$1,000",
      spent: "$450",
      impressions: "12.3K",
      clicks: "345",
      startDate: "2025-05-10",
      endDate: "2025-08-10"
    },
    {
      id: "4",
      title: "Early Bird 2026",
      description: "Book 2026 events now and save 25%",
      status: "draft",
      type: "Early Bird",
      venues: ["All Venues"],
      budget: "$3,000",
      spent: "$0",
      impressions: "0",
      clicks: "0",
      startDate: "2025-09-01",
      endDate: "2025-12-31"
    }
  ]

  const stats = [
    { label: "Active Campaigns", value: "2", change: "+0" },
    { label: "Total Budget", value: "$8,000", change: "+$2,000" },
    { label: "Total Spent", value: "$5,500", change: "+$1,200" },
    { label: "ROI", value: "3.2x", change: "+0.4x" },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active": return "default"
      case "paused": return "secondary"
      case "draft": return "outline"
      default: return "secondary"
    }
  }

  return (
    <DashboardShell role="venue-manager" title="Promotions">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Promotion Campaigns</h1>
            <p className="text-muted-foreground">Manage your venue promotions and special offers</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Campaign
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Campaigns</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="paused">Paused</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {promotions.map((promotion) => (
              <Card key={promotion.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Megaphone className="w-5 h-5 text-orange-500" />
                        <h3 className="font-bold text-lg">{promotion.title}</h3>
                        <Badge variant={getStatusVariant(promotion.status)}>
                          {promotion.status}
                        </Badge>
                        <Badge variant="outline">{promotion.type}</Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{promotion.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                        <div>
                          <p className="text-xs font-semibold">Venues</p>
                          <p>{promotion.venues.join(", ")}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold">Budget</p>
                          <p className="text-base font-bold text-foreground">{promotion.budget}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold">Impressions</p>
                          <p className="text-base font-bold text-foreground">{promotion.impressions}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold">Clicks</p>
                          <p className="text-base font-bold text-foreground">{promotion.clicks}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Budget Usage</span>
                          <span>{promotion.spent} / {promotion.budget}</span>
                        </div>
                        <Progress 
                          value={(parseInt(promotion.spent.replace('$', '').replace(',', '')) / parseInt(promotion.budget.replace('$', '').replace(',', ''))) * 100} 
                          className="h-2" 
                        />
                      </div>
                      
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{promotion.startDate} to {promotion.endDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                      <Button size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-muted rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">45.2K</p>
                <p className="text-sm text-muted-foreground">Total Impressions</p>
              </div>
              <div className="text-center p-6 bg-muted rounded-lg">
                <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">1.2K</p>
                <p className="text-sm text-muted-foreground">Total Clicks</p>
              </div>
              <div className="text-center p-6 bg-muted rounded-lg">
                <Megaphone className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">2.6%</p>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}