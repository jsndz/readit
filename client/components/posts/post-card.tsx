"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowBigDown,
  ArrowBigUp,
  BookmarkPlus,
  Gift,
  MessagesSquare,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CommentType } from "./comment";

export type Post = {
  ID: number;
  Title: string;
  Content: string;
  AuthorName: string;
  Likes: number;
  Dislikes: number;
  tags?: string;
  Comments?: CommentType[];
};

interface PostCardProps {
  post: Post;
  compact?: boolean;
}

export function PostCard({ post, compact = false }: PostCardProps) {
  const [voteStatus, setVoteStatus] = useState<"upvote" | "downvote" | null>(
    null
  );
  const [voteCount, setVoteCount] = useState(post.Likes - post.Dislikes);
  const [saved, setSaved] = useState(false);

  const handleUpvote = () => {
    if (voteStatus === "upvote") {
      setVoteStatus(null);
      setVoteCount(voteCount - 1);
    } else {
      setVoteStatus("upvote");
      setVoteCount(voteCount + (voteStatus === "downvote" ? 2 : 1));
    }
  };

  const handleDownvote = () => {
    if (voteStatus === "downvote") {
      setVoteStatus(null);
      setVoteCount(voteCount + 1);
    } else {
      setVoteStatus("downvote");
      setVoteCount(voteCount - (voteStatus === "upvote" ? 2 : 1));
    }
  };

  const toggleSave = () => {
    setSaved(!saved);
  };

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:border-primary/20",
        compact ? "flex border-0 shadow-none" : ""
      )}
    >
      {!compact && (
        <div className="flex bg-muted/40 items-center justify-center px-2 sm:px-4">
          <div className="flex flex-col items-center py-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={handleUpvote}
              className={cn(
                "text-muted-foreground hover:text-primary hover:bg-primary/10",
                voteStatus === "upvote" && "text-primary bg-primary/10"
              )}
            >
              <ArrowBigUp className="h-5 w-5" />
              <span className="sr-only">Upvote</span>
            </Button>
            <span
              className={cn(
                "font-medium text-sm py-1",
                voteStatus === "upvote" && "text-primary",
                voteStatus === "downvote" && "text-destructive"
              )}
            >
              {voteCount}
            </span>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleDownvote}
              className={cn(
                "text-muted-foreground hover:text-destructive hover:bg-destructive/10",
                voteStatus === "downvote" &&
                  "text-destructive bg-destructive/10"
              )}
            >
              <ArrowBigDown className="h-5 w-5" />
              <span className="sr-only">Downvote</span>
            </Button>
          </div>
        </div>
      )}

      <div className={cn("flex-1", compact ? "pl-0" : "")}>
        <div className="p-4 pb-2">
          <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
            {compact ? (
              <div className="flex items-center space-x-1 mr-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6"
                  onClick={handleUpvote}
                >
                  <ArrowBigUp
                    className={cn(
                      "h-4 w-4",
                      voteStatus === "upvote" && "text-primary"
                    )}
                  />
                </Button>
                <span
                  className={cn(
                    "font-medium text-xs",
                    voteStatus === "upvote" && "text-primary",
                    voteStatus === "downvote" && "text-destructive"
                  )}
                >
                  {voteCount}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6"
                  onClick={handleDownvote}
                >
                  <ArrowBigDown
                    className={cn(
                      "h-4 w-4",
                      voteStatus === "downvote" && "text-destructive"
                    )}
                  />
                </Button>
              </div>
            ) : null}
            <span>Posted by</span>
            <Link href={`/u/${post.AuthorName}`} className="hover:underline">
              u/{post.AuthorName}
            </Link>
            <span>•</span>{" "}
          </div>

          <Link href={`/r/${post.ID}`}>
            <h3
              className={cn(
                "font-medium tracking-tight hover:underline",
                compact ? "text-base" : "text-xl mb-2"
              )}
            >
              {post.Title}
            </h3>

            {!compact && (
              <div className="mt-2">
                {typeof post.tags === "string" &&
                  post.tags &&
                  post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.split(",").map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
              </div>
            )}
          </Link>
        </div>
        t
        <CardFooter
          className={cn(
            "flex items-center p-2 pt-0 text-muted-foreground",
            compact ? "border-t-0" : "border-t"
          )}
        >
          <div className="flex items-center gap-0 sm:gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 text-xs sm:text-sm gap-1"
            >
              <Gift className="h-4 w-4" />
              <span>Award</span>
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className="h-8 text-xs sm:text-sm gap-1"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className={cn(
                "h-8 text-xs sm:text-sm gap-1",
                saved && "text-primary"
              )}
              onClick={toggleSave}
            >
              <BookmarkPlus className="h-4 w-4" />
              <span>{saved ? "Saved" : "Save"}</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost" className="h-8 px-2">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Hide</DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
                <DropdownMenuItem>Block Community</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
