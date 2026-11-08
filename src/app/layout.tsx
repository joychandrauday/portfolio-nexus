import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";
import SideBarHome from "@/components/shared/Sidebar";
import Providers from "@/lib";
import SessionProviders from "@/lib/sessionProviders";

const MAIN_SITE = "https://joychandrauday.vercel.app";

/**
 * This site is an archived portfolio. It is intentionally excluded from search
 * indexes and canonicalises to the current portfolio so the two never compete
 * for the same queries. Crawling stays enabled so the noindex directive is seen.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://joychandrauday-nexus.vercel.app"),
  title: "Joy Chandra Uday — Archived Portfolio",
  description:
    "Archived portfolio of Joy Chandra Uday. The current portfolio, projects and writing live at joychandrauday.vercel.app.",
  keywords: ["Joy Chandra Uday", "archived portfolio", "MERN stack developer"],
  authors: [{ name: "Joy Chandra Uday", url: MAIN_SITE }],
  creator: "Joy Chandra Uday",
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
  alternates: {
    canonical: MAIN_SITE,
  },
  openGraph: {
    type: "website",
    title: "Joy Chandra Uday — Archived Portfolio",
    description:
      "This portfolio has moved. Visit joychandrauday.vercel.app for the current work of Joy Chandra Uday.",
    url: MAIN_SITE,
    siteName: "Joy Chandra Uday",
    images: [
      {
        url: `${MAIN_SITE}/og`,
        width: 1200,
        height: 630,
        alt: "Joy Chandra Uday — Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@joychandrauday",
    creator: "@joychandrauday",
    title: "Joy Chandra Uday — Archived Portfolio",
    description:
      "This portfolio has moved. Visit joychandrauday.vercel.app for the current work of Joy Chandra Uday.",
    images: [`${MAIN_SITE}/og`],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en" data-theme="light">
      <SessionProviders>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <body>
              <div className="w-full bg-black text-white text-center text-sm px-4 py-2">
                <p>
                  This is an archived portfolio.{" "}
                  <a
                    href={MAIN_SITE}
                    className="font-semibold underline decoration-2 underline-offset-2 hover:text-emerald-400"
                  >
                    Visit the current portfolio of Joy Chandra Uday →
                  </a>
                </p>
              </div>
              <Navbar session={session ? session : null} />
              <div className="flex">
                <SideBarHome />
                <main className="min-h-screen pl-32 flex-1 pt-12">{children}</main>
              </div>
              <Footer />
              <Toaster />
            </body>
          </ThemeProvider >
        </Providers >
      </SessionProviders>
    </html >
  );
}
