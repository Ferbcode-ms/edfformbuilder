import { DocumentData } from "./document";

export type FieldType = "text" | "currency" | "date" | "longtext";

export interface TemplateField {
  id: string; // e.g. 'exporter.name'
  label: string; // "Name / Business Name"
  type: FieldType;
  required: boolean;
  valueGetter: (data: DocumentData) => string | number | undefined | null;
  formatter?: (value: any, field: TemplateField, data: DocumentData) => string;
}

export interface TemplateSection {
  id: string;
  title: string;
  fields: string[]; // references TemplateField.id
}

export interface DocumentTemplate {
  metadata: {
    templateId: string;
    name: string;
    version: string;
    status: "draft" | "official";
  };
  fields: TemplateField[];
  sections: TemplateSection[];
}
