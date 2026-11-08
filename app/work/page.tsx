import type { Metadata } from "next";
import Link from "next/link";

const description =
  "Selected work by Sergio Armando (SRGCA): Cherry Valley Analytics, project management systems, branding and digital media, and Doomsday Brand.";

export const metadata: Metadata = {
  title: "Work | SRGCA",
  description,
  authors: [{ name: "Sergio Armando" }],
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    type: "website",
    url: "https://srgca.online/work",
    siteName: "SRGCA",
    title: "Work | SRGCA",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Work | SRGCA",
    description,
    creator: "@TheSRG_CA",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const linkClass =
  "text-zinc-400 underline underline-offset-4 decoration-zinc-600 transition-colors hover:text-zinc-100";

export default function WorkPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main"
        className="absolute left-[-9999px] top-0 z-[100] rounded-lg bg-zinc-800 px-4 py-2 text-zinc-100 focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-black/80 backdrop-blur-md">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Primary">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight hover:text-zinc-300 transition-colors">
              SRGCA
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/" className="hover:text-zinc-300 transition-colors">
                Home
              </Link>
              <Link href="/work" className="font-medium text-zinc-100" aria-current="page">
                Work
              </Link>
              <Link href="/#contact" className="hover:text-zinc-300 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main id="main" className="flex-1 pt-16">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="animate-in space-y-12">
              <div className="space-y-4">
                <p className="text-sm text-zinc-500">
                  <Link href="/" className="hover:text-zinc-300 transition-colors">
                    ← Back to home
                  </Link>
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] break-words">
                  Work
                </h1>
                <p className="text-xl sm:text-2xl text-zinc-400 max-w-3xl leading-relaxed">
                  Brand Strategy | E-Commerce | Digital Marketing | AI &amp; Automation
                </p>
                <p className="text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed">
                  Brand and creative work for the hardstyle scene: designing apparel, managing a brand&apos;s social and digital media, and partnering with Basscon on a limited-edition collab.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <article className="space-y-4 rounded-xl border border-zinc-800/70 bg-black/60 p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-semibold">Cherry Valley Analytics</h2>
                  <p className="text-base sm:text-lg leading-relaxed text-zinc-300">
                    Built the offer, site and automated lead system.
                  </p>
                  <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                    An AI agent team for businesses, with a free Agent Audit.
                  </p>
                  <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-base">
                    <li>
                      <a
                        className={linkClass}
                        href="https://cherryvalleyanalytics.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        cherryvalleyanalytics.com →
                      </a>
                    </li>
                  </ul>
                </article>

                <article className="space-y-4 rounded-xl border border-zinc-800/70 bg-black/60 p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-semibold">Project Management Systems</h2>
                  <p className="text-base sm:text-lg leading-relaxed text-zinc-300">
                    Designed the Project Workspace boards, approval flow and lead intake.
                  </p>
                </article>

                <article className="space-y-4 rounded-xl border border-zinc-800/70 bg-black/60 p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-semibold">Branding and Digital Media</h2>
                  <p className="text-base sm:text-lg leading-relaxed text-zinc-300">
                    Creative direction and content production.
                  </p>
                </article>

                <article className="space-y-6 rounded-xl border border-zinc-800/70 bg-black/60 p-6 sm:p-8 md:col-span-2">
                  <div className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-semibold">Doomsday Brand</h2>
                    <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-zinc-300">
                      Designer, Brand Manager, and Digital Media Manager for an apparel brand created to help grow the underground hardstyle music scene in Los Angeles, California.
                    </p>
                    <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-base" aria-label="Doomsday Brand links">
                      <li>
                        <a className={linkClass} href="https://DoomsdayBrand.com" target="_blank" rel="noopener noreferrer">
                          Website →
                        </a>
                      </li>
                      <li>
                        <a className={linkClass} href="https://www.facebook.com/doomsdaybrand/" target="_blank" rel="noopener noreferrer">
                          Facebook →
                        </a>
                      </li>
                      <li>
                        <a className={linkClass} href="https://www.instagram.com/doomsday_brand/" target="_blank" rel="noopener noreferrer">
                          Instagram →
                        </a>
                      </li>
                      <li>
                        <a className={linkClass} href="https://x.com/Doomsday_Brand" target="_blank" rel="noopener noreferrer">
                          X →
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-2 space-y-4 border-l-2 border-violet-500 pl-5">
                    <h3 className="text-lg sm:text-xl font-semibold text-zinc-200">
                      Basscon x Doomsday Bomber Jacket (2016)
                    </h3>
                    <p className="max-w-3xl text-base sm:text-lg text-zinc-400 leading-relaxed">
                      Designed a limited-edition bomber jacket for Basscon&apos;s Nocturnal Wonderland launch. 400 pieces, each individually numbered and labeled.
                    </p>
                    <figure
                      className="max-w-2xl"
                      dangerouslySetInnerHTML={{
                        __html:
                          '<img class="block w-full h-auto rounded-lg border border-zinc-800/70" src="/work/bomber-design-template.jpg" alt="Design template for the Basscon x Doomsday bomber jacket" loading="lazy" onerror="this.style.display=\'none\';if(this.parentNode)this.parentNode.style.display=\'none\'" />',
                      }}
                    />
                    <p className="text-base">
                      <a
                        className={linkClass}
                        href="https://x.com/bassconmassive/status/771556185266720768"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        See Basscon&apos;s announcement →
                      </a>
                    </p>
                  </div>
                </article>
              </div>

              <p className="text-sm text-zinc-500">
                <Link href="/" className="hover:text-zinc-300 transition-colors">
                  ← Back to home
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

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
