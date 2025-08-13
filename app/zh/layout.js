import localFont from "next/font/local";
import "../globals.css";
import Header from "@/ui/zh/Header";

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
  title: "合领教育 - 美国高中大学申请咨询",
  description: "专注于美国高中申请和大学录取的专业教育咨询服务",
  keywords: "美国教育, 大学申请, 高中申请, 留学咨询, 国际学生",
  openGraph: {
    title: "合领教育",
    description: "为国际学生提供顶级教育咨询服务",
    locale: "zh_CN",
    type: "website",
  },
  alternates: {
    languages: {
      'en-US': '/',
      'zh-CN': '/zh',
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <Header transparent={true} />
        {children}
      </body>
    </html>
  );
}
