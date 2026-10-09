import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "EDF vs SOFTEX: Export Documentation Comparison | ExportForm",
  description: "Understand the difference between the standard Service EDF and the legacy SOFTEX form for Indian software and IT service exporters.",
  alternates: {
    canonical: "https://edfformbuilders.pages.dev/edf-vs-softex",
  },
};

export default function EDFvsSoftex() {
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
              <li className="text-foreground font-medium" aria-current="page">EDF vs SOFTEX</li>
            </ol>
          </nav>

          <header className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance leading-tight">
              EDF vs SOFTEX: Which form do you need?
            </h1>
            <p className="text-xl text-foreground-secondary leading-relaxed font-light">
              An evidence-based comparison of the standard Service Export Declaration Form (EDF) and the legacy SOFTEX process for Indian IT exporters.
            </p>
          </header>

          <section className="space-y-6 prose prose-lg prose-neutral dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold tracking-tight">What is the difference?</h2>
            <p className="text-foreground-secondary leading-relaxed">
              When exporting software or IT services from India, exporters encounter two primary compliance forms: the <strong>EDF (Export Declaration Form)</strong> and the <strong>SOFTEX</strong> form. While both serve the purpose of declaring export value to the RBI via an Authorised Dealer (AD) bank, their applicability depends on your business structure and registration.
            </p>

            <div className="overflow-hidden rounded-xl border border-border mt-8 mb-8">
              <table className="w-full text-left text-sm text-foreground-secondary">
                <thead className="bg-background-secondary/50 text-foreground font-semibold">
                  <tr>
                    <th className="px-6 py-4 border-b border-border">Feature</th>
                    <th className="px-6 py-4 border-b border-border">Service EDF</th>
                    <th className="px-6 py-4 border-b border-border">SOFTEX</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-6 py-4 font-medium text-foreground">Target Audience</td>
                    <td className="px-6 py-4">Freelancers, independent consultants, general service providers, non-STPI agencies.</td>
                    <td className="px-6 py-4">Large IT firms, STPI/SEZ registered entities.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-foreground">Registration Required</td>
                    <td className="px-6 py-4">No special registration required (just standard IEC/AD code).</td>
                    <td className="px-6 py-4">Requires STPI (Software Technology Parks of India) or SEZ registration.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-foreground">Filing Complexity</td>
                    <td className="px-6 py-4">Low. Typically a single PDF submitted directly to the bank.</td>
                    <td className="px-6 py-4">High. Requires monthly certification by STPI officials before bank submission.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-foreground">Applicable Exports</td>
                    <td className="px-6 py-4">All services (Marketing, Consulting, IT, Design, etc.)</td>
                    <td className="px-6 py-4">Strictly software and IT-enabled services (ITES) transmitted electronically.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight mt-12">When to use the Service EDF</h2>
            <p className="text-foreground-secondary leading-relaxed">
              The vast majority of independent freelancers and small agencies should use the standard Service EDF. If you operate out of a regular office or your home and are not actively registered with the STPI scheme to claim specific tax exemptions, the Service EDF is the universally accepted document by AD banks for processing foreign inward remittances.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight mt-12">When to use SOFTEX</h2>
            <p className="text-foreground-secondary leading-relaxed">
              You must use the SOFTEX procedure if your company is registered as a 100% Export Oriented Unit (EOU) under the STPI scheme or operates within a Special Economic Zone (SEZ). The SOFTEX form certifies that the software was actually exported, and this certification is mandatory to maintain your unit's special status and tax benefits.
            </p>

            <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 mt-8">
              <h3 className="text-xl font-semibold mt-0 mb-2">Important Disclaimer</h3>
              <p className="m-0 text-foreground-secondary text-sm">
                Banking practices in India vary significantly between branches and institutions. While the RBI regulations define the broad framework, your specific Authorised Dealer branch may have internal policies regarding which forms they accept for software exports. Always verify with your bank's forex department before filing.
              </p>
            </div>

            <div className="mt-12 bg-background-secondary/30 rounded-3xl p-8 text-center border border-border/50">
              <h3 className="text-2xl font-semibold mb-4">Need to file a Service EDF?</h3>
              <Link href="/">
                <Button size="lg" className="w-full sm:w-auto text-base">
                  Open EDF Generator &rarr;
                </Button>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
