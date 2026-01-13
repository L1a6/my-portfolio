export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="flex flex-col items-center gap-8 max-w-4xl">
        <h1 className="text-5xl font-bold text-center">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-400">
          Built with Next.js, TypeScript, and Tailwind CSS
        </p>
        <div className="flex gap-4">
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-opacity"
          >
            Read Docs
          </a>
        </div>
      </main>
    </div>
  );
}
