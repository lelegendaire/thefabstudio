// app/not-found.jsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.container}>
       <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        We are lost ?.
      </motion.h2>
        <h1>404</h1>

     

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Link href="/">
          <button className={styles.button}>Retour à l’accueil</button>
        </Link>
      </motion.div>
    </div>
  )
}
