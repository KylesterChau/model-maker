import Header from "./components/head";
import Footer from "./components/foot";
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-inter">
      <Header />
      <section className="text-center py-24 px-6">
        <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
          Generate Web Models Instantly
        </h2>
        <p className="text-[#94A3B8] max-w-2xl mx-auto mb-8">
          Build, customize, and deploy data models for your web apps in seconds — powered by AI.
        </p>
        <button className="bg-[#6366F1] hover:bg-[#4F46E5] px-6 py-3 rounded-xl font-semibold">
          Get Started
        </button>
      </section>

      <section id="features" className="grid md:grid-cols-3 gap-8 px-8 md:px-16 py-20 bg-[#1E293B]">
        {[
          {
            title: "Fast Model Generation",
            desc: "Create clean and optimized web models in just a few clicks.",
          },
          {
            title: "Developer Friendly",
            desc: "Export ready-to-use code for React, Next.js, or Node.js.",
          },
          {
            title: "Secure & Reliable",
            desc: "Your models and data stay private and encrypted.",
          },
        ].map((item, i) => (
          <div key={i} className="p-6 border border-[#334155] rounded-2xl hover:border-[#6366F1] transition-all">
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-[#94A3B8]">{item.desc}</p>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
