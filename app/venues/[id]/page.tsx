"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Linkedin, Twitter, MapPin, Calendar, MessageSquare, Trophy } from "lucide-react"
import Image from "next/image"
import { BadgeDisplay } from "@/components/features/badge-display"

export default function ProfilePage({ params }: { params: { id: string } }) {
  const profile = {
    id: params.id,
    name: "Sarah Johnson",
    title: "Event Manager & Networking Professional",
    bio: "Passionate about connecting people and creating memorable experiences. 5+ years in event management.",
    location: "San Francisco, CA",
    image: "/professional-woman.png",
    joinDate: "Joined March 2023",
    followers: 1250,
    following: 340,
    connections: 890,
    skills: ["Event Planning", "Networking", "Project Management", "Marketing", "Public Speaking"],
    events: [
      { id: "1", title: "Tech Summit 2025", date: "June 15-17, 2025", role: "Organizer" },
      { id: "2", title: "Design Conference", date: "July 8-10, 2025", role: "Attendee" },
      { id: "3", title: "Startup Networking", date: "June 22, 2025", role: "Attendee" },
    ],
    badges: [
      {
        id: "1",
        name: "Event Organizer",
        description: "Organized 5+ events",
        icon: "🎯",
        rarity: "common",
        unlockedDate: "2024-01-15",
        isUnlocked: true,
      },
      {
        id: "2",
        name: "Networking Pro",
        description: "Made 100+ connections",
        icon: "🤝",
        rarity: "uncommon",
        unlockedDate: "2024-03-20",
        isUnlocked: true,
      },
      {
        id: "3",
        name: "Event Enthusiast",
        description: "Attended 10+ events",
        icon: "🎉",
        rarity: "uncommon",
        unlockedDate: "2024-02-10",
        isUnlocked: true,
      },
      {
        id: "4",
        name: "Speaker",
        description: "Spoke at 3+ events",
        icon: "🎤",
        rarity: "rare",
        unlockedDate: "2024-05-01",
        isUnlocked: true,
      },
      {
        id: "5",
        name: "Community Leader",
        description: "500+ followers",
        icon: "👑",
        rarity: "rare",
        isUnlocked: false,
        progress: 75,
      },
      {
        id: "6",
        name: "Legendary Networker",
        description: "1000+ connections",
        icon: "⭐",
        rarity: "epic",
        isUnlocked: false,
        progress: 89,
      },
    ],
    achievements: [
      { id: "1", title: "First Event", description: "Attended your first event", date: "2023-03-15" },
      { id: "2", title: "Connector", description: "Made your first connection", date: "2023-04-20" },
      { id: "3", title: "Event Organizer", description: "Organized your first event", date: "2024-01-10" },
      { id: "4", title: "Speaker", description: "Spoke at an event", date: "2024-05-01" },
    ],
    leaderboardRank: 42,
    leaderboardScore: 2850,
  } as const

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Profile Header */}
      <section className="border-b border-border bg-muted/50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
            <Image
              src={profile.image || "/placeholder.svg"}
              alt={profile.name}
              width={120}
              height={120}
              className="rounded-full"
            />
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{profile.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{profile.title}</p>
              <p className="text-muted-foreground mb-4">{profile.bio}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{profile.joinDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>Rank #{profile.leaderboardRank}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Message
              </Button>
              <Button variant="outline" className="bg-transparent">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold">{profile.followers}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{profile.following}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{profile.connections}</p>
              <p className="text-sm text-muted-foreground">Connections</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{profile.leaderboardScore}</p>
              <p className="text-sm text-muted-foreground">Points</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="connections">Connections</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <span>sarah.johnson@email.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-muted-foreground" />
                    <span>linkedin.com/in/sarahjohnson</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Twitter className="w-5 h-5 text-muted-foreground" />
                    <span>@sarahjohnson</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="badges" className="space-y-6 mt-6">
              <BadgeDisplay badges={profile.badges} />

            </TabsContent>

            <TabsContent value="events" className="space-y-4 mt-6">
              <h2 className="text-2xl font-bold mb-6">Events</h2>
              {profile.events.map((event) => (
                <Card key={event.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                      <Badge variant="outline">{event.role}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4 mt-6">
              <h2 className="text-2xl font-bold mb-6">Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.achievements.map((achievement) => (
                  <Card key={achievement.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">🏆</div>
                        <div className="flex-1">
                          <p className="font-semibold">{achievement.title}</p>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">Unlocked {achievement.date}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="connections" className="space-y-4 mt-6">
              <h2 className="text-2xl font-bold mb-6">Connections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Image
                            src="/placeholder.svg"
                            alt="Connection"
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                          <div>
                            <p className="font-semibold">Connection Name</p>
                            <p className="text-xs text-muted-foreground">Event Professional</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  )
}
