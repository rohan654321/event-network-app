"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface HeatmapData {
  time: string
  monday: number
  tuesday: number
  wednesday: number
  thursday: number
  friday: number
  saturday: number
  sunday: number
}

interface AttendanceHeatmapProps {
  data: HeatmapData[]
  maxValue?: number
}

export function AttendanceHeatmap({ data, maxValue = 100 }: AttendanceHeatmapProps) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const dayKeys = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const

  const getColor = (value: number) => {
    const percentage = (value / maxValue) * 100
    if (percentage === 0) return "bg-muted"
    if (percentage < 25) return "bg-blue-100"
    if (percentage < 50) return "bg-blue-300"
    if (percentage < 75) return "bg-blue-500"
    return "bg-blue-700"
  }

  const getTextColor = (value: number) => {
    const percentage = (value / maxValue) * 100
    if (percentage > 50) return "text-white"
    return "text-foreground"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Heatmap</CardTitle>
        <CardDescription>Peak attendance times throughout the week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="w-20" />
              {days.map((day) => (
                <div key={day} className="w-16 text-center text-xs font-semibold">
                  {day.slice(0, 3)}
                </div>
              ))}
            </div>

            {data.map((row) => (
              <div key={row.time} className="flex gap-2 items-center">
                <div className="w-20 text-xs font-medium text-right pr-2">{row.time}</div>
                {dayKeys.map((day) => {
                  const value = row[day]
                  return (
                    <div
                      key={`${row.time}-${day}`}
                      className={`w-16 h-12 rounded flex items-center justify-center text-xs font-semibold transition-colors ${getColor(value)} ${getTextColor(value)}`}
                    >
                      {value}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs">
            <span className="font-semibold">Intensity:</span>
            <div className="flex gap-1">
              {[0, 25, 50, 75, 100].map((val) => (
                <div key={val} className={`w-6 h-6 rounded ${getColor(val)}`} title={`${val}%`} />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
