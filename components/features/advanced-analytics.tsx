"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Cell,
} from "recharts"
import { Download, Filter, Calendar } from "lucide-react"

interface AnalyticsData {
  attendanceByDay: Array<{ date: string; attendees: number; registered: number }>
  engagementMetrics: Array<{ metric: string; value: number; change: number }>
  sessionPerformance: Array<{ name: string; attendance: number; engagement: number; rating: number }>
  attendanceHeatmap: Array<{ time: string; day: string; value: number }>
  conversionFunnel: Array<{ stage: string; count: number; percentage: number }>
}

interface AdvancedAnalyticsProps {
  data: AnalyticsData
  onExport?: (format: "csv" | "pdf" | "excel") => void
}

export function AdvancedAnalytics({ data, onExport }: AdvancedAnalyticsProps) {
  const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics & Insights</h2>
          <p className="text-sm text-muted-foreground">Comprehensive event performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="gap-2 bg-transparent">
            <Calendar className="w-4 h-4" />
            Date Range
          </Button>
          <Button size="sm" variant="outline" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.engagementMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{metric.metric}</p>
                <p className="text-3xl font-bold">{metric.value}</p>
                <p className={`text-xs ${metric.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {metric.change >= 0 ? "+" : ""}
                  {metric.change}% from last period
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
            <CardDescription>Daily attendance vs registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.attendanceByDay}>
                <defs>
                  <linearGradient id="colorAttendees" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="attendees"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorAttendees)"
                />
                <Area type="monotone" dataKey="registered" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Performance</CardTitle>
            <CardDescription>Top sessions by attendance and engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="attendance" name="Attendance" />
                <YAxis dataKey="engagement" name="Engagement %" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Sessions" data={data.sessionPerformance} fill="#3b82f6">
                  {data.sessionPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
          <CardDescription>User journey from discovery to attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.conversionFunnel.map((stage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{stage.stage}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{stage.count}</span>
                    <Badge variant="secondary">{stage.percentage}%</Badge>
                  </div>
                </div>
                <div className="h-8 bg-muted rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-primary to-primary/60 transition-all"
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Export Reports</CardTitle>
              <CardDescription>Download analytics in your preferred format</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button className="gap-2" onClick={() => onExport?.("csv")}>
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
            <Button className="gap-2" onClick={() => onExport?.("excel")}>
              <Download className="w-4 h-4" />
              Export Excel
            </Button>
            <Button className="gap-2" onClick={() => onExport?.("pdf")}>
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
