'use client';

import React from 'react';

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
  href?: string;
}

export default function CTAButton({
  children,
  onClick,
  icon,
  iconPosition = 'right',
  variant = 'primary',
  className = '',
  disabled = false,
  href,
}: CTAButtonProps) {
  const baseClasses = `
    relative group cursor-pointer 
    px-8 py-4 
    font-semibold text-base
    overflow-hidden
    rounded-xl
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-3
    ${className}
  `;

  const content = (
    <>
      <style jsx>{`
        @property --gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes rotate-gradient {
          from {
            --gradient-angle: 0deg;
          }
          to {
            --gradient-angle: 360deg;
          }
        }

        @keyframes rotate-gradient-reverse {
          from {
            --gradient-angle: 360deg;
          }
          to {
            --gradient-angle: 0deg;
          }
        }

        .liquid-metal-border {
          --gradient-angle: 0deg;
          --border-width: 2px;
          
          /* Light theme metal colors */
          --metal-1-light: rgb(200 200 220);
          --metal-2-light: rgb(160 160 180);
          --metal-3-light: rgb(120 120 140);
          --metal-4-light: rgb(80 80 100);
          --metal-5-light: rgb(40 40 60);
          --metal-6-light: rgb(10 10 10);
          
          /* Dark theme metal colors */
          --metal-1-dark: rgb(220 220 240);
          --metal-2-dark: rgb(180 180 200);
          --metal-3-dark: rgb(140 140 160);
          --metal-4-dark: rgb(100 100 120);
          --metal-5-dark: rgb(60 60 80);
          --metal-6-dark: rgb(20 20 30);

          border: var(--border-width) solid transparent;
          background: 
            linear-gradient(135deg, 
              rgb(250 250 250) 0%, 
              rgb(230 230 235) 100%) padding-box,
            conic-gradient(
              from var(--gradient-angle),
              rgb(200 200 220 / 0.5),
              rgb(200 200 220 / 0),
              rgb(10 10 10 / 0),
              rgb(10 10 10 / 1),
              rgb(80 80 100 / 0.5),
              rgb(80 80 100 / 0),
              rgb(80 80 100 / 1),
              rgb(200 200 220 / 0.5)
            ) border-box;
          
          animation: rotate-gradient 12s linear infinite;
        }

        .dark .liquid-metal-border {
          background: 
            linear-gradient(135deg, 
              rgb(20 20 30) 0%, 
              rgb(40 40 55) 100%) padding-box,
            conic-gradient(
              from var(--gradient-angle),
              rgb(220 220 240 / 0.6),
              rgb(220 220 240 / 0),
              rgb(20 20 30 / 0),
              rgb(20 20 30 / 1),
              rgb(100 100 120 / 0.6),
              rgb(100 100 120 / 0),
              rgb(100 100 120 / 1),
              rgb(220 220 240 / 0.6)
            ) border-box;
        }

        .liquid-metal-border::before {
          content: '';
          position: absolute;
          inset: -2px;
          z-index: -1;
          border-radius: inherit;
          padding: 1px;
          background: conic-gradient(
            from var(--gradient-angle),
            rgb(120 120 140 / 1),
            rgb(200 200 220 / 1),
            rgb(200 200 220 / 1),
            rgb(10 10 10 / 1),
            rgb(160 160 180 / 1),
            rgb(40 40 60 / 1),
            rgb(80 80 100 / 1),
            rgb(120 120 140 / 1)
          );
          animation: rotate-gradient-reverse 8s linear infinite;
          border-radius: 0.75rem;
        }

        .dark .liquid-metal-border::before {
          background: conic-gradient(
            from var(--gradient-angle),
            rgb(140 140 160 / 1),
            rgb(220 220 240 / 1),
            rgb(220 220 240 / 1),
            rgb(20 20 30 / 1),
            rgb(180 180 200 / 1),
            rgb(60 60 80 / 1),
            rgb(100 100 120 / 1),
            rgb(140 140 160 / 1)
          );
        }

        .liquid-metal-border:hover {
          transform: translateY(-2px);
          filter: drop-shadow(0 10px 20px rgb(0 0 0 / 0.15));
        }

        .dark .liquid-metal-border:hover {
          filter: drop-shadow(0 10px 25px rgb(120 120 140 / 0.3));
        }

        .liquid-metal-border:active {
          transform: translateY(0px);
        }

        /* Text gradient for extra flair */
        .gradient-text {
          background: linear-gradient(135deg, rgb(20 20 30), rgb(60 60 80));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dark .gradient-text {
          background: linear-gradient(135deg, rgb(250 250 250), rgb(200 200 220));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {iconPosition === 'left' && icon && (
        <span className="transition-transform group-hover:scale-110">
          {icon}
        </span>
      )}

      <span className="gradient-text relative z-10">
        {children}
      </span>

      {iconPosition === 'right' && icon && (
        <span className="transition-transform group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} liquid-metal-border inline-flex`}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} liquid-metal-border`}
    >
      {content}
    </button>
  );
}
