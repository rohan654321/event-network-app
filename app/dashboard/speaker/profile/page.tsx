"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Edit, Save, Upload, Linkedin, Globe, Twitter, Mail, MapPin } from "lucide-react"

export default function SpeakerProfilePage() {
  const [editMode, setEditMode] = useState(false)

  const [profile, setProfile] = useState({
    name: "Dr. Sarah Johnson",
    title: "AI Researcher & Keynote Speaker",
    organization: "Tech University",
    email: "sarah.johnson@email.com",
    phone: "+1 555 234 7890",
    location: "San Francisco, USA",
    bio: "Dr. Sarah Johnson is an internationally recognized AI researcher with over 15 years of experience in machine learning and data-driven systems. She has spoken at 50+ global conferences and is passionate about making AI accessible for everyone.",
    expertise: ["AI", "Machine Learning", "Data Science", "Ethics in Tech"],
    website: "https://sarahjohnson.ai",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    twitter: "https://twitter.com/drsarahai",
    publicProfile: true,
  })

  const handleInputChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <DashboardShell role="speaker" title="Speaker Profile">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and speaker details
          </p>
        </div>
        <Button
          onClick={() => setEditMode(!editMode)}
          className="gap-2"
          variant={editMode ? "secondary" : "default"}
        >
          {editMode ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
          {editMode ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Profile Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center gap-3 md:w-1/3">
            <Avatar className="h-32 w-32">
              <AvatarImage src="/speaker-avatar.jpg" alt={profile.name} />
              <AvatarFallback>DJ</AvatarFallback>
            </Avatar>
            {editMode && (
              <Button size="sm" variant="outline" className="gap-2">
                <Upload className="w-4 h-4" /> Change Photo
              </Button>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input
                  disabled={!editMode}
                  value={profile.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div>
                <Label>Title / Role</Label>
                <Input
                  disabled={!editMode}
                  value={profile.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div>
                <Label>Organization</Label>
                <Input
                  disabled={!editMode}
                  value={profile.organization}
                  onChange={(e) => handleInputChange("organization", e.target.value)}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  disabled={!editMode}
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  disabled={!editMode}
                  value={profile.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  disabled={!editMode}
                  value={profile.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Bio</Label>
              <Textarea
                rows={4}
                disabled={!editMode}
                value={profile.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expertise and Social Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Areas of Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.expertise.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
            {editMode && (
              <Textarea
                placeholder="Comma-separated skills (e.g., AI, Machine Learning, Data Science)"
                className="mt-4"
                value={profile.expertise.join(", ")}
                onChange={(e) =>
                  handleInputChange("expertise", e.target.value.split(",").map((s) => s.trim()))
                }
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social & Contact Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <Input
                disabled={!editMode}
                placeholder="Website URL"
                value={profile.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              <Input
                disabled={!editMode}
                placeholder="LinkedIn URL"
                value={profile.linkedin}
                onChange={(e) => handleInputChange("linkedin", e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Twitter className="w-4 h-4" />
              <Input
                disabled={!editMode}
                placeholder="Twitter URL"
                value={profile.twitter}
                onChange={(e) => handleInputChange("twitter", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visibility Settings */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Profile Visibility</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="font-medium">Public Profile</p>
            <p className="text-sm text-muted-foreground">
              Allow your profile to be visible to event organizers and attendees.
            </p>
          </div>
          <Switch
            checked={profile.publicProfile}
            onCheckedChange={(val) => handleInputChange("publicProfile", String(val))}
            disabled={!editMode}
          />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
