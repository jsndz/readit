import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { PostCard, Post } from "@/components/posts/post-card";
import { Comment, CommentType } from "@/components/posts/comment";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const comments: CommentType[] = [
  /* your existing comments array here */
];

interface PageProps {
  params: {
    communityName: string;
    postId: string;
  };
}

export default function PostPage({ params }: PageProps) {
  const { communityName } = params;

  return (
    <div className="container px-4 py-6 md:py-8 max-w-4xl mx-auto space-y-6">
      <Button variant="outline" size="sm" className="gap-1" asChild>
        <Link href={`/r/${communityName}`}>
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>
      </Button>

      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="flex">
          <div className="flex bg-muted/40 items-center justify-center px-4">
            <div className="flex flex-col items-center py-2">
              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-big-up"
                >
                  <path d="M9 18v-6H5l7-7 7 7h-4v6" />
                </svg>
              </Button>
              <span className="font-medium text-sm py-1">
                {post.upvotes - post.downvotes}
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-big-down"
                >
                  <path d="M15 6v6h4l-7 7-7-7h4V6" />
                </svg>
              </Button>
            </div>
          </div>

          <div className="p-6 flex-1">
            <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
              <span>Posted by</span>
              <Link href={`/u/${post.authorName}`} className="hover:underline">
                u/{post.authorName}
              </Link>
            </div>

            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                  >
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
              {post.content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
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
  );
}
