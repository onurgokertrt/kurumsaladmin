"use client";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "TRT Kurumsal Portal Yönetim Ekranı",
  description: "TRT Kurumsal Portal Yönetim Ekranı",
};


export default function NoauthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center items-center min-h-screen">
      <main>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
