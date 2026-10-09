import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "EDF Form for Freelancers | Foreign Payment Guidelines",
  description: "A complete guide on the Export Declaration Form (EDF) for Indian freelancers receiving foreign payments via SWIFT or international bank transfers.",
};

export default function EDFForFreelancersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8 max-w-7xl mx-auto w-full border-b border-border/50">
        <Link href="/" className="text-xl font-semibold tracking-tight text-foreground">ExportForm</Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground-secondary">
          <Link href="/edf-form" className="hover:text-foreground transition-colors duration-200">Main Guide</Link>
          <Link href="/">
            <Button variant="outline" size="sm">Open Generator</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 md:py-24 w-full">
        <article className="prose prose-slate md:prose-lg max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            EDF Form for Indian Freelancers
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-foreground-secondary mb-12 border-l-4 border-accent pl-4">
            <p className="m-0"><strong>Topic:</strong> Foreign Remittances & Compliance</p>
            <p className="m-0"><strong>Last Updated:</strong> 2026</p>
          </div>

          <p className="text-xl text-foreground-secondary mb-12">
            If you are a freelancer in India working with international clients, receiving payments in USD, EUR, or GBP, your bank might ask you to submit an EDF (Export Declaration Form) before they credit the money to your account.
          </p>

          <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">Why is the Bank Asking for This?</h2>
          <p>
            Under the Foreign Exchange Management Act (FEMA), all inward foreign remittances must be backed by a declared purpose. When money arrives from overseas via a SWIFT transfer, the bank holds the funds in a "Nostro" account until you declare what the money is for.
          </p>
          <p>
            For freelancers exporting services (like graphic design, consulting, writing, or web development), the bank needs proof that you are exporting a service. They use the Export Declaration Form to satisfy their internal compliance before issuing a Foreign Inward Remittance Certificate (FIRC) or Advice (FIRA).
          </p>

          <div className="bg-background-secondary/30 border border-border/50 rounded-3xl p-8 my-12 text-center">
            <h3 className="text-xl font-semibold mb-4 mt-0">Need to submit an EDF to your bank?</h3>
            <p className="text-foreground-secondary mb-6 text-base max-w-md mx-auto">
              Use our private, browser-based generator to prepare a professional draft document in exactly 2 minutes.
            </p>
            <Link href="/">
              <Button>Generate your EDF document &rarr;</Button>
            </Link>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">What Documents Do You Actually Need?</h2>
          <p>
            As a freelancer, you generally need to provide your bank with two things:
          </p>
          <ol className="space-y-4">
            <li>
              <strong>The Commercial Invoice:</strong> The actual invoice you sent to your client, containing your details, their details, the service description, and the amount.
            </li>
            <li>
              <strong>The Purpose Declaration / EDF:</strong> A formal document stating the FEMA purpose code (often P0802 for Software Consultancy or P0807 for Off-site Software Development) and confirming the export.
            </li>
          </ol>

          <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4">Do Freelancers Need SOFTEX?</h2>
          <p>
            The SOFTEX form is specifically meant for the bulk export of software over data links and must be routed through the Software Technology Parks of India (STPI).
          </p>
          <p>
            For individual freelancers working on platforms like Upwork or dealing directly with a few clients for non-IT enabled services, filing SOFTEX is usually entirely impractical and often not required by the bank for small transactions (under $25,000). In these cases, a standard EDF or Bank Purpose Declaration is sufficient.
          </p>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-4">
            <p className="text-sm text-blue-900 m-0">
              <em>Note: Bank compliance teams vary wildly. Always ask your specific relationship manager what format they prefer.</em>
            </p>
          </div>

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
