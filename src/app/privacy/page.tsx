import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | ExportForm",
  description: "ExportForm is designed with mathematical privacy. No data leaves your browser.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <header className="px-6 py-8 max-w-4xl mx-auto w-full border-b border-border/50">
        <Link href="/" className="text-xl font-semibold tracking-tight text-foreground hover:text-accent transition-colors">
          &larr; ExportForm
        </Link>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-16 w-full">
        <article className="prose prose-slate md:prose-lg max-w-none">
          <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
          
          <p className="text-xl text-foreground-secondary mb-8">
            Your financial data is yours. ExportForm is designed so that it is mathematically impossible for us to read your data.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Client-Side Architecture</h2>
          <p>
            The entire ExportForm application is shipped directly to your browser as static code. When you fill out your exporter details, invoice amounts, and client information, that data exists solely in your browser's active memory (RAM).
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Zero Storage</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>We do not have a backend database.</li>
            <li>We do not send your form data to any API.</li>
            <li>We do not save your data in cookies, `localStorage`, or `IndexedDB`.</li>
            <li>If you refresh the page, your data is gone permanently.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">PDF Generation</h2>
          <p>
            The PDF document is generated entirely on your device using a client-side JavaScript engine. The file is never uploaded to a server to be processed or stamped.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Analytics</h2>
          <p>
            We do not use invasive third-party analytics to track what you type in the generator. We only track anonymous aggregate page views to ensure our website is online.
          </p>
        </article>
      </main>
    </div>
  );
}
