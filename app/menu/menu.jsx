
import { motion } from 'framer-motion';
import { opacity, slideLeft, mountAnim } from './anim';
import styles from './menu.module.css';
import Link from './link';
import { X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';



export default function index({closeMenu}) {
      const { t } = useLanguage();
const menu = t('menu.items');
  return (
    <motion.div className={styles.menu} variants={opacity} initial="initial" animate="enter" exit="exit">

        <div className={styles.header} >
         <X  onClick={() => {closeMenu()}} color='white' />
        </div>
<div className={styles.body}>
          {
            menu.map( (el, index) => {
              return <Link data={el} index={index} key={index} lien_id={el.id} closeL={closeMenu}/>
            })
          }
        </div>
       

       

    </motion.div>
  )
}