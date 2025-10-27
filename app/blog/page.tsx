"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { BlogCard } from "@/components/cards/blog-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, X } from "lucide-react"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const categories = ["Technology", "Business", "Design", "Marketing", "Networking", "Tips"]

  const posts = [
    {
      id: "1",
      title: "The Future of Event Technology",
      excerpt: "Explore how AI and automation are transforming the event industry",
      author: "John Smith",
      date: "June 10, 2025",
      category: "Technology",
      image: "/tech-conference.png",
      readTime: 5,
    },
    {
      id: "2",
      title: "5 Tips for Successful Event Networking",
      excerpt: "Learn how to make the most of your networking opportunities at events",
      author: "Sarah Johnson",
      date: "June 8, 2025",
      category: "Networking",
      image: "/design-conference.png",
      readTime: 4,
    },
    {
      id: "3",
      title: "Designing Memorable Event Experiences",
      excerpt: "Best practices for creating engaging and memorable event experiences",
      author: "Michael Chen",
      date: "June 5, 2025",
      category: "Design",
      image: "/startup-networking.jpg",
      readTime: 6,
    },
    {
      id: "4",
      title: "Event Marketing Strategies That Work",
      excerpt: "Proven strategies to promote your events and increase attendance",
      author: "Emma Davis",
      date: "June 1, 2025",
      category: "Marketing",
      image: "/tech-conference.png",
      readTime: 7,
    },
    {
      id: "5",
      title: "Building Your Event Team",
      excerpt: "How to assemble and manage an effective event planning team",
      author: "David Wilson",
      date: "May 28, 2025",
      category: "Business",
      image: "/design-conference.png",
      readTime: 5,
    },
    {
      id: "6",
      title: "Virtual Events: Best Practices",
      excerpt: "Essential tips for hosting successful virtual and hybrid events",
      author: "Lisa Anderson",
      date: "May 25, 2025",
      category: "Technology",
      image: "/startup-networking.jpg",
      readTime: 6,
    },
  ]

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="border-b border-border bg-muted/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground mb-6">Insights and tips for event professionals</p>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className="bg-transparent"
            >
              {showFilters ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </section>

      {/* Filters */}
      {showFilters && (
        <section className="border-b border-border bg-card py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null ? "" : "bg-transparent"}
              >
                All Articles
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "" : "bg-transparent"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} {...post} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No articles found</p>
              <Button onClick={() => setSearchQuery("")}>Clear search</Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
