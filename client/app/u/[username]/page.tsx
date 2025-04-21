import Link from "next/link";
import Image from "next/image";
import { Cake, Calendar, Mail, MapPin, MoreHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PostCard, Post } from "@/components/posts/post-card";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: {
    username: string;
  };
}

// Mock data
const userPosts: Post[] = [
  {
    id: "1",
    title: "Introducing Next.js 14: Focusing on Performance and Developer Experience",
    content: "Next.js 14 has been released with significant improvements to performance, developer experience, and more. The update brings better caching for server components, improved static optimization, and a new App Router structure.",
    authorName: "vercel_team",
    communityName: "nextjs",
    createdAt: new Date("2023-10-26T14:53:00"),
    upvotes: 2854,
    downvotes: 42,
    commentCount: 385,
    tags: ["Release", "Update", "Web Development"],
    imageUrl: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg",
  },
  {
    id: "2",
    title: "New React Compiler is in early testing - could significantly improve rendering performance",
    content: "The React team at Meta has announced they're working on a new compiler approach that could dramatically improve performance by eliminating unnecessary re-renders automatically.",
    authorName: "vercel_team",
    communityName: "reactjs",
    createdAt: new Date("2023-10-20T11:32:00"),
    upvotes: 1763,
    downvotes: 28,
    commentCount: 213,
    tags: ["React", "Performance", "Compiler"],
  },
  {
    id: "3",
    title: "Shadcn/ui now supports dark mode out of the box with next-themes integration",
    content: "The popular shadcn/ui component library now comes with built-in dark mode support using next-themes, making it easier than ever to add theme switching to your Next.js applications.",
    authorName: "vercel_team",
    communityName: "webdev",
    createdAt: new Date("2023-10-15T09:17:00"),
    upvotes: 892,
    downvotes: 15,
    commentCount: 97,
    tags: ["UI", "Design", "CSS"],
  },
];

const comments = [
  {
    id: "c1",
    postTitle: "What's your favorite VS Code extension?",
    postCommunity: "vscode",
    content: "I'd recommend GitHub Copilot. It has completely transformed my development workflow. The suggestions are surprisingly accurate and it helps me write code much faster.",
    createdAt: new Date("2023-10-25T16:23:00"),
    upvotes: 42,
    downvotes: 3,
  },
  {
    id: "c2",
    postTitle: "How do you handle authentication in your Next.js apps?",
    postCommunity: "nextjs",
    content: "NextAuth.js is my go-to solution. It's well-documented, supports multiple providers, and integrates beautifully with Next.js.",
    createdAt: new Date("2023-10-22T14:08:00"),
    upvotes: 27,
    downvotes: 1,
  },
  {
    id: "c3",
    postTitle: "Tailwind vs. CSS Modules - which do you prefer?",
    postCommunity: "webdev",
    content: "I've used both extensively, and I now prefer Tailwind for most projects. The utility-first approach makes it faster to iterate on designs, and with proper component extraction, it stays maintainable even for large projects.",
    createdAt: new Date("2023-10-18T09:45:00"),
    upvotes: 19,
    downvotes: 5,
  }
];

export default function UserProfilePage({ params }: PageProps) {
  const { username } = params;
  
  return (
    <div className="container py-6 md:py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-chart-1 to-chart-2"></div>
          <CardContent className="pt-0">
            <div className="flex flex-col md:flex-row md:items-end -mt-12 md:-mt-16 gap-4 md:gap-6">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background">
                <AvatarImage src="https://github.com/shadcn.png" alt={username} />
                <AvatarFallback className="text-2xl">
                  {username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-1 md:space-y-0 md:pb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h1 className="text-2xl font-bold">u/{username}</h1>
                    <p className="text-muted-foreground">@{username} • 24.5k karma</p>
                  </div>
                  <div className="flex gap-2">
                    <Button>Follow</Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Share Profile</DropdownMenuItem>
                        <DropdownMenuItem>Block User</DropdownMenuItem>
                        <DropdownMenuItem>Report User</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Cake className="mr-2 h-4 w-4" />
                <span>Account created May 25, 2020</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Mail className="mr-2 h-4 w-4" />
                <span>Verified Email</span>
              </div>
            </div>
            
            <div className="mt-6">
              <p>Full-stack developer and open source contributor. Working on making the web faster and more accessible for everyone.</p>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary">Developer</Badge>
              <Badge variant="secondary">Open Source</Badge>
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">Next.js</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="posts">
          <TabsList className="mb-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="upvoted">Upvoted</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="space-y-4">
            {userPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>
          
          <TabsContent value="comments" className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                    <span>Comment on</span>
                    <Link href={`/r/${comment.postCommunity}/comments/placeholder`} className="font-medium text-foreground hover:underline">
                      {comment.postTitle}
                    </Link>
                    <span>in</span>
                    <Link href={`/r/${comment.postCommunity}`} className="font-medium text-foreground hover:underline">
                      r/{comment.postCommunity}
                    </Link>
                    <span>•</span>
                    <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <p className="text-sm mb-3">{comment.content}</p>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-big-up h-3 w-3 mr-1"><path d="M9 18v-6H5l7-7 7 7h-4v6"/></svg>
                      Upvote
                    </Button>
                    <span>{comment.upvotes - comment.downvotes} points</span>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-big-down h-3 w-3 mr-1"><path d="M15 6v6h4l-7 7-7-7h4V6"/></svg>
                      Downvote
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-reply h-3 w-3 mr-1"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark-plus h-3 w-3 mr-1"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/><line x1="12" x2="12" y1="7" y2="13"/><line x1="15" x2="9" y1="10" y2="10"/></svg>
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="saved">
            <div className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">No saved posts or comments yet</p>
            </div>
          </TabsContent>
          
          <TabsContent value="upvoted">
            <div className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">Upvoted content is private</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}