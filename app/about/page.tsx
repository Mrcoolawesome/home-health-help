import Link from "next/link";

export default function About() {
  const features = [
    {
      title: "Physician Profiles",
      description: "Doctors can create accounts, specify medical specialties, and indicate their interest in providing hospice referrals.",
      icon: "👨‍⚕️",
      color: "from-red-500 to-red-600"
    },
    {
      title: "Provider Network",
      description: "Hospice home health providers showcase their services and availability to connect with interested physicians.",
      icon: "🏥",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      title: "Direct Communication",
      description: "Physicians can include contact information links for direct communication, maintaining HIPAA compliance.",
      icon: "💬",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Referral Workflow",
      description: "Streamlined process for physicians to connect patients with appropriate hospice care services.",
      icon: "🔗",
      color: "from-blue-500 to-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
          Connecting Care
          <span className="block rainbow-text mt-2">With Purpose</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          A physician-hospice referral network platform designed to streamline the process of connecting patients with quality hospice care.
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 bg-white/5 rounded-lg my-12 border border-white/10">
        <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          We believe every patient deserves access to compassionate hospice care. By bridging the gap between physicians and home health providers, we empower doctors to make informed referrals and help patients transition to end-of-life care with dignity and comfort.
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

      {/* Two User Types Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 my-12">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">
          Built for Two Communities
        </h2>
        <div className="relative h-1 w-24 mx-auto mb-12">
          <div className="absolute inset-0 rainbow-bg rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Physician View */}
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg p-8">
            <div className="text-5xl mb-4">👨‍⚕️</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Physician Dashboard</span>
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold mt-1">→</span>
                <span>Manage professional profile and specialties</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold mt-1">→</span>
                <span>Update referral status and preferences</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold mt-1">→</span>
                <span>Connect with hospice home health providers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold mt-1">→</span>
                <span>Maintain contact information for direct communication</span>
              </li>
            </ul>
          </div>

          {/* Home Health Provider View */}
          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-lg p-8">
            <div className="text-5xl mb-4">🏥</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Provider Search</span>
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold mt-1">→</span>
                <span>Search physicians by location and specialty</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold mt-1">→</span>
                <span>Filter physicians actively seeking referral partners</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold mt-1">→</span>
                <span>View detailed physician profiles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold mt-1">→</span>
                <span>Establish partnerships for patient referrals</span>
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
            { title: "HIPAA Compliant", desc: "Secure communication through external contact channels", color: "from-orange-500 to-red-500" },
            { title: "Easy to Use", desc: "Intuitive interface designed for busy healthcare professionals", color: "from-pink-500 to-rose-500" },
            { title: "Efficient Matching", desc: "Smart search to connect the right physicians with providers", color: "from-fuchsia-500 to-purple-500" }
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
          Ready to Make a Difference?
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Join our community of healthcare professionals dedicated to improving end-of-life care.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/sign-up"
            className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition"
          >
            Get Started
          </Link>
          <Link
            href="/"
            className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition"
          >
            Explore Physicians
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20 py-12 text-center text-gray-400">
        <p>&copy; 2024 Find Referrals. Connecting physicians with hospice care providers.</p>
      </footer>
    </div>
  );
}
