'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from './common/Container';
import LiquidMetalButton from './LiquidMetalButton';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { PageBoundaries, SectionLabel, CropMark, RegistrationMark, GridLine } from './ui/TechnicalMarks';

gsap.registerPlugin(ScrollTrigger);

// Pixelated Data Degradation Effect Component
const PixelatedOverlay = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`absolute pointer-events-none z-20 ${className}`}>
      {/* Animated pixel blocks */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.8, 0.6, 0.9, 0.7],
            scale: [0.8, 1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="absolute bg-neutral-900/90 dark:bg-white/90"
          style={{
            width: `${8 + Math.random() * 16}px`,
            height: `${8 + Math.random() * 16}px`,
            right: `${(i % 4) * 20 + Math.random() * 10}px`,
            bottom: `${Math.floor(i / 4) * 18 + Math.random() * 8}px`,
          }}
        />
      ))}
      {/* Data stream lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: [0, 1, 0.5, 1],
            opacity: [0, 0.6, 0.3, 0.5],
          }}
          transition={{
            duration: 3,
            delay: i * 0.2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute h-px bg-neutral-400 dark:bg-neutral-500 origin-right"
          style={{
            width: `${30 + i * 8}px`,
            right: 0,
            bottom: `${60 + i * 12}px`,
          }}
        />
      ))}
    </div>
  );
};

// Technical skill display - elegant inline format
const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript'] },
  { category: 'Backend', items: ['Node.js', 'PostgreSQL', 'APIs'] },
  { category: 'Design', items: ['Figma', 'UI/UX', 'Motion'] },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRevealRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Horizontal line expand
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

      // Image parallax on scroll
      if (imageRef.current && imageContainerRef.current) {
        gsap.fromTo(
          imageRef.current,
          { y: 20, scale: 1.05 },
          {
            y: -20,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }

      // Text reveal with GSAP
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

      // Skills reveal
      if (skillsRef.current) {
        const skillItems = skillsRef.current.querySelectorAll('.skill-item');
        gsap.fromTo(
          skillItems,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: skillsRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-8 pb-12 md:pt-12 md:pb-16 bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-hidden"
    >
      {/* Page Boundaries */}
      <PageBoundaries />

      {/* Horizontal grid lines */}
      <GridLine orientation="horizontal" position="top-0 left-0 right-0" delay={0.1} />

      {/* Technical crop marks */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-225 -translate-x-1/2 pointer-events-none">
        <CropMark position="top-left" size={20} className="top-6 left-4" delay={0.2} />
        <CropMark position="top-right" size={20} className="top-6 right-4" delay={0.25} />
        <CropMark position="bottom-left" size={20} className="bottom-6 left-4" delay={0.3} />
        <CropMark position="bottom-right" size={20} className="bottom-6 right-4" delay={0.35} />
      </div>

      <Container className="relative z-10 w-full md:w-3xl md:mx-auto px-6">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-10"
        >
          <SectionLabel number="03">About</SectionLabel>
        </motion.div>

        {/* Main Content Grid - items-start for top alignment */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Image Column - WIDER, aligned to top */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-none">
              {/* Technical frame corners */}
              <CropMark position="top-left" size={16} className="-top-3 -left-3" delay={0.4} />
              <CropMark position="top-right" size={16} className="-top-3 -right-3" delay={0.45} />
              <CropMark position="bottom-left" size={16} className="-bottom-3 -left-3" delay={0.5} />
              <CropMark position="bottom-right" size={16} className="-bottom-3 -right-3" delay={0.55} />

              {/* Image container - FULL WIDTH, responsive aspect ratio */}
              <div 
                ref={imageContainerRef}
                className="relative w-full aspect-4/5 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900"
              >
                <div ref={imageRef} className="absolute inset-[-5%] w-[110%] h-[110%]">
                  <Image
                    src="/about-image.jpg"
                    alt="Portrait"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Premium gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-neutral-900/40 via-transparent to-transparent z-10" />
                
                {/* Pixelated Data Degradation Effect - Bottom Right */}
                <PixelatedOverlay className="bottom-0 right-0 w-24 h-24 md:w-32 md:h-32" />
                
                {/* Technical data readout overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1 }}
                  className="absolute bottom-3 left-3 z-20"
                >
                  <div className="flex items-center gap-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-mono text-white/80 tracking-wider">
                      DATA_STREAM.ACTIVE
                    </span>
                  </div>
                </motion.div>
                
                {/* Corner accent lines */}
                <div className="absolute top-0 right-0 w-16 h-16 z-10 pointer-events-none">
                  <div className="absolute top-2 right-0 w-8 h-px bg-white/30" />
                  <div className="absolute top-0 right-2 w-px h-8 bg-white/30" />
                </div>
              </div>

              {/* Technical label below image */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="mt-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <RegistrationMark size={5} delay={0.8} />
                  <span className="text-[8px] md:text-[9px] font-mono text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">
                    Portrait
                  </span>
                </div>
                <span className="text-[8px] font-mono text-neutral-400 dark:text-neutral-600">
                  REF.2024
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            {/* Headline with word reveal - SAME SIZE AS PROJECTS HEADING */}
            <div ref={textRevealRef} className="overflow-hidden mb-4 md:mb-6">
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.15]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                <span className="word-reveal inline-block">Developer.</span>{' '}
                <span className="word-reveal inline-block">Designer.</span>{' '}
                <span className="word-reveal inline-block text-neutral-400 dark:text-neutral-600">Problem Solver.</span>
              </h2>
            </div>
            
            {/* Expanding line */}
            <div 
              ref={lineRef}
              className="w-full h-px bg-neutral-200 dark:bg-neutral-800 mb-5 md:mb-6 origin-left"
            />

            {/* Description */}
            <p 
              className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              I specialize in transforming complex challenges into elegant, 
              high-performance solutions. With a focus on modern web technologies 
              and clean architecture, I build applications that users love.
            </p>

            {/* Elegant Inline Skills Display */}
            <div ref={skillsRef} className="mb-8">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category} className="flex items-center gap-3 mb-3 last:mb-0">
                  {/* Category label */}
                  <span className="skill-item text-[10px] md:text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider w-16 md:w-20 shrink-0">
                    {skillGroup.category}
                  </span>
                  
                  {/* Separator */}
                  <span className="skill-item w-4 h-px bg-neutral-300 dark:bg-neutral-700" />
                  
                  {/* Skills */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className="skill-item inline-flex items-center text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600 mr-2" />
                        {skill}
                        {skillIndex < skillGroup.items.length - 1 && (
                          <span className="ml-2 text-neutral-300 dark:text-neutral-700">/</span>
                        )}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA with Liquid Metal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex items-center gap-4"
            >
              <LiquidMetalButton
                href="/cv.pdf"
                variant="primary"
                icon={<ArrowRight size={16} />}
              >
                View Resume
              </LiquidMetalButton>

              {/* Technical annotation */}
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.2 }}
                className="hidden md:flex items-center gap-2 text-[9px] font-mono text-neutral-400 dark:text-neutral-600 tracking-wider"
              >
                <RegistrationMark size={5} delay={1.2} />
                <span>PDF • 2 Pages</span>
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
