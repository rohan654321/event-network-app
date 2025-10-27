"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, Users, LinkIcon, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ScheduledMeeting {
  id: string
  title: string
  date: string
  time: string
  participants: number
  meetingLink: string
  type: "one-to-one" | "group"
}

interface MeetingSchedulerProps {
  upcomingMeetings: ScheduledMeeting[]
  onSchedule?: (meeting: Omit<ScheduledMeeting, "id">) => void
}

export function MeetingScheduler({ upcomingMeetings, onSchedule }: MeetingSchedulerProps) {
  const [isOpen, setIsOpen] = useState(false)
const [formData, setFormData] = useState<{
  title: string
  date: string
  time: string
  type: "one-to-one" | "group"
}>({
  title: "",
  date: "",
  time: "",
  type: "one-to-one",
})


  const handleSchedule = () => {
    if (formData.title && formData.date && formData.time) {
      onSchedule?.({
        title: formData.title,
        date: formData.date,
        time: formData.time,
        participants: formData.type === "one-to-one" ? 2 : 5,
        meetingLink: `https://meet.example.com/${Math.random().toString(36).substr(2, 9)}`,
        type: formData.type,
      })
      setFormData({ title: "", date: "", time: "", type: "one-to-one" })
      setIsOpen(false)
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Upcoming Meetings</CardTitle>
              <CardDescription>Your scheduled video calls</CardDescription>
            </div>
            <Button size="sm" className="gap-2" onClick={() => setIsOpen(!isOpen)}>
              <Plus className="w-4 h-4" />
              Schedule
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {upcomingMeetings.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No upcoming meetings</p>
          ) : (
            upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-sm">{meeting.title}</h4>
                  <Badge variant={meeting.type === "one-to-one" ? "secondary" : "outline"}>
                    {meeting.type === "one-to-one" ? "1:1" : "Group"}
                  </Badge>
                </div>

                <div className="space-y-1 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {meeting.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {meeting.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3" />
                    {meeting.participants} participants
                  </div>
                </div>

                <Button size="sm" className="w-full gap-2 bg-transparent" variant="outline">
                  <LinkIcon className="w-3 h-3" />
                  Join Meeting
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {isOpen && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Schedule New Meeting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Meeting Title</Label>
              <Input
                id="title"
                placeholder="e.g., Project Discussion"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Meeting Type</Label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={formData.type === "one-to-one" ? "default" : "outline"}
                  onClick={() => setFormData({ ...formData, type: "one-to-one" })}
                >
                  One-to-One
                </Button>
                <Button
                  size="sm"
                  variant={formData.type === "group" ? "default" : "outline"}
                  onClick={() => setFormData({ ...formData, type: "group" })}
                >
                  Group
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={handleSchedule}>
                Schedule
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
