import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "EDF Form 2026 for Freelancers & Service Exporters | ExportForm",
  description: "Prepare your EDF (Export Declaration Form) for foreign service exports. A private, browser-based generator for Indian freelancers and software developers.",
};

export default function EDFFormPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8 max-w-7xl mx-auto w-full border-b border-border/50">
        <Link href="/" className="text-xl font-semibold tracking-tight text-foreground">ExportForm</Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground-secondary">
          <Link href="/about" className="hover:text-foreground transition-colors duration-200">About</Link>
          <Link href="/how-to-fill-edf-form" className="hover:text-foreground transition-colors duration-200">How to Fill</Link>
          <Link href="/">
            <Button variant="outline" size="sm">Open Generator</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 md:py-24 w-full">
        <article className="prose prose-slate md:prose-lg max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            EDF Form for Freelancers & Service Exporters
          </h1>
          <p className="text-xl text-foreground-secondary mb-12">
            The Export Declaration Form (EDF) is required by authorized dealer banks in India to process inward remittances for the export of goods and software services. We provide a private tool to prepare a draft PDF instantly.
          </p>

          <div className="bg-background-secondary/30 border border-border/50 rounded-3xl p-8 md:p-12 text-center mb-16">
            <h2 className="text-2xl font-semibold mb-4 mt-0">Generate Your Draft EDF Document</h2>
            <p className="text-foreground-secondary mb-8 max-w-xl mx-auto">
              Our tool runs 100% in your browser. No data is saved, uploaded, or stored in any database. It is completely private.
            </p>
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto text-base">
                Start the Generator &rarr;
              </Button>
            </Link>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">What is the EDF Form?</h2>
          <p>
            The Export Declaration Form (EDF) replaced the older GR/SDF forms. It is used to declare the export of goods and software from India. For software exporters, freelancers, and IT agencies receiving payments from foreign clients, banks often request an EDF or an equivalent purpose declaration before crediting foreign inward remittances (FIRC) to your account.
          </p>

          <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">Who needs it?</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>Software Developers</strong> exporting IT services to clients in the US, UK, or Europe.</li>
            <li><strong>Freelancers</strong> receiving direct bank wires via SWIFT.</li>
            <li><strong>Agencies</strong> that need to provide their authorized dealer bank with documentation of the service export.</li>
          </ul>

          <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">EDF vs SOFTEX</h2>
          <p>
            For software exports, the RBI mandates the SOFTEX form for bulk/corporate exports filed through the STPI (Software Technology Parks of India). However, for individual freelancers and small agencies, many authorized dealer banks accept a standard Export Declaration (often referred to informally as an EDF or purpose declaration) for non-STPI service exports under $25,000. <strong>Always confirm the exact requirement with your specific bank branch.</strong>
          </p>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mt-12">
            <h3 className="text-sm font-bold text-blue-900 uppercase tracking-widest mt-0 mb-2">Official Sources</h3>
            <p className="text-sm text-blue-800 mb-0">
              For official guidelines, please refer to the Master Direction on Export of Goods and Services published by the Reserve Bank of India (RBI).
            </p>
          </div>
        </article>
      </main>

      <footer className="py-12 px-6 text-center border-t border-border/50 text-sm text-foreground-secondary">
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/disclaimer" className="hover:text-foreground">Disclaimer</Link>
          <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
          <Link href="/terms" className="hover:text-foreground">Terms</Link>
        </div>
        <p>ExportForm is a software utility, not a bank or financial advisor.</p>
      </footer>
    </div>
  );
}
