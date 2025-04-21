"use client";

import { useState } from "react";
import { ChevronDown, Clock, Flame, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type SortOption = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

const sortOptions: SortOption[] = [
  {
    label: "Hot",
    value: "hot",
    icon: <Flame className="h-4 w-4 mr-2" />,
  },
  {
    label: "New",
    value: "new",
    icon: <Sparkles className="h-4 w-4 mr-2" />,
  },
  {
    label: "Top",
    value: "top",
    icon: <TrendingUp className="h-4 w-4 mr-2" />,
  },
  {
    label: "Rising",
    value: "rising",
    icon: <TrendingUp className="h-4 w-4 mr-2" />,
  },
];

const timeOptions = [
  { label: "Now", value: "now" },
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
  { label: "All Time", value: "all" },
];

interface PostFilterProps {
  onSortChange?: (sort: string) => void;
  onTimeChange?: (time: string) => void;
  className?: string;
}

export function PostFilter({ onSortChange, onTimeChange, className }: PostFilterProps) {
  const [activeSort, setActiveSort] = useState<string>("hot");
  const [activeTime, setActiveTime] = useState<string>("today");
  const [viewType, setViewType] = useState<"card" | "compact">("card");

  const handleSortChange = (sort: string) => {
    setActiveSort(sort);
    if (onSortChange) {
      onSortChange(sort);
    }
  };

  const handleTimeChange = (time: string) => {
    setActiveTime(time);
    if (onTimeChange) {
      onTimeChange(time);
    }
  };

  const toggleViewType = () => {
    setViewType(viewType === "card" ? "compact" : "card");
  };

  const activeSortOption = sortOptions.find((option) => option.value === activeSort);

  return (
    <div className={cn("flex items-center justify-between bg-card p-2 rounded-md border", className)}>
      <div className="flex items-center space-x-1">
        {sortOptions.map((option) => (
          <Button
            key={option.value}
            variant={activeSort === option.value ? "secondary" : "ghost"}
            size="sm"
            className="text-sm"
            onClick={() => handleSortChange(option.value)}
          >
            {option.icon}
            {option.label}
          </Button>
        ))}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-sm">
              <Clock className="h-4 w-4 mr-2" />
              {activeTime}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {timeOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleTimeChange(option.value)}
                className={cn(activeTime === option.value && "bg-accent")}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex items-center">
        <Button 
          variant={viewType === "card" ? "secondary" : "ghost"} 
          size="sm" 
          className="text-sm"
          onClick={toggleViewType}
        >
          Card
        </Button>
        <Button 
          variant={viewType === "compact" ? "secondary" : "ghost"} 
          size="sm" 
          className="text-sm"
          onClick={toggleViewType}
        >
          Compact
        </Button>
      </div>
    </div>
  );
}