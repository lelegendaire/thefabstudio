import "./globals.css";

export const metadata = {
  title: "The Fab Studio",
  description: "A French Studio who create a site web"
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
