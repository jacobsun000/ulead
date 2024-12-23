import localFont from "next/font/local";
import "./globals.css";
import Header from "@/ui/Header";
import Footer from "@/ui/Footer";

const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "ULead Education",
  description: "ULead Education - Focus on US High School Application and College Admission",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <div className="mt-12 md:mt-16"></div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
