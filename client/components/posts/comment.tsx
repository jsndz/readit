"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type CommentType = {
  ID: number;
  Content: string;
  UserID: number;
  AuthorName: string;
  CreatedAt: string;
  Children: CommentType[];
};

interface CommentProps {
  comment: CommentType;
  level?: number;
}

export function Comment({ comment, level = 0 }: CommentProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleReplyToggle = () => {
    setIsReplying(!isReplying);
  };

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return;

    // Handle submit reply to backend here
    // Example: await postReply(comment.ID, replyContent)

    setReplyContent("");
    setIsReplying(false);
  };

  const maxLevel = 5;
  const currentLevel = Math.min(level, maxLevel);

  return (
    <div
      className={cn("mt-4", currentLevel > 0 && "border-l pl-4 border-muted")}
    >
      <Card className="shadow-none border">
        <CardContent className="p-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                u/{comment.AuthorName}
              </span>
              <span className="text-xs">
                {formatDistanceToNow(new Date(comment.CreatedAt))} ago
              </span>
            </div>
            <div className="text-sm whitespace-pre-line">{comment.Content}</div>
            <div className="flex gap-2 mt-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs p-1 h-6"
                onClick={handleReplyToggle}
              >
                {isReplying ? "Cancel" : "Reply"}
              </Button>
            </div>

            {isReplying && (
              <div className="mt-2">
                <Textarea
                  placeholder="Write your reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex justify-end mt-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReplyToggle}
                  >
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleReplySubmit}>
                    Reply
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Render child comments recursively */}
      {comment.Children && comment.Children.length > 0 && (
        <div className="space-y-4 mt-2">
          {comment.Children.map((child) => (
            <Comment key={child.ID} comment={child} level={currentLevel + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
