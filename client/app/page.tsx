"use client";
import { Sidebar } from "@/components/layout/sidebar";
import { PostCard, Post } from "@/components/posts/post-card";
import { PostFilter } from "@/components/posts/post-filter";
import { CreatePostBox } from "@/components/posts/create-post-box";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Feed } from "@/lib/endpoints";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    async function getFeed() {
      const res = await Feed();
      setPosts(res.data);
    }
    getFeed();
  }, []);
  return (
    <div className="container px-4 py-6 md:py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-9/12 space-y-4">
          <PostFilter className="mb-4" />
          <div className="md:hidden">
            <CreatePostBox />
          </div>
          <div className="space-y-4">
            {posts?.map((post) => (
              <PostCard key={post.ID} post={post} />
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
                  Get an ads-free experience, exclusive features, and support
                  Readit.
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
                  <Button size="sm" className="w-full">
                    Join
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
