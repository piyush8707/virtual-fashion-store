import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Yahan import path change kiya hai taaki error na aaye
import Navbar from "../components/Navbar"; 

// Fonts setup
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-heading" 
});

export const metadata: Metadata = {
  title: "AURA | 3D Virtual Fitting",
  description: "Experience the future of fashion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased selection:bg-magicAccent selection:text-white`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}