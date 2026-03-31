import MainTheWeeknd from "./mainTheWeeknd"

export const metadata = {
  title: "The Weeknd — Immersive Experience",
  description: "Immersive page dedicated to The Weeknd",
  openGraph: {
    title: "The Weeknd — Immersive Experience",
    description:
      "Immersive page dedicated to The Weeknd",
    url: "https://thefabstudio.vercel.app/the_weeknd",
    siteName: "The Weeknd — Immersive Experience",
    images: [
      {
        url: "https://thefabstudio.vercel.app/og-image-theweeknd.webp",
        width: 1200,
        height: 630,
        alt: "The Weeknd",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://thefabstudio.vercel.app/the_weeknd",
  },
};

// ─── COMPONENT ─────────────────────────────────────────────────────────────────
export default function TheWeeknd() {
 return (
 <MainTheWeeknd/>
 
)
}