import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TUGON Command Center · MAT Liliw, Laguna",
  description: "Real-time emergency management, vehicle dispatch, and cognitive decision support.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0b0f14] text-[#e9edf2] antialiased selection:bg-[#ff6b2c] selection:text-black">
        {children}
      </body>
    </html>
  );
}

