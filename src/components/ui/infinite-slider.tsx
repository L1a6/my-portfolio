"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface InfiniteSliderProps {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  reverse?: boolean;
  className?: string;
}

export function InfiniteSlider({
  children,
  gap = 40,
  speed = 60,
  speedOnHover = 30,
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const duration = isHovered ? speedOnHover : speed;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        className="flex w-max animate-infinite-scroll"
        style={{
          gap: `${gap}px`,
          animationDirection: reverse ? "reverse" : "normal",
          animationDuration: `${duration}s`,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
