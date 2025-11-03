// app/dashboard/speaker/analytics/page.tsx
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const sessionData = [
  { name: 'Jan', attendees: 400, duration: 240, rating: 4.2 },
  { name: 'Feb', attendees: 300, duration: 139, rating: 4.5 },
  { name: 'Mar', attendees: 200, duration: 180, rating: 3.9 },
  { name: 'Apr', attendees: 278, duration: 190, rating: 4.3 },
  { name: 'May', attendees: 189, duration: 150, rating: 4.7 },
]

const topicData = [
  { name: 'AI/ML', value: 35 },
  { name: 'Web Dev', value: 25 },
  { name: 'Cloud', value: 20 },
  { name: 'DevOps', value: 15 },
  { name: 'Other', value: 5 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

const engagementData = [
  { time: '9:00', engagement: 30 },
  { time: '10:00', engagement: 45 },
  { time: '11:00', engagement: 70 },
  { time: '12:00', engagement: 60 },
  { time: '13:00', engagement: 85 },
  { time: '14:00', engagement: 90 },
  { time: '15:00', engagement: 75 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track your session performance and audience engagement</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6</div>
            <p className="text-xs text-muted-foreground">+0.2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,742</div>
            <p className="text-xs text-muted-foreground">+284 this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Session Performance */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Session Performance</CardTitle>
            <CardDescription>Attendance and ratings over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sessionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="attendees" fill="#8884d8" />
                <Bar dataKey="rating" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Topic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Topic Distribution</CardTitle>
            <CardDescription>Your sessions by topic area</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topicData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {topicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Trend</CardTitle>
            <CardDescription>Audience engagement throughout sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="engagement" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Top Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "AI Future Trends", attendees: 245, rating: 4.8 },
                { name: "ML Workshop", attendees: 189, rating: 4.7 },
                { name: "Cloud Computing", attendees: 156, rating: 4.6 },
              ].map((session, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{session.name}</p>
                    <p className="text-sm text-muted-foreground">{session.attendees} attendees</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{session.rating}/5</div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audience Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Content Quality</span>
                <span className="font-bold">4.7/5</span>
              </div>
              <div className="flex justify-between">
                <span>Presentation</span>
                <span className="font-bold">4.8/5</span>
              </div>
              <div className="flex justify-between">
                <span>Engagement</span>
                <span className="font-bold">4.5/5</span>
              </div>
              <div className="flex justify-between">
                <span>Practical Value</span>
                <span className="font-bold">4.6/5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goals & Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Sessions Target</span>
                  <span>18/20</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Rating Target</span>
                  <span>4.6/4.8</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}