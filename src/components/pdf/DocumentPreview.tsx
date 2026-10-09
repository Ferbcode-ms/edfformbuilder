"use client";

import dynamic from "next/dynamic";
import { DocumentData } from "@/types/document";

const DocumentPreviewInner = dynamic(
  () => import("./DocumentPreviewInner"),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center h-[600px] space-y-4 animate-in fade-in duration-500">
        <div className="w-8 h-8 border-4 border-border border-t-accent rounded-full animate-spin" />
        <p className="text-foreground-secondary font-medium tracking-tight">Preparing your document...</p>
      </div>
    ),
  }
);

interface DocumentPreviewProps {
  data: DocumentData;
  onEdit: () => void;
  onReset: () => void;
}

export function DocumentPreview({ data, onEdit, onReset }: DocumentPreviewProps) {
  return <DocumentPreviewInner data={data} onEdit={onEdit} onReset={onReset} />;
}
