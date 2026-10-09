import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ExportForm Resources | Guides for Indian Exporters",
  description: "Educational resources, guides, and compliance explanations for Indian freelancers and software developers regarding the EDF form.",
  alternates: {
    canonical: "https://edfformbuilders.pages.dev/resources",
  },
};

export default function Resources() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8 max-w-7xl mx-auto w-full border-b border-border/50">
        <Link href="/" className="text-xl font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity">
          ExportForm
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground-secondary">
          <Link href="/" className="hover:text-foreground transition-colors">Generator</Link>
          <Link href="/resources" className="text-foreground font-semibold">Resources</Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 py-16 md:py-24 animate-in fade-in duration-700">
        <div className="max-w-4xl w-full space-y-12">
          <header className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
              Knowledge Hub
            </h1>
            <p className="text-xl text-foreground-secondary max-w-2xl mx-auto font-light">
              Understand foreign inward remittance compliance.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <Link href="/edf-form-for-freelancers" className="block p-6 border border-border/50 rounded-2xl bg-background-secondary/10 hover:bg-background-secondary/30 transition-colors">
              <h2 className="text-xl font-semibold mb-2">EDF for Freelancers</h2>
              <p className="text-foreground-secondary text-sm">A complete guide on why individual freelancers receiving foreign income need to file an EDF.</p>
            </Link>

            <Link href="/edf-form-for-software-developers" className="block p-6 border border-border/50 rounded-2xl bg-background-secondary/10 hover:bg-background-secondary/30 transition-colors">
              <h2 className="text-xl font-semibold mb-2">EDF for Software Developers</h2>
              <p className="text-foreground-secondary text-sm">How IT service providers and SaaS founders can declare foreign income.</p>
            </Link>

            <Link href="/how-to-fill-edf-form" className="block p-6 border border-border/50 rounded-2xl bg-background-secondary/10 hover:bg-background-secondary/30 transition-colors">
              <h2 className="text-xl font-semibold mb-2">How to Fill the EDF</h2>
              <p className="text-foreground-secondary text-sm">A step-by-step walkthrough of the entire form generation process.</p>
            </Link>

            <Link href="/edf-form-fields-explained" className="block p-6 border border-border/50 rounded-2xl bg-background-secondary/10 hover:bg-background-secondary/30 transition-colors">
              <h2 className="text-xl font-semibold mb-2">Fields Explained</h2>
              <p className="text-foreground-secondary text-sm">Detailed definitions for AD Code, IE Code, Net Realisable Value, and more.</p>
            </Link>

            <Link href="/edf-vs-softex" className="block p-6 border border-border/50 rounded-2xl bg-background-secondary/10 hover:bg-background-secondary/30 transition-colors">
              <h2 className="text-xl font-semibold mb-2">EDF vs SOFTEX</h2>
              <p className="text-foreground-secondary text-sm">Understand the critical differences between the standard service export form and the STPI SOFTEX process.</p>
            </Link>

            <Link href="/edf-form-2026" className="block p-6 border border-border/50 rounded-2xl bg-background-secondary/10 hover:bg-background-secondary/30 transition-colors">
              <h2 className="text-xl font-semibold mb-2">2026 Updates</h2>
              <p className="text-foreground-secondary text-sm">Read about the specific Annex format changes relevant to service exporters under FEMA regulations.</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
