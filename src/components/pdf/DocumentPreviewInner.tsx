"use client";

import { useState, useEffect } from "react";
import { PDFViewer, PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import { DocumentData } from "@/types/document";
import { Button } from "@/components/ui/Button";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { ExportDocumentPDF } from "@/pdf/templates/edf-service-2026/template";
import { edfService2026Template } from "@/pdf/templates/edf-service-2026/config";

interface DocumentPreviewInnerProps {
  data: DocumentData;
  onEdit: () => void;
  onReset: () => void;
}

export default function DocumentPreviewInner({ data, onEdit, onReset }: DocumentPreviewInnerProps) {
  const [documentRef, setDocumentRef] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    setDocumentRef(`EF-DRAFT-${dateStr}-${randomSuffix}`);
  }, []);

  if (!documentRef) {
    return null;
  }

  const fileName = data.generalInformation.formNo
    ? `EDF_Service_${data.generalInformation.formNo.replace(/[^a-zA-Z0-9_-]/g, "")}_${new Date().toISOString().slice(0, 10)}.pdf`
    : `EDF_Service_${new Date().toISOString().slice(0, 10)}.pdf`;

  const DocTemplate = () => <ExportDocumentPDF data={data} />;

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-700 relative">
      {showResetConfirm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-bold mb-2">Start a new document?</h3>
            <p className="text-foreground-secondary mb-8">Your current information will be cleared.</p>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex-1" onClick={() => setShowResetConfirm(false)}>
                Cancel
              </Button>
              <Button className="flex-1 bg-red-600 text-white hover:bg-red-700" onClick={onReset}>
                Clear & Start New
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/50">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance text-accent">Your document is ready.</h2>
          <p className="text-foreground-secondary mt-2 text-lg font-light">Review the document before submitting it to your authorised dealer bank.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 w-full md:w-auto">
          <Button variant="ghost" onClick={onEdit} className="w-full sm:w-auto">
            &larr; Edit
          </Button>

          <Button variant="ghost" onClick={() => setShowResetConfirm(true)} className="w-full sm:w-auto">
            Start New
          </Button>
          
          <div className="text-xs text-foreground-secondary ml-0 sm:ml-2 mr-0 sm:mr-4 hidden md:block">
            Verify the completed form and submission requirements with your Authorised Dealer bank before filing.
          </div>

          <BlobProvider document={<DocTemplate />}>
            {({ url, loading }) => (
              <Button 
                variant="secondary" 
                disabled={loading || !url} 
                className="w-full sm:w-auto"
                onClick={() => {
                  if (url) {
                    const iframe = document.createElement('iframe');
                    iframe.style.display = 'none';
                    iframe.src = url;
                    document.body.appendChild(iframe);
                    iframe.contentWindow?.print();
                  }
                }}
              >
                Print
              </Button>
            )}
          </BlobProvider>

          <PDFDownloadLink document={<DocTemplate />} fileName={fileName} className="w-full sm:w-auto flex">
            {({ loading }) => (
              <Button disabled={loading} className="w-full sm:w-auto bg-accent text-white hover:bg-accent/90">
                {loading ? "Preparing..." : "Download PDF"}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      <ErrorBoundary onReset={onEdit}>
        <div className="w-full h-[500px] md:h-[800px] lg:h-[1000px] border border-border/50 rounded-2xl overflow-hidden bg-background-secondary/30 relative shadow-inner">
          <PDFViewer style={{ width: "100%", height: "100%", border: "none" }}>
            <DocTemplate />
          </PDFViewer>
        </div>
      </ErrorBoundary>
    </div>
  );
}
