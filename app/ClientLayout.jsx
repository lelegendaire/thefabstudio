// app/ClientLayout.jsx
"use client"

import { LenisProvider } from './context/LenisContext'
import CustomScrollbar from './components/CustomScrollBar'
import { LanguageProvider } from '../context/LanguageContext';
export default function ClientLayout({ children }) {
  return (
    <LenisProvider>
       <LanguageProvider>
          {children}
        </LanguageProvider>
      <CustomScrollbar />
    </LenisProvider>
  )
}
