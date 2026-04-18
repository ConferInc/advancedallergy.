"use client";

import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface QRCodeGeneratorProps {
  url?: string;
  size?: number;
}

export function QRCodeGenerator({ 
  url = typeof window !== 'undefined' ? window.location.origin : '',
  size = 200 
}: QRCodeGeneratorProps) {
  const [showQR, setShowQR] = useState(false);

  const formUrl = `${url}/form?type=new`;

  return (
    <div className="space-y-4">
      <Button 
        onClick={() => setShowQR(!showQR)}
        variant="outline"
        className="border-primary text-primary hover:bg-primary/10"
      >
        {showQR ? 'Hide QR Code' : '📱 Show QR Code for Waiting Room'}
      </Button>

      {showQR && (
        <div className="bg-white p-6 rounded-xl border-2 border-primary shadow-lg text-center">
          <h3 className="font-bold text-lg mb-2 text-gray-900">
            Scan to Fill Out Intake Form
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            New patients: Scan this code with your phone to begin
          </p>
          
          <div className="flex justify-center">
            <QRCodeSVG
              value={formUrl}
              size={size}
              level="H"
              includeMargin={true}
              bgColor="#ffffff"
              fgColor="#159948"
            />
          </div>

          <div className="mt-4 text-xs text-gray-500">
            <p>Advanced Allergy & Asthma Associates</p>
            <p>Fort Worth & Southlake, TX</p>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
            <p className="font-semibold">URL:</p>
            <p className="break-all">{formUrl}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Printable QR Code for physical display
export function PrintableQR({ url }: { url?: string }) {
  const formUrl = url || (typeof window !== 'undefined' ? `${window.location.origin}/form?type=new` : '');

  return (
    <div className="print-only hidden print:block">
      <div className="flex flex-col items-center p-8 border-2 border-dashed border-gray-300">
        <h2 className="text-xl font-bold text-primary mb-4">
          New Patient? Scan to Begin Your Intake
        </h2>
        <QRCodeSVG
          value={formUrl}
          size={250}
          level="H"
          includeMargin={true}
          bgColor="#ffffff"
          fgColor="#159948"
        />
        <p className="mt-4 text-sm text-gray-600 text-center max-w-md">
          Scan this QR code with your smartphone to fill out your patient intake form before your appointment.
        </p>
        <div className="mt-4 text-center">
          <p className="font-semibold">Advanced Allergy & Asthma Associates</p>
          <p className="text-sm">(817) 428-7000</p>
        </div>
      </div>
    </div>
  );
}

export default QRCodeGenerator;