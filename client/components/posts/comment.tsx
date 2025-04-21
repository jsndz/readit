"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ArrowBigDown, ArrowBigUp, MessageSquare, MoreHorizontal, Reply } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type CommentType = {
  id: string;
  content: string;
  authorName: string;
  authorImage?: string;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  parentId?: string;
  replies?: CommentType[];
  level?: number;
};

interface CommentProps {
  comment: CommentType;
  level?: number;
}

export function Comment({ comment, level = 0 }: CommentProps) {
  const [voteStatus, setVoteStatus] = useState<'upvote' | 'downvote' | null>(null);
  const [voteCount, setVoteCount] = useState(comment.upvotes - comment.downvotes);
  const [isReplying, setIsReplying] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleUpvote = () => {
    if (voteStatus === 'upvote') {
      setVoteStatus(null);
      setVoteCount(voteCount - 1);
    } else {
      setVoteStatus('upvote');
      setVoteCount(voteCount + (voteStatus === 'downvote' ? 2 : 1));
    }
  };

  const handleDownvote = () => {
    if (voteStatus === 'downvote') {
      setVoteStatus(null);
      setVoteCount(voteCount + 1);
    } else {
      setVoteStatus('downvote');
      setVoteCount(voteCount - (voteStatus === 'upvote' ? 2 : 1));
    }
  };

  const handleReply = () => {
    setIsReplying(!isReplying);
    if (!isReplying) {
      setReplyContent("");
    }
  };

  const handleSubmitReply = () => {
    // Here you would handle the reply submission
    setIsReplying(false);
    setReplyContent("");
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const maxLevel = 5;
  const currentLevel = Math.min(level, maxLevel);
  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className="comment-thread">
      <div 
        className={cn(
          "pl-0 relative",
          !isCollapsed && currentLevel > 0 && "border-l-2 border-muted pl-4"
        )}
      >
        <Card className={cn(
          "mb-3 border-0 shadow-none", 
          isCollapsed && "opacity-60"
        )}>
          <CardContent className="p-3">
            <div className="flex items-start gap-2">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-5 w-5 rounded-full p-0"
                onClick={toggleCollapse}
              >
                <Avatar className="h-5 w-5">
                  <AvatarImage src={comment.authorImage} />
                  <AvatarFallback className="text-[10px]">
                    {comment.authorName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">u/{comment.authorName}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(comment.createdAt)} ago
                  </span>
                  {isCollapsed && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-5 px-2 text-xs"
                      onClick={toggleCollapse}
                    >
                      [+] {hasReplies && `${comment.replies?.length} replies`}
                    </Button>
                  )}
                </div>
                
                {!isCollapsed && (
                  <div className="text-sm">
                    <p>{comment.content}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          
          {!isCollapsed && (
            <CardFooter className="flex items-center p-2 pt-0 text-muted-foreground">
              <div className="flex items-center gap-1 text-xs">
                <div className="flex items-center">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-6 w-6"
                    onClick={handleUpvote}
                  >
                    <ArrowBigUp className={cn(
                      "h-3 w-3",
                      voteStatus === 'upvote' && "text-primary"
                    )} />
                    <span className="sr-only">Upvote</span>
                  </Button>
                  <span className={cn(
                    "font-medium text-xs",
                    voteStatus === 'upvote' && "text-primary",
                    voteStatus === 'downvote' && "text-destructive"
                  )}>
                    {voteCount}
                  </span>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-6 w-6"
                    onClick={handleDownvote}
                  >
                    <ArrowBigDown className={cn(
                      "h-3 w-3",
                      voteStatus === 'downvote' && "text-destructive"
                    )} />
                    <span className="sr-only">Downvote</span>
                  </Button>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 text-xs gap-1"
                  onClick={handleReply}
                >
                  <Reply className="h-3 w-3" />
                  <span>Reply</span>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <MoreHorizontal className="h-3 w-3" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem>Report</DropdownMenuItem>
                    <DropdownMenuItem>Save</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardFooter>
          )}
        </Card>
        
        {isReplying && !isCollapsed && (
          <div className="ml-7 mb-4">
            <Textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="What are your thoughts?"
              className="min-h-20 mb-2"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={handleReply}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSubmitReply}>
                Reply
              </Button>
            </div>
          </div>
        )}
        
        {!isCollapsed && hasReplies && (
          <div className="space-y-1">
            {comment.replies?.map((reply) => (
              <Comment key={reply.id} comment={reply} level={currentLevel + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}