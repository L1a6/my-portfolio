'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CropMarkProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
  className?: string;
  delay?: number;
}

export function CropMark({ position, size = 24, className = '', delay = 0 }: CropMarkProps) {
  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0';
      case 'top-right':
        return 'top-0 right-0';
      case 'bottom-left':
        return 'bottom-0 left-0';
      case 'bottom-right':
        return 'bottom-0 right-0';
    }
  };

  const getRotation = () => {
    switch (position) {
      case 'top-left':
        return 0;
      case 'top-right':
        return 90;
      case 'bottom-left':
        return -90;
      case 'bottom-right':
        return 180;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute ${getPositionStyles()} pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        style={{ transform: `rotate(${getRotation()}deg)` }}
        className="text-neutral-300 dark:text-neutral-700"
      >
        <path
          d="M0 8V0H8"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}

interface RegistrationMarkProps {
  position?: 'center' | 'custom';
  size?: number;
  className?: string;
  delay?: number;
}

export function RegistrationMark({ 
  position = 'custom', 
  size = 12, 
  className = '', 
  delay = 0 
}: RegistrationMarkProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none ${position === 'center' ? 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 12 12"
        fill="none"
        className="text-neutral-300 dark:text-neutral-700"
      >
        {/* Crosshair */}
        <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="0.75" />
        <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="0.75" />
        {/* Circle */}
        <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="0.75" fill="none" />
      </svg>
    </motion.div>
  );
}

interface GridLineProps {
  orientation: 'horizontal' | 'vertical';
  position?: string;
  className?: string;
  delay?: number;
}

export function GridLine({ 
  orientation, 
  position = '', 
  className = '', 
  delay = 0 
}: GridLineProps) {
  return (
    <motion.div
      initial={{ scaleX: orientation === 'horizontal' ? 0 : 1, scaleY: orientation === 'vertical' ? 0 : 1 }}
      animate={{ scaleX: 1, scaleY: 1 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute pointer-events-none ${position} ${className} ${
        orientation === 'horizontal' 
          ? 'h-px w-full bg-neutral-200/50 dark:bg-neutral-800/50 origin-left' 
          : 'w-px h-full bg-neutral-200/50 dark:bg-neutral-800/50 origin-top'
      }`}
    />
  );
}

interface TechnicalFrameProps {
  children: React.ReactNode;
  className?: string;
  showCropMarks?: boolean;
  showRegistration?: boolean;
  cropMarkSize?: number;
  padding?: number;
}

export function TechnicalFrame({ 
  children, 
  className = '',
  showCropMarks = true,
  showRegistration = false,
  cropMarkSize = 20,
  padding = 16,
}: TechnicalFrameProps) {
  return (
    <div className={`relative ${className}`} style={{ padding }}>
      {showCropMarks && (
        <>
          <CropMark position="top-left" size={cropMarkSize} delay={0.1} />
          <CropMark position="top-right" size={cropMarkSize} delay={0.15} />
          <CropMark position="bottom-left" size={cropMarkSize} delay={0.2} />
          <CropMark position="bottom-right" size={cropMarkSize} delay={0.25} />
        </>
      )}
      {showRegistration && (
        <RegistrationMark position="center" delay={0.3} />
      )}
      {children}
    </div>
  );
}

interface SectionLabelProps {
  children: React.ReactNode;
  number?: string;
  className?: string;
}

export function SectionLabel({ children, number, className = '' }: SectionLabelProps) {
  return (
    <div className={`inline-flex items-center gap-4 ${className}`}>
      {number && (
        <span 
          className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600 tracking-widest"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {number}
        </span>
      )}
      <div className="flex items-center gap-3">
        <RegistrationMark size={8} delay={0.1} />
        <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-500 uppercase tracking-[0.25em]">
          {children}
        </span>
        <div className="w-12 h-px bg-neutral-300 dark:bg-neutral-700" />
      </div>
    </div>
  );
}

// Page boundary lines with registration marks
export function PageBoundaries() {
  return (
    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-225 -translate-x-1/2 pointer-events-none z-0">
      {/* Left boundary */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-neutral-200/40 dark:bg-neutral-800/40" />
      {/* Right boundary */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-neutral-200/40 dark:bg-neutral-800/40" />
      
      {/* Top registration marks */}
      <RegistrationMark className="absolute left-0 top-8 -translate-x-1/2" size={10} delay={0.5} />
      <RegistrationMark className="absolute right-0 top-8 translate-x-1/2" size={10} delay={0.6} />
      
      {/* Bottom registration marks */}
      <RegistrationMark className="absolute left-0 bottom-8 -translate-x-1/2" size={10} delay={0.7} />
      <RegistrationMark className="absolute right-0 bottom-8 translate-x-1/2" size={10} delay={0.8} />
    </div>
  );
}
