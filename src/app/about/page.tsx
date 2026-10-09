import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About ExportForm",
  description: "Learn how ExportForm helps Indian freelancers and software developers generate export documentation privately.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <header className="px-6 py-8 max-w-4xl mx-auto w-full border-b border-border/50">
        <Link href="/" className="text-xl font-semibold tracking-tight text-foreground hover:text-accent transition-colors">
          &larr; ExportForm
        </Link>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-16 w-full">
        <article className="prose prose-slate md:prose-lg max-w-none">
          <h1 className="text-4xl font-bold tracking-tight mb-8">About ExportForm</h1>
          
          <p>
            ExportForm was built to solve a single, frustrating problem for Indian freelancers and software developers: the paperwork required to receive foreign payments.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">What ExportForm Does</h2>
          <p>
            We provide a simple, beautifully designed, and strictly private browser-based tool to generate a draft Export Declaration Document. You enter your invoice and remitter details, and we format them into a clean, professional PDF that you can download or print.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">What ExportForm Does NOT Do</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>We do <strong>not</strong> officially submit documents to the RBI.</li>
            <li>We do <strong>not</strong> communicate with your bank.</li>
            <li>We do <strong>not</strong> guarantee that your bank will accept the document format (always check with your authorized dealer).</li>
            <li>We do <strong>not</strong> provide tax, legal, or financial advice.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Strict Privacy</h2>
          <p>
            Unlike other PDF tools online, ExportForm is entirely client-side. The moment you load the page, the application runs directly on your device. We do not have a database. We do not use localStorage or cookies to track your financial data. Your client details and invoice amounts never leave your computer.
          </p>
        </article>
      </main>
    </div>
  );
}
