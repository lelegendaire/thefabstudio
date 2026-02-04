'use client'
import { useEffect, useState, Children, cloneElement } from 'react'
import { motion, useAnimation } from 'framer-motion'
import styles from './loader.module.css'
import { useAssets } from '../../context/AssetContext'

export default function Loader({ children }) {
  const [maskRemoved, setMaskRemoved] = useState(false)
  const [showMask, setShowMask] = useState(false) // 🔑 Nouveau state
  const controls = useAnimation()
  const assets = useAssets()

  useEffect(() => {
    async function animate() {
      // ⏱️ Petit délai pour laisser le LCP se peindre d'abord
      await new Promise(resolve => setTimeout(resolve, 100))
      
      setShowMask(true) // Active le mask APRÈS le paint initial
      document.body.style.overflow = 'hidden'

      await controls.start({
        maskSize: '80%',
        maskPosition: 'center 50%',
        transition: { duration: 2.2, ease: 'easeInOut' },
      })
      await controls.start({
        maskSize: '2500%',
        transition: { duration: 1.2, ease: 'easeInOut' },
      })

      setMaskRemoved(true)
      document.body.style.overflow = ''
    }

    animate()
  }, [controls])

  return (
    <motion.div
      className={styles.stickyMask}
      style={
        showMask && !maskRemoved
          ? {
              WebkitMaskImage: 'url(/logo.svg)',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              WebkitMaskSize: '30%',
              maskImage: 'url(/logo.svg)',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              maskSize: '30%',
              overflow: 'hidden',
            }
          : {}
      }
      initial={showMask ? { maskSize: '30%', maskPosition: 'center -300%' } : false}
      animate={controls}
    >
      {/* Précharge le SVG sans affecter le layout */}
      <link rel="preload" href="/logo.svg" as="image" />

      {Children.map(children, (child) =>
        cloneElement(child, { isLoaded: maskRemoved, assets })
      )}
    </motion.div>
  )
}