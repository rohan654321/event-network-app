"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Bell, MessageSquare, User } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              EN
            </div>
            <span className="hidden sm:inline">Event Network</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/events" className="text-sm font-medium hover:text-primary transition-colors">
              Events
            </Link>
            <Link href="/venues" className="text-sm font-medium hover:text-primary transition-colors">
              Venues
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/map" className="text-sm font-medium hover:text-primary transition-colors">
              Map
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <MessageSquare className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/events" className="block px-4 py-2 hover:bg-muted rounded-lg transition-colors">
              Events
            </Link>
            <Link href="/venues" className="block px-4 py-2 hover:bg-muted rounded-lg transition-colors">
              Venues
            </Link>
            <Link href="/blog" className="block px-4 py-2 hover:bg-muted rounded-lg transition-colors">
              Blog
            </Link>
            <Link href="/map" className="block px-4 py-2 hover:bg-muted rounded-lg transition-colors">
              Map
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
