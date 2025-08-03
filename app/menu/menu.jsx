import { motion } from 'framer-motion';
import { opacity, slideLeft, mountAnim } from './anim';
import styles from './menu.module.css';
import { useState } from 'react';
import Link from './link';
import { X } from 'lucide-react';

const menu = [
  {
    title: "Home",
    description: "To return home",
    id_lien: "#home"
  },
 {
    title: "About us",
    description: "To learn more about us",
    id_lien: "#about_section"

  },
  {
    title: "Projects",
    description: "To discover our projects",
    id_lien: "#project_section"

  },
  
  {
    title: "Team",
    description: "To know who create your site",
    id_lien: "#team_section"

  },
  {
    title: "Contact",
    description: "To collaborate with us",
    id_lien: "#contact_section"

  }
]

export default function index({closeMenu}) {

  return (
    <motion.div className={styles.menu} variants={opacity} initial="initial" animate="enter" exit="exit">

        <div className={styles.header} >
         <X  onClick={() => {closeMenu()}} color='white' />
        </div>
<div className={styles.body}>
          {
            menu.map( (el, index) => {
              return <Link data={el} index={index} key={index} lien_id={el.id_lien} closeL={closeMenu}/>
            })
          }
        </div>
       

       

    </motion.div>
  )
}