import Link from "next/link";

export default function Header() {
    return(
    <header className="flex justify-between items-center px-8 py-5 border-b border-[#1E293B]">
        <Link href="/" className="text-2xl font-poppins font-semibold text-[#6366F1]">
          Model<span className="text-[#38BDF8]"> Maker</span>
        </Link>
        <nav className="space-x-6 text-[#94A3B8] text-sm">
          <Link href="/modelGen" className="hover:text-white transition-colors">Model Gen</Link>
          <Link href="modelLib" className="hover:text-white transition-colors">Model Library</Link>
          <Link href="/signIn" className="hover:text-white transition-colors">Sign In</Link>
        </nav>
      </header>
    )
}