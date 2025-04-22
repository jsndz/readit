"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ImagePlus, Link2, Loader2, MessageSquare } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const formSchema = z.object({
  community: z.string({
    required_error: "Please select a community.",
  }),
  title: z
    .string()
    .min(1, {
      message: "Title is required.",
    })
    .max(300, {
      message: "Title cannot be longer than 300 characters.",
    }),

  content: z.string().optional(),
  link: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional(),
  tags: z.string().optional(),
});

export default function SubmitPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const postType = searchParams.get("type") || "post";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      community: "",
      title: "",
      content: "",
      link: "",
      tags: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/");
    }, 1500);
  }

  return (
    <div className="container py-6 md:py-8">
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Create Post</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create a post</h1>

        <Card>
          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="community"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a topic" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="tech">Tech</SelectItem>
                          <SelectItem value="gaming">Gaming</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="art">Art</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="news">News</SelectItem>
                          <SelectItem value="memes">Memes</SelectItem>
                          <SelectItem value="career">Career</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>
                      <FormDescription>
                        A good title is descriptive and engaging.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Discussion, Question, News (comma separated)"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Add relevant tags to help categorize your post.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-end space-x-4">
                  <Button type="button" variant="outline" asChild>
                    <Link href="/">Cancel</Link>
                  </Button>
                  <Button type="button" variant="outline">
                    Save Draft
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      "Post"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
