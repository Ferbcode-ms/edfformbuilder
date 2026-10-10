"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DocumentData, ServiceExportEntry, GeneralInformation } from "@/types/document";
import { DocumentPreview } from "@/components/pdf/DocumentPreview";

const STEPS = [
  { id: "general", title: "General Information", subtitle: "Exporter details, AD bank, and export classification" },
  { id: "services", title: "Export Entries (Section 2B)", subtitle: "Invoice details for service & software exports" },
  { id: "declaration", title: "Declaration (Section 4)", subtitle: "Official RBI undertaking and exporter declaration" },
  { id: "review", title: "Review & Generate", subtitle: "Verify all data before producing the official EDF PDF" },
];

const initialGeneralInfo: GeneralInformation = {
  exportType: "Service",
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
  declarationDate: new Date().toISOString().slice(0, 10),
  realisationDueDate: "within 9 months from date of export",
  signatoryName: "",
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
  const [showGuidance, setShowGuidance] = useState(false);
  const [generalInfo, setGeneralInfo] = useState<GeneralInformation>(initialGeneralInfo);
  const [serviceEntries, setServiceEntries] = useState<ServiceExportEntry[]>([createEmptyServiceEntry(1, true)]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [declarationAgreed, setDeclarationAgreed] = useState(false);

  // Multi-currency calculation helper
  const getCurrencyTotals = () => {
    const totals: Record<string, number> = {};
    serviceEntries.forEach((entry) => {
      const curr = (entry.currency || "USD").toUpperCase();
      const amt = typeof entry.amount === "number" ? entry.amount : parseFloat(String(entry.amount)) || 0;
      totals[curr] = (totals[curr] || 0) + amt;
    });
    return totals;
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!generalInfo.exporterName.trim()) newErrors["exporterName"] = "Required: Enter exporter or entity name";
      if (!generalInfo.exporterAddress.trim()) newErrors["exporterAddress"] = "Required: Enter exporter's address";
      if (!generalInfo.adNameAddress.trim()) newErrors["adNameAddress"] = "Required: Enter Authorised Dealer bank branch details";
      if (!generalInfo.modeOfRealisation.trim()) newErrors["modeOfRealisation"] = "Required: Specify mode of realisation";
      if (!generalInfo.descriptionOfServices.trim()) newErrors["descriptionOfServices"] = "Required: Enter description of services or software exported";
      if (generalInfo.hasThirdParty) {
        if (!generalInfo.thirdPartyNameAddress.trim()) newErrors["thirdPartyNameAddress"] = "Required for third-party remittance";
        if (!generalInfo.relationshipWithThirdParty.trim()) newErrors["relationshipWithThirdParty"] = "Required: Specify relationship with third party";
      }
    }

    if (step === 1) {
      if (serviceEntries.length === 0) {
        newErrors["general_entries"] = "At least one service export invoice entry is required.";
      }
      serviceEntries.forEach((entry, idx) => {
        if (!entry.recipientNameAddress.trim()) newErrors[`entry_${idx}_recipientNameAddress`] = "Required: Client/recipient name & address";
        if (!entry.country.trim()) newErrors[`entry_${idx}_country`] = "Required: Destination country";
        if (!entry.invoiceNo.trim()) newErrors[`entry_${idx}_invoiceNo`] = "Required: Invoice number";
        if (!entry.date) newErrors[`entry_${idx}_date`] = "Required: Invoice date";
        if (!entry.currency) newErrors[`entry_${idx}_currency`] = "Required: Currency";
        if (entry.amount === "" || Number(entry.amount) <= 0) newErrors[`entry_${idx}_amount`] = "Required: Valid invoice amount";
        if (entry.netRealisableValue === "" || Number(entry.netRealisableValue) < 0) newErrors[`entry_${idx}_netRealisableValue`] = "Required: Net realisable amount";
        if (!entry.descriptionOfServices.trim()) newErrors[`entry_${idx}_descriptionOfServices`] = "Required: Service/software description";
        if (!entry.sacCode.trim()) newErrors[`entry_${idx}_sacCode`] = "Required: SAC code (e.g., 998314)";
      });
    }

    if (step === 2) {
      if (!generalInfo.declarationDate) newErrors["declarationDate"] = "Required: Specify declaration date";
      if (!declarationAgreed) newErrors["declarationAgreed"] = "You must review and acknowledge the official RBI declaration.";
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
    setDeclarationAgreed(false);
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
  const currencyTotals = getCurrencyTotals();

  return (
    <div className="bg-background rounded-[2rem] md:p-10 p-6 md:border border-border/50 shadow-sm animate-in fade-in zoom-in-95 duration-500 max-w-4xl w-full mx-auto">
      
      {/* Informational RBI Regulatory & Filing Guide Toggle */}
      <div className="mb-8 p-4 rounded-2xl bg-background-secondary/40 border border-border/60">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-foreground-secondary">
              RBI FEMA 23(R)/2026-RB Regulatory Guidelines
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowGuidance((prev) => !prev)}
            className="text-xs font-medium text-accent hover:underline flex items-center gap-1 cursor-pointer"
          >
            {showGuidance ? "Hide Guide ▲" : "View Official Filing Rules ▼"}
          </button>
        </div>

        {showGuidance && (
          <div className="mt-4 pt-4 border-t border-border/40 text-xs text-foreground-secondary space-y-3 leading-relaxed animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-background border border-border/50">
                <div className="font-semibold text-foreground mb-1">1. Filing Timeline (EDF Submission)</div>
                <p>Must be furnished to your Authorised Dealer (AD) Category-I bank within <strong>30 days from the end of the month</strong> in which the export invoices were raised.</p>
              </div>
              <div className="p-3 rounded-xl bg-background border border-border/50">
                <div className="font-semibold text-foreground mb-1">2. Realisation Deadline</div>
                <p>The foreign exchange or permitted INR representing the full export value must be realised within <strong>9 months from the date of export</strong> (Regulation 5(1)).</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-background border border-border/50">
                <div className="font-semibold text-foreground mb-1">3. Monthly Consolidated Filing</div>
                <p>Exporters providing services or software to one or more overseas recipients may submit a single consolidated EDF for all invoices generated during that calendar month.</p>
              </div>
              <div className="p-3 rounded-xl bg-background border border-border/50">
                <div className="font-semibold text-foreground mb-1">4. Software vs. Services vs. SEZ</div>
                <p>
                  <strong>Software:</strong> Unified under FEMA 23(R); interface with STPI/SOFTEX where applicable.<br />
                  <strong>Other Services:</strong> IT consulting, design, freelance are declared via EDF to AD bank.<br />
                  <strong>SEZ Units:</strong> Submit declarations to the SEZ Specified Authority.
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-accent/5 text-[11px] text-foreground-secondary">
              <strong>Official Source:</strong> Notification No. FEMA 23(R)/2026-RB (Effective October 1, 2026). This tool prepares a user draft in the exact Annex layout for submission to your bank.
            </div>
          </div>
        )}
      </div>

      {/* Progress & Header */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <h1 className="text-xl font-bold tracking-tight text-foreground">Export Declaration Form (2026 Annex)</h1>
          <span className="text-sm font-medium text-foreground-secondary tracking-widest uppercase shrink-0">
            Step {String(currentStep + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-balance mt-3">
          {step.title}
        </h2>
        <p className="text-foreground-secondary text-sm font-light mt-1">
          {step.subtitle}
        </p>

        {/* Step progress pills */}
        <div className="grid grid-cols-4 gap-2 mt-6">
          {STEPS.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                if (idx < currentStep || validateStep(currentStep)) {
                  setCurrentStep(idx);
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentStep
                  ? "bg-accent shadow-sm"
                  : idx < currentStep
                  ? "bg-foreground/40 cursor-pointer"
                  : "bg-border/60"
              }`}
              title={s.title}
            />
          ))}
        </div>
      </div>

      <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
        
        {/* STEP 1: General Information */}
        {currentStep === 0 && (
          <div className="space-y-6">
            
            {/* Type of Export */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Type of Export"
                name="exportType"
                value={generalInfo.exportType}
                onChange={(e) => setGeneralInfo({ ...generalInfo, exportType: e.target.value as "Service" | "Software" })}
                options={[
                  { label: "Service (IT, consulting, design, freelance)", value: "Service" },
                  { label: "Software (SaaS, custom software, digital products)", value: "Software" },
                ]}
              />

              <Input 
                label="Form No. (Optional)" 
                name="formNo"
                placeholder="Optional / As assigned by bank" 
                value={generalInfo.formNo} 
                onChange={(e) => setGeneralInfo({ ...generalInfo, formNo: e.target.value })} 
                error={errors.formNo} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Exporter's Name" 
                name="exporterName"
                placeholder="e.g. Acme Tech Solutions / Priya Sharma" 
                value={generalInfo.exporterName} 
                onChange={(e) => setGeneralInfo({ ...generalInfo, exporterName: e.target.value })} 
                error={errors.exporterName} 
              />
              <Input 
                label="Exporter's Address" 
                name="exporterAddress"
                placeholder="e.g. 102 Cyber Park, Hinjewadi, Pune 411057" 
                value={generalInfo.exporterAddress} 
                onChange={(e) => setGeneralInfo({ ...generalInfo, exporterAddress: e.target.value })} 
                error={errors.exporterAddress} 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="IE Code (IEC)" 
                name="ieCode" 
                placeholder="10-digit IEC (optional for exempt freelancers)" 
                value={generalInfo.ieCode} 
                onChange={(e) => setGeneralInfo({ ...generalInfo, ieCode: e.target.value })} 
                error={errors.ieCode} 
              />
              <Input 
                label="AD Code (Authorised Dealer Code)" 
                name="adCode" 
                placeholder="14-digit AD Code (optional / from bank)" 
                value={generalInfo.adCode} 
                onChange={(e) => setGeneralInfo({ ...generalInfo, adCode: e.target.value })} 
                error={errors.adCode} 
              />
            </div>

            <Input 
              label="Authorised Dealer (AD) Bank Name & Address" 
              name="adNameAddress"
              placeholder="e.g. HDFC Bank Ltd, Fort Branch, Mumbai 400001" 
              value={generalInfo.adNameAddress} 
              onChange={(e) => setGeneralInfo({ ...generalInfo, adNameAddress: e.target.value })} 
              error={errors.adNameAddress} 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="PAN (Permanent Account Number)" 
                name="pan" 
                placeholder="e.g. ABCDE1234F (Optional)" 
                value={generalInfo.pan} 
                onChange={(e) => setGeneralInfo({ ...generalInfo, pan: e.target.value.toUpperCase() })} 
                error={errors.pan} 
              />
              <Input 
                label="GSTIN" 
                name="gstin" 
                placeholder="15-digit GSTIN (Optional)" 
                value={generalInfo.gstin} 
                onChange={(e) => setGeneralInfo({ ...generalInfo, gstin: e.target.value.toUpperCase() })} 
                error={errors.gstin} 
              />
            </div>

            {/* Third Party Payment Section */}
            <div className="p-4 border border-border/50 rounded-2xl bg-background-secondary/30">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={generalInfo.hasThirdParty} 
                  onChange={(e) => setGeneralInfo({ ...generalInfo, hasThirdParty: e.target.checked })}
                  className="w-5 h-5 rounded accent-accent"
                />
                <span className="text-sm font-semibold tracking-wider text-foreground-secondary uppercase">
                  Third Party Payment Involved
                </span>
              </label>
              
              {generalInfo.hasThirdParty && (
                <div className="mt-4 space-y-4 animate-in slide-in-from-top-4">
                  <Input 
                    label="Third Party Name & Address" 
                    name="thirdPartyNameAddress"
                    placeholder="e.g. Payee Agency Inc, San Francisco, CA"
                    value={generalInfo.thirdPartyNameAddress} 
                    onChange={(e) => setGeneralInfo({ ...generalInfo, thirdPartyNameAddress: e.target.value })} 
                    error={errors.thirdPartyNameAddress} 
                  />
                  <Input 
                    label="Relationship between Exporter & Third Party" 
                    name="relationshipWithThirdParty"
                    placeholder="e.g. Payment aggregator / Escrow provider"
                    value={generalInfo.relationshipWithThirdParty} 
                    onChange={(e) => setGeneralInfo({ ...generalInfo, relationshipWithThirdParty: e.target.value })} 
                    error={errors.relationshipWithThirdParty} 
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="General Description of Services" 
                name="descriptionOfServices"
                placeholder="e.g. Software development; UI/UX design consulting" 
                value={generalInfo.descriptionOfServices} 
                onChange={(e) => setGeneralInfo({ ...generalInfo, descriptionOfServices: e.target.value })} 
                error={errors.descriptionOfServices} 
              />
              
              <Input 
                label="Mode of Realisation" 
                name="modeOfRealisation"
                placeholder="e.g. Advance remittance / Wire transfer" 
                value={generalInfo.modeOfRealisation} 
                onChange={(e) => setGeneralInfo({ ...generalInfo, modeOfRealisation: e.target.value })} 
                error={errors.modeOfRealisation} 
              />
            </div>

            <Input 
              label="Total Services Value in Words (INR)" 
              name="totalServicesValueInWordsINR"
              placeholder="e.g. Rupees Two Lakh Fifty Thousand Only (Optional)" 
              value={generalInfo.totalServicesValueInWordsINR} 
              onChange={(e) => setGeneralInfo({ ...generalInfo, totalServicesValueInWordsINR: e.target.value })} 
              error={errors.totalServicesValueInWordsINR} 
            />
          </div>
        )}

        {/* STEP 2: Service & Software Export Entries (Section 2B) */}
        {currentStep === 1 && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-background-secondary/40 rounded-2xl border border-border/50">
              <div>
                <span className="text-xs font-semibold text-foreground-secondary uppercase tracking-wider">
                  Consolidated Monthly Invoices ({serviceEntries.length} {serviceEntries.length === 1 ? "entry" : "entries"})
                </span>
                <div className="text-sm font-medium text-foreground mt-0.5">
                  Section 2B: Details of Export Value of Services
                </div>
              </div>

              {/* Currency Totals Display */}
              <div className="text-left sm:text-right">
                <span className="text-[11px] text-foreground-secondary uppercase tracking-wider block">
                  Declared Totals by Currency:
                </span>
                <span className="text-sm font-bold text-accent">
                  {Object.entries(currencyTotals)
                    .map(([curr, amt]) => `${curr} ${amt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`)
                    .join(" | ") || "0.00"}
                </span>
              </div>
            </div>

            {serviceEntries.map((entry, idx) => (
              <div key={entry.id} className="p-6 md:p-8 bg-background-secondary/30 rounded-3xl border border-border/50 relative">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/40">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-bold tracking-tight text-foreground">
                      Invoice Entry #{entry.sNo}
                    </h3>
                  </div>

                  {serviceEntries.length > 1 && (
                    <Button 
                      variant="ghost" 
                      onClick={() => {
                        const newEntries = [...serviceEntries];
                        newEntries.splice(idx, 1);
                        newEntries.forEach((e, i) => e.sNo = i + 1);
                        setServiceEntries(newEntries);
                      }}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 h-9 px-3 text-xs"
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <div className="space-y-6">
                  <Input 
                    label="Service Recipient's Name & Address" 
                    name={`entry_${idx}_recipientNameAddress`}
                    placeholder="e.g. Acme Corp, 456 Market St, San Francisco, CA 94105, USA"
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
                      placeholder="e.g. United States"
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
                      placeholder="e.g. INV-2026-001"
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
                        { label: "AED - UAE Dirham", value: "AED" },
                        { label: "JPY - Japanese Yen", value: "JPY" },
                        { label: "INR - Indian Rupee", value: "INR" },
                      ]}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                      label="Invoice Amount" 
                      type="number"
                      step="any"
                      name={`entry_${idx}_amount`}
                      placeholder="e.g. 2500.00"
                      value={entry.amount} 
                      onChange={(e) => {
                        const newEntries = [...serviceEntries];
                        const val = e.target.value ? Number(e.target.value) : "";
                        newEntries[idx].amount = val;
                        // Default net realisable value to invoice amount if empty
                        if (newEntries[idx].netRealisableValue === "" && val !== "") {
                          newEntries[idx].netRealisableValue = val;
                        }
                        setServiceEntries(newEntries);
                      }} 
                      error={errors[`entry_${idx}_amount`]} 
                    />
                    <Input 
                      label="Net Realisable Value" 
                      type="number"
                      step="any"
                      name={`entry_${idx}_netRealisableValue`}
                      placeholder="e.g. 2500.00 (expected proceeds)"
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
                      placeholder="e.g. Full-stack web application development"
                      value={entry.descriptionOfServices} 
                      onChange={(e) => {
                        const newEntries = [...serviceEntries];
                        newEntries[idx].descriptionOfServices = e.target.value;
                        setServiceEntries(newEntries);
                      }} 
                      error={errors[`entry_${idx}_descriptionOfServices`]} 
                    />
                    <Input 
                      label="SAC Code (Service Accounting Code)" 
                      name={`entry_${idx}_sacCode`}
                      placeholder="e.g. 998314 (IT software) / 998311"
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
                      placeholder="Optional / e.g. MSA-2026-04 dated 2026-01-15"
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
              className="w-full border-dashed py-6 rounded-2xl hover:bg-background-secondary/50"
              onClick={() => {
                const newEntries = [...serviceEntries, createEmptyServiceEntry(serviceEntries.length + 1)];
                setServiceEntries(newEntries);
              }}
            >
              + Add another invoice entry (monthly consolidation)
            </Button>
          </div>
        )}

        {/* STEP 3: Declaration by Exporter (Section 4) */}
        {currentStep === 2 && (
          <div className="space-y-8">
            <div className="p-6 md:p-8 bg-background-secondary/30 rounded-3xl border border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold text-accent uppercase tracking-wider">Official Legal Undertaking</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-4 text-foreground">
                Section 4 — Declaration by the Exporters (All types of exports)
              </h3>
              
              <div className="p-5 rounded-2xl bg-background border border-border/60 text-sm text-foreground/90 space-y-4 leading-relaxed font-sans shadow-sm">
                <p>
                  &ldquo;I/We hereby declare that I/we @am/are the seller/consignor of the goods/ provider of services in respect of which this declaration is made and that the particulars given above are true and that the value to be received from the buyer/third party represents the export value contracted and declared above. I/We undertake that I/we have delivered/ will deliver to the authorised dealer named above the foreign exchange / Indian Rupees representing the full value of the goods/services exported as above on or before{" "}
                  <span className="font-semibold underline decoration-accent decoration-2">
                    {generalInfo.realisationDueDate || "within 9 months from date of export"}
                  </span>{" "}
                  (i.e. within the period of realisation stipulated by RBI from time to time) in the manner specified in the Regulations made under the Foreign Exchange Management Act, 1999.&rdquo;
                </p>
                <p>
                  &ldquo;I/We also undertake to submit the documents pertaining to exports declared in this form, to the Authorised Dealer named above, as may be required under the Act.&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Input 
                  label="Declaration Date" 
                  type="date"
                  name="declarationDate"
                  value={generalInfo.declarationDate} 
                  onChange={(e) => setGeneralInfo({ ...generalInfo, declarationDate: e.target.value })} 
                  error={errors.declarationDate} 
                />
                
                <Input 
                  label="Name of Exporter / Authorised Signatory" 
                  name="signatoryName"
                  placeholder="e.g. Priya Sharma (Proprietor / Director)"
                  value={generalInfo.signatoryName} 
                  onChange={(e) => setGeneralInfo({ ...generalInfo, signatoryName: e.target.value })} 
                  error={errors.signatoryName} 
                />
              </div>

              <div className="mt-6">
                <Input 
                  label="Realisation Due Date / Period" 
                  name="realisationDueDate"
                  placeholder="e.g. within 9 months from date of export"
                  value={generalInfo.realisationDueDate} 
                  onChange={(e) => setGeneralInfo({ ...generalInfo, realisationDueDate: e.target.value })} 
                  error={errors.realisationDueDate} 
                />
              </div>

              <div className="mt-8 pt-6 border-t border-border/40">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="declarationAgreed"
                    checked={declarationAgreed} 
                    onChange={(e) => setDeclarationAgreed(e.target.checked)}
                    className="w-5 h-5 rounded accent-accent mt-0.5 shrink-0"
                  />
                  <span className="text-sm font-medium text-foreground">
                    I verify that the above information is accurate and will be officially signed before filing with the Authorised Dealer bank.
                  </span>
                </label>
                {errors.declarationAgreed && (
                  <p className="text-xs text-red-500 mt-2">{errors.declarationAgreed}</p>
                )}
              </div>
            </div>

            {/* Note on Section 5 */}
            <div className="p-4 rounded-2xl bg-background-secondary/20 border border-border/40 text-xs text-foreground-secondary">
              <strong>Section 5 (For Use by the Specified Authority):</strong> This section will be printed blank on the generated document as prescribed by the RBI. It is reserved exclusively for certification and stamping by your Authorised Dealer bank or Customs/SEZ official.
            </div>
          </div>
        )}

        {/* STEP 4: Review & Generate */}
        {currentStep === 3 && (
          <div className="space-y-8">
            <ReviewSection title="1. General Information" onEdit={() => setCurrentStep(0)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <div className="text-xs text-foreground-secondary uppercase tracking-wider mb-1">Export Classification</div>
                  <div className="text-sm font-semibold text-accent">{generalInfo.exportType} Export</div>
                </div>
                <div>
                  <div className="text-xs text-foreground-secondary uppercase tracking-wider mb-1">Form No.</div>
                  <div className="text-sm font-mono">{generalInfo.formNo || "N/A"}</div>
                </div>
                <div>
                  <div className="text-xs text-foreground-secondary uppercase tracking-wider mb-1">Exporter Name & Address</div>
                  <div className="text-sm font-medium">{generalInfo.exporterName}</div>
                  <div className="text-xs text-foreground-secondary">{generalInfo.exporterAddress}</div>
                </div>
                <div>
                  <div className="text-xs text-foreground-secondary uppercase tracking-wider mb-1">Authorised Dealer Bank</div>
                  <div className="text-sm font-medium">{generalInfo.adNameAddress}</div>
                  <div className="text-xs text-foreground-secondary font-mono">AD Code: {generalInfo.adCode || "N/A"}</div>
                </div>
                <div>
                  <div className="text-xs text-foreground-secondary uppercase tracking-wider mb-1">IE Code & Tax Identifiers</div>
                  <div className="text-xs text-foreground font-mono">
                    IEC: {generalInfo.ieCode || "N/A"} | PAN: {generalInfo.pan || "N/A"} | GSTIN: {generalInfo.gstin || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-foreground-secondary uppercase tracking-wider mb-1">Realisation Mode</div>
                  <div className="text-sm">{generalInfo.modeOfRealisation}</div>
                </div>
              </div>
            </ReviewSection>

            <ReviewSection title="2B. Details of Export Value of Services" onEdit={() => setCurrentStep(1)}>
              <div className="space-y-3 mt-3">
                {serviceEntries.map((entry, idx) => (
                  <div key={entry.id} className="p-4 rounded-2xl bg-background-secondary/20 border border-border/40 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-sm">
                        #{entry.sNo} — Invoice {entry.invoiceNo} ({entry.date})
                      </div>
                      <div className="text-xs text-foreground-secondary truncate max-w-md">
                        {entry.recipientNameAddress} ({entry.country})
                      </div>
                      <div className="text-xs text-foreground-secondary mt-0.5">
                        SAC: <span className="font-mono">{entry.sacCode}</span> | {entry.descriptionOfServices}
                      </div>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <div className="font-bold text-sm text-foreground">
                        {entry.currency} {typeof entry.amount === "number" ? entry.amount.toLocaleString(undefined, { minimumFractionDigits: 2 }) : entry.amount}
                      </div>
                      <div className="text-xs text-foreground-secondary">
                        Net: {entry.currency} {typeof entry.netRealisableValue === "number" ? entry.netRealisableValue.toLocaleString(undefined, { minimumFractionDigits: 2 }) : entry.netRealisableValue}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Multi-Currency Grand Totals */}
                <div className="p-4 rounded-2xl bg-accent/5 border border-accent/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground-secondary">
                    Total Declared Values by Currency:
                  </span>
                  <span className="text-base font-bold text-accent">
                    {Object.entries(currencyTotals)
                      .map(([curr, amt]) => `${curr} ${amt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`)
                      .join(" | ")}
                  </span>
                </div>
              </div>
            </ReviewSection>

            <ReviewSection title="4. Declaration & Undertaking" onEdit={() => setCurrentStep(2)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <div className="text-xs text-foreground-secondary uppercase tracking-wider mb-1">Declaration Date</div>
                  <div className="text-sm font-medium">{generalInfo.declarationDate}</div>
                </div>
                <div>
                  <div className="text-xs text-foreground-secondary uppercase tracking-wider mb-1">Signatory</div>
                  <div className="text-sm font-medium">{generalInfo.signatoryName || generalInfo.exporterName}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-xs text-foreground-secondary uppercase tracking-wider mb-1">Undertaking Timeline</div>
                  <div className="text-sm">{generalInfo.realisationDueDate}</div>
                </div>
              </div>
            </ReviewSection>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300">
              ✓ Ready for generation. Click &ldquo;Generate PDF&rdquo; below to preview your official draft document, download it, or print it.
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
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
          <Button onClick={handleGeneratePDF} className="w-full md:w-auto bg-accent text-white hover:bg-accent/90 shadow-md">
            Generate Official PDF &rarr;
          </Button>
        )}
      </div>
    </div>
  );
}

function ReviewSection({ title, children, onEdit }: { title: string; children: React.ReactNode; onEdit?: () => void }) {
  return (
    <div className="border-b border-border/50 pb-6 last:border-0 last:pb-0 group">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-foreground-secondary uppercase tracking-widest">{title}</h3>
        {onEdit && (
          <button 
            type="button"
            onClick={onEdit} 
            className="text-xs font-semibold text-accent hover:underline cursor-pointer"
          >
            Edit &rarr;
          </button>
        )}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

