"use client";

import Link from "next/link";
import { PostCard, Post } from "@/components/posts/post-card";
import { Comment, CommentType } from "@/components/posts/comment";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { comment, getPost } from "@/lib/endpoints";
import { useAuthStore } from "@/lib/authStore";

interface PageProps {
  params: {
    id: string;
  };
}

export default function PostPage({ params }: PageProps) {
  const { id } = params;
  const [post, setPost] = useState<Post | null>(null);
  const [commentText, setCommentText] = useState("");
  const [newComments, setNewComments] = useState<CommentType[]>([]);
  const { getUser } = useAuthStore();
  useEffect(() => {
    async function init() {
      const response = await getPost(id);
      setPost(response);
      console.log(response);
    }
    init();
  }, [id]);

  async function submitComment() {
    if (!commentText.trim()) return;

    try {
      const user = getUser();
      const response = await comment({
        Content: commentText,
        Username: user?.Username,
        PostID: parseInt(id, 10),
      });

      const newComment = response.data;
      setNewComments((prev) => [newComment, ...prev]);
      setCommentText("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  }

  const comments = [...(post?.Comments ?? []), ...newComments];

  return (
    <div className="container px-4 py-6 md:py-8 max-w-4xl mx-auto space-y-6">
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="flex">
          <div className="flex bg-muted/40 items-center justify-center px-4">
            <div className="flex flex-col items-center py-2">
              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10"
              >
                {/* Upvote SVG */}
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
                {(post?.Likes ?? 0) - (post?.Dislikes ?? 0)}
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                {/* Downvote SVG */}
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
              <Link href={`/u/${post?.AuthorName}`} className="hover:underline">
                u/{post?.AuthorName}
              </Link>
            </div>

            <h1 className="text-2xl font-bold mb-4">{post?.Title}</h1>

            {post?.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.split(",").map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {post?.Content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* COMMENT SECTION */}
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Comment as u/shadcn</h3>
            <Textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="What are your thoughts?"
              className="min-h-32 mb-2"
            />
            <div className="flex justify-end">
              <Button onClick={submitComment}>Comment</Button>
            </div>
          </CardContent>
        </Card>

        {/* COMMENTS LIST */}
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
              <Comment key={comment.ID} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
