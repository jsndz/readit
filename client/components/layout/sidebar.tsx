"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, BookmarkPlus, Home, TrendingUp, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Feeds
          </h2>
          <div className="space-y-1">
            <Button
              variant={pathname === "/" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button
              variant={pathname === "/popular" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/popular">
                <TrendingUp className="mr-2 h-4 w-4" />
                Popular
              </Link>
            </Button>
            <Button
              variant={pathname === "/all" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/all">
                <Zap className="mr-2 h-4 w-4" />
                All
              </Link>
            </Button>
          </div>
        </div>

        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Your Communities
          </h2>
          <ScrollArea className="h-[230px] px-1">
            <div className="space-y-1">
              {communities.map((community) => (
                <Button
                  key={community.slug}
                  variant={
                    pathname === `/r/${community.slug}` ? "secondary" : "ghost"
                  }
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={`/r/${community.slug}`}>
                    <div className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full bg-gradient-to-br from-chart-1 to-chart-2"></div>
                      r/{community.slug}
                    </div>
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <Button
              variant={pathname === "/communities" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/communities">
                <Users className="mr-2 h-4 w-4" />
                Communities
              </Link>
            </Button>
            <Button
              variant={pathname === "/topics" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/topics">
                <BookmarkPlus className="mr-2 h-4 w-4" />
                Topics
              </Link>
            </Button>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="px-6 py-2">
          <h2 className="mb-2 text-lg font-semibold tracking-tight">
            Top Communities
          </h2>
          <div className="space-y-3 mt-4">
            {topCommunities.map((community, index) => (
              <div key={community.slug} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-muted-foreground w-5">{index + 1}</span>
                  <div className="ml-2 h-8 w-8 rounded-full bg-gradient-to-br from-chart-1 to-chart-2 flex items-center justify-center text-white text-xs font-bold">
                    r/
                  </div>
                  <div className="ml-2">
                    <div className="text-sm font-medium">r/{community.slug}</div>
                    <div className="text-xs text-muted-foreground">{community.members} members</div>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="h-8">
                  Join
                </Button>
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start mt-2 text-sm"
            >
              <ArrowUpRight className="mr-2 h-4 w-4" />
              View All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const communities = [
  { name: "programming", slug: "programming" },
  { name: "javascript", slug: "javascript" },
  { name: "webdev", slug: "webdev" },
  { name: "reactjs", slug: "reactjs" },
  { name: "nextjs", slug: "nextjs" },
  { name: "tailwindcss", slug: "tailwindcss" },
  { name: "typescript", slug: "typescript" },
  { name: "design", slug: "design" },
  { name: "uidesign", slug: "uidesign" },
];

const topCommunities = [
  { name: "askreaddit", slug: "askreadit", members: "42.3M" },
  { name: "gaming", slug: "gaming", members: "38.1M" },
  { name: "technology", slug: "technology", members: "15.8M" },
  { name: "movies", slug: "movies", members: "31.2M" },
  { name: "science", slug: "science", members: "30.5M" },
];