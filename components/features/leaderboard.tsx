"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Medal, TrendingUp } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  name: string
  avatar: string
  points: number
  badges: number
  eventsAttended: number
  trend: "up" | "down" | "stable"
}

interface LeaderboardProps {
  entries: LeaderboardEntry[]
  period?: "week" | "month" | "all-time"
}

export function Leaderboard({ entries, period = "month" }: LeaderboardProps) {
  const getMedalColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500"
    if (rank === 2) return "text-gray-400"
    if (rank === 3) return "text-orange-600"
    return "text-muted-foreground"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Medal className="w-5 h-5" />
              Leaderboard
            </CardTitle>
            <CardDescription>Top performers this {period.replace("-", " ")}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {entries.map((entry) => (
            <div key={entry.rank} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
              <div className={`text-2xl font-bold w-8 text-center ${getMedalColor(entry.rank)}`}>
                {entry.rank <= 3 ? <Medal className="w-6 h-6" /> : entry.rank}
              </div>

              <Avatar className="h-10 w-10">
                <AvatarImage src={entry.avatar || "/placeholder.svg"} />
                <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{entry.name}</p>
                <div className="flex gap-2 text-xs text-muted-foreground">
                  <span>{entry.badges} badges</span>
                  <span>•</span>
                  <span>{entry.eventsAttended} events</span>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-lg">{entry.points}</p>
                <p className="text-xs text-muted-foreground">points</p>
              </div>

              {entry.trend === "up" && <TrendingUp className="w-4 h-4 text-green-600" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
