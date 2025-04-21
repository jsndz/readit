import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { PostCard, Post } from "@/components/posts/post-card";
import { Comment, CommentType } from "@/components/posts/comment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Mock data
const post: Post = {
  id: "1",
  title: "Introducing Next.js 14: Focusing on Performance and Developer Experience",
  content: "Next.js 14 has been released with significant improvements to performance, developer experience, and more. The update brings better caching for server components, improved static optimization, and a new App Router structure.\n\nOne of the most significant changes is the introduction of partial prerendering, which allows for hybrid static/dynamic rendering at the component level rather than the page level. This means you can have static content for most of your page while still including dynamic elements where needed.\n\nAnother major improvement is the server actions feature, which is now stable. Server actions allow you to define and use server-side functions directly in your client components, making form handling and data mutations much simpler.\n\nThe Next.js team has also continued improving the developer experience with better error messages, faster refresh times, and enhanced debugging tools.\n\nWhat are your thoughts on these updates? Have you tried Next.js 14 yet?",
  authorName: "vercel_team",
  authorImage: "https://github.com/shadcn.png",
  communityName: "nextjs",
  createdAt: new Date("2023-10-26T14:53:00"),
  upvotes: 2854,
  downvotes: 42,
  commentCount: 385,
  tags: ["Release", "Update", "Web Development"],
  imageUrl: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg",
};

const comments: CommentType[] = [
  {
    id: "c1",
    content: "This is huge! The partial prerendering feature is exactly what I've been waiting for. Being able to mix static and dynamic content at the component level will make optimizing large applications so much easier.",
    authorName: "react_enthusiast",
    authorImage: "https://github.com/shadcn.png",
    createdAt: new Date("2023-10-26T15:10:00"),
    upvotes: 423,
    downvotes: 12,
    replies: [
      {
        id: "c1-r1",
        content: "Agreed! I've been using the beta for a few weeks and it's dramatically improved load times for our e-commerce site where we need both static product information and dynamic inventory/pricing.",
        authorName: "e_commerce_dev",
        createdAt: new Date("2023-10-26T15:25:00"),
        upvotes: 87,
        downvotes: 3,
        replies: [
          {
            id: "c1-r1-r1",
            content: "Any tips for migrating from Next.js 13 to 14? We have a large e-commerce site as well and I'm concerned about the transition.",
            authorName: "cautious_coder",
            createdAt: new Date("2023-10-26T15:40:00"),
            upvotes: 25,
            downvotes: 0,
            replies: [
              {
                id: "c1-r1-r1-r1",
                content: "In my experience, the migration was surprisingly smooth. Start by updating your dependencies and then focus on converting to server actions if you're doing a lot of form handling. The new docs have a great migration guide too.",
                authorName: "e_commerce_dev",
                createdAt: new Date("2023-10-26T16:05:00"),
                upvotes: 19,
                downvotes: 1,
                replies: [
                  {
                    id: "c1-r1-r1-r1-r1",
                    content: "Thanks for the advice! I'll check out the migration guide and start with a small section of our app first.",
                    authorName: "cautious_coder",
                    createdAt: new Date("2023-10-26T16:15:00"),
                    upvotes: 8,
                    downvotes: 0,
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "c1-r2",
        content: "I'm curious how this compares to Astro's partial hydration model. Has anyone used both and can compare them?",
        authorName: "framework_hopper",
        createdAt: new Date("2023-10-26T16:30:00"),
        upvotes: 56,
        downvotes: 2,
      }
    ]
  },
  {
    id: "c2",
    content: "Server Actions being stable is the real game changer for me. I've been using tRPC for all my API needs, but the simplicity of Server Actions is making me reconsider my stack.",
    authorName: "backend_bob",
    authorImage: "https://github.com/shadcn.png",
    createdAt: new Date("2023-10-26T15:15:00"),
    upvotes: 318,
    downvotes: 24,
    replies: [
      {
        id: "c2-r1",
        content: "How do Server Actions compare to tRPC in terms of type safety? That's the main reason I use tRPC.",
        authorName: "typescript_fan",
        createdAt: new Date("2023-10-26T15:30:00"),
        upvotes: 42,
        downvotes: 1,
      }
    ]
  },
  {
    id: "c3",
    content: "I'm still on Next.js 12 because I'm not convinced about the App Router yet. It feels like there are too many breaking changes and the mental model is completely different. Is it worth the effort to upgrade?",
    authorName: "hesitant_dev",
    createdAt: new Date("2023-10-26T16:00:00"),
    upvotes: 156,
    downvotes: 43,
  }
];

interface PageProps {
  params: {
    communityName: string;
    postId: string;
  };
}

export default function PostPage({ params }: PageProps) {
  const { communityName, postId } = params;
  
  return (
    <div className="container px-4 py-6 md:py-8">
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/r/${communityName}`}>r/{communityName}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Comments</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-9/12 space-y-6">
          <Button variant="outline" size="sm" className="gap-1" asChild>
            <Link href={`/r/${communityName}`}>
              <ArrowLeft className="h-4 w-4" />
              <span>Back to r/{communityName}</span>
            </Link>
          </Button>
          
          <div className="rounded-lg border bg-card overflow-hidden">
            <div className="flex">
              <div className="flex bg-muted/40 items-center justify-center px-4">
                <div className="flex flex-col items-center py-2">
                  <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-big-up"><path d="M9 18v-6H5l7-7 7 7h-4v6"/></svg>
                    <span className="sr-only">Upvote</span>
                  </Button>
                  <span className="font-medium text-sm py-1">{post.upvotes - post.downvotes}</span>
                  <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-big-down"><path d="M15 6v6h4l-7 7-7-7h4V6"/></svg>
                    <span className="sr-only">Downvote</span>
                  </Button>
                </div>
              </div>
              
              <div className="p-6 flex-1">
                <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                  <Link href={`/r/${post.communityName}`} className="font-medium text-foreground hover:underline">r/{post.communityName}</Link>
                  <span>•</span>
                  <span>Posted by</span>
                  <Link href={`/u/${post.authorName}`} className="hover:underline">u/{post.authorName}</Link>
                </div>
                
                <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {post.imageUrl && (
                  <div className="relative w-full aspect-video mb-6 overflow-hidden rounded-md">
                    <Image 
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  {post.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t p-4 flex items-center gap-2 text-muted-foreground">
              <Button size="sm" variant="ghost" className="text-xs sm:text-sm gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square h-4 w-4"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span>{post.commentCount} Comments</span>
              </Button>
              
              <Button size="sm" variant="ghost" className="text-xs sm:text-sm gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gift h-4 w-4"><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
                <span>Award</span>
              </Button>
              
              <Button size="sm" variant="ghost" className="text-xs sm:text-sm gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share-2 h-4 w-4"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                <span>Share</span>
              </Button>
              
              <Button size="sm" variant="ghost" className="text-xs sm:text-sm gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark-plus h-4 w-4"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/><line x1="12" x2="12" y1="7" y2="13"/><line x1="15" x2="9" y1="10" y2="10"/></svg>
                <span>Save</span>
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Comment as u/shadcn</h3>
                <Textarea 
                  placeholder="What are your thoughts?" 
                  className="min-h-32 mb-2"
                />
                <div className="flex justify-end">
                  <Button>Comment</Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="border-t pt-4">
              <div className="flex items-center mb-4 space-x-2">
                <Button variant="outline" size="sm">
                  Best Comments
                </Button>
                <Button variant="ghost" size="sm">
                  New Comments
                </Button>
              </div>
              
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-3/12 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About r/{communityName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm mb-2">
                  A community for Next.js developers to share updates, ask questions, and showcase projects.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>425k members</span>
                  <span>•</span>
                  <span>1.2k online</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-1">Created Jan 12, 2017</p>
              </div>
              <Button className="w-full">Join</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">r/{communityName} Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="font-medium mr-2">1.</span>
                  <p className="text-sm">Be respectful and constructive</p>
                </div>
                <div className="flex items-start">
                  <span className="font-medium mr-2">2.</span>
                  <p className="text-sm">No self-promotion without context</p>
                </div>
                <div className="flex items-start">
                  <span className="font-medium mr-2">3.</span>
                  <p className="text-sm">Keep posts relevant to Next.js</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View All Rules
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Related Communities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-chart-3 to-chart-4 flex items-center justify-center text-white text-xs font-bold">
                    r/
                  </div>
                  <div>
                    <p className="text-sm font-medium">r/reactjs</p>
                    <p className="text-xs text-muted-foreground">834k members</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="h-8">Join</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-chart-2 to-chart-5 flex items-center justify-center text-white text-xs font-bold">
                    r/
                  </div>
                  <div>
                    <p className="text-sm font-medium">r/typescript</p>
                    <p className="text-xs text-muted-foreground">413k members</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="h-8">Join</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-chart-1 to-chart-4 flex items-center justify-center text-white text-xs font-bold">
                    r/
                  </div>
                  <div>
                    <p className="text-sm font-medium">r/javascript</p>
                    <p className="text-xs text-muted-foreground">1.2M members</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="h-8">Join</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}