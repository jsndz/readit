"use client";

import React from 'react';
import Link from "next/link";
import { useState } from "react";
import { Bell, BookmarkPlus, ChevronDown, Menu, MessageSquare, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center mr-4">
          <Link href="/" className="flex items-center space-x-2">
            <BookmarkPlus className="h-6 w-6 text-primary" />
            <span className="hidden font-bold text-xl sm:inline-block">Readit</span>
          </Link>
        </div>

        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Popular</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Top Communities
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Discover the most engaging communities on Readit
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link href="/r/technology" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">r/technology</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Latest tech news and discussions
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/r/programming" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">r/programming</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Code, development and software engineering
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Topics</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {topics.map((topic) => (
                      <ListItem
                        key={topic.title}
                        title={topic.title}
                        href={topic.href}
                      >
                        {topic.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/communities" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    Communities
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className={cn(
          "flex-1 flex items-center justify-end md:justify-center",
          isSearchExpanded ? "md:flex-1" : "md:flex-initial"
        )}>
          <div className={cn(
            "w-full md:w-auto md:flex-1 max-w-sm transition-all duration-300 ease-in-out",
            isSearchExpanded ? "md:max-w-md" : "md:max-w-xs"
          )}>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Readit"
                className="w-full pl-8 md:w-[300px]"
                onFocus={() => setIsSearchExpanded(true)}
                onBlur={() => setIsSearchExpanded(false)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:ml-auto">
          <ThemeToggle />
          
          <Button size="icon" variant="ghost">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <Button size="icon" variant="ghost">
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Button>

          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">shadcn</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  <span>Saved</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Messages</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/auth/signup" className="w-full">Create Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/auth/signin" className="w-full">Sign In</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button variant="outline" className="ml-2 hidden md:flex">
            <Link href="/submit" className="flex items-center">Create Post</Link>
          </Button>

          <Button 
            size="icon" 
            variant="ghost" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t py-3 px-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Button asChild variant="outline" className="justify-start">
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button asChild className="justify-start">
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
          <div className="space-y-1 pt-2 border-t">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/r/popular">Popular</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/communities">Communities</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/topics">Topics</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/submit">Create Post</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <Link href={href ?? "#"} legacyBehavior passHref>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";

const topics = [
  {
    title: "Gaming",
    href: "/topic/gaming",
    description: "Video games, esports, and gaming culture",
  },
  {
    title: "Sports",
    href: "/topic/sports",
    description: "Athletic competitions, teams, and events",
  },
  {
    title: "Business",
    href: "/topic/business",
    description: "Economics, entrepreneurship, and markets",
  },
  {
    title: "Crypto",
    href: "/topic/crypto",
    description: "Cryptocurrency, blockchain, and NFTs",
  },
  {
    title: "Television",
    href: "/topic/television",
    description: "TV shows, streaming, and entertainment",
  },
  {
    title: "Celebrity",
    href: "/topic/celebrity",
    description: "Famous people, entertainment, and gossip",
  },
];