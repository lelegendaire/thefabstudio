
import MainAtlantas from "./mainAtlantas"


export const metadata = {
  title: "Atlantas — The product of your dreams",
  description: "Incredible page dedicated to our product Atlantas",
   openGraph: {
    title: "Atlantas — The product of your dreams",
    description:
      "Incredible page dedicated to our product Atlantas",
    url: "https://thefabstudio.vercel.app/atlantas",
    siteName: "Atlantas — The product of your dreams",
    images: [
      {
        url: "https://thefabstudio.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Atlantas",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://thefabstudio.vercel.app/atlantas",
  },
};

export default function PageAtlantas(){
    return (
        <MainAtlantas/>
    )
}