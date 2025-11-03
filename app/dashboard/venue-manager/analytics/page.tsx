"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Download, Calendar } from "lucide-react"

export default function AnalyticsPage() {
  const revenueData = [
    { month: 'Jan', revenue: 65000 },
    { month: 'Feb', revenue: 72000 },
    { month: 'Mar', revenue: 81000 },
    { month: 'Apr', revenue: 78000 },
    { month: 'May', revenue: 89450 },
    { month: 'Jun', revenue: 92500 },
  ]

  const venuePerformance = [
    { name: 'SF Convention', value: 35 },
    { name: 'Grand Ballroom', value: 25 },
    { name: 'Tech Hub', value: 20 },
    { name: 'Other Venues', value: 20 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  const occupancyData = [
    { venue: 'SF Convention', occupancy: 85, bookings: 12 },
    { venue: 'Grand Ballroom', occupancy: 72, bookings: 8 },
    { venue: 'Tech Hub', occupancy: 60, bookings: 4 },
    { venue: 'Event Space A', occupancy: 45, bookings: 3 },
    { venue: 'Event Space B', occupancy: 38, bookings: 2 },
  ]

  return (
    <DashboardShell role="venue-manager" title="Analytics & Reports">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics & Reports</h1>
            <p className="text-muted-foreground">Track your venue performance and revenue</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Last 6 Months
            </Button>
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Venue Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Distribution by Venue</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={venuePerformance}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {venuePerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Revenue Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Bar dataKey="revenue" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="occupancy" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Venue Occupancy Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={occupancyData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="venue" width={150} />
                    <Tooltip formatter={(value, name) => [name === 'occupancy' ? `${value}%` : value, name === 'occupancy' ? 'Occupancy Rate' : 'Bookings']} />
                    <Bar dataKey="occupancy" fill="#3b82f6" />
                    <Bar dataKey="bookings" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}