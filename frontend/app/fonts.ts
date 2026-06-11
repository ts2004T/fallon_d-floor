import { Inter, Space_Grotesk, Sora } from "next/font/google";

// Headings — MASTER-REDESIGN-SPEC: Sora
export const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-sora",
  display: "swap",
});

// Body / UI — MASTER-REDESIGN-SPEC: Inter
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// Metrics, scores, rankings, statistics — MASTER-REDESIGN-SPEC: Space Grotesk
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});
