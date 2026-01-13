'use client';

import { heroConfig, skillComponents } from '@/config/Hero';
import { parseTemplate } from '@/lib/hero';
import Image from 'next/image';
import React from 'react';
import { ArrowRight } from 'lucide-react';

import Container from '@/components/common/Container';
import Skill from '@/components/common/Skill';
import LiquidMetalButton from '@/components/LiquidMetalButton';

export default function Hero() {
  const { name, title, avatar, status, skills, description, buttons } = heroConfig;

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
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-[#f8f6fa] dark:bg-zinc-950 transition-colors duration-500">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-150 h-150">
          <div className="absolute inset-0 bg-gradient-radial from-gray-200/60 via-transparent to-transparent dark:from-zinc-700/20 blur-3xl" />
        </div>
        <div className="absolute bottom-0 right-0 w-100 h-100">
          <div className="absolute inset-0 bg-gradient-radial from-gray-100/40 via-transparent to-transparent dark:from-zinc-800/10 blur-3xl" />
        </div>
      </div>

      {/* Page Boundaries - Thin vertical lines on large screens only, positioned further out */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-225 -translate-x-1/2 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-neutral-200/60 dark:bg-neutral-800/60"></div>
        <div className="absolute right-0 top-0 bottom-0 w-px bg-neutral-200/60 dark:bg-neutral-800/60"></div>
      </div>

      {/* Content - Mobile-first, tablet-like width on desktop */}
      <Container className="relative z-10 w-full md:w-3xl md:mx-auto px-6">
        {/* Profile Image with GitHub-style Status */}
        <div className="relative inline-block group">
          <Image
            src={avatar}
            alt="hero"
            width={120}
            height={120}
            className="size-30 rounded-full object-cover bg-[#b899c7] dark:bg-teal-700/40 shadow-lg"
          />
          
          {/* GitHub-style Status Button - Overlaps profile edge, expands RIGHT on hover */}
          <div className="absolute bottom-0 right-0 -translate-x-1 -translate-y-1">
            <div className="relative group/status">
              {/* Circle expands to pill on hover - expands to the RIGHT */}
              <div className="flex flex-row items-center w-4.5 h-4.5 rounded-full bg-neutral-300 dark:bg-neutral-600 border-[3px] border-white dark:border-zinc-950 transition-all duration-300 ease-out group-hover/status:w-auto group-hover/status:pr-3 cursor-default shadow-sm origin-left">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-600 dark:bg-neutral-400 shrink-0"></span>
                <span className="w-0 overflow-hidden whitespace-nowrap text-[11px] font-medium text-neutral-700 dark:text-neutral-200 transition-all duration-300 ease-out group-hover/status:w-auto group-hover/status:ml-1.5">
                  {status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Text Area */}
        <div className="mt-8 flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50" style={{ fontFamily: 'var(--font-inter)', letterSpacing: '-0.02em' }}>
            Hi, I&apos;m {name}
          </h1>
          <p className="text-2xl text-neutral-500 dark:text-neutral-400 font-semibold" style={{ fontFamily: 'var(--font-inter)', letterSpacing: '-0.01em' }}>
            {title}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400 md:text-base" style={{ fontFamily: 'var(--font-inter)' }}>
            {renderDescription()}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-4 flex-wrap">
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
      </Container>
    </section>
  );
}
