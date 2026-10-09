import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "How to Fill the EDF Form | ExportForm Guide",
  description: "A step-by-step guide on how to fill out the Export Declaration Form (EDF) for inward remittances in India.",
};

export default function HowToFillPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8 max-w-7xl mx-auto w-full border-b border-border/50">
        <Link href="/" className="text-xl font-semibold tracking-tight text-foreground">ExportForm</Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground-secondary">
          <Link href="/edf-form" className="hover:text-foreground transition-colors duration-200">Main Guide</Link>
          <Link href="/generator">
            <Button variant="outline" size="sm">Open Generator</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 md:py-24 w-full">
        <article className="prose prose-slate md:prose-lg max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            How to Fill the EDF Form
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-foreground-secondary mb-12 border-l-4 border-accent pl-4">
            <p className="m-0"><strong>Topic:</strong> Documentation Tutorial</p>
            <p className="m-0"><strong>Last Updated:</strong> 2026</p>
          </div>

          <p className="text-xl text-foreground-secondary mb-12">
            Filling out an Export Declaration Form correctly is crucial to ensuring your bank releases your foreign remittance without delay. Here is exactly what information you need to prepare.
          </p>

          <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">Step 1: The Exporter Details</h2>
          <p>
            This section represents <strong>you</strong> or your company.
          </p>
          <ul className="space-y-2">
            <li><strong>Name / Business Name:</strong> The exact name registered on your bank account.</li>
            <li><strong>Address:</strong> Your registered business or residential address in India.</li>
            <li><strong>PAN:</strong> Mandatory for all foreign inward remittances.</li>
            <li><strong>GSTIN / IEC:</strong> Optional for freelancers under certain thresholds, but highly recommended if you are an established agency.</li>
          </ul>

          <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">Step 2: The Recipient Details</h2>
          <p>
            This section represents your <strong>client</strong>.
          </p>
          <ul className="space-y-2">
            <li><strong>Client Name:</strong> The foreign entity or person who paid you.</li>
            <li><strong>Address & Country:</strong> Important to prove the service was exported outside India.</li>
          </ul>

          <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">Step 3: The Service & Invoice Details</h2>
          <p>
            You must link the money received to a specific invoice.
          </p>
          <ul className="space-y-2">
            <li><strong>Invoice Number & Date:</strong> Must match the commercial invoice you issued.</li>
            <li><strong>Service Description:</strong> Be specific. Do not just write "Services". Write "Custom Software Development for January 2026".</li>
            <li><strong>FEMA Purpose Code:</strong> Ensure the service category aligns with the FEMA purpose code your bank expects (e.g., P0802 for software).</li>
          </ul>

          <div className="bg-background-secondary/30 border border-border/50 rounded-3xl p-8 my-12 text-center">
            <h3 className="text-xl font-semibold mb-4 mt-0">Don't want to format this manually?</h3>
            <p className="text-foreground-secondary mb-6 text-base max-w-md mx-auto">
              Our generator walks you through these steps and produces a perfectly aligned PDF automatically.
            </p>
            <Link href="/generator">
              <Button>Generate your EDF document &rarr;</Button>
            </Link>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">Step 4: The Payment Details</h2>
          <p>
            The bank needs to trace the wire transfer.
          </p>
          <ul className="space-y-2">
            <li><strong>Foreign Amount:</strong> The exact amount of USD, EUR, GBP, etc. that was sent.</li>
            <li><strong>Reference Number:</strong> The SWIFT UTR or payment reference provided by your client or platform.</li>
            <li><strong>Remitter Name:</strong> Ensure this matches the name on the wire transfer (it might be a platform like Deel or Upwork, rather than the end client).</li>
          </ul>

        </article>
      </main>
      <footer className="py-12 px-6 text-center border-t border-border/50 text-sm text-foreground-secondary">
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/disclaimer" className="hover:text-foreground">Disclaimer</Link>
          <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
        </div>
        <p>ExportForm is a software utility, not a bank or financial advisor.</p>
      </footer>
    </div>
  );
}
