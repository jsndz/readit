import Link from "next/link";
import Image from "next/image";
import { Sidebar } from "@/components/layout/sidebar";
import { PostCard, Post } from "@/components/posts/post-card";
import { PostFilter } from "@/components/posts/post-filter";
import { CreatePostBox } from "@/components/posts/create-post-box";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data for demonstration
const posts: Post[] = [
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
    title: "TIL: You can use CSS :has() selector to create interactive components without JavaScript",
    content: "I just discovered that the CSS :has() selector can be used to create interactive UI components without a single line of JavaScript. Check out this article that shows how to build accordions, tabs, and more with pure CSS.",
    authorName: "css_wizard",
    communityName: "webdev",
    createdAt: new Date("2023-10-26T09:15:00"),
    upvotes: 1563,
    downvotes: 23,
    commentCount: 219,
    tags: ["CSS", "Frontend", "Tips"],
  },
  {
    id: "3",
    title: "GitHub Copilot now has a chat feature that explains code and helps debug issues",
    content: "GitHub has announced a new chat feature for Copilot that allows developers to ask questions about their code, get explanations, and receive help with debugging issues. This feels like having a senior developer always available to assist you.",
    authorName: "devops_dave",
    communityName: "programming",
    createdAt: new Date("2023-10-25T22:37:00"),
    upvotes: 3271,
    downvotes: 127,
    commentCount: 492,
    tags: ["GitHub", "AI", "Tools"],
  },
  {
    id: "4",
    title: "I built a full-featured e-commerce platform using TypeScript, Next.js, and Tailwind CSS",
    content: "After 3 months of hard work, I'm excited to share my e-commerce platform built with TypeScript, Next.js, and Tailwind CSS. It features user authentication, product management, cart functionality, checkout with Stripe, and more.",
    authorName: "fullstack_fred",
    communityName: "reactjs",
    createdAt: new Date("2023-10-25T16:42:00"),
    upvotes: 875,
    downvotes: 31,
    commentCount: 168,
    tags: ["Project", "Show", "E-commerce"],
    imageUrl: "https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg",
  },
  {
    id: "5",
    title: "What's your absolute favorite VS Code extension that most people don't know about?",
    content: "I'm looking to improve my development workflow and would love to hear about your favorite VS Code extensions that aren't widely known but have significantly improved your productivity or coding experience.",
    authorName: "curious_coder",
    communityName: "vscode",
    createdAt: new Date("2023-10-24T20:18:00"),
    upvotes: 621,
    downvotes: 15,
    commentCount: 284,
    tags: ["Discussion", "Tools", "Productivity"],
  },
];

export default function Home() {
  return (
    <div className="container px-4 py-6 md:py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-9/12 space-y-4">
          <PostFilter className="mb-4" />
          <div className="md:hidden">
            <CreatePostBox />
          </div>
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        
        <div className="md:w-3/12 space-y-4">
          <div className="hidden md:block">
            <CreatePostBox />
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Premium</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Get an ads-free experience, exclusive features, and support Readit.
                </p>
                <Button className="w-full">Try Now</Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="hidden md:block">
            <Sidebar className="rounded-lg border bg-card shadow-sm" />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Community Spotlight</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md overflow-hidden bg-muted">
                <div className="h-20 w-full bg-gradient-to-r from-chart-1 to-chart-2"></div>
                <div className="p-4">
                  <h4 className="font-semibold">r/MachineLearning</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    A community dedicated to AI and ML discussion.
                  </p>
                  <Button size="sm" className="w-full">Join</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}