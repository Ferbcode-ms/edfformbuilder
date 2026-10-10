import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GeneratorForm } from "@/components/forms/GeneratorForm";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://edfformbuilders.pages.dev/#website",
        "url": "https://edfformbuilders.pages.dev/",
        "name": "ExportForm",
        "description": "Private browser-based PDF generator for Indian service and software exporters under RBI FEMA 23(R)/2026-RB.",
        "publisher": {
          "@type": "Organization",
          "name": "ExportForm",
          "url": "https://edfformbuilders.pages.dev",
          "logo": {
            "@type": "ImageObject",
            "url": "https://edfformbuilders.pages.dev/logo.png"
          }
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://edfformbuilders.pages.dev/#software",
        "name": "ExportForm EDF Form Generator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "description": "Free, client-side Export Declaration Form (EDF) PDF generator for Indian freelancers, agencies, and software developers receiving foreign remittances."
      },
      {
        "@type": "HowTo",
        "name": "How to Prepare an EDF Form for Service Exports",
        "description": "Step-by-step process to generate an official draft Export Declaration Form (EDF) under RBI FEMA 23(R)/2026-RB.",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Enter General Exporter Information",
            "text": "Provide exporter name, address, AD bank branch, AD code, IEC, PAN, and mode of realization."
          },
          {
            "@type": "HowToStep",
            "name": "Add Service & Software Export Entries",
            "text": "Input recipient name, country, invoice number, date, currency, invoice amount, SAC code, and description of services."
          },
          {
            "@type": "HowToStep",
            "name": "Review Statutory RBI Declaration",
            "text": "Review Section 4 undertaking regarding realization within 9 months and confirm declaration date."
          },
          {
            "@type": "HowToStep",
            "name": "Generate & Print A4 PDF",
            "text": "Download or print the compliant A4 PDF draft to sign and submit to your Authorised Dealer bank."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is an EDF form for service and software exports?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Export Declaration Form (EDF) is an official regulatory document prescribed by the Reserve Bank of India (RBI) under Notification No. FEMA 23(R)/2026-RB. Service and software exporters submit Section 2B of this form to their Authorised Dealer (AD) bank to report export values and regularize foreign remittances in EDPMS."
            }
          },
          {
            "@type": "Question",
            "name": "Is the EDF form mandatory for Indian freelancers receiving foreign payments?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Indian banks require documentary proof for inward foreign remittances. For service and software exports where no physical Customs Shipping Bill exists, banks request an EDF or purpose declaration to issue the Foreign Inward Remittance Certificate (FIRC) and close EDPMS entries."
            }
          },
          {
            "@type": "Question",
            "name": "What is the filing deadline for the EDF form?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Under RBI FEMA 23(R)/2026-RB regulations, service exporters must submit the EDF to their Authorised Dealer bank within 30 days from the end of the month in which the invoices were raised. Full realization must be completed within 9 months from the date of export."
            }
          },
          {
            "@type": "Question",
            "name": "Can I include multiple client invoices in a single EDF?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. RBI regulations explicitly allow monthly consolidated filing. You can list multiple foreign clients and multiple invoices generated during that calendar month in Section 2B of a single EDF."
            }
          },
          {
            "@type": "Question",
            "name": "Is this form used for physical goods exported by ship?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Physical goods exported by sea or air pass through Indian Customs ports where the electronic Shipping Bill (ICEGATE) automatically serves as the export declaration. This standalone EDF generator is specifically designed for intangible Service and Software exports."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between EDF and SOFTEX?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "SOFTEX was traditionally required for software exporters registered with STPI (Software Technology Parks of India). Under the unified 2026 FEMA regulations, the EDF provides a direct reporting framework to Authorised Dealer banks for both software and general service exports."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans selection:bg-accent/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8 max-w-7xl mx-auto w-full">
        <Link href="/" className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <span>ExportForm</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/10 text-accent">
            FEMA 2026
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground-secondary">
          <Link href="#generator" className="hover:text-foreground transition-colors duration-200">Generator</Link>
          <Link href="#how-it-works" className="hover:text-foreground transition-colors duration-200">How It Works</Link>
          <Link href="#faq" className="hover:text-foreground transition-colors duration-200">FAQ</Link>
          <Link href="/resources" className="hover:text-foreground transition-colors duration-200">Guides</Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-24 text-center animate-in fade-in duration-700">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-background-secondary/60 border border-border/60 text-xs font-medium text-foreground-secondary mb-2">
            <span>Prescribed Annexure to RBI Notification FEMA 23(R)/2026-RB</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-tight text-balance">
            Generate Your Service Export EDF Form Online
          </h1>
          
          <p className="text-lg md:text-xl text-foreground-secondary max-w-2xl mx-auto text-balance font-light leading-relaxed">
            A free, client-side A4 PDF builder for Indian freelancers, agencies, and software developers receiving foreign inward remittances.
          </p>
        </div>

        <div id="generator" className="w-full max-w-4xl mt-12 mb-20 px-2 sm:px-6 md:px-0 text-left">
          <GeneratorForm />
        </div>

        {/* How It Works Section */}
        <section id="how-it-works" aria-label="How it works" className="mt-12 md:mt-20 max-w-5xl mx-auto text-left w-full px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How ExportForm Works</h2>
            <p className="text-foreground-secondary text-base mt-2">Generate a bank-ready draft EDF document in four simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <article className="p-6 rounded-3xl bg-background-secondary/20 border border-border/40 space-y-3">
              <div className="text-xs font-bold tracking-widest text-accent uppercase">Step 01</div>
              <h3 className="text-lg font-semibold tracking-tight">Exporter Details</h3>
              <p className="text-foreground-secondary text-sm font-light leading-relaxed">
                Enter your name, IEC, PAN, AD bank branch, and service export classification.
              </p>
            </article>

            <article className="p-6 rounded-3xl bg-background-secondary/20 border border-border/40 space-y-3">
              <div className="text-xs font-bold tracking-widest text-accent uppercase">Step 02</div>
              <h3 className="text-lg font-semibold tracking-tight">Invoice Entries</h3>
              <p className="text-foreground-secondary text-sm font-light leading-relaxed">
                Add one or more client invoices under Section 2B with currency, amount, and SAC codes.
              </p>
            </article>

            <article className="p-6 rounded-3xl bg-background-secondary/20 border border-border/40 space-y-3">
              <div className="text-xs font-bold tracking-widest text-accent uppercase">Step 03</div>
              <h3 className="text-lg font-semibold tracking-tight">RBI Declaration</h3>
              <p className="text-foreground-secondary text-sm font-light leading-relaxed">
                Review the statutory Section 4 undertaking regarding realization within 9 months.
              </p>
            </article>

            <article className="p-6 rounded-3xl bg-background-secondary/20 border border-border/40 space-y-3">
              <div className="text-xs font-bold tracking-widest text-accent uppercase">Step 04</div>
              <h3 className="text-lg font-semibold tracking-tight">Download & Print</h3>
              <p className="text-foreground-secondary text-sm font-light leading-relaxed">
                Preview your compliant A4 document, print it, or save it directly to your device.
              </p>
            </article>
          </div>
        </section>

        {/* Frequently Asked Questions Section (SEO & Rich Snippets) */}
        <section id="faq" aria-label="Frequently Asked Questions" className="mt-24 md:mt-32 max-w-4xl mx-auto text-left w-full px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <p className="text-foreground-secondary text-base mt-2">Essential guidelines for Indian freelancers and service exporters.</p>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-background-secondary/20 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                What is an EDF form for service and software exports?
              </h3>
              <p className="text-sm text-foreground-secondary leading-relaxed font-light">
                The Export Declaration Form (EDF) is an official regulatory declaration prescribed under RBI Notification No. FEMA 23(R)/2026-RB. Service exporters, software developers, and freelancers submit this form (specifically Section 2B) to their Authorised Dealer (AD) bank to report the full value of exports and facilitate inward remittance reconciliation in EDPMS.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-background-secondary/20 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Is an EDF form mandatory for Indian freelancers receiving foreign payments?
              </h3>
              <p className="text-sm text-foreground-secondary leading-relaxed font-light">
                Yes. When foreign payments arrive via wire transfer or payment gateways, Authorised Dealer banks require export documentation before releasing funds or issuing the Foreign Inward Remittance Certificate (FIRC). The EDF establishes legal compliance under FEMA, 1999.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-background-secondary/20 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                What is the deadline to file the EDF form with my bank?
              </h3>
              <p className="text-sm text-foreground-secondary leading-relaxed font-light">
                Under Regulation 4, service and software exporters must furnish the EDF to their Authorised Dealer bank within <strong>30 days from the end of the month</strong> in which the invoices were issued. The full value of export proceeds must be realised within <strong>9 months</strong> from the date of export.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-background-secondary/20 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Can I include multiple client invoices in a single EDF?
              </h3>
              <p className="text-sm text-foreground-secondary leading-relaxed font-light">
                Yes. Under Section 2B (&ldquo;Details of services provided to multiple recipients&rdquo;), exporters are explicitly permitted to file a single monthly consolidated declaration covering all invoices and overseas clients from that calendar month.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-background-secondary/20 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Is this form used for physical goods exported by ship or cargo?
              </h3>
              <p className="text-sm text-foreground-secondary leading-relaxed font-light">
                No. Physical goods exported by ship or air go through Customs ports where the electronic Shipping Bill on the ICEGATE portal acts as the declaration. This standalone EDF generator is specifically built for intangible Service and Software exports that do not pass through physical customs checkpoints.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-background-secondary/20 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                How does ExportForm protect my privacy?
              </h3>
              <p className="text-sm text-foreground-secondary leading-relaxed font-light">
                ExportForm runs 100% locally in your web browser. We do not use servers, databases, cookies, or external APIs to store or transmit your financial information. Your invoices and exporter details remain entirely on your own device and are cleared whenever you reset the form or refresh the page.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Comprehensive Footer with Internal Linking Cluster */}
      <footer id="privacy" className="py-16 px-6 border-t border-border/50 bg-background-secondary/10">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-5 gap-10 mb-14 text-left">
          <div className="space-y-4 md:col-span-2">
            <div className="text-lg font-bold tracking-tight">ExportForm</div>
            <p className="text-foreground-secondary text-sm max-w-sm leading-relaxed font-light">
              Free, private, browser-based Export Declaration Form (EDF) PDF generator for Indian freelancers, consultants, and software developers receiving foreign remittances under RBI FEMA 23(R)/2026-RB.
            </p>
            <div className="text-xs text-foreground-secondary/70">
              All processing is performed strictly in-browser. Zero data collection.
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">EDF Guides</h4>
            <ul className="space-y-2.5 text-sm text-foreground-secondary">
              <li><Link href="/edf-form" className="hover:text-foreground transition-colors">EDF Form Guide</Link></li>
              <li><Link href="/edf-form-2026" className="hover:text-foreground transition-colors">FEMA 2026 Rules</Link></li>
              <li><Link href="/edf-form-for-freelancers" className="hover:text-foreground transition-colors">EDF for Freelancers</Link></li>
              <li><Link href="/edf-form-for-software-developers" className="hover:text-foreground transition-colors">Software Developers</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Filing Resources</h4>
            <ul className="space-y-2.5 text-sm text-foreground-secondary">
              <li><Link href="/how-to-fill-edf-form" className="hover:text-foreground transition-colors">How to Fill EDF</Link></li>
              <li><Link href="/edf-form-fields-explained" className="hover:text-foreground transition-colors">Fields Explained</Link></li>
              <li><Link href="/edf-vs-softex" className="hover:text-foreground transition-colors">EDF vs SOFTEX</Link></li>
              <li><Link href="/resources" className="hover:text-foreground transition-colors">All Resources</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Legal & Privacy</h4>
            <ul className="space-y-2.5 text-sm text-foreground-secondary">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between text-xs text-foreground-secondary gap-4">
          <p>© {new Date().getFullYear()} ExportForm. User-prepared document generator.</p>
          <p>ExportForm is an independent utility and is not affiliated with the Reserve Bank of India.</p>
        </div>
      </footer>
    </div>
  );
}

