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
              <Link href="#work" className="hover:text-zinc-300 transition-colors hidden sm:inline">Work</Link>
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
              <p className="text-xl sm:text-2xl md:text-3xl text-zinc-400 max-w-3xl leading-relaxed">
                Project Management · Branding · Digital Media
              </p>
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

        {/* Now - Doomsday Brand */}
        <section id="now" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/50">
          <div className="container mx-auto max-w-5xl">
            <div className="space-y-8">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Current Projects</h2>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-semibold">
                    <Link 
                      href="https://doomsdaybrand.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-zinc-300 transition-colors"
                    >
                      Doomsday Brand →
                    </Link>
                  </h3>
                  <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                    Hardstyle and hard dance lifestyle brand. Premium apparel and merch for a global community.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-semibold">Freelance Consulting</h3>
                  <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                    Product management, creative direction, and brand strategy for Insomniac Events and leading entertainment brands.
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
                  <h3 className="text-xl sm:text-2xl font-semibold">Insomniac Events</h3>
                  <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                    Product management and creative direction for one of the world's leading electronic music event producers.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-semibold">Epic Cataloges</h3>
                  <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                    Led product and brand development for innovative catalog solutions in the entertainment space.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-semibold">DMS (Digital Media Solutions)</h3>
                  <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                    Product strategy and digital transformation for performance marketing and media solutions.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-semibold">Doomsday Brand</h3>
                  <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                    Founded and launched hardstyle lifestyle brand with global reach in the electronic music community.
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
                  I'm a project management and brand strategy leader with experience building products and experiences that connect people to culture. My work spans music, entertainment, and lifestyle brands—from global event production to digital media and apparel.
                </p>
                <p>
                  Currently focused on multiple ventures including Doomsday Brand, consulting for Insomniac Events, and developing innovative brand experiences across the entertainment landscape.
                </p>
                <p>
                  Bilingual (English/Spanish). Based in the US. FIDM graduate.
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
