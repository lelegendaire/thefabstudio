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
        <meta name="google-site-verification" content="V9NcHd727ex_fH4m70oD8FXErvFVqfkp-i2E7oJOk-w" />      <head>
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
