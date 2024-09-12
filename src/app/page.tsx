import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]  bg-center bg-no-repeat">
      <header className="flex items-center justify-between px-4 py-3 sm:px-6 md:py-4  backdrop-blur-sm backdrop-opacity-10">
        <Link
          href="#"
          className="font-bold text-black text-xl"
          prefetch={false}
        >
          BookNest
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={"/login"}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Login
          </Link>
          <Link
            href={"/signup"}
            className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Signup
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12 bg-white backdrop-opacity-10 backdrop-blur-lg sm:px-6 md:py-16">
        <div className="max-w-2xl text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Discover the Joy of Reading
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Explore our vast collection of books and unlock a world of knowledge
            and imagination.
          </p>
          <Link
            href={"/signup"}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
}
