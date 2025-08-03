'use client'
import Image from "next/image";

import { useEffect, useState, Children, cloneElement } from 'react'
import { motion, useAnimation  } from 'framer-motion'
import styles from './loader.module.css'

export default function Loader({ children }) {
 const [maskRemoved, setMaskRemoved] = useState(false)
 const controls = useAnimation()

  useEffect(() => {
    async function sequence() {
      // ✅ Remet la page en haut au refresh
    window.scrollTo(0, 0);

    // ✅ Reset le mask
    setMaskRemoved(false);
      // ✅ Bloque le scroll
    document.body.style.overflow = "hidden";
      await controls.start({
        maskSize: "80%",
        maskPosition: "center 50%",
        transition: { duration: 3, ease: 'easeInOut' },
      })
      await new Promise(resolve => setTimeout(resolve, 100))
      await controls.start({
        maskSize: "2500%",
        transition: { duration: 1.5, ease: 'easeInOut' },
      })
     setTimeout(() => {
        setMaskRemoved(true)
         // ✅ Réactive le scroll
      document.body.style.overflow = "";
      }, 1500)
    }

    sequence()
  }, [controls])
const maskStyle = !maskRemoved
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


  return (
    <>
   <motion.div 
  className={styles.stickyMask}
  style={maskStyle}
  id="home"
  initial={{
    maskSize: "30%",
    maskPosition: "center -300%",
    scale: 1
  }}
  animate={controls}
>
  {Children.map(children, (child) =>
        cloneElement(child, { isLoaded: maskRemoved })
      )}
</motion.div>

    </>
  )
}
