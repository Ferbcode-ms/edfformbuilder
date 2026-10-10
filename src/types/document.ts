export interface ServiceExportEntry {
  id: string; // for internal react key
  sNo: number;
  recipientNameAddress: string;
  country: string;
  invoiceNo: string;
  date: string; // YYYY-MM-DD
  currency: string;
  amount: number | "";
  netRealisableValue: number | "";
  contractNoAndDate: string;
  descriptionOfServices: string;
  sacCode: string;
  remarks: string;
}

export interface GeneralInformation {
  exportType: "Service" | "Software";
  formNo: string;
  exporterName: string;
  exporterAddress: string;
  adCode: string;
  ieCode: string;
  adNameAddress: string;
  gstin: string;
  pan: string;
  hasThirdParty: boolean; // internal UI state
  thirdPartyNameAddress: string;
  relationshipWithThirdParty: string;
  modeOfRealisation: string;
  descriptionOfServices: string;
  totalServicesValueInWordsINR: string;
  declarationDate: string;
  realisationDueDate: string;
  signatoryName: string;
}

export interface DocumentData {
  generalInformation: GeneralInformation;
  serviceExports: ServiceExportEntry[];
}
