// layout.js
import './globals.css'
import ClientLayout from './ClientLayout'

export const metadata = {
  title: "The Fab Studio",
  description: "A French Studio who create a site web"
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <meta name="google-site-verification" content="2l0TwK85lNJgb7JEL5G2xStf752_OqrpfDBQzNIN-Z0" />
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
      </head>
      <body>
         <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
