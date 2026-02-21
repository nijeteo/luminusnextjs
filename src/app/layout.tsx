import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export const metadata: Metadata = {
  title: "Luminus Studio | Ekskluzivna Fotografija Nekretnina",
  description: "Profesionalno fotografisanje, snimanje, 360° ture i dron snimci nekretnina. Istaknite vašu imovinu u najboljem svetlu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <body className="bg-black min-h-screen flex flex-col font-sans text-white">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
