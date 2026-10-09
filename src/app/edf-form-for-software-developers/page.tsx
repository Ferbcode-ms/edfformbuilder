import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "EDF Form for Software Developers & IT Services | ExportForm",
  description: "Learn how Indian software developers and IT service providers can easily declare foreign income using the new Service Export Declaration Form (EDF).",
  alternates: {
    canonical: "https://edfformbuilders.pages.dev/edf-form-for-software-developers",
  },
};

export default function EDFForSoftwareDevelopers() {
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
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="text-sm text-foreground-secondary mb-8">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="hover:text-foreground">Home</Link></li>
              <li><span className="mx-2">/</span></li>
              <li><Link href="/resources" className="hover:text-foreground">Resources</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-foreground font-medium" aria-current="page">Software Developers</li>
            </ol>
          </nav>

          <header className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance leading-tight">
              EDF Form for Software Developers & IT Services
            </h1>
            <p className="text-xl text-foreground-secondary leading-relaxed font-light">
              How Indian software engineers, IT consultants, and SaaS founders can declare foreign income using the 2026 Service Export Declaration Form instead of the legacy SOFTEX process.
            </p>
          </header>

          <section className="space-y-6 prose prose-lg prose-neutral dark:prose-invert max-w-none">
            <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-semibold mt-0 mb-2">Executive Summary</h2>
              <p className="m-0 text-foreground-secondary">
                Indian software developers receiving foreign inward remittances for IT services, software consulting, or SaaS subscriptions can use the <strong>Service Export Declaration Form (EDF)</strong> to satisfy RBI reporting requirements. This is often a simpler alternative to the legacy SOFTEX procedure for non-STPI registered independent developers.
              </p>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight">Do software developers need an EDF?</h2>
            <p className="text-foreground-secondary leading-relaxed">
              Yes. If you provide software development services to clients outside India and receive payment in foreign currency (USD, EUR, GBP, etc.), you are classified as an exporter of services. Under FEMA regulations, your Authorised Dealer (AD) bank requires documentation to map your inward remittance against an export declaration.
            </p>
            <p className="text-foreground-secondary leading-relaxed">
              For independent developers, freelancers, and small IT firms not registered with STPI (Software Technology Parks of India) or SEZ (Special Economic Zones), the standard Service EDF is the correct compliance document to submit to your bank.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight mt-12">How to fill the EDF for IT Services</h2>
            <p className="text-foreground-secondary leading-relaxed">
              When completing your EDF for software exports, pay special attention to these fields:
            </p>
            <ul className="space-y-4 text-foreground-secondary mt-6">
              <li className="flex items-start">
                <span className="mr-3 mt-1 text-accent">•</span>
                <span><strong>Description of Services:</strong> Be specific. Instead of just "Software", write "Custom software development services", "Web application maintenance", or "SaaS subscription revenue".</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 text-accent">•</span>
                <span><strong>SAC Code:</strong> Services Accounting Codes are required. For software development and IT consulting, the most common SAC codes fall under <strong>99831</strong> (Management consulting and management services including IT) or <strong>998314</strong> (Information technology consulting and support services).</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 text-accent">•</span>
                <span><strong>Contract No. & Date:</strong> If you work via platforms like Upwork, Toptal, or Deel, or have a direct Master Services Agreement (MSA), you can list that agreement reference here. If there is no formal contract, you may leave this blank or refer to the invoice.</span>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold tracking-tight mt-12">EDF vs SOFTEX for Developers</h2>
            <p className="text-foreground-secondary leading-relaxed">
              Historically, the RBI required a <strong>SOFTEX</strong> form for software exports. However, the SOFTEX process is notoriously complex, requiring registration with STPI and monthly certifications. 
            </p>
            <p className="text-foreground-secondary leading-relaxed">
              For most independent freelancers and small agencies operating outside of designated technology parks, banks now accept the standard Service EDF form to process inward remittances. Always confirm with your specific AD bank branch, as internal compliance policies vary.
            </p>

            <div className="mt-12 bg-background-secondary/30 rounded-3xl p-8 text-center border border-border/50">
              <h3 className="text-2xl font-semibold mb-4">Generate your Software EDF instantly</h3>
              <p className="text-foreground-secondary mb-8 max-w-xl mx-auto">
                ExportForm is a 100% private, client-side tool that generates a perfectly formatted PDF draft of your Service EDF.
              </p>
              <Link href="/">
                <Button size="lg" className="w-full sm:w-auto text-base">
                  Start EDF Generator &rarr;
                </Button>
              </Link>
            </div>
          </section>
        </article>
      </main>

      <footer className="py-8 px-6 text-center border-t border-border/50 mt-12">
        <p className="text-foreground-secondary text-sm">
          <Link href="/" className="hover:text-foreground">Home</Link> • <Link href="/resources" className="hover:text-foreground">Resources</Link> • <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
        </p>
      </footer>
    </div>
  );
}
