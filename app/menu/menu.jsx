import { motion } from "framer-motion";
import { opacity, slideLeft, mountAnim } from "./anim";
import styles from "./menu.module.css";
import Link_menu from "./link";
import { useLanguage } from "../../context/LanguageContext";

import { useMemo } from "react";

export default function index({ closeMenu }) {
  const { t } = useLanguage();

  const menu = useMemo(() => t("menu.items"), [t]);
  return (
    <motion.div
      className={styles.menu}
      variants={opacity}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <div className={styles.body}>
        {menu.map((el, index) => {
          return (
            <Link_menu
              data={el}
              index_m={index}
              lien_id={el.id}
              closeL={closeMenu}
              key={el.id}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
