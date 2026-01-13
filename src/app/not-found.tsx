import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-neutral-900 dark:text-neutral-100">404</h1>
        <h2 className="text-3xl font-semibold text-neutral-700 dark:text-neutral-300 mt-4">
          Page Not Found
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mt-4 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

