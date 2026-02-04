'use client'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { preloadTexture, preloadFont } from '../../utils/preloadAssets'
import { AssetContext } from '../../context/AssetContext'
import { dirtyline } from '../fonts'
const LenisContext = createContext(null)
export const useLenis = () => useContext(LenisContext)

export const LenisProvider = ({ children }) => {
  const [lenis, setLenis] = useState(null)
  const [assets, setAssets] = useState(null)
  const lenisRef = useRef(null)

  useEffect(() => {
    async function init() {
      // 🔹 Précharge assets
      const [bgTexture] = await Promise.all([
        preloadTexture('/medias/bg_final.jpg'),
        preloadFont('/fonts/Dirtyline.ttf'),
        preloadFont('/fonts/PlayfairDisplay.ttf'),
      ])
      // 🔹 Précharge textures Team
      const teamTextures = await Promise.all([
        preloadTexture('/medias/Fabien.jpg'),
        preloadTexture('/medias/Noah.jpg'),
        preloadTexture('/medias/Rafaël.jpg'),
      ])
      setAssets({
        bgTexture,
        teamTextures
      })

      // 🔹 Init Lenis
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
    }

    init()
    return () => lenisRef.current?.destroy()
  }, [])

  if (!lenis || !assets) {
    // 🔹 Tant que Lenis n'est pas prêt OU que les assets ne sont pas chargés
    return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-sm text-neutral-500 bg-white z-50">
      {/* LCP friendly */}
      <h1 className={`${dirtyline.className} text-black text-3xl font-bold`}>The Fab Studio</h1>
      <span className='font-bold'>Préchargement…</span>
    </div>
    )
  }

  return (
    <LenisContext.Provider value={lenis}>
      <AssetContext.Provider value={assets}>
        {children}
      </AssetContext.Provider>
    </LenisContext.Provider>
  )
}
