import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/navbar";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Larry David - Full-Stack Developer Portfolio",
  description: "Medical professional turned full-stack developer specializing in Next.js, React, TypeScript, and PostgreSQL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-white dark:bg-zinc-950 text-neutral-900 dark:text-neutral-50 transition-colors duration-500">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
