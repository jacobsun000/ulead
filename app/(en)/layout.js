import localFont from "next/font/local";
import "../globals.css";
import Header from "@/ui/en/Header";
import Footer from "@/ui/en/Footer";

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Ulead Education",
  description: "Focus on US High School Application and College Admission",
  keywords: "US education, college admission, high school application, international students",
  openGraph: {
    title: "Ulead Education",
    description: "Premier educational consulting for international students",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    languages: {
      'zh-CN': '/zh',
      'en-US': '/',
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <Header />
        <div className="mt-12 lg:mt-16"></div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
