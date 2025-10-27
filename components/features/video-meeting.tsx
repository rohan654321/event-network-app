"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Video, Mic, MicOff, VideoOff, Phone, Share2, MessageSquare, Settings, Users, Clock } from "lucide-react"

interface Participant {
  id: string
  name: string
  avatar: string
  isMuted: boolean
  isVideoOn: boolean
  isPresenter: boolean
}

interface VideoMeetingProps {
  meetingId: string
  title: string
  participants: Participant[]
  duration: number
  isRecording?: boolean
  onEndCall?: () => void
}

export function VideoMeeting({ meetingId, title, participants, duration, isRecording, onEndCall }: VideoMeetingProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [showParticipants, setShowParticipants] = useState(false)

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{title}</CardTitle>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatDuration(duration)}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {participants.length} participants
                </div>
                {isRecording && (
                  <Badge variant="destructive" className="gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    Recording
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-black rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent" />
            <div className="text-center z-10">
              <Video className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Your video feed</p>
            </div>

            <div className="absolute bottom-4 right-4 w-24 h-24 bg-muted rounded-lg border border-border flex items-center justify-center">
              <p className="text-xs text-muted-foreground">You</p>
            </div>
          </div>

          <div className="flex gap-2 justify-center">
            <Button
              size="lg"
              variant={isMuted ? "destructive" : "outline"}
              className="gap-2 rounded-full"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              <span className="hidden sm:inline">{isMuted ? "Unmute" : "Mute"}</span>
            </Button>

            <Button
              size="lg"
              variant={!isVideoOn ? "destructive" : "outline"}
              className="gap-2 rounded-full"
              onClick={() => setIsVideoOn(!isVideoOn)}
            >
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              <span className="hidden sm:inline">{isVideoOn ? "Stop Video" : "Start Video"}</span>
            </Button>

            <Button size="lg" variant="outline" className="gap-2 rounded-full bg-transparent">
              <Share2 className="w-5 h-5" />
              <span className="hidden sm:inline">Share</span>
            </Button>

            <Button size="lg" variant="outline" className="gap-2 rounded-full bg-transparent">
              <MessageSquare className="w-5 h-5" />
              <span className="hidden sm:inline">Chat</span>
            </Button>

            <Button size="lg" variant="outline" className="gap-2 rounded-full bg-transparent">
              <Settings className="w-5 h-5" />
              <span className="hidden sm:inline">Settings</span>
            </Button>

            <Button size="lg" variant="destructive" className="gap-2 rounded-full" onClick={onEndCall}>
              <Phone className="w-5 h-5" />
              <span className="hidden sm:inline">End Call</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Participants ({participants.length})</CardTitle>
            <Button size="sm" variant="outline" onClick={() => setShowParticipants(!showParticipants)}>
              {showParticipants ? "Hide" : "Show"}
            </Button>
          </div>
        </CardHeader>

        <AnimatePresence>
          {showParticipants && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CardContent>
                <div className="space-y-2">
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-muted"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{participant.name}</p>
                          {participant.isPresenter && (
                            <Badge variant="secondary" className="text-xs">
                              Presenter
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {participant.isMuted && <MicOff className="w-4 h-4 text-muted-foreground" />}
                        {!participant.isVideoOn && <VideoOff className="w-4 h-4 text-muted-foreground" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  )
}
