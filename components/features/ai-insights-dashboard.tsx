"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface InsightMetric {
  label: string
  value: string | number
  change: number
  icon: React.ReactNode
}

interface PopularSession {
  name: string
  attendees: number
  engagement: number
}

interface AIInsightsDashboardProps {
  metrics: InsightMetric[]
  popularSessions: PopularSession[]
  topicTrends: Array<{ name: string; value: number }>
  speakerPerformance: Array<{ name: string; rating: number; sessions: number }>
}

export function AIInsightsDashboard({
  metrics,
  popularSessions,
  topicTrends,
  speakerPerformance,
}: AIInsightsDashboardProps) {
  const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold mt-2">{metric.value}</p>
                  <p className={`text-xs mt-2 ${metric.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {metric.change >= 0 ? "+" : ""}
                    {metric.change}% from last month
                  </p>
                </div>
                <div className="text-primary">{metric.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Popular Sessions</CardTitle>
            <CardDescription>Top performing sessions by engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={popularSessions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="attendees" fill="#3b82f6" name="Attendees" />
                <Bar dataKey="engagement" fill="#8b5cf6" name="Engagement %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Topic Trends</CardTitle>
            <CardDescription>Most discussed topics this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topicTrends}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {topicTrends.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Speaker Performance</CardTitle>
          <CardDescription>Top speakers by rating and session count</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={speakerPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="rating" stroke="#3b82f6" name="Rating" />
              <Line yAxisId="right" type="monotone" dataKey="sessions" stroke="#8b5cf6" name="Sessions" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
