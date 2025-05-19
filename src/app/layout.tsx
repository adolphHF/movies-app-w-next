import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";

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
        {/* Si aqui quisieramos poner un header, se estaría repitiendo en toddas las paginas */}
        <Header />
        {children}
      </body>
    </html>
  );
}

// este va a ser el contenedor de todas nuestras páginas

//La forma en que se nombre la carpeta va a ser el path que utilice la url
