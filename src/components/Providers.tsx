'use client';

import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import FrostedNavbar from '@/components/navbar';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <FrostedNavbar />
      {children}
    </ThemeProvider>
  );
}
