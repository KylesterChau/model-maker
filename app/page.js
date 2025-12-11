import Header from "./components/head";
import Footer from "./components/foot";
export default function LandingPage() {
  const features = [
          {
            title: "Fast Model Generation",
            desc: "Create clean and optimized web models in just a few clicks.",
          },
          {
            title: "Secure & Reliable",
            desc: "Your models and data stay private and encrypted.",
          },
        ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-inter">
      <Header />

      <section className="text-center py-24 px-6">
        <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
          Generate Web Models Instantly
        </h2>
      </section>

      <section
        id="features"
        className="flex flex-wrap justify-center gap-8 px-8 md:px-16 py-20 bg-[#1E293B]"
      >
        {features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            className="p-6 border border-[#334155] rounded-2xl hover:border-[#6366F1] transition-all w-full sm:w-[300px] text-center"
          >
            <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
            <p className="text-[#94A3B8]">{feature.desc}</p>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
