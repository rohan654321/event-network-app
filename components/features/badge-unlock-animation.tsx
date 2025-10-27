"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface BadgeUnlockAnimationProps {
  badgeName: string
  badgeIcon: React.ReactNode
  description: string
  rarity: "common" | "rare" | "epic" | "legendary"
  onComplete?: () => void
}

const rarityColors = {
  common: "from-gray-400 to-gray-600",
  rare: "from-blue-400 to-blue-600",
  epic: "from-purple-400 to-purple-600",
  legendary: "from-yellow-400 to-yellow-600",
}

export function BadgeUnlockAnimation({
  badgeName,
  badgeIcon,
  description,
  rarity,
  onComplete,
}: BadgeUnlockAnimationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, 4000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -50 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Card className={`bg-linear-to-br ${rarityColors[rarity]} border-0 shadow-2xl`}>
            <CardContent className="p-6 text-white">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-5xl"
                >
                  {badgeIcon}
                </motion.div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <p className="font-bold text-lg">Badge Unlocked!</p>
                  </div>
                  <p className="font-semibold">{badgeName}</p>
                  <p className="text-sm opacity-90">{description}</p>
                  <p className="text-xs opacity-75 capitalize">{rarity}</p>
                </div>
              </div>

              <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 4, ease: "linear" }}
                className="absolute bottom-0 left-0 h-1 bg-white/50 origin-left"
                style={{ width: "100%" }}
              />
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
