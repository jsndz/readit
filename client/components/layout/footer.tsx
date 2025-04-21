import Link from "next/link";
import { BookmarkPlus } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-6 md:py-10">
      <div className="container flex flex-col gap-6 md:flex-row md:gap-8">
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-2">
            <BookmarkPlus className="h-6 w-6" />
            <span className="font-bold text-xl">Readit</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            The front page of the internet
          </p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Company</h3>
            <Link href="#" className="text-sm text-muted-foreground">
              About
            </Link>
            <Link href="#" className="text-sm text-muted-foreground">
              Careers
            </Link>
            <Link href="#" className="text-sm text-muted-foreground">
              Press
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Resources</h3>
            <Link href="#" className="text-sm text-muted-foreground">
              Help Center
            </Link>
            <Link href="#" className="text-sm text-muted-foreground">
              Rules
            </Link>
            <Link href="#" className="text-sm text-muted-foreground">
              Privacy Policy
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Community</h3>
            <Link href="#" className="text-sm text-muted-foreground">
              Topics
            </Link>
            <Link href="#" className="text-sm text-muted-foreground">
              Blog
            </Link>
            <Link href="#" className="text-sm text-muted-foreground">
              Advertise
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Legal</h3>
            <Link href="#" className="text-sm text-muted-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground">
              Content Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </div>
      <div className="container mt-6 flex flex-col items-center justify-between gap-4 border-t pt-6 md:h-16 md:flex-row md:pt-0">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {currentYear} Readit, Inc. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="#" className="text-sm text-muted-foreground">
            Terms of Service
          </Link>
          <Link href="#" className="text-sm text-muted-foreground">
            Privacy
          </Link>
          <Link href="#" className="text-sm text-muted-foreground">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}