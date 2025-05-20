import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import { GuestSessionProvider } from "@/providers/GuestSessionContext";

export const metadata: Metadata = {
  title: "My Movies App",
  description: "Movies app for React course",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <GuestSessionProvider>
          <Header />
          <main className="p-6">{children}</main>
        </GuestSessionProvider>
      </body>
    </html>
  );
}

// este va a ser el contenedor de todas nuestras páginas

//La forma en que se nombre la carpeta va a ser el path que utilice la url
