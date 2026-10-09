import { GeneratorForm } from "@/components/forms/GeneratorForm";

export default function GeneratorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="px-6 py-6 border-b border-border/50 flex items-center justify-between">
        <div className="text-lg font-medium tracking-tight">ExportDocument</div>
        <div className="text-xs font-semibold bg-background-secondary px-3 py-1 rounded-full text-foreground-secondary">
          DRAFT / PREVIEW
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto px-6 py-12 md:py-20">
        <GeneratorForm />
      </main>

      <footer className="py-6 px-6 text-center border-t border-border/50 bg-background-secondary/50">
        <p className="text-xs text-foreground-secondary max-w-2xl mx-auto">
          This tool helps prepare documents. Verify the applicable requirements with your authorised dealer bank before submission.
        </p>
      </footer>
    </div>
  );
}
