import "./globals.css";

export const metadata = {
  title: "The Fab Studio",
  description: "A French Studio who create a site web"
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <meta name="google-site-verification" content="2l0TwK85lNJgb7JEL5G2xStf752_OqrpfDBQzNIN-Z0" />
      <body>
        {children}
      </body>
    </html>
  );
}
