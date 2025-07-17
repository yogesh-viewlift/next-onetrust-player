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
  title: "Web App",
  description: "Generated to test VL Player with OneTrust",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
          data-domain-script="b145cde4-1906-4b54-a242-0206971848a8-test"
          strategy="beforeInteractive"
          charSet="UTF-8"
        />
        <script id="optanon-wrapper" strategy="afterInteractive">
          {`function OptanonWrapper() { }`}
        </script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
