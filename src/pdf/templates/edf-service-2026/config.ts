import { DocumentTemplate, TemplateField } from "@/types/template";
import { DocumentData } from "@/types/document";

const fields: TemplateField[] = [
  // We can leave this mostly empty or map scalar fields if needed, 
  // but since the layout is highly specific (Table 2B, Declarations),
  // we might handle the raw `DocumentData` in the PDF renderer directly 
  // or define the fields here. To stay consistent with the architecture, we define them.
  
  { id: "gen.exportType", label: "Type of Export", type: "text", required: true, valueGetter: (d) => d.generalInformation.exportType },
  { id: "gen.formNo", label: "Form No.", type: "text", required: false, valueGetter: (d) => d.generalInformation.formNo },
  { id: "gen.exporterName", label: "Exporter's Name & Address", type: "longtext", required: true, valueGetter: (d) => `${d.generalInformation.exporterName}\n${d.generalInformation.exporterAddress}` },
  { id: "gen.adCode", label: "AD Code", type: "text", required: false, valueGetter: (d) => d.generalInformation.adCode },
  { id: "gen.ieCode", label: "IE Code", type: "text", required: false, valueGetter: (d) => d.generalInformation.ieCode },
  { id: "gen.adNameAddress", label: "AD Name & Address", type: "longtext", required: true, valueGetter: (d) => d.generalInformation.adNameAddress },
  { id: "gen.gstin", label: "GSTIN", type: "text", required: false, valueGetter: (d) => d.generalInformation.gstin },
  { id: "gen.pan", label: "PAN", type: "text", required: false, valueGetter: (d) => d.generalInformation.pan },
  { id: "gen.thirdParty", label: "Third Party Name & Address", type: "longtext", required: false, valueGetter: (d) => d.generalInformation.hasThirdParty ? d.generalInformation.thirdPartyNameAddress : "N/A" },
  { id: "gen.relationship", label: "Relationship between Exporter & Third Party", type: "text", required: false, valueGetter: (d) => d.generalInformation.hasThirdParty ? d.generalInformation.relationshipWithThirdParty : "N/A" },
  { id: "gen.modeOfRealisation", label: "Mode of Realisation", type: "text", required: true, valueGetter: (d) => d.generalInformation.modeOfRealisation },
  { id: "gen.description", label: "Description of Services", type: "longtext", required: true, valueGetter: (d) => d.generalInformation.descriptionOfServices },
  { id: "gen.totalWords", label: "Total Services Value in Words (INR)", type: "longtext", required: false, valueGetter: (d) => d.generalInformation.totalServicesValueInWordsINR },
  { id: "gen.declarationDate", label: "Declaration Date", type: "text", required: true, valueGetter: (d) => d.generalInformation.declarationDate },
  { id: "gen.realisationDueDate", label: "Realisation Due Date", type: "text", required: false, valueGetter: (d) => d.generalInformation.realisationDueDate },
  { id: "gen.signatoryName", label: "Signatory Name", type: "text", required: false, valueGetter: (d) => d.generalInformation.signatoryName },
];

export const edfService2026Template: DocumentTemplate = {
  metadata: {
    templateId: "edf-service-2026-v1",
    name: "Export Declaration Form (Service)",
    version: "1.0",
    status: "official",
  },
  fields,
  sections: []
};
