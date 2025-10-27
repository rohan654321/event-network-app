"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Trash2, Share2, CheckCircle2 } from "lucide-react"

interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  type: "event" | "appointment" | "session"
  synced: boolean
  platform?: "google" | "outlook" | "ical"
}

interface CalendarIntegrationProps {
  events: CalendarEvent[]
  onSync?: (platform: "google" | "outlook" | "ical") => void
  onRemove?: (eventId: string) => void
  onShare?: (eventId: string) => void
}

export function CalendarIntegration({ events, onSync, onRemove, onShare }: CalendarIntegrationProps) {
  const [syncedPlatforms, setSyncedPlatforms] = useState<Array<"google" | "outlook" | "ical">>([])

  const handleSync = (platform: "google" | "outlook" | "ical") => {
    setSyncedPlatforms([...syncedPlatforms, platform])
    onSync?.(platform)
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "event":
        return "bg-blue-100 text-blue-900"
      case "appointment":
        return "bg-purple-100 text-purple-900"
      case "session":
        return "bg-green-100 text-green-900"
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
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Calendar Integration
              </CardTitle>
              <CardDescription>Sync your events with external calendars</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(["google", "outlook", "ical"] as const).map((platform) => (
              <Button
                key={platform}
                variant={syncedPlatforms.includes(platform) ? "default" : "outline"}
                className="gap-2 capitalize"
                onClick={() => handleSync(platform)}
              >
                {syncedPlatforms.includes(platform) && <CheckCircle2 className="w-4 h-4" />}
                {platform === "ical" ? "iCal" : platform}
              </Button>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            Synced events will automatically update across all connected platforms
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Synced Events ({events.length})</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            {events.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No synced events yet</p>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getEventColor(event.type)} variant="outline">
                        {event.type}
                      </Badge>
                      {event.synced && (
                        <Badge variant="secondary" className="text-xs gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Synced
                        </Badge>
                      )}
                    </div>
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.date} at {event.time}
                    </p>
                    {event.platform && (
                      <p className="text-xs text-muted-foreground capitalize">Synced to {event.platform}</p>
                    )}
                  </div>

                  <div className="flex gap-1 ml-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => onShare?.(event.id)}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => onRemove?.(event.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
