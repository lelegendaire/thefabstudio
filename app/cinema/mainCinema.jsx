"use client";
import React, { useEffect, useRef, useState } from "react";
import { LampContainer } from "../components/ui/lamp";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/flip";
import { useLenis } from "../context/LenisContext";
import { dirtyline } from "../fonts";
import CopyBlur from "../components/CopyBlur"
import setupMarqueeAnimation from "./marquee.js";

export default function MainCinema(){
  const [mousePos, setMousePos]         = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos]       = useState({ x: 0, y: 0 });
  const [displacement, setDisplacement] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize]     = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted]       = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const spotlightRef                    = useRef(null);

  const cursorRef    = useRef(null);
  const rafRef       = useRef(null);
  const lenis        = useLenis();

  // ── Composition section ───────────────────────────────────────────────────
  const cardsRef     = useRef(null);
  const introCardRef = useRef(null);

  // ── Film marquee + horizontal scroll (tous en refs pour éviter querySelector) ─
  const filmMarqueeRef      = useRef(null);  // <section> de la marquee film
  const marqueeImagesRef    = useRef(null);  // div.marquee-images
  const horizontalScrollRef = useRef(null);  // <section> horizontal-scroll
  const hScrollWrapperRef   = useRef(null);  // div wrapper 300%
  const marqueeImgPinRef    = useRef(null);  // img à cloner pour le Flip

  // ── Flip / clone state ────────────────────────────────────────────────────
  const pinnedMarqueeImgCloneRef = useRef(null);
  const isImgCloneActiveRef      = useRef(false);
  const flipAnimationRef         = useRef(null);

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  // ─── useEffect 1 : Cards (Composition) ────────────────────────────────────
  useEffect(() => {
    if (!isMounted) return; // attend le vrai DOM

    const id = setTimeout(() => {
      if (!cardsRef.current || !introCardRef.current) return;

      gsap.registerPlugin(ScrollTrigger, SplitText, Flip);

      const cards     = cardsRef.current.querySelectorAll(".card");
      const introCard = introCardRef.current;
      const titles    = introCardRef.current.querySelectorAll(".card-title h1");

      titles.forEach((title) => {
        const split = new SplitText(title, { type: "char", charsClass: "char", tag: "div" });
        split.chars.forEach((char) => {
          char.innerHTML = `<span>${char.textContent}</span>`;
        });
      });

      const cardImgWrapper = introCard.querySelector(".card-img");
      const cardImg        = introCard.querySelector(".card-img .image_film");
      gsap.set(cardImgWrapper, { scale: 0.5, borderRadius: "400px" });
      gsap.set(cardImg, { scale: 1.5 });

      function animateContentIn(titleChars, description) {
        gsap.to(titleChars,  { x: "0%",   duration: 0.75, ease: "power4.out" });
        gsap.to(description, { x: 0, opacity: 1, duration: 0.75, delay: 0.1, ease: "power4.out" });
      }
      function animateContentOut(titleChars, description) {
        gsap.to(titleChars,  { x: "100%", duration: 0.5, ease: "power4.out" });
        gsap.to(description, { x: "40px", opacity: 0, duration: 0.5, ease: "power4.out" });
      }

      // .marquee ici est scoped via introCard.querySelector → pas de conflit global
      const marqueeEl  = introCard.querySelector(".card-marquee .marquee");
      const titleChars = introCard.querySelectorAll(".char span");
      const description = introCard.querySelector(".card-description");

      const triggers = [];

      triggers.push(
        ScrollTrigger.create({
          trigger: introCard,
          start: "top top",
          end: "+=300vh",
          onUpdate: (self) => {
            const p             = self.progress;
            const imgScale      = 0.5 + p * 0.5;
            const borderRadius  = 400 - p * 375;
            const innerImgScale = 1.5 - p * 0.5;

            gsap.set(cardImgWrapper, { scale: imgScale, borderRadius: borderRadius + "px" });
            gsap.set(cardImg, { scale: innerImgScale });

            if (imgScale >= 0.5 && imgScale <= 0.75) {
              gsap.set(marqueeEl, { opacity: 1 - (imgScale - 0.5) / 0.25 });
            } else if (imgScale < 0.5) {
              gsap.set(marqueeEl, { opacity: 1 });
            } else {
              gsap.set(marqueeEl, { opacity: 0 });
            }

            if (p >= 1 && !introCard.contentRevealed) {
              introCard.contentRevealed = true;
              animateContentIn(titleChars, description);
            }
            if (p < 1 && introCard.contentRevealed) {
              introCard.contentRevealed = false;
              animateContentOut(titleChars, description);
            }
          },
        })
      );

      cards.forEach((card, index) => {
        const isLastCard = index === cards.length - 1;
        triggers.push(
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            end: isLastCard ? "+=100vh" : "to top",
            endTrigger: isLastCard ? null : cards[cards.length - 1],
            pin: true,
            pinSpacing: isLastCard,
            
          })
        );
      });

      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          const cardWrapper = card.querySelector(".card-wrapper");
          triggers.push(
            ScrollTrigger.create({
              trigger: cards[index + 1],
              start: "top bottom",
              end: "top top",
              onUpdate: (self) => {
                gsap.set(cardWrapper, { scale: 1 - self.progress * 0.25, opacity: 1 - self.progress });
              },
            })
          );
        }
      });

      cards.forEach((card, index) => {
        if (index > 0) {
          const img          = card.querySelector(".card-img .image_film");
          const imgContainer = card.querySelector(".card-img");
          triggers.push(
            ScrollTrigger.create({
              trigger: card,
              start: "top bottom",
              end: "top top",
              onUpdate: (self) => {
                gsap.set(img,          { scale: 2 - self.progress });
                gsap.set(imgContainer, { borderRadius: 150 - self.progress * 125 + "px" });
              },
            })
          );
        }
      });

      cards.forEach((card, index) => {
        if (index === 0) return;
        const cardDescription = card.querySelector(".card-description");
        const cardTitleChars  = card.querySelectorAll(".char span");
        triggers.push(
          ScrollTrigger.create({
            trigger: card,
            start: "top bottom",
            onEnter:     () => animateContentIn(cardTitleChars, cardDescription),
            onLeaveBack: () => animateContentOut(cardTitleChars, cardDescription),
          })
        );
      });

      setupMarqueeAnimation();

      return () => triggers.forEach((st) => st.kill());
    }, 0);

    return () => clearTimeout(id);
  }, [isMounted]);

  // ─── useEffect 2 : Film marquee parallax + Horizontal scroll + Flip ───────
  useEffect(() => {
    if (!isMounted) return;

    const id = setTimeout(() => {
      if (
        !filmMarqueeRef.current    ||
        !marqueeImagesRef.current  ||
        !horizontalScrollRef.current ||
        !hScrollWrapperRef.current ||
        !marqueeImgPinRef.current
      ) return;

      gsap.registerPlugin(ScrollTrigger, Flip);

      const triggers = [];

      // ── Clone helpers ──────────────────────────────────────────────────────
      function createPinnedMarqueeImgClone() {
        if (isImgCloneActiveRef.current) return;

        const originalImg = marqueeImgPinRef.current;
        const rect        = originalImg.getBoundingClientRect();
        const clone       = originalImg.cloneNode(true);

        gsap.set(clone, {
          position: "fixed",
          left: rect.left + "px",
          top:  rect.top  + "px",
          width:  rect.width  + "px",
          height: rect.height + "px",
          transform: "rotate(-5deg)",
          transformOrigin: "center center",
          pointerEvents: "none",
          willChange: "transform",
          zIndex: 100,
        });

        document.body.appendChild(clone);
        gsap.set(originalImg, { opacity: 0 });
        pinnedMarqueeImgCloneRef.current = clone;
        isImgCloneActiveRef.current = true;
      }

      function removePinnedMarqueeImgClone() {
        if (!isImgCloneActiveRef.current) return;
        pinnedMarqueeImgCloneRef.current?.remove();
        pinnedMarqueeImgCloneRef.current = null;
        gsap.set(marqueeImgPinRef.current, { opacity: 1 });
        isImgCloneActiveRef.current = false;
      }

      // ── 1. Parallax marquee images ─────────────────────────────────────────
      triggers.push(
        ScrollTrigger.create({
          trigger: filmMarqueeRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
          onUpdate: (self) => {
            gsap.set(marqueeImagesRef.current, { x: `${-75 + self.progress * 25}%` });
          },
        })
      );

      // ── 2. Pin section horizontal ──────────────────────────────────────────
      triggers.push(
        ScrollTrigger.create({
          trigger: horizontalScrollRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 5}`,
          pin: true,
          pinSpacing: true,
          pinType: "transform",
        })
      );

      // ── 3. Créer clone quand la marquee atteint le haut ───────────────────
      triggers.push(
        ScrollTrigger.create({
          trigger: filmMarqueeRef.current,
          start: "top top",
          onEnter:     createPinnedMarqueeImgClone,
          onEnterBack: createPinnedMarqueeImgClone,
          onLeaveBack: removePinnedMarqueeImgClone,
        })
      );

      // ── 4. Setup animation Flip ────────────────────────────────────────────
      triggers.push(
        ScrollTrigger.create({
          trigger: horizontalScrollRef.current,
          start: "top 50%",
          end: () => `+=${window.innerHeight * 5.5}`,
          onEnter: () => {
            const clone = pinnedMarqueeImgCloneRef.current;
            if (!clone) return;

            const state = Flip.getState(clone);
            gsap.set(clone, {
              position: "fixed",
              left: "0px", top: "0px",
              width: "100%", height: "100svh",
              transform: "rotate(0deg)",
              transformOrigin: "center center",
            });
            flipAnimationRef.current = Flip.from(state, { duration: 1, ease: "none", paused: true });
          },
          onLeaveBack: () => {
            flipAnimationRef.current?.kill();
            flipAnimationRef.current = null;
            gsap.set(hScrollWrapperRef.current, { x: "0%" });
          },
        })
      );

      // ── 5. onUpdate : Flip → scroll horizontal ─────────────────────────────
      triggers.push(
        ScrollTrigger.create({
          trigger: horizontalScrollRef.current,
          start: "top 50%",
          end: () => `+=${window.innerHeight * 5.5}`,
          onUpdate: (self) => {
            const p     = self.progress;
            const clone = pinnedMarqueeImgCloneRef.current;
            const flip  = flipAnimationRef.current;

            if (p <= 0.2) {
              if (flip) flip.progress(p / 0.2);
            } else if (p <= 0.95) {
              if (flip) flip.progress(1);
              const hp = (p - 0.2) / 0.75;
              gsap.set(hScrollWrapperRef.current, { x: `${-66.67 * hp}%` });
              if (clone) gsap.set(clone, { xPercent: `${-(66.67 / 100) * 3 * hp * 100}` });
             
            } else {
              if (flip) flip.progress(1);
              if (clone) gsap.set(clone, { x: "-200%" });
              gsap.set(hScrollWrapperRef.current, { x: "-66.67%" });
            }
          },
        })
      );

      return () => {
        triggers.forEach((st) => st.kill());
        removePinnedMarqueeImgClone();
        flipAnimationRef.current?.kill();
        flipAnimationRef.current = null;
      };
    }, 0);

    return () => clearTimeout(id);
  }, [isMounted]);

  // ─── useEffect 3 : Curseur + displacement ─────────────────────────────────
  useEffect(() => {
    setIsMounted(true);
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize    = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      setCursorPos((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.15,
        y: prev.y + (mousePos.y - prev.y) * 0.15,
      }));
      if (windowSize.width > 0) {
        const cx = windowSize.width / 2;
        const cy = windowSize.height / 2;
        setDisplacement((prev) => ({
          x: prev.x + ((mousePos.x - cx) / cx * 30 - prev.x) * 0.15,
          y: prev.y + ((mousePos.y - cy) / cy * 30 - prev.y) * 0.15,
        }));
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mousePos, windowSize.width, windowSize.height]);

  // ─── Film marquee data ────────────────────────────────────────────────────
  const marqueeFilms = [
    { src: "/medias/Cinema/img0.webp", title: "Stalker",          year: "1979", director: "A. Tarkovsky" },
    { src: "/medias/Cinema/img1.webp", title: "La Dolce Vita",    year: "1960", director: "F. Fellini"   },
    { src: "/medias/Cinema/img2.webp", title: "Apocalypse Now",   year: "1979", director: "F.F. Coppola" },
    { src: "/medias/Cinema/img3.webp", title: "Eyes Wide Shut",   year: "1999", director: "S. Kubrick"   },
  ];

  // ─── SSR fallback ─────────────────────────────────────────────────────────
  if (!isMounted) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "url('/medias/Cinema/blade_runner.webp')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-black/30" />
        <section className="relative z-10 min-h-screen p-8 flex items-center justify-center">
          <h1 className="text-9xl font-bold text-white font-[boska]">BEAUTY OF CINEMA</h1>
          <img className="absolute" src="/medias/Cinema/Runner.webp" alt="Runner" />
        </section>
      </div>
    );
  }

  const transformStyle = isMobile
    ? "scale(1.05)"
    : `translate(${displacement.x}px, ${displacement.y}px) scale(1.1)`;

  return (
    <section className="Cinema_page h-full">
      <link href="https://api.fontshare.com/v2/css?f[]=zodiak@401&f[]=boska@500&f[]=montserrat@400&f[]=melodrama@500&display=swap" rel="stylesheet" />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="relative min-h-screen overflow-hidden cursor-none">
        <div className="absolute inset-0" style={{ transform: transformStyle, backgroundImage: "url('/medias/Cinema/Blade_runner.webp')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-black/30" />

        <section className="relative min-h-screen p-8 flex items-center justify-center w-full">
          <div className="absolute w-full top-0 m-5 flex items-center justify-center list-none text-xl text-white font-[montserrat] z-50">
            <div className="font-[melodrama] font-bold text-xl text-nowrap lg:text-3xl mr-auto m-5">
              <h1>STUDIOFILM &copy;</h1>
            </div>
            <div className="ml-auto gap-5 flex mr-7.5 text-xs lg:text-xl">
              <li><a href="#">Home</a></li>
              <li><a href="#">Works</a></li>
              <li><a href="#">Art</a></li>
              <li><a href="#">History</a></li>
            </div>
          </div>

          <h1 className="text-5xl text-nowrap lg:text-9xl font-bold z-10 text-white font-[boska]">BEAUTY OF CINEMA</h1>
          <img className="image_runner absolute z-20 scale-[180%] lg:scale-100" style={{ transform: transformStyle }} src="/medias/Cinema/Runner.webp" alt="Runner" />

          <div className="absolute bottom-0 font-[montserrat] lg:text-xl text-xs flex justify-center w-full text-white font-bold">
            <h3 className="mr-auto m-5">Composition</h3>
            <h3 className="mr-auto m-5">Storyline</h3>
            <h3 className="ml-auto m-5">Color</h3>
            <h3 className="ml-auto m-5">Lighting</h3>
          </div>
        </section>

        {!isMobile && (
          <div ref={cursorRef} className="fixed pointer-events-none z-50 mix-blend-difference" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px`, transform: "translate(-50%, -50%)" }}>
            <div className="w-10 h-10 border-2 border-white rounded-full opacity-50" />
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          </div>
        )}

        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      {/* ── Composition (cards) ───────────────────────────────────────────── */}
      <section className="bg-black h-full w-screen text-white">
        <h2 className="text-3xl font-[montserrat] p-8">Composition</h2>
        <div ref={cardsRef} className="cards relative w-screen bg-[#0f0f0f] text-white flex flex-col gap-[25svh]">

          {/* Intro card */}
          <div ref={introCardRef} className="card group relative w-full h-svh p-[1.5em]">
            <div className="card-marquee w-full absolute top-1/2 left-0 transform-[translateY(-50%)] overflow-hidden">
              {/* .marquee scoped via introCard.querySelector — aucun conflit avec filmMarqueeRef */}
              <div className="marquee flex">
                <h3 className="text-[10vw] font-semibold mr-7.5 whitespace-nowrap">Design Beyond Boundaries</h3>
                <h3 className="text-[10vw] font-semibold mr-7.5 whitespace-nowrap">Built for Tomorrow</h3>
                <h3 className="text-[10vw] font-semibold mr-7.5 whitespace-nowrap">Real Impact</h3>
                <h3 className="text-[10vw] font-semibold mr-7.5 whitespace-nowrap">Digital Visions</h3>
              </div>
            </div>
            <div className="card-wrapper relative w-full h-full will-change-transform">
              <div className="card-content absolute w-full h-full flex items-end justify-center z-1">
                <div className="card-title w-full absolute top-1/2 left-1/2 transform-[translate(-50%,-50%)] text-center">
                  <h1 className={`${dirtyline.className} text-[5rem] font-medium tracking-[-0.1rem] leading-tight`}>2001 : a space odyssey</h1>
                </div>
                <div className="card-description text-center w-[40%] mb-[3em] relative transform-[translateX(40px)] opacity-0">
                  <p className="text-[1.125rem] font-normal leading-tight">a new perspection</p>
                </div>
              </div>
              <div className="card-img absolute w-full h-full rounded-[150px] overflow-hidden">
                <img className="image_film relative w-full h-full object-cover group-hover:brightness-50 transition-[brightness] delay-200 ease-in-out will-change-transform transform-[scale(2)]" src="/medias/Cinema/space_odyssey.webp" alt="2001 A Space Odyssey" />
                {/* Composition overlay — Center Frame */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10">
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
                    <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
                    <line x1="0%" y1="0%" x2="100%" y2="100%" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
                    <line x1="0%" y1="100%" x2="100%" y2="0%" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
                    <rect x="35%" y="35%" width="30%" height="30%" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="6 4"/>
                    <rect x="15%" y="15%" width="70%" height="70%" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="6 4"/>
                    <circle cx="50%" cy="50%" r="7" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5"/>
                    <circle cx="50%" cy="50%" r="2.5" fill="rgba(255,255,255,0.75)"/>
                  </svg>
                  <span className="absolute top-5 left-5 text-white text-[0.6rem] font-[montserrat] tracking-[0.35em] uppercase opacity-60">Center Frame</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card group mt-[50vh] relative w-full h-svh p-[1.5em]">
            <div className="card-marquee w-full absolute top-1/2 left-0 transform-[translateY(-50%)] overflow-hidden" />
            <div className="card-wrapper relative w-full h-full will-change-transform">
              <div className="card-content absolute w-full h-full flex items-end justify-center z-1">
                <div className="card-title w-full absolute top-1/2 left-1/2 transform-[translate(-50%,-50%)] text-center">
                  <h1 className={`${dirtyline.className} text-[5rem] font-medium tracking-[-0.1rem] leading-tight`}>Interstellar</h1>
                </div>
                <div className="card-description text-center w-[40%] mb-[3em] relative transform-[translateX(40px)] opacity-0">
                  <p className="text-[1.125rem] font-normal leading-tight">a new perspection</p>
                </div>
              </div>
              <div className="card-img absolute w-full h-full rounded-[150px] overflow-hidden">
                <img className="image_film relative w-full h-full object-cover group-hover:brightness-50 transition-[brightness] delay-200 ease-in-out  will-change-transform transform-[scale(2)]" src="/medias/Cinema/Interstellar_ligne.webp" alt="Interstellar" />
               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10">
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <line x1="33%" y1="0%" x2="33%" y2="100%" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
                    <line x1="66%" y1="0%" x2="66%" y2="100%" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
                    <line x1="0%" y1="33%" x2="100%" y2="33%" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
                    <line x1="0%" y1="66%" x2="100%" y2="66%" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
                   
                   
                    <circle cx="50%" cy="50%" r="7" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5"/>
                    <circle cx="50%" cy="50%" r="2.5" fill="rgba(255,255,255,0.75)"/>
                  </svg>
                  <span className="absolute top-5 left-5 text-white text-[0.6rem] font-[montserrat] tracking-[0.35em] uppercase opacity-60">Center Frame</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card group relative w-full h-svh p-[1.5em]">
            <div className="card-marquee w-full absolute top-1/2 left-0 transform-[translateY(-50%)] overflow-hidden" />
            <div className="card-wrapper relative w-full h-full will-change-transform">
              <div className="card-content absolute w-full h-full flex items-end justify-center z-1">
                <div className="card-title w-full absolute top-1/2 left-1/2 transform-[translate(-50%,-50%)] text-center">
                  <h1 className={`${dirtyline.className} text-[5rem] font-medium tracking-[-0.1rem] leading-tight`}>Blade Runner</h1>
                </div>
                <div className="card-description text-center w-[40%] mb-[3em] relative transform-[translateX(40px)] opacity-0">
                  <p className="text-[1.125rem] font-normal leading-tight">a new perspection</p>
                </div>
              </div>
              <div className="card-img absolute w-full h-full rounded-[150px] overflow-hidden">
                <img className="image_film relative w-full h-full object-cover group-hover:brightness-50 transition-[brightness] delay-200 ease-in-out  will-change-transform transform-[scale(2)]" src="/medias/Cinema/Blade_runner_ligne.webp" alt="Blade Runner" />
               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10">
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <line x1="50%" y1="0%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
                    <line x1="100%" y1="100%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
                    <line x1="0%" y1="100%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
                    
                    <circle cx="50%" cy="50%" r="7" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5"/>
                    <circle cx="50%" cy="50%" r="2.5" fill="rgba(255,255,255,0.75)"/>
                  </svg>
                  <span className="absolute top-5 left-5 text-white text-[0.6rem] font-[montserrat] tracking-[0.35em] uppercase opacity-60">Center Frame</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Film Marquee + Horizontal scroll ──────────────────────────────── */}
      <div className="w-full h-full relative bg-black text-white">

        <section className="h-screen w-full p-8 relative content-center text-center">
          <CopyBlur>
  <h1 className="w-3/4 m-0 text-white font-[boska] text-6xl lg:text-9xl">
    How to Create a Powerful Plot
  </h1>
</CopyBlur>

<CopyBlur>
  <p className="max-w-xl mx-auto text-gray-400 mt-6">
    A great film is not just about visuals — it’s about storytelling. 
    Every unforgettable movie is built on conflict, emotion, and transformation.
  </p>
</CopyBlur></section>

        {/*
          ref={filmMarqueeRef} — PAS de classe .marquee sur cette section
          pour éviter tout conflit avec la section Composition
        */}
        <section ref={filmMarqueeRef} className="film-marquee w-full h-[50svh] overflow-hidden relative">
          <div className="w-[150%] h-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 -rotate-5">
            <div
              ref={marqueeImagesRef}
              className="absolute top-1/2 w-[200%] h-full flex items-center justify-between gap-4 will-change-transform"
              style={{ transform: "translate(-75%, -50%)" }}
            >
              {[...Array(4)].map((_, n) => (
                <div key={n} className="flex-1 h-full aspect-video min-w-0">
                  <img src={`/medias/Cinema/img${n}.webp`} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
              {/* Image "pin" : celle qui sera clonée et agrandie en Flip */}
              <div className="flex-1 h-full aspect-video min-w-0">
                <img ref={marqueeImgPinRef} src="/medias/Cinema/shuter_island.webp" alt="pin" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Section scroll horizontal — entièrement pilotée via refs */}
        <section ref={horizontalScrollRef} className="h-screen w-full relative overflow-hidden">
          <div ref={hScrollWrapperRef} className="flex w-[300%] h-screen relative will-change-transform">

            {/* Slide 0 : espaceur — l'image Flip s'y déploie en plein écran */}
            <div className="flex-1 h-full" />

            {/* Slide 1 */}
            <div className="w-screen h-screen flex p-16">
              <div className="w-1/2 flex items-center justify-center">
               <h3 className="w-3/4 text-white font-[boska] text-4xl lg:text-6xl">
  Creative Vision
</h3>
<p className="w-3/4 text-gray-400 mt-4">
  Every story begins with a vision. A strong plot starts with a clear idea: 
  a world, a character, and a question that needs to be answered.
</p>
              </div>
              <div className="w-1/2 flex items-center justify-center">
                <img className="w-3/4 h-3/4 object-cover rounded-2xl" src="/medias/Cinema/space_odyssey.webp" alt="" />
              </div>
            </div>

            {/* Slide 2 */}
            <div className="w-screen h-screen flex p-16">
              <div className="w-1/2 flex items-center justify-center">
                <h3 className="w-3/4 text-white font-[boska] text-4xl lg:text-6xl">
  Rising Tension
</h3>
<p className="w-3/4 text-gray-400 mt-4">
  A story moves forward through conflict. Obstacles, choices, and consequences 
  shape the journey and keep the audience engaged.
</p>
              </div>
              <div className="w-1/2 flex items-center justify-center">
                <img className="w-3/4 h-3/4 object-cover rounded-2xl" src="/medias/bg_final.webp" alt="" />
              </div>
            </div>

          </div>
        </section>

        <section className="h-screen w-full p-8 relative content-center text-center">
          <h1 className="w-3/4 m-0 text-white font-[boska] text-6xl lg:text-9xl">
  Every Story Leaves a Mark
</h1>

<p className="max-w-xl mx-auto text-gray-400 mt-6">
  In the end, a great plot is not just remembered for what happened — 
  but for how it made us feel.
</p>
        </section>
      </div>

    

      {/* ── Color ────────────────────────────────────────────────────────── */}
      <section className="bg-black h-screen w-screen text-white">
        <h2 className="text-3xl font-[montserrat] p-8">Color</h2>
      </section>

      {/* ── Lighting ─────────────────────────────────────────────────────── */}
      <section className="bg-black h-full w-screen text-white">
        <h2 className="text-3xl font-[montserrat] p-8">Lighting</h2>
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            className="mt-8 bg-linear-to-br from-white to-white py-4 bg-clip-text text-center text-4xl tracking-tight text-transparent md:text-7xl font-[montserrat] font-bold"
          >
            Lighting <br /> Is Everythings
          </motion.h1>
        </LampContainer>

        {/* ── Mouse spotlight ──────────────────────────────────────────── */}
        <div
          ref={spotlightRef}
          className="relative w-full overflow-hidden cursor-none"
          style={{ height: "100svh" }}
          onMouseMove={(e) => {
            const rect = spotlightRef.current?.getBoundingClientRect();
            if (!rect) return;
            const x = ((e.clientX - rect.left) / rect.width)  * 100;
            const y = ((e.clientY - rect.top)  / rect.height) * 100;
            setSpotlightPos({ x, y });
          }}
        >
          {/* Fond texturé sombre */}
          <div className="absolute inset-0 bg-[#080808]" />

          {/* Masque lumière souris */}
          <div
            className="absolute inset-0 transition-none pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle 320px at ${spotlightPos.x}% ${spotlightPos.y}%, transparent 0%, rgba(0,0,0,0.97) 100%)`,
            }}
          />

          {/* Grain film */}
          <div className="absolute inset-0 opacity-[0.04] z-20 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

          {/* Contenu texte — éclairé par la "torche" */}
          <div className="relative z-5 h-full flex flex-col items-center justify-center gap-16 px-8 select-none">

            {/* Citation principale */}
            <blockquote className="text-center max-w-4xl">
              <p className="font-[boska] text-5xl lg:text-8xl text-white leading-tight tracking-tight">
                "Light is the first element of design."
              </p>
              <cite className="block mt-6 font-[montserrat] text-sm tracking-[0.4em] uppercase text-white/40">
                — Gordon Parks, 1952
              </cite>
            </blockquote>

            {/* Grille de faits */}
            <div className="grid grid-cols-3 gap-px w-full max-w-3xl border border-white/10">
              {[
                { label: "Hard Light",  desc: "Définit. Tranche. Accuse." },
                { label: "Soft Light",  desc: "Enveloppe. Flatte. Console." },
                { label: "Backlight",   desc: "Silhouette. Mystère. Peur." },
                { label: "Practical",   desc: "Lampe dans le cadre. Réalisme brut." },
                { label: "Motivated",   desc: "La source est crédible. L'œil y croit." },
                { label: "Chiaroscuro", desc: "Caravage → Kubrick. Même combat." },
              ].map(({ label, desc }) => (
                <div key={label} className="p-6 border border-white/10 group/cell">
                  <h4 className="font-[montserrat] text-xs tracking-[0.3em] uppercase text-white/50 mb-2 group-hover/cell:text-white transition-colors duration-300">{label}</h4>
                  <p className="font-[boska] text-lg text-white/80 leading-snug">{desc}</p>
                </div>
              ))}
            </div>

            {/* Instruction discrète */}
            <p className="absolute bottom-8 font-[montserrat] text-[0.6rem] tracking-[0.5em] uppercase text-white/20">
              Move your light
            </p>
          </div>
        </div>
      </section>
      <section className="h-screen text-white flex-col w-full flex justify-center items-center bg-[url(/medias/Cinema/seven.webp)]  bg-center bg-cover">
<div className="flex justify-between w-full mb-auto">
<p className="ml-6">STUDIOFILM &copy;</p>
<ul className="flex gap-4 mr-6">
  <li><a href="#">Home</a></li>
              <li><a href="#">Works</a></li>
              <li><a href="#">Art</a></li>
              <li><a href="#">History</a></li>
</ul>
</div>
<h1 className="footer_text mb-auto text-5xl text-nowrap lg:text-9xl scale-150 font-[1000] font-[boska] bg-[url(/medias/Cinema/Blade_runner.webp)] bg-center bg-cover" >Will Never Die</h1>
       
      <p className="font-[boska]">end</p>
      </section>

      <style jsx>{`
        .char {
          position: relative;
          overflow: hidden;
          display: inline-block;
        }
        .char span {
          transform: translateX(100%);
          display: inline-block;
        }
        .footer_text {
        -webkit-background-clip: text; 
   -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  );
};