'use client'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from '@studio-freight/lenis'

const LenisContext = createContext(null)
export const useLenis = () => useContext(LenisContext)

export const LenisProvider = ({ children }) => {
  const [lenis, setLenis] = useState(null)
  const lenisRef = useRef(null)

  useEffect(() => {
    // 🔹 Création du Lenis
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 2,
    })

    const raf = (time) => {
      instance.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenisRef.current = instance
    setLenis(instance) // ✅ Une fois prêt, on met à jour le state

    return () => instance.destroy()
  }, [])

  // 🔹 Tant que Lenis n'est pas prêt, on ne rend rien
  if (!lenis) {
    return (
      <div className="fixed inset-0 flex items-center justify-center text-sm text-neutral-500">
        Initialisation du scroll...
      </div>
    )
  }

  // 🔹 Quand il est prêt, on rend les enfants
  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
