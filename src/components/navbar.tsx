'use client';

import React, { useState, useEffect } from 'react';
import { Home, Lightbulb, FolderGit2, BookOpen, Mail, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

export default function FrostedNavbar() {
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', href: '/' },
    { id: 'skills', icon: Lightbulb, label: 'Skills', href: '/skills' },
    { id: 'project', icon: FolderGit2, label: 'Project', href: '/#projects' },
    { id: 'blogs', icon: BookOpen, label: 'Blogs', href: '/blogs' },
    { id: 'contact', icon: Mail, label: 'Contact', href: '/#contact' },
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-500 ease-out
        ${scrolled ? 'py-3' : 'py-6'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative flex items-center justify-center">
          {/* Liquid Glass Navbar - Apple Style */}
          <div 
            className={`
              relative rounded-full px-3 py-2.5
              transition-all duration-500
              ${isDark 
                ? 'bg-white/8 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_0_0_1px_rgba(255,255,255,0.05)]' 
                : 'bg-white/70 backdrop-blur-2xl border border-white/90 shadow-[0_8px_32px_rgba(31,38,135,0.08),inset_0_0_0_1px_rgba(255,255,255,0.9)]'
              }
              ${scrolled 
                ? isDark 
                  ? 'shadow-[0_16px_48px_rgba(0,0,0,0.5)]' 
                  : 'shadow-[0_16px_48px_rgba(31,38,135,0.12)]' 
                : ''
              }
            `}
          >
            <div className="relative flex items-center gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isHovered = activeNav === item.id;
                const isActive = isActiveRoute(item.href);
                
                return (
                  <div key={item.id} className="relative">
                    <Link
                      href={item.href}
                      onMouseEnter={() => setActiveNav(item.id)}
                      onMouseLeave={() => setActiveNav(null)}
                      className={`
                        group relative flex items-center justify-center p-2.5 rounded-full
                        transition-all duration-300 ease-out
                        ${isDark ? 'text-gray-200' : 'text-gray-600'}
                        ${isActive || isHovered
                          ? isDark 
                            ? 'bg-white/20 text-white shadow-lg' 
                            : 'bg-white text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
                          : isDark 
                            ? 'hover:bg-white/10' 
                            : 'hover:bg-white/80'
                        }
                      `}
                      style={{
                        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                      }}
                    >
                      <Icon 
                        size={18} 
                        className={`transition-all duration-300 ${isHovered || isActive ? 'scale-110' : 'group-hover:scale-105'}`}
                        strokeWidth={2.5}
                      />
                    </Link>

                    {/* Floating label tooltip */}
                    <div 
                      className={`
                        absolute -bottom-12 left-1/2 -translate-x-1/2
                        px-3 py-1.5 rounded-lg
                        ${isDark 
                          ? 'bg-zinc-800/95 text-white border border-zinc-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
                          : 'bg-white text-gray-800 border border-gray-100 shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
                        }
                        backdrop-blur-xl
                        transition-all duration-300 ease-out pointer-events-none
                        ${isHovered
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-2'
                        }
                      `}
                    >
                      <span className="whitespace-nowrap font-semibold text-xs tracking-tight">
                        {item.label}
                      </span>
                      {/* Arrow */}
                      <div 
                        className={`
                          absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45
                          ${isDark 
                            ? 'bg-zinc-800/95 border-l border-t border-zinc-700/50' 
                            : 'bg-white border-l border-t border-gray-100'
                          }
                        `}
                      />
                    </div>
                  </div>
                );
              })}

              {/* Separator */}
              <div className="relative mx-1 flex items-center justify-center h-7 w-[1.5px]">
                <div 
                  className={`
                    absolute inset-0 rounded-full 
                    ${isDark 
                      ? 'bg-linear-to-b from-transparent via-white/30 to-transparent' 
                      : 'bg-linear-to-b from-transparent via-gray-300/60 to-transparent'
                    }
                  `} 
                />
              </div>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={`
                  relative p-2.5 rounded-full transition-all duration-300
                  ${isDark 
                    ? 'bg-linear-to-br from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 text-indigo-200' 
                    : 'bg-linear-to-br from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 text-amber-600'
                  }
                  hover:shadow-lg
                  active:scale-95 hover:scale-105
                `}
              >
                <div className="relative w-4 h-4">
                  <Sun 
                    size={16} 
                    strokeWidth={2.5}
                    className={`absolute inset-0 transition-all duration-500 ${isDark ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'}`}
                  />
                  <Moon 
                    size={16} 
                    strokeWidth={2.5}
                    className={`absolute inset-0 transition-all duration-500 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-50'}`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Depth shadow */}
          <div 
            className={`
              absolute -bottom-2 left-4 right-4 h-6
              ${isDark ? 'bg-black/30' : 'bg-gray-400/20'}
              rounded-full blur-xl -z-10
              transition-opacity duration-500
              ${scrolled ? 'opacity-100' : 'opacity-60'}
            `}
          />
        </div>
      </div>
    </nav>
  );
}
