import Link from "next/link";

export default function About() {
  const features = [
    {
      title: "Side-by-Side Comparisons",
      description: "Compare multiple hospice providers at once with quality metrics, ratings, and services clearly displayed.",
      icon: "📊",
      color: "from-red-500 to-red-600"
    },
    {
      title: "Medicare Data Integration",
      description: "Real-time access to official CMS.gov Medicare hospice data.",
      icon: "🏥",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      title: "Geographic Search",
      description: "Find hospice providers by zip codes they serve, and take advantage of our advanced sorting options.",
      icon: "📍",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Quality Metrics",
      description: "View patient satisfaction scores, care quality indicators, and compliance ratings for informed decisions.",
      icon: "⭐",
      color: "from-blue-500 to-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
          Making Hospice Decisions
          <span className="block rainbow-text mt-2">Clearer & Easier</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          A platform that helps families compare hospice providers.
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 bg-white/5 rounded-lg my-12 border border-white/10">
        <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          We believe families deserve clear, accessible information when choosing hospice care. By transforming complex Medicare data into easy-to-understand comparisons, we empower patients and caregivers to make confident, informed decisions about end-of-life care.
        </p>
      </section>

      {/* Key Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">
          How We Help
        </h2>
        <div className="relative h-1 w-24 mx-auto mb-12">
          <div className="absolute inset-0 rainbow-bg rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/10 border border-white/20 rounded-lg p-8 hover:border-white/40 transition hover:bg-white/15"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{feature.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:rainbow-text transition">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 rounded-lg pointer-events-none transition duration-300 bg-gradient-to-r ${feature.color} blur-2xl -z-10`}></div>
            </div>
          ))}
        </div>
      </section>

      {/* The Problem Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 my-12">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">
          The Information Gap
        </h2>
        <div className="relative h-1 w-24 mx-auto mb-12">
          <div className="absolute inset-0 rainbow-bg rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* The Problem */}
          <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-lg p-8">
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">The Challenge</span>
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold mt-1">→</span>
                <span>Medicare.gov hospice tools are complex and hard to navigate</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold mt-1">→</span>
                <span>Families have few resources to find information about hospice options</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold mt-1">→</span>
                <span>Quality metrics are buried in technical databases</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold mt-1">→</span>
                <span>No easy way to compare providers side-by-side</span>
              </li>
            </ul>
          </div>

          {/* Our Solution */}
          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-lg p-8">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Our Solution</span>
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold mt-1">→</span>
                <span>User-friendly interface designed for families, not technicians</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold mt-1">→</span>
                <span>Clear, transparent comparisons of quality and services</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold mt-1">→</span>
                <span>Direct access to official Medicare data via CMS&apos;s datasets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold mt-1">→</span>
                <span>Decision making tools tailored to your specific needs</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">
          Why Choose Our Platform
        </h2>
        <div className="relative h-1 w-24 mx-auto mb-12">
          <div className="absolute inset-0 rainbow-bg rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Official Data", desc: "All information sourced directly from Medicare", color: "from-orange-500 to-red-500" },
            { title: "Always Up-to-Date", desc: "Real-time Medicare dataseti integration ensures current provider information", color: "from-pink-500 to-rose-500" },
            { title: "Family-Focused", desc: "Designed for patients and caregivers, not healthcare professionals", color: "from-fuchsia-500 to-purple-500" }
          ].map((benefit, idx) => (
            <div key={idx} className="bg-white/10 border border-white/20 rounded-lg p-6 hover:bg-white/15 transition">
              <div className={`inline-block p-3 rounded-lg bg-gradient-to-r ${benefit.color} mb-4`}>
                <span className="text-white text-2xl">✨</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-300 text-sm">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Find the Right Hospice?
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Start comparing hospice providers in your area using transparent Medicare data.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition"
          >
            Search Hospices
          </Link>
          <Link
            href="/auth/login"
            className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition"
          >
            For hospice accounts, click here to sign in
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20 py-12 text-center text-gray-400">
        <p>&copy; 2025 Hospice Comparison Platform. Empowering families with transparent Medicare data.</p>
      </footer>
    </div>
  );
}
