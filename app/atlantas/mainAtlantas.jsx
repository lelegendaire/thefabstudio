"use client"
import Image from "next/image";
import { venom } from "../fonts"
import { Heart } from "lucide-react"
import Copy_bloc from "../components/Copy_bloc"
import AnimatedLink from "../components/AnimatedLink"
import AnimatedCopy from "../components/AnimatedCopy"
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AtlantasMenu from "./AtlantasMenu";
// Données produits centralisées — plus facile à maintenir
const products = [
  {
    id: 1,
    name: "Atlantas XI",
    note: "Boisé & Ambré",
    price: "€ 145",
    img: "/medias/Atlantas/parfum1.png",
    w: 800, h: 1000,
    alt: "Atlantas XI"
  },
  {
    id: 2,
    name: "Noir Sauvage",
    note: "Épicé & Musqué",
    price: "€ 125",
    img: "/medias/Atlantas/parfum2.png",
    w: 700, h: 1000,
    alt: "Noir Sauvage"
  },
  {
    id: 3,
    name: "Velvet Oud",
    note: "Oriental & Chaleureux",
    price: "€ 165",
    img: "/medias/Atlantas/parfum3.png",
    w: 700, h: 1000,
    alt: "Velvet Oud"
  },
  {
    id: 4,
    name: "Cèdre Blanc",
    note: "Frais & Aromatic",
    price: "€ 115",
    img: "/medias/Atlantas/parfum1.png",
    w: 800, h: 1000,
    alt: "Cèdre Blanc"
  },
  {
    id: 5,
    name: "Musc Impérial",
    note: "Poudré & Sensuel",
    price: "€ 135",
    img: "/medias/Atlantas/parfum2.png",
    w: 700, h: 1000,
    alt: "Musc Impérial"
  },
  {
    id: 6,
    name: "Eau de Mystère",
    note: "Floral & Boisé",
    price: "€ 120",
    img: "/medias/Atlantas/parfum3.png",
    w: 700, h: 1000,
    alt: "Eau de Mystère"
  },
]

const bannerText = "Atlantas XI — L'élégance comme signature "

export default function MainAtlantas(){
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const stickyRef      = useRef(null);
    const cardContainerRef = useRef(null);
    const stickyHeaderRef  = useRef(null);
useEffect(() => {
  if (typeof window === "undefined") return;
  let killed = false;

  async function init() {
    const gsapMod = await import("gsap");
    const stMod   = await import("gsap/ScrollTrigger");
    const gsap          = gsapMod.default || gsapMod.gsap;
    const ScrollTrigger = stMod.default   || stMod.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    if (killed) return;

    let isGapAnimationCompleted  = false;
    let isFlipAnimationCompleted = false;

    function initAnimation() {
    ScrollTrigger.getById("cards-flip")?.kill();
      isGapAnimationCompleted  = false;
      isFlipAnimationCompleted = false;

      const mm = gsap.matchMedia();

      // Mobile — reset tout
      mm.add("(max-width: 999px)", () => {
        [
          cardContainerRef.current,
          stickyHeaderRef.current,
          ...document.querySelectorAll(".card"),
        ].forEach(el => el && (el.style.cssText = ""));
        return () => {};
      });

      // Desktop
      mm.add("(min-width: 1000px)", () => {
        ScrollTrigger.create({
        id: "cards-flip",
          trigger: stickyRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 4}px`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const progress = self.progress;

            // ── Header fade-in ───────────────────────────────────────────────
            if (progress >= 0.1 && progress <= 0.25) {
              const p  = gsap.utils.mapRange(0.1, 0.25, 0, 1, progress);
              gsap.set(stickyHeaderRef.current, {
                y:       gsap.utils.mapRange(0, 1, 40, 0, p),
                opacity: gsap.utils.mapRange(0, 1, 0,  1, p),
              });
            } else if (progress < 0.1) {
              gsap.set(stickyHeaderRef.current, { y: 40, opacity: 0 });
            } else if (progress > 0.25) {
              gsap.set(stickyHeaderRef.current, { y: 0,  opacity: 1 });
            }

            // ── Card container width ─────────────────────────────────────────
            if (progress <= 0.25) {
              gsap.set(cardContainerRef.current, {
                width: `${gsap.utils.mapRange(0, 0.25, 75, 60, progress)}%`,
              });
            } else {
              gsap.set(cardContainerRef.current, { width: "60%" });
            }

            // ── Gap + border-radius ──────────────────────────────────────────
            if (progress >= 0.35 && !isGapAnimationCompleted) {
              gsap.to(cardContainerRef.current, { gap: "20px",   duration: 0.5, ease: "power3.out" });
              gsap.to(".card",                  { borderRadius: "20px", duration: 0.5, ease: "power3.out" });
              isGapAnimationCompleted = true;
            } else if (progress < 0.35 && isGapAnimationCompleted) {
              gsap.to(cardContainerRef.current, { gap: "0px",    duration: 0.5, ease: "power3.out" });
              gsap.to("#card-1", { borderRadius: "20px 0 0 20px",   duration: 0.5, ease: "power3.out" });
              gsap.to("#card-2", { borderRadius: "0",               duration: 0.5, ease: "power3.out" });
              gsap.to("#card-3", { borderRadius: "0 20px 20px 0",   duration: 0.5, ease: "power3.out" });
              isGapAnimationCompleted = false;
            }

            // ── Flip cards ───────────────────────────────────────────────────
            if (progress >= 0.7 && !isFlipAnimationCompleted) {
              gsap.to(".card",           { rotationY: 180, duration: 0.5,  ease: "power3.inOut", stagger: 0.1 });
              gsap.to(["#card-1","#card-3"], {
                y: 30,
                rotationZ: (i) => [-15, 15][i],
                duration: 0.75, ease: "power3.inOut",
              });
              isFlipAnimationCompleted = true;
            } else if (progress < 0.7 && isFlipAnimationCompleted) {
              gsap.to(".card",           { rotationY: 0, duration: 0.75, ease: "power3.inOut", stagger: -0.1 });
              gsap.to(["#card-1","#card-3"], { y: 0, rotationZ: 0, duration: 0.75, ease: "power3.inOut" });
              isFlipAnimationCompleted = false;
            }
          },
        });
      });
    }

    initAnimation();

    // Resize debounce
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAnimation, 250);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
       ScrollTrigger.getById("cards-flip")?.kill();
    };
  }

  let cleanupFn;
  init().then(fn => { cleanupFn = fn; });
  return () => { killed = true; cleanupFn?.(); };
}, []);
    return (
        <main className="w-full h-full">
        <AtlantasMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        {/* ─── HERO ─── */}
        <section className="intro bg-[#EFE9E1] min-h-screen flex flex-col justify-between items-center py-2 lg:py-4">
            <div className="flex items-start justify-between w-full px-2 lg:px-4">
                <Copy_bloc blockColor="#72383D">
                    <p className="text-[#72383D] lg:ml-5 lg:mt-5 ml-1 mt-1 lg:z-0 relative z-10 text-xs lg:text-base">Nouvelle collection</p>
                </Copy_bloc>
                <h1 className={`${venom.className} text-[#322D29] text-3xl md:text-6xl lg:text-9xl text-center z-5 px-2`}>ATLANTAS</h1>
                <button onClick={() => setMenuOpen(true)} className="text-[#72383D] lg:mr-5 lg:mt-5 mr-1 mt-1 w-6 h-6 lg:w-8 lg:h-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>

            <div className="flex justify-center items-center relative w-full h-full">
                <Image src={"/medias/Atlantas/Parfum.webp"} width={700} height={1000} alt="Atlantas XI – Flacon signature" className="rounded-lg -top-10 -translate-y-1/2 absolute z-3 w-60 md:w-80 lg:w-175 h-90 lg:h-100 object-cover"/>
                <div className="absolute w-full overflow-hidden">
                    <div className="flex whitespace-nowrap animate-[scrollRight_10s_linear_infinite]">
                        {[...Array(3)].map((_, i) => (
                            <span key={i} className={`${venom.className} text-4xl md:text-7xl lg:text-8xl text-[#D8B0B4] mx-8 lg:mx-16`}>
                                {bannerText}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex items-end justify-between w-full px-2 lg:px-4">
                <Copy_bloc blockColor="#72383D">
                    <p className="text-[#72383D] lg:ml-5 lg:mb-1 ml-1 mb-0.5 text-xs lg:text-base">2026</p>
                </Copy_bloc>
                <Copy_bloc blockColor="#72383D">
                    <p className="text-[#72383D] lg:mr-5 lg:mb-1 mr-1 mb-0.5 text-xs lg:text-base max-w-50 lg:max-w-none">
                        Une fragrance pensée pour ceux qui laissent une trace — sans mot.
                    </p>
                </Copy_bloc>
            </div>
        </section>

        {/* ─── PRODUITS ─── */}
        <section className="h-full lg:h-screen bg-[#EFE9E1]">
            <div className="flex items-baseline justify-between px-4 lg:px-5 pt-6 pb-0 lg:flex-row flex-col">
                <h1 className="text-3xl lg:text-5xl text-[#322D29]">Nos fragrances</h1>
                <span className="text-[#72383D] text-xs lg:text-sm tracking-widest uppercase mt-4 lg:mt-0">
                    Collection 2026 — {products.length} créations
                </span>
            </div>

            <div className="flex gap-3 p-4 lg:p-5 mt-5 overflow-x-auto snap-x snap-mandatory">
                {products.map((p) => (
                    <div key={p.id}  className="card group shrink-0 w-48 lg:w-60 h-80 lg:h-85 rounded-[20px] overflow-hidden relative cursor-pointer snap-center bg-[#AC9C8D]">
    <div className="card-img hover:transform-[scale(1.06)] absolute inset-0 transition-transform duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] bg-linear-150 from-[#c5a898] via-[#7a5545] to-[#3d2218]" ><Image src={p.img} width={p.w} height={p.h} alt={p.alt} className="rounded-lg relative z-5 transition-transform duration-500 group-hover:scale-105"/></div>
    <div className="card-shine hover:opacity-0 absolute top-[-40%] left-[-40%] w-[80] h-[80%] pointer-events-none z-2 transition-opacity duration-400 "></div>
    <div className="card-vignette absolute inset-0 z-3"></div>
    <div className="card-badge absolute top-3.5 left-3.5 z-5 text-[0.65rem] tracking-[0.18em] text-[rgba(255,255,255,0.55)] uppercase">N° {p.id}</div>
    <div className="card-heart absolute top-3.5 right-3.5 z-5 w-8 h-8 rounded-[50%] border border-solid border-[rgba(255,255,255,0.25)] flex items-center justify-center cursor-pointer transition-background duration-250 transition-border-color backdrop-blur-2xl hover:bg-[rgba(220,60,60,0.3)] hover:border-[#e05a5a] ">
      <Heart/>
    </div>
    <div className="card-intensity absolute top-1/2 right-3.5 z-5 flex flex-col gap-1 transform -translate-y-1/2 opacity-0 transition-opacity duration-300 delay-100 hover:opacity-100 ">
      <span className="active block w-1.5 h-1.5 rounded-[50%] border border-solid border-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.85)] "></span>
      <span className="active block w-1.5 h-1.5 rounded-[50%] border border-solid border-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.85)]"></span>
      <span className="active block w-1.5 h-1.5 rounded-[50%] border border-solid border-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.85)]"></span>
      <span className="active block w-1.5 h-1.5 rounded-[50%] border border-solid border-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.85)]"></span>
      <span></span>
    </div>
    <div className="card-info absolute bottom-0 left-0 right-0 z-6 p-4 transform translate-y-0 transition-transform duration-350 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
      <p className="card-note text-[0.6rem] tracking-[0.22em] uppercase text-[#D8B0B4] mb-1">{p.note}</p>
      <p className="card-name text-[1.15rem] text-[#f5ede6] font-400 tracking-[0.02em] leading-[1.2]">{p.name}</p>
      <p className="card-price text-[0.85rem] mt-0.75 text-[#D1C7BD]">{p.price}</p>
      <div className="card-divider group-hover:scale-x-100 h-px bg-[rgba(255,255,255,0.15)] mt-2.5 transform scale-x-0 origin-left transition-transform duration-400 delay-100"></div>
      <div className="card-cta group-hover:max-h-13 group-hover:mt-2.5 overflow-hidden max-h-0 mt-0 transition-[max-height,margin-top] duration-350 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"><button className="w-full px-0 py-1.75 hover:bg-[rgba(255,255,255,0.15)] hover:border-[rgba(255,255,255,0.6)] bg-transparent text-orange-100 text-xs uppercase cursor-pointer backdrop-blur-2xl transition-[background,border-color] duration-200 text-[0.7rem] tracking-[0.16em] rounded-[30px] border border-solid border-[rgba(255,255,255,0.35)] ">Ajouter au panier</button></div>
    </div>
  </div>
                ))}
            </div>

            <div className="flex justify-center items-center w-full mt-4">
                <p className="text-[#72383D] text-base italic text-center">
                    Chaque flacon, un univers. Chaque note, une intention.
                </p>
            </div>
        </section>

        {/* ─── UNIVERS (Man / Woman / Teenager) ─── */}
        <section className="bg-[#EFE9E1] overflow-hidden">
            <div className="flex flex-col lg:flex-row">
                {[
                    { src: "/medias/Atlantas/Man.webp", w: 700, h: 700, label: "Homme", sub: "Force & Profondeur" },
                    { src: "/medias/Atlantas/Woman.webp", w: 700, h: 700, label: "Femme", sub: "Grâce & Intensité" },
                    { src: "/medias/Atlantas/Teenager.webp", w: 900, h: 1000, label: "Jeunesse", sub: "Liberté & Fraîcheur" },
                ].map(({ src, w, h, label, sub }) => (
                    <div key={label} className="h-[60vh] lg:h-screen w-full lg:w-1/3 relative group cursor-pointer overflow-hidden">
                        <Image src={src} width={w} height={h} alt={label} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"/>
                        {/* Overlay dégradé */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"/>
                        {/* Texte - horizontal sur mobile, vertical sur desktop */}
                        <h2 className="lg:-rotate-90 text-white absolute text-2xl lg:text-3xl z-4 top-4 lg:top-20 left-4 lg:left-2 tracking-widest">{label}</h2>
                        <div className="absolute bottom-4 lg:bottom-8 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-4 px-4">
                            <p className="text-[#D8B0B4] text-xs lg:text-sm tracking-wider uppercase mb-2">{sub}</p>
                            <button className="border border-white text-white text-xs px-4 py-1.5 rounded-full hover:bg-white hover:text-[#322D29] transition-colors duration-200">
                                Découvrir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* ─── HISTOIRE ─── */}
        <section className="h-full bg-[#EFE9E1]">
            <h1 className="relative left-4 lg:left-5 pt-6 text-3xl lg:text-5xl text-[#322D29]">Notre histoire</h1>
            <div className="flex justify-center items-center w-full mt-6 lg:mt-10 px-4">
                <AnimatedCopy >
                    <div className="p-4 lg:p-6 max-w-3xl">
                        {/* Notes olfactives — ajout éditorial */}
                        <div className="flex gap-4 lg:gap-6 mb-4 lg:mb-6 text-xs lg:text-sm tracking-widest uppercase lg:text-wrap text-nowrap lg:flex-row flex-col">
                            <span className="text-[#72383D]">Tête — Bergamote, Poivre</span>
                            <span className="text-[#72383D]">Cœur — Oud, Iris</span>
                            <span className="text-[#72383D]">Fond — Cèdre, Ambre</span>
                        </div>
                        <h2 className="leading-relaxed text-[#322D29] text-base lg:text-xl">
                            Né d'une recherche d'élégance et de caractère, Atlantas XI incarne
                            une vision moderne du parfum de luxe. Plus qu'une fragrance,
                            il s'agit d'une signature olfactive pensée pour révéler la présence,
                            l'identité et la subtilité de celui qui le porte.
                            <br /><br />
                            Inspiré par l'équilibre entre puissance et finesse, chaque note a été
                            soigneusement imaginée pour créer une expérience sensorielle profonde,
                            où la chaleur des accords boisés rencontre la délicatesse des nuances
                            aromatiques. Le parfum ne suit pas une tendance — il raconte une histoire,
                            celle d'une élégance intemporelle.
                            <br /><br />
                            Conçu comme une œuvre sensorielle, Atlantas XI s'adresse aux esprits
                            exigeants : à ceux qui recherchent bien plus qu'un parfum — une aura,
                            une identité, une trace mémorable. Car le véritable luxe ne se voit
                            pas seulement, il se ressent.
                        </h2>
                        {/* CTA */}
                        <div className="mt-6">
                            <button className="bg-[#72383D] text-[#EFE9E1] px-6 py-2.5 rounded-3xl text-sm tracking-wider hover:bg-[#5a2c30] transition-colors duration-200">
                                Explorer la collection →
                            </button>
                        </div>
                    </div>
                </AnimatedCopy>
            </div>
        </section>

        <section>
            {/* ─── INTRO CARDS ─── */}
            <section className="intro relative w-full min-h-[30vh] lg:h-[50vh] p-4 lg:p-8 bg-[#EFE9E1] text-[#322D29] content-center text-center flex items-center justify-center">
                <h1 className="w-full mx-auto my-0 text-xl lg:text-4xl px-4">L'art du parfum révélé en trois actes</h1>
            </section>

            {/* ─── STICKY CARDS (Desktop) / Vertical Stack (Mobile) ─── */}
            <section ref={stickyRef} className="sticky2 flex justify-center items-center relative w-full min-h-auto lg:h-screen p-4 lg:p-8 bg-[#EFE9E1] text-[#322D29]">
                <div className="sticky-header absolute top-20/100 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
                    <h2 ref={stickyHeaderRef} className="relative text-center will-change-[transform,opacity] translate-y-10 opacity-0 ">Chaque parfum est unique</h2>
                </div>
                {/* Mobile: vertical stack */}
                <div className="lg:hidden flex flex-col gap-4 w-full max-w-md mx-auto">
                    <div className="card-mobile relative w-full aspect-4/5 rounded-[20px] overflow-hidden bg-[#b2b2b2]">
                        <img src={"/medias/Atlantas/parfum_card.webp"} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"/>
                        <div className="absolute bottom-4 left-4 right-4 text-left">
                            <span className="opacity-60 text-xs tracking-widest">(01)</span>
                            <p className="text-lg font-medium text-[#322D29]">Tête</p>
                            <p className="text-xs mt-1 opacity-70">Bergamote · Poivre rose · Citron vert</p>
                        </div>
                    </div>
                    <div className="card-mobile relative w-full aspect-4/5 rounded-[20px] overflow-hidden bg-[#7a5545]">
                        <img src={"/medias/Atlantas/parfum_card.webp"} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"/>
                        <div className="absolute bottom-4 left-4 right-4 text-left">
                            <span className="opacity-60 text-xs tracking-widest text-[#EFE9E1]">(02)</span>
                            <p className="text-lg font-medium text-[#EFE9E1]">Cœur</p>
                            <p className="text-xs mt-1 opacity-70 text-[#EFE9E1]">Oud · Iris · Rose de Damas</p>
                        </div>
                    </div>
                    <div className="card-mobile relative w-full aspect-4/5 rounded-[20px] overflow-hidden bg-[#221f1c]">
                        <img src={"/medias/Atlantas/parfum_card.webp"} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"/>
                        <div className="absolute bottom-4 left-4 right-4 text-left">
                            <span className="opacity-60 text-xs tracking-widest text-[#EFE9E1]">(03)</span>
                            <p className="text-lg font-medium text-[#EFE9E1]">Fond</p>
                            <p className="text-xs mt-1 opacity-70 text-[#EFE9E1]">Cèdre · Ambre · Musc blanc</p>
                        </div>
                    </div>
                </div>
                {/* Desktop: horizontal flip cards */}
                <div ref={cardContainerRef} className="hidden lg:flex card-container" style={{ display: "flex", width: "75%" }}>
                    <div className="card relative flex-1 aspect-5/7 transform-3d origin-top rounded-[20px_0px_0px_20px]" id="card-1">
                        <div className="card-front absolute w-full h-full backface-hidden rounded-[inherit] overflow-hidden">
                            <div style={{ position: 'absolute', width: '300%', height: '100%', left: '0%' }}>
                                <img src={"/medias/Atlantas/parfum_card.webp"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>
                        <div className="card-back bg-[#b2b2b2] flex flex-col justify-center items-center text-center rotate-y-180 p-8 absolute w-full h-full backface-hidden rounded-[inherit] overflow-hidden">
                            <span className="absolute top-8 left-8 opacity-40 text-sm tracking-widest">(01)</span>
                            <p className="text-[1.4rem] font-medium leading-snug text-[#322D29]">Tête</p>
                            <p className="text-sm mt-3 opacity-60 tracking-wide">Bergamote · Poivre rose · Citron vert</p>
                            <p className="text-xs mt-4 opacity-40 uppercase tracking-widest">La première impression</p>
                        </div>
                    </div>
                    <div className="card relative flex-1 aspect-5/7 transform-3d origin-top" id="card-2">
                        <div className="card-front absolute w-full h-full backface-hidden rounded-[inherit] overflow-hidden">
                            <div style={{ position: 'absolute', width: '300%', height: '100%', left: '-100%' }}>
                                <img src={"/medias/Atlantas/parfum_card.webp"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>
                        <div className="card-back bg-[#7a5545] flex flex-col justify-center items-center text-center rotate-y-180 p-8 absolute w-full h-full backface-hidden rounded-[inherit] overflow-hidden">
                            <span className="absolute top-8 left-8 opacity-40 text-sm tracking-widest text-[#EFE9E1]">(02)</span>
                            <p className="text-[1.4rem] font-medium leading-snug text-[#EFE9E1]">Cœur</p>
                            <p className="text-sm mt-3 text-[#EFE9E1] opacity-70 tracking-wide">Oud · Iris · Rose de Damas</p>
                            <p className="text-xs mt-4 text-[#EFE9E1] opacity-50 uppercase tracking-widest">L'âme de la fragrance</p>
                        </div>
                    </div>
                    <div className="card relative flex-1 aspect-5/7 transform-3d origin-top rounded-[0px_20px_20px_0px]" id="card-3">
                        <div className="card-front absolute w-full h-full backface-hidden rounded-[inherit] overflow-hidden">
                            <div style={{ position: 'absolute', width: '300%', height: '100%', left: '-200%' }}>
                                <img src={"/medias/Atlantas/parfum_card.webp"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>
                        <div className="card-back bg-[#221f1c] flex flex-col justify-center items-center text-center rotate-y-180 p-8 absolute w-full h-full backface-hidden rounded-[inherit] overflow-hidden">
                            <span className="absolute top-8 left-8 opacity-40 text-sm tracking-widest text-[#EFE9E1]">(03)</span>
                            <p className="text-[1.4rem] font-medium leading-snug text-[#EFE9E1]">Fond</p>
                            <p className="text-sm mt-3 text-[#EFE9E1] opacity-70 tracking-wide">Cèdre · Ambre · Musc blanc</p>
                            <p className="text-xs mt-4 text-[#EFE9E1] opacity-50 uppercase tracking-widest">La trace qui demeure</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── OUTRO CARDS ─── */}
            <section className="outro relative w-full min-h-[30vh] lg:h-[50vh] p-4 lg:p-8 bg-[#EFE9E1] text-[#322D29] content-center text-center flex items-center justify-center">
                <h1 className="w-full mx-auto my-0 text-xl lg:text-4xl px-4">Une signature que le temps ne peut effacer</h1>
            </section>
        </section>

        {/* ─── FOOTER ─── */}
        <section className="footer overflow-hidden min-h-[60vh] lg:h-screen bg-[#EFE9E1] flex relative justify-center items-center py-8 lg:py-0">
            <div className="flex justify-center items-center w-full lg:flex-row flex-col gap-8 lg:gap-0 px-4">
                <div className="w-full lg:w-1/3 flex justify-center items-center flex-col text-center">
                    <h2 className="font-bold text-[#322D29] mb-3 text-lg">Navigation</h2>
                    <ul className="space-y-2 text-[#72383D] text-sm">
                        <li>Accueil</li>
                        <li>Fragrances</li>
                        <li>Boutique</li>
                        <li>Notre histoire</li>
                    </ul>
                </div>
                <div className="w-full lg:w-1/3 flex justify-center items-center flex-col text-center">
                    <h2 className="font-bold text-[#322D29] mb-3 text-lg">Nous suivre</h2>
                    <ul className="space-y-2 text-sm">
                        <li><AnimatedLink color="black" href="#">Instagram</AnimatedLink></li>
                        <li><AnimatedLink color="black" href="#">Twitter / X</AnimatedLink></li>
                        <li><AnimatedLink color="black" href="#">TikTok</AnimatedLink></li>
                        <li><AnimatedLink color="black" href="#">Facebook</AnimatedLink></li>
                    </ul>
                </div>
                <div className="w-full lg:w-1/3 flex justify-center items-center flex-col text-center">
                    <h2 className="font-bold text-[#322D29] mb-3 text-lg">Mentions légales</h2>
                    <ul className="space-y-2 text-[#72383D] text-sm">
                        <li><p className="text-nowrap">© 2026 Atlantas XI. Tous droits réservés.</p></li>
                        <li><p className="text-nowrap">Conditions générales & Confidentialité</p></li>
                        <li><p className="text-nowrap">Livraison & Retours</p></li>
                        <li><AnimatedLink color={"#322D29"} onClick={() => router.push('/')} >Created by TheFabStudio</AnimatedLink></li>
                    </ul>
                </div>
            </div>
            <h1 className={`${venom.className} text-[#322D29] text-4xl md:text-6xl lg:text-9xl text-center z-5 absolute -bottom-4 md:-bottom-9 lg:-bottom-15`}>ATLANTAS</h1>
        </section>

        <style jsx>{`
            @keyframes scrollRight {
                0%   { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }
        `}</style>
        </main>
    )
}