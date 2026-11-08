import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header / Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-black/80 backdrop-blur-md">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight hover:text-zinc-300 transition-colors">
              SRGCA
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/work" className="hover:text-zinc-300 transition-colors hidden sm:inline">Work</Link>
              <Link href="#about" className="hover:text-zinc-300 transition-colors hidden sm:inline">About</Link>
              <Link href="#contact" className="hover:text-zinc-300 transition-colors">Contact</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
          <div className="container mx-auto max-w-5xl">
            <div className="animate-in space-y-8">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] break-words">
                Sergio Armando
              </h1>
              <div className="max-w-3xl space-y-4">
                <p className="text-xl sm:text-2xl md:text-3xl text-zinc-400 leading-relaxed">
                  Brand Strategy | E-Commerce | Digital Marketing | AI &amp; Automation
                </p>
                <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                  Building brands, developing digital commerce experiences, and connecting creative strategy with technology and data-driven business growth.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link 
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-zinc-100 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  Get in Touch
                </Link>
                <Link 
                  href="https://www.linkedin.com/in/sergio-a-01838b36" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-zinc-400 hover:text-zinc-100 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-colors"
                >
                  LinkedIn
                </Link>
              </div>
              <div className="flex flex-wrap gap-4 pt-2 text-sm text-zinc-500">
                <Link
                  href="/work"
                  className="hover:text-zinc-400 transition-colors"
                >
                  Work →
                </Link>
                <Link 
                  href="https://x.com/TheSRG_CA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-zinc-400 transition-colors"
                >
                  X →
                </Link>
                <Link 
                  href="mailto:Info@srgca.org"
                  className="hover:text-zinc-400 transition-colors"
                >
                  Email →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Current Projects */}
        <section id="now" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/50">
          <div className="container mx-auto max-w-5xl">
            <div className="space-y-8">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Current Projects</h2>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-semibold">AI Agent Systems Development</h3>
                  <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                    Building autonomous AI agent teams, cloud coding agents, and automated lead/sales systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Work */}
        <section id="work" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/50">
          <div className="container mx-auto max-w-5xl">
            <div className="space-y-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Selected Work</h2>
              
              <div className="grid gap-12 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-semibold">Cherry Valley Analytics</h3>
                  <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                    Built the offer, site and automated lead system.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-semibold">Project Management Systems</h3>
                  <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                    Designed the Project Workspace boards, approval flow and lead intake.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-semibold">Branding and digital media</h3>
                  <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                    Creative direction and content production.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-semibold">Doomsday Brand</h3>
                  <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                    Designer, Brand Manager, and Digital Media for an apparel brand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/50">
          <div className="container mx-auto max-w-5xl">
            <div className="space-y-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Skills</h2>
              
              <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-zinc-300">Product & Strategy</h3>
                  <ul className="space-y-2 text-base text-zinc-400">
                    <li>Product Management</li>
                    <li>Brand Strategy</li>
                    <li>Go-to-Market</li>
                    <li>User Experience</li>
                    <li>Growth & Analytics</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-zinc-300">Creative & Brand</h3>
                  <ul className="space-y-2 text-base text-zinc-400">
                    <li>Creative Direction</li>
                    <li>Brand Identity</li>
                    <li>Content Strategy</li>
                    <li>Lifestyle Marketing</li>
                    <li>Community Building</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/50">
          <div className="container mx-auto max-w-5xl">
            <div className="space-y-8">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">About</h2>
              <div className="space-y-6 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-3xl">
                <p>
                  I’m a multidisciplinary professional with over 10 years of experience in brand strategy, e-commerce, digital marketing, and project development.
                </p>
                <p>
                  Throughout my career, I’ve worked across entertainment, lifestyle brands, and digital commerce, helping transform creative concepts into engaging brand experiences and business solutions. My approach combines strategic planning, creative direction, and technology to connect brands with their audiences.
                </p>
                <p>
                  With hands-on experience using Shopify, I bring an understanding of e-commerce storefront development, product presentation, and digital customer experiences. I focus on aligning brand identity with online commerce to create cohesive shopping experiences that support business objectives.
                </p>
                <p>
                  My professional interests continue to evolve through business analytics, artificial intelligence, and emerging technologies. I’m particularly interested in how data-driven insights and intelligent automation can improve marketing performance, customer engagement, and operational efficiency.
                </p>
                <p>
                  I believe successful brands are built through a combination of creativity, strategy, and informed decision-making.
                </p>
                <p>
                  <span className="font-semibold text-zinc-300">Core Expertise:</span> Brand Strategy · E-Commerce · Shopify · Digital Marketing · Project Management · Business Analytics · Creative Direction
                </p>
                <p>
                  <span className="font-semibold text-zinc-300">Languages:</span> English / Spanish
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/50">
          <div className="container mx-auto max-w-5xl">
            <div className="space-y-8">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Contact</h2>
              <div className="space-y-4">
                <p className="text-base sm:text-lg text-zinc-400 max-w-2xl">
                  Open to consulting, product partnerships, and brand collaborations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link 
                    href="mailto:Info@srgca.org"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-zinc-100 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                  >
                    Get in Touch
                  </Link>
                  <Link 
                    href="https://www.linkedin.com/in/sergio-a-01838b36" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-zinc-400 hover:text-zinc-100 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-colors"
                  >
                    LinkedIn
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
            <p>© {new Date().getFullYear()} Sergio Armando. All rights reserved.</p>
            <p className="text-zinc-600">FIDM Graduate</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
