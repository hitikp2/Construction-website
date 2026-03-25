import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PhoneCTA } from "@/components/layout/PhoneCTA";
import { Preloader } from "@/components/layout/Preloader";
import "./globals.css";

export const metadata: Metadata = {
  title: "X Construction | Premier Home Remodeling in Southern California",
  description:
    "Southern California's trusted construction company. Full home remodels, custom ADUs, commercial projects, and more. Licensed, insured, and rated 4.9★. Get your free quote today.",
  keywords: [
    "construction",
    "home remodeling",
    "Southern California",
    "ADU",
    "general contractor",
    "Los Angeles",
    "Orange County",
  ],
  openGraph: {
    title: "X Construction | Premier Home Remodeling in Southern California",
    description:
      "Southern California's trusted construction company. Full home remodels, custom ADUs, commercial projects, and more. Licensed, insured, rated 4.9★.",
    url: "https://xconstruction.com",
    siteName: "X Construction",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "X Construction | Premier Home Remodeling in Southern California",
    description:
      "Southern California's trusted construction company. Licensed, insured, rated 4.9★.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if(location.hash){history.replaceState(null,"",location.pathname)}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#f0efe9] font-sans">
        <Preloader />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <PhoneCTA />
      </body>
    </html>
  );
}
