import "@repo/ui/globals.css";
import "./fonts.css";
import type { Metadata } from "next";
import { getSiteInfo } from "../services/api/getSiteInfo";
import { notFound } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  const siteInfo = await getSiteInfo();

  if (!siteInfo) return notFound();

  return {
    title: {
      template: `%s | ${siteInfo.name} | ${siteInfo.tagline}`,
      default: `${siteInfo.name} | ${siteInfo.tagline}`,
    },
    description: siteInfo.tagline,
    applicationName: siteInfo.name,
    referrer: "origin-when-cross-origin",
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    openGraph: {
      images: siteInfo.socialShareImage?.url,
    },
  };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
