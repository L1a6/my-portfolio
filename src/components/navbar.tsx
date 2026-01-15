'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Home, Lightbulb, FolderGit2, BookOpen, Mail, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

export default function FrostedNavbar() {
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.2
      });
    }
    if (logoRef.current) {
      gsap.from(logoRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        delay: 0.4
      });
    }
  }, []);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', href: '/' },
    { id: 'skills', icon: Lightbulb, label: 'Skills', href: '/skills' },
    { id: 'project', icon: FolderGit2, label: 'Work', href: '/#projects' },
    { id: 'blogs', icon: BookOpen, label: 'Blog', href: '/blogs' },
    { id: 'contact', icon: Mail, label: 'Contact', href: '/#contact' },
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <motion.nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        scrolled ? 'py-2 md:py-3' : 'py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="relative flex items-center justify-between md:justify-center gap-4">
          {/* Logo/Wordmark - Left aligned on mobile, hidden on desktop center nav */}
          <motion.div 
            ref={logoRef}
            className="md:absolute md:left-0 flex items-center gap-2"
          >
            {/* Technical registration mark */}
            <div className="hidden md:flex items-center justify-center w-8 h-8 border border-neutral-200 dark:border-neutral-800">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-neutral-400 dark:text-neutral-600">
                <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="0.75" />
                <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="0.75" />
                <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="0.75" fill="none" />
              </svg>
            </div>
            <span 
              className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight hidden md:block"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Portfolio
            </span>
          </motion.div>

          {/* Center Navigation */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`
              relative rounded-full px-1.5 md:px-2 py-1.5 md:py-2
              transition-all duration-700 ease-out
              ${isDark 
                ? 'bg-neutral-900/80 backdrop-blur-2xl border border-neutral-800' 
                : 'bg-white/80 backdrop-blur-2xl border border-neutral-200'
              }
              ${scrolled 
                ? 'shadow-lg' 
                : 'shadow-md'
              }
            `}
          >
            {/* Liquid metal edge effect - subtle */}
            <div 
              className="absolute inset-0 rounded-full opacity-50 pointer-events-none"
              style={{
                background: isDark 
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)'
                  : 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, transparent 50%, rgba(0,0,0,0.01) 100%)',
              }}
            />

            <div className="relative flex items-center gap-0.5">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isHovered = activeNav === item.id;
                const isActive = isActiveRoute(item.href);
                
                return (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      onMouseEnter={() => setActiveNav(item.id)}
                      onMouseLeave={() => setActiveNav(null)}
                      className="relative group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
                          flex items-center justify-center p-2 md:p-2.5 rounded-full
                          transition-all duration-300 ease-out relative overflow-hidden
                          ${isDark ? 'text-neutral-400' : 'text-neutral-600'}
                          ${isActive || isHovered
                            ? isDark 
                              ? 'bg-white/10 text-white' 
                              : 'bg-neutral-900/5 text-neutral-900'
                            : isDark 
                              ? 'hover:bg-white/5' 
                              : 'hover:bg-neutral-900/3'
                          }
                        `}
                      >
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              layoutId="activeNavBg"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className={`absolute inset-0 rounded-full ${
                                isDark 
                                  ? 'bg-white/10' 
                                  : 'bg-neutral-900/5'
                              }`}
                            />
                          )}
                        </AnimatePresence>
                        
                        <Icon 
                          size={16}
                          className="relative z-10 transition-transform duration-300"
                          strokeWidth={2}
                        />
                      </motion.div>

                      {/* Tooltip */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
                          >
                            <div className={`
                              px-2.5 py-1 text-[10px] font-medium tracking-wide
                              ${isDark 
                                ? 'bg-white text-neutral-900' 
                                : 'bg-neutral-900 text-white'
                              }
                            `}
                            style={{ fontFamily: 'var(--font-inter)' }}
                            >
                              {item.label}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Divider */}
              <div className="mx-1 md:mx-2 w-px h-5 bg-neutral-200 dark:bg-neutral-800" />

              {/* Theme Toggle */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`
                  p-2 md:p-2.5 rounded-full transition-all duration-300
                  ${isDark 
                    ? 'text-neutral-400 hover:bg-white/5 hover:text-white' 
                    : 'text-neutral-600 hover:bg-neutral-900/5 hover:text-neutral-900'
                  }
                `}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun size={16} strokeWidth={2} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon size={16} strokeWidth={2} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>

          {/* Right side - Version/Status */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="hidden md:absolute md:right-0 md:flex items-center gap-3"
          >
            <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600 tracking-wider">
              v1.0
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-500 uppercase tracking-wider">
                Live
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
