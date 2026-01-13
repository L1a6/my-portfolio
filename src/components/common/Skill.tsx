import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SkillProps {
  children: React.ReactNode;
  name: string;
  href: string;
  className?: string;
}

export default function Skill({ children, name, href, className }: SkillProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-all duration-200',
        'bg-neutral-100 dark:bg-neutral-800/50',
        'hover:bg-neutral-200 dark:hover:bg-neutral-700/50',
        'border border-neutral-200 dark:border-neutral-700',
        'text-neutral-700 dark:text-neutral-300',
        'hover:scale-105',
        className
      )}
      title={name}
    >
      <span className="w-4 h-4">{children}</span>
      <span className="text-sm font-medium">{name}</span>
    </Link>
  );
}
