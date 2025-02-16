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

export const metadata: Metadata = {
  title: "Joy Chandra Uday | Full Stack Developer",
  description: "I am a passionate MERN Stack Developer specializing in building dynamic and responsive web applications",
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
