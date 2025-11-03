// app/dashboard/speaker/materials/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Image, Video, Download, Trash2, Eye } from "lucide-react"

interface Material {
  id: string
  name: string
  type: "pdf" | "image" | "video" | "document"
  size: string
  uploadDate: string
  session: string
  downloads: number
}

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: "1",
      name: "Presentation_Slides.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      session: "Keynote: Future of AI",
      downloads: 42
    },
    {
      id: "2",
      name: "Demo_Video.mp4",
      type: "video",
      size: "15.7 MB",
      uploadDate: "2024-01-14",
      session: "Hands-on Workshop",
      downloads: 28
    }
  ])

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf": return <FileText className="h-8 w-8 text-red-500" />
      case "image": return <Image className="h-8 w-8 text-green-500" />
      case "video": return <Video className="h-8 w-8 text-blue-500" />
      default: return <FileText className="h-8 w-8 text-gray-500" />
    }
  }

  const getTypeBadge = (type: string) => {
    const typeMap = {
      pdf: "PDF",
      image: "Image",
      video: "Video",
      document: "Document"
    }
    return typeMap[type as keyof typeof typeMap] || type
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Materials</h1>
          <p className="text-muted-foreground">Manage your presentation materials and resources</p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Material
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload New Material</CardTitle>
            <CardDescription>Share presentation slides, documents, and media files</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="session">Associated Session</Label>
              <Input id="session" placeholder="Select session..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file">File Upload</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2">Drag and drop files here, or click to browse</p>
                <p className="text-sm text-muted-foreground">PDF, PPT, Images, Videos up to 50MB</p>
              </div>
            </div>
            <Button>Upload Material</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Materials</CardTitle>
            <CardDescription>Manage and track your shared materials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {materials.map((material) => (
                <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getFileIcon(material.type)}
                    <div>
                      <p className="font-medium">{material.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Badge variant="secondary">{getTypeBadge(material.type)}</Badge>
                        <span>{material.size}</span>
                        <span>Uploaded {material.uploadDate}</span>
                        <span>{material.downloads} downloads</span>
                      </div>
                      <p className="text-sm text-blue-600">{material.session}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}