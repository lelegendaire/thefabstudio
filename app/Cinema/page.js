
import MainCinema from "./mainCinema";

export const metadata = {
  title: "StudioFilm — Discovers the 7th Art of our world",
  description: "Fan page dedicated to beauty of cinema",
   openGraph: {
    title: "StudioFilm — Discovers the 7th Art of our world",
    description:
      "Fan page dedicated to beauty of cinema",
    url: "https://thefabstudio.vercel.app/cinema",
    siteName: "StudioFilm — Discovers the 7th Art of our world",
    images: [
      {
        url: "https://thefabstudio.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "StudioFilm",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://thefabstudio.vercel.app/cinema",
  },
};


export default function CinemaPage() {
 
  return (
    
    <MainCinema/>
  );
};

