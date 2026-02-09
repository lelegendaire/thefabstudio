// app/sections/footer/FooterAnimations.jsx
"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Switch } from "../../components/ui/switch";
import { useLanguage } from "../../../context/LanguageContext";
import { dirtyline } from "../../fonts";
export function DepthImage({ src, alt }) {
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    translateX: 0,
    translateY: 0,
  });
  const [bgPos, setBgPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const range = 15;

  const calcValue = (a, b) => (a / b) * range - range / 2;

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    const rotateY = calcValue(relX, 1);
    const rotateX = -calcValue(relY, 1);
    const translateX = -rotateY * 2;
    const translateY = -rotateX * 2;

    const bgX = rotateY * 0.45;
    const bgY = -rotateX * 0.45;

    setTransform({ rotateX, rotateY, translateX, translateY });
    setBgPos({ x: bgX, y: bgY });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0, translateX: 0, translateY: 0 });
    setBgPos({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={containerRef}
      className="image_footer absolute top-0 left-0 sm:mt-2 sm:w-110 w-50 sm:h-100 h-50 rounded-2xl overflow-hidden pointer-events-auto"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: `calc(50% + ${bgPos.x}px) calc(50% + ${bgPos.y}px)`,
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) translateX(${transform.translateX}px) translateY(${transform.translateY}px) scale(1.25)`,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        <span className="sr-only">{alt}</span>
      </motion.div>
    </motion.div>
  );
}

export function AnimatedLink({ href, children, color, target_on }) {
  return (
    <motion.a
      href={href}
      target={target_on}
      className="relative inline-block text-nowrap"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {children}
      <motion.span
        className="absolute left-0 bottom-0 h-0.5"
        style={{ backgroundColor: color }}
        variants={{
          rest: { width: 0 },
          hover: {
            width: "100%",
            transition: { duration: 0.3, ease: "easeOut" },
          },
        }}
      />
    </motion.a>
  );
}

export function AnimatedStar() {
  return (
    <motion.div
      className="star h-5 w-5 relative mt-auto"
      animate={{ rotate: [0, 10, -10, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
      >
        <g>
          <path
            d="m128 62.6-38.3 6.6c-9.9 1.7-17.6 9.6-18.9 19.6L65.4 128l-6.6-38.3c-1.7-9.9-9.6-17.6-19.6-18.9L0 65.4l38.3-6.6c9.9-1.7 17.6-9.6 18.9-19.6L62.6 0l6.6 38.3c1.7 9.9 9.6 17.6 19.6 18.9l39.2 5.4z"
            fill="#000"
          />
        </g>
      </svg>
    </motion.div>
  );
}
export function MailLink() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    // On assemble l'email côté client
    const user = "thefabstudio2";
    const domain = "gmail.com";
    setEmail(`${user}@${domain}`);
  }, []);

  return (
    <a href={`mailto:${email}`} className="underline sm:text-3xl w-full">
      {email}
    </a>
  );
}

export function LanguageSwitch() {
  const { locale, changeLocale } = useLanguage();

  return (
    <>
      <span className={locale === "en" ? "font-bold" : ""}>EN</span>
      <Switch
        checked={locale === "fr"}
        onCheckedChange={(checked) => changeLocale(checked ? "fr" : "en")}
        aria-label="Switch language"
      />
      <span className={locale === "fr" ? "font-bold" : ""}>FR</span>
    </>
  );
}
export function Description() {
  const { t } = useLanguage();
  return (
    <h3 className="sm:text-6xl text-xs mb-8 w-full">
      {t("footer.description")}
    </h3>
  );
}
export function Social() {
  const { t } = useLanguage();
  return (
    <h3 className={`${dirtyline.className} text-black text-2xl`}>
      {t("footer.social")}
    </h3>
  );
}
export function Home() {
  const { t } = useLanguage();
  return (
    <AnimatedLink color="black" href="#home_section">
      {t("footer.home")}
    </AnimatedLink>
  );
}
export function About() {
  const { t } = useLanguage();
  return (
    <AnimatedLink color="black" href="#about_section">
      {t("footer.about")}
    </AnimatedLink>
  );
}
export function Projects() {
  const { t } = useLanguage();
  return (
    <AnimatedLink color="black" href="#projects_section">
      {t("footer.projects")}
    </AnimatedLink>
  );
}
export function Team() {
  const { t } = useLanguage();
  return (
    <AnimatedLink color="black" href="#team_section">
      {t("footer.team")}
    </AnimatedLink>
  );
}
export function NeedHelp() {
  const { t } = useLanguage();
  return <h4 className="text-black">{t("footer.needHelp")}</h4>;
}
export function Rights() {
  const { t } = useLanguage();
  return <p>{t("footer.rights")}</p>;
}
export function Privacy() {
  const { t } = useLanguage();
  return (
    <AnimatedLink color="black" href="/privacy-policy">
      {t("footer.privacy")}
    </AnimatedLink>
  );
}
