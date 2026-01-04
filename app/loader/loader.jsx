'use client'
import { useEffect, useState, Children, cloneElement } from 'react'
import { motion, useAnimation } from 'framer-motion'
import styles from './loader.module.css'
import { useAssets } from '../../context/AssetContext'

export default function Loader({ children }) {
  const [maskRemoved, setMaskRemoved] = useState(false)
  const controls = useAnimation()
  const assets = useAssets() // récupère bgTexture et fonts préchargées depuis LenisProvider

  useEffect(() => {
    async function animate() {
      // 🔹 Bloque scroll pendant animation
      document.body.style.overflow = 'hidden'

      // 🎬 Animation du mask/logo
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
        !maskRemoved
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
      initial={{ maskSize: '30%', maskPosition: 'center -300%' }}
      animate={controls}
    >
      {Children.map(children, (child) =>
        cloneElement(child, { isLoaded: maskRemoved, assets })
      )}
    </motion.div>
  )
}
