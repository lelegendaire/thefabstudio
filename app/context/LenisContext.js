'use client'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { AssetContext } from '../../context/AssetContext'

const LenisContext = createContext(null)
export const useLenis = () => useContext(LenisContext)

export const LenisProvider = ({ children }) => {
  const [lenis, setLenis] = useState(null)
  const [assets, setAssets] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const lenisRef = useRef(null)

  useEffect(() => {
    // ✅ ÉTAPE 1 : Afficher le contenu immédiatement
    setIsReady(true)

    // ✅ ÉTAPE 2 : Charger Lenis et assets EN ARRIÈRE-PLAN (non-bloquant)
    async function loadLenisAndAssets() {
      try {
        // Lazy load Lenis uniquement quand nécessaire
        const { default: Lenis } = await import('@studio-freight/lenis')
        
        // Init Lenis AVANT de charger les assets lourds
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
        setLenis(instance)

        // ✅ ÉTAPE 3 : Précharger les assets APRÈS Lenis (non-critique)
        // Ces assets ne bloquent plus le rendu initial
        const { preloadTexture, preloadFont } = await import('../../utils/preloadAssets')
        
        const [bgTexture] = await Promise.all([
          preloadTexture('/medias/bg_final.webp'),
        ])
        
        const teamTextures = await Promise.all([
          preloadTexture('/medias/Fabien.webp'),
          preloadTexture('/medias/Noah.webp'),
          preloadTexture('/medias/Rafaël.webp'),
        ])
        
        setAssets({
          bgTexture,
          teamTextures
        })

      } catch (error) {
        console.error('Erreur chargement Lenis/Assets:', error)
        // Même en cas d'erreur, on affiche le site
        setIsReady(true)
      }
    }

    // Démarrer le chargement après un court délai pour laisser le LCP se peindre
    const timer = setTimeout(loadLenisAndAssets, 100)

    return () => {
      clearTimeout(timer)
      lenisRef.current?.destroy()
    }
  }, [])

  // ✅ AFFICHER LE CONTENU IMMÉDIATEMENT (pas d'écran de chargement bloquant)
  return (
    <LenisContext.Provider value={lenis}>
      <AssetContext.Provider value={assets}>
        {children}
      </AssetContext.Provider>
    </LenisContext.Provider>
  )
}