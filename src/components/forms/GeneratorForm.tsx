"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DocumentData, ServiceExportEntry, GeneralInformation } from "@/types/document";
import { DocumentPreview } from "@/components/pdf/DocumentPreview";
import { edfService2026Template } from "@/pdf/templates/edf-service-2026/config";

const STEPS = [
  { id: "general", title: "General Information" },
  { id: "services", title: "Service Export Entries" },
  { id: "review", title: "Review & Generate" },
];

const initialGeneralInfo: GeneralInformation = {
  formNo: "",
  exporterName: "",
  exporterAddress: "",
  adCode: "",
  ieCode: "",
  adNameAddress: "",
  gstin: "",
  pan: "",
  hasThirdParty: false,
  thirdPartyNameAddress: "",
  relationshipWithThirdParty: "",
  modeOfRealisation: "Others (advance payment, remittance, etc.)",
  descriptionOfServices: "",
  totalServicesValueInWordsINR: "",
};

const createEmptyServiceEntry = (sNo: number, isInitial = false): ServiceExportEntry => ({
  id: isInitial ? `initial-entry-${sNo}` : Math.random().toString(36).substring(7),
  sNo,
  recipientNameAddress: "",
  country: "",
  invoiceNo: "",
  date: "",
  currency: "USD",
  amount: "",
  netRealisableValue: "",
  contractNoAndDate: "",
  descriptionOfServices: "",
  sacCode: "",
  remarks: "",
});

export function GeneratorForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [generalInfo, setGeneralInfo] = useState<GeneralInformation>(initialGeneralInfo);
  const [serviceEntries, setServiceEntries] = useState<ServiceExportEntry[]>([createEmptyServiceEntry(1, true)]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!generalInfo.exporterName) newErrors["exporterName"] = "Required";
      if (!generalInfo.exporterAddress) newErrors["exporterAddress"] = "Required";
      if (!generalInfo.adNameAddress) newErrors["adNameAddress"] = "Required";
      if (!generalInfo.modeOfRealisation) newErrors["modeOfRealisation"] = "Required";
      if (!generalInfo.descriptionOfServices) newErrors["descriptionOfServices"] = "Required";
      if (generalInfo.hasThirdParty) {
        if (!generalInfo.thirdPartyNameAddress) newErrors["thirdPartyNameAddress"] = "Required for third-party payments";
        if (!generalInfo.relationshipWithThirdParty) newErrors["relationshipWithThirdParty"] = "Required for third-party payments";
      }
    }

    if (step === 1) {
      serviceEntries.forEach((entry, idx) => {
        if (!entry.recipientNameAddress) newErrors[`entry_${idx}_recipientNameAddress`] = "Required";
        if (!entry.country) newErrors[`entry_${idx}_country`] = "Required";
        if (!entry.invoiceNo) newErrors[`entry_${idx}_invoiceNo`] = "Required";
        if (!entry.date) newErrors[`entry_${idx}_date`] = "Required";
        if (!entry.currency) newErrors[`entry_${idx}_currency`] = "Required";
        if (entry.amount === "") newErrors[`entry_${idx}_amount`] = "Required";
        if (entry.netRealisableValue === "") newErrors[`entry_${idx}_netRealisableValue`] = "Required";
        if (!entry.descriptionOfServices) newErrors[`entry_${idx}_descriptionOfServices`] = "Required";
        if (!entry.sacCode) newErrors[`entry_${idx}_sacCode`] = "Required";
      });
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      const el = document.getElementsByName(firstErrorField)[0];
      if (el) {
        el.focus();
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return false;
    }
    
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGeneratePDF = () => {
    if (validateStep(currentStep)) {
      setShowPreview(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const resetForm = () => {
    setGeneralInfo(initialGeneralInfo);
    setServiceEntries([createEmptyServiceEntry(1, true)]);
    setCurrentStep(0);
    setShowPreview(false);
    setErrors({});
  };

  const documentData: DocumentData = {
    generalInformation: generalInfo,
    serviceExports: serviceEntries,
  };

  if (showPreview) {
    return <DocumentPreview data={documentData} onEdit={() => setShowPreview(false)} onReset={resetForm} />;
  }

  const step = STEPS[currentStep];

  return (
    <div className="bg-background rounded-[2rem] md:p-10 p-6 md:border border-border/50 shadow-sm animate-in fade-in zoom-in-95 duration-500 max-w-4xl w-full mx-auto">
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <h1 className="text-xl font-bold tracking-tight text-foreground">Export Document (Service)</h1>
          <span className="text-sm font-medium text-foreground-secondary tracking-widest uppercase shrink-0">
            {String(currentStep + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-balance mt-4">
          {step.title}
        </h2>
      </div>

      <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
        {currentStep === 0 && (
          <div className="space-y-6">
            <Input 
              label="Exporter's Name" 
              name="exporterName"
              placeholder="e.g. Priya Sharma" 
              value={generalInfo.exporterName} 
              onChange={(e) => setGeneralInfo({ ...generalInfo, exporterName: e.target.value })} 
              error={errors.exporterName} 
            />
            <Input 
              label="Exporter's Address" 
              name="exporterAddress"
              placeholder="e.g. Pune, Maharashtra" 
              value={generalInfo.exporterAddress} 
              onChange={(e) => setGeneralInfo({ ...generalInfo, exporterAddress: e.target.value })} 
              error={errors.exporterAddress} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="PAN" name="pan" placeholder="Optional" value={generalInfo.pan} onChange={(e) => setGeneralInfo({ ...generalInfo, pan: e.target.value })} error={errors.pan} />
              <Input label="GSTIN" name="gstin" placeholder="Optional" value={generalInfo.gstin} onChange={(e) => setGeneralInfo({ ...generalInfo, gstin: e.target.value })} error={errors.gstin} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="IE Code" name="ieCode" placeholder="Optional" value={generalInfo.ieCode} onChange={(e) => setGeneralInfo({ ...generalInfo, ieCode: e.target.value })} error={errors.ieCode} />
              <Input label="AD Code" name="adCode" placeholder="Optional" value={generalInfo.adCode} onChange={(e) => setGeneralInfo({ ...generalInfo, adCode: e.target.value })} error={errors.adCode} />
            </div>

            <Input 
              label="Authorised Dealer (AD) Name & Address" 
              name="adNameAddress"
              placeholder="e.g. Sample Bank Ltd, FC Road branch, Pune" 
              value={generalInfo.adNameAddress} 
              onChange={(e) => setGeneralInfo({ ...generalInfo, adNameAddress: e.target.value })} 
              error={errors.adNameAddress} 
            />

            <div className="p-4 border border-border/50 rounded-2xl bg-background-secondary/30">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={generalInfo.hasThirdParty} 
                  onChange={(e) => setGeneralInfo({ ...generalInfo, hasThirdParty: e.target.checked })}
                  className="w-5 h-5 rounded accent-accent"
                />
                <span className="text-sm font-semibold tracking-wider text-foreground-secondary uppercase">Includes Third Party Payment</span>
              </label>
              
              {generalInfo.hasThirdParty && (
                <div className="mt-4 space-y-4 animate-in slide-in-from-top-4">
                  <Input 
                    label="Third Party Name & Address" 
                    name="thirdPartyNameAddress"
                    value={generalInfo.thirdPartyNameAddress} 
                    onChange={(e) => setGeneralInfo({ ...generalInfo, thirdPartyNameAddress: e.target.value })} 
                    error={errors.thirdPartyNameAddress} 
                  />
                  <Input 
                    label="Relationship between Exporter & Third Party" 
                    name="relationshipWithThirdParty"
                    value={generalInfo.relationshipWithThirdParty} 
                    onChange={(e) => setGeneralInfo({ ...generalInfo, relationshipWithThirdParty: e.target.value })} 
                    error={errors.relationshipWithThirdParty} 
                  />
                </div>
              )}
            </div>

            <Input 
              label="General Description of Services" 
              name="descriptionOfServices"
              placeholder="e.g. Website design; IT consulting" 
              value={generalInfo.descriptionOfServices} 
              onChange={(e) => setGeneralInfo({ ...generalInfo, descriptionOfServices: e.target.value })} 
              error={errors.descriptionOfServices} 
            />
            
            <Input 
              label="Mode of Realisation" 
              name="modeOfRealisation"
              placeholder="e.g. Others (advance payment, remittance, etc.)" 
              value={generalInfo.modeOfRealisation} 
              onChange={(e) => setGeneralInfo({ ...generalInfo, modeOfRealisation: e.target.value })} 
              error={errors.modeOfRealisation} 
            />

            <Input 
              label="Form No." 
              name="formNo"
              placeholder="Optional" 
              value={generalInfo.formNo} 
              onChange={(e) => setGeneralInfo({ ...generalInfo, formNo: e.target.value })} 
              error={errors.formNo} 
            />

            <Input 
              label="Total Services value in words (INR)" 
              name="totalServicesValueInWordsINR"
              placeholder="Optional if INR value is not calculated yet" 
              value={generalInfo.totalServicesValueInWordsINR} 
              onChange={(e) => setGeneralInfo({ ...generalInfo, totalServicesValueInWordsINR: e.target.value })} 
              error={errors.totalServicesValueInWordsINR} 
            />
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-12">
            {serviceEntries.map((entry, idx) => (
              <div key={entry.id} className="p-6 md:p-8 bg-background-secondary/30 rounded-3xl border border-border/50 relative">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold tracking-tight">Service Export {String(idx + 1).padStart(2, '0')}</h3>
                  {serviceEntries.length > 1 && (
                    <Button 
                      variant="ghost" 
                      onClick={() => {
                        const newEntries = [...serviceEntries];
                        newEntries.splice(idx, 1);
                        // Re-number
                        newEntries.forEach((e, i) => e.sNo = i + 1);
                        setServiceEntries(newEntries);
                      }}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <div className="space-y-6">
                  <Input 
                    label="Recipient Name & Address" 
                    name={`entry_${idx}_recipientNameAddress`}
                    value={entry.recipientNameAddress} 
                    onChange={(e) => {
                      const newEntries = [...serviceEntries];
                      newEntries[idx].recipientNameAddress = e.target.value;
                      setServiceEntries(newEntries);
                    }} 
                    error={errors[`entry_${idx}_recipientNameAddress`]} 
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                      label="Country" 
                      name={`entry_${idx}_country`}
                      value={entry.country} 
                      onChange={(e) => {
                        const newEntries = [...serviceEntries];
                        newEntries[idx].country = e.target.value;
                        setServiceEntries(newEntries);
                      }} 
                      error={errors[`entry_${idx}_country`]} 
                    />
                    <Input 
                      label="Invoice No." 
                      name={`entry_${idx}_invoiceNo`}
                      value={entry.invoiceNo} 
                      onChange={(e) => {
                        const newEntries = [...serviceEntries];
                        newEntries[idx].invoiceNo = e.target.value;
                        setServiceEntries(newEntries);
                      }} 
                      error={errors[`entry_${idx}_invoiceNo`]} 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                      label="Invoice Date" 
                      type="date"
                      name={`entry_${idx}_date`}
                      value={entry.date} 
                      onChange={(e) => {
                        const newEntries = [...serviceEntries];
                        newEntries[idx].date = e.target.value;
                        setServiceEntries(newEntries);
                      }} 
                      error={errors[`entry_${idx}_date`]} 
                    />
                    <Select 
                      label="Currency"
                      name={`entry_${idx}_currency`}
                      value={entry.currency}
                      onChange={(e) => {
                        const newEntries = [...serviceEntries];
                        newEntries[idx].currency = e.target.value;
                        setServiceEntries(newEntries);
                      }}
                      options={[
                        { label: "USD - US Dollar", value: "USD" },
                        { label: "EUR - Euro", value: "EUR" },
                        { label: "GBP - British Pound", value: "GBP" },
                        { label: "AUD - Australian Dollar", value: "AUD" },
                        { label: "CAD - Canadian Dollar", value: "CAD" },
                        { label: "SGD - Singapore Dollar", value: "SGD" },
                        { label: "INR - Indian Rupee", value: "INR" },
                      ]}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                      label="Amount" 
                      type="number"
                      name={`entry_${idx}_amount`}
                      value={entry.amount} 
                      onChange={(e) => {
                        const newEntries = [...serviceEntries];
                        newEntries[idx].amount = e.target.value ? Number(e.target.value) : "";
                        setServiceEntries(newEntries);
                      }} 
                      error={errors[`entry_${idx}_amount`]} 
                    />
                    <Input 
                      label="Net Realisable Value" 
                      type="number"
                      name={`entry_${idx}_netRealisableValue`}
                      value={entry.netRealisableValue} 
                      onChange={(e) => {
                        const newEntries = [...serviceEntries];
                        newEntries[idx].netRealisableValue = e.target.value ? Number(e.target.value) : "";
                        setServiceEntries(newEntries);
                      }} 
                      error={errors[`entry_${idx}_netRealisableValue`]} 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                      label="Description of Services" 
                      name={`entry_${idx}_descriptionOfServices`}
                      value={entry.descriptionOfServices} 
                      onChange={(e) => {
                        const newEntries = [...serviceEntries];
                        newEntries[idx].descriptionOfServices = e.target.value;
                        setServiceEntries(newEntries);
                      }} 
                      error={errors[`entry_${idx}_descriptionOfServices`]} 
                    />
                    <Input 
                      label="SAC Code" 
                      name={`entry_${idx}_sacCode`}
                      value={entry.sacCode} 
                      onChange={(e) => {
                        const newEntries = [...serviceEntries];
                        newEntries[idx].sacCode = e.target.value;
                        setServiceEntries(newEntries);
                      }} 
                      error={errors[`entry_${idx}_sacCode`]} 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                      label="Contract No., if any, and Date" 
                      name={`entry_${idx}_contractNoAndDate`}
                      placeholder="Optional"
                      value={entry.contractNoAndDate} 
                      onChange={(e) => {
                        const newEntries = [...serviceEntries];
                        newEntries[idx].contractNoAndDate = e.target.value;
                        setServiceEntries(newEntries);
                      }} 
                      error={errors[`entry_${idx}_contractNoAndDate`]} 
                    />
                    <Input 
                      label="Remarks" 
                      name={`entry_${idx}_remarks`}
                      placeholder="Optional"
                      value={entry.remarks} 
                      onChange={(e) => {
                        const newEntries = [...serviceEntries];
                        newEntries[idx].remarks = e.target.value;
                        setServiceEntries(newEntries);
                      }} 
                      error={errors[`entry_${idx}_remarks`]} 
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button 
              variant="outline" 
              className="w-full border-dashed"
              onClick={() => {
                const newEntries = [...serviceEntries, createEmptyServiceEntry(serviceEntries.length + 1)];
                setServiceEntries(newEntries);
              }}
            >
              + Add another export entry
            </Button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-10">
            <ReviewSection title="General Information" onEdit={() => setCurrentStep(0)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <div className="text-xs text-foreground-secondary uppercase tracking-wider mb-1">Exporter</div>
                  <div className="text-sm font-medium">{generalInfo.exporterName}</div>
                  <div className="text-sm text-foreground-secondary">{generalInfo.exporterAddress}</div>
                </div>
                <div>
                  <div className="text-xs text-foreground-secondary uppercase tracking-wider mb-1">AD Bank</div>
                  <div className="text-sm font-medium">{generalInfo.adNameAddress}</div>
                </div>
              </div>
            </ReviewSection>

            <ReviewSection title="Service Exports" onEdit={() => setCurrentStep(1)}>
              <div className="space-y-4 mt-2">
                {serviceEntries.map((entry, idx) => (
                  <div key={entry.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 border-b border-border/50 last:border-0 gap-2">
                    <div className="min-w-0 pr-4">
                      <div className="font-medium text-sm">Entry {idx + 1}: {entry.invoiceNo}</div>
                      <div className="text-sm text-foreground-secondary truncate sm:whitespace-normal">{entry.recipientNameAddress}</div>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <div className="font-medium text-sm">{entry.currency} {entry.amount}</div>
                      <div className="text-xs text-foreground-secondary">{entry.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ReviewSection>

            <ReviewSection title="Declarations">
              <div className="mt-2 text-sm text-foreground-secondary bg-background-secondary/30 p-4 rounded-xl">
                The official RBI declarations (Section 4 and 5) will be automatically appended to the final PDF. By clicking Generate, you verify the information is ready for declaration.
              </div>
            </ReviewSection>
          </div>
        )}
      </div>

      <div className="mt-12 pt-8 border-t border-border/50 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
        {currentStep > 0 ? (
          <Button variant="ghost" onClick={prevStep} className="w-full md:w-auto">
            &larr; Back
          </Button>
        ) : (
          <div className="hidden md:block" />
        )}
        
        {currentStep < STEPS.length - 1 ? (
          <Button onClick={nextStep} className="w-full md:w-auto bg-foreground text-background hover:bg-foreground/90">
            Continue &rarr;
          </Button>
        ) : (
          <Button onClick={handleGeneratePDF} className="w-full md:w-auto bg-accent text-white hover:bg-accent/90">
            Generate PDF &rarr;
          </Button>
        )}
      </div>
    </div>
  );
}

function ReviewSection({ title, children, onEdit }: { title: string; children: React.ReactNode; onEdit?: () => void }) {
  return (
    <div className="border-b border-border/50 pb-8 last:border-0 last:pb-0 group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-foreground-secondary uppercase tracking-widest">{title}</h3>
        {onEdit && (
          <button onClick={onEdit} className="text-sm font-medium text-accent opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 hover:underline">
            Edit &rarr;
          </button>
        )}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
