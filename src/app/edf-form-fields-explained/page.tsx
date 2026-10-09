import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "EDF Form Fields Explained: Step-by-Step Guide | ExportForm",
  description: "A detailed breakdown of every field on the 2026 Service Export Declaration Form (EDF), including AD Code, IE Code, and Net Realisable Value.",
  alternates: {
    canonical: "https://edfformbuilders.pages.dev/edf-form-fields-explained",
  },
};

export default function FieldsExplained() {
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
              <li className="text-foreground font-medium" aria-current="page">Fields Explained</li>
            </ol>
          </nav>

          <header className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance leading-tight">
              EDF Form Fields Explained
            </h1>
            <p className="text-xl text-foreground-secondary leading-relaxed font-light">
              Understand exactly what information goes into each section of the Service Export Declaration Form.
            </p>
          </header>

          <section className="space-y-8 prose prose-lg prose-neutral dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold tracking-tight">1. General Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground m-0">Form No.</h3>
                <p className="text-foreground-secondary text-sm mt-1">This is generally assigned by your bank or the regulatory portal. Leave it blank if you are submitting a draft to your AD bank, unless instructed otherwise.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground m-0">AD Code (Authorised Dealer Code)</h3>
                <p className="text-foreground-secondary text-sm mt-1">A unique 14-digit code assigned by the RBI to your specific bank branch. You must ask your bank branch for this exact code.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground m-0">IE Code (Importer-Exporter Code)</h3>
                <p className="text-foreground-secondary text-sm mt-1">A 10-digit registration number issued by the DGFT (Directorate General of Foreign Trade). For many freelancers, this is now identical to your PAN.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground m-0">Mode of Realisation</h3>
                <p className="text-foreground-secondary text-sm mt-1">How you received the money. Examples: Wire Transfer, SWIFT, PayPal, Letter of Credit.</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight mt-12">2B. Details of Export Value of Services</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground m-0">Invoice No. & Date</h3>
                <p className="text-foreground-secondary text-sm mt-1">The exact invoice number you sent to your foreign client, and the date it was issued.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground m-0">Amount & Currency</h3>
                <p className="text-foreground-secondary text-sm mt-1">The total amount billed in the foreign currency (e.g., USD 5,000).</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground m-0">Net Realisable Value</h3>
                <p className="text-foreground-secondary text-sm mt-1">The amount actually expected to hit your account after intermediary bank fees and platform commissions are deducted.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground m-0">SAC Code</h3>
                <p className="text-foreground-secondary text-sm mt-1">Services Accounting Code. Required for GST purposes to classify the exact nature of the service exported.</p>
              </div>
            </div>

            <div className="mt-12 bg-background-secondary/30 rounded-3xl p-8 text-center border border-border/50">
              <h3 className="text-2xl font-semibold mb-4">Ready to fill out your form?</h3>
              <Link href="/">
                <Button size="lg" className="w-full sm:w-auto text-base">
                  Go to the Generator &rarr;
                </Button>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
