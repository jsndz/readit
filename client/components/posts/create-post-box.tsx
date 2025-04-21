"use client";

import Link from "next/link";
import { ImagePlus, Link2, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function CreatePostBox() {
  return (
    <Card className="mb-4">
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <Select defaultValue="choose">
              <SelectTrigger className="w-full h-8 text-xs border-none bg-muted focus:ring-0">
                <SelectValue placeholder="Choose a community" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="choose">Choose a community</SelectItem>
                <SelectItem value="programming">r/programming</SelectItem>
                <SelectItem value="webdev">r/webdev</SelectItem>
                <SelectItem value="reactjs">r/reactjs</SelectItem>
                <SelectItem value="nextjs">r/nextjs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-3">
          <Link href="/submit">
            <Input 
              className="bg-muted focus-visible:ring-0" 
              placeholder="Create Post" 
              readOnly 
            />
          </Link>
          <div className="flex justify-between mt-3">
            <Button asChild variant="ghost" size="sm" className="text-xs gap-1">
              <Link href="/submit?type=post">
                <MessageSquare className="h-4 w-4" />
                <span>Post</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="text-xs gap-1">
              <Link href="/submit?type=image">
                <ImagePlus className="h-4 w-4" />
                <span>Image</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="text-xs gap-1">
              <Link href="/submit?type=link">
                <Link2 className="h-4 w-4" />
                <span>Link</span>
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}