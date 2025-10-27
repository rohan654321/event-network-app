"use client"

import React from "react"
import { motion, type Variants } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type BadgeItem = {
  id: string
  name: string
  description: string
  icon: string
  rarity: string
  isUnlocked: boolean
  unlockedDate?: string
  progress?: number
  maxProgress?: number
}

interface BadgeDisplayProps {
  badges: BadgeItem[]
  showUnlocked?: boolean
}

const rarityColors: Record<BadgeItem["rarity"], string> = {
  common: "bg-gray-100 text-gray-900 border-gray-300",
  uncommon: "bg-green-100 text-green-900 border-green-300",
  rare: "bg-blue-100 text-blue-900 border-blue-300",
  epic: "bg-purple-100 text-purple-900 border-purple-300",
  legendary: "bg-yellow-100 text-yellow-900 border-yellow-300",
}

const rarityGlows: Record<BadgeItem["rarity"], string> = {
  common: "shadow-sm",
  uncommon: "shadow-md shadow-green-200",
  rare: "shadow-lg shadow-blue-200",
  epic: "shadow-lg shadow-purple-200",
  legendary: "shadow-lg shadow-yellow-200",
}

export function BadgeDisplay({ badges, showUnlocked = true }: BadgeDisplayProps) {
  // use unlockedDate instead of unlockedAt
  const unlockedBadges = badges.filter((b) => b.isUnlocked)
  const lockedBadges = badges.filter((b) => !b.isUnlocked)

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, type: "spring" as const },
    },
  }

  return (
    <div className="space-y-6">
      {showUnlocked && unlockedBadges.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Unlocked Badges</h3>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {unlockedBadges.map((badge) => (
              <motion.div key={badge.id} variants={itemVariants}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${rarityColors[badge.rarity]} ${rarityGlows[badge.rarity]}`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className="text-3xl">{badge.icon}</div>
                          <p className="text-xs font-semibold text-center line-clamp-2">{badge.name}</p>
                          {badge.unlockedDate && (
                            <p className="text-xs opacity-75">{badge.unlockedDate}</p>
                          )}
                        </div>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        <p className="font-semibold">{badge.name}</p>
                        <p className="text-xs">{badge.description}</p>
                        <p className="text-xs capitalize text-yellow-600">{badge.rarity}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {lockedBadges.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Locked Badges</h3>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {lockedBadges.map((badge) => (
              <motion.div key={badge.id} variants={itemVariants}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="p-4 rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/30 opacity-50 cursor-pointer transition-all hover:opacity-75">
                        <div className="flex flex-col items-center gap-2">
                          <div className="text-3xl grayscale">{badge.icon}</div>
                          <p className="text-xs font-semibold text-center line-clamp-2">{badge.name}</p>

                          {badge.progress !== undefined && badge.maxProgress !== undefined && (
                            <div className="w-full">
                              <div className="h-1 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary transition-all"
                                  style={{
                                    width: `${(badge.progress / badge.maxProgress) * 100}%`,
                                  }}
                                />
                              </div>
                              <p className="text-xs text-center mt-1">
                                {badge.progress}/{badge.maxProgress}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        <p className="font-semibold">{badge.name}</p>
                        <p className="text-xs">{badge.description}</p>
                        {badge.progress !== undefined && badge.maxProgress !== undefined && (
                          <p className="text-xs">
                            Progress: {badge.progress}/{badge.maxProgress}
                          </p>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  )
}
