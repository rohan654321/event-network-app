// app/dashboard/speaker/uploads/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, Video, Image, Music, Trash2, Play, Eye } from "lucide-react"

interface MediaFile {
  id: string
  name: string
  type: "video" | "image" | "audio"
  size: string
  duration?: string
  uploadDate: string
  status: "uploaded" | "processing" | "error"
  thumbnail?: string
}

export default function MediaUploadsPage() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: "1",
      name: "keynote_recording.mp4",
      type: "video",
      size: "156 MB",
      duration: "45:23",
      uploadDate: "2024-01-15",
      status: "uploaded",
      thumbnail: "/api/placeholder/120/68"
    },
    {
      id: "2",
      name: "presentation_slides.png",
      type: "image",
      size: "8.2 MB",
      uploadDate: "2024-01-14",
      status: "uploaded"
    }
  ])

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="h-8 w-8 text-red-500" />
      case "image": return <Image className="h-8 w-8 text-green-500" />
      case "audio": return <Music className="h-8 w-8 text-blue-500" />
      default: return <Upload className="h-8 w-8 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      uploaded: { label: "Uploaded", variant: "default" as const },
      processing: { label: "Processing", variant: "secondary" as const },
      error: { label: "Error", variant: "destructive" as const }
    }
    const statusInfo = statusMap[status as keyof typeof statusMap]
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Media Uploads</h1>
          <p className="text-muted-foreground">Manage your video, image, and audio files</p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Media
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Media</CardTitle>
            <CardDescription>Share videos, images, and audio files with attendees</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 font-medium">Drag and drop your files here</p>
              <p className="text-sm text-muted-foreground mt-2">
                Supports MP4, MOV, PNG, JPG, MP3 up to 500MB
              </p>
              <Button className="mt-4">Select Files</Button>
            </div>
            
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Media Files</CardTitle>
            <CardDescription>Manage and organize your uploaded media</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mediaFiles.map((file) => (
                <Card key={file.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    {file.type === "video" && (
                      <div className="relative aspect-video bg-muted">
                        <img
                          src={file.thumbnail}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button variant="secondary" size="icon" className="rounded-full">
                            <Play className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                    {file.type === "image" && (
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        <Image className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getMediaIcon(file.type)}
                          <div>
                            <p className="font-medium text-sm truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{file.size}</p>
                          </div>
                        </div>
                        {getStatusBadge(file.status)}
                      </div>
                      {file.duration && (
                        <p className="text-xs text-muted-foreground mb-2">Duration: {file.duration}</p>
                      )}
                      <p className="text-xs text-muted-foreground mb-3">Uploaded {file.uploadDate}</p>
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}