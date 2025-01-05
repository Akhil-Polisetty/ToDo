import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "To Do List",
  description: "Generated fo craetung a task tracker using Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#000000]  bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]`}
      >
        {children}
      </body>
    </html>
  );
}
