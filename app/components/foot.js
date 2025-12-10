
export default function Footer() {
    const date = () => new Date();
    return(
    <footer className="text-center py-6 text-[#94A3B8] text-sm border-t border-[#1E293B]">
        © {date().getFullYear()} ModelGen — Built for Web Developers.
      </footer>
    )
}