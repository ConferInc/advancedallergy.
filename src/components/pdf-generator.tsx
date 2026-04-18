"use client";

import { useState } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';

// PDF Styles matching the original form
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: '#159948',
    paddingBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#159948',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#0f6c33',
  },
  section: {
    marginBottom: 15,
    borderBottom: 0.5,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
    padding: 5,
    marginBottom: 8,
    color: '#0a0a0a',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    width: '35%',
    color: '#616060',
  },
  value: {
    width: '65%',
  },
  twoColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '48%',
  },
  checkboxSection: {
    marginTop: 5,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  checkbox: {
    width: 10,
    height: 10,
    borderWidth: 0.5,
    borderColor: '#000',
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    width: 6,
    height: 6,
    backgroundColor: '#159948',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#616060',
  },
  signatureBox: {
    borderTop: 1,
    borderTopColor: '#000',
    marginTop: 20,
    paddingTop: 5,
  },
});

// PDF Document Component
function IntakePDF({ data, visitType }: { data: any; visitType: string }) {
  const demographics = data.demographics || {};
  const insurance = data.insurance || {};
  const chiefComplaint = data.chiefComplaint || {};
  const ros = data.reviewOfSystems || {};
  const pmh = data.pastMedicalHistory || {};
  const fh = data.familyHistory || {};
  const sh = data.socialHistory || {};
  const meds = data.medications || {};
  const allergies = data.allergies || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Advanced Allergy & Asthma Associates</Text>
          <Text style={styles.subtitle}>Patient Intake Form - {visitType === 'new' ? 'New Patient' : 'Follow-Up Visit'}</Text>
        </View>

        {/* Patient Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <View style={styles.twoColumn}>
            <View style={styles.column}>
              <View style={styles.row}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{demographics.lastName}, {demographics.firstName} {demographics.middleInitial || ''}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Date of Birth:</Text>
                <Text style={styles.value}>{demographics.dob || 'N/A'}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Sex:</Text>
                <Text style={styles.value}>{demographics.sex || 'N/A'}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{demographics.phone || 'N/A'}</Text>
              </View>
            </View>
            <View style={styles.column}>
              <View style={styles.row}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{demographics.email || 'N/A'}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.value}>
                  {demographics.address ? 
                    `${demographics.address.street}, ${demographics.address.city}, ${demographics.address.state} ${demographics.address.zip}` 
                    : 'N/A'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Chief Complaint */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chief Complaint / Reason for Visit</Text>
          <Text>{chiefComplaint.reasonForVisit || 'N/A'}</Text>
          {chiefComplaint.pharmacy && (
            <Text style={{ marginTop: 5 }}>Pharmacy: {chiefComplaint.pharmacy}</Text>
          )}
        </View>

        {/* Insurance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insurance Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Primary Insurance:</Text>
            <Text style={styles.value}>{insurance.primary?.insurer || 'N/A'} (ID: {insurance.primary?.idNumber || 'N/A'})</Text>
          </View>
        </View>

        {/* Current Medications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Medications</Text>
          {meds.none ? (
            <Text>None</Text>
          ) : meds.medications && meds.medications.length > 0 ? (
            meds.medications.map((med: any, i: number) => (
              <View key={i} style={styles.row}>
                <Text>{med.medication} {med.strength ? `(${med.strength})` : ''} - {med.frequency} - {med.reason}</Text>
              </View>
            ))
          ) : (
            <Text>None listed</Text>
          )}
        </View>

        {/* Review of Systems Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Review of Systems - Positive Findings</Text>
          {Object.entries(ros).map(([category, data]: [string, any]) => {
            if (!data || data.none || !data.selected || data.selected.length === 0) return null;
            const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
            return (
              <View key={category} style={{ marginBottom: 5 }}>
                <Text style={{ fontWeight: 'bold' }}>{categoryName}:</Text>
                <Text>{data.selected.join(', ')}</Text>
              </View>
            );
          })}
        </View>

        {/* Signature */}
        <View style={styles.signatureBox}>
          <Text>Signature: {data.consent?.signatureName || 'N/A'}</Text>
          <Text>Date: {data.consent?.signatureDate || new Date().toLocaleDateString()}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Advanced Allergy & Asthma Associates | Fort Worth & Southlake, TX | (817) 428-7000</Text>
          <Text>Submitted on: {new Date().toLocaleString()}</Text>
        </View>
      </Page>
    </Document>
  );
}

// Download Button Component
export function PDFDownloadButton({ data, visitType, filename = 'intake-form.pdf' }: { 
  data: any; 
  visitType: string; 
  filename?: string;
}) {
  const [isClient, setIsClient] = useState(false);

  // Only render PDF link on client side
  if (typeof window !== 'undefined' && !isClient) {
    setIsClient(true);
  }

  if (!isClient) {
    return (
      <Button disabled variant="outline">
        Loading PDF...
      </Button>
    );
  }

  return (
    <PDFDownloadLink
      document={<IntakePDF data={data} visitType={visitType} />}
      fileName={filename}
      style={{ textDecoration: 'none' }}
    >
      {({ loading }) => (
        <Button 
          disabled={loading}
          className="bg-primary hover:bg-primary-dark text-white"
        >
          {loading ? 'Generating PDF...' : '📄 Download PDF'}
        </Button>
      )}
    </PDFDownloadLink>
  );
}

export { IntakePDF };
