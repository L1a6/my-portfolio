'use client';

import React from 'react';
import Link from 'next/link';

interface LiquidMetalButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: 'primary' | 'available';
  className?: string;
}

export default function LiquidMetalButton({
  children,
  href,
  onClick,
  icon,
  variant = 'primary',
  className = '',
}: LiquidMetalButtonProps) {
  
  // Available button - professional secondary style
  if (variant === 'available') {
    const availableContent = (
      <>
        <span className="available-indicator" />
        <span className="available-text">{children}</span>
      </>
    );

    return (
      <>
        <style jsx global>{`
          .available-btn {
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.625rem 1.5rem;
            font-weight: 600;
            font-size: 0.875rem;
            color: #18181b;
            background: #ffffff;
            border: 1.5px solid #e5e5e5;
            border-radius: 9999px;
            cursor: default;
            transition: all 0.3s ease;
            text-decoration: none;
            pointer-events: none;
          }

          .dark .available-btn {
            color: #fafafa;
            background: #27272a;
            border-color: #52525b;
          }

          .available-btn:hover {
            transform: none;
            box-shadow: none;
            border-color: #e5e5e5;
            background: #ffffff;
          }

          .dark .available-btn:hover {
            box-shadow: none;
            border-color: #52525b;
            background: #27272a;
          }

          .available-btn:active {
            transform: none;
          }

          .available-indicator {
            position: relative;
            width: 8px;
            height: 8px;
            background: #22c55e;
            border-radius: 50%;
            flex-shrink: 0;
            box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
          }

          .dark .available-indicator {
            box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.15);
          }

          .available-text {
            position: relative;
            z-index: 1;
          }
        `}</style>
        {href ? (
          <Link href={href} className={`available-btn ${className}`}>
            {availableContent}
          </Link>
        ) : (
          <button onClick={onClick} className={`available-btn ${className}`}>
            {availableContent}
          </button>
        )}
      </>
    );
  }

  // Primary button with liquid metal edge effect
  const primaryContent = (
    <>
      <span className="liquid-btn-text">{children}</span>
      {icon && <span className="liquid-btn-icon">{icon}</span>}
    </>
  );

  return (
    <>
      <style jsx global>{`
        @property --angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        .liquid-metal-btn {
          --border-width: 2px;
          
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.625rem 1.5rem;
          font-weight: 600;
          font-size: 0.875rem;
          color: #18181b;
          background: linear-gradient(135deg, #ffffff 0%, #f4f4f5 100%);
          border-radius: 9999px;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          isolation: isolate;
          border: none;
        }

        .dark .liquid-metal-btn {
          color: #fafafa;
          background: linear-gradient(135deg, #27272a 0%, #3f3f46 100%);
        }

        /* Liquid metal animated border */
        .liquid-metal-btn::before {
          content: '';
          position: absolute;
          inset: calc(-1 * var(--border-width));
          border-radius: inherit;
          padding: var(--border-width);
          background: conic-gradient(
            from var(--angle),
            #d4d4d8 0%,
            #fafafa 10%,
            #a1a1aa 20%,
            #52525b 35%,
            #18181b 50%,
            #3f3f46 60%,
            #71717a 75%,
            #e4e4e7 85%,
            #d4d4d8 100%
          );
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: rotate-border 4s linear infinite;
          z-index: -1;
        }

        /* Outer glow layer for depth */
        .liquid-metal-btn::after {
          content: '';
          position: absolute;
          inset: calc(-1 * var(--border-width) - 1px);
          border-radius: inherit;
          padding: calc(var(--border-width) + 1px);
          background: conic-gradient(
            from calc(var(--angle) + 180deg),
            rgba(250, 250, 250, 0.3) 0%,
            rgba(161, 161, 170, 0.1) 25%,
            rgba(24, 24, 27, 0.05) 50%,
            rgba(113, 113, 122, 0.2) 75%,
            rgba(250, 250, 250, 0.3) 100%
          );
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: rotate-border 4s linear infinite reverse;
          filter: blur(3px);
          z-index: -2;
        }

        .dark .liquid-metal-btn::before {
          background: conic-gradient(
            from var(--angle),
            #a1a1aa 0%,
            #e4e4e7 10%,
            #71717a 20%,
            #3f3f46 35%,
            #27272a 50%,
            #52525b 60%,
            #a1a1aa 75%,
            #d4d4d8 85%,
            #a1a1aa 100%
          );
        }

        .dark .liquid-metal-btn::after {
          background: conic-gradient(
            from calc(var(--angle) + 180deg),
            rgba(228, 228, 231, 0.4) 0%,
            rgba(113, 113, 122, 0.15) 25%,
            rgba(39, 39, 42, 0.05) 50%,
            rgba(161, 161, 170, 0.25) 75%,
            rgba(228, 228, 231, 0.4) 100%
          );
        }

        .liquid-metal-btn:hover {
          transform: translateY(-3px);
          box-shadow: 
            0 10px 40px rgba(0, 0, 0, 0.3),
            0 0 20px rgba(161, 161, 170, 0.2);
        }

        .dark .liquid-metal-btn:hover {
          box-shadow: 
            0 10px 40px rgba(0, 0, 0, 0.5),
            0 0 30px rgba(161, 161, 170, 0.15);
        }

        .liquid-metal-btn:active {
          transform: translateY(-1px);
        }

        .liquid-btn-text {
          position: relative;
          z-index: 1;
        }

        .liquid-btn-icon {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          transition: transform 0.3s ease;
        }

        .liquid-metal-btn:hover .liquid-btn-icon {
          transform: translateX(4px);
        }

        @keyframes rotate-border {
          from {
            --angle: 0deg;
          }
          to {
            --angle: 360deg;
          }
        }
      `}</style>
      {href ? (
        <Link href={href} className={`liquid-metal-btn ${className}`}>
          {primaryContent}
        </Link>
      ) : (
        <button onClick={onClick} className={`liquid-metal-btn ${className}`}>
          {primaryContent}
        </button>
      )}
    </>
  );
}
