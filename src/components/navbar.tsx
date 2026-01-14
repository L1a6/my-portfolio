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
      <div className="max-w-7xl mx-auto px-3 md:px-4">
        <div className="relative flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`
              relative rounded-full px-2 md:px-3 py-2 md:py-2.5
              transition-all duration-700 ease-out
              ${isDark 
                ? 'bg-black/40 backdrop-blur-3xl border border-white/10' 
                : 'bg-white/60 backdrop-blur-3xl border border-black/5'
              }
              ${scrolled 
                ? isDark 
                  ? 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]' 
                  : 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]'
                : isDark 
                  ? 'shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]'
                  : 'shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)]'
              }
            `}
          >
            <div className="relative flex items-center gap-0.5 md:gap-1">
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
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
                          flex items-center justify-center p-2 md:p-2.5 rounded-full
                          transition-all duration-500 ease-out relative overflow-hidden
                          ${isDark ? 'text-neutral-300' : 'text-neutral-600'}
                          ${isActive || isHovered
                            ? isDark 
                              ? 'bg-white/15 text-white' 
                              : 'bg-black/8 text-black'
                            : isDark 
                              ? 'hover:bg-white/8' 
                              : 'hover:bg-black/4'
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
                                  ? 'bg-gradient-to-br from-white/20 to-white/10' 
                                  : 'bg-gradient-to-br from-black/10 to-black/5'
                              }`}
                            />
                          )}
                        </AnimatePresence>
                        
                        <Icon 
                          size={16}
                          className={`relative z-10 transition-all duration-300 ${
                            isHovered || isActive ? 'scale-110' : ''
                          }`}
                          strokeWidth={2.5}
                        />
                      </motion.div>

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
                              px-2.5 py-1 rounded-full text-[10px] font-medium
                              ${isDark 
                                ? 'bg-white/10 text-white border border-white/20 backdrop-blur-xl' 
                                : 'bg-black/80 text-white border border-black/10 backdrop-blur-xl'
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

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="ml-1 md:ml-2 pl-1 md:pl-2 border-l border-neutral-300/20 dark:border-neutral-700/40"
              >
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 180 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTheme}
                  className={`
                    p-2 md:p-2.5 rounded-full transition-all duration-500
                    ${isDark 
                      ? 'bg-white/10 text-yellow-300 hover:bg-white/15' 
                      : 'bg-black/5 text-neutral-700 hover:bg-black/10'
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
                        <Sun size={16} strokeWidth={2.5} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Moon size={16} strokeWidth={2.5} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
