"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Bold, ImageIcon, Video, BarChart3, Trash2, Eye, Save } from "lucide-react"

interface MediaBlock {
  id: string
  type: "text" | "image" | "video" | "poll" | "gallery"
  content: string
  metadata?: Record<string, any>
}

interface RichMediaBlogEditorProps {
  onPublish?: (post: { title: string; content: string; blocks: MediaBlock[] }) => void
}

export function RichMediaBlogEditor({ onPublish }: RichMediaBlogEditorProps) {
  const [title, setTitle] = useState("")
  const [blocks, setBlocks] = useState<MediaBlock[]>([])
  const [preview, setPreview] = useState(false)

  const addBlock = (type: MediaBlock["type"]) => {
    const newBlock: MediaBlock = {
      id: Date.now().toString(),
      type,
      content: "",
    }
    setBlocks([...blocks, newBlock])
  }

  const updateBlock = (id: string, content: string) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, content } : b)))
  }

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id))
  }

  const handlePublish = () => {
    onPublish?.({
      title,
      content: blocks.map((b) => b.content).join("\n"),
      blocks,
    })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Blog Post Editor</CardTitle>
              <CardDescription>Create rich media blog posts with embedded content</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={preview ? "default" : "outline"}
                onClick={() => setPreview(!preview)}
                className="gap-2"
              >
                <Eye className="w-4 h-4" />
                {preview ? "Edit" : "Preview"}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Post Title</label>
            <Input placeholder="Enter post title..." value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {!preview ? (
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                <Button size="sm" variant="outline" className="gap-2 bg-transparent" onClick={() => addBlock("text")}>
                  <Bold className="w-4 h-4" />
                  Text
                </Button>
                <Button size="sm" variant="outline" className="gap-2 bg-transparent" onClick={() => addBlock("image")}>
                  <ImageIcon className="w-4 h-4" />
                  Image
                </Button>
                <Button size="sm" variant="outline" className="gap-2 bg-transparent" onClick={() => addBlock("video")}>
                  <Video className="w-4 h-4" />
                  Video
                </Button>
                <Button size="sm" variant="outline" className="gap-2 bg-transparent" onClick={() => addBlock("poll")}>
                  <BarChart3 className="w-4 h-4" />
                  Poll
                </Button>
              </div>

              <div className="space-y-3">
                {blocks.map((block) => (
                  <div key={block.id} className="p-4 border border-border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="capitalize">
                        {block.type}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-destructive"
                        onClick={() => removeBlock(block.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {block.type === "text" && (
                      <Textarea
                        placeholder="Enter text content..."
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        className="min-h-24"
                      />
                    )}

                    {block.type === "image" && (
                      <Input
                        placeholder="Enter image URL..."
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                      />
                    )}

                    {block.type === "video" && (
                      <Input
                        placeholder="Enter video URL (YouTube, Vimeo, etc.)..."
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                      />
                    )}

                    {block.type === "poll" && (
                      <Input
                        placeholder="Enter poll question..."
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <h1 className="text-3xl font-bold">{title}</h1>
              {blocks.map((block) => (
                <div key={block.id} className="space-y-2">
                  {block.type === "text" && <p className="text-foreground">{block.content}</p>}
                  {block.type === "image" && (
                    <img
                      src={block.content || "/placeholder.svg"}
                      alt="Blog content"
                      className="rounded-lg max-w-full"
                    />
                  )}
                  {block.type === "video" && (
                    <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                      <Video className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  {block.type === "poll" && (
                    <div className="p-3 bg-background rounded border border-border">
                      <p className="font-semibold">{block.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button className="flex-1 gap-2" onClick={handlePublish}>
              <Save className="w-4 h-4" />
              Publish Post
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Save Draft
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
