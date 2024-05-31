import NavBar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Student Burger",
  description: "Nul food e-shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavBar />
          <main className="m-3 flex flex-col justify-between sm:mx-auto sm:w-[620px] md:w-[720px] lg:w-[1000px] xl:w-[1200px]">
            {children}
          </main>
          <footer className="pt-20 pb-10 px-5">
            <p>
              You will get a message from this WhatsApp number:+266 58967429 
              / +266 62510192 Notifying you when to collect your finished order
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
