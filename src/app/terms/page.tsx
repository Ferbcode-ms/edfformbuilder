import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | ExportForm",
  description: "Terms of Service for using the ExportForm application.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <header className="px-6 py-8 max-w-4xl mx-auto w-full border-b border-border/50">
        <Link href="/" className="text-xl font-semibold tracking-tight text-foreground hover:text-accent transition-colors">
          &larr; ExportForm
        </Link>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-16 w-full">
        <article className="prose prose-slate md:prose-lg max-w-none">
          <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using ExportForm, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">2. Description of Service</h2>
          <p>
            ExportForm provides a client-side web application tool to assist Indian freelancers, agencies, and software developers in generating draft Export Declaration Form (EDF) documents. 
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">3. Fair Use</h2>
          <p>
            You agree to use this service only for lawful purposes. You are strictly prohibited from attempting to reverse-engineer, exploit, or maliciously disrupt the ExportForm website infrastructure.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">4. Intellectual Property</h2>
          <p>
            The design, layout, and source code architecture of ExportForm are protected by intellectual property laws. You may not claim the software as your own.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">5. Modifications to Service</h2>
          <p>
            ExportForm reserves the right to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice at any time. We cannot guarantee that the document formatting will not change in accordance with future RBI updates.
          </p>
        </article>
      </main>
    </div>
  );
}
