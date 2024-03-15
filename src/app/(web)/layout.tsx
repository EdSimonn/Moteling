/** @format */
"use client";

import Header from "@/components/Header/Header";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import { NextAuthProvider } from "@/components/AuthProvider/AuthProvider";
import Toast from "@/components/Toast/Toast";
import React from "react";
import { barlow } from "@/utils/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
          crossOrigin='anonymous'
        />
      </head>
      <body className={`${barlow}`}>
        <NextAuthProvider>
          <Toast />
          <main className=''>
            <Header />
            {children}
            <div className='w-full h-[100%] bg-banner2 bg-center bg-cover bg-gray-900 bg-blend-multiply'>
              <Footer />
            </div>
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
