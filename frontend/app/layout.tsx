import type { Metadata } from "next";
import "./globals.css";
import { inter, spaceGrotesk, sora } from "./fonts";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Fallon d'Floor™ — Football, fact-checked.",
  description: "Separating Big Game Players from Stat Merchants.",
};

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('fallon_theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${sora.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
