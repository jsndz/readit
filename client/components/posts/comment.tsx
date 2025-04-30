"use client";

import { reply } from "@/lib/endpoints";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/authStore";

export type CommentType = {
  ID: number;
  Content: string;
  AuthorName: string;
  CreatedAt: string;
  PostID: number;
  Children: CommentType[];
};

interface CommentProps {
  comment: CommentType;
  level?: number;
  commentID: number;
  postID: number;
}

export function Comment({
  comment,
  level = 0,
  commentID,
  postID,
}: CommentProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const { getUser } = useAuthStore();
  const user = getUser();

  const handleReplyToggle = () => {
    setIsReplying(!isReplying);
  };

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return;

    try {
      await reply({
        Content: replyContent,
        Username: user?.Username,
        PostID: postID,
        ParentID: commentID,
      });

      setReplyContent("");
      setIsReplying(false);
      // You may want to revalidate comments or trigger a refresh here
    } catch (err) {
      console.error("Failed to reply:", err);
    }
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
              <span className="text-xs text-muted-foreground">
                {new Date(comment.CreatedAt).toLocaleString()}
              </span>
            </div>

            <div className="text-sm whitespace-pre-line">{comment.Content}</div>

            <div className="flex gap-2 mt-2">
              {user && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs p-1 h-6"
                  onClick={handleReplyToggle}
                >
                  {isReplying ? "Cancel" : "Reply"}
                </Button>
              )}
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

      {/* Recursive Children */}
      {comment.Children && comment.Children.length > 0 && (
        <div className="space-y-4 mt-2">
          {comment.Children.map((child) => (
            <Comment
              key={child.ID}
              comment={child}
              level={currentLevel + 1}
              commentID={child.ID}
              postID={child.PostID}
            />
          ))}
        </div>
      )}
    </div>
  );
}
