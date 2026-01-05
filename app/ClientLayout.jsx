// app/ClientLayout.jsx
"use client"

import { LenisProvider } from './context/LenisContext'
import CustomScrollbar from './components/CustomScrollBar'

export default function ClientLayout({ children }) {
  return (
    <LenisProvider>
      {children}
      <CustomScrollbar />
    </LenisProvider>
  )
}
