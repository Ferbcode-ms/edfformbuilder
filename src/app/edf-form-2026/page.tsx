import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "EDF Form 2026: Updates and Compliance Requirements | ExportForm",
  description: "Information regarding the 2026 updates to the Service Export Declaration Form under FEMA regulations.",
  alternates: {
    canonical: "https://edfformbuilders.pages.dev/edf-form-2026",
  },
};

export default function EDFForm2026() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8 max-w-7xl mx-auto w-full border-b border-border/50">
        <Link href="/" className="text-xl font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity">
          ExportForm
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground-secondary">
          <Link href="/" className="text-foreground hover:text-accent transition-colors">Generator</Link>
          <Link href="/resources" className="hover:text-foreground transition-colors">Resources</Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 py-16 md:py-24 animate-in fade-in duration-700">
        <article className="max-w-3xl w-full space-y-12">
          <nav aria-label="Breadcrumb" className="text-sm text-foreground-secondary mb-8">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="hover:text-foreground">Home</Link></li>
              <li><span className="mx-2">/</span></li>
              <li><Link href="/resources" className="hover:text-foreground">Resources</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-foreground font-medium" aria-current="page">2026 Updates</li>
            </ol>
          </nav>

          <header className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance leading-tight">
              EDF Form 2026
            </h1>
            <p className="text-xl text-foreground-secondary leading-relaxed font-light">
              Current compliance information regarding the Export Declaration Form for service exporters in India.
            </p>
          </header>

          <section className="space-y-6 prose prose-lg prose-neutral dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold tracking-tight">Regulatory Context</h2>
            <p className="text-foreground-secondary leading-relaxed">
              The Export Declaration Form (EDF) is governed by the Foreign Exchange Management Act (FEMA). Over time, the Reserve Bank of India (RBI) updates the master directions and annexures to streamline reporting.
            </p>
            <p className="text-foreground-secondary leading-relaxed">
              In 2026, the layout of the Annex to RBI notification FEMA 23(R) explicitly separates reporting requirements for Goods (Part 2A) and Services (Part 2B). For service exporters, this means submitting a streamlined document that omits irrelevant shipping logistics.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight mt-12">Key changes for Service Exporters</h2>
            <ul className="space-y-4 text-foreground-secondary mt-6">
              <li className="flex items-start">
                <span className="mr-3 mt-1 text-accent">•</span>
                <span><strong>Section 2B:</strong> A dedicated table for "Details of Export Value of Services" allows for listing multiple service recipients in a single form, highly useful for freelancers with many small international clients.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 text-accent">•</span>
                <span><strong>Omission of Shipping Data:</strong> Parts 2A (goods) and 3 (exports by post/courier) are explicitly left out, reducing confusion.</span>
              </li>
            </ul>

            <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 mt-8">
              <h3 className="text-xl font-semibold mt-0 mb-2">Note on Verification</h3>
              <p className="m-0 text-foreground-secondary text-sm">
                While ExportForm formats your data according to the 2026 RBI Annex layout, banking practices are heavily decentralized in India. You must always verify the generated draft with your Authorised Dealer (AD) bank before final submission.
              </p>
            </div>

            <div className="mt-12 bg-background-secondary/30 rounded-3xl p-8 text-center border border-border/50">
              <h3 className="text-2xl font-semibold mb-4">Generate the 2026 format</h3>
              <Link href="/">
                <Button size="lg" className="w-full sm:w-auto text-base">
                  Start EDF Generator &rarr;
                </Button>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
