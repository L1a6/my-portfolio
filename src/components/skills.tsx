"use client";

import { useRef, useEffect } from 'react';
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";
import Container from "@/components/common/Container";
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageBoundaries, SectionLabel, RegistrationMark, GridLine } from '@/components/ui/TechnicalMarks';

gsap.registerPlugin(ScrollTrigger);

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
        "overflow-hidden py-4 mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]",
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
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-4 md:py-6 bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-hidden">
      {/* Page Boundaries */}
      <PageBoundaries />

      {/* Horizontal grid lines */}
      <GridLine orientation="horizontal" position="top-0 left-0 right-0" delay={0.2} />
      <GridLine orientation="horizontal" position="bottom-0 left-0 right-0" delay={0.3} />

      {/* Registration marks at edges */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-225 -translate-x-1/2 pointer-events-none">
        <RegistrationMark className="absolute left-1/4 top-1/2 -translate-y-1/2" size={8} delay={0.4} />
        <RegistrationMark className="absolute right-1/4 top-1/2 -translate-y-1/2" size={8} delay={0.5} />
      </div>

      {/* Content */}
      <Container className="relative z-10 w-full md:w-3xl md:mx-auto px-6">
        <div ref={contentRef}>
          <div className="text-center mb-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-4 mb-2"
            >
              <div className="flex items-center gap-2">
                <RegistrationMark size={6} delay={0.2} />
                <div className="h-px w-12 bg-neutral-300 dark:bg-neutral-700" />
              </div>
              <h2 
                className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500" 
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Tech Stack
              </h2>
              <div className="flex items-center gap-2">
                <div className="h-px w-12 bg-neutral-300 dark:bg-neutral-700" />
                <RegistrationMark size={6} delay={0.3} />
              </div>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed" 
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Building modern, scalable applications with industry-leading frameworks
            </motion.p>
          </div>

          <LogoCloud logos={techStackLogos} />
        </div>
      </Container>
    </section>
  );
}
