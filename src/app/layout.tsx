"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Navbar from "@/app/Navbar";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface RootProps {
  children: React.ReactNode;
}

export default function RootLayout(props: RootProps) {
  const [lang, setLang] = useState("fr");

  return (
    <html lang="fr">
      <head>
        <title>Adrien Carbonaro Photography</title>
      </head>
      <body className={`${inter.className} root`}>
        <Navbar lang={lang} />
        {props.children}
      </body>
    </html>
  );
}
