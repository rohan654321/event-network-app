"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, ThumbsDown, Sparkles, ArrowRight } from "lucide-react"
import Image from "next/image"

interface RecommendationCard {
  id: string
  title: string
  type: "event" | "session" | "speaker"
  reason: string
  image: string
  category: string
  matchScore: number
}

interface AIRecommendationsPanelProps {
  recommendations: RecommendationCard[]
  onFeedback?: (id: string, liked: boolean) => void
}

export function AIRecommendationsPanel({ recommendations, onFeedback }: AIRecommendationsPanelProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-2xl font-bold">AI Recommendations</h2>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {recommendations.map((rec) => (
          <motion.div key={rec.id} variants={itemVariants}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
              <div className="relative h-40 bg-muted">
                <Image src={rec.image || "/placeholder.svg"} alt={rec.title} fill className="object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="gap-1">
                    <span className="text-xs font-semibold">{rec.matchScore}%</span>
                  </Badge>
                </div>
              </div>

              <CardContent className="flex-1 pt-4 space-y-3">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {rec.category}
                  </Badge>
                  <h3 className="font-semibold line-clamp-2">{rec.title}</h3>
                </div>

                <div className="bg-muted/50 p-2 rounded text-sm text-muted-foreground">
                  <p className="text-xs font-medium text-foreground mb-1">Why recommended:</p>
                  <p className="line-clamp-2">{rec.reason}</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-1 bg-transparent"
                    onClick={() => onFeedback?.(rec.id, true)}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="hidden sm:inline">Like</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-1 bg-transparent"
                    onClick={() => onFeedback?.(rec.id, false)}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span className="hidden sm:inline">Skip</span>
                  </Button>
                </div>
              </CardContent>

              <div className="px-4 pb-4">
                <Button className="w-full gap-2" size="sm">
                  View Details <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
