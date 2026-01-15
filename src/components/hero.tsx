'use client';

import { useEffect, useRef } from 'react';
import { heroConfig, skillComponents } from '@/config/Hero';
import { parseTemplate } from '@/lib/hero';
import Image from 'next/image';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Container from '@/components/common/Container';
import Skill from '@/components/common/Skill';
import LiquidMetalButton from '@/components/LiquidMetalButton';
import { PageBoundaries, SectionLabel, CropMark, RegistrationMark } from '@/components/ui/TechnicalMarks';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { name, title, avatar, status, skills, description, buttons } = heroConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Avatar entrance
      if (avatarRef.current) {
        gsap.fromTo(
          avatarRef.current,
          { opacity: 0, scale: 0.8, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.3 }
        );
      }

      // Heading word reveal - same as About section
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.word-reveal');
        gsap.fromTo(
          words,
          { y: '100%', opacity: 0 },
          { 
            y: '0%', 
            opacity: 1, 
            duration: 0.8, 
            stagger: 0.08, 
            ease: 'power3.out', 
            delay: 0.5 
          }
        );
      }

      // Line expand - same as About section
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: 'power3.inOut', delay: 0.9 }
        );
      }

      // Description fade
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.1 }
        );
      }

      // Buttons entrance
      if (buttonsRef.current) {
        gsap.fromTo(
          buttonsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.3 }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderDescription = () => {
    const parts = parseTemplate(description.template, skills);

    return parts.map((part) => {
      if (part.type === 'skill' && 'skill' in part && part.skill) {
        const SkillComponent =
          skillComponents[part.skill.component as keyof typeof skillComponents];
        return (
          <Skill key={part.key} name={part.skill.name} href={part.skill.href}>
            <SkillComponent />
          </Skill>
        );
      } else if (part.type === 'bold' && 'text' in part) {
        return (
          <b key={part.key} className="text-neutral-900 dark:text-neutral-100">
            {part.text}
          </b>
        );
      } else if (part.type === 'text' && 'text' in part) {
        return (
          <span key={part.key}>
            {part.text}
          </span>
        );
      }
      return null;
    });
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen pt-28 md:pt-32 pb-8 md:pb-12 overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-500">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.04]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Page Boundaries with registration marks */}
      <PageBoundaries />

      {/* Decorative crop marks in corners */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-225 -translate-x-1/2 pointer-events-none">
        <CropMark position="top-left" size={24} className="top-20 left-4" delay={0.3} />
        <CropMark position="top-right" size={24} className="top-20 right-4" delay={0.35} />
        <CropMark position="bottom-left" size={24} className="bottom-4 left-4" delay={0.4} />
        <CropMark position="bottom-right" size={24} className="bottom-4 right-4" delay={0.45} />
      </div>

      {/* Content */}
      <Container className="relative z-10 w-full md:w-3xl md:mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 md:mb-8"
        >
          <SectionLabel number="01">Introduction</SectionLabel>
        </motion.div>

        {/* Profile Image with Technical Frame */}
        <div ref={avatarRef} className="relative inline-block mb-8">
          {/* Technical frame around avatar */}
          <div className="relative">
            <CropMark position="top-left" size={14} className="-top-2.5 -left-2.5" delay={0.5} />
            <CropMark position="top-right" size={14} className="-top-2.5 -right-2.5" delay={0.55} />
            <CropMark position="bottom-left" size={14} className="-bottom-2.5 -left-2.5" delay={0.6} />
            <CropMark position="bottom-right" size={14} className="-bottom-2.5 -right-2.5" delay={0.65} />
            
            <Image
              src={avatar}
              alt="hero"
              width={100}
              height={100}
              className="size-20 md:size-28 rounded-full object-cover bg-[#b899c7] dark:bg-teal-700/40 ring-2 ring-neutral-200/50 dark:ring-neutral-800/50"
            />
          </div>
          
          {/* GitHub-style Status - CIRCULAR, expands RIGHT */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
            className="absolute -bottom-1 -right-1"
          >
            <div className="relative group/status">
              <div className="flex flex-row items-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-white dark:bg-zinc-900 border-2 border-white dark:border-zinc-950 shadow-md transition-all duration-300 ease-out group-hover/status:w-auto group-hover/status:px-2.5 group-hover/status:rounded-full cursor-default origin-left">
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500 shrink-0 animate-pulse"></span>
                <span className="w-0 overflow-hidden whitespace-nowrap text-[10px] md:text-[11px] font-medium text-neutral-700 dark:text-neutral-300 transition-all duration-300 ease-out group-hover/status:w-auto group-hover/status:ml-1.5">
                  {status}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Heading with Word Reveal - SAME STYLE AS ABOUT SECTION */}
        <div ref={headingRef} className="overflow-hidden mb-4 md:mb-6">
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.15]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            <span className="word-reveal inline-block">Hi,</span>{' '}
            <span className="word-reveal inline-block">I&apos;m</span>{' '}
            <span className="word-reveal inline-block">{name}.</span>{' '}
            <span className="word-reveal inline-block text-neutral-400 dark:text-neutral-600">{title}.</span>
          </h1>
        </div>

        {/* Expanding line - same as About section */}
        <div 
          ref={lineRef}
          className="w-full h-px bg-neutral-200 dark:bg-neutral-800 mb-5 md:mb-6 origin-left"
        />

        {/* Description */}
        <div 
          ref={descRef}
          className="flex flex-wrap items-center gap-x-1.5 gap-y-2 text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-6 md:mb-8" 
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {renderDescription()}
        </div>

        {/* Buttons */}
        <div ref={buttonsRef} className="flex gap-3 md:gap-4 flex-wrap">
          {buttons.map((button, index) => (
            <LiquidMetalButton
              key={index}
              href={button.href}
              variant={button.variant as 'primary' | 'available'}
              icon={button.variant === 'primary' ? <ArrowRight size={18} /> : undefined}
            >
              {button.text}
            </LiquidMetalButton>
          ))}
        </div>

        {/* Technical annotation at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-10 md:mt-14 flex items-center gap-3"
        >
          <RegistrationMark size={8} delay={1.5} />
          <span className="text-[9px] md:text-[10px] font-mono text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">
            Scroll to explore
          </span>
          <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
        </motion.div>
      </Container>
    </section>
  );
}
