import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans selection:bg-accent/20">
      <header className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8 max-w-7xl mx-auto w-full">
        <div className="text-xl font-semibold tracking-tight text-foreground">ExportForm</div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground-secondary">
          <Link href="#how-it-works" className="hover:text-foreground transition-colors duration-200">How it works</Link>
          <Link href="#privacy" className="hover:text-foreground transition-colors duration-200">Privacy</Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 md:py-32 text-center animate-in fade-in duration-700">
        <div className="max-w-3xl space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight text-balance">
            Export documents.<br />
            <span className="text-foreground-secondary">Made simple.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground-secondary max-w-2xl mx-auto text-balance font-light">
            Prepare your foreign service export documents in minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/generator" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base">
                Create a document &rarr;
              </Button>
            </Link>
            <Link href="#how-it-works" className="w-full sm:w-auto">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto text-base">
                How it works
              </Button>
            </Link>
          </div>
        </div>

        <section id="how-it-works" aria-label="How it works" className="mt-32 md:mt-48 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 max-w-5xl mx-auto text-left w-full px-4">
          <article className="space-y-4">
            <div className="text-sm font-semibold tracking-widest text-foreground-secondary mb-8" aria-hidden="true">01</div>
            <h2 className="text-2xl font-medium tracking-tight">Enter Details</h2>
            <p className="text-foreground-secondary text-lg font-light leading-relaxed">Input your exporter, recipient, and invoice information securely into the client-side generator.</p>
          </article>
          <article className="space-y-4">
            <div className="text-sm font-semibold tracking-widest text-foreground-secondary mb-8" aria-hidden="true">02</div>
            <h2 className="text-2xl font-medium tracking-tight">Review</h2>
            <p className="text-foreground-secondary text-lg font-light leading-relaxed">Verify the document details in a clean, highly readable layout before generating the final file.</p>
          </article>
          <article className="space-y-4">
            <div className="text-sm font-semibold tracking-widest text-foreground-secondary mb-8" aria-hidden="true">03</div>
            <h2 className="text-2xl font-medium tracking-tight">Download</h2>
            <p className="text-foreground-secondary text-lg font-light leading-relaxed">Download or print your professional draft export document instantly, fully ready for bank review.</p>
          </article>
        </section>
      </main>

      <footer id="privacy" className="py-12 px-6 border-t border-border/50">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4 md:col-span-2">
            <div className="text-lg font-semibold tracking-tight">ExportForm</div>
            <p className="text-foreground-secondary text-sm max-w-sm">
              Prepare your foreign service export documents in minutes. A private, browser-based generator for Indian freelancers and software developers.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-sm text-foreground-secondary">
              <li><Link href="/edf-form" className="hover:text-foreground">EDF Form Guide</Link></li>
              <li><Link href="/edf-form-for-freelancers" className="hover:text-foreground">EDF for Freelancers</Link></li>
              <li><Link href="/how-to-fill-edf-form" className="hover:text-foreground">How to Fill EDF</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm text-foreground-secondary">
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-foreground">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center">
          <p className="text-foreground-secondary text-sm font-medium">
            Your information stays in your browser.
          </p>
        </div>
      </footer>
    </div>
  );
}
