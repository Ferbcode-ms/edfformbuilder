import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { DocumentData } from "@/types/document";

const styles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingBottom: 32,
    paddingHorizontal: 28,
    fontFamily: "Helvetica",
    fontSize: 8.5,
    backgroundColor: "#ffffff",
    color: "#111827",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  annexBadge: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
  },
  titleCenter: {
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    fontSize: 13,
    marginBottom: 3,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 7.5,
    color: "#4b5563",
    marginBottom: 10,
    lineHeight: 1.3,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    backgroundColor: "#f3f4f6",
    paddingVertical: 3.5,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: "#000000",
    borderBottomWidth: 0,
  },
  grid: {
    borderWidth: 1,
    borderColor: "#000000",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },
  colHalf: {
    flex: 1,
    padding: 3.5,
    borderRightWidth: 1,
    borderRightColor: "#000000",
  },
  colHalfNoBorder: {
    flex: 1,
    padding: 3.5,
  },
  colFull: {
    width: "100%",
    padding: 3.5,
  },
  label: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: "#111827",
    marginBottom: 1.5,
  },
  value: {
    fontFamily: "Helvetica",
    fontSize: 8,
    color: "#1f2937",
  },
  table: {
    borderWidth: 1,
    borderColor: "#000000",
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },
  th: {
    fontFamily: "Helvetica-Bold",
    padding: 3,
    borderRightWidth: 1,
    borderRightColor: "#000000",
    fontSize: 7,
    textAlign: "center",
  },
  td: {
    padding: 3,
    borderRightWidth: 1,
    borderRightColor: "#000000",
    fontSize: 7,
  },
  colWidths: {
    sno: { width: "4%" },
    recipient: { width: "16%" },
    country: { width: "7%" },
    invoice: { width: "8%" },
    date: { width: "8%" },
    currency: { width: "6%" },
    amount: { width: "8%" },
    net: { width: "8%" },
    contract: { width: "9%" },
    desc: { width: "15%" },
    sac: { width: "6%" },
    remarks: { width: "5%", borderRightWidth: 0 },
  },
  tableTotalsRow: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    borderBottomWidth: 0,
    padding: 4,
  },
  declarationBox: {
    borderWidth: 1,
    borderColor: "#000000",
    padding: 5,
    marginBottom: 10,
  },
  declarationText: {
    fontSize: 8,
    lineHeight: 1.35,
    marginBottom: 6,
    textAlign: "justify",
  },
  signatureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 14,
    marginBottom: 4,
  },
  signatureField: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
  },
  footnoteBox: {
    marginTop: 2,
    borderTopWidth: 0.5,
    borderTopColor: "#9ca3af",
    paddingTop: 3,
  },
  footnoteText: {
    fontSize: 6.5,
    color: "#4b5563",
    lineHeight: 1.25,
  },
});

interface ExportDocumentPDFProps {
  data: DocumentData;
}

export function ExportDocumentPDF({ data }: ExportDocumentPDFProps) {
  const gen = data.generalInformation;

  // Group invoice totals by currency
  const currencyTotals: Record<string, number> = {};
  data.serviceExports.forEach((entry) => {
    const curr = (entry.currency || "USD").toUpperCase();
    const amt = typeof entry.amount === "number" ? entry.amount : parseFloat(String(entry.amount)) || 0;
    currencyTotals[curr] = (currencyTotals[curr] || 0) + amt;
  });

  const totalsString = Object.entries(currencyTotals)
    .map(([curr, total]) => `${curr} ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`)
    .join(" | ");

  return (
    <Document title={`EDF_${gen.exportType || "Service"}_${gen.exporterName || "Declaration"}`} author={gen.exporterName || "ExportForm"}>
      <Page size="A4" style={styles.page} wrap>
        
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={{ fontSize: 7, color: "#6b7280" }}>FEMA 23(R)/2026-RB Compliant Draft</Text>
          <Text style={styles.annexBadge}>Annex</Text>
        </View>

        <Text style={styles.titleCenter}>Export Declaration Form</Text>
        <Text style={styles.subtitle}>
          Draft prepared in the prescribed layout of the Annex to RBI Notification FEMA 23(R)/2026-RB for submission to Authorised Dealer bank.
          {"\n"}(User-prepared document — Not an official bank-certified endorsement)
        </Text>

        {/* 1. General Information */}
        <Text style={styles.sectionTitle}>1. General Information</Text>
        <View style={styles.grid}>
          <View style={styles.row}>
            <View style={styles.colHalf}>
              <Text style={styles.label}>
                Type of export: <Text style={styles.value}>{gen.exportType || "Service"}</Text>
              </Text>
            </View>
            <View style={styles.colHalfNoBorder}>
              <Text style={styles.label}>
                Form No.: <Text style={styles.value}>{gen.formNo || "N/A"}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.colHalf}>
              <Text style={styles.label}>Exporter's Name & Address:</Text>
              <Text style={styles.value}>{gen.exporterName || "N/A"}</Text>
              <Text style={styles.value}>{gen.exporterAddress || ""}</Text>
            </View>
            <View style={styles.colHalfNoBorder}>
              <Text style={styles.label}>AD code: <Text style={styles.value}>{gen.adCode || "N/A"}</Text></Text>
              <Text style={[styles.label, { marginTop: 3 }]}>AD Name & Address:</Text>
              <Text style={styles.value}>{gen.adNameAddress || "N/A"}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.colHalf}>
              <Text style={styles.label}>IE Code: <Text style={styles.value}>{gen.ieCode || "N/A"}</Text></Text>
              <Text style={[styles.label, { marginTop: 2 }]}>GSTIN: <Text style={styles.value}>{gen.gstin || "N/A"}</Text></Text>
              <Text style={[styles.label, { marginTop: 2 }]}>PAN: <Text style={styles.value}>{gen.pan || "N/A"}</Text></Text>
            </View>
            <View style={styles.colHalfNoBorder}>
              <Text style={styles.label}>Mode of Realisation:</Text>
              <Text style={styles.value}>{gen.modeOfRealisation || "N/A"}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.colHalf}>
              <Text style={styles.label}>Third Party name & Address (in case of third party payments for exports):</Text>
              <Text style={styles.value}>{gen.hasThirdParty && gen.thirdPartyNameAddress ? gen.thirdPartyNameAddress : "N/A"}</Text>
            </View>
            <View style={styles.colHalfNoBorder}>
              <Text style={styles.label}>Relationship between Exporter & Third Party:</Text>
              <Text style={styles.value}>{gen.hasThirdParty && gen.relationshipWithThirdParty ? gen.relationshipWithThirdParty : "N/A"}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.colFull}>
              <Text style={styles.label}>
                Description of Services: <Text style={styles.value}>{gen.descriptionOfServices || "N/A"}</Text>
              </Text>
            </View>
          </View>

          <View style={[styles.row, { borderBottomWidth: 0 }]}>
            <View style={styles.colFull}>
              <Text style={styles.label}>
                Total Services value in words (INR): <Text style={styles.value}>{gen.totalServicesValueInWordsINR || "N/A"}</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* 2B. Details of Export Value of Services */}
        <Text style={styles.sectionTitle}>2B. Details of Export Value of Services</Text>
        <View style={styles.table}>
          <View style={[styles.row, { padding: 3, backgroundColor: "#fafafa" }]}>
            <Text style={{ fontSize: 7, fontFamily: "Helvetica-Oblique", color: "#374151" }}>
              Details of services provided to multiple recipients (consolidated monthly entries)
            </Text>
          </View>
          
          <View style={styles.tableHeader} fixed>
            <Text style={[styles.th, styles.colWidths.sno]}>S.{"\n"}No.</Text>
            <Text style={[styles.th, styles.colWidths.recipient]}>Service recipient{"\n"}Name & Address</Text>
            <Text style={[styles.th, styles.colWidths.country]}>Country</Text>
            <Text style={[styles.th, styles.colWidths.invoice]}>Invoice{"\n"}No.</Text>
            <Text style={[styles.th, styles.colWidths.date]}>Invoice{"\n"}Date</Text>
            <Text style={[styles.th, styles.colWidths.currency]}>Curre{"\n"}ncy</Text>
            <Text style={[styles.th, styles.colWidths.amount]}>Invoice{"\n"}Amount</Text>
            <Text style={[styles.th, styles.colWidths.net]}>Net{"\n"}Realisab{"\n"}le value</Text>
            <Text style={[styles.th, styles.colWidths.contract]}>Contract{"\n"}No., if{"\n"}any, & Date</Text>
            <Text style={[styles.th, styles.colWidths.desc]}>Description{"\n"}of services</Text>
            <Text style={[styles.th, styles.colWidths.sac]}>SAC{"\n"}Code</Text>
            <Text style={[styles.th, styles.colWidths.remarks]}>Rema{"\n"}rks</Text>
          </View>

          {data.serviceExports.map((entry, idx) => (
            <View 
              style={[styles.tableRow, idx === data.serviceExports.length - 1 && !totalsString ? { borderBottomWidth: 0 } : {}]} 
              key={entry.id || idx}
              wrap={false}
            >
              <Text style={[styles.td, styles.colWidths.sno, { textAlign: "center" }]}>{entry.sNo || idx + 1}</Text>
              <Text style={[styles.td, styles.colWidths.recipient]}>{entry.recipientNameAddress || "N/A"}</Text>
              <Text style={[styles.td, styles.colWidths.country, { textAlign: "center" }]}>{entry.country || "N/A"}</Text>
              <Text style={[styles.td, styles.colWidths.invoice]}>{entry.invoiceNo || "N/A"}</Text>
              <Text style={[styles.td, styles.colWidths.date, { textAlign: "center" }]}>{entry.date || "N/A"}</Text>
              <Text style={[styles.td, styles.colWidths.currency, { textAlign: "center" }]}>{entry.currency || "USD"}</Text>
              <Text style={[styles.td, styles.colWidths.amount, { textAlign: "right" }]}>
                {typeof entry.amount === "number" ? entry.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : entry.amount || "0.00"}
              </Text>
              <Text style={[styles.td, styles.colWidths.net, { textAlign: "right" }]}>
                {typeof entry.netRealisableValue === "number" ? entry.netRealisableValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : entry.netRealisableValue || "0.00"}
              </Text>
              <Text style={[styles.td, styles.colWidths.contract]}>{entry.contractNoAndDate || "N/A"}</Text>
              <Text style={[styles.td, styles.colWidths.desc]}>{entry.descriptionOfServices || "N/A"}</Text>
              <Text style={[styles.td, styles.colWidths.sac, { textAlign: "center" }]}>{entry.sacCode || "N/A"}</Text>
              <Text style={[styles.td, styles.colWidths.remarks]}>{entry.remarks || ""}</Text>
            </View>
          ))}

          {totalsString && (
            <View style={styles.tableTotalsRow} wrap={false}>
              <Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold", width: "49%", textAlign: "right", paddingRight: 4 }}>
                Total Declared Invoice Value (by Currency):
              </Text>
              <Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold", width: "51%", color: "#111827" }}>
                {totalsString}
              </Text>
            </View>
          )}
        </View>

        {/* 4. Declaration by the Exporters */}
        <Text style={styles.sectionTitle}>4. Declaration by the Exporters (All types of exports)</Text>
        <View style={styles.declarationBox} wrap={false}>
          <Text style={styles.declarationText}>
            I/We hereby declare that I/we @am/are the seller/consignor of the goods/ provider of services in respect of which this declaration is made and that the particulars given above are true and that the value to be received from the buyer/third party represents the export value contracted and declared above. I/We undertake that I/we have delivered/ will deliver to the authorised dealer named above the foreign exchange / Indian Rupees representing the full value of the goods/services exported as above on or before {gen.realisationDueDate || "........................"} (i.e. within the period of realisation stipulated by RBI from time to time) in the manner specified in the Regulations made under the Foreign Exchange Management Act, 1999.
          </Text>
          <Text style={styles.declarationText}>
            I/We also undertake to submit the documents pertaining to exports declared in this form, to the Authorised Dealer named above, as may be required under the Act.
          </Text>

          <View style={styles.signatureRow}>
            <View>
              <Text style={styles.signatureField}>Date: <Text style={{ fontFamily: "Helvetica" }}>{gen.declarationDate || "........................"}</Text></Text>
              {gen.signatoryName && (
                <Text style={[styles.signatureField, { marginTop: 2 }]}>
                  Name / Signatory: <Text style={{ fontFamily: "Helvetica" }}>{gen.signatoryName}</Text>
                </Text>
              )}
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ fontSize: 7, color: "#6b7280", marginBottom: 12 }}>(Signature above)</Text>
              <Text style={styles.signatureField}>(Signature of Exporter)</Text>
            </View>
          </View>
        </View>

        {/* 5. Space for use of Specified Authority */}
        <Text style={styles.sectionTitle}>5. Space for use of Specified Authority (Custom/SEZ/AD/STPI)</Text>
        <View style={[styles.declarationBox, { marginBottom: 6 }]} wrap={false}>
          <Text style={styles.declarationText}>
            Certified, on the basis of above declaration at 4, that the goods/services described above and the export value declared by the exporter in this form is as per the corresponding invoice/gist of invoices submitted and declared by the exporter.
          </Text>
          
          <View style={[styles.signatureRow, { marginTop: 16 }]}>
            <Text style={styles.signatureField}>Date: ........................</Text>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ fontSize: 7, color: "#9ca3af", marginBottom: 10 }}>(Official stamp and signature)</Text>
              <Text style={styles.signatureField}>(Signature of Designated/Authorised officials of Custom/SEZ/Authorised Dealer/STPI)</Text>
            </View>
          </View>
        </View>

        {/* Footnote */}
        <View style={styles.footnoteBox} wrap={false}>
          <Text style={styles.footnoteText}>
            @ Strike out whichever is not applicable. Parts 2A (goods) and 3 (exports by post or courier) do not apply to services and are left out.
          </Text>
          <Text style={[styles.footnoteText, { marginTop: 1.5 }]}>
            Regulatory Note: Under Notification No. FEMA 23(R)/2026-RB, service & software exporters may file a consolidated monthly declaration within 30 days of the end of the invoice month. The prescribed realization timeframe is within 9 months from the date of export.
          </Text>
        </View>

      </Page>
    </Document>
  );
}

