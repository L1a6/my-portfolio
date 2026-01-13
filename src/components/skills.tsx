"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";
import Container from "@/components/common/Container";

type Logo = {
  src: string;
  alt: string;
  name: string;
  invertInDark?: boolean;
};

const techStackLogos: Logo[] = [
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    alt: "Next.js",
    name: "Next.js",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    alt: "TypeScript",
    name: "TypeScript",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    alt: "Node.js",
    name: "Node.js",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    alt: "React",
    name: "React",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    alt: "Tailwind CSS",
    name: "Tailwind CSS",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    alt: "JavaScript",
    name: "JavaScript",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    alt: "Supabase",
    name: "Supabase",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    alt: "Git",
    name: "Git",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    alt: "Docker",
    name: "Docker",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    alt: "Vercel",
    name: "Vercel",
    invertInDark: true,
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    alt: "Express.js",
    name: "Express.js",
    invertInDark: true,
  },
  {
    src: "https://images.clerk.dev/static/logo-light-mode-400x400.png",
    alt: "Clerk",
    name: "Clerk",
  },
];

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-4 mask-[linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]",
        className
      )}
    >
      <InfiniteSlider gap={48} reverse speed={80} speedOnHover={80}>
        {logos.map((logo, index) => (
          <div
            key={`logo-${logo.alt}-${index}`}
            className="flex items-center gap-3 pointer-events-none select-none"
          >
            <img
              alt={logo.alt}
              className={cn(
                "h-7 md:h-8",
                logo.invertInDark && "dark:invert dark:brightness-100"
              )}
              loading="lazy"
              src={logo.src}
            />
            <span className="text-sm md:text-base font-medium text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
              {logo.name}
            </span>
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="relative -mt-8 pb-12 bg-white dark:bg-zinc-950 transition-colors duration-500">
      {/* Page Boundaries - Thin vertical lines on large screens only */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-225 -translate-x-1/2 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-neutral-200/60 dark:bg-neutral-800/60"></div>
        <div className="absolute right-0 top-0 bottom-0 w-px bg-neutral-200/60 dark:bg-neutral-800/60"></div>
      </div>

      {/* Content */}
      <Container className="relative z-10 w-full md:w-3xl md:mx-auto px-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-16 bg-linear-to-r from-transparent to-neutral-300 dark:to-neutral-700"></div>
            <h2 className="liquid-metal-text text-sm md:text-base font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)', letterSpacing: '0.15em' }}>
              Tech Stack
            </h2>
            <div className="h-px w-16 bg-linear-to-l from-transparent to-neutral-300 dark:to-neutral-700"></div>
          </div>
          <p className="text-sm md:text-base text-slate-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
            Building modern, scalable applications with industry-leading frameworks
          </p>
        </div>

        <LogoCloud logos={techStackLogos} />
      </Container>
    </section>
  );
}
