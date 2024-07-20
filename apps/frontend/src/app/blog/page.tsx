import React from 'react'
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const page = () => {
  return (
    <div className="w-full">
      <section className="px-4 py-8 md:px-6 md:py-12 lg:py-16">
        <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-background shadow-md transition-all hover:scale-105">
            <Link href="#" className="block h-48 w-full overflow-hidden rounded-t-lg" prefetch={false}>
              <img
                src="/placeholder.svg"
                alt="Blog Post Image"
                width={600}
                height={300}
                className="h-full w-full object-cover"
              />
            </Link>
            <div className="p-4">
              <h3 className="text-xl font-bold">
                <Link href="#" prefetch={false}>
                  Mastering the Art of Sourdough Baking
                </Link>
              </h3>
              <p className="mt-2 text-muted-foreground">
                Discover the secrets to creating the perfect sourdough loaf at home.
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-background shadow-md transition-all hover:scale-105">
            <Link href="#" className="block h-48 w-full overflow-hidden rounded-t-lg" prefetch={false}>
              <img
                src="/placeholder.svg"
                alt="Blog Post Image"
                width={600}
                height={300}
                className="h-full w-full object-cover"
              />
            </Link>
            <div className="p-4">
              <h3 className="text-xl font-bold">
                <Link href="#" prefetch={false}>
                  The Ultimate Guide to Sustainable Living
                </Link>
              </h3>
              <p className="mt-2 text-muted-foreground">
                Explore practical tips and strategies for a more eco-friendly lifestyle.
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-background shadow-md transition-all hover:scale-105">
            <Link href="#" className="block h-48 w-full overflow-hidden rounded-t-lg" prefetch={false}>
              <img
                src="/placeholder.svg"
                alt="Blog Post Image"
                width={600}
                height={300}
                className="h-full w-full object-cover"
              />
            </Link>
            <div className="p-4">
              <h3 className="text-xl font-bold">
                <Link href="#" prefetch={false}>
                  The Science Behind Mindfulness Meditation
                </Link>
              </h3>
              <p className="mt-2 text-muted-foreground">
                Discover the proven benefits of incorporating mindfulness into your daily routine.
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-background shadow-md transition-all hover:scale-105">
            <Link href="#" className="block h-48 w-full overflow-hidden rounded-t-lg" prefetch={false}>
              <img
                src="/placeholder.svg"
                alt="Blog Post Image"
                width={600}
                height={300}
                className="h-full w-full object-cover"
              />
            </Link>
            <div className="p-4">
              <h3 className="text-xl font-bold">
                <Link href="#" prefetch={false}>
                  Unleashing Your Creativity: Tips and Tricks
                </Link>
              </h3>
              <p className="mt-2 text-muted-foreground">
                Unlock your creative potential with these practical and inspiring ideas.
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-background shadow-md transition-all hover:scale-105">
            <Link href="#" className="block h-48 w-full overflow-hidden rounded-t-lg" prefetch={false}>
              <img
                src="/placeholder.svg"
                alt="Blog Post Image"
                width={600}
                height={300}
                className="h-full w-full object-cover"
              />
            </Link>
            <div className="p-4">
              <h3 className="text-xl font-bold">
                <Link href="#" prefetch={false}>
                  The Art of Minimalist Living
                </Link>
              </h3>
              <p className="mt-2 text-muted-foreground">
                Simplify your life and find more joy with these minimalist living tips.
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-background shadow-md transition-all hover:scale-105">
            <Link href="#" className="block h-48 w-full overflow-hidden rounded-t-lg" prefetch={false}>
              <img
                src="/placeholder.svg"
                alt="Blog Post Image"
                width={600}
                height={300}
                className="h-full w-full object-cover"
              />
            </Link>
            <div className="p-4">
              <h3 className="text-xl font-bold">
                <Link href="#" prefetch={false}>
                  Exploring the Wonders of the Night Sky
                </Link>
              </h3>
              <p className="mt-2 text-muted-foreground">
                Discover the beauty and mysteries of the cosmos through stargazing.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-muted py-8 md:py-12 lg:py-16">
        <div className="container mx-auto">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Recently Trending</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg bg-background p-4 shadow-md transition-all hover:scale-105">
              <Link href="#" className="flex-1" prefetch={false}>
                <h3 className="text-lg font-bold">The Rise of Plant-Based Diets: A Healthier Future</h3>
                <p className="mt-2 text-muted-foreground">
                  Explore the benefits and trends of plant-based eating for a sustainable and nutritious lifestyle.
                </p>
              </Link>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Nutrition</Badge>
                <Badge variant="outline">Sustainability</Badge>
                <Badge variant="outline">Lifestyle</Badge>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg bg-background p-4 shadow-md transition-all hover:scale-105">
              <Link href="#" className="flex-1" prefetch={false}>
                <h3 className="text-lg font-bold">Mastering the Art of Landscape Photography</h3>
                <p className="mt-2 text-muted-foreground">
                  Discover the techniques and tips to capture stunning landscape images.
                </p>
              </Link>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Photography</Badge>
                <Badge variant="outline">Landscape</Badge>
                <Badge variant="outline">Tutorials</Badge>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg bg-background p-4 shadow-md transition-all hover:scale-105">
              <Link href="#" className="flex-1" prefetch={false}>
                <h3 className="text-lg font-bold">The Power of Positive Thinking: Transforming Your Life</h3>
                <p className="mt-2 text-muted-foreground">
                  Learn how to cultivate a positive mindset and achieve personal growth.
                </p>
              </Link>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Self-improvement</Badge>
                <Badge variant="outline">Mindset</Badge>
                <Badge variant="outline">Motivation</Badge>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg bg-background p-4 shadow-md transition-all hover:scale-105">
              <Link href="#" className="flex-1" prefetch={false}>
                <h3 className="text-lg font-bold">The Art of Minimalist Web Design: Less is More</h3>
                <p className="mt-2 text-muted-foreground">
                  Explore the principles and best practices of minimalist web design.
                </p>
              </Link>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Web Design</Badge>
                <Badge variant="outline">Minimalism</Badge>
                <Badge variant="outline">User Experience</Badge>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg bg-background p-4 shadow-md transition-all hover:scale-105">
              <Link href="#" className="flex-1" prefetch={false}>
                <h3 className="text-lg font-bold">Unlocking the Secrets of Effective Time Management</h3>
                <p className="mt-2 text-muted-foreground">
                  Discover proven strategies to boost your productivity and achieve your goals.
                </p>
              </Link>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Productivity</Badge>
                <Badge variant="outline">Time Management</Badge>
                <Badge variant="outline">Efficiency</Badge>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg bg-background p-4 shadow-md transition-all hover:scale-105">
              <Link href="#" className="flex-1" prefetch={false}>
                <h3 className="text-lg font-bold">The Beginner's Guide to Investing in Cryptocurrency</h3>
                <p className="mt-2 text-muted-foreground">
                  Explore the world of cryptocurrency and learn how to start investing.
                </p>
              </Link>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Cryptocurrency</Badge>
                <Badge variant="outline">Investing</Badge>
                <Badge variant="outline">Finance</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    )
}

export default page