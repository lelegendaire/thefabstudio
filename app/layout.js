// layout.js
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { satoshi } from "./fonts";

export const metadata = {
  title: {
    default: "The Fab Studio — Creative Web Experiences",
    template: "%s | The Fab Studio",
  },
  description:
    "The Fab Studio is a creative web studio crafting immersive, high-end digital experiences through design, motion and code.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "The Fab Studio",
    description:
      "A creative web studio crafting immersive, premium and accessible digital experiences.",
    url: "https://thefabstudio.vercel.app",
    siteName: "The Fab Studio",
    images: [
      {
        url: "https://thefabstudio.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Fab Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="V9NcHd727ex_fH4m70oD8FXErvFVqfkp-i2E7oJOk-w"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="The Fab Studio is a creative web studio crafting immersive, high-end digital experiences through design, motion and code."
        ></meta>
        <meta name="p:domain_verify" content="7fcec066234cdf827a7e92cf2b52bfaa"/>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />

        <link rel="canonical" href="https://thefabstudio.vercel.app/"></link>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "The Fab Studio",
            url: "https://thefabstudio.vercel.app/",
          })}
        </script>
      </head>

      <body className={satoshi.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
