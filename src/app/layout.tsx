import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { I18nProvider } from "@/lib/i18n";
import "./globals.css";

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Patient Intake | Advanced Allergy & Asthma Associates",
  description: "Patient intake forms for Advanced Allergy & Asthma Associates in Fort Worth and Southlake, TX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} font-sans antialiased`}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}