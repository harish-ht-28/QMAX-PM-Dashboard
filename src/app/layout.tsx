import { Sidebar } from "../components/Sidebar";
import "./globals.css";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>QMAX Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <Sidebar />
          <main className="ml-64 p-9 min-h-screen" style={{ flex: 1 }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
