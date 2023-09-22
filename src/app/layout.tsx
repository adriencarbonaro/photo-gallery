"use client";

import "./globals.css";
import { Inter } from "next/font/google";

import Navbar from "@/app/Navbar";

const inter = Inter({ subsets: ["latin"] });

interface RootProps {
  children: JSX.Element;
}

export default function RootLayout(props: RootProps) {
  return (
    <html lang="fr">
      <head>
        <title>Adrien Carbonaro Photography</title>
      </head>
      <body className={`${inter.className} root`}>
        <Navbar />
        {props.children}
      </body>
    </html>
  );
}
