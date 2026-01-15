"use client";

import React, { useState, useEffect, useRef } from 'react';
import Container from '@/components/common/Container';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageBoundaries, SectionLabel, CropMark, RegistrationMark, GridLine } from '@/components/ui/TechnicalMarks';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TechLogo {
  name: string;
  src: string;
  invertInDark?: boolean;
}

interface Project {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  techStack: TechLogo[];
  liveUrl: string;
  codeUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    category: "Full Stack",
    title: "E-Commerce Platform",
    description: "Multi-vendor marketplace",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    techStack: [
      { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    ],
    liveUrl: "https://example.com",
    codeUrl: "https://github.com",
  },
  {
    id: 2,
    category: "Data Visualization",
    title: "Analytics Dashboard",
    description: "AI-powered insights",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    techStack: [
      { name: "Vue.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
      { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "MongoDB", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Vercel", src: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png", invertInDark: true },
    ],
    liveUrl: "https://example.com",
    codeUrl: "https://github.com",
  },
  {
    id: 3,
    category: "Mobile App",
    title: "Fitness Tracker",
    description: "Smart workout companion",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
    techStack: [
      { name: "React Native", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Firebase", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Redux", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
    ],
    liveUrl: "https://example.com",
    codeUrl: "https://github.com",
  },
  {
    id: 4,
    category: "AI Integration",
    title: "Content Generator",
    description: "GPT-4 marketing suite",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80",
    techStack: [
      { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invertInDark: true },
      { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Vercel", src: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png", invertInDark: true },
      { name: "Tailwind", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    ],
    liveUrl: "https://example.com",
    codeUrl: "https://github.com",
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const textRevealRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    // Text reveal animation - matching About section
    if (textRevealRef.current) {
      const words = textRevealRef.current.querySelectorAll('.word-reveal');
      gsap.fromTo(
        words,
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRevealRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Line expand animation
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  const handleSlideClick = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };

  const handleToggleExpand = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex === index) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };

  const nextSlide = () => {
    setActiveIndex((activeIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    setActiveIndex((activeIndex - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  return (
    <section ref={sectionRef} className="relative pt-8 pb-12 md:py-16 bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-hidden">
      {/* Page Boundaries */}
      <PageBoundaries />

      {/* Horizontal grid lines */}
      <GridLine orientation="horizontal" position="top-0 left-0 right-0" delay={0.1} />

      {/* Technical crop marks around section */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-225 -translate-x-1/2 pointer-events-none">
        <CropMark position="top-left" size={20} className="top-6 left-4" delay={0.2} />
        <CropMark position="top-right" size={20} className="top-6 right-4" delay={0.25} />
        <CropMark position="bottom-left" size={20} className="bottom-6 left-4" delay={0.3} />
        <CropMark position="bottom-right" size={20} className="bottom-6 right-4" delay={0.35} />
      </div>

      <Container className="relative z-10 w-full md:w-3xl md:mx-auto px-6">
        <div 
          ref={headerRef}
          className="mb-6 md:mb-8"
        >
          {/* Section label with technical marks */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <SectionLabel number="02">Featured Work</SectionLabel>
          </motion.div>

          {/* Heading with Word Reveal - MATCHING ABOUT SECTION */}
          <div ref={textRevealRef} className="overflow-hidden mb-4">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.15]" 
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              <span className="word-reveal inline-block">Featured</span>{' '}
              <span className="word-reveal inline-block text-neutral-400 dark:text-neutral-600">Projects.</span>
            </h2>
          </div>
          
          {/* Expanding line */}
          <div 
            ref={lineRef}
            className="w-full h-px bg-neutral-200 dark:bg-neutral-800 mb-4 origin-left"
          />
          
          <p 
            className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-normal tracking-wide" 
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Showcasing excellence through code
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative rounded-xl overflow-hidden shadow-xl shadow-neutral-200/50 dark:shadow-black/40 h-112.5 md:h-105"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute top-3 left-1/2 -translate-x-1/2 z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 dark:bg-white/8 backdrop-blur-xl border border-white/20 dark:border-white/12 rounded-full">
              <motion.span 
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-1 bg-white rounded-full"
              ></motion.span>
              <span className="text-[9px] md:text-[10px] font-semibold text-white uppercase tracking-wider" style={{ fontFamily: 'var(--font-inter)' }}>
                Featured Work
              </span>
            </div>
          </motion.div>

          <div className="flex md:flex-row flex-col h-full gap-px bg-neutral-300 dark:bg-neutral-700">
            <AnimatePresence mode="sync">
              {projects.map((project, index) => {
                const isActive = activeIndex === index;
                
                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      duration: 1,
                      ease: [0.22, 0.61, 0.36, 1],
                      layout: { 
                        duration: 1,
                        ease: [0.22, 0.61, 0.36, 1]
                      } 
                    }}
                    onClick={() => handleSlideClick(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSlideClick(index);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${project.title} details`}
                    aria-expanded={isActive}
                    className={`relative cursor-pointer bg-cover bg-center overflow-hidden transition-all duration-700 ease-out
                      ${isActive 
                        ? 'flex-4 md:flex-3 grayscale-0 brightness-100' 
                        : 'flex-1 md:flex-1 grayscale-[0.2] brightness-90 hover:grayscale-0 hover:brightness-100'
                      }
                    `}
                    style={{
                      backgroundImage: `url(${project.image})`,
                    }}
                  >
                    <div 
                      className="absolute inset-0 transition-all duration-1000 ease-in-out"
                      style={{
                        background: isActive 
                          ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 35%, transparent 60%)' 
                          : 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 30%, transparent 55%)'
                      }}
                    ></div>

                    <motion.div 
                      layout
                      transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
                      className={`absolute transition-all duration-1000 ease-in-out z-10 ${
                        isActive 
                          ? 'left-4 top-4 md:left-6 md:top-6' 
                          : 'left-4 top-4 md:left-auto md:top-6 md:right-6'
                      }`}
                    >
                      <span 
                        className={`inline-block px-3 py-0.5 md:px-4 md:py-1 bg-white/12 border border-white/25 rounded-full backdrop-blur-sm text-white font-semibold uppercase tracking-wider transition-all duration-1000 text-[8px] md:text-[9px]`}
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {project.category}
                      </span>
                    </motion.div>

                    <div className={`absolute transition-all duration-500 ease-in-out ${
                      isActive 
                        ? 'opacity-0 pointer-events-none' 
                        : 'opacity-0 md:opacity-100'
                    } md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:-rotate-90 left-6 bottom-20`}>
                      <h3 
                        className="text-white font-bold whitespace-nowrap text-sm md:text-lg tracking-tight"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {project.title}
                      </h3>
                    </div>

                    <motion.div 
                      layout
                      transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
                      className={`absolute left-4 right-4 md:left-6 md:right-6 z-10 transition-all duration-1000 ease-in-out ${
                        isActive ? 'bottom-6 md:bottom-16' : 'bottom-4 md:bottom-8'
                      }`}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isActive ? 0.4 : 0.9 }}
                        className={`text-white font-extralight leading-none transition-all duration-500 ease-in-out ${
                          isActive 
                            ? 'text-sm md:text-2xl mb-1' 
                            : 'text-2xl md:text-4xl mb-1.5'
                        }`}
                        style={{ fontFamily: 'var(--font-inter)', fontVariantNumeric: 'tabular-nums' }}
                      >
                        {String(project.id).padStart(2, '0')}
                      </motion.div>

                      <h3 
                        className={`text-white font-bold leading-tight tracking-tight transition-all duration-500 ease-in-out ${
                          isActive 
                            ? 'text-sm md:text-lg mb-1 md:mb-1.5' 
                            : 'text-xs md:opacity-0 md:pointer-events-none mb-0.5'
                        }`}
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {project.title}
                      </h3>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="mt-3 md:mt-2"
                          >
                            <p 
                              className="text-xs md:text-sm text-white/85 leading-relaxed mb-2.5"
                              style={{ fontFamily: 'var(--font-inter)' }}
                            >
                              {project.description}
                            </p>

                            <div>
                              <p className="text-[8px] md:text-[9px] font-semibold text-white/40 mb-2 uppercase tracking-wider" style={{ fontFamily: 'var(--font-inter)' }}>
                                Stack
                              </p>
                              <div className="flex flex-wrap gap-2 md:gap-2">
                                {project.techStack.map((tech, idx) => (
                                  <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 + (idx * 0.05), duration: 0.3 }}
                                    className="group relative"
                                    title={tech.name}
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                  >
                                    <div className="w-7 h-7 md:w-8 md:h-8 bg-white/10 backdrop-blur-sm border border-white/15 rounded p-1 md:p-1.5 transition-all duration-300 hover:bg-white/20 hover:border-white/30">
                                      <Image
                                        src={tech.src}
                                        alt={tech.name}
                                        width={32}
                                        height={32}
                                        className={`w-full h-full object-contain ${tech.invertInDark ? 'dark:invert dark:brightness-100' : ''}`}
                                      />
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                              className="flex items-center gap-2 pt-3 md:pt-4"
                            >
                              <motion.a
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 md:gap-1.5 px-2.5 py-1.5 md:px-3.5 md:py-2 text-[8px] md:text-[10px] font-bold text-white bg-white/10 border border-white/15 rounded hover:bg-white/18 hover:border-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30"
                                style={{ fontFamily: 'var(--font-inter)' }}
                              >
                                <ExternalLink className="w-2.5 h-2.5 md:w-3 md:h-3" />
                                <span>Live</span>
                              </motion.a>
                              <motion.a
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                href={project.codeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 md:gap-1.5 px-2.5 py-1.5 md:px-3.5 md:py-2 text-[8px] md:text-[10px] font-bold text-white bg-white/10 border border-white/15 rounded hover:bg-white/18 hover:border-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30"
                                style={{ fontFamily: 'var(--font-inter)' }}
                              >
                                <Github className="w-2.5 h-2.5 md:w-3 md:h-3" />
                                <span>Code</span>
                              </motion.a>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.button
                      whileHover={{ scale: 1.12, rotate: isActive ? 0 : 90 }}
                      whileTap={{ scale: 0.88 }}
                      type="button"
                      onClick={(e) => handleToggleExpand(index, e)}
                      aria-label={isActive ? 'Collapse' : 'Expand'}
                      className={`absolute bottom-5 right-5 md:bottom-6 md:right-6 w-8 h-8 md:w-9 md:h-9 bg-white/12 backdrop-blur-md border border-white/25 rounded-full flex items-center justify-center transition-all duration-500 hover:bg-white/20 hover:border-white/40 hover:shadow-lg z-20 focus:outline-none focus:ring-2 focus:ring-white/40 ${
                        isActive ? 'rotate-45' : ''
                      }`}
                    >
                      <motion.div
                        animate={{ rotate: isActive ? 45 : 0 }}
                        className="relative w-full h-full flex items-center justify-center"
                      >
                        <div className="absolute w-2.75 h-[1.5px] bg-white"></div>
                        <motion.div 
                          animate={{ opacity: isActive ? 0 : 1, scale: isActive ? 0 : 1 }}
                          className="absolute w-[1.5px] h-2.75 bg-white"
                        ></motion.div>
                      </motion.div>
                    </motion.button>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous project"
            className="absolute top-1/2 -translate-y-1/2 left-3 md:left-4 w-7 h-7 md:w-8 md:h-8 bg-white/8 backdrop-blur-xl border border-white/15 rounded-full flex items-center justify-center text-white text-sm md:text-base transition-all duration-300 hover:bg-white/15 hover:border-white/30 active:scale-95 z-20 focus:outline-none focus:ring-1 focus:ring-white/30"
          >
            <span aria-hidden="true">‹</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next project"
            className="absolute top-1/2 -translate-y-1/2 right-3 md:right-4 w-7 h-7 md:w-8 md:h-8 bg-white/8 backdrop-blur-xl border border-white/15 rounded-full flex items-center justify-center text-white text-sm md:text-base transition-all duration-300 hover:bg-white/15 hover:border-white/30 active:scale-95 z-20 focus:outline-none focus:ring-1 focus:ring-white/30"
          >
            <span aria-hidden="true">›</span>
          </motion.button>
        </motion.div>
      </Container>
    </section>
  );
}
