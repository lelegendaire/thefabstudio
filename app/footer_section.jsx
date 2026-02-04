"use client";
import "./style_footer.css";
import { ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { Switch } from "./components/ui/switch";
import Copy from "./components/Copy";
import { dirtyline } from "./fonts";
export function DepthImage({ src, alt }) {
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    translateX: 0,
    translateY: 0,
  });
  const [bgPos, setBgPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const range = 15; // Amplitude de la rotation en degrés

  const calcValue = (a, b) => (a / b) * range - range / 2;

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    // Position relative dans le conteneur (0 -> 1)
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    // Calcul des valeurs de transformation
    const rotateY = calcValue(relX, 1);
    const rotateX = -calcValue(relY, 1); // Inversé pour un effet naturel
    const translateX = -rotateY * 2; // Parallaxe proportionnelle
    const translateY = -rotateX * 2;

    // Background position pour l'effet de profondeur
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
      className="image_footer relative  sm:mt-2 sm:w-110 w-50 sm:h-100 h-50 rounded-2xl overflow-hidden "
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
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
export default function Footer() {
  return (
    <section
      id="project_section"
      className="sm:h-[115vh] h-full bg-white pr-4 pl-4 pt-4 relative w-full"
    >
      <div className="flex justify-between items-center">
        <h1
          className={`${dirtyline.className} w-1/2 font-bold sm:text-8xl text-3xl text-black`}
        >
          The <br></br>Fab <br></br>Studi
        </h1>
        <h1 className="font-[PlayfairDisplay] font-normal sm:text-8xl text-3xl italic absolute sm:top-50 sm:left-62 top-21.5 left-22.5">
          O
        </h1>
        <div className="droite w-1/2 flex flex-col">
          <Copy>
            <h1 className="sm:text-6xl text-xs mb-8 w-full">
              We are a french studio who developp a site web for you
            </h1>
          </Copy>
          <a
            href="mailto:thefabstudio2@gmail.com"
            className="underline sm:text-3xl w-full"
          >
            thefabstudio2@gmail.com
          </a>
        </div>
      </div>{" "}
      <div className="flex items-center justify-between gap-4 text-black text-[20px] h-5 w-full">
        <motion.div
          className="star h-5 w-5 relative mt-auto"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <svg
            version="1.1"
            id="sparkle_x5F_stars"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
          >
            <g id="row1">
              <path
                id="icon:5"
                d="m128 62.6-38.3 6.6c-9.9 1.7-17.6 9.6-18.9 19.6L65.4 128l-6.6-38.3c-1.7-9.9-9.6-17.6-19.6-18.9L0 65.4l38.3-6.6c9.9-1.7 17.6-9.6 18.9-19.6L62.6 0l6.6 38.3c1.7 9.9 9.6 17.6 19.6 18.9l39.2 5.4z"
                fill="#000"
              />
            </g>
          </svg>
        </motion.div>
        <div className="line h-0.75 w-full bg-black rounded-4xl"></div>
        <div className="date sm:mr-12.5 mr-10">
          <p className={`${dirtyline.className} text-[20px]`}>2025</p>
        </div>
      </div>
      <div className="flex justify-between items-start mt-5 h-[40vh] sm:h-[70vh]">
        <div className="flex flex-col">
          <div className="flex justify-between items-start">
            <div className="social w-1/4 list-none">
              <h1 className={`${dirtyline.className} text-black text-2xl `}>
                Social
              </h1>
              <ul>
                <li className="mt-3 sm:text-2xl text-xs">
                  <AnimatedLink
                    color="black"
                    target_on="_blank "
                    href="https://www.instagram.com/thefabstudio2/"
                  >
                    Instagram
                  </AnimatedLink>
                </li>
              </ul>
            </div>
            <div className="page w-1/4 list-none">
              <h1 className={`${dirtyline.className} text-black text-2xl `}>
                Page
              </h1>
              <ul>
                <li className="mt-3 sm:text-2xl text-xs">
                  <AnimatedLink color="black" href="#home_section">
                    Home
                  </AnimatedLink>
                </li>
                <li className="sm:text-2xl text-xs">
                  <AnimatedLink color="black" href="#about_section">
                    About us
                  </AnimatedLink>
                </li>
                <li className="sm:text-2xl text-xs">
                  <AnimatedLink color="black" href="#projects_section">
                    Projects
                  </AnimatedLink>
                </li>
                <li className="sm:text-2xl text-xs">
                  <AnimatedLink color="black" href="#team_section">
                    Team
                  </AnimatedLink>
                </li>
                <li className="sm:text-2xl text-xs">
                  <AnimatedLink color="black" href="#contact_section">
                    Contact
                  </AnimatedLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-end justify-start sm:h-50 h-40">
            <div className="flex items-center justify-center gap-3">
              <p>EN</p>
              <Switch aria-label="Changer la langue du site" />
              <p>FR</p>
            </div>
          </div>
        </div>
        <div className="flex items-start justify-start flex-col w-1/2 sm:relative absolute sm:left-0 left-40">
          <DepthImage src={"/medias/Dune_footer.jpg"} />
          <div className="absolute">
            <h1 className="text-black">Need help ?</h1>
            <button
              type="button"
              className="flex items-center justify-center gap-1 w-31 bg-black text-white rounded-2xl sm:p-3 sm:mt-3 p-1 mt-1 sm:text-base text-xs"
            >
              Contact
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center relative mt-5 pb-3 justify-between w-full text-black sm:text-base text-xs">
        <h1>&copy; 2025 TheFabStudio. All right reserved </h1>
        <h1>
          <AnimatedLink color="black" href="/privacy-policy">
            Terms & Privacy Policy
          </AnimatedLink>
        </h1>
      </div>
    </section>
  );
}
