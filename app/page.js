import Link from "next/link";

export default function LandingPage() {
  const date = new Date();
  return (
    <div className="min-h-screen">
      <header className="flex text-2xl font-semibold">
        <h1>Model Maker</h1>
        <nav className="">
          <Link href="/modelLib" className="mr-4">Model Library</Link>
          <Link href="/modelGen" className="mr-4">Model Generation</Link>
          <Link href="/signIn" className="mr-4">Sign In</Link>
        </nav>
      </header>

      <footer className="text-center">
        <p>© {date.getFullYear()} Model Maker</p>
      </footer>
    </div>
  );
}
