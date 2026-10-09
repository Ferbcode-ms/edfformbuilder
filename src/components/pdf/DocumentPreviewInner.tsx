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
                  if (!url) return;
                  const iframe = document.createElement("iframe");
                  iframe.style.position = "fixed";
                  iframe.style.right = "0";
                  iframe.style.bottom = "0";
                  iframe.style.width = "0";
                  iframe.style.height = "0";
                  iframe.style.border = "0";
                  iframe.style.opacity = "0";
                  iframe.src = url;

                  let printed = false;
                  const doPrint = () => {
                    if (printed) return;
                    printed = true;
                    try {
                      iframe.contentWindow?.focus();
                      iframe.contentWindow?.print();
                    } catch {
                      window.open(url, "_blank");
                    }
                    setTimeout(() => {
                      if (document.body.contains(iframe)) {
                        document.body.removeChild(iframe);
                      }
                    }, 2000);
                  };

                  iframe.onload = () => {
                    setTimeout(doPrint, 300);
                  };

                  document.body.appendChild(iframe);

                  // Fallback timer in case onload does not fire for PDF blob in certain browsers
                  setTimeout(doPrint, 1000);
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
        {/* Desktop View: Full PDFViewer */}
        <div className="hidden md:block w-full h-[800px] lg:h-[1000px] border border-border/50 rounded-2xl overflow-hidden bg-background-secondary/30 relative shadow-inner">
          <PDFViewer style={{ width: "100%", height: "100%", border: "none" }}>
            <DocTemplate />
          </PDFViewer>
        </div>

        {/* Mobile View: High Quality Responsive Preview Card */}
        <div className="block md:hidden w-full border border-border/60 rounded-3xl p-6 bg-background-secondary/20 shadow-sm">
          <BlobProvider document={<DocTemplate />}>
            {({ url, loading }) => (
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-3">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-foreground text-center">EDF Form Ready</h3>
                <p className="text-xs text-foreground-secondary text-center mt-1 mb-6 font-mono break-all">{fileName}</p>

                {/* Summary Table */}
                <div className="w-full bg-background border border-border/60 rounded-2xl p-4 mb-6 text-xs space-y-2.5">
                  <div className="flex justify-between items-center pb-2 border-b border-border/40">
                    <span className="text-foreground-secondary">Exporter</span>
                    <span className="font-semibold text-foreground text-right truncate max-w-[180px]">{data.generalInformation.exporterName || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border/40">
                    <span className="text-foreground-secondary">IE Code</span>
                    <span className="font-mono text-foreground">{data.generalInformation.ieCode || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border/40">
                    <span className="text-foreground-secondary">Recipient / Client</span>
                    <span className="font-semibold text-foreground text-right truncate max-w-[180px]">{data.serviceExports[0]?.recipientNameAddress || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border/40">
                    <span className="text-foreground-secondary">Invoice / Value</span>
                    <span className="font-semibold text-accent">
                      {data.serviceExports[0]?.currency || "USD"} {data.serviceExports[0]?.amount || "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground-secondary">AD Code</span>
                    <span className="font-mono text-foreground text-right">{data.generalInformation.adCode || "N/A"}</span>
                  </div>
                </div>

                {loading ? (
                  <p className="text-sm text-foreground-secondary animate-pulse py-2">Preparing mobile PDF preview...</p>
                ) : (
                  <div className="flex flex-col gap-2.5 w-full">
                    <a
                      href={url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-accent text-white font-medium shadow-md active:scale-95 transition-all text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Open Full PDF Preview
                    </a>
                    <p className="text-[11px] text-foreground-secondary text-center leading-normal px-2">
                      Tap to open full PDF document with native mobile zoom and viewing.
                    </p>
                  </div>
                )}
              </div>
            )}
          </BlobProvider>
        </div>
      </ErrorBoundary>
    </div>
  );
}
