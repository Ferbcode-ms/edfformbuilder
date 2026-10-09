import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { DocumentData } from "@/types/document";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 9,
    backgroundColor: "#ffffff",
  },
  titleRight: {
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 10,
    marginBottom: 8,
  },
  titleCenter: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 8,
    color: "#4a4a4a",
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 10,
    backgroundColor: "#f3f4f6",
    padding: 4,
    borderWidth: 1,
    borderColor: "#000",
    borderBottomWidth: 0,
  },
  grid: {
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  colHalf: {
    flex: 1,
    padding: 4,
    borderRightWidth: 1,
    borderRightColor: "#000",
  },
  colHalfNoBorder: {
    flex: 1,
    padding: 4,
  },
  colFull: {
    width: "100%",
    padding: 4,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  value: {
    color: "#333",
  },
  table: {
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  th: {
    fontWeight: "bold",
    padding: 4,
    borderRightWidth: 1,
    borderRightColor: "#000",
    fontSize: 8,
  },
  td: {
    padding: 4,
    borderRightWidth: 1,
    borderRightColor: "#000",
    fontSize: 8,
  },
  colWidths: {
    sno: { width: "3%" },
    recipient: { width: "13%" },
    country: { width: "8%" },
    invoice: { width: "9%" },
    date: { width: "8%" },
    currency: { width: "5%" },
    amount: { width: "8%" },
    net: { width: "8%" },
    contract: { width: "8%" },
    desc: { width: "12%" },
    sac: { width: "6%" },
    remarks: { width: "12%", borderRightWidth: 0 },
  },
  declarationBox: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 4,
    marginBottom: 16,
  },
  declarationText: {
    fontSize: 9,
    lineHeight: 1.4,
    marginBottom: 8,
    textAlign: "justify",
  },
  signatureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 8,
  },
  footerText: {
    fontSize: 7,
    color: "#6b7280",
    marginTop: 4,
  }
});

interface ExportDocumentPDFProps {
  data: DocumentData;
}

export function ExportDocumentPDF({ data }: ExportDocumentPDFProps) {
  const gen = data.generalInformation;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.titleRight}>Annex</Text>
        <Text style={styles.titleCenter}>Export Declaration Form</Text>
        <Text style={styles.subtitle}>Draft prepared in the layout of the Annex to RBI notification FEMA 23(R)/2026-RB.</Text>

        {/* 1. General Information */}
        <Text style={styles.sectionTitle}>1. General Information</Text>
        <View style={styles.grid}>
          <View style={styles.row}>
            <View style={styles.colHalf}>
              <Text style={styles.label}>Type of export: <Text style={styles.value}>Service</Text></Text>
            </View>
            <View style={styles.colHalfNoBorder}>
              <Text style={styles.label}>Form No.: <Text style={styles.value}>{gen.formNo}</Text></Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.colHalf}>
              <Text style={styles.label}>Exporter's Name & Address:</Text>
              <Text style={styles.value}>{gen.exporterName}</Text>
              <Text style={styles.value}>{gen.exporterAddress}</Text>
            </View>
            <View style={styles.colHalfNoBorder}>
              <Text style={styles.label}>AD code:</Text>
              <Text style={styles.value}>{gen.adCode}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.colHalf}>
              <Text style={styles.label}>IE Code:</Text>
              <Text style={styles.value}>{gen.ieCode}</Text>
              <Text style={styles.label}>GSTIN:</Text>
              <Text style={styles.value}>{gen.gstin}</Text>
              <Text style={styles.label}>PAN: <Text style={styles.value}>{gen.pan}</Text></Text>
            </View>
            <View style={styles.colHalfNoBorder}>
              <Text style={styles.label}>AD Name & Address:</Text>
              <Text style={styles.value}>{gen.adNameAddress}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.colHalf}>
              <Text style={styles.label}>Third Party name & Address (in case of third party payments for exports):</Text>
              <Text style={styles.value}>{gen.hasThirdParty ? gen.thirdPartyNameAddress : ""}</Text>
              <Text style={styles.label}>Relationship between Exporter & Third Party:</Text>
              <Text style={styles.value}>{gen.hasThirdParty ? gen.relationshipWithThirdParty : ""}</Text>
            </View>
            <View style={styles.colHalfNoBorder}>
              <Text style={styles.label}>Mode of Realisation:</Text>
              <Text style={styles.value}>{gen.modeOfRealisation}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.colFull}>
              <Text style={styles.label}>Description of Services: <Text style={styles.value}>{gen.descriptionOfServices}</Text></Text>
            </View>
          </View>
          <View style={[styles.row, { borderBottomWidth: 0 }]}>
            <View style={styles.colFull}>
              <Text style={styles.label}>Total Services value in words (INR): <Text style={styles.value}>{gen.totalServicesValueInWordsINR}</Text></Text>
            </View>
          </View>
        </View>

        {/* 2B. Details of Export Value of Services */}
        <Text style={styles.sectionTitle}>2B. Details of Export Value of Services</Text>
        <View style={styles.table}>
          <View style={[styles.row, { padding: 4 }]}>
            <Text style={{ fontSize: 8 }}>Details of services provided to multiple recipients</Text>
          </View>
          <View style={styles.tableHeader}>
            <Text style={[styles.th, styles.colWidths.sno]}>S.{"\n"}No.</Text>
            <Text style={[styles.th, styles.colWidths.recipient]}>Service recipient{"\n"}Name & Address</Text>
            <Text style={[styles.th, styles.colWidths.country]}>Country</Text>
            <Text style={[styles.th, styles.colWidths.invoice]}>Invoice{"\n"}No.</Text>
            <Text style={[styles.th, styles.colWidths.date]}>Date</Text>
            <Text style={[styles.th, styles.colWidths.currency]}>Curre{"\n"}ncy</Text>
            <Text style={[styles.th, styles.colWidths.amount]}>Amount</Text>
            <Text style={[styles.th, styles.colWidths.net]}>Net{"\n"}Realisab{"\n"}le value</Text>
            <Text style={[styles.th, styles.colWidths.contract]}>Contract{"\n"}No., if{"\n"}any, and{"\n"}Date</Text>
            <Text style={[styles.th, styles.colWidths.desc]}>Description{"\n"}of services</Text>
            <Text style={[styles.th, styles.colWidths.sac]}>SAC{"\n"}Code</Text>
            <Text style={[styles.th, styles.colWidths.remarks]}>Rema{"\n"}rks</Text>
          </View>
          {data.serviceExports.map((entry, idx) => (
            <View style={[styles.tableRow, idx === data.serviceExports.length - 1 ? { borderBottomWidth: 0 } : {}]} key={entry.id}>
              <Text style={[styles.td, styles.colWidths.sno]}>{entry.sNo}</Text>
              <Text style={[styles.td, styles.colWidths.recipient]}>{entry.recipientNameAddress}</Text>
              <Text style={[styles.td, styles.colWidths.country]}>{entry.country}</Text>
              <Text style={[styles.td, styles.colWidths.invoice]}>{entry.invoiceNo}</Text>
              <Text style={[styles.td, styles.colWidths.date]}>{entry.date}</Text>
              <Text style={[styles.td, styles.colWidths.currency]}>{entry.currency}</Text>
              <Text style={[styles.td, styles.colWidths.amount]}>{typeof entry.amount === "number" ? entry.amount.toLocaleString() : entry.amount}</Text>
              <Text style={[styles.td, styles.colWidths.net]}>{typeof entry.netRealisableValue === "number" ? entry.netRealisableValue.toLocaleString() : entry.netRealisableValue}</Text>
              <Text style={[styles.td, styles.colWidths.contract]}>{entry.contractNoAndDate}</Text>
              <Text style={[styles.td, styles.colWidths.desc]}>{entry.descriptionOfServices}</Text>
              <Text style={[styles.td, styles.colWidths.sac]}>{entry.sacCode}</Text>
              <Text style={[styles.td, styles.colWidths.remarks]}>{entry.remarks}</Text>
            </View>
          ))}
        </View>

        {/* 4. Declaration by the Exporters */}
        <Text style={styles.sectionTitle}>4. Declaration by the Exporters (All types of exports)</Text>
        <View style={styles.declarationBox}>
          <Text style={styles.declarationText}>
            I/We hereby declare that I/we @am/are the seller/consignor of the goods/ provider of services in respect of which this declaration is made and that the particulars given above are true and that the value to be received from the buyer/third party represents the export value contracted and declared above. I/We undertake that I/we have delivered/ will deliver to the authorised dealer named above the foreign exchange / Indian Rupees representing the full value of the goods/services exported as above on or before ........................ (i.e. within the period of realisation stipulated by RBI from time to time) in the manner specified in the Regulations made under the Foreign Exchange Management Act, 1999.
          </Text>
          <Text style={styles.declarationText}>
            I/We also undertake to submit the documents pertaining to exports declared in this form, to the Authorised Dealer named above, as may be required under the Act.
          </Text>
          <View style={styles.signatureRow}>
            <Text>Date:</Text>
            <Text>(Signature of Exporter)</Text>
          </View>
        </View>

        {/* 5. Space for use of Specified Authority */}
        <Text style={styles.sectionTitle}>5. Space for use of Specified Authority (Custom/SEZ/AD/STPI)</Text>
        <View style={[styles.declarationBox, { marginBottom: 4 }]}>
          <Text style={styles.declarationText}>
            Certified, on the basis of above declaration at 4, that the goods/services described above and the export value declared by the exporter in this form is as per the corresponding invoice/gist of invoices submitted and declared by the exporter.
          </Text>
          <View style={[styles.signatureRow, { marginTop: 15 }]}>
            <Text>Date:</Text>
            <Text>(Signature of Designated/Authorised officials of Custom/SEZ/Authorised Dealer/STPI)</Text>
          </View>
        </View>

        <Text style={styles.footerText}>@ Strike out whichever is not applicable. Parts 2A (goods) and 3 (exports by post or courier) do not apply to services and are left out.</Text>

      </Page>
    </Document>
  );
}
